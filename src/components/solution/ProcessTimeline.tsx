import { useState, useEffect, useRef } from "react";
import { Search, Compass, PenTool, Rocket } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import useReducedMotion from "@/hooks/useReducedMotion";

const steps = [
  {
    label: "Research",
    icon: Search,
    desc: "We dive deep into your business to uncover the truth",
    num: "01",
  },
  {
    label: "Strategy",
    icon: Compass,
    desc: "We translate insights into a clear digital roadmap",
    num: "02",
  },
  {
    label: "Design",
    icon: PenTool,
    desc: "We craft every touchpoint with purpose and warmth",
    num: "03",
  },
  {
    label: "Launch",
    icon: Rocket,
    desc: "We deliver a living digital presence, not just a website",
    num: "04",
  },
];

const STEP_DURATION = 3000;

/* Per-icon idle animations */
const iconAnimation = (index: number): React.CSSProperties => {
  const anims: Record<number, string> = {
    0: "pt-scan 3s ease-in-out infinite",
    1: "pt-spin 12s linear infinite",
    2: "pt-draw 3s ease-in-out infinite",
    3: "pt-float 2.5s ease-in-out infinite",
  };
  return { animation: anims[index] };
};

const ProcessTimeline = () => {
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [prevActive, setPrevActive] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setIsVisible(e.isIntersecting),
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || reducedMotion) return;
    const id = setInterval(() => {
      setActive((p) => {
        setPrevActive(p);
        return (p + 1) % 4;
      });
    }, STEP_DURATION);
    return () => clearInterval(id);
  }, [isVisible, reducedMotion]);

  /* Reduced motion: show all steps statically */
  if (reducedMotion) {
    return (
      <div ref={ref} style={{ maxWidth: 800, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
            gap: 24,
          }}
        >
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} style={{ textAlign: "center" }}>
                <Icon
                  size={24}
                  style={{ color: "hsl(var(--secondary))", margin: "0 auto 8px" }}
                />
                <div
                  className="font-body"
                  style={{
                    fontWeight: 600,
                    fontSize: 14,
                    color: "hsl(var(--primary))",
                  }}
                >
                  {s.label}
                </div>
                <p
                  className="font-body"
                  style={{
                    fontWeight: 300,
                    fontSize: 13,
                    color: "hsl(var(--foreground) / 0.55)",
                    marginTop: 8,
                    lineHeight: 1.6,
                  }}
                >
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  /* Mobile: vertical layout */
  if (isMobile) {
    return (
      <div ref={ref} style={{ maxWidth: 400, margin: "0 auto" }}>
        {steps.map((s, i) => {
          const Icon = s.icon;
          const isActive = i === active;
          return (
            <div
              key={s.label}
              style={{
                display: "flex",
                gap: 16,
                marginBottom: i < 3 ? 24 : 0,
                opacity: isActive ? 1 : 0.35,
                transition: "opacity 400ms ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: isActive ? 16 : 12,
                    height: isActive ? 16 : 12,
                    borderRadius: "50%",
                    background: isActive
                      ? "hsl(var(--secondary))"
                      : "hsl(var(--foreground) / 0.1)",
                    boxShadow: isActive
                      ? "0 0 12px rgba(212, 154, 90, 0.3)"
                      : "none",
                    transition: "all 400ms ease",
                    flexShrink: 0,
                  }}
                />
                {i < 3 && (
                  <div
                    style={{
                      width: 1,
                      flex: 1,
                      minHeight: 32,
                      background: "hsl(var(--foreground) / 0.06)",
                    }}
                  />
                )}
              </div>
              <div style={{ paddingBottom: 8 }}>
                {isActive && (
                  <Icon
                    size={20}
                    style={{
                      color: "hsl(var(--secondary))",
                      marginBottom: 4,
                      ...iconAnimation(i),
                    }}
                  />
                )}
                <div
                  className="font-body"
                  style={{
                    fontWeight: isActive ? 600 : 500,
                    fontSize: isActive ? 14 : 13,
                    color: isActive
                      ? "hsl(var(--primary))"
                      : "hsl(var(--foreground) / 0.3)",
                    transition: "all 400ms ease",
                  }}
                >
                  {s.label}
                </div>
                {isActive && (
                  <p
                    key={`desc-${active}`}
                    className="font-body"
                    style={{
                      fontWeight: 300,
                      fontSize: 14,
                      color: "hsl(var(--foreground) / 0.55)",
                      marginTop: 4,
                      lineHeight: 1.6,
                      animation: "pt-desc-in 300ms ease-out",
                    }}
                  >
                    {s.desc}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  /* Desktop: horizontal premium timeline */
  const trackFill = ((active + 1) / 4) * 100;

  return (
    <div
      ref={ref}
      style={{ maxWidth: 800, margin: "0 auto", position: "relative" }}
    >
      {/* Nodes row */}
      <div style={{ position: "relative", height: 100 }}>
        {/* Background track */}
        <div
          style={{
            position: "absolute",
            top: 68,
            left: 0,
            right: 0,
            height: 2,
            borderRadius: 1,
            background: "hsl(var(--foreground) / 0.06)",
          }}
        />
        {/* Gold progress fill */}
        <div
          style={{
            position: "absolute",
            top: 68,
            left: 0,
            width: `${trackFill}%`,
            height: 2,
            borderRadius: 1,
            background: "hsl(var(--secondary))",
            transition: `width ${STEP_DURATION}ms linear`,
          }}
        />

        {steps.map((s, i) => {
          const isActive = i === active;
          const Icon = s.icon;
          const leftPercent = (i / 3) * 100;

          return (
            <div
              key={s.label}
              style={{
                position: "absolute",
                left: `${leftPercent}%`,
                top: 0,
                transform: "translateX(-50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: 120,
              }}
            >
              {/* Icon */}
              <div style={{ height: 28, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon
                  size={isActive ? 24 : 20}
                  style={{
                    color: isActive
                      ? "hsl(var(--secondary))"
                      : "hsl(var(--foreground) / 0.15)",
                    transition: "color 400ms ease, transform 400ms ease",
                    ...(isActive ? iconAnimation(i) : {}),
                  }}
                />
              </div>

              {/* Label */}
              <span
                className="font-body"
                style={{
                  fontWeight: isActive ? 600 : 500,
                  fontSize: isActive ? 14 : 13,
                  color: isActive
                    ? "hsl(var(--primary))"
                    : "hsl(var(--foreground) / 0.3)",
                  marginTop: 4,
                  transition: "color 400ms ease, font-weight 400ms ease",
                }}
              >
                {s.label}
              </span>

              {/* Node dot */}
              <div
                style={{
                  width: isActive ? 16 : 12,
                  height: isActive ? 16 : 12,
                  borderRadius: "50%",
                  background: isActive
                    ? "hsl(var(--secondary))"
                    : "hsl(var(--foreground) / 0.1)",
                  boxShadow: isActive
                    ? "0 0 12px rgba(212, 154, 90, 0.3)"
                    : "none",
                  transition: "all 400ms ease",
                  marginTop: 6,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Description area with step watermark */}
      <div
        style={{
          position: "relative",
          textAlign: "center",
          minHeight: 80,
          marginTop: 24,
          overflow: "hidden",
        }}
      >
        {/* Step number watermark */}
        <span
          key={`wm-${active}`}
          className="font-display"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontWeight: 800,
            fontSize: 80,
            color: "hsl(var(--foreground) / 0.04)",
            lineHeight: 1,
            pointerEvents: "none",
            animation: "pt-wm-in 400ms ease-out",
          }}
        >
          {steps[active].num}
        </span>

        {/* Description */}
        <p
          key={`desc-${active}`}
          className="font-body"
          style={{
            position: "relative",
            fontWeight: 300,
            fontSize: 15,
            color: "hsl(var(--foreground) / 0.55)",
            maxWidth: 280,
            margin: "0 auto",
            lineHeight: 1.7,
            animation: "pt-desc-in 300ms ease-out",
          }}
        >
          {steps[active].desc}
        </p>
      </div>
    </div>
  );
};

export default ProcessTimeline;
