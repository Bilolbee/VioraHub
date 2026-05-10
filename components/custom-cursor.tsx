"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hoverState, setHoverState] = useState<"none" | "link" | "button" | "view">("none");
  const [labelText, setLabelText] = useState("");
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) setVisible(true);

      /* Magnetic */
      const target = e.target as HTMLElement;
      const magnetic = target.closest("[data-magnetic]") as HTMLElement | null;
      if (magnetic) {
        const rect = magnetic.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * 0.25;
        const dy = (e.clientY - cy) * 0.25;
        magnetic.style.transform = `translate(${dx}px, ${dy}px)`;
      } else {
        document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
          el.style.transform = "";
        });
      }

      /* Hover state detection */
      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorTarget) {
        const cursorType = cursorTarget.getAttribute("data-cursor") || "view";
        const cursorLabel = cursorTarget.getAttribute("data-cursor-label") || cursorType.toUpperCase();
        setHoverState("view");
        setLabelText(cursorLabel);
      } else {
        const linkOrButton = target.closest("a, button") as HTMLElement | null;
        if (linkOrButton) {
          setHoverState("link");
          setLabelText("");
        } else {
          setHoverState("none");
          setLabelText("");
        }
      }
    };

    const onDown = () => setClicked(true);
    const onUp = () => setClicked(false);

    const loop = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      label.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [visible]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  const ringSize = clicked ? 22 : hoverState === "view" ? 64 : hoverState === "link" ? 44 : 32;
  const dotSize = clicked ? 5 : hoverState === "view" ? 0 : hoverState === "link" ? 8 : 6;
  const showLabel = hoverState === "view" && labelText;

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] will-change-transform"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 280ms ease",
        }}
      >
        <div
          style={{
            width: `${dotSize}px`,
            height: `${dotSize}px`,
            background: hoverState === "link" ? "#bef264" : "#ffffff",
            borderRadius: "50%",
            transition: "width 200ms ease, height 200ms ease, background 200ms ease",
          }}
        />
      </div>

      {/* Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] will-change-transform"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 280ms ease",
        }}
      >
        <div
          style={{
            width: `${ringSize}px`,
            height: `${ringSize}px`,
            border: hoverState === "view" ? "0" : `1px solid ${hoverState === "link" ? "rgba(190,242,100,0.6)" : "rgba(255,255,255,0.3)"}`,
            background: hoverState === "view" ? "#bef264" : "transparent",
            borderRadius: "50%",
            transition: "width 360ms cubic-bezier(0.34,1.56,0.64,1), height 360ms cubic-bezier(0.34,1.56,0.64,1), border-color 240ms ease, background 240ms ease",
            mixBlendMode: hoverState === "view" ? "normal" : "difference" as const,
          }}
        />
      </div>

      {/* Label (when data-cursor is set) */}
      <div
        ref={labelRef}
        className="pointer-events-none fixed left-0 top-0 z-[9997] will-change-transform"
        style={{
          opacity: showLabel ? 1 : 0,
          transition: "opacity 200ms ease",
        }}
      >
        <span
          className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#0a0a0a]"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          {labelText}
        </span>
      </div>
    </>
  );
}
