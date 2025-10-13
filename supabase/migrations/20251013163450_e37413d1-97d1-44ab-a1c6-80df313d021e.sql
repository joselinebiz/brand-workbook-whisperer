-- Create webinar_access table
CREATE TABLE public.webinar_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  purchased_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_accessed_at TIMESTAMP WITH TIME ZONE,
  stripe_session_id TEXT,
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.webinar_access ENABLE ROW LEVEL SECURITY;

-- Users can view their own access
CREATE POLICY "Users can view own webinar access"
ON public.webinar_access
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- No direct inserts - use edge functions only
CREATE POLICY "No direct inserts to webinar_access"
ON public.webinar_access
FOR INSERT
TO authenticated
WITH CHECK (false);

-- Users can update their own last_accessed_at
CREATE POLICY "Users can update own last_accessed_at"
ON public.webinar_access
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Index for faster lookups
CREATE INDEX idx_webinar_access_user_id ON public.webinar_access(user_id);