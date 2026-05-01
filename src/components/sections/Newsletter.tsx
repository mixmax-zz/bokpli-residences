"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Check, Camera, BellRing, Tag, Newspaper } from "lucide-react";

// ─── Promesses abonnés ────────────────────────────────────────────────────────
const PROMESSES = [
  { icon: Camera,   label: "Suivi du chantier",   desc: "Photos & vidéos exclusives" },
  { icon: BellRing, label: "Disponibilités",       desc: "Alertes en avant-première"  },
  { icon: Tag,      label: "Offres spéciales",     desc: "Conditions préférentielles"  },
  { icon: Newspaper,label: "Actualités",           desc: "Toutes les nouveautés"       },
];

// ─── Variants ─────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { delay: d, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ─── Section Newsletter ───────────────────────────────────────────────────────
export default function Newsletter() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const [email,     setEmail]     = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) { setError("Adresse e-mail invalide."); return; }
    setError("");
    setLoading(true);
    // Simulation envoi — remplacez par votre API
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section
      ref={ref}
      aria-labelledby="newsletter-title"
      className="relative overflow-hidden"
      style={{ backgroundColor: "#0B1F3A" }}
    >
      {/* ── Fond image avec overlay ──────────────────────────────────────── */}
      <div className="absolute inset-0">
        <img
          src="/images/hero/slide-1.jpg"
          alt=""
          aria-hidden="true"
          style={{
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center",
            display: "block",
          }}
        />
        {/* Overlay dégradé navy profond */}
        <div
          className="absolute inset-0"
          style={{
            background: "rgba(15,15,15,0.88)",
          }}
          aria-hidden="true"
        />
        {/* Motif points subtil */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(circle, #B8892A 1px, transparent 1px)",
            backgroundSize:  "28px 28px",
          }}
          aria-hidden="true"
        />
      </div>

      {/* ── Ligne or supérieure ──────────────────────────────────────────── */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, #B8892A, transparent)" }}
        aria-hidden="true"
      />

      {/* ── Contenu ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 lg:py-32 flex flex-col items-center text-center">

        {/* Surtitre */}
        <motion.p
          custom={0.1}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-[11px] font-bold tracking-[0.4em] uppercase mb-4"
          style={{ fontFamily: "var(--font-heading)", color: "#B8892A" }}
        >
          Inscription à la Newsletter
        </motion.p>

        {/* Séparateur */}
        <motion.span
          custom={0.15}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="block w-10 h-px mb-6"
          style={{ background: "linear-gradient(to right, transparent, #B8892A, transparent)" }}
          aria-hidden="true"
        />

        {/* Titre */}
        <motion.h2
          id="newsletter-title"
          custom={0.2}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-5"
          style={{ fontFamily: "var(--font-serif)", color: "#fff" }}
        >
          Ne manquez aucune <span style={{ color: "#B8892A" }}>nouveauté</span>
        </motion.h2>

        {/* Sous-titre */}
        <motion.p
          custom={0.3}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-[15px] leading-relaxed mb-10 max-w-lg"
          style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.45)" }}
        >
          Inscrivez-vous pour recevoir en exclusivité les actualités de la Résidence Bokpli.
        </motion.p>

        {/* Promesses */}
        <motion.div
          custom={0.35}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 w-full"
        >
          {PROMESSES.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 px-3 py-4"
              style={{
                background:   "rgba(184,137,42,0.15)",
                border:       "1px solid rgba(184,137,42,0.35)",
                borderRadius: "3px",
              }}
            >
              <Icon size={18} strokeWidth={1.4} style={{ color: "#B8892A" }} />
              <span
                className="text-[12px] font-bold"
                style={{ fontFamily: "var(--font-heading)", color: "#fff" }}
              >
                {label}
              </span>
              <span
                className="text-[11px] text-center"
                style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.35)" }}
              >
                {desc}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Formulaire / Confirmation */}
        <motion.div
          custom={0.45}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="w-full max-w-lg"
        >
          {submitted ? (
            /* ── Message de succès ── */
            <div
              className="flex flex-col items-center gap-4 py-8 px-6"
              style={{
                background:   "rgba(27,107,58,0.12)",
                border:       "1px solid rgba(27,107,58,0.35)",
                borderRadius: "3px",
              }}
            >
              <div
                className="w-12 h-12 flex items-center justify-center"
                style={{ background: "rgba(27,107,58,0.2)", borderRadius: "50%" }}
              >
                <Check size={22} style={{ color: "#4ade80" }} />
              </div>
              <p
                className="text-[15px] font-semibold"
                style={{ fontFamily: "var(--font-heading)", color: "#fff" }}
              >
                Inscription confirmée !
              </p>
              <p
                className="text-[13px] text-center"
                style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.45)" }}
              >
                Vous recevrez prochainement toutes les actualités de la Résidence Bokpli.
              </p>
            </div>
          ) : (
            /* ── Formulaire ── */
            <form onSubmit={handleSubmit} noValidate>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(""); }}
                  placeholder="Votre adresse e-mail"
                  required
                  aria-label="Adresse e-mail"
                  className="flex-1 px-5 py-4 outline-none transition-all duration-200"
                  style={{
                    background:   "rgba(255,255,255,0.06)",
                    border:       error
                      ? "1px solid rgba(239,68,68,0.6)"
                      : "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "3px",
                    color:        "#fff",
                    fontFamily:   "var(--font-body)",
                    fontSize:     "14px",
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = "#B8892A")}
                  onBlur={e => (e.currentTarget.style.borderColor = error ? "rgba(239,68,68,0.6)" : "rgba(255,255,255,0.12)")}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 px-7 py-4 font-bold tracking-[0.08em] uppercase transition-all duration-300"
                  style={{
                    background:   loading ? "rgba(184,137,42,0.5)" : "#B8892A",
                    color:        "#fff",
                    borderRadius: "3px",
                    fontFamily:   "var(--font-heading)",
                    fontSize:     "12px",
                    border:       "none",
                    cursor:       loading ? "not-allowed" : "pointer",
                    whiteSpace:   "nowrap",
                  }}
                >
                  {loading ? (
                    <span
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                    />
                  ) : (
                    <>
                      S'inscrire
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </div>
              {error && (
                <p
                  className="mt-2 text-[12px] text-left"
                  style={{ fontFamily: "var(--font-body)", color: "rgba(239,68,68,0.8)" }}
                >
                  {error}
                </p>
              )}
              <p
                className="mt-4 text-[11px] leading-relaxed"
                style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.3)" }}
              >
                En vous inscrivant, vous acceptez notre{" "}
                <a
                  href="https://www.mediapluscom.net/politique-de-confidentialite"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#B8892A", textDecoration: "underline", fontWeight: "bold" }}
                >
                  politique de confidentialité
                </a>
                .<br />
                Pas de spam, désabonnement simple.
              </p>
            </form>
          )}
        </motion.div>

      </div>

      {/* ── Ligne or inférieure ──────────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, #B8892A, transparent)" }}
        aria-hidden="true"
      />
    </section>
  );
}
