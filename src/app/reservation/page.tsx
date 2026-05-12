import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ReservationClient from "./ReservationClient";

export const metadata: Metadata = {
  title: "Réservation — Résidence Bokpli | Abidjan",
  description:
    "Réservez une visite ou demandez plus d'informations sur les appartements de la Résidence Bokpli. Notre équipe vous accompagne dans votre projet d'acquisition.",
};

export default function ReservationPage() {
  return (
    <>
      <Header />
      <main className="pt-[72px] lg:pt-[110px]">
        <ReservationClient />
      </main>
      <Footer />
    </>
  );
}
