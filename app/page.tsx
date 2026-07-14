import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/sections/Hero/Hero";
import Chapter02 from "@/sections/Chapter02/Chapter02";
import Chapter03 from "@/sections/Chapter03/Chapter03";
import ChapterTransition from "@/components/ChapterTransition";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen">
        <Hero />
        
        {/* The transition AFTER the Hero must not overlap the Hero. Fade from Hero's black to Ch2's cream. */}
        <ChapterTransition to="ch2" height={400} fromColor="#111" overlap={false} />
        <Chapter02 />
        
        {/* Transition between editorial chapters can overlap slightly for a layered blend */}
        <ChapterTransition to="ch3" height={500} overlap={true} />
        <Chapter03 />
      </main>
    </SmoothScroll>
  );
}
