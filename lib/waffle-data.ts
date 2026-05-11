export const FRAME_COUNT = 129;

export function getFramePath(frameNumber: number) {
  return `/frames/frame_${String(frameNumber).padStart(4, "0")}.png`;
}

export const sequenceChapters = [
  {
    startFrame: 1,
    endFrame: 14,
    eyebrow: "Fresh waffle intro",
    title: "Freshly Baked!",
    description: "A plain waffle rises into frame with buttery edges, warm steam, and a perfect cartoon crunch."
  },
  {
    startFrame: 15,
    endFrame: 32,
    eyebrow: "Chocolate drama",
    title: "Chocolate Explosion!",
    description: "Nutella pours like a shiny lava ribbon, filling every square with glossy cartoon energy."
  },
  {
    startFrame: 33,
    endFrame: 50,
    eyebrow: "Berry bounce",
    title: "Berry Blast!",
    description: "Strawberries bounce in with blueberry pops, bringing bright color and happy dessert chaos."
  },
  {
    startFrame: 51,
    endFrame: 68,
    eyebrow: "Banana boogie",
    title: "Banana Boogie!",
    description: "Banana slices spin and land with a playful little hop before the waffles settle into the groove."
  },
  {
    startFrame: 69,
    endFrame: 88,
    eyebrow: "Cream cloud",
    title: "Cream Pop!",
    description: "Whipped cream puffs up in a soft cartoon cloud, filling the hero with fluffy sweetness."
  },
  {
    startFrame: 89,
    endFrame: 108,
    eyebrow: "Honey shine",
    title: "Honey Drizzle!",
    description: "Golden honey arcs across the top in a glossy, syrupy finish that gleams on impact."
  },
  {
    startFrame: 109,
    endFrame: 129,
    eyebrow: "Final flourish",
    title: "Sweet Perfection!",
    description: "The full dessert stacks up into a happy final pose, glowing like the last shot in a cartoon commercial."
  }
] as const;

export const menuCards = [
  {
    name: "Chocolate Volcano",
    description: "A molten Nutella stack with whipped cream peaks and crunchy cocoa dust.",
    price: "$18",
    image: "https://images.unsplash.com/photo-1508737027454-e6454ef45afd?auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "Berry Bounce",
    description: "Strawberries, blueberries, and cream with a bright glossy finish.",
    price: "$17",
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "Banana Boogie",
    description: "Spun banana slices, honey gloss, and a soft cloud of vanilla cream.",
    price: "$16",
    image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "Honey Hug",
    description: "Golden drizzle, sugar sparkle, and a warm toasted edge for the finale.",
    price: "$19",
    image: "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?auto=format&fit=crop&w=1200&q=80"
  }
];

export const whyChooseUs = [
  {
    title: "Cloud-soft batter",
    description: "Fresh batter whips up with a light center and a crisp edge that stays cartoon-cute and golden."
  },
  {
    title: "Playful topping stacks",
    description: "Chocolate, berries, bananas, and cream land in bold layers that feel like an animated food splash."
  },
  {
    title: "Cartoon-stage service",
    description: "Every plate is styled like a finale shot, with warm lighting, bright contrast, and a happy little shine."
  }
];

export const reviews = [
  {
    name: "Maya R.",
    role: "Dessert fan",
    quote: "The scroll reel feels like a cartoon trailer. I was already hungry before the first card appeared."
  },
  {
    name: "Jordan L.",
    role: "Weekend regular",
    quote: "The waffles are fluffy, the toppings are loud, and the page has the kind of energy that makes you smile."
  },
  {
    name: "Selena K.",
    role: "Sweet tooth",
    quote: "The honey finish and berry splash taste like a tiny celebration every time we order."
  }
];

export const galleryImages = [
  "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1464306076886-da185f6a7f5d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1200&q=80"
];