export default function HeroHeadline() {
  return (
    <div className="relative z-10 w-full max-w-[850px] mt-[20vh] ml-0 md:ml-12 lg:ml-24">
      {/* Editorial Label & Divider */}
      <div className="mb-8 overflow-hidden">
        <div id="hero-label-container" className="flex flex-row items-center gap-4 opacity-0 translate-y-4">
          <span className="font-sans text-xs tracking-[0.3em] uppercase text-gold">
            Maurya
          </span>
          <div className="w-12 h-[1px] bg-gold/40" />
          <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-soft-ivory/60">
            Kondhwa, Pune
          </span>
        </div>
      </div>

      <h1 className="font-heading text-5xl md:text-[6.5rem] lg:text-[100px] leading-[1.05] tracking-tight mb-10 text-soft-ivory">
        <div className="overflow-hidden pb-2">
          <div className="hero-headline-line opacity-0 translate-y-full font-bold">
            PURE VEG.
          </div>
        </div>
        <div className="overflow-hidden mt-1 md:mt-2 pb-4">
          <div className="hero-headline-line opacity-0 translate-y-full">
            <span className="italic font-light text-gold text-shadow-premium">PURE</span>{" "}
            <span className="font-semibold text-crimson">INDULGENCE.</span>
          </div>
        </div>
      </h1>

      <div className="overflow-hidden">
        <p 
          id="hero-paragraph" 
          className="font-sans text-sm md:text-base text-soft-ivory/70 max-w-[480px] leading-[1.8] opacity-0 translate-y-8 md:ml-2"
        >
          A table full of flavours, made for moments worth sharing. Every celebration begins with a meal prepared with devotion.
        </p>
      </div>
    </div>
  );
}
