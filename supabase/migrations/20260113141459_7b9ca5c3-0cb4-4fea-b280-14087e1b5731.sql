-- Remove current INSERT policy
DROP POLICY IF EXISTS "Anyone can submit projects" ON public.submissions;

-- Create more restrictive INSERT policy
-- Forces status to be 'pending' and prevents manipulation of sensitive fields
CREATE POLICY "Public can submit projects with pending status"
ON public.submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (
  status = 'pending'::submission_status
);