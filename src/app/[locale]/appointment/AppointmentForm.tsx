"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

interface FormData {
  name: string;
  phone: string;
  email: string;
  chamber: string;
  service: string;
  date: string;
  time: string;
  notes: string;
}

const TIME_SLOTS = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
  "2:00 PM", "2:30 PM",
];

export default function AppointmentForm() {
  const t = useTranslations("appointment");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  async function onSubmit(data: FormData) {
    setStatus("loading");
    try {
      const res = await fetch("/api/appointment", {
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

  const services = [
    { key: "serviceImplants" },
    { key: "serviceWisdom" },
    { key: "serviceRootCanal" },
    { key: "serviceCosmetic" },
    { key: "serviceOralSurgery" },
    { key: "serviceCheckup" },
  ] as const;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid lg:grid-cols-3 gap-10">

        {/* Sidebar info */}
        <aside className="lg:col-span-1 space-y-5">
          <InfoCard
            icon={<ClockIcon />}
            title={t("hoursLabel")}
            value={t("hours")}
          />
          <InfoCard
            icon={<LocationIcon />}
            title={t("chamberMirpur")}
            value="Navy Market, Mirpur 14, Dhaka-1206"
          />
          <InfoCard
            icon={<LocationIcon />}
            title={t("chamberKafrul")}
            value="202/5, West Kafrul, Agargaon, Dhaka-1207"
          />
          <div className="bg-brand-50 border border-brand-100 rounded-2xl p-5">
            <p className="text-sm text-neutral-600">
              <strong className="text-brand-700">Note:</strong> {t("sidebarNote")}
            </p>
          </div>
        </aside>

        {/* Form */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-neutral-100 p-8">
          <h2 className="text-xl font-bold text-neutral-900 mb-1">{t("title")}</h2>
          <p className="text-neutral-500 text-sm mb-7">{t("subtitle")}</p>

          {status === "success" && (
            <div role="alert" className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium flex items-start gap-2">
              <CheckCircleIcon />
              {t("success")}
            </div>
          )}

          {status === "error" && (
            <div role="alert" className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
              {t("error")}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label={t("name")} htmlFor="appt-name" error={errors.name?.message}>
                <input
                  id="appt-name"
                  {...register("name", { required: t("errorNameRequired") })}
                  placeholder={t("namePlaceholder")}
                  className={inputClass(!!errors.name)}
                  autoComplete="name"
                />
              </Field>

              <Field label={t("phone")} htmlFor="appt-phone" error={errors.phone?.message}>
                <input
                  id="appt-phone"
                  {...register("phone", {
                    required: t("errorPhoneRequired"),
                    pattern: { value: /^(\+?880)?01[3-9]\d{8}$/, message: t("errorPhoneInvalid") },
                  })}
                  placeholder={t("phonePlaceholder")}
                  className={inputClass(!!errors.phone)}
                  autoComplete="tel"
                  type="tel"
                />
              </Field>
            </div>

            <Field label={t("email")} htmlFor="appt-email" error={errors.email?.message}>
              <input
                id="appt-email"
                {...register("email", {
                  required: t("errorEmailRequired"),
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: t("errorEmailInvalid") },
                })}
                placeholder={t("emailPlaceholder")}
                className={inputClass(!!errors.email)}
                autoComplete="email"
                type="email"
              />
            </Field>

            <Field label={t("chamber")} htmlFor="appt-chamber" error={errors.chamber?.message}>
              <select
                id="appt-chamber"
                {...register("chamber", { required: t("errorChamberRequired") })}
                className={inputClass(!!errors.chamber)}
              >
                <option value="">{t("chamberPlaceholder")}</option>
                <option value="mirpur">{t("chamberMirpur")}</option>
                <option value="kafrul">{t("chamberKafrul")}</option>
              </select>
            </Field>

            <Field label={t("service")} htmlFor="appt-service" error={errors.service?.message}>
              <select
                id="appt-service"
                {...register("service", { required: t("errorServiceRequired") })}
                className={inputClass(!!errors.service)}
              >
                <option value="">{t("servicePlaceholder")}</option>
                {services.map(({ key }) => (
                  <option key={key} value={t(key)}>{t(key)}</option>
                ))}
              </select>
            </Field>

            <div className="grid sm:grid-cols-2 gap-5">
              <Field label={t("date")} htmlFor="appt-date" error={errors.date?.message}>
                <input
                  id="appt-date"
                  {...register("date", { required: t("errorDateRequired") })}
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  className={inputClass(!!errors.date)}
                />
              </Field>

              <Field label={t("time")} htmlFor="appt-time" error={errors.time?.message}>
                <select
                  id="appt-time"
                  {...register("time", { required: t("errorTimeRequired") })}
                  className={inputClass(!!errors.time)}
                >
                  <option value="">{t("timePlaceholder")}</option>
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label={t("notes")} htmlFor="appt-notes">
              <textarea
                id="appt-notes"
                {...register("notes")}
                rows={3}
                placeholder={t("notesPlaceholder")}
                className={`${inputClass(false)} resize-none`}
              />
            </Field>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3.5 rounded-full bg-brand-600 text-white font-semibold text-base hover:bg-brand-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              {status === "loading" ? t("submitting") : t("submit")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function inputClass(hasError: boolean) {
  return `w-full px-4 py-2.5 rounded-xl border text-neutral-900 bg-white placeholder:text-neutral-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 transition-shadow ${
    hasError ? "border-red-400 focus:ring-red-300" : "border-neutral-200"
  }`;
}

function Field({
  label, htmlFor, error, children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-neutral-700 mb-1.5">{label}</label>
      {children}
      {error && (
        <p role="alert" className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}

function InfoCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-100 p-5 flex items-start gap-3 shadow-sm">
      <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs text-neutral-400 font-medium mb-0.5">{title}</p>
        <p className="text-sm text-neutral-800 font-medium leading-snug">{value}</p>
      </div>
    </div>
  );
}

function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
