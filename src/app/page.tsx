import Header        from "@/components/layout/Header";
import Footer         from "@/components/layout/Footer";
import Hero           from "@/components/sections/Hero";
import Stats          from "@/components/sections/Stats";
import Appartements   from "@/components/sections/Appartements";
import Avantages      from "@/components/sections/Avantages";
import Avancement     from "@/components/sections/Avancement";
import Newsletter     from "@/components/sections/Newsletter";
import Catalogue      from "@/components/sections/Catalogue";
import Testimonials   from "@/components/sections/Testimonials";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <Appartements />
        <Avantages />
        <Avancement />
        <Newsletter />
        <Catalogue />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
