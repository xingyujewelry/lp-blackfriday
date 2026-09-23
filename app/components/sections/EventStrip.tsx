import { CalendarDays, Clock, Gift, MonitorPlay, Users } from "lucide-react";
import { TrustItem } from "../ui";

export function EventStrip() {
  return (
    <section
      className="relative z-10 border-y border-white/10 bg-surface"
      aria-label="Informações do evento"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-6 px-6 py-10 text-center text-sm font-medium uppercase tracking-[0.14em] text-white sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-5 sm:py-12 sm:text-[14px] sm:tracking-[0.14em] lg:flex-nowrap lg:gap-8 lg:py-12 lg:text-[15px] lg:tracking-[0.16em]">
        <TrustItem icon={Gift} label="Gratuito" />
        <span className="hidden h-px w-10 shrink-0 bg-white/30 sm:block sm:h-5 sm:w-px" />
        <TrustItem
          icon={CalendarDays}
          label="Ao vivo dias 08, 11, 13 e 15/10"
        />
        <span className="hidden h-px w-10 shrink-0 bg-white/30 lg:block lg:h-5 lg:w-px" />
        <TrustItem icon={Clock} label="21:30" />
        <span className="hidden h-px w-10 shrink-0 bg-white/30 lg:block lg:h-5 lg:w-px" />
        <TrustItem icon={MonitorPlay} label="Instagram" />
        <span className="hidden h-px w-10 shrink-0 bg-white/30 sm:block sm:h-5 sm:w-px" />
        <TrustItem icon={Users} label="Grupo oficial no WhatsApp" />
      </div>
    </section>
  );
}
