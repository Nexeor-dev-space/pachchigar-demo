import HeroBanner from "@/components/HeroBanner";
import CinematicShowcase from "@/components/CinematicShowcase";
import GiveBoldlySection from "@/components/GiveBoldlySection";
import TrustBenefits from "@/components/TrustBenefits";
import CategoriesSection from "@/components/CategoriesSection";

export default function Home() {
  return (
    <main>
      <HeroBanner />
      <CinematicShowcase />
      <CategoriesSection />
      <GiveBoldlySection />
      <TrustBenefits />
    </main>
  );
}
