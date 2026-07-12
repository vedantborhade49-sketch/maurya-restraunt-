import gsap from "gsap";

export const playAfterVideoTimeline = () => {
  const tl = gsap.timeline({
    defaults: { ease: "power2.out" },
  });

  // Scale the video slightly to 1.02 to feel the world changing (starts at 0 in timeline)
  tl.to("#hero-main-video", { scale: 1.02, duration: 4, ease: "power2.out" }, 0);

  // Background transformation (Target: 7.0s, which is 0.5s after the 6.5s video ends)
  // Decreased fade by 80% (making video heavily visible)
  tl.to("#hero-overlay-black", { opacity: 0.08, duration: 2, ease: "power2.out" }, 0.5);
  tl.to("#hero-overlay-gradient", { opacity: 0.2, duration: 2, ease: "power2.out" }, 0.5);
  tl.to("#hero-overlay-ivory", { opacity: 0.08, duration: 2, ease: "power2.out" }, 0.5);
  
  tl.to(
    "#hero-main-video",
    { 
      opacity: 0.80,
      filter: "blur(2px) saturate(0.65) brightness(0.7) contrast(0.9)", 
      duration: 2,
      ease: "power2.out"
    },
    0.5
  );

  // Label reveals (Target: 7.4s, so 0.9s from tl start)
  tl.fromTo(
    "#hero-label-container",
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
    0.9
  );

  // Headline reveals (Target: 7.8s, so 1.3s from tl start)
  tl.fromTo(
    ".hero-headline-line",
    { y: "100%", opacity: 0 },
    { y: "0%", opacity: 1, duration: 1.2, stagger: 0.15, ease: "power3.out" },
    1.3
  );
  
  // Paragraph appears (Target: 8.2s, so 1.7s from tl start)
  tl.fromTo(
    "#hero-paragraph",
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
    1.7
  );

  // CTA appears (Target: 8.6s, so 2.1s from tl start)
  tl.fromTo(
    ".hero-button",
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
    2.1
  );

  // Navbar slides from top (Target: 9.0s, so 2.5s from tl start)
  tl.fromTo("#main-navbar", 
    { opacity: 0, y: -30 },
    { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }, 
    2.5
  );

  // Scroll indicator appears (Target: 9.4s, so 2.9s from tl start)
  tl.fromTo(
    "#hero-scroll-hint",
    { opacity: 0, y: -10 },
    { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
    2.9
  );

  return tl;
};
