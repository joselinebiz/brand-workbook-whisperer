-- Add user_id column to leads table to link leads to user accounts
ALTER TABLE public.leads 
ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;