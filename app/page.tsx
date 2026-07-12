import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/sections/Hero/Hero";
import Chapter02 from "@/sections/Chapter02/Chapter02";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen">
        <Hero />
        <Chapter02 />
      </main>
    </SmoothScroll>
  );
}
