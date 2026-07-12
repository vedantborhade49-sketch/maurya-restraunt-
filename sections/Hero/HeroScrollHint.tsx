export default function HeroScrollHint() {
  return (
    <div id="hero-scroll-hint" className="absolute bottom-8 left-12 md:left-24 z-10 flex flex-col items-center gap-4 opacity-0">
      <div className="font-label text-[10px] tracking-[0.3em] text-[#F8F5F0]/60 uppercase rotate-180" style={{ writingMode: 'vertical-rl' }}>
        01 Scroll
      </div>
      <div className="w-[1px] h-16 bg-[#F8F5F0]/20 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[#F8F5F0]/80 origin-top animate-[scrolldown_2s_cubic-bezier(0.19,1,0.22,1)_infinite]" />
      </div>
    </div>
  );
}
