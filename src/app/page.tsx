import HeroBanner from "@/components/HeroBanner";

import SignatureWorlds from "@/components/SignatureWorlds";
import CuratedCollections from "@/components/CuratedCollections";
import GiveBoldlySection from "@/components/GiveBoldlySection";
import TrustBenefits from "@/components/TrustBenefits";
import CommunityStories from "@/components/CommunityStories";

export default function Home() {
  return (
    <main className="flex flex-col">
      <HeroBanner />

      <SignatureWorlds />
      <CuratedCollections />
      <GiveBoldlySection />
      <TrustBenefits />
      <CommunityStories />
    </main>
  );
}
