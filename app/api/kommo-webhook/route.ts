import { NextRequest, NextResponse } from "next/server";

const TG_BOT_TOKEN = process.env.TG_BOT_TOKEN!;
const TG_CHAT_ID = process.env.TG_CHAT_ID!;
const KOMMO_SUBDOMAIN = "letofacultetschool";
const KOMMO_ACCESS_TOKEN = process.env.KOMMO_ACCESS_TOKEN!;

async function sendTg(message: string) {
  if (!TG_BOT_TOKEN || !TG_CHAT_ID) return;
  try {
    await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: TG_CHAT_ID, text: message, parse_mode: "HTML" }),
    });
  } catch (err) {
    console.error("Telegram send error:", err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const rawText = await req.text();
    const params = new URLSearchParams(rawText);

    // Check if this is a lead add event
    const leadId = params.get("leads[add][0][id]");
    if (!leadId) {
      return NextResponse.json({ ok: true });
    }

    const leadName = params.get("leads[add][0][name]") || "New lead";

    // Quick notification first — no delay, just send what we have from webhook
    // Then try to enrich with contact details from API
    let contactName = leadName;
    let phone = "";
    let email = "";

    try {
      const leadRes = await fetch(
        `https://${KOMMO_SUBDOMAIN}.kommo.com/api/v4/leads/${leadId}?with=contacts`,
        { headers: { Authorization: `Bearer ${KOMMO_ACCESS_TOKEN}` } }
      );
      if (leadRes.ok) {
        const leadData = await leadRes.json();
        const contactId = leadData._embedded?.contacts?.[0]?.id;
        if (contactId) {
          const contactRes = await fetch(
            `https://${KOMMO_SUBDOMAIN}.kommo.com/api/v4/contacts/${contactId}`,
            { headers: { Authorization: `Bearer ${KOMMO_ACCESS_TOKEN}` } }
          );
          if (contactRes.ok) {
            const contact = await contactRes.json();
            contactName = contact.name || leadName;
            for (const field of contact.custom_fields_values || []) {
              if (field.field_code === "PHONE") phone = field.values?.[0]?.value || "";
              if (field.field_code === "EMAIL") email = field.values?.[0]?.value || "";
            }
          }
        }
      }
    } catch {
      // use webhook data as fallback
    }

    // Determine source from webhook data
    // Website leads have email, WhatsApp leads typically don't
    const source = email ? "Сайт" : "WhatsApp";

    const lines = [
      `📩 <b>Новая заявка!</b>`,
      ``,
      `👤 <b>${contactName}</b>`,
      phone ? `📱 ${phone}` : "",
      email ? `📧 ${email}` : "",
      `📊 Источник: <b>${source}</b>`,
    ].filter(Boolean);

    await sendTg(lines.join("\n"));

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Kommo webhook error:", e);
    return NextResponse.json({ ok: true });
  }
}
