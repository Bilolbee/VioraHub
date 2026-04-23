"use client";

import { FormEvent, useState } from "react";

export function ContactFormClient() {
  const [status, setStatus] = useState<string>("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Yuborilmoqda...");
    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = Object.fromEntries(formData.entries());
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      setStatus("Yuborishda xatolik. Iltimos, Telegram orqali yozing.");
      return;
    }

    form.reset();
    setStatus("Sorov yuborildi. Tez orada siz bilan boglanamiz.");
  }

  return (
    <form onSubmit={handleSubmit} className="surface mt-8 rounded-[28px] p-6 md:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm text-muted">
          Ism
          <input
            required
            name="name"
            className="mt-2 w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-accent"
          />
        </label>
        <label className="text-sm text-muted">
          Biznes turi
          <input
            required
            name="businessType"
            className="mt-2 w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-accent"
          />
        </label>
        <label className="text-sm text-muted">
          Kerakli xizmat
          <input
            required
            name="neededService"
            className="mt-2 w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-accent"
          />
        </label>
        <label className="text-sm text-muted">
          Byudjet
          <input
            required
            name="budget"
            className="mt-2 w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-accent"
          />
        </label>
        <label className="text-sm text-muted md:col-span-2">
          Telefon
          <input
            required
            name="phone"
            className="mt-2 w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-accent"
          />
        </label>
      </div>
      <button type="submit" className="mt-6 rounded-full bg-accent px-7 py-3 text-sm font-semibold transition hover:shadow-glow">
        Sorov yuborish
      </button>
      {status ? <p className="mt-3 text-sm text-muted">{status}</p> : null}
    </form>
  );
}
