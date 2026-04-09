import { useRef, useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { X, Check } from "lucide-react";

const badItems = [
  "Lose trust",
  "Miss opportunities",
  "Convey a false narrative of your business",
];

const goodItems = [
  "Validate your capabilities",
  "Attract potential customers, investors, and partners",
  "Create an accurate and professional first impression",
  "Accurately communicate your values and standards",
];

const useReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRevealed(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, revealed };
};

const StrategyComparison = () => {
  const isMobile = useIsMobile();
  const container = useReveal(0.1);
  const leftPanel = useReveal(0.2);
  const rightPanel = useReveal(0.2);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const h = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  const reveal = (
    revealed: boolean,
    delay = 0,
    fromX = 0
  ): React.CSSProperties => ({
    opacity: reducedMotion || revealed ? 1 : 0,
    transform:
      reducedMotion || revealed
        ? "translate(0, 0)"
        : `translate(${fromX}px, 16px)`,
    transition: `opacity 700ms cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform 700ms cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
  });

  return (
    <div
      ref={container.ref}
      style={{
        marginTop: isMobile ? 64 : 80,
        ...reveal(container.revealed),
      }}
    >
      {/* Gold divider */}
      <div
        className="origin-center mx-auto"
        style={{
          width: 48,
          height: 1,
          background: "hsl(var(--secondary))",
          marginBottom: isMobile ? 40 : 56,
          transform:
            reducedMotion || container.revealed ? "scaleX(1)" : "scaleX(0)",
          transition: "transform 500ms cubic-bezier(0.4,0,0.2,1)",
        }}
      />

      {/* Panels */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "35fr 65fr",
          gap: isMobile ? 24 : "clamp(24px, 3vw, 48px)",
          maxWidth: 900,
        }}
      >
        {/* LEFT — Bad strategy */}
        <div
          ref={leftPanel.ref}
          className="rounded-xl"
          style={{
            padding: isMobile ? 20 : 28,
            background: "hsl(var(--foreground) / 0.03)",
            ...reveal(leftPanel.revealed),
          }}
        >
          <h4
            className="font-display font-bold"
            style={{
              fontSize: isMobile ? 18 : 20,
              color: "hsl(var(--foreground) / 0.5)",
              marginBottom: 20,
              lineHeight: 1.3,
            }}
          >
            An ineffective strategy will:
          </h4>

          <ul className="flex flex-col gap-3">
            {badItems.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5"
                style={{
                  opacity: reducedMotion || leftPanel.revealed ? 1 : 0,
                  transform:
                    reducedMotion || leftPanel.revealed
                      ? "translateX(0)"
                      : "translateX(-8px)",
                  transition: `opacity 500ms ${200 + i * 100}ms, transform 500ms ${200 + i * 100}ms`,
                }}
              >
                <X
                  size={16}
                  className="shrink-0 mt-0.5"
                  style={{ color: "hsl(0 42% 38% / 0.5)" }}
                />
                <span
                  className="font-body line-through"
                  style={{
                    fontSize: isMobile ? 14 : 15,
                    color: "hsl(var(--foreground) / 0.4)",
                    lineHeight: 2,
                    textDecorationColor: "hsl(var(--foreground) / 0.15)",
                  }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT — Good strategy */}
        <div
          ref={rightPanel.ref}
          className="rounded-xl"
          style={{
            padding: isMobile ? 20 : 28,
            background: "hsl(var(--primary) / 0.02)",
            borderLeft: isMobile
              ? "none"
              : "3px solid hsl(var(--secondary))",
            ...reveal(rightPanel.revealed, 200, 24),
          }}
        >
          <h4
            className="font-display font-bold"
            style={{
              fontSize: isMobile ? 20 : 24,
              color: "hsl(var(--primary))",
              marginBottom: 20,
              lineHeight: 1.3,
            }}
          >
            A good strategy will:
          </h4>

          <ul className="flex flex-col gap-3">
            {goodItems.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5"
                style={{
                  opacity: reducedMotion || rightPanel.revealed ? 1 : 0,
                  transform:
                    reducedMotion || rightPanel.revealed
                      ? "translateX(0)"
                      : "translateX(12px)",
                  transition: `opacity 500ms ${300 + i * 100}ms, transform 500ms ${300 + i * 100}ms`,
                }}
              >
                <Check
                  size={16}
                  className="shrink-0 mt-0.5"
                  style={{ color: "hsl(var(--primary))" }}
                />
                <span
                  className="font-body"
                  style={{
                    fontSize: isMobile ? 15 : 16,
                    color: "hsl(var(--foreground))",
                    lineHeight: 2,
                  }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StrategyComparison;
