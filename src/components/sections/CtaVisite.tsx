"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarCheck } from "lucide-react";

// ─── Props ────────────────────────────────────────────────────────────────────
interface CtaVisiteProps {
  /** Image de fond (chemin dans /public). Défaut : slide-1.jpg */
  bgImage?:     string;
  /** Surtitre doré */
  surtitle?:    string;
  /** Titre principal */
  title?:       string;
  /** Texte descriptif */
  description?: string;
}

// ─── Composant ────────────────────────────────────────────────────────────────
export default function CtaVisite({
  bgImage     = "/images/hero/slide-1.jpg",
  surtitle    = "Intéressé par un appartement ?",
  title       = "Organisons une visite",
  description = "Notre équipe est disponible pour vous présenter les appartements, répondre à vos questions et vous accompagner dans votre projet d'acquisition.",
}: CtaVisiteProps) {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: "420px" }}>

      {/* Image de fond */}
      <Image
        src={bgImage}
        alt="Résidence Bokpli — Prenez rendez-vous"
        fill
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Overlay navy profond */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(6,15,30,0.78) 0%, rgba(11,31,58,0.88) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Ligne or haut */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background:
            "linear-gradient(to right, transparent, #B8892A, transparent)",
        }}
        aria-hidden="true"
      />

      {/* Halo or centré */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px", height: "300px",
          background:
            "radial-gradient(ellipse, rgba(184,137,42,0.18) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
        aria-hidden="true"
      />

      {/* Contenu */}
      <div
        className="relative z-10 max-w-2xl mx-auto px-6 text-center flex flex-col items-center justify-center"
        style={{ minHeight: "420px", paddingTop: "72px", paddingBottom: "72px" }}
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[11px] font-bold tracking-[0.4em] uppercase mb-3"
          style={{ fontFamily: "var(--font-heading)", color: "#B8892A" }}
        >
          {surtitle}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.08 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 leading-tight"
          style={{ fontFamily: "var(--font-serif)", color: "#fff" }}
        >
          {title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="text-[14px] leading-relaxed mb-10"
          style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.45)" }}
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.28 }}
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
            className="inline-flex items-center gap-2.5 px-8 py-4 font-bold tracking-[0.1em] uppercase transition-all"
            style={{
              background:     "transparent",
              color:          "#B8892A",
              border:         "1px solid rgba(184,137,42,0.45)",
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

      {/* Ligne or bas */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(184,137,42,0.35), transparent)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
