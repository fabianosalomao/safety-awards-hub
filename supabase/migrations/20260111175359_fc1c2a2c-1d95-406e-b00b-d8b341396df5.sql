-- Fix 1: Add missing INSERT/UPDATE/DELETE policies to user_roles table
-- Only admins can assign, modify, or remove roles

CREATE POLICY "Only admins can assign roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can modify roles"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Fix 2: Add rate limiting for anonymous submissions
-- Create rate limiting table
CREATE TABLE IF NOT EXISTS public.submission_rate_limits (
  ip_hash TEXT PRIMARY KEY,
  submission_count INTEGER DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on rate limits table
ALTER TABLE public.submission_rate_limits ENABLE ROW LEVEL SECURITY;

-- No direct access to rate limits - only via function
CREATE POLICY "No direct access to rate limits"
ON public.submission_rate_limits
FOR ALL
TO anon, authenticated
USING (false);

-- Create rate limiting function
CREATE OR REPLACE FUNCTION public.check_submission_rate_limit(client_ip_hash TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_count INTEGER;
  current_window_start TIMESTAMP WITH TIME ZONE;
  max_submissions INTEGER := 5;
  rate_window INTERVAL := '1 hour';
BEGIN
  -- Get current rate limit record
  SELECT submission_count, window_start
  INTO current_count, current_window_start
  FROM submission_rate_limits
  WHERE ip_hash = client_ip_hash;
  
  IF NOT FOUND THEN
    -- First submission from this IP
    INSERT INTO submission_rate_limits (ip_hash, submission_count, window_start)
    VALUES (client_ip_hash, 1, now());
    RETURN TRUE;
  END IF;
  
  IF current_window_start < now() - rate_window THEN
    -- Window has expired, reset counter
    UPDATE submission_rate_limits
    SET submission_count = 1, window_start = now()
    WHERE ip_hash = client_ip_hash;
    RETURN TRUE;
  ELSIF current_count >= max_submissions THEN
    -- Rate limit exceeded
    RETURN FALSE;
  ELSE
    -- Increment counter
    UPDATE submission_rate_limits
    SET submission_count = current_count + 1
    WHERE ip_hash = client_ip_hash;
    RETURN TRUE;
  END IF;
END;
$$;