"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BedDouble,
  Maximize2,
  MapPin,
  CheckCircle2,
  SlidersHorizontal,
  CalendarCheck,
} from "lucide-react";
import Stats from "@/components/sections/Stats";

// ─── Types ────────────────────────────────────────────────────────────────────
type AptType = "tous" | "S0" | "S+2" | "S+4" | "S+6";
type Status  = "disponible" | "reserve" | "vendu";

interface Appartement {
  id:        string;
  type:      Exclude<AptType, "tous">;
  typeLabel: string;
  ref:       string;
  etages:    string;
  surface:   number;
  unites:    number;
  status:    Status;
  pieces:    number;
  features:  string[];
}

// ─── Données (issues du dossier commercial PDF – SCI BOKPLI, Sept. 2025) ──────
const APPARTEMENTS: Appartement[] = [
  // ── Studios S0 ──────────────────────────────────────────────────────────
  {
    id:        "studio-s0",
    type:      "S0",
    typeLabel: "Studio",
    ref:       "Studio S1-1",
    etages:    "R+1 · R+2 · R+3",
    surface:   29.17,
    unites:    3,
    status:    "disponible",
    pieces:    1,
    features:  ["Studio 22.25 m²", "Dressing 2.56 m²", "Salle de bain", "Balcon privatif 3.59 m²"],
  },

  // ── 3 Pièces S+2 ────────────────────────────────────────────────────────
  {
    id:        "3p-type-a",
    type:      "S+2",
    typeLabel: "3 Pièces",
    ref:       "Type A — Appart. 1-1",
    etages:    "R+1 · R+2 · R+3",
    surface:   107.81,
    unites:    3,
    status:    "disponible",
    pieces:    3,
    features:  ["Séjour 26.86 m²", "2 Suites", "Cuisine 13.67 m²", "Séchoir 4.04 m²", "2 Balcons privatifs"],
  },
  {
    id:        "3p-type-b",
    type:      "S+2",
    typeLabel: "3 Pièces",
    ref:       "Type B — Appart. 1-2",
    etages:    "R+1 · R+2 · R+3",
    surface:   100.97,
    unites:    3,
    status:    "disponible",
    pieces:    3,
    features:  ["Séjour 32.17 m²", "2 Suites", "Cuisine 13.90 m²", "3 Balcons privatifs"],
  },
  {
    id:        "3p-type-c",
    type:      "S+2",
    typeLabel: "3 Pièces",
    ref:       "Type C — Appart. 1-3",
    etages:    "R+1 · R+2 · R+3",
    surface:   107.97,
    unites:    3,
    status:    "disponible",
    pieces:    3,
    features:  ["Séjour 26.29 m²", "2 Suites", "Cuisine 13.61 m²", "Séchoir 4.04 m²", "2 Balcons privatifs"],
  },
  {
    id:        "3p-type-d",
    type:      "S+2",
    typeLabel: "3 Pièces PMR",
    ref:       "Type D PMR — Appart. 1-4",
    etages:    "R+1 · R+2 · R+3",
    surface:   100.09,
    unites:    3,
    status:    "disponible",
    pieces:    3,
    features:  ["Séjour 27.04 m²", "2 Suites", "Cuisine 13.11 m²", "3 Balcons privatifs", "Accès PMR"],
  },

  // ── 5 Pièces S+4 ────────────────────────────────────────────────────────
  {
    id:        "5p-4-1",
    type:      "S+4",
    typeLabel: "5 Pièces",
    ref:       "Appartement 4-1",
    etages:    "R+4",
    surface:   224.04,
    unites:    1,
    status:    "disponible",
    pieces:    5,
    features:  [
      "Salon 36.81 m²",
      "Salle à manger 12.51 m²",
      "4 Suites avec balcon",
      "Cuisine-buanderie 28.65 m²",
      "Chambre de service",
      "Séchoir 8.35 m²",
    ],
  },
  {
    id:        "5p-4-2",
    type:      "S+4",
    typeLabel: "5 Pièces",
    ref:       "Appartement 4-2",
    etages:    "R+4",
    surface:   228.11,
    unites:    1,
    status:    "disponible",
    pieces:    5,
    features:  [
      "Salon 36.42 m²",
      "Salle à manger 15.66 m²",
      "4 Suites avec balcon",
      "Cuisine-buanderie 24.46 m²",
      "Chambre de service",
      "Séchoir 8.52 m²",
    ],
  },

  // ── Duplex S+6 ──────────────────────────────────────────────────────────
  {
    id:        "duplex-5-1",
    type:      "S+6",
    typeLabel: "Duplex",
    ref:       "Duplex 5-1",
    etages:    "R+5 · R+6",
    surface:   375.24,
    unites:    1,
    status:    "disponible",
    pieces:    7,
    features:  [
      "Salon-SAM 82.43 m²",
      "Bureau 24.64 m²",
      "4 Suites",
      "Cuisine 26.43 m²",
      "Buanderie & Cellier",
      "Sur 2 niveaux",
    ],
  },
];

// ─── Couleurs par type ────────────────────────────────────────────────────────
const TYPE_COLORS: Record<Exclude<AptType, "tous">, {
  accent: string; light: string; border: string;
}> = {
  "S0":  { accent: "#B8892A", light: "rgba(184,137,42,0.10)", border: "rgba(184,137,42,0.28)" },
  "S+2": { accent: "#1B6B3A", light: "rgba(27,107,58,0.10)",  border: "rgba(27,107,58,0.28)"  },
  "S+4": { accent: "#185FA5", light: "rgba(24,95,165,0.10)",  border: "rgba(24,95,165,0.28)"  },
  "S+6": { accent: "#7C3AED", light: "rgba(124,58,237,0.10)", border: "rgba(124,58,237,0.28)" },
};

const STATUS_INFO: Record<Status, { label: string; color: string; bg: string }> = {
  disponible: { label: "Disponible", color: "#22c55e", bg: "rgba(34,197,94,0.12)"  },
  reserve:    { label: "Réservé",    color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
  vendu:      { label: "Vendu",      color: "#ef4444", bg: "rgba(239,68,68,0.12)"  },
};

// ─── Filtres ──────────────────────────────────────────────────────────────────
const FILTERS: { value: AptType; label: string; sub: string }[] = [
  { value: "tous", label: "Tous",      sub: "19 unités"       },
  { value: "S0",   label: "Studios",   sub: "S0 · ~29 m²"     },
  { value: "S+2",  label: "3 Pièces",  sub: "S+2 · 100–108 m²"},
  { value: "S+4",  label: "5 Pièces",  sub: "S+4 · 224–228 m²"},
  { value: "S+6",  label: "Duplex",    sub: "S+6 · 375 m²"    },
];

function filterAccent(v: AptType) {
  if (v === "tous") return "#B8892A";
  return TYPE_COLORS[v].accent;
}

// ─── Carte appartement ────────────────────────────────────────────────────────
function AptCard({ apt, index }: { apt: Appartement; index: number }) {
  const colors     = TYPE_COLORS[apt.type];
  const statusInfo = STATUS_INFO[apt.status];
  const VISIBLE    = 4;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col overflow-hidden group"
      style={{
        background:   "#0B1826",
        border:       `1px solid ${colors.border}`,
        borderRadius: "6px",
        transition:   "border-color 0.25s, box-shadow 0.25s",
      }}
      whileHover={{ boxShadow: `0 8px 40px ${colors.accent}22` }}
    >
      {/* ── Bandeau haut ── */}
      <div
        className="px-5 py-3.5 flex items-center justify-between"
        style={{ background: colors.light, borderBottom: `1px solid ${colors.border}` }}
      >
        <div className="flex items-center gap-2.5">
          <span
            className="text-[10px] font-bold tracking-[0.18em] uppercase px-2 py-[3px]"
            style={{
              background:   colors.accent,
              color:        "#fff",
              borderRadius: "2px",
              fontFamily:   "var(--font-heading)",
            }}
          >
            {apt.type}
          </span>
          <span
            className="text-[13px] font-semibold"
            style={{ color: "#fff", fontFamily: "var(--font-heading)" }}
          >
            {apt.typeLabel}
          </span>
        </div>

        {/* Statut */}
        <span
          className="text-[10px] font-bold tracking-[0.1em] uppercase px-2.5 py-1 flex-shrink-0"
          style={{
            background:   statusInfo.bg,
            color:        statusInfo.color,
            borderRadius: "2px",
            fontFamily:   "var(--font-heading)",
          }}
        >
          {statusInfo.label}
        </span>
      </div>

      {/* ── Corps ── */}
      <div className="flex-1 p-5">
        {/* Référence & étages */}
        <p
          className="text-[11.5px] mb-1"
          style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body)" }}
        >
          {apt.ref}
        </p>
        <div className="flex items-center gap-1.5 mb-5">
          <MapPin size={11} style={{ color: colors.accent }} />
          <p
            className="text-[11px] font-semibold"
            style={{ color: colors.accent, fontFamily: "var(--font-body)" }}
          >
            {apt.etages}
            {apt.unites > 1 && (
              <span style={{ color: "rgba(255,255,255,0.3)", fontWeight: 400 }}>
                {" "}· {apt.unites} unités identiques
              </span>
            )}
          </p>
        </div>

        {/* Surface + Pièces */}
        <div
          className="flex items-end gap-5 pb-5 mb-5"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div>
            <p
              className="text-[46px] font-bold leading-none"
              style={{ color: colors.accent, fontFamily: "var(--font-serif)" }}
            >
              {apt.surface}
            </p>
            <p
              className="text-[11px] mt-0.5"
              style={{ color: "rgba(255,255,255,0.30)", fontFamily: "var(--font-body)" }}
            >
              m² habitables
            </p>
          </div>

          <div className="pb-1.5 flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <BedDouble size={13} style={{ color: "rgba(255,255,255,0.30)" }} />
              <span
                className="text-[12px]"
                style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)" }}
              >
                {apt.pieces} pièce{apt.pieces > 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize2 size={12} style={{ color: "rgba(255,255,255,0.30)" }} />
              <span
                className="text-[12px]"
                style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)" }}
              >
                {apt.surface} m²
              </span>
            </div>
          </div>
        </div>

        {/* Prestations */}
        <ul className="flex flex-col gap-2 mb-5" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {apt.features.slice(0, VISIBLE).map((f) => (
            <li key={f} className="flex items-start gap-2.5">
              <CheckCircle2
                size={13}
                className="flex-shrink-0 mt-[1px]"
                style={{ color: colors.accent }}
              />
              <span
                className="text-[12px] leading-snug"
                style={{ color: "rgba(255,255,255,0.50)", fontFamily: "var(--font-body)" }}
              >
                {f}
              </span>
            </li>
          ))}
          {apt.features.length > VISIBLE && (
            <li
              className="text-[11px] pl-[21px]"
              style={{ color: "rgba(255,255,255,0.22)", fontFamily: "var(--font-body)" }}
            >
              + {apt.features.length - VISIBLE} autre{apt.features.length - VISIBLE > 1 ? "s" : ""} prestations
            </li>
          )}
        </ul>

        {/* Prix */}
        <div
          className="px-4 py-3 mb-4"
          style={{
            background:   "rgba(255,255,255,0.03)",
            border:       "1px solid rgba(255,255,255,0.07)",
            borderRadius: "3px",
          }}
        >
          <p
            className="text-[9px] font-bold tracking-[0.25em] uppercase mb-0.5"
            style={{ color: "rgba(255,255,255,0.22)", fontFamily: "var(--font-heading)" }}
          >
            Prix
          </p>
          <p
            className="text-[17px] font-bold"
            style={{ color: "#B8892A", fontFamily: "var(--font-serif)" }}
          >
            Prix sur demande
          </p>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="px-5 pb-5">
        <Link
          href="/contact"
          className="flex items-center justify-center gap-2 w-full py-3 font-bold tracking-[0.08em] uppercase"
          style={{
            background:     colors.accent,
            color:          "#fff",
            borderRadius:   "3px",
            fontFamily:     "var(--font-heading)",
            fontSize:       "11.5px",
            textDecoration: "none",
          }}
        >
          Demander les informations
          <ArrowRight size={13} strokeWidth={2} />
        </Link>
      </div>
    </motion.article>
  );
}

// ─── Composant principal ──────────────────────────────────────────────────────
export default function AppartementsClient({ initialType }: { initialType: string }) {
  const router       = useRouter();
  const validTypes: AptType[] = ["tous", "S0", "S+2", "S+4", "S+6"];
  const [activeFilter, setActiveFilter] = useState<AptType>(
    validTypes.includes(initialType as AptType) ? (initialType as AptType) : "tous"
  );

  const filtered = useMemo(
    () => activeFilter === "tous"
      ? APPARTEMENTS
      : APPARTEMENTS.filter((a) => a.type === activeFilter),
    [activeFilter]
  );

  const totalUnites = useMemo(
    () => filtered.reduce((s, a) => s + a.unites, 0),
    [filtered]
  );

  function handleFilter(f: AptType) {
    setActiveFilter(f);
    const url = f === "tous" ? "/appartements" : `/appartements?type=${encodeURIComponent(f)}`;
    router.replace(url, { scroll: false });
  }

  return (
    <>
      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: "520px" }}>

        {/* Image de fond */}
        <Image
          src="/images/hero/slide-2.jpg"
          alt="Résidence Bokpli — Appartements de prestige"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Overlay dégradé navy */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(6,15,30,0.72) 0%, rgba(6,15,30,0.55) 50%, rgba(6,15,30,0.85) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Grille subtile */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(184,137,42,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(184,137,42,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
          aria-hidden="true"
        />

        {/* Ligne or haut */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: "linear-gradient(to right, transparent, #B8892A, transparent)" }}
          aria-hidden="true"
        />

        {/* Contenu */}
        <div
          className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center justify-center"
          style={{ minHeight: "520px", paddingTop: "60px", paddingBottom: "60px" }}
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[11px] font-bold tracking-[0.4em] uppercase mb-4"
            style={{ fontFamily: "var(--font-heading)", color: "#B8892A" }}
          >
            Résidence Bokpli · Abidjan
          </motion.p>

          <span
            className="block w-10 h-px mx-auto mb-6"
            style={{ background: "linear-gradient(to right, transparent, #B8892A, transparent)" }}
            aria-hidden="true"
          />

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] mb-6"
            style={{ fontFamily: "var(--font-serif)", color: "#fff" }}
          >
            <span style={{ color: "#B8892A" }}>Catalogue</span> des appartements
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[15px] leading-relaxed max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.55)" }}
          >
            19 appartements de prestige répartis sur 7 niveaux.
            Studios, 3 pièces, 5 pièces et duplex panoramique — tous disponibles.
          </motion.p>
        </div>
      </section>

      {/* ══ STATISTIQUES (bande or — identique page d'accueil) ═════════════ */}
      <Stats />

      {/* ══ CATALOGUE ════════════════════════════════════════════════════════ */}
      <section style={{ background: "#07101E", padding: "64px 0 88px" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* ── Barre de filtres ── */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <SlidersHorizontal size={13} style={{ color: "rgba(255,255,255,0.3)" }} />
              <span
                className="text-[11px] font-bold uppercase tracking-[0.15em]"
                style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-heading)" }}
              >
                Filtrer par type
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => {
                const isActive = activeFilter === f.value;
                const accent   = filterAccent(f.value);
                return (
                  <button
                    key={f.value}
                    onClick={() => handleFilter(f.value)}
                    className="relative px-4 py-2.5 text-left transition-all duration-200"
                    style={{
                      background:   isActive ? `${accent}22` : "rgba(255,255,255,0.04)",
                      border:       isActive ? `1px solid ${accent}` : "1px solid rgba(255,255,255,0.09)",
                      borderRadius: "4px",
                      cursor:       "pointer",
                      minWidth:     "90px",
                    }}
                  >
                    <span
                      className="block text-[12.5px] font-bold"
                      style={{
                        fontFamily: "var(--font-heading)",
                        color:      isActive ? "#fff" : "rgba(255,255,255,0.45)",
                      }}
                    >
                      {f.label}
                    </span>
                    <span
                      className="block text-[10px] mt-0.5"
                      style={{
                        fontFamily: "var(--font-body)",
                        color:      isActive ? accent : "rgba(255,255,255,0.2)",
                      }}
                    >
                      {f.sub}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="filter-indicator"
                        className="absolute bottom-0 left-0 right-0 h-[2px]"
                        style={{ background: accent, borderRadius: "0 0 4px 4px" }}
                        transition={{ type: "spring", stiffness: 500, damping: 40 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Compteur */}
            <p
              className="text-[12px] mt-3"
              style={{ color: "rgba(255,255,255,0.28)", fontFamily: "var(--font-body)" }}
            >
              {filtered.length} type{filtered.length > 1 ? "s" : ""} affiché{filtered.length > 1 ? "s" : ""} ·{" "}
              <span style={{ color: "#B8892A" }}>{totalUnites} unité{totalUnites > 1 ? "s" : ""} disponible{totalUnites > 1 ? "s" : ""}</span>
            </p>
          </div>

          {/* ── Grille de cartes ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filtered.map((apt, i) => (
                <AptCard key={apt.id} apt={apt} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ══ CTA CONTACT ══════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ background: "#0B1F3A", padding: "80px 0" }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(to right, transparent, #B8892A, transparent)" }}
          aria-hidden="true"
        />
        {/* Halo */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px", height: "300px",
            background: "radial-gradient(ellipse, rgba(184,137,42,0.08) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[11px] font-bold tracking-[0.4em] uppercase mb-3"
            style={{ fontFamily: "var(--font-heading)", color: "#B8892A" }}
          >
            Intéressé par un appartement ?
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-5"
            style={{ fontFamily: "var(--font-serif)", color: "#fff" }}
          >
            Organisons une visite
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[14px] leading-relaxed mb-10"
            style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.38)" }}
          >
            Notre équipe est disponible pour vous présenter les appartements,
            répondre à vos questions et vous accompagner dans votre projet d'acquisition.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/reservation"
              className="inline-flex items-center gap-2.5 px-8 py-4 font-bold tracking-[0.1em] uppercase transition-colors"
              style={{
                background:     "#B8892A",
                color:          "#fff",
                borderRadius:   "3px",
                fontFamily:     "var(--font-heading)",
                fontSize:       "12px",
                textDecoration: "none",
              }}
            >
              <CalendarCheck size={14} strokeWidth={2} />
              Réserver une visite
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 font-bold tracking-[0.1em] uppercase transition-colors"
              style={{
                background:     "transparent",
                color:          "#B8892A",
                border:         "1px solid rgba(184,137,42,0.4)",
                borderRadius:   "3px",
                fontFamily:     "var(--font-heading)",
                fontSize:       "12px",
                textDecoration: "none",
              }}
            >
              Nous contacter
              <ArrowRight size={13} strokeWidth={2} />
            </Link>
          </motion.div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(184,137,42,0.3), transparent)" }}
          aria-hidden="true"
        />
      </section>
    </>
  );
}
