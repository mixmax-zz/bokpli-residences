import { Suspense } from "react";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AppartementsClient from "./AppartementsClient";

export const metadata: Metadata = {
  title: "Appartements — Résidence Bokpli | Abidjan",
  description:
    "Découvrez le catalogue complet des appartements de la Résidence Bokpli à Abidjan : studios, 3 pièces, 5 pièces et duplex de prestige. Tous disponibles, livraison 2027.",
};

export default async function AppartementsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const params = await searchParams;
  const initialType = params.type ?? "tous";

  return (
    <>
      <Header />
      <main className="pt-[72px] lg:pt-[110px]">
        <Suspense>
          <AppartementsClient initialType={initialType} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
