"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FileDown } from "lucide-react";

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { delay: d, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

const POINTS = [
  "Plans et surfaces de chaque appartement",
  "Grille tarifaire et conditions de vente",
  "Prestations et matériaux haut de gamme",
  "Date de livraison et avancement du chantier",
];

export default function Catalogue() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      aria-labelledby="catalogue-title"
      className="relative overflow-hidden"
      style={{ backgroundColor: "#0B1F3A" }}
    >
      {/* Ligne or supérieure */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, #B8892A, transparent)" }}
        aria-hidden="true"
      />

      {/* Motif points */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle, #B8892A 1px, transparent 1px)",
          backgroundSize:  "24px 24px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Colonne gauche : texte ── */}
          <div>
            <motion.p
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="text-[11px] font-bold tracking-[0.35em] uppercase mb-3"
              style={{ fontFamily: "var(--font-heading)", color: "#B8892A" }}
            >
              Catalogue officiel de la Résidence Bokpli
            </motion.p>

            <motion.span
              custom={0.08}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="block w-10 h-px mb-6"
              style={{ background: "linear-gradient(to right, #B8892A, transparent)" }}
              aria-hidden="true"
            />

            <motion.h2
              id="catalogue-title"
              custom={0.15}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="text-4xl md:text-5xl font-bold leading-[1.1] mb-5"
              style={{ fontFamily: "var(--font-serif)", color: "#fff" }}
            >
              Téléchargez<br />
              <span style={{ color: "#B8892A" }}>notre catalogue</span>
            </motion.h2>

            <motion.p
              custom={0.22}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="text-[14px] leading-relaxed mb-8"
              style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.45)" }}
            >
              Plans détaillés, types d'appartements, prestations, vous trouverez tout ce qu'il faut pour faire votre choix. Votre nouvelle adresse de prestige à Abidjan, où la modernité reflète l'art de vivre à la perfection.
            </motion.p>

            {/* Points clés */}
            <motion.ul
              custom={0.28}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="flex flex-col gap-3"
              style={{ listStyle: "none", padding: 0, margin: 0 }}
            >
              {POINTS.map((pt) => (
                <li key={pt} className="flex items-center gap-3">
                  <span
                    className="flex-shrink-0 w-5 h-5 flex items-center justify-center"
                    style={{
                      background:   "rgba(184,137,42,0.15)",
                      border:       "1px solid rgba(184,137,42,0.4)",
                      borderRadius: "2px",
                    }}
                  >
                    <svg width="9" height="9" viewBox="0 0 10 8" fill="none">
                      <polyline points="1,4 3.5,7 9,1" stroke="#B8892A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span
                    className="text-[13px]"
                    style={{ fontFamily: "var(--font-body)", color: "#B8892A" }}
                  >
                    {pt}
                  </span>
                </li>
              ))}
            </motion.ul>

            {/* Bouton */}
            <motion.div
              custom={0.35}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="flex items-center gap-4"
              style={{ marginTop: "3rem" }}
            >
              <motion.a
                href="/documents/catalogue-bokpli.pdf"
                download
                className="inline-flex items-center gap-3 px-8 py-4 font-bold tracking-[0.08em] uppercase"
                style={{
                  background:     "#B8892A",
                  color:          "#fff",
                  borderRadius:   "3px",
                  fontFamily:     "var(--font-heading)",
                  fontSize:       "13px",
                  textDecoration: "none",
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <FileDown size={17} strokeWidth={1.8} />
                Télécharger le catalogue
              </motion.a>
            </motion.div>
          </div>

          {/* ── Colonne droite : aperçu catalogue ── */}
          <motion.div
            custom={0.2}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative" style={{ width: "380px" }}>
              {/* Ombres empilées derrière */}
              <div
                className="absolute"
                style={{
                  bottom: "-12px", right: "-12px",
                  width: "380px", height: "520px",
                  background: "rgba(184,137,42,0.08)",
                  border: "1px solid rgba(184,137,42,0.12)",
                  borderRadius: "4px",
                }}
                aria-hidden="true"
              />
              <div
                className="absolute"
                style={{
                  bottom: "-6px", right: "-6px",
                  width: "380px", height: "520px",
                  background: "rgba(184,137,42,0.14)",
                  border: "1px solid rgba(184,137,42,0.2)",
                  borderRadius: "4px",
                }}
                aria-hidden="true"
              />

              {/* Couverture principale */}
              <a
                href="/documents/catalogue-bokpli.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden block"
                style={{
                  width: "380px", height: "520px",
                  borderRadius: "4px",
                  border: "1px solid rgba(184,137,42,0.35)",
                  cursor: "pointer",
                }}
                title="Ouvrir le catalogue"
              >
                {/* Trait doré en haut */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] z-10"
                  style={{ background: "#B8892A" }}
                  aria-hidden="true"
                />

                <img
                  src="/documents/couverture.jpg"
                  alt="Couverture du catalogue Résidence Bokpli"
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "cover", objectPosition: "center",
                    display: "block",
                  }}
                />

              </a>
            </div>
          </motion.div>

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
