import { NextRequest, NextResponse } from "next/server";

const KOMMO_SUBDOMAIN = "letofacultetschool";
const KOMMO_ACCESS_TOKEN = process.env.KOMMO_ACCESS_TOKEN!;
const PIPELINE_ID = 12976892;

export async function POST(req: NextRequest) {
  try {
    const { name, phone, email, course, utm } = await req.json();
    const utmData = (utm || {}) as Record<string, string>;

    if (!name && !phone && !email) {
      return NextResponse.json({ error: "No data provided" }, { status: 400 });
    }

    // Create contact
    const contactRes = await fetch(
      `https://${KOMMO_SUBDOMAIN}.kommo.com/api/v4/contacts`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${KOMMO_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          {
            name: name || "Website Lead",
            custom_fields_values: [
              ...(phone
                ? [{ field_code: "PHONE", values: [{ value: phone, enum_code: "MOB" }] }]
                : []),
              ...(email
                ? [{ field_code: "EMAIL", values: [{ value: email, enum_code: "WORK" }] }]
                : []),
            ],
          },
        ]),
      }
    );

    if (!contactRes.ok) {
      console.error("Kommo contact error:", await contactRes.text());
      return NextResponse.json({ error: "Failed to create contact" }, { status: 500 });
    }

    const contactData = await contactRes.json();
    const contactId = contactData._embedded?.contacts?.[0]?.id;

    // Create lead linked to contact
    const leadRes = await fetch(
      `https://${KOMMO_SUBDOMAIN}.kommo.com/api/v4/leads`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${KOMMO_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          {
            name: `${course || "Website"} — ${name || "Unknown"}`,
            pipeline_id: PIPELINE_ID,
            _embedded: {
              contacts: [{ id: contactId }],
              ...(Object.keys(utmData).length > 0 && {
                tags: Object.entries(utmData).map(([k, v]) => ({ name: `${k}:${v}` })),
              }),
            },
          },
        ]),
      }
    );

    if (!leadRes.ok) {
      console.error("Kommo lead error:", await leadRes.text());
      return NextResponse.json({ error: "Failed to create lead" }, { status: 500 });
    }

    const data = await leadRes.json();
    const leadId = data._embedded?.leads?.[0]?.id;

    // Add UTM note to lead
    if (leadId && Object.keys(utmData).length > 0) {
      const utmText = Object.entries(utmData).map(([k, v]) => `${k}: ${v}`).join("\n");
      await fetch(
        `https://${KOMMO_SUBDOMAIN}.kommo.com/api/v4/leads/${leadId}/notes`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${KOMMO_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify([
            {
              note_type: "common",
              params: { text: `UTM метки:\n${utmText}` },
            },
          ]),
        }
      ).catch(() => {});
    }

    return NextResponse.json({ success: true, id: leadId });
  } catch (e) {
    console.error("Lead creation error:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
