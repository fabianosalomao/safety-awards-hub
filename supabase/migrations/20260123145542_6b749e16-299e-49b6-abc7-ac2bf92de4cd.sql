-- Fix RLS policies for submissions and user_roles tables
-- The issue is that the existing SELECT policies are RESTRICTIVE (AND logic)
-- They need to be PERMISSIVE to properly grant access to authorized users only

-- 1. Drop existing RESTRICTIVE SELECT policies
DROP POLICY IF EXISTS "Admins and reviewers can view submissions" ON public.submissions;
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;

-- 2. Create PERMISSIVE SELECT policy for submissions table
-- Only authenticated admins and reviewers can view submissions
CREATE POLICY "Admins and reviewers can view submissions"
ON public.submissions
FOR SELECT
TO authenticated
USING (is_admin_or_reviewer(auth.uid()));

-- 3. Create PERMISSIVE SELECT policy for user_roles table
-- Users can view their own roles, and admins can view all roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid() OR has_role(auth.uid(), 'admin'::app_role));