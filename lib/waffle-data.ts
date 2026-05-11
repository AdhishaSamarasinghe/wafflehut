export const FRAME_COUNT = 129;

export function getFramePath(frameNumber: number) {
  return `/frames/frame_${String(frameNumber).padStart(4, "0")}.png`;
}

export const sequenceChapters = [
  {
    startFrame: 1,
    endFrame: 20,
    eyebrow: "The opening bake",
    title: "Freshly Baked",
    description: "Golden batter, warm butter, and the first crackle of caramelized edges."
  },
  {
    startFrame: 21,
    endFrame: 40,
    eyebrow: "Rich indulgence",
    title: "Rich Melted Nutella",
    description: "Silky chocolate ribbons melt into every ridge for a deeper, velvet finish."
  },
  {
    startFrame: 41,
    endFrame: 60,
    eyebrow: "The fresh finish",
    title: "Fresh Fruits Added",
    description: "Bright berries and orchard fruit cut through the sweetness with a polished lift."
  },
  {
    startFrame: 61,
    endFrame: 129,
    eyebrow: "The signature moment",
    title: "Finished To Perfection",
    description: "A final flourish of cream, crunch, and shine presented like a dessert premiere."
  }
] as const;

export const menuCards = [
  {
    name: "Midnight Velvet",
    description: "Belgian waffle, dark chocolate ganache, whipped mascarpone, and toasted cacao nibs.",
    price: "$18",
    image:
      "https://images.unsplash.com/photo-1508737027454-e6454ef45afd?auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "Golden Orchard",
    description: "Vanilla cream, poached pears, honey glaze, candied almond shards, and citrus zest.",
    price: "$19",
    image:
      "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "Royal Berry Crown",
    description: "Seasonal berries, rose syrup, chantilly cream, and a warm caramel drizzle.",
    price: "$17",
    image:
      "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "Crème Brûlée Stack",
    description: "Silken custard cream, burnt sugar shards, vanilla bean dust, and a crisp cookie edge.",
    price: "$20",
    image:
      "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?auto=format&fit=crop&w=1200&q=80"
  }
];

export const whyChooseUs = [
  {
    title: "Crafted in small batches",
    description: "Every plate is finished to order so the texture stays crisp, warm, and luxuriously precise."
  },
  {
    title: "Premium ingredient sourcing",
    description: "Belgian cocoa, cultured butter, hand-picked fruit, and deep vanilla from trusted producers."
  },
  {
    title: "A dessert experience",
    description: "Lighting, plating, and pacing are designed like a food commercial, not a fast-casual stop."
  }
];

export const reviews = [
  {
    name: "Maya R.",
    role: "Food editor",
    quote:
      "The sequence-driven reveal makes the waffles feel cinematic before you even reach the menu."
  },
  {
    name: "Jordan L.",
    role: "Brand strategist",
    quote:
      "This is the rare dessert site that feels premium, calm, and appetizing without losing personality."
  },
  {
    name: "Selena K.",
    role: "Regular guest",
    quote:
      "The chocolate and fruit combinations are balanced beautifully. It feels like a special occasion every time."
  }
];

export const galleryImages = [
  "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1464306076886-da185f6a7f5d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1200&q=80"
];