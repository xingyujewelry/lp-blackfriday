"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2 } from "lucide-react";
import { useModal } from "./ModalContext";
import { markLeadTracked, trackLead, waitForFbq } from "../lib/meta-pixel";
import {
  WA_URL_STORAGE_KEY,
  WHATSAPP_URL_FALLBACK,
} from "../lib/whatsapp-config";

const LEAD_ENDPOINT = "/api/lead";

const profiles = ["Revendedor", "Atacadista", "Varejista"];

type Status = "idle" | "loading" | "error";

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function getUtms() {
  if (typeof window === "undefined") {
    return {
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_content: "",
      utm_term: "",
    };
  }
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") ?? "",
    utm_medium: params.get("utm_medium") ?? "",
    utm_campaign: params.get("utm_campaign") ?? "",
    utm_content: params.get("utm_content") ?? "",
    utm_term: params.get("utm_term") ?? "",
  };
}

export function SignupForm({
  buttonLabel = "Entrar no grupo VIP",
  botao = "Botão 1",
  grupo = "1",
}: {
  buttonLabel?: string;
  botao?: string;
  grupo?: string;
}) {
  const router = useRouter();
  const { close } = useModal();
  const [profile, setProfile] = useState<string>(profiles[0]);
  const [nome, setNome] = useState("");
  const [numero, setNumero] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");

    const utms = getUtms();
    const payload = {
      nome,
      numero: numero.replace(/\D/g, ""),
      botao,
      grupo,
      perfil: profile,
      ...utms,
    };

    try {
      const [leadRes, clickRes] = await Promise.all([
        fetch(LEAD_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }),
        fetch("/api/click", { method: "POST" }),
      ]);

      if (!leadRes.ok) throw new Error(`HTTP ${leadRes.status}`);

      let whatsappUrl = WHATSAPP_URL_FALLBACK;
      if (clickRes.ok) {
        const data = (await clickRes.json()) as { url?: string };
        if (data.url) whatsappUrl = data.url;
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

      const params = new URLSearchParams();
      Object.entries(utms).forEach(([key, value]) => {
        if (value) params.set(key, value);
      });
      const query = params.toString();
      close();
      document.body.style.overflow = "";
      router.push(query ? `/obrigado?${query}` : "/obrigado");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-gold">
        Operação 2027
      </p>
      <h2 className="mt-3 pr-8 font-helvetica text-xl font-medium leading-snug tracking-tight text-foreground sm:text-[1.55rem]">
        Preencha suas informações para liberar acesso ao grupo VIP
      </h2>
      <form className="mt-8 w-full" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            name="nome"
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Qual seu nome?"
            autoComplete="name"
            className="h-12 w-full border border-border bg-[#1a1a12] px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent/50"
          />
          <input
            type="tel"
            name="telefone"
            required
            value={numero}
            onChange={(e) => setNumero(formatPhone(e.target.value))}
            placeholder="Qual seu whatsapp com (DDD)?"
            autoComplete="tel"
            inputMode="numeric"
            maxLength={15}
            pattern="\(\d{2}\) \d{4,5}-\d{4}"
            title="Informe um WhatsApp válido com DDD"
            className="h-12 w-full border border-border bg-[#1a1a12] px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent/50"
          />
        </div>

        <fieldset className="mt-6">
          <legend className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted">
            Você é:
          </legend>
          <div className="mt-3 flex flex-col gap-2 sm:grid sm:grid-cols-3 sm:gap-2">
            {profiles.map((p) => {
              const active = profile === p;
              return (
                <label
                  key={p}
                  className={`flex w-full cursor-pointer items-center gap-3 border px-4 py-3 transition-colors duration-300 sm:justify-center sm:gap-2 sm:px-3 sm:py-2.5 ${
                    active
                      ? "border-accent/60 bg-accent/15 text-foreground"
                      : "border-border bg-white/[0.03] text-muted hover:border-gold/30"
                  }`}
                >
                  <input
                    type="radio"
                    name="perfil"
                    value={p}
                    checked={active}
                    onChange={() => setProfile(p)}
                    className="sr-only"
                  />
                  <span
                    className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center border transition-colors ${
                      active
                        ? "border-accent bg-accent text-[#0D0D0D]"
                        : "border-gold/30 bg-transparent"
                    }`}
                    aria-hidden
                  >
                    {active ? (
                      <Check className="h-2 w-2" strokeWidth={3} />
                    ) : null}
                  </span>
                  <span className="text-sm font-medium sm:text-xs">{p}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={status === "loading"}
          className="group mt-8 inline-flex w-full items-center justify-center gap-2.5 px-4 py-4 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-all duration-500 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70 sm:text-xs"
          style={{
            background: "#F45D26",
            boxShadow: "0 10px 28px -14px rgba(244, 93, 38, 0.55)",
          }}
        >
          {status === "loading" ? (
            <>
              <Loader2
                className="h-4 w-4 animate-spin"
                strokeWidth={1.4}
                aria-hidden
              />
              Enviando...
            </>
          ) : (
            buttonLabel
          )}
        </button>

        {status === "error" ? (
          <p className="mt-3 text-center text-xs text-accent/90">
            Não foi possível enviar agora. Tente novamente em instantes.
          </p>
        ) : null}
      </form>
    </>
  );
}