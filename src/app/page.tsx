import HeroBanner from "@/components/HeroBanner";
import CinematicShowcase from "@/components/CinematicShowcase";
import GiveBoldlySection from "@/components/GiveBoldlySection";
import TrustBenefits from "@/components/TrustBenefits";

export default function Home() {
  return (
    <main>
      <HeroBanner />
      <CinematicShowcase />
      <GiveBoldlySection />
      <TrustBenefits />
    </main>
  );
}
