import HeroSection from "@/components/HeroSection";
import ScrollytellingUnified from "@/components/ScrollytellingUnified";
import ScrollytellingFreezeFrame from "@/components/ScrollytellingFreezeFrame";
import TheProblemSection from "@/components/TheProblemSection";
import SolutionSection from "@/components/SolutionSection";

const Index = () => {
  return (
    <div className="min-h-screen page-wrapper">
      <ScrollytellingUnified />
      <HeroSection />
      <ScrollytellingFreezeFrame />
      <TheProblemSection />
      <SolutionSection />
    </div>
  );
};

export default Index;
