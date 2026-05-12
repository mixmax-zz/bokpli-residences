"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarCheck, CheckCircle2, Phone, Mail, MapPin } from "lucide-react";
import CtaVisite from "@/components/sections/CtaVisite";

// ─── Types d'appartements disponibles ────────────────────────────────────────
const TYPES_APPART = [
  "Studio (32 m²)",
  "Appartement 3 pièces Type A (70 m²)",
  "Appartement 3 pièces Type B (75 m²)",
  "Appartement 3 pièces Type C (80 m²)",
  "Appartement 3 pièces PMR (75 m²)",
  "Appartement 5 pièces Niveau 4 – 1 (125 m²)",
  "Appartement 5 pièces Niveau 4 – 2 (130 m²)",
  "Duplex de Prestige (200 m²)",
];

// ─── Champs du formulaire ─────────────────────────────────────────────────────
interface FormData {
  prenom:   string;
  nom:      string;
  email:    string;
  telephone: string;
  type:     string;
  message:  string;
}

const INITIAL: FormData = {
  prenom:    "",
  nom:       "",
  email:     "",
  telephone: "",
  type:      "",
  message:   "",
};

// ─── Composant principal ───────────────────────────────────────────────────────
export default function ReservationClient() {
  const [form, setForm]       = useState<FormData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulation envoi (à remplacer par API route si besoin)
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <>
      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: "420px" }}>
        <Image
          src="/images/hero/slide-2.jpg"
          alt="Réservez votre appartement — Résidence Bokpli"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(6,15,30,0.75) 0%, rgba(11,31,58,0.88) 100%)",
          }}
          aria-hidden="true"
        />
        {/* Ligne or haut */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background: "linear-gradient(to right, transparent, #B8892A, transparent)",
          }}
          aria-hidden="true"
        />

        <div
          className="relative z-10 max-w-3xl mx-auto px-6 text-center flex flex-col items-center justify-center"
          style={{ minHeight: "420px", paddingTop: "80px", paddingBottom: "80px" }}
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[11px] font-bold tracking-[0.4em] uppercase mb-4"
            style={{ fontFamily: "var(--font-heading)", color: "#B8892A" }}
          >
            RÉSIDENCE BOKPLI · SCI BOKPLI
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5"
            style={{ fontFamily: "var(--font-serif)", color: "#fff" }}
          >
            Réserver une{" "}
            <span style={{ color: "#B8892A" }}>visite</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[15px] leading-relaxed max-w-xl"
            style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.55)" }}
          >
            Remplissez le formulaire ci-dessous et notre équipe vous contactera
            sous 24 h pour confirmer votre rendez-vous.
          </motion.p>
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

      {/* ── CORPS : formulaire + contact ────────────────────────────────────── */}
      <section
        className="py-20 px-6"
        style={{ backgroundColor: "#F9F7F4" }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* ── Formulaire ─────────────────────────────────────────────────── */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="bg-white rounded-sm shadow-md overflow-hidden"
              style={{ borderTop: "3px solid #B8892A" }}
            >
              <div className="px-8 py-8">
                <h2
                  className="text-2xl font-bold mb-1"
                  style={{ fontFamily: "var(--font-serif)", color: "#0B1F3A" }}
                >
                  Votre demande
                </h2>
                <p
                  className="text-[13px] mb-8"
                  style={{ fontFamily: "var(--font-body)", color: "#6B7280" }}
                >
                  Tous les champs marqués <span style={{ color: "#B8892A" }}>*</span> sont obligatoires.
                </p>

                {submitted ? (
                  /* ── Message de confirmation ───────────────────────────── */
                  <div
                    className="flex flex-col items-center text-center py-10 gap-5"
                  >
                    <CheckCircle2 size={52} style={{ color: "#B8892A" }} strokeWidth={1.5} />
                    <h3
                      className="text-xl font-bold"
                      style={{ fontFamily: "var(--font-serif)", color: "#0B1F3A" }}
                    >
                      Demande envoyée !
                    </h3>
                    <p
                      className="text-[14px] leading-relaxed max-w-sm"
                      style={{ fontFamily: "var(--font-body)", color: "#6B7280" }}
                    >
                      Merci <strong>{form.prenom}</strong>, notre équipe vous contactera
                      sous 24 h pour confirmer votre visite.
                    </p>
                    <button
                      onClick={() => { setForm(INITIAL); setSubmitted(false); }}
                      className="mt-2 text-[12px] font-bold tracking-[0.15em] uppercase underline underline-offset-4"
                      style={{ color: "#B8892A", fontFamily: "var(--font-heading)" }}
                    >
                      Nouvelle demande
                    </button>
                  </div>
                ) : (
                  /* ── Formulaire ────────────────────────────────────────── */
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                    {/* Prénom + Nom */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field
                        label="Prénom" name="prenom" required
                        value={form.prenom} onChange={handleChange}
                        placeholder="Jean"
                      />
                      <Field
                        label="Nom" name="nom" required
                        value={form.nom} onChange={handleChange}
                        placeholder="Dupont"
                      />
                    </div>

                    {/* Email + Téléphone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field
                        label="Adresse e-mail" name="email" type="email" required
                        value={form.email} onChange={handleChange}
                        placeholder="jean@exemple.com"
                      />
                      <Field
                        label="Téléphone" name="telephone" type="tel"
                        value={form.telephone} onChange={handleChange}
                        placeholder="+225 07 00 00 00 00"
                      />
                    </div>

                    {/* Type d'appartement */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="type"
                        className="text-[11px] font-bold tracking-[0.18em] uppercase"
                        style={{ fontFamily: "var(--font-heading)", color: "#0B1F3A" }}
                      >
                        Type d'appartement souhaité
                      </label>
                      <select
                        id="type"
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-[14px] outline-none transition-colors"
                        style={{
                          fontFamily: "var(--font-body)",
                          color: form.type ? "#0B1F3A" : "#9CA3AF",
                          border: "1px solid #E5E7EB",
                          borderRadius: "3px",
                          background: "#fff",
                        }}
                      >
                        <option value="">— Sélectionnez un type —</option>
                        {TYPES_APPART.map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="message"
                        className="text-[11px] font-bold tracking-[0.18em] uppercase"
                        style={{ fontFamily: "var(--font-heading)", color: "#0B1F3A" }}
                      >
                        Message <span style={{ color: "#9CA3AF", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(facultatif)</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Précisez vos questions, disponibilités ou toute autre information utile…"
                        className="w-full px-4 py-3 text-[14px] resize-none outline-none transition-colors"
                        style={{
                          fontFamily: "var(--font-body)",
                          color: "#0B1F3A",
                          border: "1px solid #E5E7EB",
                          borderRadius: "3px",
                          background: "#fff",
                        }}
                      />
                    </div>

                    {/* Bouton */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="mt-2 inline-flex items-center justify-center gap-2.5 px-8 py-4 font-bold tracking-[0.12em] uppercase transition-opacity"
                      style={{
                        background:   "#B8892A",
                        color:        "#fff",
                        borderRadius: "3px",
                        fontFamily:   "var(--font-heading)",
                        fontSize:     "12px",
                        opacity:      loading ? 0.7 : 1,
                        cursor:       loading ? "not-allowed" : "pointer",
                        border:       "none",
                      }}
                    >
                      <CalendarCheck size={15} strokeWidth={2} />
                      {loading ? "Envoi en cours…" : "Envoyer ma demande"}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>

          {/* ── Infos de contact ────────────────────────────────────────────── */}
          <aside className="lg:col-span-2 flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.1 }}
            >
              <p
                className="text-[10px] font-bold tracking-[0.35em] uppercase mb-3"
                style={{ fontFamily: "var(--font-heading)", color: "#B8892A" }}
              >
                Nous contacter
              </p>
              <h3
                className="text-2xl font-bold mb-6 leading-snug"
                style={{ fontFamily: "var(--font-serif)", color: "#0B1F3A" }}
              >
                Notre équipe est<br />à votre disposition
              </h3>

              <div className="flex flex-col gap-6">
                <ContactItem
                  icon={<Phone size={16} strokeWidth={1.8} />}
                  label="Téléphone"
                  value="+225 07 00 00 00 00"
                  href="tel:+2250700000000"
                />
                <ContactItem
                  icon={<Mail size={16} strokeWidth={1.8} />}
                  label="E-mail"
                  value="contact@bokpli.com"
                  href="mailto:contact@bokpli.com"
                />
                <ContactItem
                  icon={<MapPin size={16} strokeWidth={1.8} />}
                  label="Adresse"
                  value="Abidjan, Côte d'Ivoire"
                />
              </div>
            </motion.div>

            {/* Encart Horaires */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-sm p-6"
              style={{ background: "#0B1F3A" }}
            >
              <p
                className="text-[10px] font-bold tracking-[0.3em] uppercase mb-4"
                style={{ fontFamily: "var(--font-heading)", color: "#B8892A" }}
              >
                Horaires d'ouverture
              </p>
              <div className="flex flex-col gap-2">
                {[
                  { j: "Lundi – Vendredi", h: "08 h 00 – 18 h 00" },
                  { j: "Samedi",           h: "09 h 00 – 14 h 00" },
                  { j: "Dimanche",         h: "Sur rendez-vous" },
                ].map(({ j, h }) => (
                  <div key={j} className="flex justify-between items-center">
                    <span
                      className="text-[12px]"
                      style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.55)" }}
                    >
                      {j}
                    </span>
                    <span
                      className="text-[12px] font-semibold"
                      style={{ fontFamily: "var(--font-body)", color: "#fff" }}
                    >
                      {h}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Image décorative */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="relative rounded-sm overflow-hidden"
              style={{ height: "200px" }}
            >
              <Image
                src="/images/appartements/exterieur-1.jpg"
                alt="Résidence Bokpli — Vue extérieure"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(11,31,58,0.55) 0%, transparent 60%)",
                }}
                aria-hidden="true"
              />
              <div className="absolute bottom-4 left-4">
                <span
                  className="text-[10px] font-bold tracking-[0.25em] uppercase"
                  style={{ fontFamily: "var(--font-heading)", color: "rgba(255,255,255,0.8)" }}
                >
                  Résidence Bokpli · Abidjan
                </span>
              </div>
            </motion.div>
          </aside>
        </div>
      </section>

      {/* ── CTA BAS DE PAGE ─────────────────────────────────────────────────── */}
      <CtaVisite
        bgImage="/images/hero/slide-3.jpg"
        surtitle="Des questions sur votre projet ?"
        title="Parlons de votre projet"
        description="Notre équipe est disponible pour vous accompagner dans votre démarche d'acquisition et répondre à toutes vos questions."
      />
    </>
  );
}

// ─── Sous-composant : champ texte ─────────────────────────────────────────────
function Field({
  label, name, type = "text", value, onChange, placeholder, required,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={name}
        className="text-[11px] font-bold tracking-[0.18em] uppercase"
        style={{ fontFamily: "var(--font-heading)", color: "#0B1F3A" }}
      >
        {label}{required && <span style={{ color: "#B8892A" }}> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 text-[14px] outline-none transition-colors"
        style={{
          fontFamily:   "var(--font-body)",
          color:        "#0B1F3A",
          border:       "1px solid #E5E7EB",
          borderRadius: "3px",
          background:   "#fff",
        }}
      />
    </div>
  );
}

// ─── Sous-composant : item de contact ─────────────────────────────────────────
function ContactItem({
  icon, label, value, href,
}: {
  icon:   React.ReactNode;
  label:  string;
  value:  string;
  href?:  string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div
        className="flex items-center justify-center shrink-0 mt-0.5"
        style={{
          width: "36px", height: "36px",
          background: "rgba(184,137,42,0.12)",
          borderRadius: "3px",
          color: "#B8892A",
        }}
      >
        {icon}
      </div>
      <div>
        <p
          className="text-[10px] font-bold tracking-[0.2em] uppercase mb-0.5"
          style={{ fontFamily: "var(--font-heading)", color: "#9CA3AF" }}
        >
          {label}
        </p>
        {href ? (
          <a
            href={href}
            className="text-[14px] font-medium transition-colors hover:opacity-70"
            style={{ fontFamily: "var(--font-body)", color: "#0B1F3A", textDecoration: "none" }}
          >
            {value}
          </a>
        ) : (
          <p
            className="text-[14px] font-medium"
            style={{ fontFamily: "var(--font-body)", color: "#0B1F3A" }}
          >
            {value}
          </p>
        )}
      </div>
    </div>
  );
}
