import { NextRequest, NextResponse } from "next/server";

const KOMMO_SUBDOMAIN = "letofacultetschool";
const KOMMO_CLIENT_ID = "c52bbd15-d25b-46f9-9f85-56b70dcf2b9a";
const KOMMO_CLIENT_SECRET = process.env.KOMMO_CLIENT_SECRET!;
const KOMMO_REDIRECT_URI = "https://facultet-website-clean.vercel.app";

async function refreshAccessToken(refreshToken: string) {
  const res = await fetch(
    `https://${KOMMO_SUBDOMAIN}.kommo.com/oauth2/access_token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: KOMMO_CLIENT_ID,
        client_secret: KOMMO_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        redirect_uri: KOMMO_REDIRECT_URI,
      }),
    }
  );
  if (!res.ok) throw new Error("Failed to refresh token");
  return res.json();
}

export async function POST(req: NextRequest) {
  try {
    const { name, phone, email, course } = await req.json();

    if (!name && !phone && !email) {
      return NextResponse.json({ error: "No data provided" }, { status: 400 });
    }

    // Get fresh access token
    const refreshToken = process.env.KOMMO_REFRESH_TOKEN!;
    let accessToken = process.env.KOMMO_ACCESS_TOKEN!;

    // Try creating lead, refresh token if 401
    let res = await createLead(accessToken, name, phone, email, course);

    if (res.status === 401) {
      const tokens = await refreshAccessToken(refreshToken);
      accessToken = tokens.access_token;
      // Note: In production, store the new refresh_token persistently
      res = await createLead(accessToken, name, phone, email, course);
    }

    if (!res.ok) {
      const err = await res.text();
      console.error("Kommo API error:", err);
      return NextResponse.json({ error: "Failed to create lead" }, { status: 500 });
    }

    const data = await res.json();
    return NextResponse.json({ success: true, id: data._embedded?.leads?.[0]?.id });
  } catch (e) {
    console.error("Lead creation error:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

async function createLead(
  accessToken: string,
  name: string,
  phone: string,
  email: string,
  course?: string
) {
  // First create contact
  const contactRes = await fetch(
    `https://${KOMMO_SUBDOMAIN}.kommo.com/api/v4/contacts`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
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

  if (!contactRes.ok) return contactRes;

  const contactData = await contactRes.json();
  const contactId = contactData._embedded?.contacts?.[0]?.id;

  // Create lead linked to contact
  return fetch(`https://${KOMMO_SUBDOMAIN}.kommo.com/api/v4/leads`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      {
        name: `${course || "Website"} — ${name || "Unknown"}`,
        _embedded: {
          contacts: [{ id: contactId }],
        },
      },
    ]),
  });
}
