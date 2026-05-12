"use client";

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { motion, type MotionValue, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import WaffleHutLogoImage from '../WaffleHutLogo.png';
import WaffleHutImage from '../WaffleHut.png';

const FRAME_COUNT = 143;
const FRAME_PATHS = Array.from({ length: FRAME_COUNT }, (_, index) => `/frames/ezgif-frame-${String(index + 1).padStart(3, '0')}.png`);

type StoryBeatProps = {
  progress: MotionValue<number>;
  title: string;
  subtitle: string;
  align: 'center' | 'left' | 'right';
  position: 'top' | 'middle' | 'bottom';
  start: number;
  end: number;
  tone: 'light' | 'dark' | 'berry' | 'sunny';
};

const toneStyles = {
  light: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.34), rgba(255, 243, 232, 0.22))',
    borderColor: 'rgba(255, 255, 255, 0.48)',
    title: 'text-chocolate',
    body: 'text-chocolate/82',
  },
  dark: {
    background: 'linear-gradient(135deg, rgba(107, 62, 38, 0.94), rgba(217, 139, 43, 0.42))',
    borderColor: 'rgba(244, 185, 66, 0.42)',
    title: 'text-cream-white',
    body: 'text-cream-white/88',
  },
  berry: {
    background: 'linear-gradient(135deg, rgba(217, 74, 106, 0.86), rgba(255, 123, 172, 0.35))',
    borderColor: 'rgba(255, 243, 232, 0.38)',
    title: 'text-cream-white',
    body: 'text-cream-white/88',
  },
  sunny: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.30), rgba(244, 185, 66, 0.24))',
    borderColor: 'rgba(255, 255, 255, 0.42)',
    title: 'text-chocolate',
    body: 'text-chocolate/80',
  },
} as const;

function StoryBeat({ progress, title, subtitle, align, position, start, end, tone }: StoryBeatProps) {
  const opacity = useTransform(progress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0]);
  const y = useTransform(progress, [start, start + 0.05, end - 0.05, end], [24, 0, 0, -24]);
  const scale = useTransform(progress, [start, start + 0.08, end - 0.08, end], [0.98, 1, 1, 0.98]);

  const toneStyle = toneStyles[tone];
  const alignClass = align === 'left' ? 'justify-start text-left' : align === 'right' ? 'justify-end text-right' : 'justify-center text-center';
  const positionClass = position === 'top' ? 'items-start pt-[12vh]' : position === 'bottom' ? 'items-end pb-[12vh]' : 'items-center';

  return (
    <motion.div
      className={`absolute inset-0 z-20 flex px-6 sm:px-10 lg:px-16 ${positionClass} ${alignClass}`}
      style={{ opacity, y, scale }}
      aria-hidden="true"
    >
      <div
        className={`pointer-events-auto w-full max-w-[min(42rem,calc(100vw-1.5rem))] rounded-[2rem] border px-4 py-5 shadow-waffle backdrop-blur-xl sm:px-7 sm:py-7 ${toneStyle.title}`}
        style={{ background: toneStyle.background, borderColor: toneStyle.borderColor }}
      >
        <p className={`font-display text-[0.65rem] uppercase tracking-[0.45em] ${tone === 'dark' || tone === 'berry' ? 'text-cream-white/72' : 'text-chocolate/60'}`}>
          WaffleHut story beat
        </p>
        <h2 className={`font-display mt-3 text-balance text-3xl font-bold leading-[0.95] sm:text-5xl lg:text-7xl ${toneStyle.title}`}>
          {title}
        </h2>
        <p className={`mt-4 max-w-2xl text-[0.92rem] leading-7 sm:text-base sm:leading-8 ${toneStyle.body}`}>
          {subtitle}
        </p>

      </div>
    </motion.div>
  );
}

function drawContain(context: CanvasRenderingContext2D, image: HTMLImageElement, width: number, height: number) {
  const naturalWidth = image.naturalWidth || image.width;
  const naturalHeight = image.naturalHeight || image.height;
  const scale = Math.max((width * 1.02) / naturalWidth, (height * 1.02) / naturalHeight);
  const drawWidth = naturalWidth * scale;
  const drawHeight = naturalHeight * scale;
  const x = (width - drawWidth) / 2;
  const y = (height - drawHeight) / 2;

  context.drawImage(image, x, y, drawWidth, drawHeight);
}

function StoryCardBackdrop() {
  return (
    <>
      <div className="syrup-blob absolute left-[6%] top-[10%] h-28 w-28 rounded-full bg-waffle-pink/35 blur-3xl sm:h-44 sm:w-44" />
      <div className="syrup-blob absolute right-[4%] top-[18%] h-32 w-32 rounded-full bg-honey-gold/25 blur-3xl sm:h-52 sm:w-52" />
      <div className="syrup-blob absolute bottom-[15%] left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-berry/12 blur-3xl sm:h-72 sm:w-72" />

      <div className="waffle-sparkle absolute left-[12%] top-[12%] h-2 w-2 rounded-full bg-white/90 shadow-[0_0_14px_rgba(255,255,255,0.72)] sm:h-2.5 sm:w-2.5" />
      <div className="waffle-sparkle absolute left-[18%] top-[28%] h-2.5 w-2.5 rounded-full bg-cream-white shadow-[0_0_14px_rgba(255,255,255,0.72)] sm:h-3 sm:w-3" />
      <div className="waffle-sparkle absolute right-[14%] top-[16%] h-2 w-2 rounded-full bg-cream-white shadow-[0_0_14px_rgba(255,255,255,0.72)] sm:h-2.5 sm:w-2.5" />
      <div className="waffle-sparkle absolute right-[18%] bottom-[26%] h-2.5 w-2.5 rounded-full bg-white/90 shadow-[0_0_14px_rgba(255,255,255,0.72)] sm:h-3 sm:w-3" />
      <div className="waffle-sparkle absolute bottom-[18%] left-[18%] h-2 w-2 rounded-full bg-honey-gold shadow-[0_0_14px_rgba(244,185,66,0.72)] sm:h-2.5 sm:w-2.5" />
    </>
  );
}

export default function WaffleSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastProgressRef = useRef(0);

  const [frames, setFrames] = useState<HTMLImageElement[]>([]);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 22,
    mass: 0.2,
  });

  const haloOpacity = useTransform(smoothProgress, [0, 0.15, 0.65, 1], [0.72, 0.95, 1, 0.82]);
  const haloScale = useTransform(smoothProgress, [0, 0.5, 1], [0.95, 1.06, 0.98]);
  const haloY = useTransform(smoothProgress, [0, 1], [0, 20]);
  const stageOpacity = useTransform(smoothProgress, [0, 0.02, 0.97, 1], [1, 1, 1, 0]);
  const stageScale = useTransform(smoothProgress, [0, 0.4, 1], [0.99, 1, 1.01]);
  const drawCurrentFrame = useCallback(
    (progress: number) => {
      const canvas = canvasRef.current;
      const stage = stageRef.current;

      if (!canvas || !stage || frames.length === 0) {
        return;
      }

      const context = canvas.getContext('2d');
      if (!context) {
        return;
      }

      const rect = stage.getBoundingClientRect();
      const cssWidth = Math.max(1, Math.floor(rect.width));
      const cssHeight = Math.max(1, Math.floor(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = Math.max(1, Math.floor(cssWidth * dpr));
      const displayHeight = Math.max(1, Math.floor(cssHeight * dpr));

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
      }

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, cssWidth, cssHeight);
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';

      const frameIndex = Math.min(frames.length - 1, Math.max(0, Math.round(progress * (frames.length - 1))));
      const image = frames[frameIndex];

      drawContain(context, image, cssWidth, cssHeight);
    },
    [frames],
  );

  useEffect(() => {
    let cancelled = false;

    async function preloadFrames() {
      let loadedCount = 0;

      const nextFrames = await Promise.all(
        FRAME_PATHS.map(
          (path) =>
            new Promise<HTMLImageElement>((resolve) => {
              const image = new Image();
              image.decoding = 'async';
              image.onload = () => {
                loadedCount += 1;
                if (!cancelled) {
                  setLoadProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
                }
                resolve(image);
              };
              image.onerror = () => {
                loadedCount += 1;
                if (!cancelled) {
                  setLoadProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
                }
                resolve(image);
              };
              image.src = path;
            }),
        ),
      );

      if (!cancelled) {
        setFrames(nextFrames);
        setLoadProgress(100);
        setIsLoaded(true);
      }
    }

    preloadFrames();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (frames.length === 0) {
      return;
    }

    drawCurrentFrame(lastProgressRef.current);
  }, [drawCurrentFrame, frames.length]);

  useEffect(() => {
    const handleResize = () => {
      drawCurrentFrame(lastProgressRef.current);
    };

    handleResize();

    const stage = stageRef.current;
    const observer = stage && 'ResizeObserver' in window ? new ResizeObserver(handleResize) : null;

    if (stage && observer) {
      observer.observe(stage);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      observer?.disconnect();
    };
  }, [drawCurrentFrame]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.to('.waffle-sparkle', {
        y: -12,
        x: 8,
        scale: 1.08,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          each: 0.18,
          from: 'center',
        },
      });

      gsap.to('.syrup-blob', {
        yPercent: 12,
        scale: 1.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
        ease: 'none',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    lastProgressRef.current = latest;
    drawCurrentFrame(latest);
  });

  return (
    <section ref={sectionRef} className="relative h-[400vh] w-full overflow-x-hidden bg-[linear-gradient(180deg,#f5a9c2_0%,#fff3e8_52%,#f6d7b0_100%)]">
      <motion.div className="fixed inset-0 z-0 h-screen w-full overflow-hidden" style={{ opacity: stageOpacity, scale: stageScale }}>
        <motion.div aria-hidden="true" className="absolute inset-0 bg-waffle-radial" style={{ opacity: haloOpacity, scale: haloScale, y: haloY }} />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.48),rgba(255,255,255,0)_48%)]" />

        <StoryCardBackdrop />

        <div className="absolute inset-x-0 top-0 z-30 flex items-start justify-between px-4 py-4 sm:px-6 lg:px-10">
          <motion.div aria-hidden="true" className="pointer-events-none">
            <motion.img
              src={WaffleHutLogoImage.src}
              alt="WaffleHut"
              className="block h-14 w-auto select-none drop-shadow-[0_10px_24px_rgba(107,62,38,0.18)] sm:h-16"
              draggable={false}
            />
          </motion.div>

          <motion.div
            aria-hidden="true"
            className="pointer-events-none"
            style={{ opacity: 1, scale: 1 }}
          >
            <motion.img
              src={WaffleHutImage.src}
              alt="WaffleHut"
              className="block w-[min(38vw,220px)] select-none drop-shadow-[0_10px_28px_rgba(107,62,38,0.22)] sm:w-[min(24vw,250px)]"
              draggable={false}
            />
          </motion.div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div ref={stageRef} className="relative h-screen w-screen">
            <div className="canvas-halo absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.78),rgba(255,255,255,0.16)_42%,rgba(255,255,255,0)_72%)] blur-2xl sm:blur-3xl" />
            <canvas
              ref={canvasRef}
              className="absolute inset-0 z-10 block h-full w-full bg-transparent drop-shadow-[0_30px_90px_rgba(107,62,38,0.22)]"
              aria-hidden="true"
            />
          </div>
        </div>

        <StoryBeat
          progress={smoothProgress}
          title="Chocolate Dreams"
          subtitle="Covered in rich creamy Nutella with a glossy finish that feels indulgent but still clean, premium, and playful."
          align="left"
          position="middle"
          start={0.25}
          end={0.45}
          tone="dark"
        />

        <StoryBeat
          progress={smoothProgress}
          title="Berry Sweet"
          subtitle="Fresh strawberries and colorful toppings bring the candy-shop palette forward without losing the polished brand mood."
          align="right"
          position="middle"
          start={0.5}
          end={0.7}
          tone="berry"
        />

        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-5 z-30 flex justify-center px-6"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: isLoaded ? 0 : 1, y: isLoaded ? 8 : 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <div className="glass-panel w-full max-w-md rounded-[2rem] px-5 py-5 text-center shadow-waffle backdrop-blur-2xl">
            <div className="mx-auto w-16 rounded-[1.35rem] bg-[linear-gradient(135deg,#ff7bac_0%,#f4b942_100%)] p-2.5 shadow-candy">
              <div className="loading-waffle-grid">
                {Array.from({ length: 9 }).map((_, index) => (
                  <span key={index} className="animate-pulse-syrup" style={{ animationDelay: `${index * 70}ms` }} />
                ))}
              </div>
            </div>
            <p className="font-display mt-5 text-2xl font-bold text-chocolate">Whisking the waffle frames</p>
            <p className="mt-2 text-sm leading-6 text-chocolate/72">Loading {loadProgress}%</p>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/48">
              <div className="h-full rounded-full bg-[linear-gradient(90deg,#ff7bac_0%,#f4b942_52%,#d94a6a_100%)] transition-[width] duration-300" style={{ width: `${loadProgress}%` }} />
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div aria-hidden="true" className="h-full w-full" />
    </section>
  );
}