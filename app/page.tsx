import WaffleSequence from '../components/WaffleSequence';
import type { CSSProperties } from 'react';

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

const rainbowSprinkles = [
  { left: '2%', top: '4%', width: 24, height: 8, color: '#ff4f88', rotation: '-18deg', duration: '9s', delay: '-1s' },
  { left: '5%', top: '18%', width: 18, height: 6, color: '#ffcc33', rotation: '22deg', duration: '10.5s', delay: '-5s' },
  { left: '8%', top: '34%', width: 20, height: 7, color: '#55d7ff', rotation: '-30deg', duration: '11s', delay: '-2s' },
  { left: '12%', top: '10%', width: 16, height: 6, color: '#7ef38d', rotation: '14deg', duration: '12s', delay: '-7s' },
  { left: '16%', top: '26%', width: 28, height: 9, color: '#b56dff', rotation: '-8deg', duration: '8.5s', delay: '-4s' },
  { left: '21%', top: '6%', width: 18, height: 6, color: '#ff8a3d', rotation: '33deg', duration: '9.5s', delay: '-6s' },
  { left: '25%', top: '40%', width: 22, height: 8, color: '#ff67c4', rotation: '-26deg', duration: '10s', delay: '-3s' },
  { left: '29%', top: '15%', width: 15, height: 5, color: '#58e1d8', rotation: '12deg', duration: '11.5s', delay: '-8s' },
  { left: '34%', top: '30%', width: 26, height: 9, color: '#ffe85a', rotation: '-14deg', duration: '12.5s', delay: '-1.5s' },
  { left: '38%', top: '8%', width: 18, height: 6, color: '#ff5c7a', rotation: '18deg', duration: '9.25s', delay: '-5.5s' },
  { left: '42%', top: '24%', width: 20, height: 7, color: '#74d9ff', rotation: '-36deg', duration: '13s', delay: '-2.5s' },
  { left: '46%', top: '44%', width: 24, height: 8, color: '#9fff62', rotation: '9deg', duration: '10.25s', delay: '-7.5s' },
  { left: '50%', top: '12%', width: 30, height: 10, color: '#ff9f5a', rotation: '-12deg', duration: '8.75s', delay: '-3.5s' },
  { left: '54%', top: '32%', width: 18, height: 6, color: '#ff3b6b', rotation: '28deg', duration: '11.25s', delay: '-6.5s' },
  { left: '58%', top: '18%', width: 22, height: 8, color: '#8f7bff', rotation: '-24deg', duration: '12.25s', delay: '-4.25s' },
  { left: '62%', top: '5%', width: 19, height: 6, color: '#4ce3ff', rotation: '16deg', duration: '9.75s', delay: '-2.25s' },
  { left: '66%', top: '38%', width: 27, height: 9, color: '#ffd93d', rotation: '-30deg', duration: '10.75s', delay: '-8.25s' },
  { left: '70%', top: '14%', width: 16, height: 5, color: '#7ef38d', rotation: '12deg', duration: '11.75s', delay: '-1.75s' },
  { left: '74%', top: '28%', width: 23, height: 8, color: '#ff6f91', rotation: '-8deg', duration: '13.25s', delay: '-5.25s' },
  { left: '78%', top: '8%', width: 18, height: 6, color: '#f4b942', rotation: '34deg', duration: '9.25s', delay: '-3.25s' },
  { left: '82%', top: '36%', width: 25, height: 9, color: '#6fe7ff', rotation: '-20deg', duration: '12.75s', delay: '-6.75s' },
  { left: '86%', top: '16%', width: 17, height: 6, color: '#ff4f88', rotation: '24deg', duration: '10.25s', delay: '-4.75s' },
  { left: '90%', top: '30%', width: 29, height: 10, color: '#b56dff', rotation: '-32deg', duration: '11.25s', delay: '-2.75s' },
  { left: '94%', top: '10%', width: 18, height: 6, color: '#58e1d8', rotation: '10deg', duration: '8.95s', delay: '-7.25s' },
  { left: '98%', top: '22%', width: 20, height: 7, color: '#ff8a3d', rotation: '-16deg', duration: '9.85s', delay: '-1.25s' },
  { left: '7%', top: '52%', width: 22, height: 7, color: '#ff3b6b', rotation: '8deg', duration: '12.25s', delay: '-4.5s' },
  { left: '19%', top: '58%', width: 28, height: 9, color: '#ffd93d', rotation: '-20deg', duration: '11.5s', delay: '-6s' },
  { left: '31%', top: '63%', width: 16, height: 5, color: '#55d7ff', rotation: '26deg', duration: '9.25s', delay: '-3.5s' },
  { left: '43%', top: '56%', width: 24, height: 8, color: '#7ef38d', rotation: '-12deg', duration: '10.75s', delay: '-8s' },
  { left: '57%', top: '60%', width: 18, height: 6, color: '#ff67c4', rotation: '32deg', duration: '13.25s', delay: '-5.75s' },
  { left: '69%', top: '54%', width: 26, height: 9, color: '#f4b942', rotation: '-28deg', duration: '9.75s', delay: '-2.75s' },
  { left: '81%', top: '60%', width: 19, height: 6, color: '#8f7bff', rotation: '14deg', duration: '12.75s', delay: '-7.25s' },
  { left: '92%', top: '54%', width: 23, height: 8, color: '#4ce3ff', rotation: '-10deg', duration: '10.25s', delay: '-4.25s' },
];

const rainbowColorPalette = ['#FF8DA1', '#FF0000', '#00AEEF', '#FFF200', '#8CC63F', '#C47C34'];

const visitSprinkles = [
  { left: '3%', top: '12%', width: 22, height: 8, color: '#ff4f88', accent: '#ffcc33', rotation: '-18deg', duration: '9.5s', delay: '-2s' },
  { left: '8%', top: '26%', width: 18, height: 6, color: '#55d7ff', accent: '#b56dff', rotation: '20deg', duration: '10.5s', delay: '-5s' },
  { left: '14%', top: '8%', width: 26, height: 9, color: '#7ef38d', accent: '#58e1d8', rotation: '-30deg', duration: '11s', delay: '-3s' },
  { left: '22%', top: '20%', width: 16, height: 6, color: '#ff8a3d', accent: '#ff67c4', rotation: '12deg', duration: '8.75s', delay: '-6s' },
  { left: '30%', top: '9%', width: 20, height: 7, color: '#b56dff', accent: '#ffe85a', rotation: '-8deg', duration: '12s', delay: '-1.5s' },
  { left: '38%', top: '28%', width: 24, height: 8, color: '#ff67c4', accent: '#4ce3ff', rotation: '33deg', duration: '9.25s', delay: '-4.5s' },
  { left: '46%', top: '14%', width: 18, height: 6, color: '#ffcc33', accent: '#ff4f88', rotation: '-14deg', duration: '10s', delay: '-7s' },
  { left: '54%', top: '30%', width: 28, height: 9, color: '#58e1d8', accent: '#8f7bff', rotation: '18deg', duration: '11.5s', delay: '-2.75s' },
  { left: '62%', top: '10%', width: 16, height: 6, color: '#ff3b6b', accent: '#7ef38d', rotation: '-24deg', duration: '9.75s', delay: '-5.75s' },
  { left: '70%', top: '24%', width: 24, height: 8, color: '#f4b942', accent: '#55d7ff', rotation: '14deg', duration: '12.25s', delay: '-3.25s' },
  { left: '78%', top: '7%', width: 18, height: 6, color: '#8f7bff', accent: '#ff8a3d', rotation: '-32deg', duration: '8.95s', delay: '-6.25s' },
  { left: '86%', top: '22%', width: 26, height: 9, color: '#4ce3ff', accent: '#ffcc33', rotation: '26deg', duration: '10.75s', delay: '-1.25s' },
  { left: '93%', top: '12%', width: 20, height: 7, color: '#ff6f91', accent: '#58e1d8', rotation: '-10deg', duration: '11.25s', delay: '-4.25s' },
  { left: '12%', top: '58%', width: 30, height: 10, color: '#ff4f88', accent: '#b56dff', rotation: '8deg', duration: '12.5s', delay: '-5.5s' },
  { left: '26%', top: '70%', width: 22, height: 7, color: '#ffcc33', accent: '#55d7ff', rotation: '-22deg', duration: '10.25s', delay: '-2.5s' },
  { left: '40%', top: '64%', width: 18, height: 6, color: '#7ef38d', accent: '#ff67c4', rotation: '16deg', duration: '9.75s', delay: '-7.5s' },
  { left: '56%', top: '72%', width: 28, height: 9, color: '#b56dff', accent: '#f4b942', rotation: '-12deg', duration: '11.75s', delay: '-3.75s' },
  { left: '71%', top: '66%', width: 20, height: 7, color: '#ff8a3d', accent: '#4ce3ff', rotation: '28deg', duration: '8.85s', delay: '-6.75s' },
  { left: '88%', top: '60%', width: 24, height: 8, color: '#58e1d8', accent: '#ff3b6b', rotation: '-18deg', duration: '10.85s', delay: '-1.75s' },
];

function RainbowSprinkles() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[400vh] bottom-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),rgba(255,255,255,0)_45%)]" />
      {rainbowSprinkles.map((sprinkle, index) => {
        const primaryColor = rainbowColorPalette[index % rainbowColorPalette.length];
        const style = {
          left: sprinkle.left,
          top: sprinkle.top,
          width: `${sprinkle.width}px`,
          height: `${sprinkle.height}px`,
          background: primaryColor,
          boxShadow: `0 0 6px ${primaryColor}33`,
          animationDuration: sprinkle.duration,
          animationDelay: sprinkle.delay,
          ['--sprinkle-rotation' as string]: sprinkle.rotation,
        } as CSSProperties & { [key: string]: string };

        return (
          <span
            key={`${sprinkle.left}-${index}`}
            className="animate-sprinkle-flow absolute rounded-full border border-white/30"
            style={style}
          />
        );
      })}
    </div>
  );
}

function VisitSprinkles() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),rgba(255,255,255,0)_58%)]" />
      {visitSprinkles.map((sprinkle, index) => {
        const primaryColor = rainbowColorPalette[(index + 1) % rainbowColorPalette.length];
        const style = {
          left: sprinkle.left,
          top: sprinkle.top,
          width: `${sprinkle.width}px`,
          height: `${sprinkle.height}px`,
          background: primaryColor,
          boxShadow: `0 0 6px ${primaryColor}33`,
          animationDuration: sprinkle.duration,
          animationDelay: sprinkle.delay,
          ['--sprinkle-rotation' as string]: sprinkle.rotation,
        } as CSSProperties & { [key: string]: string };

        return (
          <span
            key={`${sprinkle.left}-${index}`}
            className="animate-sprinkle-flow absolute rounded-full border border-white/25"
            style={style}
          />
        );
      })}
    </div>
  );
}

export default function Page() {
  return (
    <main className="relative isolate overflow-x-hidden bg-cream-white text-chocolate">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-waffle-pink/35 blur-3xl" />
        <div className="absolute right-[-6rem] top-28 h-96 w-96 rounded-full bg-honey-gold/25 blur-3xl" />
        <div className="absolute left-1/2 top-[42rem] h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-berry/10 blur-3xl" />
      </div>

      <section id="story">
        <WaffleSequence />
      </section>

      <RainbowSprinkles />

      <section id="menu" className="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-16">
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

      <section id="visit" className="relative z-10 mx-auto max-w-7xl px-6 pb-20 sm:px-10 lg:px-16">
        <div className="relative overflow-hidden rounded-[2.75rem] bg-gradient-to-br from-chocolate via-[#7b4b2e] to-waffle-gold p-6 text-cream-white shadow-waffle sm:p-10 lg:p-12">
          <VisitSprinkles />
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="relative z-10">
              <p className="font-display text-sm font-bold uppercase tracking-[0.35em] text-cream-white/70">Welcome to WaffleHut</p>
              <h2 className="font-display mt-4 text-balance text-4xl font-bold sm:text-5xl lg:text-6xl">
                The happiest waffles in town.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-cream-white/85">
                A bright, buttery landing page with scroll storytelling, cute motion, and enough polish to make the dessert feel aspirational.
              </p>
            </div>

            <div className="glass-panel relative z-10 rounded-[2rem] border-white/25 bg-white/12 p-5 backdrop-blur-xl">
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