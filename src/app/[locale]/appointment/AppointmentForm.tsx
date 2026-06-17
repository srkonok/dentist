"use client";

import { useId, useState, isValidElement, cloneElement, Children } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { CHAMBERS } from "@/lib/constants";

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

const SERVICE_KEYS = [
  "implants",
  "wisdom",
  "rootCanal",
  "cosmetic",
  "oralSurgery",
  "checkup",
] as const;

const MIRPUR_SLOTS = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
  "2:00 PM", "2:30 PM",
];

const KAFRUL_SLOTS = [
  "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM",
  "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM",
  "9:00 PM", "9:30 PM",
];

export default function AppointmentForm() {
  const t = useTranslations("appointment");
  const ts = useTranslations("services");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const selectedChamber = watch("chamber");
  const timeSlots = selectedChamber === "kafrul" ? KAFRUL_SLOTS : MIRPUR_SLOTS;

  const isLoading = status === "loading";

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

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid lg:grid-cols-3 gap-10">

        {/* Sidebar info */}
        <aside className="lg:col-span-1 space-y-5">
          {CHAMBERS.map((chamber) => (
            <InfoCard
              key={chamber.id}
              icon={<ClockIcon />}
              title={t(chamber.id === "mirpur" ? "chamberMirpur" : "chamberKafrul")}
              value={chamber.hours}
              sub={chamber.addressEn}
            />
          ))}
          <p className="text-xs text-neutral-500 px-1 flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
            {t("closedFridays")}
          </p>
          <div className="bg-brand-50 border border-brand-100 rounded-2xl p-5">
            <p className="text-sm text-neutral-600">
              <strong className="text-brand-700">{t("noteLabel")}</strong>{" "}
              {t("noteText")}
            </p>
          </div>
        </aside>

        {/* Form */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-neutral-100 p-8">
          <h2 className="text-xl font-bold text-neutral-900 mb-1">{t("title")}</h2>
          <p className="text-neutral-500 text-sm mb-7">{t("subtitle")}</p>

          {status === "success" && (
            <div role="alert" aria-atomic="true" className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium flex items-start gap-2">
              <CheckCircleIcon />
              {t("success")}
            </div>
          )}

          {status === "error" && (
            <div role="alert" aria-atomic="true" className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
              {t("error")}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
            <fieldset disabled={isLoading} className="contents">
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label={t("name")} error={errors.name?.message}>
                  <input
                    {...register("name", { required: t("errName") })}
                    placeholder={t("namePlaceholder")}
                    className={inputClass(!!errors.name)}
                    autoComplete="name"
                  />
                </Field>

                <Field label={t("phone")} error={errors.phone?.message}>
                  <input
                    {...register("phone", {
                      required: t("errPhone"),
                      pattern: { value: /^01[3-9]\d{8}$/, message: t("errPhoneFormat") },
                    })}
                    placeholder={t("phonePlaceholder")}
                    className={inputClass(!!errors.phone)}
                    autoComplete="tel"
                    type="tel"
                  />
                </Field>
              </div>

              <Field label={t("email")} error={errors.email?.message}>
                <input
                  {...register("email", {
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: t("errEmailFormat") },
                  })}
                  placeholder={t("emailPlaceholder")}
                  className={inputClass(!!errors.email)}
                  autoComplete="email"
                  type="email"
                />
              </Field>

              <Field label={t("chamber")} error={errors.chamber?.message}>
                <select
                  {...register("chamber", { required: t("errChamber") })}
                  className={inputClass(!!errors.chamber)}
                >
                  <option value="">{t("chamberPlaceholder")}</option>
                  <option value="mirpur">{t("chamberMirpur")}</option>
                  <option value="kafrul">{t("chamberKafrul")}</option>
                </select>
              </Field>

              <Field label={t("service")} error={errors.service?.message}>
                <select
                  {...register("service", { required: t("errService") })}
                  className={inputClass(!!errors.service)}
                >
                  <option value="">{t("servicePlaceholder")}</option>
                  {SERVICE_KEYS.map((key) => (
                    <option key={key} value={key}>{ts(`${key}.name`)}</option>
                  ))}
                </select>
              </Field>

              <div className="grid sm:grid-cols-2 gap-5">
                <Field label={t("date")} error={errors.date?.message}>
                  <input
                    {...register("date", {
                      required: t("errDate"),
                      validate: (v) =>
                        new Date(v).getUTCDay() !== 5 || t("closedFridaysError"),
                    })}
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    className={inputClass(!!errors.date)}
                  />
                </Field>

                <Field label={t("time")} error={errors.time?.message}>
                  <select
                    {...register("time", { required: t("errTime") })}
                    className={inputClass(!!errors.time)}
                  >
                    <option value="">{t("timePlaceholder")}</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label={t("notes")}>
                <textarea
                  {...register("notes")}
                  rows={3}
                  placeholder={t("notesPlaceholder")}
                  className={`${inputClass(false)} resize-none`}
                />
              </Field>
            </fieldset>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-full bg-brand-600 text-white font-semibold text-base hover:bg-brand-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              {isLoading && <SpinnerIcon />}
              {isLoading ? t("submitting") : t("submit")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function inputClass(hasError: boolean) {
  return `w-full px-4 py-3 rounded-xl border text-neutral-900 bg-white placeholder:text-neutral-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed ${
    hasError ? "border-red-400 focus:ring-red-300" : "border-neutral-200"
  }`;
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  const id = useId();
  const child = Children.only(children);
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-neutral-700 mb-1.5">{label}</label>
      {isValidElement<{ id?: string }>(child) ? cloneElement(child, { id }) : child}
      {error && (
        <p role="alert" className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}

function InfoCard({ icon, title, value, sub }: { icon: React.ReactNode; title: string; value: string; sub?: string }) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-100 p-5 flex items-start gap-3 shadow-sm">
      <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs text-neutral-400 font-medium mb-0.5">{title}</p>
        <p className="text-sm text-neutral-800 font-medium leading-snug">{value}</p>
        {sub && <p className="text-xs text-neutral-500 mt-1 leading-snug">{sub}</p>}
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

function CheckCircleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}
