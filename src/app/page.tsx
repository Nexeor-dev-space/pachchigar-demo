import HeroBanner from "@/components/HeroBanner";
import NewCollection from "@/components/NewCollection";

import SignatureWorlds from "@/components/SignatureWorlds";
import CuratedCollections from "@/components/CuratedCollections";
import BestSellers from "@/components/BestSellers";
import WeddingCollection from "@/components/WeddingCollection";
import GiveBoldlySection from "@/components/GiveBoldlySection";
import TrustBenefits from "@/components/TrustBenefits";
import CommunityStories from "@/components/CommunityStories";

export default function Home() {
  return (
    <main className="flex flex-col">
      <HeroBanner />
      <NewCollection />
      <SignatureWorlds />
      <BestSellers />
      <CuratedCollections />
      <WeddingCollection />
      <GiveBoldlySection />
      <TrustBenefits />
      <CommunityStories />
    </main>
  );
}
