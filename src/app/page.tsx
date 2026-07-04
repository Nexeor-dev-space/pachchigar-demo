import HeroBanner from "@/components/HeroBanner";
import CinematicShowcase from "@/components/CinematicShowcase";
import SignatureWorlds from "@/components/SignatureWorlds";
import CuratedCollections from "@/components/CuratedCollections";
import GiveBoldlySection from "@/components/GiveBoldlySection";
import TrustBenefits from "@/components/TrustBenefits";
import CommunityStories from "@/components/CommunityStories";

export default function Home() {
  return (
    <main>
      <HeroBanner />
      <CinematicShowcase />
      <SignatureWorlds />
      <CuratedCollections />
      <GiveBoldlySection />
      <TrustBenefits />
      <CommunityStories />
    </main>
  );
}
