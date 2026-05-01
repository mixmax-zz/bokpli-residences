"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";

// ─── Données ──────────────────────────────────────────────────────────────────
const TEMOIGNAGES = [
  {
    nom:       "Kofi Mensah",
    poste:     "Cadre supérieur",
    ville:     "Abidjan",
    initiales: "KM",
    citation:  "Dès la première visite du chantier, j'ai été conquis par la qualité de construction et le sérieux de l'équipe SCI Bokpli. J'ai réservé mon appartement 3 pièces (S+2) sans hésitation. Une résidence qui tient toutes ses promesses.",
  },
  {
    nom:       "Awa Diallo",
    poste:     "Entrepreneur",
    ville:     "Dakar",
    initiales: "AD",
    citation:  "J'ai investi dans deux appartements à la Résidence Bokpli. Le rapport qualité-prix est excellent et la localisation stratégique à Abidjan en fait un placement sûr et rentable sur le long terme.",
  },
  {
    nom:       "Maître Brou",
    poste:     "Notaire",
    ville:     "Plateau, Abidjan",
    initiales: "MB",
    citation:  "En tant que notaire partenaire de SCI Bokpli, j'ai pu constater le sérieux et la transparence du promoteur à chaque étape des transactions. Je recommande cette résidence à tous mes clients en recherche d'un bien de standing.",
  },
  {
    nom:       "Fatou Camara",
    poste:     "Médecin",
    ville:     "Cocody, Abidjan",
    initiales: "FC",
    citation:  "La Résidence Bokpli correspond exactement à ce que je cherchais : sécurité, prestations haut de gamme et une équipe disponible. Mon appartement sera prêt en 2027 et j'attends ça avec impatience.",
  },
  {
    nom:       "Jean-Pierre Kouassi",
    poste:     "Directeur financier",
    ville:     "Abidjan",
    initiales: "JK",
    citation:  "Un projet immobilier bien structuré avec des garanties solides. La transparence sur l'avancement des travaux et la qualité des matériaux choisis m'ont convaincu d'investir. Je ne regrette pas ma décision.",
  },
];

const AUTO_DELAY = 6000;

export default function Testimonials() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [current, setCurrent] = useState(0);
  const [paused,  setPaused]  = useState(false);

  const go = useCallback((idx: number) => {
    setCurrent(((idx % TEMOIGNAGES.length) + TEMOIGNAGES.length) % TEMOIGNAGES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setCurrent(p => (p + 1) % TEMOIGNAGES.length), AUTO_DELAY);
    return () => clearInterval(id);
  }, [paused]);

  const t = TEMOIGNAGES[current];

  return (
    <section
      ref={ref}
      aria-labelledby="testimonials-title"
      className="relative overflow-hidden py-24 lg:py-32"
      style={{ backgroundColor: "#B8892A" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Motif points discrets sur fond or */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)",
          backgroundSize:  "32px 32px",
        }}
        aria-hidden="true"
      />

      {/* Lueur centrale sombre */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,0,0,0.12) 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Ligne supérieure blanche */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.5), transparent)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">

        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          {/* Texte surtitres */}
          <p
            className="text-[11px] font-bold tracking-[0.4em] uppercase mb-4"
            style={{ fontFamily: "var(--font-heading)", color: "#0B1F3A" }}
          >
            Ils nous font confiance
          </p>
          {/* Titre principal : blanc sur or */}
          <h2
            id="testimonials-title"
            className="text-4xl md:text-5xl font-bold leading-[1.1]"
            style={{ fontFamily: "var(--font-serif)", color: "#fff" }}
          >
            <span style={{ color: "#0B1F3A" }}>Ce que disent</span>{" "}nos clients
          </h2>
          <div
            className="w-12 h-px mx-auto mt-5"
            style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)" }}
            aria-hidden="true"
          />
        </motion.div>

        {/* Carte flottante */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Guillemet géant décoratif */}
          <div
            className="absolute select-none pointer-events-none"
            style={{
              top:        "-20px",
              left:       "40px",
              fontFamily: "Georgia, serif",
              fontSize:   "180px",
              lineHeight: "1",
              color:      "rgba(11,31,58,0.07)",
              zIndex:     0,
            }}
            aria-hidden="true"
          >
            &ldquo;
          </div>

          {/* Carte — fond navy */}
          <div
            className="relative z-10"
            style={{
              background:   "#0B1F3A",
              border:       "1px solid rgba(184,137,42,0.25)",
              borderRadius: "6px",
              boxShadow:    "0 24px 64px rgba(0,0,0,0.35)",
            }}
          >
            {/* Trait or en haut de la carte */}
            <div
              className="absolute top-0 left-10 right-10 h-px"
              style={{ background: "linear-gradient(to right, transparent, #B8892A, transparent)" }}
              aria-hidden="true"
            />

            <div className="p-8 md:p-12">

              {/* Contenu animé — un seul bloc pour une transition fluide */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* En-tête auteur */}
                  <div className="flex items-center gap-5 mb-8">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "rgba(184,137,42,0.15)",
                        border:     "1.5px solid rgba(184,137,42,0.5)",
                      }}
                    >
                      <span
                        className="text-lg font-bold"
                        style={{ fontFamily: "var(--font-heading)", color: "#B8892A" }}
                      >
                        {t.initiales}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-[17px] font-bold"
                        style={{ fontFamily: "var(--font-heading)", color: "#fff" }}
                      >
                        {t.nom}
                      </p>
                      <p
                        className="text-[13px] mt-1"
                        style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.45)" }}
                      >
                        {t.poste} · {t.ville}
                      </p>
                    </div>
                  </div>

                  {/* Séparateur */}
                  <div
                    className="mb-8"
                    style={{ height: "1px", background: "rgba(184,137,42,0.15)" }}
                  />

                  {/* Citation */}
                  <blockquote
                    className="text-[17px] md:text-[19px] leading-[1.8] mb-10"
                    style={{
                      fontFamily: "var(--font-body)",
                      color:      "rgba(255,255,255,0.82)",
                      fontStyle:  "italic",
                      fontWeight: 400,
                    }}
                  >
                    &ldquo;{t.citation}&rdquo;
                  </blockquote>
                </motion.div>
              </AnimatePresence>

              {/* Pied : barre + points + flèches */}
              <div className="flex items-center gap-6">

                {/* Barre de progression */}
                <div
                  className="flex-1 overflow-hidden"
                  style={{ height: "1px", background: "rgba(184,137,42,0.2)" }}
                >
                  <motion.div
                    key={`bar-${current}`}
                    style={{ height: "100%", background: "#B8892A", transformOrigin: "left" }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: paused ? 0 : 1 }}
                    transition={{ duration: AUTO_DELAY / 1000, ease: "linear" }}
                  />
                </div>

                {/* Points */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {TEMOIGNAGES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => go(i)}
                      aria-label={`Témoignage ${i + 1}`}
                      style={{
                        width:        i === current ? "24px" : "6px",
                        height:       "6px",
                        borderRadius: "3px",
                        background:   i === current ? "#B8892A" : "rgba(255,255,255,0.2)",
                        border:       "none",
                        cursor:       "pointer",
                        transition:   "all 0.35s ease",
                        padding:      0,
                        flexShrink:   0,
                      }}
                    />
                  ))}
                </div>

                {/* Flèches */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {[
                    { dir: -1, label: "Précédent", path: "M10 12L6 8l4-4" },
                    { dir:  1, label: "Suivant",   path: "M6 4l4 4-4 4"   },
                  ].map(({ dir, label, path }) => (
                    <button
                      key={label}
                      onClick={() => go(current + dir)}
                      aria-label={label}
                      className="w-10 h-10 flex items-center justify-center transition-all duration-200"
                      style={{
                        background:   "rgba(184,137,42,0.08)",
                        border:       "1px solid rgba(184,137,42,0.25)",
                        borderRadius: "3px",
                        color:        "rgba(255,255,255,0.5)",
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = "#B8892A";
                        (e.currentTarget as HTMLElement).style.color       = "#B8892A";
                        (e.currentTarget as HTMLElement).style.background  = "rgba(184,137,42,0.15)";
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(184,137,42,0.25)";
                        (e.currentTarget as HTMLElement).style.color       = "rgba(255,255,255,0.5)";
                        (e.currentTarget as HTMLElement).style.background  = "rgba(184,137,42,0.08)";
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d={path} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  ))}
                </div>

              </div>
            </div>
          </div>

          {/* Ombre sous la carte */}
          <div
            className="absolute -bottom-6 left-12 right-12 h-8 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse, rgba(0,0,0,0.3) 0%, transparent 70%)",
              filter:     "blur(10px)",
            }}
            aria-hidden="true"
          />
        </motion.div>

      </div>

      {/* Ligne inférieure blanche */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.5), transparent)" }}
        aria-hidden="true"
      />
    </section>
  );
}
