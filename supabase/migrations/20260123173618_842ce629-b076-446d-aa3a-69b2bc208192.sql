-- Add INSERT policy that blocks direct anonymous inserts
-- Edge Functions using service_role bypass RLS, so they will continue to work
-- This makes the security intent explicit: submissions must go through the Edge Function

CREATE POLICY "insert_submissions_blocked_use_edge_function"
ON public.submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (false);