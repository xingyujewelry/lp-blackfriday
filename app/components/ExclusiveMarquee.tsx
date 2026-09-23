import { BadgePercent } from "lucide-react";

export function ExclusiveMarquee() {
  return (
    <div className="relative z-20 overflow-hidden border-y border-[#59271C]/15 bg-white">
      <div
        className="flex w-max will-change-transform py-3.5 lg:py-4.5"
        style={{
          animation: "marquee-ping 48s linear infinite alternate",
        }}
      >
        {[0, 1].map((setIndex) => (
          <div
            key={setIndex}
            className="flex shrink-0 items-center"
            aria-hidden={setIndex > 0}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={`${setIndex}-${i}`}
                className="flex shrink-0 items-center gap-6 whitespace-nowrap px-6 text-[9px] font-medium uppercase tracking-[0.18em] text-[#59271C] sm:text-[10px] sm:tracking-[0.2em] lg:gap-8 lg:px-8 lg:text-[11px] lg:tracking-[0.22em]"
              >
                Exclusivo para quem compra semijoias para revender
                <BadgePercent
                  className="h-3.5 w-3.5 shrink-0 text-[#8C4C3E] sm:h-4 sm:w-4"
                  strokeWidth={1.6}
                  aria-hidden
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
