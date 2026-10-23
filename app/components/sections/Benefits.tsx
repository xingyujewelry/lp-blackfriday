"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  BadgePercent,
  Bell,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Factory,
  Gem,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../ui";

const guarantees: {
  title: string;
  text: string;
  icon: LucideIcon;
}[] = [
  {
    icon: Factory,
    title: "Semijoias direto da fábrica",
    text: "Compre diretamente da nossa fábrica na China, com preço de fábrica e uma condição especial para quem trabalha com revenda.",
  },
  {
    icon: CalendarDays,
    title: "Renovação de estoque",
    text: "Renove seu estoque pagando menos e comece o próximo ciclo de vendas com mais variedade e margem.",
  },
  {
    icon: Gem,
    title: "Coleção Verão",
    text: "Uma seleção especial de semijoias criada para quem quer reforçar o estoque e aproveitar a condição especial da Black Week Xingyu.",
  },
  {
    icon: BadgePercent,
    title: "50% de desconto",
    text: "Durante a Black Week Xingyu, a Coleção Verão será liberada com 50% de desconto por tempo limitado durante a campanha.",
  },
  {
    icon: Bell,
    title: "Grupo oficial do evento",
    text: "Receba datas, horários, lembretes, acesso à coleção e todas as informações para aproveitar a Black Week Xingyu.",
  },
];

export function Benefits() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    containScroll: "trimSnaps",
  });
  const [selected, setSelected] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback((api: NonNullable<typeof emblaApi>) => {
    setSelected(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect(emblaApi);
    emblaApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="relative overflow-hidden bg-white py-28 sm:py-32">
      {/* background — desktop */}
      <div
        className="pointer-events-none absolute inset-0 hidden bg-cover bg-[center_right] bg-no-repeat opacity-[0.14] grayscale lg:block"
        style={{ backgroundImage: "url('/heroDesktop.png')" }}
        aria-hidden
      />
      {/* background — mobile */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.12] grayscale lg:hidden"
        style={{ backgroundImage: "url('/heroMobile.png')" }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/80 via-white/72 to-white/85" />
      <div className="bg-grain pointer-events-none absolute inset-0 opacity-20" />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading
            tone="light"
            tag="Black Week Xingyu"
            title={
              <>
                A maior Black Week de
                <br className="hidden sm:block" /> semijoias no atacado.
              </>
            }
            subtitle="Aproveite a maior oportunidade do ano para importar suas semijoias direto da China, renovar seu estoque pagando menos e começar o próximo ciclo de vendas com mais variedade e margem."
          />
        </Reveal>

        <Reveal delay={80}>
          <div className="mx-auto mt-16 flex max-w-3xl flex-col items-center gap-5 lg:mt-20">
            <p className="text-center text-[11px] font-medium uppercase tracking-[0.28em] text-[#0D0D0D] lg:text-xs mb-4">
              No nosso evento você ainda garante
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative mt-10 lg:mt-12">
            <div className="sm:px-12 lg:px-20">
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="-ml-5 flex sm:-ml-6">
                  {guarantees.map((item) => (
                    <div
                      key={item.title}
                      className="min-w-0 flex-[0_0_88%] pl-5 sm:flex-[0_0_48%] sm:pl-6 lg:flex-[0_0_33.333%]"
                    >
                      <article className="flex h-full min-h-[15.5rem] flex-col border-t border-[#0D0D0D] pt-6 sm:min-h-[16.5rem] sm:pt-7">
                        <item.icon
                          className="h-7 w-7 text-[#0D0D0D] sm:h-8 sm:w-8"
                          strokeWidth={1.3}
                          aria-hidden
                        />
                        <h3 className="mt-4 font-helvetica text-lg font-medium leading-snug tracking-tight text-[#0D0D0D] sm:text-xl">
                          {item.title}
                        </h3>
                        <p className="mt-3 text-[0.95rem] font-normal leading-relaxed text-[#0D0D0D]/75 sm:text-base">
                          {item.text}
                        </p>
                      </article>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="button"
              aria-label="Anterior"
              onClick={scrollPrev}
              className="absolute left-0 top-[42%] z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center text-[#0D0D0D]/35 transition-all duration-500 hover:text-[#0D0D0D] sm:flex"
            >
              <ChevronLeft className="h-6 w-6" strokeWidth={1} aria-hidden />
            </button>
            <button
              type="button"
              aria-label="Próximo"
              onClick={scrollNext}
              className="absolute right-0 top-[42%] z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center text-[#0D0D0D]/35 transition-all duration-500 hover:text-[#0D0D0D] sm:flex"
            >
              <ChevronRight className="h-6 w-6" strokeWidth={1} aria-hidden />
            </button>
          </div>
        </Reveal>

        <div className="mt-8 flex justify-center gap-2.5 sm:mt-10">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Ir para o slide ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-px rounded-full transition-all duration-500 ${
                i === selected
                  ? "w-8 bg-[#0D0D0D]/70"
                  : "w-3 bg-[#0D0D0D]/20 hover:bg-[#0D0D0D]/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
