import { NextRequest, NextResponse } from "next/server";

interface BookingPayload {
  name: string;
  phone: string;
  email: string;
  chamber: string;
  service: string;
  date: string;
  time: string;
  notes?: string;
}

function validate(data: Partial<BookingPayload>): string | null {
  if (!data.name?.trim()) return "Name is required";
  if (!data.phone?.trim()) return "Phone is required";
  if (!/^01[3-9]\d{8}$/.test(data.phone)) return "Invalid phone number";
  if (!data.email?.trim()) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return "Invalid email";
  if (!data.chamber) return "Chamber is required";
  if (!data.service) return "Service is required";
  if (!data.date) return "Date is required";
  const today = new Date().toISOString().split("T")[0];
  if (data.date < today) return "Appointment date cannot be in the past";
  if (!data.time) return "Time is required";
  return null;
}

export async function POST(req: NextRequest) {
  let body: Partial<BookingPayload>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const error = validate(body);
  if (error) {
    return NextResponse.json({ error }, { status: 422 });
  }

  // TODO: Connect to email service (e.g. Resend, SendGrid) or database (e.g. Supabase, Prisma)
  // For now, log to server console and return success.
  console.log("[APPOINTMENT BOOKING]", {
    timestamp: new Date().toISOString(),
    ...body,
  });

  return NextResponse.json(
    { message: "Booking received. We will contact you to confirm." },
    { status: 200 }
  );
}
