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

  const isLoading = status === "loading";

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
    `w-full px-4 py-3 rounded-xl border text-sm bg-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-400 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed ${
      err ? "border-red-400" : "border-neutral-200"
    }`;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-8">
      <h2 className="text-xl font-bold text-neutral-900 mb-6">{t("formTitle")}</h2>

      {status === "success" && (
        <div role="alert" aria-atomic="true" className="mb-5 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium">
          {t("formSuccess")}
        </div>
      )}

      {status === "error" && (
        <div role="alert" aria-atomic="true" className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
          {t("formError")}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <fieldset disabled={isLoading} className="contents">
          <div>
            <label htmlFor="contact-name" className="block text-sm font-medium text-neutral-700 mb-1.5">{t("formName")}</label>
            <input
              id="contact-name"
              {...register("name", { required: t("formErrName") })}
              className={inputCls(!!errors.name)}
              placeholder={t("formNamePlaceholder")}
              autoComplete="name"
            />
            {errors.name && <p role="alert" className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="contact-email" className="block text-sm font-medium text-neutral-700 mb-1.5">{t("formEmail")}</label>
            <input
              id="contact-email"
              {...register("email", {
                required: t("formErrEmail"),
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: t("formErrEmailFormat") },
              })}
              type="email"
              className={inputCls(!!errors.email)}
              placeholder={t("formEmailPlaceholder")}
              autoComplete="email"
            />
            {errors.email && <p role="alert" className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-sm font-medium text-neutral-700 mb-1.5">{t("formMessage")}</label>
            <textarea
              id="contact-message"
              {...register("message", { required: t("formErrMessage") })}
              rows={5}
              className={`${inputCls(!!errors.message)} resize-none`}
              placeholder={t("formMessagePlaceholder")}
            />
            {errors.message && <p role="alert" className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 rounded-full bg-brand-600 text-white font-semibold hover:bg-brand-700 disabled:opacity-60 transition-colors shadow-sm flex items-center justify-center gap-2"
        >
          {isLoading && <SpinnerIcon />}
          {isLoading ? t("formSending") : t("formSubmit")}
        </button>
      </form>
    </div>
  );
}

function SpinnerIcon() {
  return (
    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}
