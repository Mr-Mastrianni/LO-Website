import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { email, name, source } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(
        JSON.stringify({ error: "Valid email is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Upsert the subscriber
    const { data: subscriber, error: dbError } = await supabase
      .rpc("upsert_subscriber", {
        p_email: email.toLowerCase().trim(),
        p_name: name || null,
        p_source: source || "signup_form",
      })
      .single();

    if (dbError || !subscriber) {
      console.error("Subscriber upsert error:", dbError);
      return new Response(
        JSON.stringify({ error: "Failed to process subscription" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // If already confirmed, no need to re-send confirmation
    if (subscriber.status === "confirmed") {
      return new Response(
        JSON.stringify({ success: true, message: "You're already subscribed!", already_confirmed: true }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // If unsubscribed, don't re-subscribe
    if (subscriber.status === "unsubscribed") {
      return new Response(
        JSON.stringify({ success: true, message: "Check your email to confirm" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send confirmation email via Resend
    const confirmUrl = `${SUPABASE_URL}/functions/v1/confirm-subscription?token=${subscriber.confirmation_token}`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Living Oncology <noreply@livingoncology.org>",
        to: [email],
        subject: "Confirm your subscription — Living Oncology",
        html: `
          <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #fdfaf3;">
            <div style="text-align: center; margin-bottom: 24px;">
              <h1 style="color: #1a365d; margin: 0; font-size: 24px;">Living Oncology</h1>
              <p style="color: #888; margin: 4px 0 0;">Newsletter Subscription</p>
            </div>

            <div style="background: white; border-radius: 12px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
              <p style="color: #444; font-size: 16px; line-height: 1.6;">
                Thank you for subscribing to Living Oncology updates! 🌿
              </p>
              <p style="color: #444; font-size: 16px; line-height: 1.6;">
                You'll receive news about our events, resources for patients and caregivers, and updates on our mission to bridge the gap between cancer patients and scientific research.
              </p>
              <p style="color: #444; font-size: 16px; line-height: 1.6;">
                Click the button below to confirm your subscription:
              </p>

              <div style="text-align: center; margin: 28px 0;">
                <a href="${confirmUrl}" style="display: inline-block; background: #1a365d; color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: bold; font-size: 16px;">
                  Confirm Subscription
                </a>
              </div>

              <p style="color: #888; font-size: 13px; line-height: 1.5;">
                If you didn't request this, you can safely ignore this email. You won't be subscribed unless you click the button above.
              </p>
            </div>

            <hr style="border: none; border-top: 1px solid #eee; margin-top: 24px;" />
            <p style="color: #999; font-size: 11px; text-align: center;">
              Living Oncology is a 501(c)(3) nonprofit organization.<br/>
              PO Box 12863, Chandler, AZ 85248-9998
            </p>
          </div>
        `,
      }),
    });

    const resendData = await res.json();

    return new Response(
      JSON.stringify({ success: true, message: "Check your email to confirm your subscription", resend: resendData }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Subscribe error:", message);
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
