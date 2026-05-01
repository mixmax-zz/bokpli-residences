"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, CalendarCheck, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, SITE } from "@/lib/constants";

// ─── Découpage de la nav : gauche | droite ────────────────────────────────────
// gauche  : Appartements, Galerie, Avancement
// droite  : À propos, Contact  →  + CTA Réservation
const NAV_LEFT  = NAV_LINKS.slice(0, 3);   // Appartements · Galerie · Avancement
const NAV_RIGHT = NAV_LINKS.slice(3);      // À propos · Contact

// ─── Metadata typologies ──────────────────────────────────────────────────────
const APT_META: Record<string, string> = {
  "Studios (S0)":   "30 – 32 m²",
  "3 Pièces (S+2)": "100 – 110 m²",
  "5 Pièces (S+4)": "224 – 230 m²",
  "Duplex (S+6)":    "375 m²",
};

// ─── Variants ─────────────────────────────────────────────────────────────────
const dropdownVariants = {
  hidden:  { opacity: 0, y: -8, transition: { duration: 0.18, ease: "easeIn"  } },
  visible: { opacity: 1, y:  0, transition: { duration: 0.24, ease: "easeOut" } },
};

const mobileMenuVariants = {
  hidden:  { x: "100%", transition: { duration: 0.3, ease: [0.4, 0, 1, 1]    } },
  visible: { x:     0,  transition: { duration: 0.35, ease: [0.0, 0, 0.2, 1] } },
};

const mobileItemVariants = {
  hidden:  { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1, x: 0,
    transition: { delay: 0.05 + i * 0.055, duration: 0.25, ease: "easeOut" },
  }),
};

const mobileSubVariants = {
  hidden:  { height: 0, opacity: 0, transition: { duration: 0.2  } },
  visible: { height: "auto", opacity: 1, transition: { duration: 0.28 } },
};

// ─── Composant NavLink desktop ────────────────────────────────────────────────
function DesktopLink({
  label, href, dropdown, isActive, openDropdown, onEnter, onLeave,
}: {
  label: string;
  href: string;
  dropdown?: { label: string; href: string }[];
  isActive: (href: string) => boolean;
  openDropdown: string | null;
  onEnter: (label: string) => void;
  onLeave: () => void;
}) {
  const active = isActive(href);

  const linkClass = cn(
    "flex items-center gap-1.5 h-full px-5",
    "font-[family-name:var(--font-heading)] text-[12.5px] font-medium tracking-[0.05em] uppercase",
    "border-b-2 transition-colors duration-200 focus-visible:outline-none",
    active || (dropdown && openDropdown === label)
      ? "text-[#B8892A] border-[#B8892A]"
      : "text-white/70 border-transparent hover:text-white hover:border-white/25"
  );

  if (dropdown) {
    return (
      <div
        className="relative h-full"
        onMouseEnter={() => onEnter(label)}
        onMouseLeave={onLeave}
      >
        <button type="button" aria-haspopup="true" aria-expanded={openDropdown === label} className={linkClass}>
          {label}
          <motion.span
            animate={{ rotate: openDropdown === label ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={12} strokeWidth={2.5} />
          </motion.span>
        </button>

        <AnimatePresence>
          {openDropdown === label && (
            <motion.div
              role="menu"
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onMouseEnter={() => onEnter(label)}
              onMouseLeave={onLeave}
              className="absolute top-full left-0 w-60 bg-[#0d2440] border-t-2 border-[#B8892A] shadow-[0_20px_44px_rgba(0,0,0,0.45)] z-20 overflow-hidden"
            >
              {dropdown.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  role="menuitem"
                  className={cn(
                    "flex items-center justify-between px-5 py-3.5 group",
                    "border-b border-white/[0.06] last:border-b-0",
                    "transition-all duration-150",
                    isActive(item.href)
                      ? "bg-[#B8892A]/10 text-[#B8892A]"
                      : "text-white/80 hover:text-white hover:bg-white/[0.05] hover:pl-7"
                  )}
                >
                  <div>
                    <p className="text-[13px] font-semibold font-[family-name:var(--font-heading)]">
                      {item.label}
                    </p>
                    {APT_META[item.label] && (
                      <p className="text-[11px] text-white/35 mt-0.5 font-[family-name:var(--font-body)]">
                        {APT_META[item.label]}
                      </p>
                    )}
                  </div>
                  <ArrowRight
                    size={13}
                    className={cn(
                      "transition-all duration-200 flex-shrink-0",
                      isActive(item.href)
                        ? "text-[#B8892A]"
                        : "text-transparent group-hover:text-[#B8892A] group-hover:translate-x-1"
                    )}
                  />
                </Link>
              ))}
              <Link
                href="/appartements"
                className="flex items-center justify-between px-5 py-3 bg-[#B8892A]/8 hover:bg-[#B8892A]/15 border-t border-[#B8892A]/20 transition-colors group"
              >
                <span className="text-[11px] font-bold text-[#B8892A] tracking-[0.08em] uppercase font-[family-name:var(--font-heading)]">
                  Voir tous les appartements
                </span>
                <ArrowRight size={11} className="text-[#B8892A] group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <Link href={href} className={linkClass}>
      {label}
    </Link>
  );
}

// ─── Header principal ─────────────────────────────────────────────────────────
export default function Header() {
  const [scrolled,       setScrolled]       = useState(false);
  const [menuOpen,       setMenuOpen]       = useState(false);
  const [openDropdown,   setOpenDropdown]   = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const pathname   = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleScroll = useCallback(() => setScrolled(window.scrollY > 10), []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
    setMobileExpanded(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  };
  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.split("?")[0]);

  return (
    <>
      {/* ══ HEADER ════════════════════════════════════════════════════════ */}
      <header
        aria-label="Navigation principale"
        className={cn(
          "fixed top-0 left-0 right-0 z-50 bg-[#0B1F3A]",
          "transition-shadow duration-300",
          scrolled && "shadow-[0_2px_24px_rgba(0,0,0,0.4)]"
        )}
      >
        {/* Ligne or supérieure */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(to right, transparent, #B8892A, transparent)" }}
          aria-hidden="true"
        />

        {/* ── Desktop ─────────────────────────────────────────────────── */}
        <div className="hidden lg:block max-w-7xl mx-auto px-8">
          <div className="flex items-stretch h-[110px]">

            {/* Logo gauche */}
            <Link
              href="/"
              aria-label="Résidences Bokpli — Accueil"
              className="flex-shrink-0 flex items-center mr-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8892A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1F3A] rounded-sm"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-start"
              >
                <Image
                  src="/logos/logo_residence_bokpli.svg"
                  alt="Résidences Bokpli"
                  width={340}
                  height={86}
                  priority
                  className="h-16 w-auto"
                />
                {/* SCI BOKPLI sous le logo */}
                <div className="flex items-center gap-3 mt-1 w-full">
                  <span className="flex-1 h-px bg-gradient-to-r from-transparent to-[#B8892A]/50" />
                  <span className="text-[7.5px] font-semibold text-[#B8892A]/70 tracking-[0.25em] uppercase font-[family-name:var(--font-heading)] whitespace-nowrap">
                    SCI BOKPLI
                  </span>
                  <span className="flex-1 h-px bg-gradient-to-l from-transparent to-[#B8892A]/50" />
                </div>
              </motion.div>
            </Link>

            {/* Nav — tous les liens au centre */}
            <nav aria-label="Menu principal" className="flex items-stretch flex-1">
              {NAV_LINKS.map(({ label, href, dropdown }, i) => (
                <div key={href} className="flex items-stretch">
                  {i > 0 && (
                    <div className="flex items-center h-full">
                      <div className="w-px h-5 bg-white/15 flex-shrink-0" aria-hidden="true" />
                    </div>
                  )}
                  <DesktopLink
                    label={label}
                    href={href}
                    dropdown={dropdown}
                    isActive={isActive}
                    openDropdown={openDropdown}
                    onEnter={handleEnter}
                    onLeave={handleLeave}
                  />
                </div>
              ))}
            </nav>

            {/* CTA droite */}
            <div className="flex items-center gap-3 pl-4 flex-shrink-0">
              <Link
                href="/reservation"
                className={cn(
                  "inline-flex items-center gap-2 px-5 py-2.5",
                  "bg-[#B8892A] hover:bg-[#9a7322]",
                  "text-white text-[11.5px] font-bold tracking-[0.1em] uppercase",
                  "font-[family-name:var(--font-heading)]",
                  "transition-colors duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8892A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1F3A]"
                )}
              >
                <CalendarCheck size={13} strokeWidth={2} />
                Réservation
              </Link>
            </div>
          </div>
        </div>


        {/* ── Mobile ──────────────────────────────────────────────────── */}
        <div className="lg:hidden max-w-full px-5">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo mobile (gauche) */}
            <Link
              href="/"
              aria-label="Résidences Bokpli — Accueil"
              className="flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8892A] rounded-sm"
            >
              <Image
                src="/logos/logo_residence_bokpli.svg"
                alt="Résidences Bokpli"
                width={260}
                height={65}
                priority
                className="h-11 w-auto"
              />
            </Link>

            {/* Hamburger animé */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="flex flex-col justify-center items-center gap-[5px] w-10 h-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8892A]"
            >
              <motion.span
                animate={menuOpen
                  ? { rotate: 45, y: 7.5, backgroundColor: "#B8892A" }
                  : { rotate: 0, y: 0, backgroundColor: "rgba(255,255,255,0.8)" }
                }
                transition={{ duration: 0.22 }}
                className="block w-[22px] h-[1.5px] origin-center"
              />
              <motion.span
                animate={menuOpen
                  ? { opacity: 0, scaleX: 0 }
                  : { opacity: 1, scaleX: 1, backgroundColor: "rgba(255,255,255,0.8)" }
                }
                transition={{ duration: 0.15 }}
                className="block w-[22px] h-[1.5px]"
              />
              <motion.span
                animate={menuOpen
                  ? { rotate: -45, y: -7.5, backgroundColor: "#B8892A" }
                  : { rotate: 0, y: 0, backgroundColor: "rgba(255,255,255,0.8)" }
                }
                transition={{ duration: 0.22 }}
                className="block w-[22px] h-[1.5px] origin-center"
              />
            </button>
          </div>
        </div>

        {/* Ligne or inférieure */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(to right, transparent, #B8892A, transparent)" }}
          aria-hidden="true"
        />
      </header>

      {/* ══ MENU MOBILE — Slide depuis la droite ══════════════════════════ */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 lg:hidden bg-black/60"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Panneau latéral */}
            <motion.div
              id="mobile-menu"
              key="panel"
              role="dialog"
              aria-modal="true"
              aria-label="Menu de navigation"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed top-0 right-0 bottom-0 z-50 lg:hidden w-[300px] bg-[#0B1F3A] flex flex-col shadow-[−8px_0_40px_rgba(0,0,0,0.5)]"
            >
              {/* Ligne or à gauche du panneau */}
              <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-gradient-to-b from-[#B8892A] via-[#d4a84b] to-[#B8892A]" aria-hidden="true" />

              {/* En-tête panneau */}
              <div className="flex items-center justify-between px-7 h-[64px] border-b border-white/10 flex-shrink-0">
                <span className="text-[11px] font-bold text-[#B8892A]/70 tracking-[0.2em] uppercase font-[family-name:var(--font-heading)]">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Fermer le menu"
                  className="flex items-center justify-center w-8 h-8 hover:bg-white/8 transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8892A]"
                >
                  <X size={18} className="text-white/70" />
                </button>
              </div>

              {/* Navigation */}
              <nav aria-label="Navigation mobile" className="flex-1 overflow-y-auto px-4 pt-4">
                {NAV_LINKS.map(({ label, href, dropdown }, i) => (
                  <motion.div
                    key={href}
                    custom={i}
                    variants={mobileItemVariants}
                    initial="hidden"
                    animate="visible"
                    className="border-b border-white/8"
                  >
                    {dropdown ? (
                      <>
                        <button
                          type="button"
                          onClick={() => setMobileExpanded((v) => v === label ? null : label)}
                          className={cn(
                            "flex items-center justify-between w-full py-4 px-3",
                            "font-[family-name:var(--font-heading)] text-[14px] font-medium tracking-[0.03em]",
                            "transition-colors duration-200",
                            isActive(href) ? "text-[#B8892A]" : "text-white/80 hover:text-white"
                          )}
                        >
                          {label}
                          <motion.span
                            animate={{ rotate: mobileExpanded === label ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown size={15} className="text-[#B8892A]" />
                          </motion.span>
                        </button>

                        <AnimatePresence initial={false}>
                          {mobileExpanded === label && (
                            <motion.ul
                              variants={mobileSubVariants}
                              initial="hidden"
                              animate="visible"
                              exit="hidden"
                              className="overflow-hidden pb-2"
                            >
                              {dropdown.map((item) => (
                                <li key={item.href}>
                                  <Link
                                    href={item.href}
                                    onClick={() => setMenuOpen(false)}
                                    className={cn(
                                      "flex items-center justify-between py-3 pl-5 pr-3",
                                      "border-l-2 ml-3 transition-all duration-200",
                                      "font-[family-name:var(--font-heading)] text-[13.5px] font-medium",
                                      isActive(item.href)
                                        ? "border-[#B8892A] text-[#B8892A] pl-6"
                                        : "border-white/15 text-white/55 hover:text-white hover:border-[#B8892A]/50 hover:pl-6"
                                    )}
                                  >
                                    {item.label}
                                    {APT_META[item.label] && (
                                      <span className="text-[11px] text-white/28 font-[family-name:var(--font-body)]">
                                        {APT_META[item.label]}
                                      </span>
                                    )}
                                  </Link>
                                </li>
                              ))}
                              <li>
                                <Link
                                  href="/appartements"
                                  onClick={() => setMenuOpen(false)}
                                  className="flex items-center gap-2 py-2.5 pl-5 ml-3 text-[11.5px] font-bold text-[#B8892A]/55 hover:text-[#B8892A] uppercase tracking-[0.08em] font-[family-name:var(--font-heading)] transition-colors group"
                                >
                                  <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                                  Voir tous
                                </Link>
                              </li>
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={href}
                        onClick={() => setMenuOpen(false)}
                        className={cn(
                          "flex items-center justify-between w-full py-4 px-3",
                          "font-[family-name:var(--font-heading)] text-[14px] font-medium tracking-[0.03em]",
                          "transition-colors duration-200",
                          isActive(href) ? "text-[#B8892A]" : "text-white/80 hover:text-white"
                        )}
                      >
                        {label}
                        <ArrowRight size={13} className="text-white/20" />
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>

              {/* CTA mobile */}
              <div className="px-4 py-6 space-y-2.5 border-t border-white/10 flex-shrink-0">
                <Link
                  href="/reservation"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#B8892A] hover:bg-[#9a7322] text-white text-[12px] font-bold tracking-[0.1em] uppercase font-[family-name:var(--font-heading)] transition-colors"
                >
                  <CalendarCheck size={14} strokeWidth={2} />
                  Réservation
                </Link>

                {SITE.whatsapp && (
                  <a
                    href={`https://wa.me/${SITE.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 border border-white/20 hover:border-white/40 text-white/65 hover:text-white text-[12px] font-medium font-[family-name:var(--font-heading)] transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp
                  </a>
                )}

                <p className="text-center text-[9.5px] font-semibold text-white/20 tracking-[0.2em] uppercase font-[family-name:var(--font-body)] pt-1">
                  {SITE.company} · {SITE.domain}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
