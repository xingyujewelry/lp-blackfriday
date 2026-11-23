import {
  Factory,
  Flag,
  Gem,
  Radio,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "../Reveal";
import { EventButton, SectionHeading } from "../ui";

const lives: {
  date: string;
  label: string;
  text: string;
  icon: LucideIcon;
}[] = [
  {
    date: "03/12",
    label: "Abertura oficial",
    text: "Abertura oficial da Operação 2027 e apresentação da nova Coleção Áurea, com semijoias direto da nossa fábrica na China e 45% de desconto.",
    icon: Radio,
  },
  {
    date: "06/12",
    label: "Novas oportunidades para seu estoque",
    text: "Conheça melhor as semijoias da Coleção Áurea, descubra combinações e oportunidades para ampliar a variedade do seu estoque com as condições especiais do evento.",
    icon: Factory,
  },
  {
    date: "08/12",
    label: "Prepare seu estoque para 2027",
    text: "Explore modelos e possibilidades para começar 2027 com um estoque mais variado, aproveitando as condições especiais da Coleção Áurea.",
    icon: Gem,
  },
  {
    date: "10/12",
    label: "Live de fechamento",
    text: "A última live da Operação 2027! Reveja as peças da Coleção Áurea, tire suas dúvidas e aproveite as condições especiais, com 45% de desconto e o cupom 2027, para organizar seu estoque antes do encerramento da campanha.",
    icon: Flag,
  },
];

export function Lives() {
  return (
    <section className="relative overflow-hidden bg-white py-28 sm:py-32">
      {/* background — desktop */}
      <div
        className="pointer-events-none absolute inset-0 hidden bg-cover bg-[center_right] bg-no-repeat opacity-[0.14] grayscale lg:block"
        style={{ backgroundImage: "url('/CAP-DESK.png')" }}
        aria-hidden
      />
      {/* background — mobile */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.12] grayscale lg:hidden"
        style={{ backgroundImage: "url('/CAP-MOBI2.png')" }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/80 via-white/72 to-white/85" />
      <div className="bg-grain pointer-events-none absolute inset-0 opacity-20" />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading
            tone="light"
            tag="Agenda do evento"
            title={
              <>
                Quatro lives para preparar
                <br className="hidden sm:block" /> seu estoque para 2027 com a
                Xingyu
              </>
            }
            subtitle="A Operação 2027 da Xingyu acontece em quatro lives no Instagram, sempre às 21h30, no horário de Brasília."
          />
        </Reveal>

        <Reveal delay={100}>
          <ol className="mx-auto mt-16 max-w-2xl lg:max-w-3xl">
            {lives.map((live) => (
              <li
                key={live.date}
                className="flex flex-col items-center gap-4 border-t border-[#0D0D0D]/12 py-8 text-center first:border-t-0 sm:grid sm:grid-cols-[3.5rem_1fr] sm:items-start sm:gap-8 sm:py-10 sm:text-left lg:grid-cols-[4rem_1fr] lg:gap-9 lg:py-11"
              >
                <div className="flex items-center justify-center sm:pt-1">
                  <live.icon
                    className="h-7 w-7 text-[#0D0D0D] sm:h-8 sm:w-8"
                    strokeWidth={1.3}
                    aria-hidden
                  />
                </div>
                <div className="max-w-sm sm:max-w-none">
                  <span className="block font-helvetica text-2xl font-medium tracking-tight text-[#0D0D0D] sm:text-3xl lg:text-[1.85rem]">
                    {live.date}
                  </span>
                  <h3 className="mt-2 font-helvetica text-lg font-medium tracking-tight text-[#0D0D0D] sm:text-xl lg:text-[1.25rem]">
                    {live.label}
                  </h3>
                  <p className="mt-3 text-base font-normal leading-relaxed text-[#0D0D0D]/75 sm:text-lg lg:text-[1.05rem] lg:leading-[1.7]">
                    {live.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={160}>
          <div className="mx-auto mt-16 flex max-w-lg flex-col items-center gap-6 pt-4 text-center lg:gap-6">
            <p className="text-base font-normal leading-relaxed text-[#0D0D0D]/75 lg:text-[1.05rem]">
              Entre no grupo VIP para receber os avisos das quatro lives,
              acompanhar a Coleção Áurea e não perder nenhuma etapa da Operação
              2027.
            </p>
            <EventButton>Entrar no grupo VIP agora</EventButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
