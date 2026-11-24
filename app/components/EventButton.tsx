"use client";

import type { CSSProperties, ReactNode } from "react";
import { useModal } from "./ModalContext";

export function EventButton({
  children = "Entrar agora no grupo VIP",
  className = "",
  style,
}: {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const { open } = useModal();
  return (
    <button
      type="button"
      onClick={open}
      className={`group relative inline-flex items-center justify-center overflow-hidden px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-white transition-all duration-500 hover:brightness-110 sm:px-10 sm:text-sm lg:px-11 lg:py-[1.1rem] animate-cta-pulse ${className}`}
      style={{
        background: "#F45D26",
        ...style,
      }}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}