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

// Build redirect URL to the LO testimonials page with status/error params.
// Supabase overrides Content-Type on Edge Function responses (injecting
// text/plain + nosniff + CSP sandbox), so we can't return HTML directly.
function redirect(location: string): Response {
  return new Response(null, {
    status: 302,
    headers: { "Location": location },
  });
}

serve(async (req: Request): Promise<Response> => {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const action = url.searchParams.get("action");
  const token = url.searchParams.get("token");

  const base = "https://www.livingoncology.org/testimonials";

  if (!id || !action || !token) {
    return redirect(`${base}?error=missing_params`);
  }

  if (action !== "approve" && action !== "reject") {
    return redirect(`${base}?error=invalid_action`);
  }

  try {
    // Verify the HMAC token
    const valid = await verifyToken(id, action, token);
    if (!valid) {
      return redirect(`${base}?error=invalid_token`);
    }

    // Look up the testimonial
    const { data: existing } = await supabase
      .from("testimonials")
      .select("id, name, status")
      .eq("id", id)
      .single();

    if (!existing) {
      return redirect(`${base}?error=not_found`);
    }

    const newStatus = action === "approve" ? "approved" : "rejected";

    if (existing.status === newStatus) {
      // Already processed — redirect with "already" state
      return redirect(
        `${base}?status=${newStatus}&name=${encodeURIComponent(existing.name)}&already=1`
      );
    }

    // Update the status
    const { error } = await supabase
      .from("testimonials")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      console.error("Update error:", error);
      return redirect(`${base}?error=db_error`);
    }

    // Success — redirect with status + name
    return redirect(
      `${base}?status=${newStatus}&name=${encodeURIComponent(existing.name)}`
    );

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Manage testimonial error:", message);
    return redirect(`${base}?error=server_error`);
  }
});
