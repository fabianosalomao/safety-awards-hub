-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'reviewer');

-- Create enum for submission status
CREATE TYPE public.submission_status AS ENUM ('pending', 'under_review', 'approved', 'rejected');

-- Create submissions table
CREATE TABLE public.submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    
    -- Personal data
    name TEXT NOT NULL,
    job_title TEXT NOT NULL,
    company TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    
    -- Project data
    project_title TEXT NOT NULL,
    current_scenario TEXT NOT NULL,
    solution_applied TEXT NOT NULL,
    results_obtained TEXT NOT NULL,
    main_learning TEXT NOT NULL,
    what_would_change TEXT,
    
    -- Files and status
    file_urls TEXT[] DEFAULT '{}',
    status public.submission_status NOT NULL DEFAULT 'pending'
);

-- Create user_roles table for admin access control
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role public.app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on both tables
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.user_roles
        WHERE user_id = _user_id
          AND role = _role
    )
$$;

-- Create function to check if user is admin or reviewer
CREATE OR REPLACE FUNCTION public.is_admin_or_reviewer(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.user_roles
        WHERE user_id = _user_id
          AND role IN ('admin', 'reviewer')
    )
$$;

-- RLS Policies for submissions table
-- Anyone can insert (public submissions without login)
CREATE POLICY "Anyone can submit projects"
ON public.submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only admins/reviewers can view submissions
CREATE POLICY "Admins and reviewers can view submissions"
ON public.submissions
FOR SELECT
TO authenticated
USING (public.is_admin_or_reviewer(auth.uid()));

-- Only admins can update submissions
CREATE POLICY "Admins can update submissions"
ON public.submissions
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete submissions
CREATE POLICY "Admins can delete submissions"
ON public.submissions
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for user_roles table (only system/admin can manage)
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_submissions_updated_at
BEFORE UPDATE ON public.submissions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for submission files
INSERT INTO storage.buckets (id, name, public)
VALUES ('submissions-files', 'submissions-files', false);

-- Storage policies for submissions-files bucket
-- Anyone can upload files (for public submissions)
CREATE POLICY "Anyone can upload submission files"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'submissions-files');

-- Only admins/reviewers can view/download files
CREATE POLICY "Admins can view submission files"
ON storage.objects
FOR SELECT
TO authenticated
USING (
    bucket_id = 'submissions-files' 
    AND public.is_admin_or_reviewer(auth.uid())
);

-- Only admins can delete files
CREATE POLICY "Admins can delete submission files"
ON storage.objects
FOR DELETE
TO authenticated
USING (
    bucket_id = 'submissions-files' 
    AND public.has_role(auth.uid(), 'admin')
);