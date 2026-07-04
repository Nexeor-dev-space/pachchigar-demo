import HeroBanner from "@/components/HeroBanner";
import CinematicShowcase from "@/components/CinematicShowcase";
import SignatureWorlds from "@/components/SignatureWorlds";
import GiveBoldlySection from "@/components/GiveBoldlySection";
import TrustBenefits from "@/components/TrustBenefits";

export default function Home() {
  return (
    <main>
      <HeroBanner />
      <CinematicShowcase />
      <SignatureWorlds />
      <GiveBoldlySection />
      <TrustBenefits />
    </main>
  );
}
