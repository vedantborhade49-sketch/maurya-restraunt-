import gsap from "gsap";

export const playAfterVideoTimeline = () => {
  const tl = gsap.timeline({
    defaults: { ease: "power3.inOut" },
  });

  // Slow cinematic camera drift
  tl.to("#hero-main-video", { scale: 1.06, yPercent: 2, duration: 30, ease: "sine.inOut" }, 0);
  tl.to("#hero-mandala", { scale: 1.1, rotation: 5, duration: 40, ease: "none" }, 0);
  
  // Background transformation (Target: 7.0s, which is 0.5s after the 6.5s video ends)
  // Bring up deep espresso and burnt umber gradients
  tl.to("#hero-overlay-black", { opacity: 0.25, duration: 2.5, ease: "power3.inOut" }, 0.5);
  tl.to("#hero-overlay-gradient", { opacity: 0.4, duration: 2.5, ease: "power3.inOut" }, 0.5);
  
  // Reveal Mandala slowly
  tl.to("#hero-mandala", { opacity: 0.4, duration: 3.5, ease: "power3.inOut" }, 0.5);
  
  // Fade in Volumetric Smoke and Embers
  tl.to("#hero-volumetric-smoke", { opacity: 0.8, duration: 4, ease: "power2.inOut" }, 0.5);
  tl.to("#hero-embers-canvas", { opacity: 1, duration: 3, ease: "power2.inOut" }, 1.5);
  
  tl.to(
    "#hero-main-video",
    { 
      opacity: 0.85,
      filter: "blur(4px) saturate(0.8) brightness(0.65) contrast(1.1)", 
      duration: 3,
      ease: "power3.inOut"
    },
    0.5
  );

  // Label reveals (Target: 7.4s, so 0.9s from tl start)
  tl.fromTo(
    "#hero-label-container",
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.8, ease: "power3.out" },
    1.2
  );

  // Headline reveals
  tl.fromTo(
    ".hero-headline-line",
    { y: "100%", opacity: 0 },
    { y: "0%", opacity: 1, duration: 1.6, stagger: 0.2, ease: "power4.out" },
    1.6
  );
  
  // Paragraph appears
  tl.fromTo(
    "#hero-paragraph",
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" },
    2.2
  );

  // CTA appears
  tl.fromTo(
    ".hero-button",
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" },
    2.6
  );

  // Navbar slides from top
  tl.fromTo("#main-navbar", 
    { opacity: 0, y: -40 },
    { opacity: 0.95, y: 0, duration: 1.8, ease: "power3.out" }, 
    3.0
  );

  // Scroll indicator appears
  tl.fromTo(
    "#hero-scroll-hint",
    { opacity: 0, y: -15 },
    { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" },
    3.4
  );

  return tl;
};
