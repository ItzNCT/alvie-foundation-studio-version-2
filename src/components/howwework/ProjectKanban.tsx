import { useState, useEffect, useRef, useCallback } from "react";
import { Check } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import useReducedMotion from "@/hooks/useReducedMotion";
import useRevealOnScroll from "@/hooks/useRevealOnScroll";

type Column = "discovery" | "strategy" | "design" | "live";

interface CardData {
  id: string;
  title: string;
  column: Column;
  done: boolean;
}

const columns: { key: Column; label: string }[] = [
  { key: "discovery", label: "Discovery" },
  { key: "strategy", label: "Strategy" },
  { key: "design", label: "Design" },
  { key: "live", label: "Live" },
];

const initialCards: CardData[] = [
  { id: "brand", title: "Brand Audit", column: "discovery", done: false },
  { id: "user", title: "User Research", column: "discovery", done: false },
  { id: "comp", title: "Competitor Analysis", column: "discovery", done: false },
  { id: "arch", title: "Site Architecture", column: "strategy", done: false },
  { id: "vis", title: "Visual System", column: "design", done: false },
];

const mobileStages = [
  { label: "Discovery", desc: "Brand Audit, User Research, Competitor Analysis" },
  { label: "Strategy", desc: "Site Architecture, Content Strategy" },
  { label: "Design", desc: "Visual System, UI Components" },
  { label: "Live", desc: "Launch, Monitor, Iterate" },
];

const KanbanCard = ({
  card,
  isMoving,
}: {
  card: CardData;
  isMoving: boolean;
}) => (
  <div
    style={{
      background: "white",
      border: "1px solid hsl(var(--foreground) / 0.05)",
      borderLeft: "3px solid hsl(var(--secondary))",
      borderRadius: 8,
      padding: 12,
      boxShadow: isMoving
        ? "0 6px 16px rgba(0,0,0,0.08)"
        : "0 2px 8px rgba(0,0,0,0.04)",
      transform: isMoving ? "translateY(-2px)" : "translateY(0)",
      transition: "box-shadow 300ms ease, transform 300ms ease",
      marginBottom: 8,
      display: "flex",
      alignItems: "center",
      gap: 6,
    }}
  >
    <span
      className="font-body"
      style={{
        fontWeight: 500,
        fontSize: 12,
        color: "hsl(var(--foreground) / 0.7)",
        flex: 1,
      }}
    >
      {card.title}
    </span>
    {card.done && (
      <Check
        size={14}
        style={{
          color: "hsl(var(--primary))",
          animation: "hww-pulse-scale 300ms ease",
        }}
      />
    )}
  </div>
);

const ProjectKanban = () => {
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  const { ref, revealed } = useRevealOnScroll(0.1);
  const headerReveal = useRevealOnScroll();
  const [cards, setCards] = useState<CardData[]>(initialCards);
  const [movingId, setMovingId] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cancelRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const moveCard = useCallback(
    (id: string, to: Column, done = false) => {
      setMovingId(id);
      setTimeout(() => {
        setCards((prev) =>
          prev.map((c) => (c.id === id ? { ...c, column: to, done } : c))
        );
        setTimeout(() => setMovingId(null), 300);
      }, 500);
    },
    []
  );

  useEffect(() => {
    if (!isVisible || isMobile || reducedMotion) return;
    cancelRef.current = false;

    const wait = (ms: number) =>
      new Promise<void>((r) => {
        const t = setTimeout(r, ms);
        const check = setInterval(() => {
          if (cancelRef.current) {
            clearTimeout(t);
            clearInterval(check);
          }
        }, 200);
      });

    const run = async () => {
      while (!cancelRef.current) {
        setCards(initialCards);
        setMovingId(null);
        await wait(2000);
        if (cancelRef.current) return;

        moveCard("brand", "strategy");
        await wait(3000);
        if (cancelRef.current) return;

        moveCard("arch", "design");
        await wait(3000);
        if (cancelRef.current) return;

        moveCard("user", "strategy");
        await wait(3000);
        if (cancelRef.current) return;

        moveCard("vis", "live", true);
        await wait(3000);
        if (cancelRef.current) return;

        moveCard("comp", "strategy");
        await wait(3000);
        if (cancelRef.current) return;

        await wait(1000);
      }
    };

    run();
    return () => {
      cancelRef.current = true;
    };
  }, [isVisible, isMobile, reducedMotion, moveCard]);

  const revealStyle = (delay = 0): React.CSSProperties => ({
    opacity: reducedMotion || headerReveal.revealed ? 1 : 0,
    transform: reducedMotion || headerReveal.revealed ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 700ms cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform 700ms cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
  });

  if (isMobile) {
    return (
      <div ref={headerReveal.ref}>
        <h3
          className="font-display font-bold"
          style={{
            fontSize: "clamp(24px, 3vw, 36px)",
            color: "hsl(var(--primary))",
            ...revealStyle(),
          }}
        >
          Inside a typical ALVIE project
        </h3>
        <p
          className="font-body"
          style={{
            fontWeight: 300,
            fontSize: 15,
            color: "hsl(var(--foreground) / 0.45)",
            marginTop: 8,
            ...revealStyle(100),
          }}
        >
          A transparent look at how your project moves through our studio
        </p>
        <div style={{ marginTop: 32 }}>
          {mobileStages.map((stage, i) => (
            <div
              key={stage.label}
              style={{
                borderLeft: "3px solid hsl(var(--secondary))",
                paddingLeft: 20,
                paddingBottom: 24,
                marginBottom: 8,
                ...revealStyle(i * 100 + 200),
              }}
            >
              <h4
                className="font-body"
                style={{ fontWeight: 600, fontSize: 14, color: "hsl(var(--primary))" }}
              >
                {stage.label}
              </h4>
              <p
                className="font-body"
                style={{
                  fontWeight: 300,
                  fontSize: 13,
                  color: "hsl(var(--foreground) / 0.5)",
                  marginTop: 4,
                }}
              >
                {stage.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef}>
      <div ref={headerReveal.ref}>
        <h3
          className="font-display font-bold"
          style={{
            fontSize: "clamp(24px, 3vw, 36px)",
            color: "hsl(var(--primary))",
            ...revealStyle(),
          }}
        >
          Inside a typical ALVIE project
        </h3>
        <p
          className="font-body"
          style={{
            fontWeight: 300,
            fontSize: 15,
            color: "hsl(var(--foreground) / 0.45)",
            marginTop: 8,
            ...revealStyle(100),
          }}
        >
          A transparent look at how your project moves through our studio
        </p>
      </div>

      <div style={{ height: 40 }} />

      <div
        ref={ref}
        style={{
          maxWidth: 800,
          margin: "0 auto",
          border: "1px solid hsl(var(--foreground) / 0.06)",
          borderRadius: 16,
          background: "hsl(var(--background))",
          padding: 32,
          opacity: reducedMotion || revealed ? 1 : 0,
          transform: reducedMotion || revealed ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 700ms cubic-bezier(0.4,0,0.2,1), transform 700ms cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
          }}
        >
          {columns.map((col, ci) => (
            <div
              key={col.key}
              style={{
                borderRight:
                  ci < 3 ? "1px solid hsl(var(--foreground) / 0.06)" : "none",
                paddingRight: ci < 3 ? 16 : 0,
              }}
            >
              <div
                className="font-body"
                style={{
                  fontWeight: 600,
                  fontSize: 13,
                  color: "hsl(var(--primary))",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  paddingBottom: 16,
                  borderBottom: "1px solid hsl(var(--foreground) / 0.06)",
                  marginBottom: 16,
                }}
              >
                {col.label}
              </div>
              <div style={{ minHeight: 120 }}>
                {cards
                  .filter((c) => c.column === col.key)
                  .map((card) => (
                    <KanbanCard
                      key={card.id}
                      card={card}
                      isMoving={movingId === card.id}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <p
        className="font-body"
        style={{
          fontWeight: 300,
          fontStyle: "italic",
          fontSize: 14,
          color: "hsl(var(--foreground) / 0.4)",
          textAlign: "center",
          marginTop: 24,
        }}
      >
        Every card represents a real deliverable. Every movement represents real progress.
      </p>
    </div>
  );
};

export default ProjectKanban;
