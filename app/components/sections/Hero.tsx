import { Reveal } from "../Reveal";
import { ExclusiveMarquee } from "../ExclusiveMarquee";
import { EventButton } from "../ui";
import { BadgePercent } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex min-h-dvh flex-col overflow-hidden lg:h-dvh lg:max-h-dvh">
      {/* Sessão 1 — faixa exclusiva */}
      <ExclusiveMarquee />

      {/* background — desktop */}
      <div
        className="pointer-events-none absolute inset-0 top-0 hidden bg-cover bg-top bg-no-repeat lg:block"
        style={{ backgroundImage: "url('/CAP%20-%20DESK.png')" }}
      />
      {/* wash lateral — legibilidade no desktop */}
      <div
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(13,13,13,0.55) 0%, rgba(13,13,13,0.3) 38%, transparent 60%)",
        }}
      />

      {/* background — mobile */}
      <div className="pointer-events-none absolute inset-0 lg:hidden">
        <div
          className="absolute inset-0 bg-cover bg-top bg-no-repeat"
          style={{ backgroundImage: "url('/CAP%20-%20MOBI.png')" }}
        />
        <div className="absolute inset-0 bg-[#0D0D0D]/40" />
        <div className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-[#0D0D0D]/80 via-[#0D0D0D]/45 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[78%] bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/92 to-transparent" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 40% at 50% 28%, rgba(13,13,13,0.65) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="bg-grain pointer-events-none absolute inset-0 opacity-60 lg:hidden" />

      {/* Sessão 2 */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 py-12 sm:py-16 lg:py-16 lg:pb-20">
        <Reveal>
          <div className="flex max-w-xl flex-col items-center text-center lg:max-w-[40rem] lg:items-start lg:text-left">
            <div className="relative mb-8 sm:mb-10 lg:mb-11">
              <img
                src="/logo2.png"
                alt="Black Week Xingyu"
                className="relative h-28 w-auto sm:h-32 lg:h-28 xl:h-32"
              />
            </div>

            <h1 className="font-helvetica text-[1.85rem] font-medium leading-[1.22] tracking-tight text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.35)] sm:text-[2.45rem] lg:text-[2.35rem] xl:text-[2.55rem]">
              <span className="block lg:hidden">
                A maior Black Week de semijoias no atacado. Compre direto da
                fábrica na China!
              </span>
              <span className="hidden w-fit lg:block">
                <span className="block whitespace-nowrap">
                  A maior Black Week de
                </span>
                <span className="block whitespace-nowrap">
                  semijoias no atacado. Compre
                </span>
                <span className="block whitespace-nowrap">
                  direto da fábrica na China!
                </span>
              </span>
            </h1>

            <p className="mt-7 max-w-md text-[0.95rem] font-normal leading-[1.7] text-white/85 [text-shadow:0_1px_12px_rgba(0,0,0,0.28)] sm:text-base lg:mt-8 lg:max-w-[30rem] lg:text-[1.05rem] lg:leading-[1.7]">
              Participe da Black Week Xingyu e aproveite a maior oportunidade
              do ano para importar suas semijoias direto da China, renovar seu
              estoque pagando menos e começar o próximo ciclo de vendas com mais
              variedade e margem.
            </p>

            <div className="mt-8 flex w-full max-w-md flex-col items-center gap-5 lg:mt-9 lg:items-start">
              <div
                className="flex items-center gap-3.5"
                aria-hidden
              >
                <span className="h-px w-9 bg-gradient-to-r from-transparent to-[#FFFFFF]/90 sm:w-11" />
                <BadgePercent
                  className="h-[1.125rem] w-[1.125rem] shrink-0 text-[#FFFFFF]"
                  strokeWidth={1.5}
                />
                <span className="h-px w-9 bg-gradient-to-l from-transparent to-[#FFFFFF]/90 sm:w-11" />
              </div>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#FFFFFF] [text-shadow:0_1px_10px_rgba(0,0,0,0.3)] lg:text-xs lg:tracking-[0.22em]">
                Atenção: Coleção Verão com 50% de
                <br />
                desconto durante o evento
              </p>
            </div>

            <div className="mt-8 lg:mt-9">
              <EventButton
                className="px-7 py-3.5 text-[11px] sm:px-9 sm:text-xs lg:px-10 lg:py-4"
              >
                Entrar no grupo do WhatsApp
              </EventButton>
            </div>
            <p className="mt-5 max-w-md text-[13px] font-normal leading-relaxed text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.25)] lg:mt-5 lg:text-sm">
              Os avisos das lives, o acesso à Coleção Verão e todas as
              condições da Black Week Xingyu serão enviados no grupo oficial.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
