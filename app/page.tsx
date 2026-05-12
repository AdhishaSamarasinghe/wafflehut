import WaffleSequence from '../components/WaffleSequence';

const menuCards = [
  {
    title: 'Soft, fluffy batter',
    description: 'Golden edges, creamy centers, and the kind of bite that feels like a warm cartoon hug.',
  },
  {
    title: 'Glossy toppings',
    description: 'Nutella rivers, glossy berries, syrup drips, and candy colors that stay clean and premium.',
  },
  {
    title: 'Built for Gen Z cravings',
    description: 'Bright branding, snackable storytelling, and a landing page that feels like a dessert commercial.',
  },
];

const highlightCards = [
  { label: 'Fresh', value: 'Daily baked' },
  { label: 'Frames', value: '143 PNGs' },
  { label: 'Mood', value: 'Candy cinema' },
];

export default function Page() {
  return (
    <main className="relative overflow-x-hidden bg-cream-white text-chocolate">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-waffle-pink/35 blur-3xl" />
        <div className="absolute right-[-6rem] top-28 h-96 w-96 rounded-full bg-honey-gold/25 blur-3xl" />
        <div className="absolute left-1/2 top-[42rem] h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-berry/10 blur-3xl" />
      </div>

      <section id="story">
        <WaffleSequence />
      </section>

      <section id="menu" className="relative mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-16">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="max-w-xl">
            <p className="font-display text-sm font-bold uppercase tracking-[0.35em] text-berry">Menu moodboard</p>
            <h2 className="font-display mt-4 text-balance text-4xl font-bold text-chocolate sm:text-5xl">
              Built like a dessert campaign, not a generic restaurant site.
            </h2>
            <p className="mt-5 text-lg leading-8 text-chocolate/80">
              The whole experience is tuned for playful motion, rounded candy UI, and a premium cartoon identity that still feels clean, readable, and fast on mobile.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {menuCards.map((card, index) => (
              <article key={card.title} className={`glass-panel rounded-[2rem] p-5 shadow-waffle ${index === 1 ? 'md:-translate-y-3' : ''}`}>
                <div className="inline-flex rounded-full bg-white/65 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.3em] text-chocolate/65">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="font-display mt-4 text-2xl font-bold text-chocolate">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-chocolate/75">{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="visit" className="relative mx-auto max-w-7xl px-6 pb-20 sm:px-10 lg:px-16">
        <div className="overflow-hidden rounded-[2.75rem] bg-gradient-to-br from-chocolate via-[#7b4b2e] to-waffle-gold p-6 text-cream-white shadow-waffle sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="font-display text-sm font-bold uppercase tracking-[0.35em] text-cream-white/70">Welcome to WaffleHut</p>
              <h2 className="font-display mt-4 text-balance text-4xl font-bold sm:text-5xl lg:text-6xl">
                The happiest waffles in town.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-cream-white/85">
                A bright, buttery landing page with scroll storytelling, cute motion, and enough polish to make the dessert feel aspirational.
              </p>
            </div>

            <div className="glass-panel rounded-[2rem] border-white/25 bg-white/12 p-5 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.35em] text-cream-white/70">Order moments</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.5rem] bg-white/12 p-4">
                  <p className="font-display text-xl font-bold text-cream-white">Crispy stack</p>
                  <p className="mt-2 text-sm leading-6 text-cream-white/80">A warm, golden base with the glossy sweet finish people expect from a hero dessert.</p>
                </div>
                <div className="rounded-[1.5rem] bg-white/12 p-4">
                  <p className="font-display text-xl font-bold text-cream-white">Berry crown</p>
                  <p className="mt-2 text-sm leading-6 text-cream-white/80">Fresh color, playful contrast, and enough texture to keep every frame feeling rich.</p>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a href="#top" className="inline-flex items-center justify-center rounded-full bg-cream-white px-5 py-3 text-sm font-bold text-chocolate transition hover:-translate-y-0.5 hover:bg-white">
                  Back to top
                </a>
                <a href="#story" className="inline-flex items-center justify-center rounded-full border border-cream-white/40 px-5 py-3 text-sm font-bold text-cream-white transition hover:-translate-y-0.5 hover:bg-white/10">
                  Rewatch the story
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}