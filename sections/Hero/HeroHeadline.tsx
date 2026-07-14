export default function HeroHeadline() {
  return (
    <div className="relative z-10 w-full max-w-[700px] mt-[25vh] ml-0 md:ml-12 lg:ml-24">
      {/* Editorial Label & Divider (Forged Logo Effect) */}
      <div className="mb-12 overflow-hidden relative">
        <div id="hero-label-container" className="flex flex-col items-start gap-4 opacity-0 translate-y-4">
          <span className="relative font-label text-sm tracking-[0.3em] uppercase text-[#F8F5F0]/80 overflow-hidden">
            <span className="relative z-10 mix-blend-overlay">Maurya</span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C49A48] to-transparent opacity-0 animate-[shimmer_4s_cubic-bezier(0.4,0,0.2,1)_infinite]" style={{ WebkitBackgroundClip: 'text', color: 'transparent' }}>
              Maurya
            </span>
          </span>
          <div className="relative w-16 h-[1px] bg-[#F8F5F0]/40 overflow-hidden">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#C49A48] to-transparent -translate-x-full animate-[shimmer_4s_cubic-bezier(0.4,0,0.2,1)_infinite_0.5s]" />
          </div>
        </div>
      </div>

      <h1 className="font-heading text-6xl md:text-[7rem] lg:text-[110px] leading-[1.1] tracking-tight mb-16 text-[#F8F5F0] drop-shadow-lg">
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
