import { useState, useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const BG_URL = "/images/CinematicHeaderBridgeHowWeWork.webp";

const CinematicHeaderHowWeWork = () => {
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

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          document.querySelectorAll(".mini-toc-row").forEach((r) => r.classList.remove("active"));
          document.querySelector(".mini-toc-row:nth-child(5)")?.classList.add("active");
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

  const hidden: React.CSSProperties = prefersReducedMotion
    ? {}
    : { opacity: 0, transform: "translateY(16px)" };

  return (
    <>
      <div
        className="howwework-header"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 3,
          backgroundImage: `url(${BG_URL})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          pointerEvents: "none",
          visibility: visible ? "visible" : "hidden",
          opacity: visible ? 1 : 0,
          transition: "opacity 300ms ease, visibility 300ms ease",
        }}
      >
        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(26, 26, 24, 0.50)", zIndex: 1 }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(26, 26, 24, 0.25) 100%)",
            zIndex: 1,
          }}
        />

        {/* Content */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ zIndex: 2, padding: isMobile ? 24 : 48 }}
        >
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
            V
          </span>

          <div
            style={{
              width: 40,
              height: 1,
              background: "hsl(var(--secondary))",
              marginTop: 16,
              marginBottom: 16,
              transform:
                prefersReducedMotion || visible ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "center",
              transition: visible
                ? "transform 400ms cubic-bezier(0.4,0,0.2,1) 150ms"
                : undefined,
            }}
          />

          <h2
            className="font-display font-bold text-center"
            style={{
              fontSize: "clamp(36px, 5vw, 64px)",
              color: "hsl(var(--primary-foreground))",
              lineHeight: 1.15,
              ...hidden,
              ...(visible ? animate(300, 600) : {}),
            }}
          >
            How we work
          </h2>

          <p
            className="font-body text-center"
            style={{
              fontWeight: 300,
              fontSize: "clamp(14px, 1.6vw, 18px)",
              color: "rgba(247, 244, 235, 0.75)",
              maxWidth: 420,
              marginTop: 20,
              lineHeight: 1.6,
              ...hidden,
              ...(visible ? animate(450, 500) : {}),
            }}
          >
            From the first conversation to the final pixel
          </p>
        </div>
      </div>

      {/* Sentinel */}
      <div
        ref={sentinelRef}
        className="howwework-sentinel"
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

export default CinematicHeaderHowWeWork;
