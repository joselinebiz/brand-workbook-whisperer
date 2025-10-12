-- Add restrictive RLS policies to purchases table for defense in depth

-- Prevent all direct inserts (purchases must only be created via verified edge functions)
CREATE POLICY "No direct inserts - use edge functions"
ON public.purchases FOR INSERT
WITH CHECK (false);

-- Prevent all updates (purchase records should be immutable for audit trail)
CREATE POLICY "Purchase records are immutable"
ON public.purchases FOR UPDATE
USING (false);

-- Prevent all deletes (maintain complete audit trail)
CREATE POLICY "Purchase records cannot be deleted"
ON public.purchases FOR DELETE
USING (false);