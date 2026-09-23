"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import {
  consumeLeadTrackedFlag,
  trackLead,
  waitForFbq,
} from "../lib/meta-pixel";
import {
  WA_URL_STORAGE_KEY,
  WHATSAPP_URL_FALLBACK,
} from "../lib/whatsapp-config";

const REDIRECT_MS = 3000;

export default function ObrigadoPage() {
  const [secondsLeft, setSecondsLeft] = useState(3);
  const [whatsappUrl, setWhatsappUrl] = useState(WHATSAPP_URL_FALLBACK);
  const urlRef = useRef(WHATSAPP_URL_FALLBACK);

  useEffect(() => {
    let cancelWait: (() => void) | undefined;

    try {
      const stored = sessionStorage.getItem(WA_URL_STORAGE_KEY);
      if (stored) {
        urlRef.current = stored;
        setWhatsappUrl(stored);
        sessionStorage.removeItem(WA_URL_STORAGE_KEY);
      }
    } catch {
      /* ignore */
    }

    if (!consumeLeadTrackedFlag()) {
      cancelWait = waitForFbq(() => {
        trackLead();
      });
    }

    const started = Date.now();
    const tick = window.setInterval(() => {
      const elapsed = Date.now() - started;
      const left = Math.max(0, Math.ceil((REDIRECT_MS - elapsed) / 1000));
      setSecondsLeft(left);
    }, 200);

    const timer = window.setTimeout(() => {
      window.location.href = urlRef.current || WHATSAPP_URL_FALLBACK;
    }, REDIRECT_MS);

    return () => {
      cancelWait?.();
      window.clearTimeout(timer);
      window.clearInterval(tick);
    };
  }, []);

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-background px-6 text-center">
      <div
        className="pointer-events-none absolute inset-0 hidden bg-cover bg-top bg-no-repeat lg:block"
        style={{ backgroundImage: "url('/DESK.png')" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-top bg-no-repeat lg:hidden"
        style={{ backgroundImage: "url('/MOBI.png')" }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-[#0D0D0D]/55 lg:bg-[#0D0D0D]/45" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/70 via-[#0D0D0D]/40 to-[#0D0D0D]/80" />
      <div className="bg-grain pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative z-10 flex max-w-md flex-col items-center gap-6">
        <img
          src="/Logo.png"
          alt="Antecipa Black Friday"
          className="h-14 w-auto sm:h-16"
        />

        <div className="ornament-line ornament-line--dark" aria-hidden>
          <span className="ornament-diamond" />
        </div>

        <h1 className="font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
          Acesso liberado
        </h1>

        <p className="text-base font-normal leading-relaxed text-muted sm:text-lg">
          Estamos abrindo o grupo oficial do WhatsApp. Você será redirecionado
          em instantes.
        </p>

        <div className="mt-2 flex flex-col items-center gap-4">
          <Loader2
            className="h-8 w-8 animate-spin text-[#59271C]"
            strokeWidth={1.4}
            aria-hidden
          />
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold">
            Redirecionando em {secondsLeft}s…
          </p>
        </div>

        <a
          href={whatsappUrl}
          className="mt-4 text-sm font-normal text-muted underline underline-offset-4 transition-colors hover:text-foreground"
        >
          Se não abrir automaticamente, clique aqui
        </a>
      </div>
    </main>
  );
}
