import { useState } from "react";
import { ArrowRight, Clover } from "lucide-react";
import useRevealOnScroll from "@/hooks/useRevealOnScroll";

const TheInvitation = () => {
  const { ref, revealed } = useRevealOnScroll(0.1);
  const [hovered, setHovered] = useState(false);

  const prefersRM =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div
      ref={ref}
      style={{
        textAlign: "center",
        paddingBottom: 160,
        opacity: prefersRM ? 1 : revealed ? 1 : 0,
        transition: prefersRM ? undefined : "opacity 1.5s ease-out",
      }}
    >
      {/* Breathing clover icon */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 32,
        }}
      >
        <Clover
          size={32}
          className="text-alvie-gold"
          style={{
            opacity: 0.35,
            animation: prefersRM ? "none" : "clover-breathe 4s ease-in-out infinite",
          }}
        />
      </div>

      <h3
        className="font-display font-bold"
        style={{
          fontSize: "clamp(26px, 3.5vw, 42px)",
          color: "hsl(var(--primary))",
          lineHeight: 1.25,
          maxWidth: 550,
          margin: "0 auto",
        }}
      >
        The best projects begin with a quiet conversation.
      </h3>

      <p
        className="font-body"
        style={{
          fontWeight: 300,
          fontSize: "clamp(14px, 1.5vw, 17px)",
          color: "rgba(26,26,24,0.5)",
          lineHeight: 1.8,
          maxWidth: 480,
          margin: "20px auto 0",
        }}
      >
        No agenda. No sales pitch. Just two people exploring what's possible when
        your digital presence finally matches your real capabilities.
      </p>

      <div style={{ height: 32 }} />

      <button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="invitation-cta-btn"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontFamily: "var(--font-body)",
          fontWeight: 500,
          fontSize: 17,
          color: "#F7F4EB",
          background: hovered ? "#0A4A3E" : "#0F5C4E",
          border: "none",
          borderRadius: 8,
          padding: "18px 48px",
          cursor: "pointer",
          transform: hovered ? "translateY(-3px)" : "translateY(0)",
          boxShadow: hovered
            ? "0 8px 24px rgba(15,92,78,0.25)"
            : "0 2px 8px rgba(15,92,78,0.08)",
          transition: "all 300ms ease",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Golden shimmer on hover */}
        <span
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(90deg, transparent 0%, rgba(212,154,90,0.15) 50%, transparent 100%)",
            transform: hovered ? "translateX(100%)" : "translateX(-100%)",
            transition: "transform 600ms ease",
            pointerEvents: "none",
          }}
        />
        <span style={{ position: "relative", zIndex: 1 }}>Begin the conversation</span>
        <ArrowRight
          size={16}
          style={{
            position: "relative",
            zIndex: 1,
            transform: hovered ? "translateX(4px)" : "translateX(0)",
            transition: "transform 300ms ease",
          }}
        />
      </button>

      <div style={{ height: 20 }} />

      <p
        className="font-body"
        style={{
          fontWeight: 300,
          fontSize: 14,
          color: "rgba(26,26,24,0.3)",
        }}
      >
        <a
          href="mailto:hello@alvie.vn"
          style={{ color: "inherit", textDecoration: "none", transition: "color 300ms ease" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#0F5C4E";
            e.currentTarget.style.textDecoration = "underline";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "rgba(26,26,24,0.3)";
            e.currentTarget.style.textDecoration = "none";
          }}
        >
          hello@alvie.vn
        </a>
        <span style={{ color: "#D49A5A", margin: "0 6px" }}>·</span>
        <a
          href="tel:+84xxxxxxxx"
          style={{ color: "inherit", textDecoration: "none", transition: "color 300ms ease" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#0F5C4E";
            e.currentTarget.style.textDecoration = "underline";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "rgba(26,26,24,0.3)";
            e.currentTarget.style.textDecoration = "none";
          }}
        >
          +84 xxx xxx xxx
        </a>
      </p>
    </div>
  );
};

export default TheInvitation;
