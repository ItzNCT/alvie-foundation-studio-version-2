import { Palette } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import useRevealOnScroll from "@/hooks/useRevealOnScroll";
import useReducedMotion from "@/hooks/useReducedMotion";

const CaseStudyPreview = () => {
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  const { ref, revealed } = useRevealOnScroll(0.1);

  return (
    <div
      ref={ref}
      style={{
        maxWidth: 900,
        margin: "0 auto",
        borderRadius: 16,
        border: "1px solid hsl(var(--foreground) / 0.06)",
        background: "hsl(var(--background))",
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        minHeight: isMobile ? undefined : 360,
        opacity: reducedMotion || revealed ? 1 : 0,
        transform: reducedMotion || revealed ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 700ms ease, transform 700ms ease",
      }}
    >
      {/* Left — Image placeholder */}
      <div
        style={{
          background: "linear-gradient(135deg, hsl(var(--primary) / 0.08), hsl(var(--secondary) / 0.08))",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 48,
          minHeight: isMobile ? 200 : undefined,
          gap: 12,
        }}
      >
        <Palette size={48} style={{ color: "hsl(var(--primary) / 0.2)" }} />
        <span className="font-body" style={{ fontWeight: 300, fontSize: 16, color: "hsl(var(--foreground) / 0.25)" }}>
          Case study coming soon
        </span>
      </div>

      {/* Right — Text */}
      <div style={{ padding: isMobile ? 32 : 48 }}>
        <span
          className="font-body"
          style={{
            fontWeight: 500,
            fontSize: 12,
            color: "hsl(var(--secondary))",
            textTransform: "uppercase",
            letterSpacing: 2,
          }}
        >
          Featured Project
        </span>

        <h4
          className="font-display font-bold"
          style={{
            fontSize: 22,
            color: "hsl(var(--primary))",
            lineHeight: 1.3,
            marginTop: 16,
          }}
        >
          Transforming a local business into a digital presence that speaks globally
        </h4>

        <p
          className="font-body"
          style={{
            fontWeight: 400,
            fontSize: 14,
            color: "hsl(var(--foreground) / 0.4)",
            marginTop: 16,
          }}
        >
          Brand Identity{" "}
          <span style={{ color: "hsl(var(--secondary))", margin: "0 6px" }}>·</span>{" "}
          Website{" "}
          <span style={{ color: "hsl(var(--secondary))", margin: "0 6px" }}>·</span>{" "}
          Strategy
        </p>

        <p
          className="font-body"
          style={{
            fontWeight: 300,
            fontSize: 14,
            color: "hsl(var(--foreground) / 0.45)",
            lineHeight: 1.7,
            marginTop: 24,
          }}
        >
          Detailed case study is currently in development. Check back soon to see how we
          approach real projects.
        </p>

        <div
          className="font-body"
          style={{
            fontWeight: 500,
            fontSize: 14,
            color: "hsl(var(--primary))",
            marginTop: 24,
            cursor: "pointer",
            transition: "transform 300ms ease",
            display: "inline-block",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "translateX(4px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "translateX(0)";
          }}
        >
          View case study →
        </div>
      </div>
    </div>
  );
};

export default CaseStudyPreview;
