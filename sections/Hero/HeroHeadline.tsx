export default function HeroHeadline() {
  return (
    <div className="relative z-10 w-full max-w-[700px] mt-[25vh] ml-0 md:ml-12 lg:ml-24">
      {/* Editorial Label & Divider */}
      <div className="mb-12 overflow-hidden">
        <div id="hero-label-container" className="flex flex-col items-start gap-4 opacity-0 translate-y-4">
          <span className="font-label text-sm tracking-[0.3em] uppercase text-[#F8F5F0]/80">
            Maurya
          </span>
          <div className="w-16 h-[1px] bg-[#F8F5F0]/40" />
        </div>
      </div>

      <h1 className="font-heading text-6xl md:text-[7rem] lg:text-[110px] leading-[1.1] tracking-tight mb-16 text-[#F8F5F0]">
        <div className="overflow-hidden pb-2">
          <div className="hero-headline-line opacity-0 translate-y-full">
            Pure Taste.
          </div>
        </div>
        <div className="overflow-hidden mt-2 md:mt-4 pb-4">
          <div className="hero-headline-line opacity-0 translate-y-full">
            <span className="italic font-light text-[#F8F5F0]/90">Timeless</span>
            <br className="hidden md:block" />
            <span className="md:ml-24">Hospitality.</span>
          </div>
        </div>
      </h1>

      <div className="overflow-hidden">
        <p id="hero-paragraph" className="font-body text-lg md:text-xl text-[#F8F5F0]/70 max-w-[480px] leading-[1.7] opacity-0 translate-y-8 md:ml-8">
          For generations, every celebration has begun with a meal shared together. Maurya continues that tradition with refined vegetarian cuisine and warm hospitality.
        </p>
      </div>
    </div>
  );
}
