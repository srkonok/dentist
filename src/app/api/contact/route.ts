import { NextRequest, NextResponse } from "next/server";

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

  // TODO: Connect to email service (e.g. Resend, SendGrid) or store in database.
  console.log("[CONTACT MESSAGE]", {
    timestamp: new Date().toISOString(),
    ...body,
  });

  return NextResponse.json(
    { message: "Message received. We will get back to you soon." },
    { status: 200 }
  );
}
