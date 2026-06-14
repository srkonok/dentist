"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();

  async function onSubmit(data: ContactFormData) {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Server error");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  const inputCls = (err: boolean) =>
    `w-full px-4 py-2.5 rounded-xl border text-sm bg-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-400 transition-shadow ${
      err ? "border-red-400" : "border-neutral-200"
    }`;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-8">
      <h2 className="text-xl font-bold text-neutral-900 mb-6">{t("formTitle")}</h2>

      {status === "success" && (
        <div role="alert" className="mb-5 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium">
          {t("formSuccess")}
        </div>
      )}

      {status === "error" && (
        <div role="alert" className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
          {t("formError")}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-neutral-700 mb-1.5">{t("formName")}</label>
          <input
            id="contact-name"
            {...register("name", { required: "Name is required" })}
            className={inputCls(!!errors.name)}
            placeholder="Your full name"
            autoComplete="name"
          />
          {errors.name && <p role="alert" className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-neutral-700 mb-1.5">{t("formEmail")}</label>
          <input
            id="contact-email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" },
            })}
            type="email"
            className={inputCls(!!errors.email)}
            placeholder="your@email.com"
            autoComplete="email"
          />
          {errors.email && <p role="alert" className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="contact-message" className="block text-sm font-medium text-neutral-700 mb-1.5">{t("formMessage")}</label>
          <textarea
            id="contact-message"
            {...register("message", { required: "Message is required" })}
            rows={5}
            className={`${inputCls(!!errors.message)} resize-none`}
            placeholder="How can we help you?"
          />
          {errors.message && <p role="alert" className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-3.5 rounded-full bg-brand-600 text-white font-semibold hover:bg-brand-700 disabled:opacity-60 transition-colors shadow-sm"
        >
          {status === "loading" ? "Sending…" : t("formSubmit")}
        </button>
      </form>
    </div>
  );
}
