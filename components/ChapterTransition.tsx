export default function ChapterTransition({ 
  to,
  height = 400,
  fromColor = "transparent",
  toColor = "",
  overlap = false,
}: { 
  to: "ch2" | "ch3" | "ch4";
  height?: number;
  fromColor?: string;
  toColor?: string;
  overlap?: boolean;
}) {
  const getTextureClass = () => `texture-${to}`;
  const getToColorClass = () => {
    if (toColor) return toColor;
    if (to === "ch2") return "var(--color-ch2-bg, #ECE5DB)";
    if (to === "ch3") return "var(--color-ch3-bg, #4A1F28)";
    if (to === "ch4") return "#F4F0E8";
    return "transparent";
  };

  return (
    <div 
      className="relative w-full pointer-events-none z-10"
      style={{ 
        height: `${height}px`,
        marginTop: overlap ? `-${height}px` : '0px'
      }}
    >
      {/* 1. Gradual Color Shift */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: `linear-gradient(to bottom, ${fromColor} 0%, ${getToColorClass()} 100%)` 
        }} 
      />

      {/* 2. Fading Material Texture & Grain */}
      <div 
        className={getTextureClass()}
        style={{ 
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)'
        }}
      />

      {/* 3. Subtle Radial Light (for Ch3 specifically, or general) */}
      {to === "ch3" && (
        <div 
          className="absolute inset-0"
          style={{ 
            background: 'radial-gradient(circle at 50% 100%, rgba(245,238,229,0.06) 0%, transparent 70%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)'
          }} 
        />
      )}
    </div>
  );
}
