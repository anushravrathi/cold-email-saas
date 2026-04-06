import { NextResponse } from "next/server";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(req: Request) {
  try {
    const { accessToken, contacts } = await req.json();

    console.log("TOKEN:", accessToken);

    const results = [];

    for (const contact of contacts) {
      const { name, email, company } = contact;

      const subject = `Opportunity at ${company}`;

      const body = `Hi ${name},

I hope you're doing well.

I am interested in opportunities at ${company} and would love to contribute.

Looking forward to hearing from you.

Best regards,
Anushrav Rathi`;

      const message = [
        "From: me",
        `To: ${email}`,
        `Subject: ${subject}`,
        "Content-Type: text/plain; charset=UTF-8",
        "",
        body,
      ].join("\r\n");

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

      console.log("GMAIL RESPONSE:", data);

      results.push({
        email,
        status: res.ok ? "sent" : "failed",
      });

      await delay(5000); // 5 sec for testing
    }

    return NextResponse.json({
      message: "Bulk emails sent",
      results,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to send emails" },
      { status: 500 }
    );
  }
}