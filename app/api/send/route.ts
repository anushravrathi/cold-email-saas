import { NextResponse } from "next/server";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(req: Request) {
  try {
    const { accessToken, contacts } = await req.json();

    const results = [];

    for (const contact of contacts) {
      const { name, email, company } = contact;

      // 🧠 Template
      const subject = `Opportunity at ${company}`;

      const body = `
Hi ${name},

I hope you're doing well.

I am a student interested in opportunities at ${company}. I would love to contribute and learn from your team.

Please find my resume attached.

Looking forward to hearing from you.

Best regards,  
Anushrav Rathi
`;

      const message = [
        "From: me",
        `To: ${email}`,
        `Subject: ${subject}`,
        "Content-Type: text/plain; charset=utf-8",
        "",
        body,
      ].join("\n");

      const encodedMessage = Buffer.from(message)
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");

      const res = await fetch(
        "https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            raw: encodedMessage,
          }),
        }
      );

      const data = await res.json();

      results.push({
        email,
        status: res.ok ? "sent" : "failed",
        response: data,
      });

      console.log(`Sent to ${email}`);

      // ⏳ Delay (IMPORTANT)
      await delay(60000); // 60 seconds
    }

    return NextResponse.json({
      message: "Bulk emails processed",
      results,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Bulk send failed" },
      { status: 500 }
    );
  }
}