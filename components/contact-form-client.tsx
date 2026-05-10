"use client";

import { FormEvent, useState } from "react";

export function ContactFormClient() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      setStatus("error");
      setMessage("Yuborishda xatolik. Telegram orqali yozing.");
      return;
    }

    form.reset();
    setStatus("ok");
    setMessage("So'rov qabul qilindi. 24 soat ichida bog'lanamiz.");
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-white/[0.06] bg-[#0d0d0d] p-7 md:p-9">
      <p className="text-[10px] uppercase tracking-[0.22em] text-white/35">Brief</p>
      <h3 className="mt-3 text-[28px] font-semibold leading-tight tracking-[-0.025em] text-white md:text-[32px]">
        Loyiha so&apos;rovi.
      </h3>
      <p className="mt-3 text-[15px] leading-[1.7] text-white/45">
        Quyidagi formani to&apos;ldiring — texnik yechim va taxminiy muddatni yuboramiz.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {[
          { label: "Ism", name: "name", placeholder: "Aziz" },
          { label: "Biznes yo'nalishi", name: "businessType", placeholder: "Restoran zanjiri" },
          { label: "Kerakli xizmat", name: "neededService", placeholder: "Telegram bot" },
          { label: "Taxminiy budjet", name: "budget", placeholder: "$500–1500" },
        ].map((field) => (
          <label key={field.name} className="block">
            <span className="block text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">
              {field.label}
            </span>
            <input required name={field.name} placeholder={field.placeholder} className="admin-input mt-2 normal-case tracking-normal" />
          </label>
        ))}
        <label className="block md:col-span-2">
          <span className="block text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">
            Telefon
          </span>
          <input required name="phone" placeholder="+998 90 ___ __ __" className="admin-input mt-2 normal-case tracking-normal" />
        </label>
      </div>

      <button type="submit" disabled={status === "sending"} className="btn-primary mt-7 disabled:opacity-60" data-magnetic>
        {status === "sending" ? "Yuborilmoqda..." : "So'rov yuborish"}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </button>

      {message && (
        <p className={`mt-4 text-[13px] ${status === "error" ? "text-red-400/80" : "text-accent"}`}>
          {message}
        </p>
      )}
    </form>
  );
}
