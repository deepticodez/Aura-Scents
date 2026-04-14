export interface Product {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  notes: string[];
  performance: {
    longevity: string;
    sillage: string;
    intensity: string;
  };
  image: string;
}

export const products: Product[] = [
  {
    id: "nox",
    name: "NOX",
    subtitle: "Dark / Smoke / Mystery",
    description: "An unapologetic statement of power and mystery. Forged in smoke, defined by intensity.",
    price: 240,
    notes: ["Aged Oud", "Smoked Vetiver", "Black Pepper"],
    performance: {
      longevity: "12+ Hours",
      sillage: "Heavy",
      intensity: "High",
    },
    image: "/images/nox/ezgif-frame-060.jpg",
  },
  {
    id: "ocean-mist",
    name: "Ocean Mist",
    subtitle: "Fresh / Aquatic / Breeze",
    description: "A purifying breath of coastal air. Crisp, vibrant, and effortlessly elegant.",
    price: 190,
    notes: ["Sea Salt", "Bergamot", "Driftwood"],
    performance: {
      longevity: "8+ Hours",
      sillage: "Moderate",
      intensity: "Moderate",
    },
    image: "/images/ocean/ezgif-frame-060.jpg",
  },
  {
    id: "rose-elxir",
    name: "Rose Élxir",
    subtitle: "Floral / Sweet / Romance",
    description: "The pure essence of romance captured in a bottle. Velvet petals meeting sweet nectar.",
    price: 210,
    notes: ["Bulgarian Rose", "Vanilla Bean", "Pink Pepper"],
    performance: {
      longevity: "10+ Hours",
      sillage: "Moderate to Heavy",
      intensity: "Medium-High",
    },
    image: "/images/rose/ezgif-frame-060.jpg",
  }
];
