"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Calendar, TrendingUp, X, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

const AUTO_DELAY = 4000; // ms entre chaque slide

// ─── Types ────────────────────────────────────────────────────────────────────
type Media = {
  type:    "image" | "video";
  src:     string;
  poster?: string;
  legende?: string;
};

type Phase = {
  date:        string;       // ex : "Janvier 2025"
  label:       string;       // courte description
  statut:      "termine" | "en_cours" | "a_venir";
  progression: number;       // 0–100 %
  media:       Media[];
};

// ─── Données — mettez à jour avec vos vraies dates et médias ─────────────────
// Placez vos fichiers dans /public/images/avancement/
const PHASES: Phase[] = [
  {
    date:        "Mars 2025",
    label:       "Démarrage du chantier",
    statut:      "termine",
    progression: 100,
    media: [
      { type: "image", src: "/images/avancement/mars2025/photo-1.jpg",  legende: "Démarrage du chantier" },
      { type: "image", src: "/images/avancement/mars2025/photo-2.jpg",  legende: "" },
      { type: "image", src: "/images/avancement/mars2025/photo-3.jpg",  legende: "" },
      { type: "image", src: "/images/avancement/mars2025/photo-4.jpg",  legende: "" },
      { type: "image", src: "/images/avancement/mars2025/photo-5.jpg",  legende: "" },
      { type: "image", src: "/images/avancement/mars2025/photo-6.jpg",  legende: "" },
      { type: "image", src: "/images/avancement/mars2025/photo-7.jpg",  legende: "" },
      { type: "image", src: "/images/avancement/mars2025/photo-8.jpg",  legende: "" },
      { type: "image", src: "/images/avancement/mars2025/photo-9.jpg",  legende: "" },
      { type: "image", src: "/images/avancement/mars2025/photo-10.jpg", legende: "" },
      { type: "image", src: "/images/avancement/mars2025/photo-11.jpg", legende: "" },
      { type: "image", src: "/images/avancement/mars2025/photo-12.jpg", legende: "" },
    ],
  },
  {
    date:        "Juillet 2025",
    label:       "Fondations",
    statut:      "termine",
    progression: 100,
    media: [
      { type: "image", src: "/images/avancement/juillet2025/photo-1.jpg",  legende: "" },
      { type: "image", src: "/images/avancement/juillet2025/photo-2.jpg",  legende: "" },
      { type: "image", src: "/images/avancement/juillet2025/photo-3.jpg",  legende: "" },
      { type: "image", src: "/images/avancement/juillet2025/photo-4.jpg",  legende: "" },
      { type: "image", src: "/images/avancement/juillet2025/photo-5.jpg",  legende: "" },
      { type: "image", src: "/images/avancement/juillet2025/photo-6.jpg",  legende: "" },
      { type: "image", src: "/images/avancement/juillet2025/photo-7.jpg",  legende: "" },
      { type: "image", src: "/images/avancement/juillet2025/photo-8.jpg",  legende: "" },
      { type: "image", src: "/images/avancement/juillet2025/photo-9.jpg",  legende: "" },
      { type: "image", src: "/images/avancement/juillet2025/photo-10.jpg", legende: "" },
      { type: "image", src: "/images/avancement/juillet2025/photo-11.jpg", legende: "" },
      { type: "video", src: "/images/avancement/juillet2025/video-1.mp4",  poster: "/images/avancement/juillet2025/photo-1.jpg", legende: "" },
    ],
  },
  {
    date:        "Avril 2026",
    label:       "Élévation du gros œuvre",
    statut:      "en_cours",
    progression: 45,
    media: [
      { type: "image", src: "/images/avancement/avril2026/photo-1.jpg",  legende: "" },
      { type: "image", src: "/images/avancement/avril2026/photo-2.jpg",  legende: "" },
      { type: "image", src: "/images/avancement/avril2026/photo-3.jpg",  legende: "" },
      { type: "image", src: "/images/avancement/avril2026/photo-4.jpg",  legende: "" },
      { type: "image", src: "/images/avancement/avril2026/photo-5.jpg",  legende: "" },
      { type: "image", src: "/images/avancement/avril2026/photo-6.jpg",  legende: "" },
      { type: "image", src: "/images/avancement/avril2026/photo-7.jpg",  legende: "" },
      { type: "image", src: "/images/avancement/avril2026/photo-8.jpg",  legende: "" },
      { type: "image", src: "/images/avancement/avril2026/photo-9.jpg",  legende: "" },
      { type: "image", src: "/images/avancement/avril2026/photo-10.jpg", legende: "" },
      { type: "image", src: "/images/avancement/avril2026/photo-11.jpg", legende: "" },
      { type: "video", src: "/images/avancement/avril2026/video-1.mp4",  poster: "/images/avancement/avril2026/photo-1.jpg", legende: "" },
    ],
  },
  {
    date:        "Septembre 2026",
    label:       "Hors d'eau / hors d'air",
    statut:      "a_venir",
    progression: 0,
    media: [],
  },
  {
    date:        "Décembre 2026",
    label:       "Second œuvre",
    statut:      "a_venir",
    progression: 0,
    media: [],
  },
  {
    date:        "Janvier 2027",
    label:       "Finitions",
    statut:      "a_venir",
    progression: 0,
    media: [],
  },
  {
    date:        "Avril 2027",
    label:       "Livraison",
    statut:      "a_venir",
    progression: 0,
    media: [],
  },
];

// Avancement global calculé
const PROGRESSION_GLOBALE = Math.round(
  PHASES.reduce((sum, p) => sum + p.progression, 0) / PHASES.length
);

// ─── Couleurs statuts ─────────────────────────────────────────────────────────
const STATUT_CONFIG = {
  termine:  { label: "Terminé",    dot: "#1B6B3A", bg: "rgba(27,107,58,0.15)",  border: "rgba(27,107,58,0.4)"  },
  en_cours: { label: "En cours",   dot: "#B8892A", bg: "rgba(184,137,42,0.15)", border: "rgba(184,137,42,0.5)" },
  a_venir:  { label: "À venir",    dot: "#4A4A4A", bg: "rgba(255,255,255,0.05)",border: "rgba(255,255,255,0.1)"},
};

// ─── Variants ─────────────────────────────────────────────────────────────────
const slideVariants = {
  enter:  { opacity: 0, scale: 1.04 },
  center: { opacity: 1, scale: 1,    transition: { duration: 1.6, ease: [0.22, 1, 0.36, 1] } },
  exit:   { opacity: 0, scale: 0.97, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ media, startIdx, onClose }: {
  media:    Media[];
  startIdx: number;
  onClose:  () => void;
}) {
  const [current, setCurrent] = useState(startIdx);
  const [dir,     setDir]     = useState(1);

  const go = useCallback((idx: number) => {
    setDir(idx > current ? 1 : -1);
    setCurrent(idx);
  }, [current]);

  const prev = () => go((current - 1 + media.length) % media.length);
  const next = () => go((current + 1) % media.length);

  // Clavier
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "Escape")     onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const item = media[current];

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center"
      style={{ background: "rgba(3,10,22,0.97)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Fermer */}
      <button
        onClick={onClose}
        aria-label="Fermer"
        className="absolute top-5 right-5 z-10 w-10 h-10 flex items-center justify-center transition-all duration-200 hover:bg-white/10"
        style={{
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: "2px",
          color: "#fff",
        }}
      >
        <X size={18} />
      </button>

      {/* Compteur */}
      <div
        className="absolute top-5 left-1/2 -translate-x-1/2 px-3 py-1.5"
        style={{
          background: "rgba(0,0,0,0.5)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "2px",
          backdropFilter: "blur(6px)",
        }}
      >
        <span
          className="text-[12px] font-semibold text-white/70"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {current + 1} / {media.length}
        </span>
      </div>

      {/* Image / Vidéo */}
      <div className="relative w-full h-full flex items-center justify-center px-16 py-16">
        <AnimatePresence mode="sync">
          <motion.div
            key={current}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-16 flex items-center justify-center"
          >
            {item.type === "image" ? (
              <img
                src={item.src}
                alt={item.legende ?? ""}
                style={{
                  maxWidth: "100%", maxHeight: "100%",
                  objectFit: "contain",
                  borderRadius: "2px",
                  display: "block",
                  margin: "auto",
                }}
              />
            ) : (
              <video
                key={item.src}
                src={item.src}
                poster={item.poster}
                controls
                autoPlay
                playsInline
                style={{
                  maxWidth: "100%", maxHeight: "100%",
                  objectFit: "contain",
                  borderRadius: "2px",
                  display: "block",
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Légende */}
      {item.legende && (
        <div
          className="absolute bottom-5 left-1/2 -translate-x-1/2 px-5 py-2"
          style={{
            background: "rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "2px",
            backdropFilter: "blur(6px)",
          }}
        >
          <p className="text-[13px] text-white/75" style={{ fontFamily: "var(--font-body)" }}>
            {item.legende}
          </p>
        </div>
      )}

      {/* Flèches */}
      {media.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Précédent"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center transition-all duration-200 hover:bg-white/15"
            style={{
              background: "rgba(0,0,0,0.5)",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: "2px",
              color: "#fff",
              backdropFilter: "blur(6px)",
            }}
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={next}
            aria-label="Suivant"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center transition-all duration-200 hover:bg-white/15"
            style={{
              background: "rgba(0,0,0,0.5)",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: "2px",
              color: "#fff",
              backdropFilter: "blur(6px)",
            }}
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}

      {/* Miniatures en bas */}
      {media.length > 1 && (
        <div
          className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] pb-1 px-2"
          style={{ marginBottom: item.legende ? "56px" : "0" }}
        >
          {media.map((m, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Image ${i + 1}`}
              className="flex-shrink-0 relative overflow-hidden transition-all duration-200"
              style={{
                width:        "64px",
                height:       "42px",
                borderRadius: "2px",
                border:       i === current ? "2px solid #B8892A" : "2px solid rgba(255,255,255,0.15)",
                background:   "#071528",
                opacity:      i === current ? 1 : 0.45,
              }}
            >
              <img
                src={m.poster ?? m.src}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              {m.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play size={10} fill="#fff" style={{ color: "#fff", opacity: 0.9 }} />
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ─── Carousel de médias ───────────────────────────────────────────────────────
function MediaCarousel({ media }: { media: Media[] }) {
  const [current,   setCurrent]   = useState(0);
  const [dir,       setDir]       = useState(1);
  const [paused,    setPaused]    = useState(false);
  const [lightbox,  setLightbox]  = useState<number | null>(null);
  const videoRef                  = useRef<HTMLVideoElement>(null);
  const timerRef                  = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback((idx: number) => {
    setDir(idx > current ? 1 : -1);
    setCurrent(idx);
  }, [current]);

  const prev = () => go((current - 1 + media.length) % media.length);
  const next = useCallback(() => go((current + 1) % media.length), [current, go, media.length]);

  // Auto-play — délai normal sur images, délai long sur vidéos si non lues
  useEffect(() => {
    if (paused || media.length <= 1) return;
    const delay = media[current].type === "video" ? 8000 : AUTO_DELAY;
    timerRef.current = setTimeout(() => next(), delay);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, paused, media, next]);

  if (media.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center h-full gap-4"
        style={{ minHeight: "340px" }}
      >
        <Calendar size={36} strokeWidth={1.2} style={{ color: "rgba(255,255,255,0.15)" }} />
        <p
          className="text-[13px] text-center"
          style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.3)" }}
        >
          Les photos seront disponibles<br />dès le début de cette phase
        </p>
      </div>
    );
  }

  const item = media[current];

  return (
    <>
      {/* Lightbox portail */}
      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox
            media={media}
            startIdx={lightbox}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-4">
        {/* Zone principale */}
        <div
          className="relative overflow-hidden"
          style={{ borderRadius: "3px", aspectRatio: "16/9", background: "#071528" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="sync">
            <motion.div
              key={current}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
            >
              {item.type === "image" ? (
                <motion.img
                  src={item.src}
                  alt={item.legende ?? ""}
                  animate={{ scale: [1, 1.07, 1] }}
                  transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "cover", objectPosition: "center",
                    display: "block",
                    transformOrigin: "center center",
                  }}
                />
              ) : (
                <video
                  ref={videoRef}
                  key={item.src}
                  src={item.src}
                  poster={item.poster}
                  controls
                  playsInline
                  onEnded={() => next()}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Bouton zoom (clic → lightbox) */}
          {item.type === "image" && (
            <button
              onClick={() => setLightbox(current)}
              aria-label="Agrandir l'image"
              className="absolute inset-0 w-full h-full cursor-zoom-in group"
              style={{ background: "transparent" }}
            >
              {/* Icône au survol */}
              <span
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{
                  background: "rgba(0,0,0,0.55)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "2px",
                  backdropFilter: "blur(4px)",
                  color: "#fff",
                  pointerEvents: "none",
                }}
              >
                <ZoomIn size={14} />
              </span>
            </button>
          )}

          {/* Badge type vidéo */}
          {item.type === "video" && (
            <div
              className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 pointer-events-none"
              style={{
                background: "rgba(184,137,42,0.85)",
                borderRadius: "2px",
                backdropFilter: "blur(4px)",
              }}
            >
              <Play size={10} fill="#fff" style={{ color: "#fff" }} />
              <span
                className="text-[10px] font-bold tracking-[0.1em] uppercase text-white"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Vidéo
              </span>
            </div>
          )}

          {/* Barre de progression auto-play */}
          {!paused && item.type === "image" && media.length > 1 && (
            <div
              className="absolute bottom-0 left-0 right-0 h-[3px] pointer-events-none"
              style={{ background: "rgba(255,255,255,0.1)" }}
            >
              <motion.div
                key={`${current}-bar`}
                className="h-full"
                style={{ background: "#B8892A", transformOrigin: "left" }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: AUTO_DELAY / 1000, ease: "linear" }}
              />
            </div>
          )}

          {/* Flèches */}
          {media.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                aria-label="Média précédent"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center transition-all duration-200 hover:bg-white/20"
                style={{
                  background: "rgba(0,0,0,0.45)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "2px",
                  backdropFilter: "blur(4px)",
                  color: "#fff",
                  zIndex: 2,
                }}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                aria-label="Média suivant"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center transition-all duration-200 hover:bg-white/20"
                style={{
                  background: "rgba(0,0,0,0.45)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "2px",
                  backdropFilter: "blur(4px)",
                  color: "#fff",
                  zIndex: 2,
                }}
              >
                <ChevronRight size={16} />
              </button>
            </>
          )}

          {/* Légende */}
          {item.legende && (
            <div
              className="absolute bottom-0 left-0 right-0 px-4 py-3 pointer-events-none"
              style={{ background: "linear-gradient(to top, rgba(5,15,30,0.9), transparent)" }}
            >
              <p
                className="text-[12px] text-white/80"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {item.legende}
              </p>
            </div>
          )}
        </div>

        {/* Miniatures */}
        {media.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {media.map((m, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Voir média ${i + 1}`}
                className="flex-shrink-0 relative overflow-hidden transition-all duration-200"
                style={{
                  width:        "72px",
                  height:       "48px",
                  borderRadius: "2px",
                  border:       i === current
                    ? "2px solid #B8892A"
                    : "2px solid rgba(255,255,255,0.1)",
                  background:   "#071528",
                  opacity:      i === current ? 1 : 0.55,
                }}
              >
                <img
                  src={m.poster ?? m.src}
                  alt=""
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "cover", objectPosition: "center",
                    display: "block",
                  }}
                />
                {m.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play size={12} fill="#fff" style={{ color: "#fff", opacity: 0.9 }} />
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

// ─── Section principale ───────────────────────────────────────────────────────
export default function Avancement() {
  const [activeIdx, setActiveIdx] = useState(
    PHASES.findIndex(p => p.statut === "en_cours") ?? 0
  );

  const phase = PHASES[activeIdx];
  const cfg   = STATUT_CONFIG[phase.statut];

  return (
    <section
      aria-labelledby="avancement-title"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: "#0B1F3A" }}
    >
      {/* Ligne or supérieure */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, #B8892A, transparent)" }}
        aria-hidden="true"
      />

      {/* Texture fond */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: "radial-gradient(circle, #B8892A 1px, transparent 1px)",
          backgroundSize:  "28px 28px",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

        {/* ── En-tête ──────────────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 gap-6">
          <div>
            <p
              className="text-[11px] font-bold tracking-[0.35em] uppercase mb-3"
              style={{ fontFamily: "var(--font-heading)", color: "#B8892A" }}
            >
              Suivi du chantier
            </p>
            <span
              className="block w-10 h-px mb-5"
              style={{ background: "linear-gradient(to right, #B8892A, transparent)" }}
              aria-hidden="true"
            />
            <h2
              id="avancement-title"
              className="text-4xl md:text-5xl font-bold leading-[1.1]"
              style={{ fontFamily: "var(--font-serif)", color: "#fff" }}
            >
              <span style={{ color: "#B8892A" }}>État d'avancement</span>{" "}des travaux
            </h2>
          </div>

          {/* Progression globale */}
          <div className="flex flex-col gap-3 lg:items-end">
            <p className="whitespace-nowrap" style={{ margin: 0 }}>
              <span
                className="font-bold tracking-[0.15em] uppercase"
                style={{ fontFamily: "var(--font-heading)", color: "rgba(255,255,255,0.6)", fontSize: "1rem" }}
              >
                Avancement global&nbsp;
              </span>
              <span
                className="font-bold"
                style={{ fontFamily: "var(--font-serif)", color: "#B8892A", fontSize: "1.9rem" }}
              >
                {PROGRESSION_GLOBALE}%
              </span>
            </p>
            {/* Barre */}
            <div
              className="w-full h-1.5 overflow-hidden"
              style={{ background: "rgba(255,255,255,0.07)", borderRadius: "2px", minWidth: "220px" }}
            >
              <motion.div
                className="h-full"
                style={{ background: "linear-gradient(to right, #B8892A, #d4a84b)", borderRadius: "2px" }}
                initial={{ width: 0 }}
                animate={{ width: `${PROGRESSION_GLOBALE}%` }}
                transition={{ duration: 1.4, ease: "easeOut", delay: 0.4 }}
              />
            </div>
          </div>
        </div>

        {/* ── Layout principal ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">

          {/* ── Colonne gauche : liste des phases ── */}
          <div className="flex flex-col gap-2">
            {PHASES.map((p, i) => {
              const c       = STATUT_CONFIG[p.statut];
              const isActive = i === activeIdx;
              return (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className="flex items-start gap-4 text-left transition-all duration-250 px-4 py-4 rounded-sm"
                  style={{
                    background:   isActive ? "rgba(184,137,42,0.1)"  : "transparent",
                    border:       isActive ? "1px solid rgba(184,137,42,0.3)" : "1px solid transparent",
                    borderRadius: "3px",
                  }}
                >
                  {/* Indicateur */}
                  <div className="flex flex-col items-center gap-1 flex-shrink-0 mt-1">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: isActive ? "#B8892A" : c.dot,
                        boxShadow: isActive ? "0 0 0 3px rgba(184,137,42,0.2)" : "none",
                      }}
                    />
                    {i < PHASES.length - 1 && (
                      <div
                        className="w-px flex-1"
                        style={{
                          height:     "24px",
                          background: p.statut === "termine"
                            ? "rgba(27,107,58,0.5)"
                            : "rgba(255,255,255,0.08)",
                        }}
                      />
                    )}
                  </div>

                  {/* Texte */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span
                        className="text-[13px] font-bold leading-snug"
                        style={{
                          fontFamily: "var(--font-heading)",
                          color: isActive ? "#fff" : "rgba(255,255,255,0.6)",
                        }}
                      >
                        {p.date}
                      </span>
                      <span
                        className="text-[9px] font-bold tracking-[0.12em] uppercase px-2 py-0.5"
                        style={{
                          fontFamily:      "var(--font-heading)",
                          color:           isActive ? "#B8892A" : c.dot,
                          background:      c.bg,
                          border:          `1px solid ${c.border}`,
                          borderRadius:    "2px",
                        }}
                      >
                        {c.label}
                      </span>
                    </div>
                    <p
                      className="text-[12px] leading-snug"
                      style={{
                        fontFamily: "var(--font-body)",
                        color: isActive ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.3)",
                      }}
                    >
                      {p.label}
                    </p>

                    {/* Mini barre de progression */}
                    {p.progression > 0 && (
                      <div
                        className="mt-2 h-1 overflow-hidden"
                        style={{ background: "rgba(255,255,255,0.07)", borderRadius: "2px" }}
                      >
                        <div
                          className="h-full"
                          style={{
                            width:      `${p.progression}%`,
                            background: p.statut === "termine" ? "#1B6B3A" : "#B8892A",
                            borderRadius: "2px",
                          }}
                        />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* ── Colonne droite : carousel de la phase active ── */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }}
                exit={{ opacity: 0, y: -16, transition: { duration: 0.25 } }}
              >
                {/* En-tête de la phase */}
                <div
                  className="flex items-center justify-between mb-5 pb-5"
                  style={{ borderBottom: "1px solid rgba(184,137,42,0.15)" }}
                >
                  <div>
                    <p
                      className="text-[11px] font-bold tracking-[0.2em] uppercase mb-1"
                      style={{ fontFamily: "var(--font-heading)", color: "#B8892A" }}
                    >
                      {phase.date}
                    </p>
                    <h3
                      className="text-xl font-bold"
                      style={{ fontFamily: "var(--font-serif)", color: "#fff" }}
                    >
                      {phase.label}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1.5"
                      style={{
                        fontFamily:   "var(--font-heading)",
                        color:        cfg.dot,
                        background:   cfg.bg,
                        border:       `1px solid ${cfg.border}`,
                        borderRadius: "3px",
                      }}
                    >
                      {cfg.label}
                    </span>
                    {phase.progression > 0 && (
                      <span
                        className="text-[13px] font-bold"
                        style={{ fontFamily: "var(--font-serif)", color: "#B8892A" }}
                      >
                        {phase.progression}%
                      </span>
                    )}
                  </div>
                </div>

                {/* Carousel médias */}
                <MediaCarousel media={phase.media} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* Ligne or inférieure */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, #B8892A, transparent)" }}
        aria-hidden="true"
      />

    </section>
  );
}
