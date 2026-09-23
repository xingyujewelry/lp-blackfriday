import type { ReactNode } from "react";
import { Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export { EventButton } from "./EventButton";

export function Ornament({
  tone = "dark",
  align = "center",
}: {
  tone?: "dark" | "light";
  align?: "center" | "left";
}) {
  const isLight = tone === "light";
  return (
    <div
      className={`ornament-line ${align === "left" ? "ornament-line--left" : ""} ${
        isLight ? "ornament-line--light" : "ornament-line--dark"
      }`}
      aria-hidden
    >
      <span className="ornament-diamond" />
    </div>
  );
}

export function SectionTag({
  children,
  tone = "dark",
}: {
  children: ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.28em] lg:text-xs ${
        tone === "light" ? "text-[#59271C]" : "text-gold"
      }`}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  tag,
  title,
  subtitle,
  align = "center",
  className = "",
  tone = "dark",
}: {
  tag?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  className?: string;
  tone?: "dark" | "light";
}) {
  const isCenter = align === "center";
  const isLight = tone === "light";
  return (
    <div
      className={`${
        isCenter ? "mx-auto max-w-3xl text-center" : "max-w-2xl"
      } ${className}`}
    >
      {tag ? (
        <div
          className={
            isCenter ? "flex flex-col items-center gap-4" : "flex flex-col gap-4"
          }
        >
          <SectionTag tone={tone}>{tag}</SectionTag>
        </div>
      ) : null}
      <h2
        className={`${
          tag ? "mt-6" : ""
        } text-balance font-display text-[2rem] font-medium leading-[1.12] tracking-tight sm:text-[2.25rem] lg:text-[2.4rem] xl:text-[2.65rem] ${
          isLight ? "text-[#0D0D0D]" : "text-foreground"
        }`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`mt-5 text-base font-normal leading-[1.75] sm:text-lg lg:mt-6 lg:text-[1.125rem] lg:leading-[1.75] ${
            isLight ? "text-[#40343F]/80" : "text-muted"
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export function CheckIcon({ className = "" }: { className?: string }) {
  return <Check className={className} strokeWidth={1.3} aria-hidden />;
}

export function TrustItem({
  label,
  icon: Icon,
  small,
}: {
  label: string;
  icon: LucideIcon;
  small?: boolean;
}) {
  return (
    <span className="flex shrink-0 items-center gap-3 whitespace-nowrap">
      <Icon
        className={
          small ? "h-4 w-4 shrink-0 text-white" : "h-6 w-6 shrink-0 text-white"
        }
        strokeWidth={1.4}
        aria-hidden
      />
      <span className="font-light">{label}</span>
    </span>
  );
}
