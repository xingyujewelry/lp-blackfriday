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
    date: "08/10",
    label: "Abertura oficial",
    text: "Abertura oficial do Antecipa Black Friday e liberação da Coleção Estrela com a condição especial do evento para você começar a antecipar seu estoque.",
    icon: Radio,
  },
  {
    date: "11/10",
    label: "Live de vendas e oportunidades",
    text: "Um novo encontro para conhecer peças da Coleção Estrela, analisar oportunidades e continuar montando um estoque mais preparado para as vendas de novembro.",
    icon: Factory,
  },
  {
    date: "13/10",
    label: "Mais peças para preparar seu estoque",
    text: "Mais uma live de vendas para acompanhar peças, combinações e possibilidades para ampliar a variedade do seu estoque e aproveitar as condições da Coleção Estrela antes do encerramento.",
    icon: Gem,
  },
  {
    date: "15/10",
    label: "Live de fechamento",
    text: "O último encontro do Antecipa Black Friday. A oportunidade final para conhecer as peças, concluir seu pedido e aproveitar os 48% de desconto da Coleção Estrela antes do encerramento da campanha.",
    icon: Flag,
  },
];

export function Lives() {
  return (
    <section className="relative overflow-hidden bg-white py-28 sm:py-32">
      {/* background — desktop */}
      <div
        className="pointer-events-none absolute inset-0 hidden bg-cover bg-[center_right] bg-no-repeat opacity-[0.14] grayscale lg:block"
        style={{ backgroundImage: "url('/DESK.png')" }}
        aria-hidden
      />
      {/* background — mobile */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.12] grayscale lg:hidden"
        style={{ backgroundImage: "url('/MOBI.png')" }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/80 via-white/72 to-white/85" />
      <div className="bg-grain pointer-events-none absolute inset-0 opacity-20" />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading
            tone="light"
            tag="Agenda do evento"
            title="As lives já têm data marcada"
            subtitle="O Antecipa Black Friday acontece em uma sequência de lives pelo Instagram, sempre às 21:30, no horário de Brasília."
          />
        </Reveal>

        <Reveal delay={100}>
          <ol className="mx-auto mt-16 max-w-2xl lg:max-w-3xl">
            {lives.map((live) => (
              <li
                key={live.date}
                className="flex flex-col items-center gap-4 border-t border-[#59271C]/12 py-8 text-center first:border-t-0 sm:grid sm:grid-cols-[3.5rem_1fr] sm:items-start sm:gap-8 sm:py-10 sm:text-left lg:grid-cols-[4rem_1fr] lg:gap-9 lg:py-11"
              >
                <div className="flex items-center justify-center sm:pt-1">
                  <live.icon
                    className="h-7 w-7 text-[#59271C] sm:h-8 sm:w-8"
                    strokeWidth={1.3}
                    aria-hidden
                  />
                </div>
                <div className="max-w-sm sm:max-w-none">
                  <span className="block font-display text-2xl font-medium tracking-tight text-[#59271C] sm:text-3xl lg:text-[1.85rem]">
                    {live.date}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-medium tracking-tight text-[#0D0D0D] sm:text-xl lg:text-[1.25rem]">
                    {live.label}
                  </h3>
                  <p className="mt-3 text-base font-normal leading-relaxed text-[#40343F]/75 sm:text-lg lg:text-[1.05rem] lg:leading-[1.7]">
                    {live.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={160}>
          <div className="mx-auto mt-16 flex max-w-lg flex-col items-center gap-6 pt-4 text-center lg:gap-6">
            <p className="text-base font-normal leading-relaxed text-[#40343F]/75 lg:text-[1.05rem]">
              Entre no grupo oficial para receber todos os avisos, acompanhar as
              lives e não perder nenhuma etapa do Antecipa Black Friday.
            </p>
            <EventButton>Entrar no grupo do evento</EventButton>
            <p className="text-sm font-normal leading-relaxed text-[#8C4C3E] lg:text-[15px]">
              A condição de 48% de desconto é por tempo limitado e estará
              vinculada à campanha da Coleção Estrela.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
