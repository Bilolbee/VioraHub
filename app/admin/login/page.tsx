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
    <div className="mx-auto flex min-h-[70vh] max-w-xl items-center justify-center py-16">
      <div className="w-full rounded-3xl border border-borderSubtle bg-card p-8">
        <h1 className="text-3xl font-semibold">Admin panelga kirish</h1>
        <p className="mt-3 text-sm text-muted">
          Enterprise workflow: draft, approval va publish jarayonlari shu yerda boshqariladi.
        </p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="block text-sm text-muted">
            Login
            <input
              required
              name="login"
              type="text"
              className="mt-2 w-full rounded-xl border border-borderSubtle bg-transparent px-4 py-3 text-white outline-none focus:border-accent"
            />
          </label>
          <label className="block text-sm text-muted">
            Parol
            <input
              required
              name="password"
              type="password"
              className="mt-2 w-full rounded-xl border border-borderSubtle bg-transparent px-4 py-3 text-white outline-none focus:border-accent"
            />
          </label>
          <button
            disabled={loading}
            type="submit"
            className="w-full rounded-full bg-accent px-6 py-3 text-sm font-semibold transition hover:shadow-glow disabled:opacity-70"
          >
            {loading ? "Kirilmoqda..." : "Kirish"}
          </button>
          {error ? <p className="text-sm text-red-300">{error}</p> : null}
        </form>
      </div>
    </div>
  );
}
