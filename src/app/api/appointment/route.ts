import { NextRequest, NextResponse } from "next/server";
import { transporter, NOTIFY_EMAIL, FROM_ADDRESS } from "@/lib/mailer";

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
  if (!/^(\+?880)?01[3-9]\d{8}$/.test(data.phone)) return "Invalid phone number";
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

  const chamberLabel =
    body.chamber === "mirpur"
      ? "Mirpur Dental Care — Mirpur 14"
      : "HD Popular Dental Care — West Kafrul";

  try {
    await transporter.sendMail({
      from: FROM_ADDRESS,
      to: NOTIFY_EMAIL,
      replyTo: body.email,
      subject: `New Appointment Request — ${body.name} (${body.date} ${body.time})`,
      html: `
        <h2 style="color:#0d9488">New Appointment Booking</h2>
        <table cellpadding="6" style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
          <tr><td><strong>Name</strong></td><td>${body.name}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${body.phone}</td></tr>
          <tr><td><strong>Email</strong></td><td>${body.email}</td></tr>
          <tr><td><strong>Chamber</strong></td><td>${chamberLabel}</td></tr>
          <tr><td><strong>Service</strong></td><td>${body.service}</td></tr>
          <tr><td><strong>Date</strong></td><td>${body.date}</td></tr>
          <tr><td><strong>Time</strong></td><td>${body.time}</td></tr>
          <tr><td><strong>Notes</strong></td><td>${body.notes || "—"}</td></tr>
        </table>
      `,
    });
  } catch (err) {
    console.error("[APPOINTMENT EMAIL ERROR]", err);
    return NextResponse.json(
      { error: "Failed to send notification. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "Booking received. We will contact you to confirm." },
    { status: 200 }
  );
}
