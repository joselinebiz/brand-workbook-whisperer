-- Create leads table for landing page email captures
CREATE TABLE public.leads (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL UNIQUE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  converted boolean NOT NULL DEFAULT false,
  webinar_purchased boolean NOT NULL DEFAULT false,
  source text DEFAULT 'landing_page'
);

-- Enable RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Leads can be inserted by anyone (public landing page)
CREATE POLICY "Anyone can insert leads"
ON public.leads
FOR INSERT
WITH CHECK (true);

-- Only admins can view leads (you'll manage in backend)
CREATE POLICY "No public access to leads data"
ON public.leads
FOR SELECT
USING (false);

-- Create index for email lookups
CREATE INDEX idx_leads_email ON public.leads(email);
CREATE INDEX idx_leads_created_at ON public.leads(created_at DESC);