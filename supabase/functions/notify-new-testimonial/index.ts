import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const APPROVAL_SECRET = Deno.env.get("APPROVAL_SECRET") || SUPABASE_SERVICE_ROLE_KEY;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function generateToken(id: string, action: string): string {
  // Simple HMAC-SHA256 token for approval links
  const encoder = new TextEncoder();
  const keyData = encoder.encode(APPROVAL_SECRET);
  const messageData = encoder.encode(`${id}:${action}`);

  return crypto.subtle
    .importKey("raw", keyData, { name: "HMAC", hash: "SHA-256" }, false, ["sign"])
    .then((key) => crypto.subtle.sign("HMAC", key, messageData))
    .then((sig) =>
      Array.from(new Uint8Array(sig))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")
    );
}

serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { id, name, email, role, content } = await req.json();

    if (!id || !name || !content) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const approveToken = await generateToken(id, "approve");
    const rejectToken = await generateToken(id, "reject");

    const functionBaseUrl = `${SUPABASE_URL}/functions/v1/manage-testimonial`;
    const approveUrl = `${functionBaseUrl}?id=${id}&action=approve&token=${approveToken}`;
    const rejectUrl = `${functionBaseUrl}?id=${id}&action=reject&token=${rejectToken}`;

    const storyExcerpt = content.length > 300
      ? content.substring(0, 300) + "..."
      : content;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Living Oncology <noreply@livingoncology.org>",
        to: ["thepresident@livingoncology.org"],
        subject: `New Testimonial from ${name} — Action Needed`,
        html: `
          <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #fdfaf3;">
            <div style="text-align: center; margin-bottom: 24px;">
              <h1 style="color: #1a365d; margin: 0; font-size: 24px;">Living Oncology</h1>
              <p style="color: #888; margin: 4px 0 0;">New Testimonial Submission</p>
            </div>
            
            <div style="background: white; border-radius: 12px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email || "Not provided"}</p>
              <p><strong>Role:</strong> ${role || "Not specified"}</p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
              <p><strong>Story:</strong></p>
              <blockquote style="background: #f9f7f2; border-left: 4px solid #1a365d; margin: 8px 0; padding: 16px; font-style: italic; color: #444; border-radius: 0 8px 8px 0;">
                "${storyExcerpt}"
              </blockquote>
            </div>

            <div style="text-align: center; margin: 28px 0;">
              <p style="color: #555; margin-bottom: 16px; font-size: 15px;">Tap a button below to review this testimonial:</p>
              
              <a href="${approveUrl}" style="display: inline-block; background: #2f855a; color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: bold; font-size: 16px; margin: 0 8px 8px 0;">
                ✅ Approve & Publish
              </a>
              
              <a href="${rejectUrl}" style="display: inline-block; background: #c53030; color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: bold; font-size: 16px; margin: 0 8px 8px 0;">
                ❌ Reject
              </a>
            </div>

            <p style="color: #888; font-size: 12px; margin-top: 8px;">
              Testimonial ID: <code>${id}</code><br/>
              Submitted: ${new Date().toLocaleString()}
            </p>
            
            <hr style="border: none; border-top: 1px solid #eee; margin-top: 24px;" />
            <p style="color: #999; font-size: 11px; text-align: center;">
              This notification was sent automatically from the Living Oncology website.<br/>
              Clicking Approve will publish this testimonial to livingoncology.org/testimonials
            </p>
          </div>
        `,
      }),
    });

    const data = await res.json();

    return new Response(JSON.stringify({ success: true, resend: data }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Notification error:", message);
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
