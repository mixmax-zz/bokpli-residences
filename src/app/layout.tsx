import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Résidences Bokpli — L'art de vivre autrement",
    template: "%s | Résidences Bokpli",
  },
  description:
    "Résidences Bokpli — Immeuble R+6, appartements neufs en VEFA. Studios S0, 3 Pièces S+2, 5 Pièces S+4 et 6 Pièces S+6 de standing. SCI BOKPLI.",
  keywords: [
    "appartements neufs",
    "résidences Bokpli",
    "SCI BOKPLI",
    "immeuble R+6",
    "VEFA",
    "immobilier premium",
  ],
  openGraph: {
    type:        "website",
    locale:      "fr_FR",
    url:         "https://www.bokpli.com",
    siteName:    "Résidences Bokpli",
    title:       "Résidences Bokpli — L'art de vivre autrement",
    description: "Découvrez les appartements neufs de l'immeuble Résidences Bokpli. Studios S0, 3 Pièces S+2, 5 Pièces S+4 et 6 Pièces S+6 de standing.",
    images: [{ url: "/images/og-cover.jpg", width: 1200, height: 630, alt: "Résidences Bokpli" }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "Résidences Bokpli — L'art de vivre autrement",
    description: "Appartements neufs de standing — SCI BOKPLI",
  },
  metadataBase: new URL("https://www.bokpli.com"),
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        {children}
      </body>
    </html>
  );
}
