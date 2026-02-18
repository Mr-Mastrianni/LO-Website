import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const {
            eventTitle,
            eventDate,
            eventTime,
            eventLocation,
            attendeeType,
            attendeeTypeLabel,
            registrationPrice,
            firstName,
            lastName,
            email,
            phone,
            registrationData,
            sponsorshipLevel,
            sponsorshipPrice,
            sponsorshipBenefits,
            registeredAt,
            paymentRequired,
            registrationStatus,
        } = await req.json();

        const extraFields = registrationData || {};

        // Build extra fields HTML (credentials, institution, organization, ticketCount, etc.)
        const fieldLabels: Record<string, string> = {
            credentials: "Title/Credentials",
            institution: "Institutional Affiliation",
            organization: "Organizational Affiliation",
            ticketCount: "Number of Tickets",
            sponsorshipLevel: "Sponsorship Level",
        };

        const extraHtml = Object.entries(extraFields)
            .filter(([key]) => key !== "sponsorshipLevel") // handled separately
            .map(([key, value]) => {
                const label = fieldLabels[key] || key;
                return `<tr><td style="padding:8px 12px;color:#666;font-weight:600;width:200px;border-bottom:1px solid #f0f0f0;">${label}</td><td style="padding:8px 12px;color:#333;border-bottom:1px solid #f0f0f0;">${value}</td></tr>`;
            })
            .join("");

        // Sponsorship section
        const sponsorshipHtml = sponsorshipLevel
            ? `
            <div style="margin-top:24px;padding:20px;background:#fef3c7;border-radius:8px;border-left:4px solid #f59e0b;">
                <h3 style="margin:0 0 12px 0;color:#92400e;font-size:16px;">⭐ Sponsorship Details</h3>
                <p style="margin:4px 0;color:#92400e;"><strong>Level:</strong> ${sponsorshipLevel}</p>
                <p style="margin:4px 0;color:#92400e;"><strong>Investment:</strong> ${sponsorshipPrice}</p>
                ${sponsorshipBenefits && sponsorshipBenefits.length > 0
                ? `<p style="margin:12px 0 4px 0;color:#92400e;font-weight:600;">Includes:</p>
                       <ul style="margin:0;padding-left:20px;color:#92400e;">
                           ${sponsorshipBenefits.map((b: string) => `<li style="margin:4px 0;">${b}</li>`).join("")}
                       </ul>`
                : ""
            }
            </div>`
            : "";

        // Payment/pricing alert
        let pricingHtml = "";
        if (registrationPrice === "Free") {
            pricingHtml = `<div style="margin-top:16px;padding:12px 16px;background:#d1fae5;border-radius:8px;color:#065f46;font-weight:600;">✅ Free Registration — No payment required</div>`;
        } else if (registrationPrice === "Donation") {
            pricingHtml = `<div style="margin-top:16px;padding:12px 16px;background:#dbeafe;border-radius:8px;color:#1e40af;font-weight:600;">💙 Donation-Based Registration — Follow up with donation instructions</div>`;
        } else if (registrationPrice === "Direct Link") {
            pricingHtml = `<div style="margin-top:16px;padding:12px 16px;background:#fef3c7;border-radius:8px;color:#92400e;font-weight:600;">🔗 Direct Pay — Send payment link to registrant's email</div>`;
        } else if (registrationPrice && registrationPrice !== "N/A") {
            pricingHtml = `<div style="margin-top:16px;padding:12px 16px;background:#fee2e2;border-radius:8px;color:#991b1b;font-weight:600;">💰 Registration Fee: ${registrationPrice} — Follow up to collect payment</div>`;
        }

        // Payment status banner for sponsors/vendors
        const paymentStatusHtml = paymentRequired
            ? `<div style="margin-top:16px;padding:16px 20px;background:#fee2e2;border-radius:8px;border-left:4px solid #dc2626;">
                <h3 style="margin:0 0 8px 0;color:#991b1b;font-size:16px;">⏳ ACTION REQUIRED: Payment Pending</h3>
                <p style="margin:0;color:#991b1b;font-size:14px;">This registrant was directed to the Zeffy donation form to complete payment. Please verify their payment in your <a href="https://www.zeffy.com" style="color:#991b1b;font-weight:bold;">Zeffy dashboard</a> before confirming their registration.</p>
               </div>`
            : "";

        const html = `
        <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:640px;margin:0 auto;background:#ffffff;">
            <!-- Header -->
            <div style="background:linear-gradient(135deg,${paymentRequired ? '#92400e,#b45309' : '#1f2937,#374151'});padding:32px;text-align:center;border-radius:8px 8px 0 0;">
                <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;">${paymentRequired ? '⏳ New Registration — Payment Pending' : '🎉 New Event Registration'}</h1>
                <p style="margin:8px 0 0;color:#d1d5db;font-size:14px;">Someone just registered on the Living Oncology website</p>
            </div>

            <!-- Event Info Banner -->
            <div style="background:#f9fafb;padding:20px 32px;border-bottom:2px solid #e5e7eb;">
                <h2 style="margin:0 0 8px 0;color:#1f2937;font-size:20px;">${eventTitle}</h2>
                <p style="margin:4px 0;color:#6b7280;font-size:14px;">📅 ${eventDate || "Date TBD"} &nbsp;&nbsp; 🕐 ${eventTime || "Time TBD"}</p>
                <p style="margin:4px 0;color:#6b7280;font-size:14px;">📍 ${eventLocation || "Location TBD"}</p>
            </div>

            <!-- Main Content -->
            <div style="padding:24px 32px;">
                <!-- Attendee Type Badge -->
                <div style="margin-bottom:20px;">
                    <span style="display:inline-block;padding:6px 16px;background:#e0e7ff;color:#3730a3;border-radius:20px;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">
                        ${attendeeTypeLabel}
                    </span>
                </div>

                <!-- Registrant Details Table -->
                <h3 style="margin:0 0 12px 0;color:#1f2937;font-size:16px;border-bottom:2px solid #e5e7eb;padding-bottom:8px;">Registrant Information</h3>
                <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
                    <tr>
                        <td style="padding:8px 12px;color:#666;font-weight:600;width:200px;border-bottom:1px solid #f0f0f0;">Full Name</td>
                        <td style="padding:8px 12px;color:#333;border-bottom:1px solid #f0f0f0;">${firstName} ${lastName}</td>
                    </tr>
                    <tr>
                        <td style="padding:8px 12px;color:#666;font-weight:600;border-bottom:1px solid #f0f0f0;">Email</td>
                        <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;">
                            ${email ? `<a href="mailto:${email}" style="color:#2563eb;text-decoration:none;">${email}</a>` : '<span style="color:#9ca3af;">Not provided</span>'}
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:8px 12px;color:#666;font-weight:600;border-bottom:1px solid #f0f0f0;">Phone</td>
                        <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;">
                            ${phone ? `<a href="tel:${phone}" style="color:#2563eb;text-decoration:none;">${phone}</a>` : '<span style="color:#9ca3af;">Not provided</span>'}
                        </td>
                    </tr>
                    ${extraHtml}
                </table>

                <!-- Payment Status Alert -->
                ${paymentStatusHtml}

                <!-- Pricing Alert -->
                ${pricingHtml}

                <!-- Sponsorship Section -->
                ${sponsorshipHtml}

                <!-- Registration Timestamp -->
                <div style="margin-top:24px;padding:16px;background:#f9fafb;border-radius:8px;border:1px solid #e5e7eb;">
                    <p style="margin:0;color:#6b7280;font-size:13px;">
                        📋 <strong>Registered:</strong> ${registeredAt || new Date().toISOString()} &nbsp;|&nbsp;
                        <strong>Attendee Type:</strong> ${attendeeTypeLabel} &nbsp;|&nbsp;
                        <strong>Fee:</strong> ${registrationPrice || "N/A"}
                    </p>
                </div>
            </div>

            <!-- Footer -->
            <div style="padding:20px 32px;background:#f9fafb;border-top:1px solid #e5e7eb;border-radius:0 0 8px 8px;text-align:center;">
                <p style="margin:0;color:#9ca3af;font-size:12px;">
                    This notification was sent automatically from the Living Oncology website.<br/>
                    You can view all registrations in your <a href="https://supabase.com/dashboard" style="color:#2563eb;">Supabase Dashboard</a>.
                </p>
            </div>
        </div>`;

        const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
                from: "Living Oncology <noreply@livingoncology.org>",
                to: ["thepresident@livingoncology.org"],
                subject: `${paymentRequired ? '⏳' : '🎉'} New ${attendeeTypeLabel} Registration${paymentRequired ? ' (PAYMENT PENDING)' : ''}: ${firstName} ${lastName} — ${eventTitle}`,
                html,
            }),
        });

        const data = await res.json();

        return new Response(JSON.stringify(data), {
            status: res.ok ? 200 : 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: (error as Error).message }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }
});
