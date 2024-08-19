import CallToActionSection from "@/components/landing/calltoaction";
import FeatureSection from "@/components/landing/featuresection";
import HeroSection from "@/components/landing/hero";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeatureSection />
      <CallToActionSection />
    </main>
  );
}
