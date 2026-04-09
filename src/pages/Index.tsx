import VerticalNav from "@/components/VerticalNav";
import HeroSection from "@/components/HeroSection";
import ScrollytellingUnified from "@/components/ScrollytellingUnified";
import ScrollytellingFreezeFrame from "@/components/ScrollytellingFreezeFrame";
import TheProblemSection from "@/components/TheProblemSection";

const Index = () => {
  return (
    <div className="min-h-screen page-wrapper">
      <VerticalNav />
      <ScrollytellingUnified />
      <HeroSection />
      <ScrollytellingFreezeFrame />
      <TheProblemSection />
    </div>
  );
};

export default Index;
