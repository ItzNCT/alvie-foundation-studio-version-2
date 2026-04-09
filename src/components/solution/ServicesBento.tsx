import { Palette, Globe, Compass, Smartphone, Lightbulb, Atom, Puzzle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import useRevealOnScroll from "@/hooks/useRevealOnScroll";
import useReducedMotion from "@/hooks/useReducedMotion";
import { useRef } from "react";

const services = [
  { name: "Brand Identity", icon: Palette, desc: "Visual and verbal language that reflects your depth", large: true },
  { name: "Website & Digital Platform", icon: Globe, desc: "Your digital atelier, built from strategy", large: true },
  { name: "Strategy & Research", icon: Compass, desc: "Deep dive into how your business operates", large: false },
  { name: "App Design & BIM", icon: Smartphone, desc: "Digital products beyond the website", large: false },
  { name: "Design Thinking", icon: Lightbulb, desc: "Human-centered problem solving", large: false },
  { name: "First Principle Thinking", icon: Atom, desc: "Breaking problems to their core truth", large: false },
  { name: "Problem Solving", icon: Puzzle, desc: "Turning complexity into clarity", large: false },
];

const ServiceCard = ({
  service,
  delay,
  revealed,
  reducedMotion,
}: {
  service: (typeof services)[0];
  delay: number;
  revealed: boolean;
  reducedMotion: boolean;
}) => {
  const Icon = service.icon;
  const iconRef = useRef<HTMLDivElement>(null);

  return (
    <div
      style={{
        background: service.large
          ? "linear-gradient(135deg, hsl(var(--primary) / 0.04), hsl(var(--secondary) / 0.03))"
          : "hsl(var(--background))",
        border: "1px solid hsl(var(--foreground) / 0.05)",
        borderRadius: 12,
        padding: 28,
        cursor: "default",
        opacity: reducedMotion || revealed ? 1 : 0,
        transform: reducedMotion || revealed ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 600ms ease ${delay}ms, transform 600ms ease ${delay}ms, box-shadow 300ms ease, border-left-color 300ms ease`,
        borderLeft: "3px solid transparent",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.transform = "translateY(-4px)";
        el.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
        el.style.borderLeftColor = "hsl(var(--secondary))";
        if (iconRef.current) {
          iconRef.current.style.color = "hsl(var(--primary))";
          iconRef.current.style.transform = "scale(1.17)";
        }
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "none";
        el.style.borderLeftColor = "transparent";
        if (iconRef.current) {
          iconRef.current.style.color = "hsl(var(--secondary))";
          iconRef.current.style.transform = "scale(1)";
        }
      }}
    >
      <div
        ref={iconRef}
        style={{
          color: "hsl(var(--secondary))",
          transition: "color 300ms ease, transform 300ms ease",
          display: "inline-flex",
        }}
      >
        <Icon size={24} />
      </div>
      <div
        className="font-body"
        style={{
          fontWeight: 600,
          fontSize: 17,
          color: "hsl(var(--primary))",
          marginTop: 12,
        }}
      >
        {service.name}
      </div>
      <p
        className="font-body"
        style={{
          fontWeight: 300,
          fontSize: 13,
          color: "hsl(var(--foreground) / 0.5)",
          marginTop: 8,
          lineHeight: 1.6,
        }}
      >
        {service.desc}
      </p>
    </div>
  );
};

const ServicesBento = () => {
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  const { ref, revealed } = useRevealOnScroll(0.1);

  if (isMobile) {
    return (
      <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {services.map((s, i) => (
          <ServiceCard key={s.name} service={s} delay={i * 60} revealed={revealed} reducedMotion={reducedMotion} />
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Row 1: 40/60 */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 3fr", gap: 16 }}>
        <ServiceCard service={services[0]} delay={0} revealed={revealed} reducedMotion={reducedMotion} />
        <ServiceCard service={services[1]} delay={60} revealed={revealed} reducedMotion={reducedMotion} />
      </div>
      {/* Row 2: 60/40 */}
      <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 16 }}>
        <ServiceCard service={services[2]} delay={120} revealed={revealed} reducedMotion={reducedMotion} />
        <ServiceCard service={services[3]} delay={180} revealed={revealed} reducedMotion={reducedMotion} />
      </div>
      {/* Row 3: 30/30/40 */}
      <div style={{ display: "grid", gridTemplateColumns: "3fr 3fr 4fr", gap: 16 }}>
        <ServiceCard service={services[4]} delay={240} revealed={revealed} reducedMotion={reducedMotion} />
        <ServiceCard service={services[5]} delay={300} revealed={revealed} reducedMotion={reducedMotion} />
        <ServiceCard service={services[6]} delay={360} revealed={revealed} reducedMotion={reducedMotion} />
      </div>
    </div>
  );
};

export default ServicesBento;
