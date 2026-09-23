export function Footer() {
  return (
    <footer className="border-t border-border bg-[#0D0D0D]">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-12">
        <img
          src="/Logo.png"
          alt="Antecipa Black Friday"
          className="h-12 w-auto opacity-80 sm:h-14"
        />
        <p className="mt-3 text-center text-[10px] font-normal uppercase tracking-[0.22em] text-[#A67E7B]">
          © {new Date().getFullYear()} Xingyu · Antecipa Black Friday
        </p>
      </div>
    </footer>
  );
}
