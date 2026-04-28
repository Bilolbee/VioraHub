"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const payload = {
      login: String(formData.get("login") || ""),
      password: String(formData.get("password") || "")
    };

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    setLoading(false);

    if (!response.ok) {
      const body = await response.json().catch(() => ({ error: "Kirish muvaffaqiyatsiz" }));
      setError(body.error || "Kirish muvaffaqiyatsiz");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="relative mx-auto flex min-h-[74vh] max-w-6xl items-center justify-center py-16">
      <div className="pointer-events-none absolute -top-16 right-10 h-52 w-52 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-10 h-52 w-52 rounded-full bg-accentSoft/20 blur-3xl" />
      <div className="grid w-full gap-6 lg:grid-cols-[1fr_0.9fr]">
        <section className="surface hidden rounded-3xl p-10 lg:block">
          <p className="inline-flex rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-accentSoft">
            VioraHub Control
          </p>
          <h1 className="mt-6 text-4xl font-semibold leading-tight text-white">
            Professional
            <span className="block bg-gradient-to-r from-white to-accentSoft bg-clip-text text-transparent">
              Admin Workflow
            </span>
          </h1>
          <p className="mt-5 max-w-md text-sm leading-7 text-muted">
            Staging saqlash, publish tasdiqlash, audit log kuzatish va lead monitoring bitta panelda boshqariladi.
          </p>
          <div className="mt-8 space-y-3 text-sm text-muted">
            <p className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">Editor: kontentni tahrirlaydi</p>
            <p className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">Reviewer/Admin: productionga chiqaradi</p>
            <p className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">Audit: har action loglanadi</p>
          </div>
        </section>

        <section className="surface rounded-3xl p-8 md:p-10">
          <h2 className="text-3xl font-semibold text-white">Admin panelga kirish</h2>
          <p className="mt-3 text-sm text-muted">Login malumotlarini kiriting va boshqaruv paneliga oting.</p>
          <form onSubmit={onSubmit} className="mt-7 space-y-4">
            <label className="block text-sm text-muted">
              Login
              <input
                required
                name="login"
                type="text"
                className="mt-2 w-full rounded-xl border border-white/15 bg-black/25 px-4 py-3 text-white outline-none transition focus:border-accent"
              />
            </label>
            <label className="block text-sm text-muted">
              Parol
              <input
                required
                name="password"
                type="password"
                className="mt-2 w-full rounded-xl border border-white/15 bg-black/25 px-4 py-3 text-white outline-none transition focus:border-accent"
              />
            </label>
            <button
              disabled={loading}
              type="submit"
              className="w-full rounded-full bg-accent px-6 py-3 text-sm font-semibold transition hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Kirilmoqda..." : "Kirish"}
            </button>
            {error ? (
              <div className="rounded-xl border border-red-400/35 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div>
            ) : null}
          </form>
        </section>
      </div>
    </div>
  );
}
