-- Drop the existing SELECT policy on submissions
DROP POLICY IF EXISTS "Admins and reviewers can view submissions" ON public.submissions;

-- Create a new PERMISSIVE SELECT policy that explicitly requires authentication
-- and checks for admin or reviewer role
CREATE POLICY "Only authenticated admins and reviewers can view submissions"
ON public.submissions
FOR SELECT
TO authenticated
USING (is_admin_or_reviewer(auth.uid()));

-- Also fix the user_roles SELECT policy to explicitly require authentication
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;

CREATE POLICY "Authenticated users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid() OR has_role(auth.uid(), 'admin'::app_role));