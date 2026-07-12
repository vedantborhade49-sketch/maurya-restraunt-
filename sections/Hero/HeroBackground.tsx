export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* 1. Warm ivory is the background color set on body/main */}
      
      {/* 2. Paper grain */}
      <div 
        id="hero-background-paper" 
        className="absolute inset-0 opacity-0 paper-grain transition-opacity duration-1000"
      />
      
      {/* 3. Noise */}
      <div 
        id="hero-background-noise" 
        className="absolute inset-0 opacity-0 noise-bg transition-opacity duration-1000"
      />
      
      {/* 4. Very subtle maroon radial */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_70%_50%,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      
      {/* 5. Botanical line illustrations (Placeholder SVG for luxury feel) */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] opacity-[0.03] rotate-12 translate-x-1/4 -translate-y-1/4 mix-blend-multiply">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-primary-dark stroke-[0.2]">
           {/* Abstract botanical curves */}
           <path d="M10,90 Q30,50 90,10 M30,70 Q50,30 80,20" />
        </svg>
      </div>

      {/* 6. Large brush stroke */}
      <div className="absolute bottom-0 left-0 w-full h-[600px] opacity-5 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 100 100%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M0,100 C20,80 50,90 100,50 L100,100 Z%22 fill=%22%237B1E23%22/%3E%3C/svg%3E')] bg-no-repeat bg-cover bg-bottom mix-blend-multiply" />
    </div>
  );
}
