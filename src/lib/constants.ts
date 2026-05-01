// ─── Charte chromatique Résidences Bokpli ───────────────────────────────────
export const COLORS = {
  navyDeep:    "#0B1F3A", // Primaire — navigation, titres, fonds d'accent
  gold:        "#B8892A", // Prestige — CTA, icônes, accents
  goldPale:    "#F5EDD8", // Or pâle — fonds callout, encadrés premium
  navyPale:    "#E8EDF4", // Marine pâle — alternance sections, tableaux
  ink:         "#1C1C1E", // Texte principal
  stone:       "#4A4A4A", // Texte secondaire, légendes
  cloud:       "#F7F8FA", // Fond de page, cards
  available:   "#1B6B3A", // Badge Disponible
  reserved:    "#B45309", // Badge Réservé
  sold:        "#9B1C1C", // Badge Vendu
} as const;

// ─── Navigation ──────────────────────────────────────────────────────────────
export type NavDropdownItem = { label: string; href: string };
export type NavLink = {
  label: string;
  href: string;
  dropdown?: NavDropdownItem[];
};

export const NAV_LINKS: NavLink[] = [
  {
    label: "Appartements",
    href:  "/appartements",
    dropdown: [
      { label: "Studios (S0)",   href: "/appartements?type=S0"  },
      { label: "3 Pièces (S+2)", href: "/appartements?type=S+2" },
      { label: "5 Pièces (S+4)", href: "/appartements?type=S+4" },
      { label: "Duplex (S+6)",    href: "/appartements?type=S+6" },
    ],
  },
  { label: "Galerie",    href: "/galerie"    },
  { label: "Avancement", href: "/avancement" },
  { label: "À propos",   href: "/a-propos"   },
  { label: "Contact",    href: "/contact"    },
];

// ─── Infos société ───────────────────────────────────────────────────────────
export const SITE = {
  name:        "Résidences Bokpli",
  company:     "SCI BOKPLI",
  domain:      "www.bokpli.com",
  program:     "Immeuble R+6 · Appartements neufs",
  tagline:     "L'art de vivre autrement",
  whatsapp:    "",   // À renseigner
  phone:       "",   // À renseigner
  email:       "",   // À renseigner
  address:     "",   // À renseigner
} as const;

// ─── Typologies d'appartements ───────────────────────────────────────────────
export const APARTMENT_TYPES = ["S0", "S+2", "S+4", "S+6"] as const;
export type ApartmentType = typeof APARTMENT_TYPES[number];

// ─── Statuts ─────────────────────────────────────────────────────────────────
export const STATUSES = {
  disponible: { label: "Disponible", color: COLORS.available },
  reserve:    { label: "Réservé",    color: COLORS.reserved  },
  vendu:      { label: "Vendu",      color: COLORS.sold      },
} as const;
export type ApartmentStatus = keyof typeof STATUSES;
