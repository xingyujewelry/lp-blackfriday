"use client";

import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../ui";

const carouselImages: { src: string; alt: string }[] = [
  { src: "/aurea-1.webp", alt: "Pulseira Trevo Emerald EBG0207" },
  { src: "/aurea-4.webp", alt: "Pulseira Prisma EBG0213" },
  { src: "/aurea-6.webp", alt: "Trio de brincos Lavander DCG2231" },
  { src: "/aurea-8.webp", alt: "Trio de brincos Fancy DCG2228" },
  { src: "/aurea-2.webp", alt: "Pulseira Trevo Emerald EBG0207" },
  { src: "/aurea-5.webp", alt: "Pulseira Prisma EBG0213" },
  { src: "/aurea-7.webp", alt: "Trio de brincos Lavander DCG2231" },
  { src: "/aurea-3.webp", alt: "Pulseira Trevo Emerald EBG0207" },
];

function SelectionCard({ src, alt }: { src: string; alt: string }) {
  return (
    <figure className="group relative overflow-hidden">
      <div className="relative aspect-square overflow-hidden bg-white">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
      </div>
    </figure>
  );
}

export function Selection() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, dragFree: true, align: "start", containScroll: false },
    [
      AutoScroll({
        playOnInit: true,
        speed: 0.45,
        direction: "forward",
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  const slides = [...carouselImages, ...carouselImages];

  return (
    <section className="relative overflow-hidden bg-background py-28 sm:py-32">
      <div className="bg-grain pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-seigaiha opacity-40" />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading
            tag="Coleção Áurea"
            title="Conheça a nova Coleção Áurea: mais variedade para seu estoque"
          />
        </Reveal>
      </div>

      <Reveal delay={100}>
        <div className="relative mt-16 sm:mt-20">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background via-background/80 to-transparent sm:w-28" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background via-background/80 to-transparent sm:w-28" />

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="-ml-5 flex sm:-ml-6">
              {slides.map((image, i) => (
                <div
                  key={`${image.src}-${i}`}
                  className="min-w-0 flex-[0_0_72%] pl-5 sm:flex-[0_0_38%] sm:pl-6 lg:flex-[0_0_26%] xl:flex-[0_0_22%]"
                >
                  <SelectionCard
                    src={image.src}
                    alt={i < carouselImages.length ? image.alt : ""}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
