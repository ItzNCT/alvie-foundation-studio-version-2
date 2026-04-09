import { useState, useEffect, useRef, useCallback } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import useRevealOnScroll from "@/hooks/useRevealOnScroll";
import useReducedMotion from "@/hooks/useReducedMotion";

const stats = [
  { value: 73, suffix: "%", caption: "of clients research your business online before any meeting" },
  { value: 7, suffix: "s", caption: "to make a first impression on your website" },
  { value: 94, suffix: "%", caption: "of first impressions are design-related" },
];

const useCountUp = (target: number, active: boolean, duration = 1500, delay = 0) => {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  const animate = useCallback(() => {
    if (started.current) return;
    started.current = true;

    const timeout = setTimeout(() => {
      const start = performance.now();
      const step = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);

    return () => clearTimeout(timeout);
  }, [target, duration, delay]);

  useEffect(() => {
    if (active) animate();
  }, [active, animate]);

  return count;
};

const StatCard = ({
  value,
  suffix,
  caption,
  active,
  delay,
  reducedMotion,
}: {
  value: number;
  suffix: string;
  caption: string;
  active: boolean;
  delay: number;
  reducedMotion: boolean;
}) => {
  const count = useCountUp(value, active && !reducedMotion, 1500, delay);
  const displayValue = reducedMotion ? value : count;

  return (
    <div
      style={{
        border: "1px solid hsl(var(--foreground) / 0.06)",
        borderRadius: 12,
        padding: 32,
        textAlign: "center",
        opacity: reducedMotion || active ? 1 : 0,
        transform: reducedMotion || active ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 700ms cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform 700ms cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
      }}
    >
      <span
        className="font-display"
        style={{
          fontWeight: 800,
          fontSize: "clamp(40px, 5vw, 56px)",
          color: "hsl(var(--primary))",
          lineHeight: 1,
          display: "block",
        }}
      >
        {displayValue}
        {suffix}
      </span>
      <span
        className="font-body"
        style={{
          fontWeight: 300,
          fontSize: 14,
          color: "hsl(var(--foreground) / 0.55)",
          lineHeight: 1.6,
          display: "block",
          marginTop: 16,
        }}
      >
        {caption}
      </span>
    </div>
  );
};

const StatCards = () => {
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  const { ref, revealed } = useRevealOnScroll(0.2);

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
        gap: isMobile ? 16 : 24,
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      {stats.map((s, i) => (
        <StatCard
          key={i}
          value={s.value}
          suffix={s.suffix}
          caption={s.caption}
          active={revealed}
          delay={i * 200}
          reducedMotion={reducedMotion}
        />
      ))}
    </div>
  );
};

export default StatCards;
