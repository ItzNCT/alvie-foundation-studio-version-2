import { useEffect, useState, useRef } from "react";
import { Search, Compass, PenTool, SlidersHorizontal, Sprout } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import useReducedMotion from "@/hooks/useReducedMotion";
import useRevealOnScroll from "@/hooks/useRevealOnScroll";

const phases = [
  {
    num: "01",
    title: "Discovery",
    body: "We begin by listening. Through deep research and first-principle thinking, we study how your business actually operates — not how you think it operates. We find the truth behind the surface.",
    Icon: Search,
    animation: { transform: "translateX(-8px)", animName: "scan" },
  },
  {
    num: "02",
    title: "Strategy",
    body: "We translate raw insights into a clear digital roadmap. Every design decision will trace back to a strategic reason. Nothing decorative — everything intentional.",
    Icon: Compass,
    animation: { animName: "spin" },
  },
  {
    num: "03",
    title: "Design",
    body: "Strategy becomes visible. We craft your brand identity, website, and every digital touchpoint as a bespoke creation — refined until it resonates with the exact right audience.",
    Icon: PenTool,
    animation: { animName: "draw" },
  },
  {
    num: "04",
    title: "Refine",
    body: "We don't launch at 'good enough.' Through honest feedback and objective critique, we push every detail until it meets the highest international standard. No ego — only quality.",
    Icon: SlidersHorizontal,
    animation: { animName: "pulse-scale" },
  },
  {
    num: "05",
    title: "Launch & beyond",
    body: "Your digital presence goes live — but our partnership doesn't end. We provide ongoing support because a brand is a living thing that grows and evolves alongside your business.",
    Icon: Sprout,
    animation: { animName: "float" },
  },
];

const iconKeyframes = `
@keyframes hww-scan { 0%,100%{transform:translateX(-8px)} 50%{transform:translateX(8px)} }
@keyframes hww-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes hww-draw { 0%,100%{transform:translate(-4px,4px)} 50%{transform:translate(4px,-4px)} }
@keyframes hww-pulse-scale { 0%,100%{transform:scale(1)} 50%{transform:scale(1.08)} }
@keyframes hww-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
`;

const animationMap: Record<string, string> = {
  scan: "hww-scan 3s ease-in-out infinite",
  spin: "hww-spin 12s linear infinite",
  draw: "hww-draw 2s ease infinite",
  "pulse-scale": "hww-pulse-scale 2.5s ease infinite",
  float: "hww-float 3s ease infinite alternate",
};

const PhaseItem = ({
  phase,
  index,
  isMobile,
  reducedMotion,
}: {
  phase: (typeof phases)[0];
  index: number;
  isMobile: boolean;
  reducedMotion: boolean;
}) => {
  const { ref, revealed } = useRevealOnScroll(0.15);
  const isEven = index % 2 === 1;
  const slideDir = isEven ? 20 : -20;

  const revealStyle: React.CSSProperties = {
    opacity: reducedMotion || revealed ? 1 : 0,
    transform:
      reducedMotion || revealed
        ? "translate(0,0)"
        : `translate(${isMobile ? 0 : slideDir}px, 20px)`,
    transition:
      "opacity 700ms cubic-bezier(0.4,0,0.2,1), transform 700ms cubic-bezier(0.4,0,0.2,1)",
  };

  const textSide = (
    <div style={{ position: "relative", maxWidth: 340 }}>
      <span
        className="font-display"
        style={{
          fontWeight: 800,
          fontSize: 56,
          color: "rgba(212,154,90,0.12)",
          position: "absolute",
          top: -16,
          left: -8,
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {phase.num}
      </span>
      <h4
        className="font-display font-bold"
        style={{ fontSize: 22, color: "hsl(var(--primary))", position: "relative" }}
      >
        {phase.title}
      </h4>
      <p
        className="font-body"
        style={{
          fontWeight: 300,
          fontSize: 15,
          color: "hsl(var(--foreground) / 0.6)",
          lineHeight: 1.8,
          marginTop: 12,
        }}
      >
        {phase.body}
      </p>
    </div>
  );

  const visualSide = (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          width: 180,
          height: 180,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 140,
            height: 140,
            borderRadius: "50%",
            background: "rgba(212,154,90,0.06)",
          }}
        />
        <phase.Icon
          size={48}
          style={{
            color: "hsl(var(--secondary))",
            animation: reducedMotion ? "none" : animationMap[phase.animation.animName],
            position: "relative",
          }}
        />
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <div ref={ref} style={{ ...revealStyle, marginBottom: 64 }}>
        {visualSide}
        <div style={{ marginTop: 24 }}>{textSide}</div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 48,
        alignItems: "center",
        maxWidth: 850,
        margin: "0 auto",
        marginBottom: 64,
        ...revealStyle,
      }}
    >
      {isEven ? (
        <>
          {visualSide}
          {textSide}
        </>
      ) : (
        <>
          {textSide}
          {visualSide}
        </>
      )}
    </div>
  );
};

const UnfoldingPath = () => {
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  const headerReveal = useRevealOnScroll();

  return (
    <div>
      <style>{iconKeyframes}</style>
      <div ref={headerReveal.ref}>
        <h3
          className="font-display font-bold"
          style={{
            fontSize: "clamp(24px, 3vw, 36px)",
            color: "hsl(var(--primary))",
            textAlign: "left",
            opacity: reducedMotion || headerReveal.revealed ? 1 : 0,
            transform: reducedMotion || headerReveal.revealed ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 700ms cubic-bezier(0.4,0,0.2,1), transform 700ms cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          How every project unfolds
        </h3>
      </div>
      <div style={{ height: 48 }} />

      <div style={{ position: "relative" }}>
        {/* Center connecting line (desktop only) */}
        {!isMobile && (
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 64,
              width: 1,
              background: "rgba(212,154,90,0.12)",
              transform: "translateX(-0.5px)",
              pointerEvents: "none",
            }}
          />
        )}

        {phases.map((phase, i) => (
          <PhaseItem
            key={phase.num}
            phase={phase}
            index={i}
            isMobile={isMobile}
            reducedMotion={reducedMotion}
          />
        ))}
      </div>
    </div>
  );
};

export default UnfoldingPath;
