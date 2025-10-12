-- Security Fix: Add INSERT policy to profiles table
-- Since profiles are automatically created via the handle_new_user() trigger,
-- we disallow direct INSERTs to prevent unauthorized profile creation
CREATE POLICY "Profiles created via trigger only"
ON public.profiles
FOR INSERT
WITH CHECK (false);