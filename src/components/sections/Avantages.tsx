"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Gem, Handshake, ArrowUpDown,
  Dumbbell, ShieldCheck, SquareParking,
} from "lucide-react";

// ─── Données ──────────────────────────────────────────────────────────────────
const ATOUTS = [
  {
    num:   "01",
    icon:  Gem,
    titre: "Haut Standing",
    tag:   "Luxe & Prestige",
    desc:  "Architecture d'exception, matériaux nobles et finitions haut de gamme.",
    image: "/images/avantages/standing.jpg",
    color: "#0d2745",
  },
  {
    num:   "02",
    icon:  Handshake,
    titre: "Conciergerie",
    tag:   "Service premium",
    desc:  "Une équipe dédiée, disponible 7j/7 pour répondre à toutes vos demandes.",
    image: "/images/avantages/conciergerie.jpg",
    color: "#0a1e38",
  },
  {
    num:   "03",
    icon:  ArrowUpDown,
    titre: "Ascenseur",
    tag:   "Accès facilité",
    desc:  "Ascenseur moderne desservant confortablement tous les niveaux.",
    image: "/images/avantages/ascenseur.jpg",
    color: "#0e2845",
  },
  {
    num:   "04",
    icon:  Dumbbell,
    titre: "Salle de sport",
    tag:   "Bien-être",
    desc:  "Espace fitness privatif entièrement équipé, réservé aux résidents.",
    image: "/images/avantages/sport.jpg",
    color: "#111f38",
  },
  {
    num:   "05",
    icon:  ShieldCheck,
    titre: "Sécurité",
    tag:   "24h/24 · 7j/7",
    desc:  "Gardiennage, vidéosurveillance et contrôle d'accès permanent.",
    image: "/images/avantages/securite.jpg",
    color: "#0d2540",
  },
  {
    num:   "06",
    icon:  SquareParking,
    titre: "Parking sous-sol",
    tag:   "Accès direct",
    desc:  "Places sécurisées accessibles directement depuis l'immeuble.",
    image: "/images/avantages/parking.jpg",
    color: "#101f38",
  },
];

// ─── Variants ─────────────────────────────────────────────────────────────────
const cardVariants = {
  hidden:  { opacity: 0, scale: 0.94 },
  visible: (d: number) => ({
    opacity: 1, scale: 1,
    transition: { delay: d, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const headVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { delay: d, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ─── Carte individuelle ───────────────────────────────────────────────────────
function AtoutCard({ atout, Icon, delay, inView }: {
  atout: typeof ATOUTS[number];
  Icon:  React.ComponentType<{ size?: number; strokeWidth?: number }>;
  delay: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      custom={delay}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="relative overflow-hidden cursor-default"
      style={{ height: "380px" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Fond fallback */}
      <div className="absolute inset-0" style={{ backgroundColor: atout.color }} />

      {/* Image — zoom Framer Motion fluide */}
      <motion.img
        src={atout.image}
        alt={atout.titre}
        animate={{ scale: hovered ? 1.1 : 1 }}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position:       "absolute",
          inset:          0,
          width:          "100%",
          height:         "100%",
          objectFit:      "cover",
          objectPosition: "center",
        }}
      />

      {/* Overlay dégradé bas permanent */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(5,15,30,0.97) 0%, rgba(5,15,30,0.55) 50%, rgba(5,15,30,0.1) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Voile or au hover */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ background: "rgba(184,137,42,0.1)" }}
        aria-hidden="true"
      />

      {/* Bordure or basse */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[3px]"
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          background:    "linear-gradient(to right, #B8892A, #d4a84b)",
          transformOrigin: "left",
        }}
        aria-hidden="true"
      />

      {/* Contenu */}
      <div className="absolute inset-0 flex flex-col justify-between p-8">
        {/* Haut : numéro + icône */}
        <div className="flex items-start justify-between">
          <span
            className="text-[44px] font-bold leading-none select-none"
            style={{ fontFamily: "var(--font-serif)", color: "rgba(184,137,42,0.18)" }}
          >
            {atout.num}
          </span>
          <div
            className="w-12 h-12 flex items-center justify-center"
            style={{
              background:   "#B8892A",
              borderRadius: "2px",
              color:        "#fff",
            }}
          >
            <Icon size={22} strokeWidth={1.4} />
          </div>
        </div>

        {/* Bas : tag + titre + description */}
        <div>
          <p
            className="text-[10px] font-bold tracking-[0.25em] uppercase mb-3"
            style={{ fontFamily: "var(--font-heading)", color: "#B8892A" }}
          >
            {atout.tag}
          </p>
          <motion.h3
            animate={{ color: hovered ? "#d4a84b" : "#ffffff" }}
            transition={{ duration: 0.3 }}
            className="text-[22px] font-bold mb-3 leading-snug"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {atout.titre}
          </motion.h3>

          {/* Description glissante au hover */}
          <motion.div
            animate={{ height: hovered ? "auto" : 0, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{ overflow: "hidden" }}
          >
            <p
              className="text-[13px] leading-relaxed pb-1"
              style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.65)" }}
            >
              {atout.desc}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Section principale ───────────────────────────────────────────────────────
export default function Avantages() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      aria-labelledby="avantages-title"
      className="relative overflow-hidden"
      style={{ backgroundColor: "#0B1F3A" }}
    >
      {/* Ligne or supérieure */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, #B8892A, transparent)" }}
        aria-hidden="true"
      />

      {/* ── En-tête centré ──────────────────────────────────────────────── */}
      <div className="relative z-10 pt-24 pb-16 text-center max-w-3xl mx-auto px-6">
        <motion.p
          custom={0}
          variants={headVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-[11px] font-bold tracking-[0.4em] uppercase mb-4"
          style={{ fontFamily: "var(--font-heading)", color: "#B8892A" }}
        >
          Nos prestations
        </motion.p>

        <motion.span
          custom={0.1}
          variants={headVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="block mx-auto w-12 h-px mb-6"
          style={{ background: "linear-gradient(to right, transparent, #B8892A, transparent)" }}
          aria-hidden="true"
        />

        <motion.h2
          id="avantages-title"
          custom={0.2}
          variants={headVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-5"
          style={{ fontFamily: "var(--font-serif)", color: "#fff" }}
        >
          <span style={{ color: "#B8892A" }}>Les Atouts</span>{" "}de la Résidence Bokpli
        </motion.h2>

        <motion.p
          custom={0.3}
          variants={headVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-[15px] leading-relaxed"
          style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.45)" }}
        >
          Chaque détail pensé pour offrir confort, sécurité et prestige au quotidien.
        </motion.p>
      </div>

      {/* ── Grille 6 grandes cartes ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {ATOUTS.map((atout, i) => {
          const Icon = atout.icon;
          return (
            <AtoutCard
              key={atout.num}
              atout={atout}
              Icon={Icon}
              delay={0.1 + i * 0.08}
              inView={inView}
            />
          );
        })}
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
