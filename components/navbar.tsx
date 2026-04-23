"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/data/site";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-borderSubtle bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5">
        <Link href="/" className="text-lg font-semibold tracking-[0.2em]">
          VIORA HUB
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition ${
                  active ? "text-white" : "text-muted hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <Link
          href="/contact"
          className="rounded-full border border-accent px-4 py-2 text-xs font-semibold uppercase tracking-wider transition hover:bg-accent hover:shadow-glow"
        >
          Loyihani boshlash
        </Link>
      </div>
    </header>
  );
}
