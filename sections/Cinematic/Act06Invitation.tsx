"use client";

export default function Act06Invitation() {
  return (
    <section className="relative w-full min-h-screen bg-[#F2E8DA] py-32 flex flex-col justify-center items-center z-10 border-t-[0.5px] border-[#AF6048]/20">
      
      <div className="text-center mb-24">
        <h2 className="font-heading text-[60px] md:text-[90px] lg:text-[130px] text-[#2E2926] leading-none mb-4 tracking-tighter">
          MAURYA
        </h2>
        <p className="font-mono text-[10px] md:text-[12px] uppercase tracking-[0.3em] text-[#AF6048]">
          Family Restaurant &middot; Est. 1984
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 text-center md:text-left max-w-[1000px] w-full px-6">
        
        <div className="flex flex-col gap-4 items-center md:items-start">
          <h3 className="font-heading italic text-[28px] text-[#7D2F34]">Location</h3>
          <p className="font-sans text-[15px] text-[#2E2926] leading-relaxed opacity-80">
            Kondhwa, Pune<br />
            Maharashtra, India
          </p>
        </div>

        <div className="flex flex-col gap-4 items-center md:items-start">
          <h3 className="font-heading italic text-[28px] text-[#7D2F34]">Hours</h3>
          <p className="font-sans text-[15px] text-[#2E2926] leading-relaxed opacity-80">
            Monday - Sunday<br />
            11:00 AM - 11:30 PM
          </p>
        </div>

        <div className="flex flex-col gap-4 items-center md:items-end md:text-right">
          <h3 className="font-heading italic text-[28px] text-[#7D2F34]">Invitation</h3>
          <a href="#" className="font-mono text-[12px] uppercase tracking-widest text-[#2E2926] hover:text-[#7D2F34] transition-colors border-b border-[#AF6048] pb-1">
            Reserve a Table
          </a>
          <a href="#" className="font-mono text-[12px] uppercase tracking-widest text-[#2E2926] hover:text-[#7D2F34] transition-colors border-b border-[#AF6048] pb-1 mt-2">
            Get Directions
          </a>
        </div>

      </div>

    </section>
  );
}
