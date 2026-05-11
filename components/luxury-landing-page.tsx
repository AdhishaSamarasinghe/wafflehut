"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import FrameSequence from "@/components/frame-sequence";
import { galleryImages, menuCards, reviews, whyChooseUs } from "@/lib/waffle-data";

const ingredientHighlights = [
  {
    title: "Fluffy batter",
    description: "Whipped airy and cooked to a golden snap, so every bite feels warm and bouncy.",
    tone: "linear-gradient(135deg, rgba(255, 179, 71, 0.95), rgba(255, 248, 251, 0.7))"
  },
  {
    title: "Berry pops",
    description: "Strawberries and blueberries land like candy confetti for a bright little burst.",
    tone: "linear-gradient(135deg, rgba(255, 107, 138, 0.95), rgba(124, 214, 255, 0.8))"
  },
  {
    title: "Cream clouds",
    description: "Soft whipped cream swoops in like a cartoon cloud drifting over the stack.",
    tone: "linear-gradient(135deg, rgba(255, 248, 251, 0.96), rgba(255, 255, 255, 0.55))"
  },
  {
    title: "Golden drizzle",
    description: "Honey and syrup finish the plate with a glossy comic-book shine.",
    tone: "linear-gradient(135deg, rgba(255, 179, 71, 0.95), rgba(141, 84, 39, 0.85))"
  }
] as const;

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left"
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
}) {
  const alignment = align === "center" ? "mx-auto items-center text-center" : "items-start text-left";

  return (
    <div className={`flex max-w-3xl flex-col gap-4 ${alignment}`}>
      <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.34em] text-waffle-cream/80 backdrop-blur-xl">
        <span className="h-2 w-2 rounded-full bg-waffle-honey shadow-[0_0_16px_rgba(255,179,71,0.85)]" />
        {eyebrow}
      </div>
      <h2 className="font-display text-4xl leading-[0.94] tracking-tight text-waffle-cream sm:text-5xl md:text-6xl">
        {title}
      </h2>
      <p className="max-w-2xl text-base leading-7 text-waffle-cream/75 sm:text-lg">{description}</p>
    </div>
  );
}

function RevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

export default function LuxuryLandingPage() {
  const glowX = useMotionValue(0.5);
  const glowY = useMotionValue(0.3);
  const glowXSmooth = useSpring(glowX, { stiffness: 45, damping: 16, mass: 0.5 });
  const glowYSmooth = useSpring(glowY, { stiffness: 45, damping: 16, mass: 0.5 });

  return (
    <main
      id="top"
      className="relative overflow-hidden bg-waffle-night text-waffle-cream"
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width;
        const y = (event.clientY - bounds.top) / bounds.height;
        glowX.set(x);
        glowY.set(y);
      }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(circle at 22% 18%, rgba(255, 179, 71, 0.22), transparent 18%), radial-gradient(circle at 78% 16%, rgba(255, 107, 138, 0.2), transparent 18%), radial-gradient(circle at 50% 0%, rgba(124, 214, 255, 0.15), transparent 24%), linear-gradient(180deg, rgba(255, 255, 255, 0.06), transparent 18%)",
          x: glowXSmooth,
          y: glowYSmooth
        }}
      />
      <div aria-hidden className="cartoon-grid pointer-events-none absolute inset-0 opacity-[0.14]" />
      <div aria-hidden className="soft-sprinkles pointer-events-none absolute inset-0 opacity-[0.2]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_50%_12%,rgba(255,248,251,0.14),transparent_28%),radial-gradient(circle_at_80%_18%,rgba(255,179,71,0.18),transparent_18%),radial-gradient(circle_at_20%_22%,rgba(125,108,255,0.18),transparent_22%)]" />

      <FrameSequence />

      <div className="relative z-10 space-y-0 bg-[linear-gradient(180deg,rgba(19,12,26,0.86),rgba(27,16,36,0.97))]">
        <RevealSection className="mx-auto max-w-7xl px-5 py-24 sm:px-6 md:px-10 lg:py-28">
          <section id="menu" className="space-y-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                eyebrow="Featured Waffles"
                title="A bright stack of cartoon waffles, each one dressed like the star of the tray."
                description="Choose a flavor lane, then let the toppings do the talking. Every card is built to feel playful, bold, and easy to scan on mobile."
              />
              <div className="max-w-sm rounded-[1.75rem] border border-white/12 bg-white/10 p-5 text-sm leading-7 text-waffle-cream/75 shadow-cartoon backdrop-blur-2xl">
                Fresh batter, silly-big toppings, and syrupy finishes are arranged like a fun dessert lineup instead of a standard menu grid.
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {menuCards.map((card, index) => (
                <motion.article
                  key={card.name}
                  whileHover={{ y: -10, rotate: index % 2 === 0 ? -1.5 : 1.5, scale: 1.02 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="group overflow-hidden rounded-[2rem] border border-white/12 bg-waffle-frosting/10 shadow-cartoon backdrop-blur-xl"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.name}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-waffle-night via-waffle-night/20 to-transparent" />
                    <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-waffle-night/45 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-waffle-cream backdrop-blur-xl">
                      #{index + 1}
                    </div>
                    <div className="absolute inset-x-4 bottom-4 rounded-[1.5rem] border border-white/12 bg-waffle-night/55 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-display text-2xl text-waffle-cream">{card.name}</h3>
                        <span className="text-lg font-semibold text-waffle-honey">{card.price}</span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-waffle-cream/76">{card.description}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>
        </RevealSection>

        <RevealSection className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:px-10 lg:py-28">
          <section id="about" className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start">
            <div className="space-y-6">
              <SectionHeading
                eyebrow="About WaffleHut"
                title="A waffle shop built like a Saturday morning cartoon: warm, loud, and impossible to ignore."
                description="We lean into happy colors, hand-drawn energy, and dessert-first storytelling so every visit feels like stepping into a sugar rush scene."
              />
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  ["129-frame story", "The hero reel plays every PNG in order as you scroll."],
                  ["Big dessert energy", "Soft batter, juicy fruit, cloud cream, and glossy syrup."],
                  ["Made to smile", "Bright colors and bouncy motion keep the page playful."],
                ].map(([title, description]) => (
                  <div key={title} className="cartoon-panel rounded-[1.5rem] p-5 shadow-cartoon backdrop-blur-xl">
                    <div className="text-sm font-semibold uppercase tracking-[0.28em] text-waffle-honey">{title}</div>
                    <p className="mt-3 text-sm leading-7 text-waffle-cream/76">{description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              {whyChooseUs.map((item, index) => (
                <motion.div
                  key={item.title}
                  whileHover={{ x: 6, scale: 1.01 }}
                  transition={{ duration: 0.25 }}
                  className="cartoon-card rounded-[1.75rem] p-6 shadow-cartoon"
                >
                  <div className="flex items-start gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.2rem] border border-white/14 bg-waffle-honey/20 text-2xl text-waffle-honey">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <h3 className="font-display text-2xl text-waffle-cream">{item.title}</h3>
                      <p className="mt-2 max-w-2xl text-sm leading-7 text-waffle-cream/76">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </RevealSection>

        <RevealSection className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:px-10 lg:py-28">
          <section id="ingredients" className="space-y-10">
            <SectionHeading
              eyebrow="Fun Ingredients"
              title="Every waffle starts with a cheerful build: batter, toppings, and one final shiny flourish."
              description="This section highlights the texture and color language behind the menu so the page feels playful even before a customer orders."
              align="center"
            />

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {ingredientHighlights.map((item) => (
                <motion.article
                  key={item.title}
                  whileHover={{ y: -8, scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-[1.75rem] border border-white/12 bg-white/8 p-6 shadow-cartoon backdrop-blur-xl"
                >
                  <div className="flex items-center gap-3">
                    <span className="h-4 w-4 rounded-full shadow-[0_0_18px_rgba(255,255,255,0.4)]" style={{ background: item.tone }} />
                    <div className="font-semibold uppercase tracking-[0.28em] text-waffle-cream/65">Ingredient</div>
                  </div>
                  <h3 className="mt-5 font-display text-2xl text-waffle-cream">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-waffle-cream/76">{item.description}</p>
                </motion.article>
              ))}
            </div>
          </section>
        </RevealSection>

        <RevealSection className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:px-10 lg:py-28">
          <section id="reviews">
            <SectionHeading
              eyebrow="Customer Reviews"
              title="The kind of dessert that makes people pause, grin, and order another round."
              description="A playful page still needs trust signals, so the review cards keep the tone warm and enthusiastic without losing clarity."
            />
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {reviews.map((review) => (
                <motion.div
                  key={review.name}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-[1.75rem] border border-white/12 bg-white/10 p-6 shadow-cartoon backdrop-blur-xl"
                >
                  <div className="flex items-center gap-1 text-waffle-honey">
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                  </div>
                  <p className="mt-4 text-base leading-7 text-waffle-cream/84">“{review.quote}”</p>
                  <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  <div className="mt-5">
                    <div className="font-semibold text-waffle-cream">{review.name}</div>
                    <div className="text-sm uppercase tracking-[0.22em] text-waffle-cream/55">{review.role}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </RevealSection>

        <RevealSection className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:px-10 lg:py-28">
          <section id="gallery">
            <SectionHeading
              eyebrow="Cartoon Gallery"
              title="Bright textures, sticky shine, and little scene-setting details to keep the page moving."
              description="The gallery mixes wide and tight crops so the layout feels energetic and editorial at the same time."
            />
            <div className="mt-10 grid gap-4 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <img src={galleryImages[0]} alt="Waffle with rich toppings" className="h-[380px] w-full rounded-[2rem] object-cover shadow-cartoon sm:h-[460px]" loading="lazy" decoding="async" />
              </div>
              <div className="grid gap-4 lg:col-span-5">
                <img src={galleryImages[1]} alt="Luxury dessert close-up" className="h-[180px] w-full rounded-[2rem] object-cover shadow-cartoon sm:h-[220px]" loading="lazy" decoding="async" />
                <div className="grid gap-4 sm:grid-cols-2">
                  <img src={galleryImages[2]} alt="Chocolate drizzle" className="h-[170px] w-full rounded-[2rem] object-cover shadow-cartoon" loading="lazy" decoding="async" />
                  <img src={galleryImages[3]} alt="Plated pastry styling" className="h-[170px] w-full rounded-[2rem] object-cover shadow-cartoon" loading="lazy" decoding="async" />
                </div>
              </div>
            </div>
          </section>
        </RevealSection>

        <RevealSection className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:px-10 lg:py-28">
          <section id="cta" className="overflow-hidden rounded-[2.5rem] border border-white/14 bg-[linear-gradient(135deg,rgba(255,179,71,0.25),rgba(255,107,138,0.2),rgba(125,108,255,0.2),rgba(255,248,251,0.08))] p-8 shadow-[0_40px_120px_rgba(0,0,0,0.42)] sm:p-12 lg:p-14">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="space-y-5">
                <div className="inline-flex rounded-full border border-waffle-cream/20 bg-waffle-night/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-waffle-cream/80 backdrop-blur-xl">
                  Order CTA Banner
                </div>
                <h2 className="font-display text-4xl leading-[0.95] text-waffle-cream sm:text-5xl md:text-6xl">
                  Ready for a waffle that looks like it jumped out of a cartoon tray?
                </h2>
                <p className="max-w-2xl text-base leading-7 text-waffle-cream/76">
                  Book a tasting, plan a celebration, or place an order for a dessert moment that feels bright, cheerful, and a little over the top.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
                <a href="mailto:hello@wafflehut.example" className="inline-flex items-center justify-center rounded-full bg-waffle-cream px-6 py-3 text-center text-sm font-semibold text-waffle-night shadow-[0_12px_0_rgba(63,34,13,0.35)] transition-transform duration-300 hover:scale-[1.03]">
                  Book a Tasting
                </a>
                <a href="#top" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-6 py-3 text-center text-sm font-semibold text-waffle-cream transition-transform duration-300 hover:scale-[1.03]">
                  Back to Top
                </a>
              </div>
            </div>
          </section>
        </RevealSection>

        <footer className="border-t border-white/10 px-5 py-10 sm:px-6 md:px-10">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="font-display text-3xl text-waffle-cream">WaffleHut</div>
              <p className="mt-2 text-sm text-waffle-cream/55">Hot, sweet, crispy waffles with a full cartoon scroll story.</p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-waffle-cream/65">
              <a href="#about">About</a>
              <a href="#menu">Menu</a>
              <a href="#ingredients">Ingredients</a>
              <a href="#reviews">Reviews</a>
              <a href="#gallery">Gallery</a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}