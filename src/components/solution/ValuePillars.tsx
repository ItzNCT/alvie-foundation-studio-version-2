import useRevealOnScroll from "@/hooks/useRevealOnScroll";
import useReducedMotion from "@/hooks/useReducedMotion";

const pillars = [
  {
    numeral: "I",
    title: "Strategy first",
    body: "We start with deep research, not templates. Your business is unique — your solution should be too.",
  },
  {
    numeral: "II",
    title: "Bespoke craftsmanship",
    body: "No factory mindset. No recycled blueprints. Every color, structure, and interaction is intentionally crafted to solve your specific challenges.",
  },
  {
    numeral: "III",
    title: "Digital ecosystem",
    body: "Brand identity, website, and strategy work as one unified system — not disconnected fragments from different vendors.",
  },
  {
    numeral: "IV",
    title: "Powered by our team",
    body: "A happy, well-cared-for team naturally delivers outstanding results. Our well-being is the foundation of your quality.",
  },
];

const ValuePillars = ({ compact = false }: { compact?: boolean }) => {
  const reducedMotion = useReducedMotion();
  const { ref, revealed } = useRevealOnScroll(0.15);

  return (
    <div
      ref={ref}
      style={{
        maxWidth: compact ? undefined : 700,
        margin: compact ? undefined : "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: compact ? 16 : 20,
      }}
    >
      {pillars.map((p, i) => (
        <div
          key={p.numeral}
          style={{
            borderLeft: "3px solid hsl(var(--secondary))",
            paddingLeft: 24,
            paddingTop: compact ? 12 : 16,
            paddingBottom: compact ? 12 : 16,
            opacity: reducedMotion || revealed ? 1 : 0,
            transform: reducedMotion || revealed ? "translateX(0)" : "translateX(-20px)",
            transition: `opacity 600ms ease ${i * 100}ms, transform 600ms ease ${i * 100}ms`,
          }}
        >
          <span
            className="font-body"
            style={{ fontWeight: 500, fontSize: 12, color: "hsl(var(--secondary))" }}
          >
            {p.numeral}
          </span>
          <h4
            className="font-display font-bold"
            style={{ fontSize: compact ? 18 : 20, color: "hsl(var(--primary))", marginTop: 4 }}
          >
            {p.title}
          </h4>
          <p
            className="font-body"
            style={{
              fontWeight: 300,
              fontSize: compact ? 14 : 15,
              color: "hsl(var(--foreground) / 0.6)",
              lineHeight: 1.7,
              marginTop: 8,
            }}
          >
            {p.body}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ValuePillars;
