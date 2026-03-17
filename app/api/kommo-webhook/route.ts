import { NextRequest, NextResponse } from "next/server";

const TG_BOT_TOKEN = process.env.TG_BOT_TOKEN!;
const TG_CHAT_ID = process.env.TG_CHAT_ID!;
const KOMMO_SUBDOMAIN = "letofacultetschool";
const KOMMO_ACCESS_TOKEN = process.env.KOMMO_ACCESS_TOKEN!;

async function sendTg(message: string) {
  if (!TG_BOT_TOKEN || !TG_CHAT_ID) return;
  await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: TG_CHAT_ID, text: message, parse_mode: "HTML" }),
  });
}

export async function POST(req: NextRequest) {
  try {
    const rawText = await req.text();
    const params = new URLSearchParams(rawText);

    const leadId = params.get("leads[add][0][id]");
    if (!leadId) {
      return NextResponse.json({ ok: true });
    }

    // Only process leads from PLA pipeline (12976892)
    const pipelineId = params.get("leads[add][0][pipeline_id]");
    if (pipelineId && pipelineId !== "12976892") {
      return NextResponse.json({ ok: true });
    }

    // Check if this is a website lead (has "Курс" field 777040)
    // Website leads are already notified from /api/lead — skip them here
    let isWebsite = false;
    let contactName = "";
    let contactPhone = "";

    try {
      const leadRes = await fetch(
        `https://${KOMMO_SUBDOMAIN}.kommo.com/api/v4/leads/${leadId}?with=contacts`,
        { headers: { Authorization: `Bearer ${KOMMO_ACCESS_TOKEN}` } }
      );
      if (leadRes.ok) {
        const leadData = await leadRes.json();

        // If lead has "Курс" field (777040) → it's from website, skip
        for (const field of leadData.custom_fields_values || []) {
          if (field.field_id === 777040) {
            isWebsite = true;
            break;
          }
        }

        if (!isWebsite) {
          const contactId = leadData._embedded?.contacts?.[0]?.id;
          if (contactId) {
            const contactRes = await fetch(
              `https://${KOMMO_SUBDOMAIN}.kommo.com/api/v4/contacts/${contactId}`,
              { headers: { Authorization: `Bearer ${KOMMO_ACCESS_TOKEN}` } }
            );
            if (contactRes.ok) {
              const contact = await contactRes.json();
              contactName = contact.name || "";
              for (const field of contact.custom_fields_values || []) {
                if (field.field_code === "PHONE") contactPhone = field.values?.[0]?.value || "";
              }
            }
          }
        }
      }
    } catch {
      // fallback
    }

    // Skip website leads (already notified from /api/lead)
    if (isWebsite) {
      return NextResponse.json({ ok: true });
    }

    const leadName = params.get("leads[add][0][name]") || "New lead";
    const name = contactName || leadName;

    const lines = [
      `📩 <b>Новая заявка с WhatsApp!</b>`,
      ``,
      `👤 <b>${name}</b>`,
      contactPhone ? `📱 ${contactPhone}` : "",
      `📊 Источник: <b>WhatsApp</b>`,
      ``,
      `🔗 <a href="https://letofacultetschool.kommo.com/leads/detail/${leadId}">Открыть в Kommo</a>`,
    ].filter(Boolean);

    await sendTg(lines.join("\n"));

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Kommo webhook error:", e);
    return NextResponse.json({ ok: true });
  }
}
