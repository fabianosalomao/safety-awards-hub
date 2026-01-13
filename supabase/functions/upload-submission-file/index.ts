import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Allowed origins for CORS - restrict to your domain only
const ALLOWED_ORIGINS = [
  'https://sia.safetysummit.com.br',
  'https://www.sia.safetysummit.com.br',
  'https://safety-awards-hub.lovable.app',
];

function getCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get('origin') || '';
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Credentials': 'true',
  };
}

// Configuration
const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
const MAX_FILES_PER_SUBMISSION = 5;
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'video/mp4',
  'video/quicktime',
];
const ALLOWED_EXTENSIONS = ['pdf', 'jpg', 'jpeg', 'png', 'mp4', 'mov'];

// Simple in-memory rate limiting (resets on function cold start)
const uploadAttempts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes
const MAX_UPLOADS_PER_WINDOW = 10; // Max 10 file uploads per 10 minutes per IP

function getClientIp(req: Request): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
         req.headers.get('x-real-ip') || 
         'unknown';
}

function checkRateLimit(clientIp: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const attempt = uploadAttempts.get(clientIp);
  
  if (!attempt || now > attempt.resetTime) {
    uploadAttempts.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true };
  }
  
  if (attempt.count >= MAX_UPLOADS_PER_WINDOW) {
    return { 
      allowed: false, 
      retryAfter: Math.ceil((attempt.resetTime - now) / 1000) 
    };
  }
  
  attempt.count++;
  return { allowed: true };
}

function validateFileExtension(filename: string): boolean {
  const ext = filename.split('.').pop()?.toLowerCase();
  return ext ? ALLOWED_EXTENSIONS.includes(ext) : false;
}

function getContentType(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase();
  const mimeMap: Record<string, string> = {
    'pdf': 'application/pdf',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'mp4': 'video/mp4',
    'mov': 'video/quicktime',
  };
  return mimeMap[ext || ''] || 'application/octet-stream';
}

// Magic number validation for file type verification
function validateMagicNumbers(buffer: Uint8Array, expectedType: string): boolean {
  if (buffer.length < 12) return false;
  
  const signatures: Record<string, number[][]> = {
    'application/pdf': [[0x25, 0x50, 0x44, 0x46]], // %PDF
    'image/jpeg': [[0xFF, 0xD8, 0xFF]],
    'image/png': [[0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]],
    'video/mp4': [[0x00, 0x00, 0x00], [0x66, 0x74, 0x79, 0x70]], // ftyp at offset 4
    'video/quicktime': [[0x00, 0x00, 0x00], [0x66, 0x74, 0x79, 0x70]], // ftyp at offset 4
  };
  
  const sigs = signatures[expectedType];
  if (!sigs) return true; // Unknown type, skip magic check
  
  // For PDF, JPEG, PNG - check from start
  if (['application/pdf', 'image/jpeg', 'image/png'].includes(expectedType)) {
    const sig = sigs[0];
    for (let i = 0; i < sig.length; i++) {
      if (buffer[i] !== sig[i]) return false;
    }
    return true;
  }
  
  // For MP4/MOV - check for ftyp at offset 4
  if (['video/mp4', 'video/quicktime'].includes(expectedType)) {
    const ftyp = [0x66, 0x74, 0x79, 0x70];
    for (let i = 0; i < ftyp.length; i++) {
      if (buffer[4 + i] !== ftyp[i]) return false;
    }
    return true;
  }
  
  return true;
}

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);
  
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  const clientIp = getClientIp(req);
  console.log(`Upload request from IP: ${clientIp}`);

  try {
    // Check rate limit
    const rateCheck = checkRateLimit(clientIp);
    if (!rateCheck.allowed) {
      console.log(`Rate limit exceeded for IP: ${clientIp}`);
      return new Response(
        JSON.stringify({ 
          error: 'Too many upload attempts. Please try again later.',
          retryAfter: rateCheck.retryAfter 
        }),
        { 
          status: 429, 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json',
            'Retry-After': String(rateCheck.retryAfter)
          } 
        }
      );
    }

    // Parse multipart form data
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const fileCount = parseInt(formData.get('fileCount') as string || '1', 10);

    if (!file) {
      return new Response(
        JSON.stringify({ error: 'No file provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate file count
    if (fileCount > MAX_FILES_PER_SUBMISSION) {
      return new Response(
        JSON.stringify({ error: `Maximum ${MAX_FILES_PER_SUBMISSION} files allowed per submission` }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      console.log(`File too large: ${file.size} bytes from IP: ${clientIp}`);
      return new Response(
        JSON.stringify({ error: 'File size exceeds 20MB limit' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate file extension
    if (!validateFileExtension(file.name)) {
      console.log(`Invalid file extension: ${file.name} from IP: ${clientIp}`);
      return new Response(
        JSON.stringify({ error: 'Invalid file type. Allowed: PDF, JPG, PNG, MP4, MOV' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate MIME type
    const expectedMime = getContentType(file.name);
    if (!ALLOWED_MIME_TYPES.includes(expectedMime)) {
      console.log(`Invalid MIME type: ${expectedMime} from IP: ${clientIp}`);
      return new Response(
        JSON.stringify({ error: 'Invalid file type' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Read file and validate magic numbers
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    
    if (!validateMagicNumbers(uint8Array, expectedMime)) {
      console.log(`Magic number validation failed for: ${file.name} from IP: ${clientIp}`);
      return new Response(
        JSON.stringify({ error: 'File content does not match its extension' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create Supabase client with service role for upload
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Generate safe filename
    const fileExt = file.name.split('.').pop()?.toLowerCase();
    const safeFilename = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${fileExt}`;
    const filePath = `submissions/${safeFilename}`;

    // Upload to storage
    const { error: uploadError } = await supabase.storage
      .from('submissions-files')
      .upload(filePath, uint8Array, {
        contentType: expectedMime,
        upsert: false,
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      return new Response(
        JSON.stringify({ error: 'Failed to upload file' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`File uploaded successfully: ${filePath} from IP: ${clientIp}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        filePath,
        message: 'File uploaded successfully' 
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Upload error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
