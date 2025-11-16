-- Update handle_new_user to schedule webinar emails for all new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  active_webinar RECORD;
  webinar_date TIMESTAMP WITH TIME ZONE;
  now_time TIMESTAMP WITH TIME ZONE := now();
BEGIN
  -- Insert profile
  INSERT INTO public.profiles (id, email)
  VALUES (new.id, new.email);
  
  -- Get the active webinar event
  SELECT * INTO active_webinar
  FROM webinar_events
  WHERE is_active = true
  ORDER BY webinar_date ASC
  LIMIT 1;
  
  -- If there's an active webinar, schedule emails
  IF active_webinar.id IS NOT NULL THEN
    webinar_date := active_webinar.webinar_date;
    
    -- Register user for webinar
    INSERT INTO webinar_registrations (user_id, email, webinar_event_id)
    VALUES (new.id, new.email, active_webinar.id)
    ON CONFLICT DO NOTHING;
    
    -- Schedule confirmation email (immediate)
    INSERT INTO email_schedules (user_id, email, email_type, template_name, scheduled_for, webinar_event_id, metadata)
    VALUES (
      new.id,
      new.email,
      'webinar_confirmation',
      'webinar-confirmation',
      now_time,
      active_webinar.id,
      jsonb_build_object(
        'webinar_title', active_webinar.title,
        'webinar_date', active_webinar.webinar_date,
        'zoom_link', active_webinar.zoom_link,
        'meeting_id', active_webinar.meeting_id,
        'passcode', active_webinar.passcode,
        'bundle_price', (active_webinar.bundle_price_cents / 100.0),
        'single_price', (active_webinar.single_workbook_price_cents / 100.0)
      )
    )
    ON CONFLICT DO NOTHING;
    
    -- Schedule 24hr reminder (only if webinar is more than 24 hours away)
    IF webinar_date > now_time + INTERVAL '24 hours' THEN
      INSERT INTO email_schedules (user_id, email, email_type, template_name, scheduled_for, webinar_event_id, metadata)
      VALUES (
        new.id,
        new.email,
        'webinar_24hr_reminder',
        'webinar-24hr-reminder',
        webinar_date - INTERVAL '24 hours',
        active_webinar.id,
        jsonb_build_object(
          'webinar_title', active_webinar.title,
          'webinar_date', active_webinar.webinar_date,
          'zoom_link', active_webinar.zoom_link,
          'meeting_id', active_webinar.meeting_id,
          'passcode', active_webinar.passcode,
          'bundle_price', (active_webinar.bundle_price_cents / 100.0),
          'single_price', (active_webinar.single_workbook_price_cents / 100.0)
        )
      )
      ON CONFLICT DO NOTHING;
    END IF;
    
    -- Schedule 2hr reminder (only if webinar is more than 2 hours away)
    IF webinar_date > now_time + INTERVAL '2 hours' THEN
      INSERT INTO email_schedules (user_id, email, email_type, template_name, scheduled_for, webinar_event_id, metadata)
      VALUES (
        new.id,
        new.email,
        'webinar_2hr_reminder',
        'webinar-2hr-reminder',
        webinar_date - INTERVAL '2 hours',
        active_webinar.id,
        jsonb_build_object(
          'webinar_date', active_webinar.webinar_date,
          'zoom_link', active_webinar.zoom_link,
          'meeting_id', active_webinar.meeting_id,
          'passcode', active_webinar.passcode
        )
      )
      ON CONFLICT DO NOTHING;
    END IF;
    
    -- Schedule 15min reminder (only if webinar is more than 15 minutes away)
    IF webinar_date > now_time + INTERVAL '15 minutes' THEN
      INSERT INTO email_schedules (user_id, email, email_type, template_name, scheduled_for, webinar_event_id, metadata)
      VALUES (
        new.id,
        new.email,
        'webinar_15min_reminder',
        'webinar-15min-reminder',
        webinar_date - INTERVAL '15 minutes',
        active_webinar.id,
        jsonb_build_object(
          'zoom_link', active_webinar.zoom_link,
          'meeting_id', active_webinar.meeting_id,
          'passcode', active_webinar.passcode
        )
      )
      ON CONFLICT DO NOTHING;
    END IF;
  END IF;
  
  RETURN new;
END;
$function$;