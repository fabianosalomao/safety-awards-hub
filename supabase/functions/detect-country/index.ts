import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP from headers
    const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() 
                  || req.headers.get("x-real-ip") 
                  || "unknown";

    console.log("Detecting country for IP:", clientIP);

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
