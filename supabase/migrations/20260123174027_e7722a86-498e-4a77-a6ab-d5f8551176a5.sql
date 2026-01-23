-- Add explicit deny policy for anonymous users on submissions table
-- This adds defense-in-depth: even if is_admin_or_reviewer had a bug, anon is explicitly blocked

CREATE POLICY "deny_anon_select_submissions"
ON public.submissions
FOR SELECT
TO anon
USING (false);

CREATE POLICY "deny_anon_update_submissions"
ON public.submissions
FOR UPDATE
TO anon
USING (false);

CREATE POLICY "deny_anon_delete_submissions"
ON public.submissions
FOR DELETE
TO anon
USING (false);