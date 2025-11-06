-- Create webinar_events table for configurable webinar settings
CREATE TABLE public.webinar_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  webinar_date TIMESTAMP WITH TIME ZONE NOT NULL,
  timezone TEXT NOT NULL DEFAULT 'America/Chicago',
  zoom_link TEXT NOT NULL,
  meeting_id TEXT NOT NULL,
  passcode TEXT NOT NULL,
  post_webinar_trigger_offset_minutes INTEGER NOT NULL DEFAULT 90,
  bundle_price_cents INTEGER NOT NULL DEFAULT 12900,
  single_workbook_price_cents INTEGER NOT NULL DEFAULT 4900,
  discount_window_hours INTEGER NOT NULL DEFAULT 72,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create webinar_registrations table
CREATE TABLE public.webinar_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  email TEXT NOT NULL,
  webinar_event_id UUID NOT NULL REFERENCES public.webinar_events(id) ON DELETE CASCADE,
  registered_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  attended BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, webinar_event_id)
);

-- Create email_schedules table
CREATE TABLE public.email_schedules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  email TEXT NOT NULL,
  email_type TEXT NOT NULL,
  template_name TEXT NOT NULL,
  scheduled_for TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  webinar_event_id UUID REFERENCES public.webinar_events(id) ON DELETE CASCADE,
  metadata JSONB DEFAULT '{}'::jsonb,
  sent_at TIMESTAMP WITH TIME ZONE,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create email_logs table for tracking and preventing duplicates
CREATE TABLE public.email_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  email TEXT NOT NULL,
  email_type TEXT NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.webinar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webinar_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for webinar_events (public read)
CREATE POLICY "Anyone can view active webinar events"
  ON public.webinar_events
  FOR SELECT
  USING (is_active = true);

-- RLS Policies for webinar_registrations
CREATE POLICY "Users can view their own registrations"
  ON public.webinar_registrations
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own registrations"
  ON public.webinar_registrations
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for email_schedules (users can view their own)
CREATE POLICY "Users can view their own email schedules"
  ON public.email_schedules
  FOR SELECT
  USING (auth.uid() = user_id);

-- RLS Policies for email_logs (users can view their own)
CREATE POLICY "Users can view their own email logs"
  ON public.email_logs
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_email_schedules_scheduled_for ON public.email_schedules(scheduled_for) WHERE status = 'pending';
CREATE INDEX idx_email_schedules_user_id ON public.email_schedules(user_id);
CREATE INDEX idx_email_schedules_status ON public.email_schedules(status);
CREATE INDEX idx_webinar_registrations_user_id ON public.webinar_registrations(user_id);
CREATE INDEX idx_webinar_registrations_webinar_event_id ON public.webinar_registrations(webinar_event_id);
CREATE INDEX idx_email_logs_user_email_type ON public.email_logs(user_id, email_type);

-- Add updated_at trigger for webinar_events
CREATE TRIGGER update_webinar_events_updated_at
  BEFORE UPDATE ON public.webinar_events
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add updated_at trigger for email_schedules
CREATE TRIGGER update_email_schedules_updated_at
  BEFORE UPDATE ON public.email_schedules
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert the November 18th webinar event
INSERT INTO public.webinar_events (
  title,
  webinar_date,
  timezone,
  zoom_link,
  meeting_id,
  passcode,
  post_webinar_trigger_offset_minutes,
  bundle_price_cents,
  single_workbook_price_cents,
  discount_window_hours,
  is_active
) VALUES (
  'AI Masterclass: Build Your Business Live',
  '2025-11-18 19:00:00-06:00',
  'America/Chicago',
  'https://us06web.zoom.us/launch/edl?muid=2cb599f1-93c0-4ce2-a163-02337f578cfd',
  '852 6127 4662',
  '112025',
  90,
  12900,
  4900,
  72,
  true
);