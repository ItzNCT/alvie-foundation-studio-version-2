import { useRef, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import useRevealOnScroll from "@/hooks/useRevealOnScroll";
import useReducedMotion from "@/hooks/useReducedMotion";
import ProcessTimeline from "@/components/solution/ProcessTimeline";
import ServicesBento from "@/components/solution/ServicesBento";
import ValuePillars from "@/components/solution/ValuePillars";
import TestimonialChat from "@/components/solution/TestimonialChat";
import CaseStudyPreview from "@/components/solution/CaseStudyPreview";
import TornEdge from "@/components/ui/TornEdge";

const SolutionCanvas = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          document.querySelectorAll(".mini-toc-row").forEach((r) => r.classList.remove("active"));
          document.querySelector(".mini-toc-row:nth-child(4)")?.classList.add("active");
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();

  const opener = useRevealOnScroll();
  const servicesHeader = useRevealOnScroll();
  const chatPillarsReveal = useRevealOnScroll();
  const caseHeader = useRevealOnScroll();
  const pullQuote = useRevealOnScroll();

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
      id="section-solution"
      className="solution-canvas relative"
      style={{
        zIndex: 15,
        backgroundColor: "hsl(var(--background))",
        minHeight: "100vh",
      }}
    >
      {/* Torn Edge top */}
      <TornEdge variant={1} />

      <div style={{ ...elasticStyle, paddingTop: 120, paddingBottom: 100 }}>
        {/* BLOCK 1: Editorial Opener — Text Left + Process Timeline Right */}
        <div
          ref={opener.ref}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? 40 : 48,
            maxWidth: 1000,
            margin: "0 auto",
            alignItems: "center",
          }}
        >
          {/* Left — text */}
          <div>
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
              IV
            </span>
            <div
              style={{
                width: 40,
                height: 1,
                background: "hsl(var(--secondary))",
                margin: "16px 0",
                ...revealStyle(opener.revealed, 100),
              }}
            />
            <h2
              className="font-display font-bold"
              style={{
                fontSize: "clamp(26px, 3.5vw, 42px)",
                color: "hsl(var(--primary))",
                lineHeight: 1.2,
                ...revealStyle(opener.revealed, 200),
              }}
            >
              We begin where others skip.
            </h2>
            <p
              className="font-body"
              style={{
                fontWeight: 300,
                fontSize: 16,
                color: "hsl(var(--foreground) / 0.6)",
                lineHeight: 1.8,
                marginTop: 20,
                ...revealStyle(opener.revealed, 300),
              }}
            >
              Every project starts with deep research into how your business actually
              operates. We don't rely on guesswork or templates — we uncover your hidden
              strengths and translate them into a digital presence that speaks for itself.
            </p>
          </div>

          {/* Right — Process Timeline */}
          <div style={revealStyle(opener.revealed, 200)}>
            <ProcessTimeline />
          </div>
        </div>

        <div style={{ height: 80 }} />

        {/* BLOCK 2: Services Header + Bento */}
        <div ref={servicesHeader.ref}>
          <h3
            className="font-display font-bold"
            style={{
              fontSize: "clamp(24px, 3vw, 36px)",
              color: "hsl(var(--primary))",
              textAlign: "left",
              ...revealStyle(servicesHeader.revealed),
            }}
          >
            What we build for you
          </h3>
        </div>
        <div style={{ height: 32 }} />
        <ServicesBento />

        <div style={{ height: 80 }} />

        {/* BLOCK 3: Testimonial Chat + Value Pillars — SIDE BY SIDE */}
        <div
          ref={chatPillarsReveal.ref}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? 48 : 48,
            maxWidth: 1000,
            margin: "0 auto",
            alignItems: "start",
          }}
        >
          {/* Left — Chat */}
          <div style={revealStyle(chatPillarsReveal.revealed)}>
            <TestimonialChat />
          </div>

          {/* Right — Value Pillars */}
          <div style={revealStyle(chatPillarsReveal.revealed, 150)}>
            <h3
              className="font-display font-bold"
              style={{
                fontSize: "clamp(22px, 2.5vw, 32px)",
                color: "hsl(var(--primary))",
              }}
            >
              What makes ALVIE different
            </h3>
            <div style={{ height: 32 }} />
            <ValuePillars compact />
          </div>
        </div>

        <div style={{ height: 80 }} />

        {/* BLOCK 4: Case Study */}
        <div ref={caseHeader.ref}>
          <h3
            className="font-display font-bold"
            style={{
              fontSize: "clamp(24px, 3vw, 36px)",
              color: "hsl(var(--primary))",
              textAlign: "left",
              ...revealStyle(caseHeader.revealed),
            }}
          >
            Our work in action
          </h3>
          <p
            className="font-body"
            style={{
              fontWeight: 300,
              fontSize: 15,
              color: "hsl(var(--foreground) / 0.45)",
              textAlign: "left",
              marginTop: 8,
              ...revealStyle(caseHeader.revealed, 100),
            }}
          >
            See how we've helped businesses align their digital presence with their true
            capabilities
          </p>
        </div>
        <div style={{ height: 48 }} />
        <CaseStudyPreview />

        <div style={{ height: 48 }} />

        {/* BLOCK 5: Pull Quote */}
        <div
          ref={pullQuote.ref}
          style={{
            textAlign: "center",
            maxWidth: 550,
            margin: "0 auto",
            position: "relative",
            padding: "40px 0",
          }}
        >
          {/* Decorative opening quote */}
          <span
            className="font-display"
            style={{
              position: "absolute",
              top: 0,
              left: -20,
              fontSize: 64,
              fontWeight: 800,
              color: "hsl(var(--secondary) / 0.12)",
              lineHeight: 1,
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            "
          </span>
          <p
            className="font-display font-bold italic"
            style={{
              fontSize: "clamp(20px, 2.5vw, 28px)",
              color: "hsl(var(--primary))",
              lineHeight: 1.4,
              transform: reducedMotion || pullQuote.revealed ? "scale(1)" : "scale(0.97)",
              opacity: reducedMotion || pullQuote.revealed ? 1 : 0,
              transition:
                "opacity 700ms cubic-bezier(0.4,0,0.2,1) 150ms, transform 700ms cubic-bezier(0.4,0,0.2,1) 150ms",
            }}
          >
            Working with ALVIE is never just a transaction; it is a true partnership
            between people building real value together.
          </p>
        </div>
      </div>

      {/* Torn Edge bottom (inverted) */}
      <TornEdge variant={2} flip />
    </section>
  );
};

export default SolutionCanvas;
