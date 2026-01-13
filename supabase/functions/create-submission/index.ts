import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

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

// Field length limits
const MAX_TEXT_LENGTH = 500;
const MAX_TEXTAREA_LENGTH = 3000;
const MAX_EMAIL_LENGTH = 255;
const MAX_PHONE_LENGTH = 20;
const MAX_FILE_URLS = 5;

// Simple hash function for IP anonymization
function hashIP(ip: string): string {
  let hash = 0;
  for (let i = 0; i < ip.length; i++) {
    const char = ip.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
}

function getClientIp(req: Request): string {
  const headers = [
    'cf-connecting-ip',
    'x-real-ip',
    'x-forwarded-for',
  ];

  for (const header of headers) {
    const value = req.headers.get(header);
    if (value) {
      // x-forwarded-for can contain multiple IPs
      return value.split(',')[0].trim();
    }
  }

  return 'unknown';
}

// Input validation functions
function validateString(value: unknown, maxLength: number, fieldName: string): string {
  if (typeof value !== 'string') {
    throw new Error(`${fieldName} must be a string`);
  }
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    throw new Error(`${fieldName} is required`);
  }
  if (trimmed.length > maxLength) {
    throw new Error(`${fieldName} must be ${maxLength} characters or less`);
  }
  return trimmed;
}

function validateOptionalString(value: unknown, maxLength: number, fieldName: string): string | null {
  if (value === null || value === undefined || value === '') {
    return null;
  }
  if (typeof value !== 'string') {
    throw new Error(`${fieldName} must be a string`);
  }
  const trimmed = value.trim();
  if (trimmed.length > maxLength) {
    throw new Error(`${fieldName} must be ${maxLength} characters or less`);
  }
  return trimmed || null;
}

function validateEmail(value: unknown): string {
  const email = validateString(value, MAX_EMAIL_LENGTH, 'Email');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email format');
  }
  return email.toLowerCase();
}

function validatePhone(value: unknown): string | null {
  if (value === null || value === undefined || value === '') {
    return null;
  }
  const phone = validateOptionalString(value, MAX_PHONE_LENGTH, 'Phone');
  if (phone) {
    // Allow only digits, spaces, dashes, parentheses, and plus sign
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(phone)) {
      throw new Error('Invalid phone format');
    }
  }
  return phone;
}

function validateFileUrls(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }
  if (value.length > MAX_FILE_URLS) {
    throw new Error(`Maximum ${MAX_FILE_URLS} files allowed`);
  }
  const urls: string[] = [];
  for (const url of value) {
    if (typeof url === 'string' && url.trim().length > 0) {
      // Validate URL format - should be a path in our storage
      if (url.length > 500) {
        throw new Error('Invalid file URL');
      }
      urls.push(url.trim());
    }
  }
  return urls;
}

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);
  
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ success: false, error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    const body = await req.json();
    const clientIp = getClientIp(req);
    const ipHash = hashIP(clientIp);

    console.log(`Submission attempt from IP hash: ${ipHash}`);

    // Initialize Supabase client with service role
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check rate limit
    const { data: rateLimitAllowed, error: rateLimitError } = await supabase
      .rpc('check_submission_rate_limit', { client_ip_hash: ipHash });

    if (rateLimitError) {
      console.error('Rate limit check error:', rateLimitError);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to check rate limit' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!rateLimitAllowed) {
      console.log(`Rate limit exceeded for IP hash: ${ipHash}`);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Rate limit exceeded. Maximum 5 submissions per hour.' 
        }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate and sanitize all inputs
    const validatedData = {
      name: validateString(body.name, MAX_TEXT_LENGTH, 'Name'),
      job_title: validateString(body.job_title, MAX_TEXT_LENGTH, 'Job title'),
      company: validateString(body.company, MAX_TEXT_LENGTH, 'Company'),
      email: validateEmail(body.email),
      phone: validatePhone(body.phone),
      project_title: validateString(body.project_title, MAX_TEXT_LENGTH, 'Project title'),
      current_scenario: validateString(body.current_scenario, MAX_TEXTAREA_LENGTH, 'Current scenario'),
      solution_applied: validateString(body.solution_applied, MAX_TEXTAREA_LENGTH, 'Solution applied'),
      results_obtained: validateString(body.results_obtained, MAX_TEXTAREA_LENGTH, 'Results obtained'),
      main_learning: validateString(body.main_learning, MAX_TEXTAREA_LENGTH, 'Main learning'),
      what_would_change: validateOptionalString(body.what_would_change, MAX_TEXTAREA_LENGTH, 'What would change'),
      file_urls: validateFileUrls(body.file_urls),
    };

    console.log(`Validated submission for: ${validatedData.email}`);

    // Insert submission
    const { data, error } = await supabase
      .from('submissions')
      .insert(validatedData)
      .select('id')
      .single();

    if (error) {
      console.error('Insert error:', error);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to create submission' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Submission created successfully: ${data.id}`);

    return new Response(
      JSON.stringify({ success: true, id: data.id }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Submission error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
