import { ExclusiveMarquee } from "../ExclusiveMarquee";
import { EventButton } from "../ui";

export function Hero() {
  return (
    <section className="relative flex min-h-dvh flex-col overflow-hidden lg:h-dvh lg:max-h-dvh">
      {/* Sessão 1 — faixa exclusiva */}
      <ExclusiveMarquee />

      {/* background — desktop */}
      <div
        className="pointer-events-none absolute inset-0 top-0 hidden bg-cover bg-top bg-no-repeat lg:block"
        style={{ backgroundImage: "url('/CAP-DESK.png')" }}
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
          style={{ backgroundImage: "url('/CAP-MOBI2.png')" }}
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
          <div className="flex max-w-xl flex-col items-center text-center lg:max-w-[40rem] lg:items-start lg:text-left">
            <div className="relative mb-8 sm:mb-10 lg:mb-11">
              <img
                src="/LogoOP.png"
                alt="Operação 2027"
                className="relative h-16 w-auto sm:h-20 lg:h-16 xl:h-20"
              />
            </div>

            <h1 className="font-helvetica text-[1.6rem] text-balance font-medium uppercase leading-[1.18] tracking-tight text-light [text-shadow:0_2px_18px_rgba(0,0,0,0.35)] sm:text-[2.2rem] lg:text-[2.05rem] xl:text-[2.3rem]">
              Prepare agora seu estoque de semijoias para vender mais em 2027!
            </h1>

            <p className="mt-7 max-w-md text-[0.95rem] font-normal leading-[1.7] text-light/85 [text-shadow:0_1px_12px_rgba(0,0,0,0.28)] sm:text-base lg:mt-8 lg:max-w-[30rem] lg:text-[1.05rem] lg:leading-[1.7]">
              Na Operação 2027, revendedoras e lojistas vão conhecer a nova
              Coleção Áurea: semijoias direto da fábrica Xingyu na China, com
              preços de atacado e 45% de desconto para renovar seu estoque antes
              de janeiro.
            </p>

            <div className="mt-8 lg:mt-9">
              <EventButton
                className="px-7 py-3.5 text-[11px] sm:px-9 sm:text-xs lg:px-10 lg:py-4"
              >
                Entrar agora no grupo VIP
              </EventButton>
            </div>
            <p className="mt-5 max-w-md text-[13px] font-normal leading-relaxed text-light [text-shadow:0_1px_10px_rgba(0,0,0,0.25)] lg:mt-5 lg:text-sm">
              Entre no grupo VIP para receber os avisos das lives, acompanhar a
              revelação da Coleção Áurea e ficar por dentro das condições
              especiais da Operação 2027.
            </p>
          </div>
      </div>
    </section>
  );
}
