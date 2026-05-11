"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import FrameSequence from "@/components/frame-sequence";
import { galleryImages, menuCards, reviews, whyChooseUs } from "@/lib/waffle-data";

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="max-w-3xl">
      <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-brand-cream/70 backdrop-blur-xl">
        <span className="h-2 w-2 rounded-full bg-brand-gold shadow-[0_0_18px_rgba(215,180,106,0.85)]" />
        {eyebrow}
      </div>
      <h2 className="mt-5 font-serif text-4xl leading-[0.95] tracking-tight text-brand-cream sm:text-5xl md:text-6xl">
        {title}
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-brand-cream/68 sm:text-lg">{description}</p>
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
  const glowXSmooth = useSpring(glowX, { stiffness: 45, damping: 14, mass: 0.5 });
  const glowYSmooth = useSpring(glowY, { stiffness: 45, damping: 14, mass: 0.5 });

  return (
    <main
      id="top"
      className="relative overflow-hidden bg-brand-black text-brand-cream"
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
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(circle at center, rgba(215, 180, 106, 0.12), transparent 30%), radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.05), transparent 18%), linear-gradient(180deg, rgba(255,255,255,0.04), transparent 18%)",
          x: glowXSmooth,
          y: glowYSmooth
        }}
      />
      <div aria-hidden className="luxury-grid pointer-events-none absolute inset-0 opacity-[0.14]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(215,180,106,0.12),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(114,74,27,0.24),transparent_20%)]" />

      <FrameSequence />

      <div className="relative z-10 space-y-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.88),rgba(2,2,2,0.98))]">
        <RevealSection className="mx-auto max-w-7xl px-5 py-24 sm:px-6 md:px-10 lg:py-28">
          <section id="about" className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <SectionHeading
              eyebrow="About Our Waffles"
              title="A premium dessert ritual shaped with warmth, texture, and polish."
              description="WaffleHut is designed like a luxury food campaign: slow reveals, rich contrast, and a menu built around Belgian-style waffles finished with elevated toppings and precise plating."
            />
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["Belgian batter", "Airy centers with crisp, caramelized edges."],
                ["Signature toppings", "Nutella, fruit, cream, crunch, and seasonal accents."],
                ["Cinematic service", "A dessert experience with visual pacing and atmosphere."]
              ].map(([title, description]) => (
                <div key={title} className="glass-panel rounded-3xl p-6 shadow-soft">
                  <div className="text-sm uppercase tracking-[0.3em] text-brand-gold">{title}</div>
                  <p className="mt-4 text-sm leading-7 text-brand-cream/72">{description}</p>
                </div>
              ))}
            </div>
          </section>
        </RevealSection>

        <RevealSection className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:px-10 lg:py-28">
          <section id="menu">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                eyebrow="Featured Menu Cards"
                title="Luxury toppings, glassmorphism cards, and a polished modern layout."
                description="Each card uses layered depth, soft hover scaling, and appetite-first composition so the menu feels premium on both desktop and mobile."
              />
              <div className="max-w-xs rounded-3xl border border-white/10 bg-white/5 p-5 text-sm leading-7 text-brand-cream/68 backdrop-blur-2xl">
                Signature pairings are arranged to feel editorial: indulgent chocolate, bright fruit, delicate cream, and a final gloss of gold-toned warmth.
              </div>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {menuCards.map((card, index) => (
                <motion.article
                  key={card.name}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/6 shadow-soft backdrop-blur-2xl"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.name}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                    <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[0.65rem] uppercase tracking-[0.3em] text-brand-cream/70 backdrop-blur-xl">
                      0{index + 1}
                    </div>
                    <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/10 bg-black/42 p-4 backdrop-blur-2xl">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-serif text-2xl text-brand-cream">{card.name}</h3>
                        <span className="text-lg font-semibold text-brand-gold">{card.price}</span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-brand-cream/72">{card.description}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>
        </RevealSection>

        <RevealSection className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:px-10 lg:py-28">
          <section id="why-choose-us" className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <SectionHeading
              eyebrow="Why Choose Us"
              title="Designed for guests who want dessert to feel like an occasion."
              description="The site and the product both lean into premium pacing, refined contrast, and a visual language that feels more like a luxury campaign than a standard restaurant page."
            />
            <div className="grid gap-4">
              {whyChooseUs.map((item, index) => (
                <div key={item.title} className="glass-panel rounded-[1.75rem] p-6 shadow-soft">
                  <div className="flex items-start gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-brand-gold/25 bg-brand-gold/10 font-serif text-2xl text-brand-gold">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl text-brand-cream">{item.title}</h3>
                      <p className="mt-2 max-w-2xl text-sm leading-7 text-brand-cream/70">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </RevealSection>

        <RevealSection className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:px-10 lg:py-28">
          <section id="reviews">
            <SectionHeading
              eyebrow="Customer Reviews"
              title="A polished dessert experience that earns repeat visits."
              description="Trust, taste, and presentation are reinforced through warm language and tactile surfaces that feel premium at every breakpoint."
            />
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {reviews.map((review) => (
                <div key={review.name} className="glass-panel rounded-[1.75rem] p-6 shadow-soft">
                  <p className="text-base leading-7 text-brand-cream/82">“{review.quote}”</p>
                  <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  <div className="mt-5">
                    <div className="font-semibold text-brand-cream">{review.name}</div>
                    <div className="text-sm uppercase tracking-[0.22em] text-brand-cream/46">{review.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </RevealSection>

        <RevealSection className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:px-10 lg:py-28">
          <section id="gallery">
            <SectionHeading
              eyebrow="Gallery Section"
              title="Ambient imagery, layered depth, and soft motion-friendly compositions."
              description="The gallery pairs large cinematic crops with smaller editorial frames so the page feels alive without becoming crowded."
            />
            <div className="mt-10 grid gap-4 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <img src={galleryImages[0]} alt="Waffle with rich toppings" className="h-[380px] w-full rounded-[2rem] object-cover shadow-soft sm:h-[460px]" loading="lazy" decoding="async" />
              </div>
              <div className="grid gap-4 lg:col-span-5">
                <img src={galleryImages[1]} alt="Luxury dessert close-up" className="h-[180px] w-full rounded-[2rem] object-cover shadow-soft sm:h-[220px]" loading="lazy" decoding="async" />
                <div className="grid gap-4 sm:grid-cols-2">
                  <img src={galleryImages[2]} alt="Chocolate drizzle" className="h-[170px] w-full rounded-[2rem] object-cover shadow-soft" loading="lazy" decoding="async" />
                  <img src={galleryImages[3]} alt="Plated pastry styling" className="h-[170px] w-full rounded-[2rem] object-cover shadow-soft" loading="lazy" decoding="async" />
                </div>
              </div>
            </div>
          </section>
        </RevealSection>

        <RevealSection className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:px-10 lg:py-28">
          <section id="cta" className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(215,180,106,0.12),rgba(255,255,255,0.03),rgba(43,26,18,0.78))] p-8 shadow-[0_40px_120px_rgba(0,0,0,0.45)] sm:p-12 lg:p-14">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <div className="inline-flex rounded-full border border-brand-gold/20 bg-brand-gold/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">
                  CTA Banner
                </div>
                <h2 className="mt-5 font-serif text-4xl leading-[0.95] text-brand-cream sm:text-5xl md:text-6xl">
                  Reserve your first bite and experience waffles like a luxury premiere.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-brand-cream/70">
                  Book a tasting, plan a celebration, or place an order for a standout dessert moment that feels made for the spotlight.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
                <a href="mailto:hello@wafflehut.example" className="rounded-full bg-brand-cream px-6 py-3 text-center text-sm font-semibold text-black transition-transform duration-300 hover:scale-[1.03]">
                  Book a Tasting
                </a>
                <a href="#top" className="rounded-full border border-white/12 bg-white/6 px-6 py-3 text-center text-sm font-semibold text-brand-cream transition-transform duration-300 hover:scale-[1.03]">
                  Back to Top
                </a>
              </div>
            </div>
          </section>
        </RevealSection>

        <footer className="border-t border-white/10 px-5 py-10 sm:px-6 md:px-10">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="font-serif text-3xl text-brand-cream">WaffleHut</div>
              <p className="mt-2 text-sm text-brand-cream/50">Luxury Belgian waffles with cinematic scroll storytelling.</p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-brand-cream/60">
              <a href="#about">About</a>
              <a href="#menu">Menu</a>
              <a href="#reviews">Reviews</a>
              <a href="#gallery">Gallery</a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}