"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { MarginNote } from "@/components/MicroArtifacts";

const DISHES = [
  {
    name: "PANEER LABABDAR",
    story: "Slow-cooked tomato gravy finished with butter and kasuri methi.",
    ingredients: "Fresh cottage cheese • Cream • Butter • House spices",
    chefRec: "Chef's Signature Reserve",
    image: "/editorial-food-1.png",
  },
  {
    name: "DAL MAKHANI",
    story: "Simmered overnight on tandoor embers for a deep, smoky resonance.",
    ingredients: "Black Lentils • White Butter • Time",
    chefRec: "A 26-Year Tradition",
    image: "/editorial-food-2.png",
  },
  {
    name: "MALAI KOFTA",
    story: "Melt-in-the-mouth cottage cheese dumplings bathed in saffron cashew gravy.",
    ingredients: "Cashews • Saffron • Cardamom",
    chefRec: "The Royal Selection",
    image: "/editorial-food-3.png",
  },
  {
    name: "VEG MARATHA",
    story: "Vegetable dumplings simmering in an intensely spiced red Maharashtrian curry.",
    ingredients: "Red Chili • Coconut • Sesame",
    chefRec: "Unapologetically Bold",
    image: "/editorial-food-4.png",
  },
  {
    name: "GARLIC NAAN",
    story: "Hand-stretched bread from the clay oven. Smothered in melted butter and crushed garlic.",
    ingredients: "Tandoor Baked • Fresh Coriander",
    chefRec: "The Perfect Accompaniment",
    image: "/editorial-food-5.png",
  },
  {
    name: "TANDOORI MUSHROOMS",
    story: "Earthy mushrooms marinated in hung curd and smoked over open charcoal.",
    ingredients: "Button Mushrooms • Mustard Oil • Charcoal",
    chefRec: "A Smoky Prelude",
    image: "/editorial-spices.png",
  }
];

function RotatingTable({ progressRef, activeIndexRef, onActiveChange }: any) {
  const tableGroup = useRef<THREE.Group>(null);
  const totalDishes = DISHES.length;
  const angleStep = (Math.PI * 2) / totalDishes;

  // Load textures
  const textures = useTexture(DISHES.map(d => d.image));

  useFrame((state) => {
    if (!tableGroup.current) return;
    
    // Cinematic camera breathing (sitting at the table)
    state.camera.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    state.camera.position.y = 2.2 + Math.cos(state.clock.elapsedTime * 0.4) * 0.02;
    state.camera.position.z = 3.8 + Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    state.camera.lookAt(0, 0, 0.5);

    // Calculate rotation from GSAP progress
    const totalRotation = (totalDishes - 1) * angleStep;
    const targetRotationY = -progressRef.current * totalRotation;
    
    // Heavy, physical lerping for the lazy Susan rotation
    tableGroup.current.rotation.y = THREE.MathUtils.lerp(
      tableGroup.current.rotation.y, 
      targetRotationY, 
      0.04
    );

    // Determine the active dish based on actual physical rotation
    let index = Math.round(Math.abs(tableGroup.current.rotation.y / angleStep));
    index = Math.max(0, Math.min(totalDishes - 1, index));
    
    if (index !== activeIndexRef.current) {
      activeIndexRef.current = index;
      onActiveChange(index);
    }
  });

  return (
    <group ref={tableGroup}>
      {/* Handcrafted Walnut Dining Table */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[2.8, 2.8, 0.1, 64]} />
        <meshStandardMaterial 
          color="#150a06" 
          roughness={0.12} 
          metalness={0.3} 
          envMapIntensity={1.5}
        />
      </mesh>
      
      {/* Table Bevel/Trim */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[2.85, 2.85, 0.08, 64]} />
        <meshStandardMaterial 
          color="#351a0f" 
          roughness={0.4} 
          metalness={0.1} 
        />
      </mesh>

      {/* The 6 Signature Dishes */}
      {DISHES.map((dish, i) => {
        const angle = i * angleStep;
        const radius = 1.9; 
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius; 
        
        // Organic placement
        const yOffset = (i % 2 === 0) ? 0.01 : 0.03;
        const localRotation = angle + Math.PI;

        return (
          <group key={i} position={[x, yOffset, z]} rotation={[-Math.PI / 2, 0, localRotation]}>
            {/* The Image Plane */}
            <mesh>
              <planeGeometry args={[1.2, 1.5]} />
              <meshStandardMaterial 
                map={textures[i]} 
                roughness={0.3}
                metalness={0.1}
                envMapIntensity={0.8}
              />
            </mesh>
            {/* Physical Contact Shadow */}
            <mesh position={[0, -0.02, -0.01]}>
              <planeGeometry args={[1.3, 1.6]} />
              <meshBasicMaterial color="#000000" transparent opacity={0.6} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

export default function Chapter05() {
  const containerRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          start: "top top",
          end: `+=${DISHES.length * 100}%`,
          scrub: 1,
        }
      });

      tl.to({ val: 0 }, {
        val: 1,
        ease: "none",
        onUpdate: function() {
          progressRef.current = this.progress();
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#080302] text-[#F7F2E8] overflow-hidden z-20">
      
      {/* 3D WebGL Canvas */}
      <div className="absolute inset-0 z-0">
        {isClient && (
          <Canvas shadows camera={{ fov: 45 }}>
            <Suspense fallback={null}>
              {/* Premium cinematic lighting */}
              <ambientLight intensity={0.4} />
              <directionalLight 
                position={[5, 10, 5]} 
                intensity={1.5} 
                castShadow 
                color="#f9e0b8"
              />
              <pointLight position={[-5, 5, -5]} intensity={0.5} color="#b11616" />
              
              <Environment preset="city" />
              
              <RotatingTable 
                progressRef={progressRef} 
                activeIndexRef={activeIndexRef}
                onActiveChange={setActiveIndex} 
              />
            </Suspense>
          </Canvas>
        )}
      </div>

      {/* Environmental Vignette overlay to blend canvas seamlessly into the dark background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_#080302_100%)] pointer-events-none z-10" />

      {/* HTML Typography Overlay */}
      <div className="absolute inset-0 flex items-end justify-center pb-24 md:pb-32 z-20 pointer-events-none">
        {DISHES.map((dish, i) => {
          const isActive = i === activeIndex;
          
          return (
            <div 
              key={i}
              className="absolute w-full max-w-[800px] px-6 flex flex-col items-center text-center transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{ 
                opacity: isActive ? 1 : 0,
                transform: `translateY(${isActive ? '0' : '20px'})`,
                pointerEvents: isActive ? 'auto' : 'none'
              }}
            >
              <h2 className="font-heading text-[10vw] md:text-[5vw] leading-[0.9] tracking-tight uppercase mb-4 text-[#F7F2E8] drop-shadow-xl">
                {dish.name}
              </h2>
              
              <p className="font-sans text-[14px] md:text-[16px] text-[#F7F2E8]/80 leading-relaxed mb-6 max-w-[400px] drop-shadow-md">
                {dish.story}
              </p>
              
              <div className="flex flex-col items-center gap-3">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#D56A2C]">
                  {dish.ingredients}
                </span>
                <span className="font-mono text-[8px] uppercase tracking-widest text-[#F7F2E8]/40 border border-[#F7F2E8]/10 px-4 py-2 rounded-full">
                  {dish.chefRec}
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
