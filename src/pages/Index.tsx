import VerticalNav from "@/components/VerticalNav";
import HeroSection from "@/components/HeroSection";
import ScrollytellingUnified from "@/components/ScrollytellingUnified";
import CanvasSection from "@/components/CanvasSection";
import ScrollytellingFreezeFrame from "@/components/ScrollytellingFreezeFrame";
import CinematicHeaderNecessity from "@/components/CinematicHeaderNecessity";
import NecessityCanvas from "@/components/NecessityCanvas";
import CinematicHeaderSolution from "@/components/CinematicHeaderSolution";
import SolutionCanvas from "@/components/SolutionCanvas";
import CinematicHeaderHowWeWork from "@/components/CinematicHeaderHowWeWork";
import HowWeWorkCanvas from "@/components/HowWeWorkCanvas";
import CinematicHeaderAboutUs from "@/components/CinematicHeaderAboutUs";
import AboutUsCanvas from "@/components/AboutUsCanvas";
import CinematicHeaderFAQ from "@/components/CinematicHeaderFAQ";
import FAQCanvas from "@/components/FAQCanvas";
import MiniTOC from "@/components/MiniTOC";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen page-wrapper">
      <VerticalNav />

      {/* Fixed layers (don't move with scroll) */}
      {/* z-30: HeroSection (fixed) */}
      {/* z-10: ScrollytellingUnified sticky viewport */}
      {/* z-3: CinematicHeaderNecessity + CinematicHeaderSolution (fixed, revealed by uncover) */}

      <ScrollytellingUnified />
      <HeroSection />
      <ScrollytellingFreezeFrame />

      {/* Scrolling layers (normal document flow) */}
      {/* z-15: Canvas sections slide over fixed layers */}
      <CanvasSection />

      {/* Sentinel + fixed header for "The Necessity" — revealed as Canvas scrolls away */}
      <CinematicHeaderNecessity />

      {/* Necessity white canvas covers the header */}
      <NecessityCanvas />

      {/* Sentinel + fixed header for "Our Solution" — revealed as Necessity canvas scrolls away */}
      <CinematicHeaderSolution />

      {/* Solution white canvas covers the header */}
      <SolutionCanvas />

      {/* Sentinel + fixed header for "How We Work" */}
      <CinematicHeaderHowWeWork />

      {/* How We Work canvas covers the header */}
      <HowWeWorkCanvas />

      {/* Sentinel + fixed header for "About Us" */}
      <CinematicHeaderAboutUs />

      {/* About Us canvas covers the header */}
      <AboutUsCanvas />

      {/* Sentinel + fixed header for "FAQ" */}
      <CinematicHeaderFAQ />

      {/* FAQ canvas covers the header */}
      <FAQCanvas />

      <MiniTOC />
      <Footer />
    </div>
  );
};

export default Index;
