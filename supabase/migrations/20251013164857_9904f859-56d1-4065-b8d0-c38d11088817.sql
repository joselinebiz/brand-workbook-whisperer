-- Add metadata column to leads table for storing UTM parameters
ALTER TABLE public.leads 
ADD COLUMN IF NOT EXISTS metadata jsonb DEFAULT '{}'::jsonb;