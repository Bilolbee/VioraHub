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
    setStatus("So'rov yuborildi. Tez orada siz bilan bog'lanamiz.");
  }

  return (
    <form onSubmit={handleSubmit} className="section-shell rounded-[28px] p-6 md:p-8">
      <p className="text-xs uppercase tracking-[0.16em] text-accentSoft">Inquiry form</p>
      <h3 className="mt-2 text-2xl font-semibold text-white">Loyiha briefini yuboring</h3>
      <p className="mt-2 text-sm text-muted">Jamoamiz sizga mos ijro modeli va taxminiy timeline yuboradi.</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="text-sm text-muted">
          Ism
          <input required name="name" className="admin-input mt-2" />
        </label>
        <label className="text-sm text-muted">
          Biznes turi
          <input required name="businessType" className="admin-input mt-2" />
        </label>
        <label className="text-sm text-muted">
          Kerakli xizmat
          <input required name="neededService" className="admin-input mt-2" />
        </label>
        <label className="text-sm text-muted">
          Byudjet
          <input required name="budget" className="admin-input mt-2" />
        </label>
        <label className="text-sm text-muted md:col-span-2">
          Telefon
          <input required name="phone" className="admin-input mt-2" />
        </label>
      </div>
      <button type="submit" className="btn-primary mt-6">
        So&apos;rov yuborish
      </button>
      {status ? <p className="mt-3 text-sm text-muted">{status}</p> : null}
    </form>
  );
}
