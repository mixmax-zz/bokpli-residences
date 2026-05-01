"use client";

import { MapPin, Phone, Mail, Facebook, Instagram } from "lucide-react";

// ─── Données ──────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "À propos",    href: "#about"       },
  { label: "Avancement",  href: "#avancement"  },
  { label: "Réservation", href: "#reservation" },
  { label: "Galerie",     href: "#galerie"     },
  { label: "Contact",     href: "#contact"     },
];

const APT_LINKS = [
  { label: "Studios (S0)",   href: "/appartements?type=S0",              external: false },
  { label: "3 Pièces (S+2)", href: "/appartements?type=S+2",             external: false },
  { label: "5 Pièces (S+4)", href: "/appartements?type=S+4",             external: false },
  { label: "Duplex (S+6)",   href: "/appartements?type=S+6",             external: false },
  { label: "Catalogue",      href: "/documents/catalogue-bokpli.pdf",    external: true  },
];

const RESEAUX = [
  { icon: Facebook,  label: "Facebook",  href: "https://facebook.com" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
];

// WhatsApp SVG custom (non disponible dans lucide)
function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

// YouTube SVG custom
function YouTubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer aria-label="Pied de page" style={{ backgroundColor: "#0B1F3A" }}>

      {/* ── Ligne or supérieure ── */}
      <div
        style={{ height: "3px", background: "linear-gradient(to right, transparent, #B8892A, transparent)" }}
        aria-hidden="true"
      />

      {/* ── Corps principal ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* Colonne 1 : Logo SCI Bokpli + description + réseaux */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="mb-5">
              <img
                src="/logos/logo_sci_bokpli.svg"
                alt="SCI Bokpli"
                style={{
                  height: "90px",
                  width: "auto",
                  objectFit: "contain",
                  filter: "brightness(0) saturate(100%) invert(62%) sepia(55%) saturate(700%) hue-rotate(5deg) brightness(88%)",
                }}
              />
            </div>
            <div
              className="w-10 h-px mb-5"
              style={{ background: "#B8892A" }}
              aria-hidden="true"
            />
            <p
              className="text-[13px] leading-relaxed"
              style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.35)" }}
            >
              SCI Bokpli est un promoteur immobilier ivoirien spécialisé dans la construction de résidence de haut standing et luxueuse.
            </p>

            {/* Réseaux sociaux */}
            <div className="flex items-center gap-5 mt-6">
              {RESEAUX.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="transition-all duration-200"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#B8892A"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)"; }}
                >
                  <Icon size={20} strokeWidth={1.5} />
                </a>
              ))}
              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="transition-all duration-200"
                style={{ color: "rgba(255,255,255,0.45)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#B8892A"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)"; }}
              >
                <YouTubeIcon />
              </a>
              {/* WhatsApp */}
              <a
                href="https://wa.me/2250747230070"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="transition-all duration-200"
                style={{ color: "rgba(255,255,255,0.45)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#B8892A"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)"; }}
              >
                <WhatsAppIcon />
              </a>
            </div>
          </div>

          {/* Colonne 2 : Navigation */}
          <div>
            <h3
              className="text-[11px] font-bold tracking-[0.3em] uppercase mb-6"
              style={{ fontFamily: "var(--font-heading)", color: "#B8892A" }}
            >
              Navigation
            </h3>
            <ul className="flex flex-col gap-3" style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-[13px] transition-colors duration-200"
                    style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.4)", textDecoration: "none" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#B8892A")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 : Appartements */}
          <div>
            <h3
              className="text-[11px] font-bold tracking-[0.3em] uppercase mb-6"
              style={{ fontFamily: "var(--font-heading)", color: "#B8892A" }}
            >
              Appartements
            </h3>
            <ul className="flex flex-col gap-3" style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {APT_LINKS.map(({ label, href, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="text-[13px] transition-colors duration-200"
                    style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.4)", textDecoration: "none" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#B8892A")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 : Contacts */}
          <div>
            <h3
              className="text-[11px] font-bold tracking-[0.3em] uppercase mb-6"
              style={{ fontFamily: "var(--font-heading)", color: "#B8892A" }}
            >
              Contacts
            </h3>
            <ul className="flex flex-col gap-4" style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li className="flex items-start gap-3">
                <MapPin size={15} strokeWidth={1.5} className="flex-shrink-0 mt-0.5" style={{ color: "#B8892A" }} />
                <span
                  className="text-[13px] leading-relaxed"
                  style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.4)" }}
                >
                   Riviera Palmeraie,<br />Cocody Abidjan,<br />Côte d'Ivoire.
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} strokeWidth={1.5} className="flex-shrink-0" style={{ color: "#B8892A" }} />
                <a
                  href="tel:+2250747230070"
                  className="text-[13px] transition-colors duration-200"
                  style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.4)", textDecoration: "none" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#B8892A")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
                >
                  +225 07 47 23 00 70
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} strokeWidth={1.5} className="flex-shrink-0" style={{ color: "#B8892A" }} />
                <a
                  href="mailto:info@bokpli.com"
                  className="text-[13px] transition-colors duration-200"
                  style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.4)", textDecoration: "none" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#B8892A")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
                >
                  info@bokpli.com
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* ── Barre inférieure : mentions légales ── */}
      <div
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">

          <p
            className="text-[11px] text-center md:text-left"
            style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.2)" }}
          >
            Copyright © 2026 SCI Bokpli · Société Immobilière · Tous droits réservés.
          </p>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            {[
              { label: "Mentions légales",            href: "#" },
              { label: "Politique de confidentialité", href: "https://www.mediapluscom.net/politique-de-confidentialite" },
              { label: "Politique de cookies",         href: "#" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-[11px] transition-colors duration-200"
                style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.2)", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#B8892A")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.2)")}
              >
                {label}
              </a>
            ))}
          </div>

        </div>
      </div>

    </footer>
  );
}
