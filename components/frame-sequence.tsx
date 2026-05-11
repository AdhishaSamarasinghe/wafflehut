"use client";

import type { CSSProperties } from "react";
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

function FloatingAccent({
  className,
  animate,
  transition,
  style
}: {
  className: string;
  animate: any;
  transition: any;
  style?: CSSProperties;
}) {
  return <motion.div aria-hidden className={`absolute pointer-events-none ${className}`} animate={animate} transition={transition} style={style} />;
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
  const chapterIndex = useMemo(() => Math.max(0, sequenceChapters.findIndex((item) => item.title === chapter.title)), [chapter]);

  const glowX = useMotionValue(0.45);
  const glowY = useMotionValue(0.3);
  const glowXSpring = useSpring(glowX, { stiffness: 60, damping: 18, mass: 0.6 });
  const glowYSpring = useSpring(glowY, { stiffness: 60, damping: 18, mass: 0.6 });
  const glowTranslateX = useTransform(glowXSpring, (value) => `${value * 100}%`);
  const glowTranslateY = useTransform(glowYSpring, (value) => `${value * 100}%`);
  const progressPercent = ((frame + 1) / FRAME_COUNT) * 100;

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

    Promise.all(loadedImages.map((image) => image.decode().catch(() => undefined))).finally(() => {
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
      end: () => `+=${Math.max(window.innerHeight * 9.5, FRAME_COUNT * 68)}`,
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
      style={{ height: `${Math.max(1000, FRAME_COUNT * 68)}px` }}
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
      <div className="sticky top-0 h-screen overflow-hidden bg-waffle-night">
        <motion.div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at center, rgba(255, 179, 71, 0.22), transparent 50%), radial-gradient(circle at 25% 20%, rgba(255, 107, 138, 0.18), transparent 18%), linear-gradient(180deg, rgba(255,255,255,0.04), transparent 24%)",
            x: glowTranslateX,
            y: glowTranslateY
          }}
        />
        <div className="cartoon-grid pointer-events-none absolute inset-0 opacity-[0.2]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.2),transparent_18%),radial-gradient(circle_at_50%_60%,rgba(255,179,71,0.22),transparent_26%),radial-gradient(circle_at_84%_28%,rgba(125,108,255,0.2),transparent_16%)] opacity-80 blur-3xl" />

        <FloatingAccent
          className="left-[5%] top-[10%] h-16 w-16 rounded-full bg-waffle-strawberry/80 blur-[1px]"
          animate={{ y: [0, -12, 0], x: [0, 8, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <FloatingAccent
          className="right-[8%] top-[14%] h-5 w-5 rounded-full bg-waffle-cream shadow-[0_0_24px_rgba(255,244,207,0.75)]"
          animate={{ y: [0, -24, 0], opacity: [0.5, 1, 0.5], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <FloatingAccent
          className="left-[16%] top-[24%] h-6 w-6 rounded-full bg-waffle-blueberry shadow-[0_0_22px_rgba(125,108,255,0.7)]"
          animate={{ y: [0, 16, 0], rotate: [0, 18, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <FloatingAccent
          className="right-[18%] top-[32%] h-7 w-7 rounded-[35%] bg-waffle-honey shadow-[0_0_20px_rgba(255,179,71,0.75)]"
          animate={{ y: [0, -10, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <FloatingAccent
          className="left-[10%] bottom-[18%] h-4 w-4 rounded-full bg-waffle-mint"
          animate={{ x: [0, 10, 0], y: [0, -8, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <FloatingAccent
          className="right-[12%] bottom-[20%] h-3.5 w-3.5 rounded-full bg-waffle-frosting shadow-[0_0_18px_rgba(255,248,251,0.85)]"
          animate={{ y: [0, 12, 0], opacity: [0.65, 1, 0.65] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <FloatingAccent
          className="left-[48%] top-[18%] h-14 w-14 rounded-full bg-waffle-cream/30 blur-[2px]"
          animate={{ y: [0, -18, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="absolute left-[50%] top-[9%] h-28 w-28 -translate-x-1/2 rounded-full border border-white/10 bg-white/5 blur-2xl" />

        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/20 to-black/85" />

        <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-end px-5 pb-8 pt-24 sm:px-6 md:px-10 lg:items-center lg:pb-14">
          <div className="grid w-full gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="mb-5 inline-flex items-center gap-3 rounded-full border-2 border-white/12 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-waffle-cream/90 backdrop-blur-xl"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-waffle-strawberry shadow-[0_0_18px_rgba(255,107,138,0.75)]" />
                Scroll to bake the reel
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 32, rotate: -1.5, filter: "blur(16px)" }}
                animate={{ opacity: 1, y: 0, rotate: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-5xl leading-[0.9] tracking-tight text-waffle-cream cartoon-outline sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8rem]"
              >
                Hot • Sweet • Crispy
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.7 }}
                className="mt-6 max-w-2xl"
              >
                <p className="text-balance text-2xl font-semibold text-waffle-frosting sm:text-3xl md:text-4xl">
                  The happiest waffles in town.
                </p>
                <p className="mt-4 max-w-xl text-base leading-7 text-waffle-cream/78 sm:text-lg md:text-xl">
                  Scroll down to watch the full cartoon dessert reel: batter, Nutella, berries, banana slices, cream, and honey all land in a glossy animated finale.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.7 }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <a
                  href="#featured"
                  className="group inline-flex items-center gap-3 rounded-full bg-[linear-gradient(135deg,#ffb347_0%,#ff6b8a_42%,#7d6cff_100%)] bg-[length:200%_200%] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_50px_rgba(255,107,138,0.28)] transition-transform duration-300 hover:scale-[1.04]"
                >
                  Order the Magic
                  <span className="transition-transform duration-300 group-hover:translate-x-1">{"->"}</span>
                </a>
                <a
                  href="#about"
                  className="inline-flex items-center gap-3 rounded-full border-2 border-white/16 bg-white/8 px-6 py-3 text-sm font-semibold text-waffle-cream shadow-[0_10px_0_rgba(64,31,16,0.5)] backdrop-blur-xl transition-transform duration-300 hover:scale-[1.04]"
                >
                  Peek Inside
                </a>
              </motion.div>

              <div className="mt-10 grid max-w-xl grid-cols-3 gap-3 sm:gap-4">
                {[
                  ["129", "frames"],
                  ["7", "sweet chapters"],
                  ["60fps", "smooth-ish magic"]
                ].map(([value, label]) => (
                  <div key={label} className="cartoon-panel rounded-3xl px-4 py-4">
                    <div className="text-lg font-semibold text-waffle-cream sm:text-2xl">{value}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.28em] text-waffle-cream/60">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="ml-auto w-full max-w-md self-end rounded-[2rem] border border-white/12 bg-black/30 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.36)] backdrop-blur-2xl"
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.28em] text-waffle-cream/64">
                <span>{chapter.eyebrow}</span>
                <span>{String(frame + 1).padStart(3, "0")}/{FRAME_COUNT}</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.h2
                  key={chapter.title}
                  initial={{ opacity: 0, y: 14, rotate: -2, filter: "blur(12px)" }}
                  animate={{ opacity: 1, y: 0, rotate: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, rotate: 1, filter: "blur(14px)" }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-3 font-display text-3xl leading-[0.95] text-waffle-cream"
                >
                  {chapter.title}
                </motion.h2>
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.p
                  key={`${chapter.title}-desc`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4 }}
                  className="mt-4 text-sm leading-7 text-waffle-cream/74"
                >
                  {chapter.description}
                </motion.p>
              </AnimatePresence>
              <div className="mt-6 grid gap-3">
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-[linear-gradient(90deg,#ffb347,#ff6b8a,#7d6cff)] bg-[length:200%_200%]"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="flex flex-wrap gap-2 text-[0.65rem] uppercase tracking-[0.22em] text-waffle-cream/58">
                  {sequenceChapters.map((item, index) => (
                    <span
                      key={item.title}
                      className={`rounded-full px-3 py-1 ${index === chapterIndex ? "bg-white/14 text-waffle-cream" : "bg-white/5"}`}
                    >
                      {item.title}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-3xl border border-white/10 bg-white/6 p-4">
                  <div className="text-xs uppercase tracking-[0.26em] text-waffle-cream/54">Current frame</div>
                  <div className="mt-2 text-2xl font-semibold text-waffle-cream">{String(frame + 1).padStart(3, "0")}</div>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/6 p-4">
                  <div className="text-xs uppercase tracking-[0.26em] text-waffle-cream/54">Scroll progress</div>
                  <div className="mt-2 text-2xl font-semibold text-waffle-cream">{Math.round(progressPercent)}%</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}