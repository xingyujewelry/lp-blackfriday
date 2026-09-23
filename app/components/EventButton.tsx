"use client";

import type { CSSProperties, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  markLeadTracked,
  trackLead,
  waitForFbq,
} from "../lib/meta-pixel";
import {
  WA_URL_STORAGE_KEY,
  WHATSAPP_URL_FALLBACK,
} from "../lib/whatsapp-config";

export function EventButton({
  children = "Entrar no grupo do WhatsApp",
  className = "",
  style,
}: {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (loading) return;
    setLoading(true);

    let whatsappUrl: string = WHATSAPP_URL_FALLBACK;

    try {
      const res = await fetch("/api/click", { method: "POST" });
      if (res.ok) {
        const data = (await res.json()) as { url?: string };
        if (data.url) whatsappUrl = data.url;
      }
    } catch {
      /* fallback para o link principal */
    }

    try {
      sessionStorage.setItem(WA_URL_STORAGE_KEY, whatsappUrl);
    } catch {
      /* ignore */
    }

    const fired = trackLead();
    if (fired) {
      markLeadTracked();
    } else {
      waitForFbq(() => {
        if (trackLead()) markLeadTracked();
      });
    }

    router.push("/obrigado");
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className={`group relative inline-flex items-center justify-center overflow-hidden px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-[#f3eceb] transition-all duration-500 hover:bg-[#40343F] disabled:cursor-wait disabled:opacity-80 sm:px-10 sm:text-sm lg:px-11 lg:py-[1.1rem] ${className}`}
      style={{
        background: "#59271C",
        boxShadow: "0 10px 28px -14px rgba(89, 39, 28, 0.55)",
        ...style,
      }}
    >
      <span className="relative z-10">
        {loading ? "Abrindo…" : children}
      </span>
    </button>
  );
}
