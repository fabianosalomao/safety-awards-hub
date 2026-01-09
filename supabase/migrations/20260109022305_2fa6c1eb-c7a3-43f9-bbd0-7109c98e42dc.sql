-- Remove the insecure anonymous upload policy
DROP POLICY IF EXISTS "Anyone can upload submission files" ON storage.objects;

-- Create a restrictive policy that only allows service role uploads
-- The Edge Function uses service role key, so uploads will work through it
CREATE POLICY "Only service role can upload submission files"
ON storage.objects
FOR INSERT
TO service_role
WITH CHECK (bucket_id = 'submissions-files');