"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { SignupForm } from "./SignupForm";

type ModalCtx = { open: () => void; close: () => void };

const Ctx = createContext<ModalCtx | null>(null);

export function useModal() {
  const ctx = useContext(Ctx);
  if (!ctx) {
    throw new Error("useModal deve ser usado dentro de ModalProvider");
  }
  return ctx;
}

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    setIsOpen(false);
    document.body.style.overflow = "";
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  return (
    <Ctx.Provider value={{ open, close }}>
      {children}

      {mounted && isOpen
        ? createPortal(
            <div
              className="fixed inset-0 z-50 flex items-center justify-center"
              role="dialog"
              aria-modal="true"
              aria-label="Liberar acesso ao grupo VIP"
            >
              <div
                className="fixed inset-0 h-dvh w-screen animate-modal-fade bg-[#0D0D0D]/88"
                style={{ backdropFilter: "blur(8px)" }}
                onClick={close}
              />
              <div className="relative z-10 m-3 max-h-[92dvh] w-full max-w-md animate-modal-in overflow-y-auto border border-border bg-surface-2 px-7 py-10 modal-glow sm:m-4 sm:px-10 sm:py-12">
                <button
                  type="button"
                  onClick={close}
                  aria-label="Fechar"
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center border border-border text-muted transition-colors hover:border-gold/40 hover:text-foreground sm:right-4 sm:top-4 sm:h-9 sm:w-9"
                >
                  <X className="h-4 w-4" strokeWidth={1.4} aria-hidden />
                </button>

                <SignupForm buttonLabel="Entrar no grupo VIP" />
              </div>
            </div>,
            document.body
          )
        : null}
    </Ctx.Provider>
  );
}