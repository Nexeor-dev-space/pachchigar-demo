import HeroBanner from "@/components/HeroBanner";
import LuxuryGifting from "@/components/LuxuryGifting";
import CinematicShowcase from "@/components/CinematicShowcase";
import TrustBenefits from "@/components/TrustBenefits";

export default function Home() {
  return (
    <main>
      <HeroBanner />
      <CinematicShowcase />
      <LuxuryGifting />
      <TrustBenefits />
    </main>
  );
}
