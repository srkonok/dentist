import { NextRequest, NextResponse } from "next/server";
import { transporter, NOTIFY_EMAIL, FROM_ADDRESS } from "@/lib/mailer";

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

function validate(data: Partial<ContactPayload>): string | null {
  if (!data.name?.trim()) return "Name is required";
  if (!data.email?.trim()) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return "Invalid email";
  if (!data.message?.trim()) return "Message is required";
  return null;
}

export async function POST(req: NextRequest) {
  let body: Partial<ContactPayload>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const error = validate(body);
  if (error) {
    return NextResponse.json({ error }, { status: 422 });
  }

  try {
    await transporter.sendMail({
      from: FROM_ADDRESS,
      to: NOTIFY_EMAIL,
      replyTo: body.email,
      subject: `New Contact Message — ${body.name}`,
      html: `
        <h2 style="color:#0d9488">New Contact Message</h2>
        <table cellpadding="6" style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
          <tr><td><strong>Name</strong></td><td>${body.name}</td></tr>
          <tr><td><strong>Email</strong></td><td>${body.email}</td></tr>
          <tr><td><strong>Message</strong></td><td style="white-space:pre-wrap">${body.message}</td></tr>
        </table>
        <p style="font-size:12px;color:#999;margin-top:16px">Reply directly to this email to respond to ${body.name}.</p>
      `,
    });
  } catch (err) {
    console.error("[CONTACT EMAIL ERROR]", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "Message received. We will get back to you soon." },
    { status: 200 }
  );
}
