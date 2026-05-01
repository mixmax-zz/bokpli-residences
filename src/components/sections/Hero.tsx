"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────
type Slide = {
  type: "image" | "video";
  src:  string;
  poster?: string; // miniature affichée avant le chargement de la vidéo
  alt?: string;
};

// ─── Slides — remplacez les chemins par vos vrais médias ─────────────────────
// Placez vos fichiers dans /public/hero/
// Exemples : slide-1.jpg, slide-2.jpg, video-1.mp4 …
const SLIDES: Slide[] = [
  {
    type: "image",
    src:  "/images/hero/slide-1.jpg",
    alt:  "Résidences Bokpli — Façade principale",
  },
  {
    type:   "video",
    src:    "/images/hero/video-1.mp4",
    poster: "/images/hero/slide-1.jpg",
  },
  {
    type: "image",
    src:  "/images/hero/slide-2.jpg",
    alt:  "Résidences Bokpli — Salon lumineux",
  },
  {
    type: "image",
    src:  "/images/hero/slide-3.jpg",
    alt:  "Résidences Bokpli — Vue panoramique",
  },
];

const IMAGE_DURATION = 6500; // ms avant de passer automatiquement à la slide suivante
const KEN_BURNS_SCALE = 1.09; // zoom final de l'effet Ken Burns

// ─── Variants Framer Motion ───────────────────────────────────────────────────
const slideVariants = {
  enter:  { opacity: 0 },
  center: { opacity: 1, transition: { duration: 1.4, ease: "easeInOut" } },
  exit:   { opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } },
};

const textVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  }),
};

const lineVariants = {
  hidden:  { scaleX: 0, opacity: 0 },
  visible: (delay: number) => ({
    scaleX: 1,
    opacity: 1,
    transition: { delay, duration: 0.8, ease: "easeOut" },
  }),
};

// ─── Composant Hero ───────────────────────────────────────────────────────────
export default function Hero() {
  const [current,   setCurrent]   = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef                  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const videoRef                  = useRef<HTMLVideoElement | null>(null);

  // ── Navigation ──────────────────────────────────────────────────────────────
  const goTo = useCallback((index: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setCurrent(((index % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);

  // ── Auto-avance (images uniquement) ─────────────────────────────────────────
  useEffect(() => {
    if (!isPlaying || SLIDES[current].type === "video") return;
    timerRef.current = setTimeout(goNext, IMAGE_DURATION);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, isPlaying, goNext]);

  // ── Navigation clavier ───────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft")  goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  const slide = SLIDES[current];

  return (
    <section
      aria-label="Présentation Résidences Bokpli"
      className="relative w-full h-screen overflow-hidden bg-[#0B1F3A]"
    >
      {/* ══ SLIDES ════════════════════════════════════════════════════════════ */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          className="absolute inset-0"
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          {slide.type === "image" ? (
            /* Image avec effet Ken Burns */
            <motion.div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.src})` }}
              initial={{ scale: 1 }}
              animate={{ scale: KEN_BURNS_SCALE }}
              transition={{ duration: IMAGE_DURATION / 1000 + 1.4, ease: "linear" }}
              aria-label={slide.alt}
              role="img"
            />
          ) : (
            /* Vidéo autoplay */
            <video
              ref={videoRef}
              key={slide.src}
              src={slide.src}
              poster={slide.poster}
              autoPlay
              muted
              playsInline
              onEnded={goNext}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* ══ OVERLAYS ══════════════════════════════════════════════════════════ */}
      {/* Dégradé haut → bas (assombrit bas pour lisibilité) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(11,31,58,0.55) 0%, rgba(11,31,58,0.15) 45%, rgba(11,31,58,0.65) 100%)",
        }}
        aria-hidden="true"
      />
      {/* Dégradé gauche (vignette latérale douce) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(11,31,58,0.35) 0%, transparent 55%)",
        }}
        aria-hidden="true"
      />

      {/* ══ CONTENU CENTRAL ═══════════════════════════════════════════════════ */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">

        {/* Ligne or supérieure */}
        <motion.span
          className="block w-14 h-px origin-center"
          style={{ background: "linear-gradient(to right, transparent, #B8892A, transparent)" }}
          custom={0.3}
          variants={lineVariants}
          initial="hidden"
          animate="visible"
        />

        {/* Surtitre */}
        <motion.p
          custom={0.55}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="mt-5 mb-3 text-[11px] font-bold tracking-[0.35em] uppercase text-[#B8892A]/80"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          SCI BOKPLI · RÉSIDENCE BOKPLI
        </motion.p>

        {/* Titre principal */}
        <motion.h1
          custom={0.75}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-white text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.08] tracking-[-0.02em]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Appartements de Luxe
        </motion.h1>

        {/* Tagline */}
        <motion.p
          custom={1.0}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="mt-5 text-lg md:text-xl lg:text-2xl font-light tracking-[0.18em] uppercase text-white/75"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          L&apos;art de vivre autrement
        </motion.p>

        {/* Ligne or inférieure */}
        <motion.span
          className="block w-14 h-px mt-7 origin-center"
          style={{ background: "linear-gradient(to right, transparent, #B8892A, transparent)" }}
          custom={1.2}
          variants={lineVariants}
          initial="hidden"
          animate="visible"
        />
      </div>

      {/* ══ INDICATEURS DE SLIDES ═════════════════════════════════════════════ */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5"
        role="tablist"
        aria-label="Navigation du carousel"
      >
        {SLIDES.map((s, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`Slide ${i + 1}${s.type === "video" ? " (vidéo)" : ""}`}
            onClick={() => goTo(i)}
            className={cn(
              "rounded-full transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8892A]",
              i === current
                ? "w-8 h-[5px] bg-[#B8892A]"
                : "w-[5px] h-[5px] bg-white/35 hover:bg-white/65"
            )}
          />
        ))}
      </div>

      {/* ══ FLÈCHES DE NAVIGATION ═════════════════════════════════════════════ */}
      {/* Gauche */}
      <button
        onClick={goPrev}
        aria-label="Slide précédente"
        className={cn(
          "absolute left-5 top-1/2 -translate-y-1/2 z-20",
          "w-11 h-11 flex items-center justify-center",
          "border border-white/20 bg-white/5 backdrop-blur-sm",
          "text-white/60 hover:text-white hover:bg-white/15 hover:border-white/40",
          "transition-all duration-200 rounded-sm",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8892A]"
        )}
      >
        <ChevronLeft size={18} />
      </button>

      {/* Droite */}
      <button
        onClick={goNext}
        aria-label="Slide suivante"
        className={cn(
          "absolute right-5 top-1/2 -translate-y-1/2 z-20",
          "w-11 h-11 flex items-center justify-center",
          "border border-white/20 bg-white/5 backdrop-blur-sm",
          "text-white/60 hover:text-white hover:bg-white/15 hover:border-white/40",
          "transition-all duration-200 rounded-sm",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8892A]"
        )}
      >
        <ChevronRight size={18} />
      </button>

      {/* ══ INDICATEUR SCROLL ═════════════════════════════════════════════════ */}
      <motion.div
        className="absolute bottom-9 right-8 z-20 flex flex-col items-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        aria-hidden="true"
      >
        <span
          className="text-white/35 text-[9px] font-semibold tracking-[0.22em] uppercase"
          style={{
            fontFamily:    "var(--font-heading)",
            writingMode:   "vertical-rl",
            letterSpacing: "0.22em",
          }}
        >
          Défiler
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ChevronDown size={14} className="text-white/35" />
        </motion.div>
      </motion.div>

      {/* ══ PAUSE/PLAY (hover sur les flèches) ══════════════════════════════ */}
      {/* Contrôle discret en bas à gauche */}
      <button
        onClick={() => setIsPlaying((v) => !v)}
        aria-label={isPlaying ? "Mettre en pause le carousel" : "Reprendre le carousel"}
        className={cn(
          "absolute bottom-[38px] left-5 z-20",
          "flex items-center gap-1.5 px-2.5 py-1",
          "border border-white/15 bg-white/5 backdrop-blur-sm rounded-sm",
          "text-white/40 hover:text-white/70 hover:border-white/30",
          "text-[9px] font-semibold tracking-[0.12em] uppercase",
          "transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8892A]"
        )}
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {isPlaying ? (
          <>
            <span className="flex gap-[3px]">
              <span className="block w-[2px] h-3 bg-current rounded-full" />
              <span className="block w-[2px] h-3 bg-current rounded-full" />
            </span>
            Pause
          </>
        ) : (
          <>
            <span className="block w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-current ml-0.5" />
            Play
          </>
        )}
      </button>
    </section>
  );
}
