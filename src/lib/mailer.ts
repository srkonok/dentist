import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL ?? "dr.atoshe@gmail.com";
export const FROM_ADDRESS = `"Dr. Atoshe Islam Dental" <${process.env.SMTP_USERNAME}>`;
