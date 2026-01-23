import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

// Allowed origins for CORS - restrict to production domains only
const ALLOWED_ORIGINS = [
  'https://sia.safetysummit.com.br',
  'https://www.sia.safetysummit.com.br',
  'https://safety-awards-hub.lovable.app',
];

// Include preview URLs for development
const DEV_ORIGIN_PATTERN = /^https:\/\/.*\.lovable\.app$/;

function getCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get('origin') || '';
  
  // Check if origin is in allowed list or matches dev pattern
  const isAllowed = ALLOWED_ORIGINS.includes(origin) || DEV_ORIGIN_PATTERN.test(origin);
  const allowedOrigin = isAllowed ? origin : ALLOWED_ORIGINS[0];
  
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };
}

// Hash IP for privacy-compliant logging
function hashIP(ip: string): string {
  let hash = 0;
  for (let i = 0; i < ip.length; i++) {
    const char = ip.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
}

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP from headers
    const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() 
                  || req.headers.get("x-real-ip") 
                  || "unknown";

    const ipHash = hashIP(clientIP);
    console.log("Detecting country for IP hash:", ipHash);

    // Use free geolocation API (ip-api.com - 45 requests/min free tier)
    const geoResponse = await fetch(`http://ip-api.com/json/${clientIP}?fields=countryCode,status`);
    const geoData = await geoResponse.json();

    console.log("Geolocation response:", geoData);

    // Default to BR if detection fails
    const countryCode = geoData.status === "success" ? geoData.countryCode : "BR";
    
    // Brazil = PT, other countries = ES
    const language = countryCode === "BR" ? "pt" : "es";

    console.log(`Country: ${countryCode}, Language: ${language}`);

    return new Response(
      JSON.stringify({ 
        language, 
        countryCode,
        detected: geoData.status === "success"
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200 
      }
    );
  } catch (error) {
    console.error("Geolocation error:", error);
    
    // Fallback to Portuguese on error
    return new Response(
      JSON.stringify({ 
        language: "pt", 
        countryCode: "BR",
        detected: false,
        error: "Fallback to default" 
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200 
      }
    );
  }
});
