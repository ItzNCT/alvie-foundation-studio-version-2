import { useRef, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import useReducedMotion from "@/hooks/useReducedMotion";
import useRevealOnScroll from "@/hooks/useRevealOnScroll";
import PolaroidPath from "@/components/howwework/PolaroidPath";
import PhotoCultureBreak from "@/components/howwework/PhotoCultureBreak";
import ProjectKanban from "@/components/howwework/ProjectKanban";
import ClosingCTA from "@/components/howwework/ClosingCTA";
import TornEdge from "@/components/ui/TornEdge";

const HowWeWorkCanvas = () => {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          document.querySelectorAll(".mini-toc-row").forEach((r) => r.classList.remove("active"));
          document.querySelector(".mini-toc-row:nth-child(5)")?.classList.add("active");
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const reducedMotion = useReducedMotion();
  const opener = useRevealOnScroll();
  const kanbanHeader = useRevealOnScroll();

  const revealStyle = (revealed: boolean, delay = 0): React.CSSProperties => ({
    opacity: reducedMotion || revealed ? 1 : 0,
    transform: reducedMotion || revealed ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 700ms cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform 700ms cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
  });

  const elasticStyle: React.CSSProperties = {
    marginLeft: isMobile ? 0 : "var(--nav-width, 64px)",
    width: isMobile ? "100%" : "calc(100vw - var(--nav-width, 64px))",
    paddingLeft: isMobile ? 24 : "var(--safe-space, 48px)",
    paddingRight: isMobile ? 24 : "var(--safe-space, 48px)",
    transition:
      "margin-left 400ms cubic-bezier(0.4,0,0.2,1), width 400ms cubic-bezier(0.4,0,0.2,1)",
  };

  return (
    <section
      ref={sectionRef}
      id="section-howwework"
      className="howwework-canvas relative"
      style={{
        zIndex: 15,
        backgroundColor: "hsl(var(--background))",
        minHeight: "100vh",
      }}
    >
      {/* Torn Edge top */}
      <TornEdge variant={2} />

      <div style={{ ...elasticStyle, paddingTop: 120, paddingBottom: 100 }}>
        {/* BLOCK 1: Section Opener */}
        <div ref={opener.ref} style={{ textAlign: "center" }}>
          <span
            className="font-body"
            style={{
              fontWeight: 500,
              fontSize: 14,
              color: "hsl(var(--secondary))",
              letterSpacing: "0.1em",
              ...revealStyle(opener.revealed),
            }}
          >
            V
          </span>
          <div
            style={{
              width: 40,
              height: 1,
              background: "hsl(var(--secondary))",
              margin: "16px auto 0",
              ...revealStyle(opener.revealed, 100),
            }}
          />
          <h2
            className="font-display font-bold"
            style={{
              fontSize: "clamp(26px, 3.5vw, 44px)",
              color: "hsl(var(--primary))",
              lineHeight: 1.15,
              maxWidth: 650,
              margin: "24px auto 0",
              ...revealStyle(opener.revealed, 200),
            }}
          >
            Your project is not an assembly line. It's a conversation.
          </h2>
          <p
            className="font-body"
            style={{
              fontWeight: 300,
              fontSize: 16,
              color: "hsl(var(--foreground) / 0.6)",
              maxWidth: 520,
              margin: "24px auto 0",
              lineHeight: 1.8,
              ...revealStyle(opener.revealed, 300),
            }}
          >
            Every collaboration begins with listening — deeply, patiently — because the
            best solutions are already hidden in how you work every day.
          </p>
        </div>

        <div style={{ height: 64 }} />

        {/* BLOCK 2: Polaroid Editorial Path */}
        <PolaroidPath />

        <div style={{ height: 80 }} />

        {/* BLOCK 3: Photo Break + Culture Cards */}
        <PhotoCultureBreak />

        <div style={{ height: 80 }} />

        {/* BLOCK 4: Project Kanban */}
        <div ref={kanbanHeader.ref}>
          <h3
            className="font-display font-bold"
            style={{
              fontSize: "clamp(20px, 2.5vw, 28px)",
              color: "hsl(var(--primary))",
              textAlign: "left",
              ...revealStyle(kanbanHeader.revealed),
            }}
          >
            Inside a typical ALVIE project
          </h3>
        </div>
        <div style={{ height: 32 }} />
        <ProjectKanban />

        <div style={{ height: 64 }} />

        {/* BLOCK 5: Closing CTA */}
        <ClosingCTA />
      </div>

      {/* Torn Edge bottom (inverted) */}
      <TornEdge variant={1} flip />
    </section>
  );
};

export default HowWeWorkCanvas;
