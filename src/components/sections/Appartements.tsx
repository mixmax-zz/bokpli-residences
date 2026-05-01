"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight, X } from "lucide-react";

// ─── Données réelles (PDF : Tableau des surfaces – Planche 13/34) ──────────────
const TYPOLOGIES = [
  {
    code:        "S0",
    label:       "Studio",
    etagesLabel: "R+1 · R+2 · R+3",
    etagesNums:  [1, 2, 3, 5, 6],
    accent:      "#B8892A",
    accentLight: "rgba(184,137,42,0.12)",
    accentBorder:"rgba(184,137,42,0.35)",
    surfaceMin:  29.17,
    surfaceMax:  31.80,
    totalUnites: 4,
    unites: [
      { ref: "Studio 1-1", etage: "R+1",     surface: 29.17 },
      { ref: "Studio 2-1", etage: "R+2",     surface: 29.17 },
      { ref: "Studio 3-1", etage: "R+3",     surface: 29.17 },
      { ref: "Suite 5-3",  etage: "R+5–R+6", surface: 31.80 },
    ],
    description: "Studios compacts et fonctionnels, idéaux pour l'investissement locatif ou une résidence principale. Chaque unité bénéficie des mêmes finitions premium que l'ensemble de la résidence.",
    prestations: ["Cuisine équipée", "Salle de bain complète", "Rangements optimisés", "Finitions haut de gamme"],
    image: "/images/appartements/studio.jpg",
  },
  {
    code:        "S+2",
    label:       "3 Pièces",
    etagesLabel: "R+1 · R+2 · R+3",
    etagesNums:  [1, 2, 3],
    accent:      "#1B6B3A",
    accentLight: "rgba(27,107,58,0.12)",
    accentBorder:"rgba(27,107,58,0.35)",
    surfaceMin:  100.09,
    surfaceMax:  107.97,
    totalUnites: 12,
    unites: [
      { ref: "Appart. A (type 1-1)", etage: "R+1 à R+3", surface: 107.81 },
      { ref: "Appart. B (type 1-2)", etage: "R+1 à R+3", surface: 100.97 },
      { ref: "Appart. C (type 1-3)", etage: "R+1 à R+3", surface: 107.97 },
      { ref: "Appart. D (type 1-4)", etage: "R+1 à R+3", surface: 100.09 },
    ],
    description: "Appartements spacieux offrant séjour double et deux chambres. La disposition optimisée maximise la luminosité et la circulation pour un confort de vie exceptionnel au quotidien.",
    prestations: ["Séjour lumineux double exposition", "2 chambres", "Cuisine ouverte", "Balcon privatif"],
    image: "/images/appartements/3-pieces.jpg",
  },
  {
    code:        "S+4",
    label:       "5 Pièces",
    etagesLabel: "R+4",
    etagesNums:  [4],
    accent:      "#185FA5",
    accentLight: "rgba(24,95,165,0.12)",
    accentBorder:"rgba(24,95,165,0.35)",
    surfaceMin:  224.04,
    surfaceMax:  228.11,
    totalUnites: 2,
    unites: [
      { ref: "Appart. 4-1", etage: "R+4", surface: 224.04 },
      { ref: "Appart. 4-2", etage: "R+4", surface: 228.11 },
    ],
    description: "Grands appartements de prestige occupant tout le 4ème étage. Volumes généreux, 4 chambres dont une suite parentale avec dressing, et des espaces de vie ouverts exceptionnels.",
    prestations: ["Suite parentale + dressing", "4 chambres", "Double salon", "Grande cuisine"],
    image: "/images/appartements/5-pieces.jpg",
  },
  {
    code:        "S+6",
    label:       "Duplex",
    etagesLabel: "R+5 · R+6",
    etagesNums:  [5, 6],
    accent:      "#7C3AED",
    accentLight: "rgba(124,58,237,0.12)",
    accentBorder:"rgba(124,58,237,0.35)",
    surfaceMin:  375.24,
    surfaceMax:  375.24,
    totalUnites: 1,
    unites: [
      { ref: "Duplex 5-1", etage: "R+5 – R+6", surface: 375.24 },
    ],
    description: "Le joyau de la Résidence Bokpli. Un duplex d'exception s'étalant sur deux niveaux avec des prestations sur-mesure, des volumes uniques et une vue panoramique sur Abidjan.",
    prestations: ["Sur 2 niveaux", "Vue panoramique 360°", "5 chambres", "Terrasse privée"],
    image: "/images/appartements/duplex.jpg",
  },
];

// ─── Diagramme immeuble R+6 ────────────────────────────────────────────────────
const FLOORS = [
  { num: 6,  label: "R+6", isParking: false, plan: "/images/plans/plan-34.jpg", planLabel: "6ème étage" },
  { num: 5,  label: "R+5", isParking: false, plan: "/images/plans/plan-33.jpg", planLabel: "5ème étage" },
  { num: 4,  label: "R+4", isParking: false, plan: "/images/plans/plan-32.jpg", planLabel: "4ème étage" },
  { num: 3,  label: "R+3", isParking: false, plan: "/images/plans/plan-31.jpg", planLabel: "2ème & 3ème étage" },
  { num: 2,  label: "R+2", isParking: false, plan: "/images/plans/plan-31.jpg", planLabel: "2ème & 3ème étage" },
  { num: 1,  label: "R+1", isParking: false, plan: "/images/plans/plan-30.jpg", planLabel: "1er étage" },
  { num: 0,  label: "RDC", isParking: true,  plan: "/images/plans/plan-29.jpg", planLabel: "Rez-de-chaussée" },
  { num: -1, label: "S.S", isParking: true,  plan: "/images/plans/plan-28.jpg", planLabel: "Sous-sol" },
];
type Floor = typeof FLOORS[0];

function BuildingDiagram({ activeTypo, onFloorClick }: { activeTypo: typeof TYPOLOGIES[0]; onFloorClick: (f: Floor) => void }) {
  const W = 120, FLOOR_H = 30, FLOOR_GAP = 3;
  const totalH = FLOORS.length * (FLOOR_H + FLOOR_GAP) + 46;

  return (
    <svg
      viewBox={`0 0 ${W + 60} ${totalH}`}
      width="100%"
      style={{ maxWidth: "190px", display: "block", margin: "0 auto" }}
      aria-hidden="true"
    >
      {/* Toit */}
      <polygon
        points={`30,18 ${W/2 + 30},2 ${W + 30},18`}
        fill={activeTypo.accent}
        opacity="0.22"
        stroke={activeTypo.accent}
        strokeWidth="1"
      />

      {FLOORS.map((floor, i) => {
        const y        = 22 + i * (FLOOR_H + FLOOR_GAP);
        const isActive = activeTypo.etagesNums.includes(floor.num);

        return (
          <g key={floor.num} onClick={() => onFloorClick(floor)} style={{ cursor: "pointer" }}>
            {/* Zone cliquable pleine largeur */}
            <rect x="0" y={y} width={W + 60} height={FLOOR_H} fill="transparent" />
            {/* Séparateur entre appartements et RDC */}
            {floor.num === 0 && (
              <line
                x1="28" y1={y - 4}
                x2={W + 32} y2={y - 4}
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1"
                strokeDasharray="4,3"
              />
            )}

            {/* Étiquette gauche */}
            <text
              x="26"
              y={y + FLOOR_H / 2 + 4}
              textAnchor="end"
              fontSize="8.5"
              fill={
                isActive ? activeTypo.accent :
                floor.isParking ? "rgba(255,255,255,0.18)" :
                                  "rgba(255,255,255,0.28)"
              }
              fontWeight={isActive ? "700" : "400"}
              style={{ fontFamily: "var(--font-heading)", letterSpacing: "0.04em" }}
            >
              {floor.label}
            </text>

            {/* Fond de l'étage */}
            <rect
              x="30" y={y} width={W} height={FLOOR_H} rx="2"
              fill={
                isActive ? activeTypo.accent :
                floor.isParking ? "rgba(255,255,255,0.02)" :
                                  "rgba(255,255,255,0.04)"
              }
              stroke={
                isActive ? activeTypo.accent :
                floor.isParking ? "rgba(255,255,255,0.05)" :
                                  "rgba(255,255,255,0.07)"
              }
              strokeWidth="1"
              opacity={isActive ? 0.22 : 1}
            />

            {/* Overlay actif */}
            {isActive && (
              <motion.rect
                key={`${activeTypo.code}-${floor.num}`}
                x="30" y={y} width={W} height={FLOOR_H} rx="2"
                fill={activeTypo.accent}
                opacity="0"
                animate={{ opacity: [0, 0.18, 0.12] }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            )}

            {/* Contenu de l'étage */}
            {floor.isParking ? (
              <text
                x={30 + W / 2} y={y + FLOOR_H / 2 + 4}
                textAnchor="middle" fontSize="8"
                fill="rgba(255,255,255,0.12)"
                style={{ fontFamily: "var(--font-heading)", letterSpacing: "0.12em" }}
              >
                {floor.num === 0 ? "RDC · PARKING" : "SOUS-SOL · PARKING"}
              </text>
            ) : (
              [0, 1, 2, 3].map((w) => (
                <rect
                  key={w}
                  x={35 + w * 26} y={y + 7}
                  width={14} height={16} rx="1"
                  fill={isActive ? activeTypo.accent : "rgba(255,255,255,0.07)"}
                  opacity={isActive ? 0.6 : 1}
                />
              ))
            )}
          </g>
        );
      })}

      {/* Fondation */}
      <rect
        x="26" y={22 + FLOORS.length * (FLOOR_H + FLOOR_GAP) + 2}
        width={W + 8} height="7" rx="1"
        fill="rgba(255,255,255,0.1)"
      />
    </svg>
  );
}

// ─── Modale plan d'étage ─────────────────────────────────────────────────────
function FloorModal({ floor, onClose }: { floor: Floor; onClose: () => void }) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", fn); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
      style={{ background: "rgba(6,15,30,0.9)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-4xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Bandeau titre */}
        <div className="flex items-center justify-between px-5 py-3"
          style={{ background: "#0B1F3A", border: "1px solid rgba(184,137,42,0.35)", borderBottom: "none", borderRadius: "4px 4px 0 0" }}>
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 text-[10px] font-bold tracking-[0.15em] uppercase"
              style={{ fontFamily: "var(--font-heading)", background: "#B8892A", color: "#fff", borderRadius: "2px" }}>
              {floor.label}
            </span>
            <span className="text-[14px] font-semibold" style={{ fontFamily: "var(--font-heading)", color: "#fff" }}>
              Plan {floor.planLabel}
            </span>
          </div>
          <button onClick={onClose} aria-label="Fermer"
            className="flex items-center justify-center w-8 h-8"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "3px", color: "rgba(255,255,255,0.6)" }}>
            <X size={15} />
          </button>
        </div>
        {/* Image du plan */}
        <div style={{ background: "#fff", border: "1px solid rgba(184,137,42,0.35)", borderTop: "none", borderRadius: "0 0 4px 4px", overflow: "hidden" }}>
          <img src={floor.plan} alt={`Plan ${floor.planLabel}`}
            style={{ width: "100%", height: "auto", maxHeight: "78vh", objectFit: "contain", display: "block" }} />
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Section principale ────────────────────────────────────────────────────────
export default function Appartements() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeIdx,   setActiveIdx]   = useState(0);
  const [floorModal,  setFloorModal]  = useState<Floor | null>(null);

  const typo = TYPOLOGIES[activeIdx];

  return (
    <>
    <AnimatePresence>
      {floorModal && <FloorModal floor={floorModal} onClose={() => setFloorModal(null)} />}
    </AnimatePresence>
    <section
      ref={ref}
      id="appartements"
      aria-labelledby="appartements-title"
      className="relative overflow-hidden"
      style={{ backgroundColor: "#060F1E" }}
    >
      {/* Motif grille subtil */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(184,137,42,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(184,137,42,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* Halo de fond */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "10%", left: "50%", transform: "translateX(-50%)",
          width: "600px", height: "400px",
          background: `radial-gradient(ellipse, ${typo.accent}18 0%, transparent 70%)`,
          transition: "background 0.6s ease",
          filter: "blur(40px)",
        }}
        aria-hidden="true"
      />

      {/* Ligne or supérieure */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: "linear-gradient(to right, transparent, #B8892A 30%, #B8892A 70%, transparent)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">

        {/* ── En-tête ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <p
            className="text-[11px] font-bold tracking-[0.4em] uppercase mb-4"
            style={{ fontFamily: "var(--font-heading)", color: "#B8892A" }}
          >
            Résidence Bokpli · Abidjan
          </p>
          <span
            className="block w-10 h-px mx-auto mb-6"
            style={{ background: "linear-gradient(to right, transparent, #B8892A, transparent)" }}
            aria-hidden="true"
          />
          <h2
            id="appartements-title"
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] mb-5"
            style={{ fontFamily: "var(--font-serif)", color: "#fff" }}
          >
            <span style={{ color: "#B8892A" }}>Nos types</span>{" "}d'appartements
          </h2>
          <p
            className="text-[14px] leading-relaxed max-w-lg mx-auto"
            style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.35)" }}
          >
            Du studio compact au duplex panoramique, chaque appartement est
            conçu avec les plus hauts standards de qualité.
          </p>
        </motion.div>

        {/* ── Sélecteurs typologies ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10"
        >
          {TYPOLOGIES.map((t, i) => (
            <button
              key={t.code}
              onClick={() => setActiveIdx(i)}
              className="relative text-left overflow-hidden transition-all duration-300"
              style={{
                background:   i === activeIdx ? t.accentLight : "rgba(255,255,255,0.03)",
                border:       i === activeIdx ? `1px solid ${t.accent}` : "1px solid rgba(255,255,255,0.08)",
                borderRadius: "4px",
                padding:      "16px 18px",
              }}
            >
              {/* Badge code */}
              <span
                className="inline-block text-[10px] font-bold tracking-[0.15em] uppercase px-2 py-0.5 mb-2"
                style={{
                  fontFamily:   "var(--font-heading)",
                  background:   i === activeIdx ? t.accent : "rgba(255,255,255,0.06)",
                  color:        i === activeIdx ? "#fff" : "rgba(255,255,255,0.35)",
                  borderRadius: "2px",
                  transition:   "all 0.3s",
                }}
              >
                {t.code}
              </span>

              <p
                className="text-[16px] font-bold leading-tight"
                style={{
                  fontFamily: "var(--font-serif)",
                  color:      i === activeIdx ? "#fff" : "rgba(255,255,255,0.45)",
                  transition: "color 0.3s",
                }}
              >
                {t.label}
              </p>

              <p
                className="text-[12px] mt-1"
                style={{
                  fontFamily: "var(--font-body)",
                  color:      i === activeIdx ? t.accent : "rgba(255,255,255,0.2)",
                  transition: "color 0.3s",
                }}
              >
                {t.surfaceMin === t.surfaceMax
                  ? `${t.surfaceMin} m²`
                  : `${t.surfaceMin} – ${t.surfaceMax} m²`}
              </p>

              <p
                className="text-[10px] mt-0.5 font-semibold"
                style={{
                  fontFamily: "var(--font-body)",
                  color:      "rgba(255,255,255,0.2)",
                }}
              >
                {t.totalUnites} unité{t.totalUnites > 1 ? "s" : ""}
              </p>

              {/* Indicateur actif — trait de couleur en bas */}
              {i === activeIdx && (
                <motion.div
                  layoutId="typo-indicator"
                  className="absolute bottom-0 left-0 right-0 h-[3px]"
                  style={{ background: t.accent, borderRadius: "0 0 4px 4px" }}
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* ── Panneau de détail ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={typo.code}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6"
          >

            {/* ── Colonne gauche : immeuble + compteur ── */}
            <div
              className="flex flex-col gap-5"
              style={{
                background:   "rgba(255,255,255,0.02)",
                border:       "1px solid rgba(255,255,255,0.06)",
                borderRadius: "6px",
                padding:      "24px 20px",
              }}
            >
              {/* Titre colonne */}
              <p
                className="text-[10px] font-bold tracking-[0.3em] uppercase text-center"
                style={{ fontFamily: "var(--font-heading)", color: "rgba(255,255,255,0.3)" }}
              >
                Immeuble R+6
              </p>

              {/* Diagramme immeuble */}
              <div className="flex-1 flex items-center justify-center py-2">
                <BuildingDiagram activeTypo={typo} onFloorClick={setFloorModal} />
              </div>

              {/* Légende */}
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <span
                  className="w-3 h-3 rounded-sm flex-shrink-0"
                  style={{ background: typo.accent, opacity: 0.7 }}
                />
                <span
                  className="text-[11px]"
                  style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.35)" }}
                >
                  {typo.etagesLabel}
                </span>
              </div>

              {/* Statistiques */}
              <div
                className="pt-4"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex justify-around">
                  <div className="text-center">
                    <p
                      className="text-[28px] font-bold leading-none"
                      style={{ fontFamily: "var(--font-serif)", color: typo.accent }}
                    >
                      {typo.totalUnites}
                    </p>
                    <p
                      className="text-[10px] mt-1 uppercase tracking-[0.1em]"
                      style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.3)" }}
                    >
                      Unité{typo.totalUnites > 1 ? "s" : ""}
                    </p>
                  </div>
                  <div
                    className="w-px"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  />
                  <div className="text-center">
                    <p
                      className="text-[28px] font-bold leading-none"
                      style={{ fontFamily: "var(--font-serif)", color: "#fff" }}
                    >
                      {Math.round(typo.surfaceMin)}
                    </p>
                    <p
                      className="text-[10px] mt-1 uppercase tracking-[0.1em]"
                      style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.3)" }}
                    >
                      m² min
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Colonne droite : détails ── */}
            <div
              className="flex flex-col gap-0 overflow-hidden"
              style={{
                background:   "rgba(255,255,255,0.02)",
                border:       `1px solid ${typo.accent}30`,
                borderRadius: "6px",
              }}
            >
              {/* Bandeau en-tête coloré */}
              <div
                className="px-8 py-6 flex items-center justify-between"
                style={{
                  background:   typo.accentLight,
                  borderBottom: `1px solid ${typo.accent}25`,
                }}
              >
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span
                      className="text-[11px] font-bold tracking-[0.2em] uppercase px-2.5 py-0.5"
                      style={{
                        fontFamily:   "var(--font-heading)",
                        background:   typo.accent,
                        color:        "#fff",
                        borderRadius: "2px",
                      }}
                    >
                      {typo.code}
                    </span>
                    <span
                      className="text-[11px]"
                      style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.35)" }}
                    >
                      {typo.etagesLabel}
                    </span>
                  </div>
                  <h3
                    className="text-[32px] md:text-[40px] font-bold leading-none"
                    style={{ fontFamily: "var(--font-serif)", color: "#fff" }}
                  >
                    Appartement {typo.label}
                  </h3>
                </div>

                {/* Surface héro */}
                <div className="text-right flex-shrink-0 ml-6">
                  <p
                    className="text-[48px] md:text-[60px] font-bold leading-none"
                    style={{ fontFamily: "var(--font-serif)", color: typo.accent }}
                  >
                    {typo.surfaceMin === typo.surfaceMax
                      ? typo.surfaceMin
                      : `${typo.surfaceMin}`}
                  </p>
                  {typo.surfaceMin !== typo.surfaceMax && (
                    <p
                      className="text-[16px] font-bold"
                      style={{ fontFamily: "var(--font-serif)", color: `${typo.accent}70` }}
                    >
                      à {typo.surfaceMax} m²
                    </p>
                  )}
                  {typo.surfaceMin === typo.surfaceMax && (
                    <p
                      className="text-[18px] font-bold"
                      style={{ fontFamily: "var(--font-serif)", color: `${typo.accent}80` }}
                    >
                      m²
                    </p>
                  )}
                </div>
              </div>

              {/* Corps du panneau */}
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Description + prestations */}
                <div>
                  <p
                    className="text-[14px] leading-relaxed mb-6"
                    style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.45)" }}
                  >
                    {typo.description}
                  </p>

                  <p
                    className="text-[10px] font-bold tracking-[0.3em] uppercase mb-3"
                    style={{ fontFamily: "var(--font-heading)", color: typo.accent }}
                  >
                    Prestations
                  </p>
                  <ul className="flex flex-col gap-2.5" style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {typo.prestations.map((p) => (
                      <li key={p} className="flex items-center gap-3">
                        <span
                          className="flex-shrink-0 w-5 h-5 flex items-center justify-center"
                          style={{
                            background:   typo.accentLight,
                            border:       `1px solid ${typo.accentBorder}`,
                            borderRadius: "2px",
                          }}
                        >
                          <svg width="9" height="8" viewBox="0 0 10 8" fill="none">
                            <polyline
                              points="1,4 3.5,7 9,1"
                              stroke={typo.accent}
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <span
                          className="text-[13px]"
                          style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.55)" }}
                        >
                          {p}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tableau des unités */}
                <div>
                  <p
                    className="text-[10px] font-bold tracking-[0.3em] uppercase mb-3"
                    style={{ fontFamily: "var(--font-heading)", color: typo.accent }}
                  >
                    Détail des surfaces
                  </p>

                  <div className="flex flex-col gap-2">
                    {typo.unites.map((u, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between px-4 py-3"
                        style={{
                          background:   "rgba(255,255,255,0.03)",
                          border:       "1px solid rgba(255,255,255,0.06)",
                          borderRadius: "3px",
                        }}
                      >
                        <div>
                          <p
                            className="text-[13px] font-semibold"
                            style={{ fontFamily: "var(--font-heading)", color: "#fff" }}
                          >
                            {u.ref}
                          </p>
                          <p
                            className="text-[11px]"
                            style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.3)" }}
                          >
                            {u.etage}
                          </p>
                        </div>
                        <div
                          className="text-right px-3 py-1"
                          style={{
                            background:   typo.accentLight,
                            border:       `1px solid ${typo.accentBorder}`,
                            borderRadius: "2px",
                          }}
                        >
                          <span
                            className="text-[14px] font-bold"
                            style={{ fontFamily: "var(--font-serif)", color: typo.accent }}
                          >
                            {u.surface}
                          </span>
                          <span
                            className="text-[11px] ml-1"
                            style={{ fontFamily: "var(--font-body)", color: `${typo.accent}80` }}
                          >
                            m²
                          </span>
                        </div>
                      </div>
                    ))}

                    {/* Ligne total pour S+2 */}
                    {typo.totalUnites > typo.unites.length && (
                      <div
                        className="flex items-center justify-between px-4 py-2.5 mt-1"
                        style={{
                          background:   typo.accentLight,
                          border:       `1px solid ${typo.accentBorder}`,
                          borderRadius: "3px",
                        }}
                      >
                        <p
                          className="text-[11px] font-bold"
                          style={{ fontFamily: "var(--font-heading)", color: typo.accent }}
                        >
                          × {typo.etagesLabel.includes("·") ? typo.etagesLabel.split("·").length : 1} étages
                          {" → "}{typo.totalUnites} appartements au total
                        </p>
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <motion.a
                    href={`/appartements?type=${typo.code}`}
                    className="inline-flex items-center justify-center gap-2.5 w-full mt-5 py-3.5 font-bold tracking-[0.08em] uppercase"
                    style={{
                      background:     typo.accent,
                      color:          "#fff",
                      borderRadius:   "3px",
                      fontFamily:     "var(--font-heading)",
                      fontSize:       "12px",
                      textDecoration: "none",
                    }}
                    whileHover={{ filter: "brightness(1.1)" }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Voir les appartements {typo.label}
                    <ArrowRight size={14} strokeWidth={2} />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Pied de section : récap & CTA global ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 mt-10 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-8">
            {[
              { val: "19",       label: "Appartements"  },
              { val: "R+6",      label: "Immeuble"      },
              { val: "2027",     label: "Livraison"     },
            ].map(({ val, label }) => (
              <div key={label} className="text-center">
                <p
                  className="text-[24px] font-bold leading-none"
                  style={{ fontFamily: "var(--font-serif)", color: "#B8892A" }}
                >
                  {val}
                </p>
                <p
                  className="text-[10px] mt-1 uppercase tracking-[0.1em]"
                  style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.3)" }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>

          <motion.a
            href="/documents/catalogue-bokpli.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-7 py-3.5 font-bold tracking-[0.08em] uppercase flex-shrink-0"
            style={{
              background:     "transparent",
              color:          "#B8892A",
              border:         "1px solid rgba(184,137,42,0.35)",
              borderRadius:   "3px",
              fontFamily:     "var(--font-heading)",
              fontSize:       "12px",
              textDecoration: "none",
            }}
            whileHover={{ background: "rgba(184,137,42,0.08)", borderColor: "#B8892A" }}
            whileTap={{ scale: 0.97 }}
          >
            Catalogue complet
            <ChevronRight size={15} />
          </motion.a>
        </motion.div>

      </div>

      {/* Ligne or inférieure */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(184,137,42,0.4), transparent)" }}
        aria-hidden="true"
      />
    </section>
    </>
  );
}
