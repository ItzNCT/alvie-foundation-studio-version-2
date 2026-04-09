import { useRef, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import useRevealOnScroll from "@/hooks/useRevealOnScroll";
import useReducedMotion from "@/hooks/useReducedMotion";
import StatCards from "@/components/necessity/StatCards";
import SevenSecondTest from "@/components/necessity/SevenSecondTest";
import TornEdge from "@/components/ui/TornEdge";

const IMAGE_DESK =
  "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1400&h=700&fit=crop";

const NecessityCanvas = () => {
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          document.querySelectorAll(".mini-toc-row").forEach((r) => r.classList.remove("active"));
          document.querySelector(".mini-toc-row:nth-child(3)")?.classList.add("active");
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const header = useRevealOnScroll();
  const photoBreak = useRevealOnScroll();
  const globalStd = useRevealOnScroll();
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
      id="section-necessity"
      className="necessity-canvas relative"
      style={{
        zIndex: 15,
        backgroundColor: "hsl(var(--background))",
        minHeight: "100vh",
      }}
    >
      {/* Torn paper top edge */}
      <TornEdge variant={2} />

      <div style={{ ...elasticStyle, paddingTop: 120, paddingBottom: 120 }}>

        {/* ── BLOCK 1: Section Opener ── */}
        <div ref={header.ref} style={{ textAlign: "center" }}>
          <span
            className="font-body"
            style={{
              fontWeight: 500,
              fontSize: 14,
              color: "hsl(var(--secondary))",
              letterSpacing: "0.1em",
              ...revealStyle(header.revealed),
            }}
          >
            III
          </span>
          <div
            style={{
              width: 40,
              height: 1,
              background: "hsl(var(--secondary))",
              margin: "16px auto 0",
              ...revealStyle(header.revealed, 100),
            }}
          />
          <h2
            className="font-display font-bold"
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              color: "hsl(var(--primary))",
              lineHeight: 1.15,
              maxWidth: 700,
              margin: "24px auto 0",
              ...revealStyle(header.revealed, 200),
            }}
          >
            In today's market, your digital presence is your first handshake.
          </h2>
        </div>

        {/* 64px gap */}
        <div style={{ height: 64 }} />

        {/* ── BLOCK 2: Stat Cards ── */}
        <StatCards />

        {/* 48px gap */}
        <div style={{ height: 48 }} />

        {/* ── BLOCK 3: Full-Width Photo Break ── */}
        <div
          ref={photoBreak.ref}
          style={{
            position: "relative",
            borderRadius: 12,
            overflow: "hidden",
            minHeight: 360,
            maxHeight: 560,
            height: "50vh",
            ...revealStyle(photoBreak.revealed),
          }}
        >
          <img
            src={IMAGE_DESK}
            alt="Warm workspace with creative tools"
            className="alvie-photo alvie-photo-reveal"
            loading="lazy"
            width={1400}
            height={700}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transform: reducedMotion || photoBreak.revealed ? "scale(1)" : "scale(1.03)",
            }}
          />
          {/* Dark gradient overlay at bottom */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(26,26,24,0.7) 0%, transparent 60%)",
              pointerEvents: "none",
            }}
          />
          {/* Text overlay */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: isMobile ? 24 : 40,
            }}
          >
            <p
              className="font-body"
              style={{
                fontWeight: 300,
                fontSize: isMobile ? 15 : 17,
                color: "rgba(255,255,255,0.9)",
                maxWidth: 480,
                lineHeight: 1.7,
                ...revealStyle(photoBreak.revealed, 300),
              }}
            >
              A workshop with 5 employees and a corporation with 500 face the same
              reality: when someone hears about your business, the first thing they
              do is search for you online.
            </p>
          </div>
        </div>

        {/* 80px gap */}
        <div style={{ height: 80 }} />

        {/* ── BLOCK 4: 7-Second Test ── */}
        <SevenSecondTest />

        {/* 80px gap */}
        <div style={{ height: 80 }} />

        {/* ── BLOCK 5: "The Standard is Now Global" — Editorial Two-Column ── */}
        <div
          ref={globalStd.ref}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: 48,
            maxWidth: 900,
            margin: "0 auto",
            alignItems: "start",
          }}
        >
          <h3
            className="font-display font-bold"
            style={{
              fontSize: "clamp(32px, 4vw, 48px)",
              color: "hsl(var(--primary))",
              lineHeight: 1.15,
              textAlign: "left",
              ...revealStyle(globalStd.revealed),
            }}
          >
            The standard is now global.
          </h3>
          <p
            className="font-body"
            style={{
              fontWeight: 300,
              fontSize: 16,
              color: "hsl(var(--foreground) / 0.6)",
              lineHeight: 1.8,
              textAlign: "left",
              ...revealStyle(globalStd.revealed, 200),
            }}
          >
            Your digital presence isn't just a business card — it's your handshake,
            your office lobby, and your portfolio, all in one. A potential partner in
            Singapore judges your Da Nang workshop by the same criteria they use for
            agencies in London or Tokyo.
          </p>
        </div>

        {/* 64px gap */}
        <div style={{ height: 64 }} />

        {/* ── BLOCK 6: Pull Quote — Enhanced ── */}
        <div ref={pullQuote.ref} style={{ textAlign: "center", maxWidth: 550, margin: "0 auto", position: "relative" }}>
          {/* Decorative opening quotation mark */}
          <span
            className="font-display"
            aria-hidden="true"
            style={{
              position: "absolute",
              top: -24,
              left: isMobile ? -8 : -32,
              fontSize: 80,
              fontWeight: 800,
              color: "hsl(var(--secondary) / 0.15)",
              lineHeight: 1,
              userSelect: "none",
              pointerEvents: "none",
              ...revealStyle(pullQuote.revealed),
            }}
          >
            &ldquo;
          </span>

          <div
            style={{
              width: 48,
              height: 1,
              background: "hsl(var(--secondary))",
              margin: "0 auto",
              transform: reducedMotion || pullQuote.revealed ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "center",
              transition: "transform 500ms cubic-bezier(0.4,0,0.2,1)",
            }}
          />
          <p
            className="font-display font-bold italic"
            style={{
              fontSize: "clamp(22px, 3vw, 32px)",
              color: "hsl(var(--primary))",
              lineHeight: 1.4,
              marginTop: 32,
              transform: reducedMotion || pullQuote.revealed ? "scale(1)" : "scale(0.97)",
              opacity: reducedMotion || pullQuote.revealed ? 1 : 0,
              transition: "opacity 700ms cubic-bezier(0.4,0,0.2,1) 150ms, transform 700ms cubic-bezier(0.4,0,0.2,1) 150ms",
            }}
          >
            If your digital presence doesn't reflect your real capabilities, you're
            invisible to the people who matter most.
          </p>

          {/* Decorative closing quotation mark */}
          <span
            className="font-display"
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: -16,
              right: isMobile ? -8 : -32,
              fontSize: 80,
              fontWeight: 800,
              color: "hsl(var(--secondary) / 0.15)",
              lineHeight: 1,
              userSelect: "none",
              pointerEvents: "none",
              ...revealStyle(pullQuote.revealed, 300),
            }}
          >
            &rdquo;
          </span>
        </div>

      </div>

      {/* Torn paper bottom edge (inverted) */}
      <TornEdge variant={1} flip />
    </section>
  );
};

export default NecessityCanvas;
