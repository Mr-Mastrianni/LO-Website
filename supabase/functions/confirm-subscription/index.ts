import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request): Promise<Response> => {
  // Handle the confirmation link click (GET request from email)
  const url = new URL(req.url);
  const token = url.searchParams.get("token");

  if (!token) {
    // No token — redirect to homepage with error
    return new Response(null, {
      status: 302,
      headers: {
        ...corsHeaders,
        "Location": "https://www.livingoncology.org/?subscription=missing_token",
      },
    });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Find subscriber by token
    const { data: subscriber, error: findError } = await supabase
      .from("subscribers")
      .select("id, email, status")
      .eq("confirmation_token", token)
      .single();

    if (findError || !subscriber) {
      console.error("Token lookup error:", findError);
      return new Response(null, {
        status: 302,
        headers: {
          ...corsHeaders,
          "Location": "https://www.livingoncology.org/?subscription=invalid_token",
        },
      });
    }

    // Already confirmed — just redirect with success
    if (subscriber.status === "confirmed") {
      return new Response(null, {
        status: 302,
        headers: {
          ...corsHeaders,
          "Location": "https://www.livingoncology.org/?subscription=already_confirmed",
        },
      });
    }

    // Already unsubscribed
    if (subscriber.status === "unsubscribed") {
      return new Response(null, {
        status: 302,
        headers: {
          ...corsHeaders,
          "Location": "https://www.livingoncology.org/?subscription=unsubscribed",
        },
      });
    }

    // Confirm the subscription
    const { error: updateError } = await supabase
      .from("subscribers")
      .update({
        status: "confirmed",
        confirmed_at: new Date().toISOString(),
        confirmation_token: null, // clear token after use
      })
      .eq("id", subscriber.id);

    if (updateError) {
      console.error("Update error:", updateError);
      return new Response(null, {
        status: 302,
        headers: {
          ...corsHeaders,
          "Location": "https://www.livingoncology.org/?subscription=error",
        },
      });
    }

    // Success! Redirect to homepage with confirmation
    return new Response(null, {
      status: 302,
      headers: {
        ...corsHeaders,
        "Location": "https://www.livingoncology.org/?subscription=confirmed",
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Confirm subscription error:", message);
    return new Response(null, {
      status: 302,
      headers: {
        ...corsHeaders,
        "Location": "https://www.livingoncology.org/?subscription=error",
      },
    });
  }
});
