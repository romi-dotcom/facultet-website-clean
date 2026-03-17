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

async function getContactInfo(contactId: number): Promise<{ name: string; phone: string; email: string }> {
  const res = await fetch(
    `https://${KOMMO_SUBDOMAIN}.kommo.com/api/v4/contacts/${contactId}`,
    { headers: { Authorization: `Bearer ${KOMMO_ACCESS_TOKEN}` } }
  );
  if (!res.ok) return { name: "Unknown", phone: "", email: "" };

  const data = await res.json();
  const name = data.name || "Unknown";
  let phone = "";
  let email = "";

  for (const field of data.custom_fields_values || []) {
    if (field.field_code === "PHONE") phone = field.values?.[0]?.value || "";
    if (field.field_code === "EMAIL") email = field.values?.[0]?.value || "";
  }

  return { name, phone, email };
}

export async function POST(req: NextRequest) {
  try {
    const rawText = await req.text();

    // Parse form-urlencoded data from Kommo
    // Kommo webhook sends: leads[add][0][id], leads[add][0][name], etc.
    const params = new URLSearchParams(rawText);

    // Check if this is a lead add event
    const leadId = params.get("leads[add][0][id]");
    if (!leadId) {
      return NextResponse.json({ ok: true });
    }

    const leadName = params.get("leads[add][0][name]") || "New lead";

    // Get contact info and source from Kommo API
    let contactInfo = { name: "", phone: "", email: "" };
    let source = "";
    try {
      const leadRes = await fetch(
        `https://${KOMMO_SUBDOMAIN}.kommo.com/api/v4/leads/${leadId}?with=contacts`,
        { headers: { Authorization: `Bearer ${KOMMO_ACCESS_TOKEN}` } }
      );
      if (leadRes.ok) {
        const leadData = await leadRes.json();
        const contactId = leadData._embedded?.contacts?.[0]?.id;
        if (contactId) {
          contactInfo = await getContactInfo(contactId);

          // Check contact's chat channel to determine source
          const chatsRes = await fetch(
            `https://${KOMMO_SUBDOMAIN}.kommo.com/api/v4/contacts/${contactId}/chats`,
            { headers: { Authorization: `Bearer ${KOMMO_ACCESS_TOKEN}` } }
          );
          if (chatsRes.ok) {
            const chatsData = await chatsRes.json();
            const chats = chatsData._embedded?.chats || [];
            const hasWhatsApp = chats.some((c: Record<string, unknown>) => {
              const src = String(c.source || "").toLowerCase();
              return src.includes("whatsapp") || src.includes("waba");
            });
            source = hasWhatsApp ? "WhatsApp" : "Сайт";
          } else {
            source = "Сайт";
          }
        }
      }
    } catch {
      // fallback
    }

    const lines = [
      `📩 <b>Новая заявка!</b>`,
      ``,
      `👤 <b>${contactInfo.name || leadName}</b>`,
      contactInfo.phone ? `📱 ${contactInfo.phone}` : "",
      contactInfo.email ? `📧 ${contactInfo.email}` : "",
      source ? `📊 Источник: <b>${source}</b>` : "",
    ].filter(Boolean);

    await sendTg(lines.join("\n"));

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Kommo webhook error:", e);
    return NextResponse.json({ ok: true });
  }
}
