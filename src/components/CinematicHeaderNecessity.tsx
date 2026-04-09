import { useState, useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface CinematicHeaderNecessityProps {
  backgroundUrl?: string;
}

const DEFAULT_BG = "/images/CinematicHeaderBridgeTheNecessity.webp";

const CinematicHeaderNecessity = ({ backgroundUrl }: CinematicHeaderNecessityProps) => {
  const bgUrl = backgroundUrl || DEFAULT_BG;
  const isMobile = useIsMobile();
  const [visible, setVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const h = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  /* Detect when the canvas section has scrolled away by watching the sentinel */
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          document.querySelectorAll(".mini-toc-row").forEach((r) => r.classList.remove("active"));
          document.querySelector(".mini-toc-row:nth-child(3)")?.classList.add("active");
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const animate = (delay: number, duration: number): React.CSSProperties =>
    prefersReducedMotion || !visible
      ? { opacity: prefersReducedMotion ? 1 : 0 }
      : {
          opacity: 1,
          transform: "translateY(0)",
          transition: `opacity ${duration}ms cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
        };

  const hidden: React.CSSProperties =
    prefersReducedMotion
      ? {}
      : { opacity: 0, transform: "translateY(16px)" };

  return (
    <>
      {/* Fixed full-viewport background layer */}
      <div
        className="necessity-header"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 3,
          backgroundImage: `url(${bgUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          pointerEvents: "none",
          visibility: visible ? "visible" : "hidden",
          opacity: visible ? 1 : 0,
          transition: "opacity 300ms ease, visibility 300ms ease",
        }}
      >
        {/* Dark overlay — 50% */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(26, 26, 24, 0.50)", zIndex: 1 }}
        />

        {/* Subtle vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, transparent 40%, rgba(26, 26, 24, 0.3) 100%)",
            zIndex: 1,
          }}
        />

        {/* Content overlay — above overlays */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ zIndex: 2, padding: isMobile ? 24 : 48 }}
        >
          {/* Roman numeral */}
          <span
            className="font-body"
            style={{
              fontWeight: 500,
              fontSize: 14,
              color: "rgba(247, 244, 235, 0.6)",
              letterSpacing: "0.1em",
              ...hidden,
              ...(visible ? animate(0, 400) : {}),
            }}
          >
            III
          </span>

          {/* Gold line */}
          <div
            style={{
              width: 40,
              height: 1,
              background: "hsl(var(--secondary))",
              marginTop: 16,
              marginBottom: 16,
              transform: prefersReducedMotion || visible ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "center",
              transition: visible
                ? "transform 400ms cubic-bezier(0.4,0,0.2,1) 400ms"
                : undefined,
            }}
          />

          {/* Header */}
          <h2
            className="font-display font-bold text-center"
            style={{
              fontSize: "clamp(36px, 5vw, 64px)",
              color: "hsl(var(--primary-foreground))",
              lineHeight: 1.15,
              ...hidden,
              ...(visible ? animate(800, 600) : {}),
            }}
          >
            The necessity
          </h2>

          {/* Subtitle */}
          <p
            className="font-body text-center"
            style={{
              fontWeight: 300,
              fontSize: "clamp(14px, 1.6vw, 18px)",
              color: "rgba(247, 244, 235, 0.75)",
              maxWidth: 500,
              marginTop: 20,
              lineHeight: 1.6,
              ...hidden,
              ...(visible ? animate(1400, 500) : {}),
            }}
          >
            Your digital presence is no longer optional
          </p>
        </div>
      </div>

      {/* Sentinel element — placed in document flow BETWEEN canvas and necessity-canvas.
          When this scrolls into view, it means the canvas has moved away. */}
      <div
        ref={sentinelRef}
        className="necessity-sentinel"
        style={{
          position: "relative",
          zIndex: 2,
          height: "100vh",
          pointerEvents: "none",
        }}
      />
    </>
  );
};

export default CinematicHeaderNecessity;
