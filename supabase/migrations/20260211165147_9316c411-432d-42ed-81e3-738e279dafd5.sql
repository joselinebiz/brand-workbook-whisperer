
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Insert profile only
  INSERT INTO public.profiles (id, email)
  VALUES (new.id, new.email);
  
  RETURN new;
END;
$function$;
