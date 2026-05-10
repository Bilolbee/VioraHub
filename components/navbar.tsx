"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { BrandLogo } from "@/components/brand-logo";
import { NavItem } from "@/lib/cms-types";

type NavbarProps = {
  navLinks: NavItem[];
};

export function Navbar({ navLinks }: NavbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: scrolled ? "rgba(10,10,10,0.72)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(160%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(160%)" : "none",
        borderBottom: `1px solid ${scrolled ? "rgba(255,255,255,0.06)" : "transparent"}`,
        transition: "background 280ms ease, border-color 280ms ease, backdrop-filter 280ms ease",
      }}
    >
      <div className="container-shell flex h-[68px] items-center justify-between gap-4">
        <Link href="/" onClick={() => setOpen(false)} data-magnetic>
          <BrandLogo variant="lockup" size="sm" priority />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-full px-4 py-2 text-sm transition-colors duration-200 ${
                  active ? "text-white" : "text-white/55 hover:text-white"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-white/[0.06]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/contact" className="btn-primary hidden md:inline-flex" data-magnetic>
            Boshlash
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="relative flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-white/[0.1] bg-white/[0.025] transition-colors hover:border-white/20 md:hidden"
            aria-label="Menu"
          >
            <span
              className="block h-px w-4 bg-white/85"
              style={{
                transform: open ? "translateY(6px) rotate(45deg)" : "none",
                transition: "transform 240ms cubic-bezier(0.22,1,0.36,1)",
              }}
            />
            <span
              className="block h-px w-4 bg-white/85"
              style={{
                opacity: open ? 0 : 1,
                transition: "opacity 180ms ease",
              }}
            />
            <span
              className="block h-px w-4 bg-white/85"
              style={{
                transform: open ? "translateY(-6px) rotate(-45deg)" : "none",
                transition: "transform 240ms cubic-bezier(0.22,1,0.36,1)",
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/[0.06] bg-[#0a0a0a] md:hidden"
          >
            <div className="container-shell py-5">
              <div className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`block rounded-xl px-4 py-3 text-sm transition-colors ${
                        pathname === link.href
                          ? "bg-white/[0.04] text-white"
                          : "text-white/55 hover:text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + navLinks.length * 0.04, duration: 0.28 }}
                  className="mt-3"
                >
                  <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary w-full">
                    Loyihani boshlash
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
