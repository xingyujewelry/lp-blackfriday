export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0D0D0D]">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-12">
        <img
          src="/LogoOP.png"
          alt="Operação 2027"
          className="h-16 w-auto sm:h-20"
        />
        <p className="mt-3 text-center text-[10px] font-normal uppercase tracking-[0.22em] text-white/70">
          © {new Date().getFullYear()} Xingyu · Operação 2027
        </p>
      </div>
    </footer>
  );
}
