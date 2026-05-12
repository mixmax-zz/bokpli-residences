"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface StatItem {
  valeur: string;
  label:  string;
}

interface StatsProps {
  /** Tableau de statistiques à afficher (4 max recommandés) */
  items?: StatItem[];
}

// ─── Valeurs par défaut (page d'accueil) ─────────────────────────────────────
const DEFAULT_STATS: StatItem[] = [
  { valeur: "R+6",  label: "Étages modernes"     },
  { valeur: "100%", label: "Appartements neufs"   },
  { valeur: "04",   label: "Types d'appartement" },
  { valeur: "2027", label: "Livraison prévue"     },
];

// ─── Composant ────────────────────────────────────────────────────────────────
export default function Stats({ items = DEFAULT_STATS }: StatsProps) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 md:grid-cols-4"
      style={{ backgroundColor: "#B8892A" }}
    >
      {items.map(({ valeur, label }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center justify-center py-10 px-4 text-center"
          style={{
            borderRight: i < items.length - 1
              ? "1px solid rgba(255,255,255,0.2)"
              : "none",
          }}
        >
          <span
            className="text-4xl font-bold mb-1.5"
            style={{ fontFamily: "var(--font-serif)", color: "#fff" }}
          >
            {valeur}
          </span>
          <span
            className="text-[10.5px] font-semibold tracking-[0.2em] uppercase"
            style={{ fontFamily: "var(--font-heading)", color: "rgba(255,255,255,0.65)" }}
          >
            {label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
