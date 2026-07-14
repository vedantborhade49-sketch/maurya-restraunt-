import Link from "next/link";

export default function HeroButtons() {
  return (
    <div className="relative z-10 mt-12 md:ml-12 flex flex-wrap items-center gap-6">
      {/* Primary Menu Button */}
      <Link
        href="/menu"
        className="hero-button group relative overflow-hidden font-sans text-xs font-bold uppercase tracking-widest px-8 py-4 bg-crimson text-white rounded-full transition-all duration-300 hover:shadow-[0_8px_30px_rgb(165,15,18,0.3)] active:translate-y-px opacity-0"
        data-cursor="GO"
      >
        <span className="relative z-10">
          Explore the Menu
        </span>
      </Link>

      {/* Secondary Order Button */}
      <Link
        href="/menu?order=true"
        className="hero-button group relative overflow-hidden font-sans text-xs font-bold uppercase tracking-widest px-8 py-4 border border-gold/45 text-gold hover:text-midnight rounded-full transition-all duration-300 active:translate-y-px opacity-0"
        data-cursor="GO"
      >
        <span className="relative z-10">
          Feast at Home
        </span>
        <span className="absolute inset-0 bg-gold translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
      </Link>
    </div>
  );
}
