export interface HeroDishType {
  id: string;
  asset: string;
  desktop: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
  mobile: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
  scale: number;
  rotation: number;
  depth: number; // Parallax strength factor
  exitX: number; // Exit scroll offset X in px
  exitY: number; // Exit scroll offset Y in px
  exitRotation: number;
  exitScale: number;
  zIndex: number;
}

export const HERO_DISHES: HeroDishType[] = [
  {
    id: "dish-01",
    asset: "/editorial-food-1.png",
    desktop: {
      top: "-10%",
      left: "-12%",
    },
    mobile: {
      top: "-5%",
      left: "-25%",
    },
    scale: 1.45,
    rotation: -12,
    depth: 0.3,
    exitX: -280,
    exitY: -200,
    exitRotation: -20,
    exitScale: 1.1,
    zIndex: 2,
  },
  {
    id: "dish-02",
    asset: "/editorial-food-2.png",
    desktop: {
      top: "-6%",
      right: "-8%",
    },
    mobile: {
      top: "-8%",
      right: "-20%",
    },
    scale: 1.05,
    rotation: 15,
    depth: 0.5,
    exitX: 300,
    exitY: -150,
    exitRotation: 25,
    exitScale: 0.9,
    zIndex: 1,
  },
  {
    id: "dish-03",
    asset: "/editorial-food-4.png",
    desktop: {
      bottom: "-15%",
      right: "-10%",
    },
    mobile: {
      bottom: "-10%",
      right: "-25%",
    },
    scale: 1.35,
    rotation: -8,
    depth: 0.4,
    exitX: 350,
    exitY: 250,
    exitRotation: -18,
    exitScale: 1.1,
    zIndex: 2,
  },
  {
    id: "dish-04",
    asset: "/editorial-food-3.png",
    desktop: {
      bottom: "-8%",
      left: "-5%",
    },
    mobile: {
      bottom: "-5%",
      left: "-15%",
    },
    scale: 0.95,
    rotation: 20,
    depth: 0.6,
    exitX: -250,
    exitY: 300,
    exitRotation: 35,
    exitScale: 0.85,
    zIndex: 1,
  },
  {
    id: "dish-05",
    asset: "/editorial-food-5.png",
    desktop: {
      top: "40%",
      right: "-12%",
    },
    mobile: {
      top: "45%",
      right: "-28%",
    },
    scale: 0.8,
    rotation: -5,
    depth: 0.25,
    exitX: 280,
    exitY: 50,
    exitRotation: -10,
    exitScale: 0.7,
    zIndex: 1,
  },
];
