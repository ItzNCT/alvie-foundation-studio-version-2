import { useState } from "react";
import { ArrowRight } from "lucide-react";
import useReducedMotion from "@/hooks/useReducedMotion";
import useRevealOnScroll from "@/hooks/useRevealOnScroll";

const ClosingCTA = () => {
  const reducedMotion = useReducedMotion();
  const { ref, revealed } = useRevealOnScroll(0.15);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const revealStyle = (delay = 0): React.CSSProperties => ({
    opacity: reducedMotion || revealed ? 1 : 0,
    transform: reducedMotion || revealed ? "scale(1)" : "scale(0.97)",
    transition: `opacity 700ms cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform 700ms cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
  });

  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      {/* Gold line */}
      <div
        style={{
          width: 48,
          height: 1,
          background: "hsl(var(--secondary))",
          margin: "0 auto",
          transform: reducedMotion || revealed ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "center",
          transition: "transform 500ms cubic-bezier(0.4,0,0.2,1)",
        }}
      />

      <div style={{ height: 32 }} />

      <h3
        className="font-display font-bold"
        style={{
          fontSize: "clamp(22px, 3vw, 32px)",
          color: "hsl(var(--primary))",
          lineHeight: 1.3,
          maxWidth: 550,
          margin: "0 auto",
          ...revealStyle(100),
        }}
      >
        Ready to see your business the way your clients should?
      </h3>

      <p
        className="font-body"
        style={{
          fontWeight: 300,
          fontSize: 16,
          color: "hsl(var(--foreground) / 0.45)",
          marginTop: 16,
          ...revealStyle(200),
        }}
      >
        Let's start with a conversation.
      </p>

      <div style={{ height: 32 }} />

      <button
        className="font-body"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setPressed(false);
        }}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        style={{
          fontWeight: 500,
          fontSize: 16,
          background: hovered ? "#0a4a3e" : "hsl(var(--primary))",
          color: "hsl(var(--primary-foreground))",
          border: "none",
          padding: "16px 40px",
          borderRadius: 8,
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          transform: pressed
            ? "translateY(0)"
            : hovered
            ? "translateY(-2px)"
            : "translateY(0)",
          boxShadow: pressed
            ? "0 2px 8px rgba(15,92,78,0.2)"
            : hovered
            ? "0 4px 16px rgba(15,92,78,0.3)"
            : "0 2px 8px rgba(15,92,78,0.15)",
          transition: "all 300ms cubic-bezier(0.4,0,0.2,1)",
          ...revealStyle(300),
        }}
      >
        Start a conversation
        <ArrowRight
          size={16}
          style={{
            transform: hovered ? "translateX(4px)" : "translateX(0)",
            transition: "transform 300ms ease",
          }}
        />
      </button>
    </div>
  );
};

export default ClosingCTA;
