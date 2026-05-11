"use client";

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { FRAME_COUNT, getFramePath, sequenceChapters } from "@/lib/waffle-data";

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

function getChapterForFrame(frame: number) {
  return sequenceChapters.find((chapter) => frame + 1 >= chapter.startFrame && frame + 1 <= chapter.endFrame) ?? sequenceChapters[sequenceChapters.length - 1];
}

export default function FrameSequence() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastFrameRef = useRef(-1);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const [frame, setFrame] = useState(0);
  const [ready, setReady] = useState(false);

  const chapter = useMemo(() => getChapterForFrame(frame), [frame]);

  const glowX = useMotionValue(0.45);
  const glowY = useMotionValue(0.3);
  const glowXSpring = useSpring(glowX, { stiffness: 60, damping: 18, mass: 0.6 });
  const glowYSpring = useSpring(glowY, { stiffness: 60, damping: 18, mass: 0.6 });
  const glowTranslateX = useTransform(glowXSpring, (value) => `${value * 100}%`);
  const glowTranslateY = useTransform(glowYSpring, (value) => `${value * 100}%`);

  function drawFrame(nextFrame: number) {
    const canvas = canvasRef.current;
    const image = imagesRef.current[nextFrame];

    if (!canvas || !image?.complete || !image.naturalWidth) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const parent = canvas.parentElement;
    if (!parent) {
      return;
    }

    const { width, height } = parent.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;

    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, width, height);

    const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
    const drawWidth = image.naturalWidth * scale;
    const drawHeight = image.naturalHeight * scale;
    const offsetX = (width - drawWidth) / 2;
    const offsetY = (height - drawHeight) / 2;

    context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
  }

  useEffect(() => {
    const sources = Array.from({ length: FRAME_COUNT }, (_, index) => getFramePath(index + 1));
    const loadedImages = sources.map((source) => {
      const image = new Image();
      image.src = source;
      return image;
    });

    imagesRef.current = loadedImages;

    let cancelled = false;

    Promise.all(
      loadedImages.map((image) => image.decode().catch(() => undefined))
    ).finally(() => {
      if (!cancelled) {
        setReady(true);
        drawFrame(0);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || !ready) {
      return;
    }

    const updateFrame = (progress: number) => {
      const nextFrame = Math.min(FRAME_COUNT - 1, Math.floor(progress * (FRAME_COUNT - 1)));
      if (lastFrameRef.current !== nextFrame) {
        lastFrameRef.current = nextFrame;
        setFrame(nextFrame);
        drawFrame(nextFrame);
      }
    };

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${Math.max(window.innerHeight * 9, FRAME_COUNT * 72)}`,
      scrub: 1,
      onUpdate: (self) => updateFrame(self.progress),
      onRefresh: (self) => updateFrame(self.progress)
    });

    const canvas = canvasRef.current;
    if (canvas) {
      const parent = canvas.parentElement;
      if (parent) {
        resizeObserverRef.current = new ResizeObserver(() => {
          drawFrame(lastFrameRef.current >= 0 ? lastFrameRef.current : 0);
        });
        resizeObserverRef.current.observe(parent);
      }
    }

    const handleResize = () => drawFrame(lastFrameRef.current >= 0 ? lastFrameRef.current : 0);
    window.addEventListener("resize", handleResize);

    return () => {
      trigger.kill();
      window.removeEventListener("resize", handleResize);
      resizeObserverRef.current?.disconnect();
      resizeObserverRef.current = null;
    };
  }, [ready]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ height: `${Math.max(900, FRAME_COUNT * 72)}px` }}
      onPointerMove={(event) => {
        const target = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - target.left) / target.width;
        const y = (event.clientY - target.top) / target.height;
        glowX.set(x);
        glowY.set(y);
        document.documentElement.style.setProperty("--glow-x", `${x * 100}%`);
        document.documentElement.style.setProperty("--glow-y", `${y * 100}%`);
      }}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-brand-black">
        <motion.div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at center, rgba(215, 180, 106, 0.1), transparent 55%), linear-gradient(180deg, rgba(255,255,255,0.04), transparent 24%)",
            x: glowTranslateX,
            y: glowTranslateY
          }}
        />
        <div className="luxury-grid pointer-events-none absolute inset-0 opacity-[0.18]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.2),transparent_18%),radial-gradient(circle_at_50%_60%,rgba(215,180,106,0.22),transparent_26%)] opacity-70 blur-3xl" />

        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/80" />

        <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-end px-5 pb-8 pt-24 sm:px-6 md:px-10 lg:items-center lg:pb-14">
          <div className="grid w-full gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="max-w-3xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={chapter.title}
                  initial={{ opacity: 0, y: 24, filter: "blur(14px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -18, filter: "blur(18px)" }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-brand-cream/80 backdrop-blur-xl"
                >
                  <span className="h-2 w-2 rounded-full bg-brand-gold shadow-[0_0_24px_rgba(215,180,106,0.85)]" />
                  Scroll for the reveal
                </motion.div>
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.h1
                  key={`${chapter.title}-hero`}
                  initial={{ opacity: 0, y: 32, filter: "blur(18px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -24, filter: "blur(20px)" }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif text-5xl leading-[0.92] tracking-tight text-brand-cream text-glow sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7.5rem]"
                >
                  Crafted For Sweet Cravings
                </motion.h1>
              </AnimatePresence>
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.7 }}
                className="mt-6 max-w-2xl text-base leading-7 text-brand-cream/72 sm:text-lg md:text-xl"
              >
                Luxury Belgian waffles with premium toppings, staged with the pacing and gloss of a high-end dessert commercial.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.7 }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <a
                  href="#menu"
                  className="group inline-flex items-center gap-3 rounded-full bg-[linear-gradient(135deg,#d7b46a_0%,#f8e4b0_42%,#7f5525_100%)] bg-[length:200%_200%] px-6 py-3 text-sm font-semibold text-black shadow-[0_16px_50px_rgba(215,180,106,0.3)] transition-transform duration-300 hover:scale-[1.03]"
                >
                  View Menu
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
                <a
                  href="#about"
                  className="inline-flex items-center gap-3 rounded-full border border-white/14 bg-white/6 px-6 py-3 text-sm font-semibold text-brand-cream/90 shadow-glow backdrop-blur-xl transition-transform duration-300 hover:scale-[1.03]"
                >
                  Our Story
                </a>
              </motion.div>

              <div className="mt-10 grid max-w-xl grid-cols-3 gap-3 sm:gap-4">
                {[
                  ["12 min", "Fresh to plate"],
                  ["129", "Cinematic frames"],
                  ["5-star", "Dessert ambiance"]
                ].map(([value, label]) => (
                  <div key={label} className="glass-panel rounded-2xl px-4 py-4 shadow-soft">
                    <div className="text-lg font-semibold text-brand-cream sm:text-2xl">{value}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.28em] text-brand-cream/55">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="ml-auto w-full max-w-sm self-end rounded-[1.75rem] border border-white/10 bg-black/35 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.4)] backdrop-blur-2xl"
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.28em] text-brand-cream/55">
                <span>{chapter.eyebrow}</span>
                <span>{String(frame + 1).padStart(3, "0")}/{FRAME_COUNT}</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.h2
                  key={chapter.title}
                  initial={{ opacity: 0, y: 18, filter: "blur(16px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(18px)" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-4 font-serif text-4xl leading-none text-brand-cream"
                >
                  {chapter.title}
                </motion.h2>
              </AnimatePresence>
              <p className="mt-4 text-sm leading-7 text-brand-cream/72">{chapter.description}</p>
              <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-brand-gold/80 to-transparent" />
              <p className="mt-5 text-xs uppercase tracking-[0.3em] text-brand-cream/45">
                Swipe, scroll, or glide through the reveal
              </p>
            </motion.div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/70 to-transparent" />
      </div>
    </section>
  );
}