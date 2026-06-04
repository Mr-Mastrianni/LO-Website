import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const APPROVAL_SECRET = Deno.env.get("APPROVAL_SECRET") || SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function verifyToken(id: string, action: string, token: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(APPROVAL_SECRET);
  const messageData = encoder.encode(`${id}:${action}`);

  const key = await crypto.subtle.importKey(
    "raw", keyData, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, messageData);
  const expected = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return token === expected;
}

serve(async (req: Request): Promise<Response> => {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const action = url.searchParams.get("action");
  const token = url.searchParams.get("token");

  // Show a styled response page
  const html = (title: string, message: string, success: boolean) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title} — Living Oncology</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: Georgia, 'Times New Roman', serif;
          background: linear-gradient(135deg, #fdfaf3 0%, #f0e6d3 100%);
          min-height: 100vh;
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
        }
        .card {
          background: white;
          border-radius: 16px;
          padding: 48px;
          max-width: 480px;
          text-align: center;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
        }
        .icon { font-size: 48px; margin-bottom: 16px; }
        h1 { color: #1a365d; font-size: 28px; margin-bottom: 12px; }
        p { color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 24px; }
        .btn {
          display: inline-block;
          background: #1a365d;
          color: white;
          text-decoration: none;
          padding: 12px 28px;
          border-radius: 8px;
          font-weight: bold;
          font-family: 'Georgia', serif;
        }
        .status { 
          display: inline-block;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 16px;
        }
        .approved { background: #e6f4ea; color: #2f855a; }
        .rejected { background: #fce8e8; color: #c53030; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="icon">${success ? "✅" : "❌"}</div>
        <div class="status ${action === 'approve' ? 'approved' : 'rejected'}">
          ${action === 'approve' ? 'APPROVED' : 'REJECTED'}
        </div>
        <h1>${title}</h1>
        <p>${message}</p>
        <a href="https://www.livingoncology.org/testimonials" class="btn">
          View Testimonials
        </a>
      </div>
    </body>
    </html>
  `;

  if (!id || !action || !token) {
    return new Response(
      html("Invalid Request", "Missing required parameters.", false),
      { status: 400, headers: { "Content-Type": "text/html" } }
    );
  }

  if (action !== "approve" && action !== "reject") {
    return new Response(
      html("Invalid Action", "Action must be 'approve' or 'reject'.", false),
      { status: 400, headers: { "Content-Type": "text/html" } }
    );
  }

  try {
    // Verify the token
    const valid = await verifyToken(id, action, token);
    if (!valid) {
      return new Response(
        html("Invalid Token", "This approval link is invalid or has expired.", false),
        { status: 403, headers: { "Content-Type": "text/html" } }
      );
    }

    // Check current status
    const { data: existing } = await supabase
      .from("testimonials")
      .select("id, name, status")
      .eq("id", id)
      .single();

    if (!existing) {
      return new Response(
        html("Not Found", "This testimonial could not be found. It may have been deleted.", false),
        { status: 404, headers: { "Content-Type": "text/html" } }
      );
    }

    if (existing.status === action + "d") {
      // Already in this state — "approved" or "rejected"
      const actionLabel = action === "approve" ? "approved" : "rejected";
      return new Response(
        html(
          `Already ${actionLabel}`,
          `This testimonial from <strong>${existing.name}</strong> was already ${actionLabel}. No changes were made.`,
          action === "approve"
        ),
        { headers: { "Content-Type": "text/html" } }
      );
    }

    // Update the status
    const newStatus = action === "approve" ? "approved" : "rejected";
    const { error } = await supabase
      .from("testimonials")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      console.error("Update error:", error);
      return new Response(
        html("Database Error", "Could not update the testimonial. Please try again.", false),
        { status: 500, headers: { "Content-Type": "text/html" } }
      );
    }

    if (action === "approve") {
      return new Response(
        html(
          "Testimonial Approved! 🎉",
          `<strong>${existing.name}'s</strong> story has been published and is now visible on the Living Oncology testimonials page. Thank you for reviewing!`,
          true
        ),
        { headers: { "Content-Type": "text/html" } }
      );
    } else {
      return new Response(
        html(
          "Testimonial Rejected",
          `<strong>${existing.name}'s</strong> testimonial has been rejected and will not appear on the site. It remains in the database for reference.`,
          false
        ),
        { headers: { "Content-Type": "text/html" } }
      );
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Manage testimonial error:", message);
    return new Response(
      html("Server Error", "An unexpected error occurred. Please try again later.", false),
      { status: 500, headers: { "Content-Type": "text/html" } }
    );
  }
});
