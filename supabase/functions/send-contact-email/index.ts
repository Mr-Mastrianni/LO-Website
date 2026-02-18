import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
    // Handle CORS preflight
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const { name, email, message, category, subscribe } = await req.json();

        const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
                from: "Living Oncology <noreply@livingoncology.org>",
                to: ["thepresident@livingoncology.org"],
                subject: `New Contact Form: ${category}`,
                html: `
          <h2>New Contact Form Submission</h2>
          <hr/>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Category:</strong> ${category}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
          <p><strong>Newsletter Subscription:</strong> ${subscribe ? "Yes" : "No"}</p>
          <hr/>
          <p style="color: #888; font-size: 12px;">This notification was sent automatically from the Living Oncology website.</p>
        `,
            }),
        });

        const data = await res.json();

        return new Response(JSON.stringify(data), {
            status: res.ok ? 200 : 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }
});
