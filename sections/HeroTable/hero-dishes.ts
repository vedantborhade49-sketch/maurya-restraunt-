export interface HeroDishType {
  id: string;
  asset: string;
  position: string;
  depth: number; // Parallax strength factor
  rotation: number;
  scale: number;
  exitX: number; // Exit scroll offset in px
  exitY: number; // Exit scroll offset in px
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}

export const HERO_DISHES: HeroDishType[] = [
  {
    id: "dish-01",
    asset: "/editorial-food-1.png",
    position: "top-left",
    depth: 0.35,
    rotation: -8,
    scale: 1.05,
    exitX: -220,
    exitY: -160,
    top: "8%",
    left: "5%",
  },
  {
    id: "dish-02",
    asset: "/editorial-food-2.png",
    position: "top-right",
    depth: 0.65,
    rotation: 6,
    scale: 0.85,
    exitX: 250,
    exitY: -180,
    top: "10%",
    right: "6%",
  },
  {
    id: "dish-03",
    asset: "/editorial-food-3.png",
    position: "bottom-left",
    depth: 0.45,
    rotation: -12,
    scale: 0.95,
    exitX: -240,
    exitY: 240,
    bottom: "6%",
    left: "8%",
  },
  {
    id: "dish-04",
    asset: "/editorial-food-4.png",
    position: "bottom-right",
    depth: 0.55,
    rotation: 15,
    scale: 1.0,
    exitX: 280,
    exitY: 220,
    bottom: "8%",
    right: "8%",
  },
  {
    id: "dish-05",
    asset: "/editorial-food-5.png",
    position: "bottom-center",
    depth: 0.25,
    rotation: -5,
    scale: 1.15,
    exitX: 0,
    exitY: 320,
    bottom: "-8%",
    left: "38%",
  },
];
