"use client";

import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../ui";

const carouselImages = [
  "/img1.webp",
  "/img2.webp",
  "/img3.webp",
  "/img4.webp",
  "/img5.webp",
  "/img6.webp",
  "/img7.webp",
  "/img8.webp",
];

function SelectionCard({ image }: { image: string }) {
  return (
    <figure className="group relative overflow-hidden">
      <div className="relative aspect-[3/4] overflow-hidden bg-surface-2 ring-1 ring-inset ring-white/10">
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/55 via-transparent to-[#0D0D0D]/15" />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.06]" />
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
    <section className="relative overflow-hidden bg-surface py-28 sm:py-32">
      <div className="bg-grain pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-seigaiha opacity-40" />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading
            tag="Coleção Estrela"
            title="Conheça algumas das semijoias da Xingyu"
          />
        </Reveal>
      </div>

      <Reveal delay={100}>
        <div className="relative mt-16 sm:mt-20">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-surface via-surface/80 to-transparent sm:w-28" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-surface via-surface/80 to-transparent sm:w-28" />

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="-ml-5 flex sm:-ml-6">
              {slides.map((image, i) => (
                <div
                  key={`${image}-${i}`}
                  className="min-w-0 flex-[0_0_72%] pl-5 sm:flex-[0_0_38%] sm:pl-6 lg:flex-[0_0_26%] xl:flex-[0_0_22%]"
                >
                  <SelectionCard image={image} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
