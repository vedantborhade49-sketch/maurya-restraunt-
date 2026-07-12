export default function HeroButtons() {
  return (
    <div className="relative z-10 mt-16 md:ml-12 flex items-center">
      <button className="hero-button group relative overflow-hidden font-label text-sm uppercase tracking-widest text-[#F8F5F0] flex items-center gap-2 opacity-0">
        <span className="relative z-10 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full">
          Explore Maurya
        </span>
        <span className="absolute inset-0 z-10 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] translate-y-full group-hover:translate-y-0 text-[#C69A3B]">
          Explore Maurya
        </span>
        <span className="transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-2 text-[#C69A3B]">→</span>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#F8F5F0]/20 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:bg-[#C69A3B]" />
      </button>
    </div>
  );
}
