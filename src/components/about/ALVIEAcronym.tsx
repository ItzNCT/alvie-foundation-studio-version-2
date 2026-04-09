import { useState, useEffect, useCallback, useRef } from "react";
import useReducedMotion from "@/hooks/useReducedMotion";
import useRevealOnScroll from "@/hooks/useRevealOnScroll";

const values = [
  { letter: "A", name: "Act", subs: ["Act With Purpose", "Do The Right Thing", "Make It Happen"] },
  { letter: "L", name: "Love", subs: ["Love What You Do", "Lead With Empathy", "People First"] },
  { letter: "V", name: "Value", subs: ["Value Every Voice", "Cultivate Gratitude", "Cherish Connections"] },
  { letter: "I", name: "Innovate", subs: ["Find A Better Way", "Think Bigger", "Simplify Complexity"] },
  { letter: "E", name: "Empower", subs: ["Trust To Lead", "Bring Out The Best", "Grow Together"] },
];

const aliveState = {
  name: "→ Alive",
  subs: ["To Not Just Exist", "Positive Value", "Stay Vibrant"],
};

const ALVIEAcronym = () => {
  const reducedMotion = useReducedMotion();
  const { ref, revealed } = useRevealOnScroll(0.2);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAlive, setIsAlive] = useState(false);
  const [panelVisible, setPanelVisible] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isVisibleRef = useRef(false);

  const startCycle = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    let idx = 0;
    let alive = false;

    const tick = () => {
      if (!alive && idx < 5) {
        setPanelVisible(false);
        setTimeout(() => {
          setIsAlive(false);
          setActiveIndex(idx);
          setPanelVisible(true);
        }, 300);
        idx++;
      } else if (!alive && idx === 5) {
        setPanelVisible(false);
        setTimeout(() => {
          setIsAlive(true);
          setPanelVisible(true);
        }, 300);
        alive = true;
        idx++;
      } else {
        // Reset
        setPanelVisible(false);
        setTimeout(() => {
          setIsAlive(false);
          setActiveIndex(0);
          setPanelVisible(true);
        }, 300);
        idx = 1;
        alive = false;
      }
    };

    intervalRef.current = setInterval(tick, 4000);
  }, []);

  useEffect(() => {
    if (revealed && !isVisibleRef.current) {
      isVisibleRef.current = true;
      if (!reducedMotion) startCycle();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [revealed, reducedMotion, startCycle]);

  const currentValue = isAlive ? aliveState : (values[activeIndex] ?? values[0]);

  if (reducedMotion) {
    return (
      <div ref={ref} style={{ textAlign: "center" }}>
        <h3
          className="font-display font-bold"
          style={{
            fontSize: "clamp(24px, 3vw, 36px)",
            color: "hsl(var(--primary))",
            marginBottom: 48,
          }}
        >
          Every letter is a promise
        </h3>
        {values.map((v) => (
          <div key={v.letter} style={{ marginBottom: 24 }}>
            <span
              className="font-display"
              style={{ fontWeight: 800, fontSize: 32, color: "hsl(var(--secondary))" }}
            >
              {v.letter}
            </span>
            <span
              className="font-display font-bold"
              style={{ fontSize: 20, color: "hsl(var(--primary))", marginLeft: 12 }}
            >
              {v.name}
            </span>
            <p
              className="font-body"
              style={{ fontWeight: 300, fontSize: 14, color: "hsl(var(--foreground) / 0.5)", marginTop: 4 }}
            >
              {v.subs.join(" · ")}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <h3
        className="font-display font-bold"
        style={{
          fontSize: "clamp(24px, 3vw, 36px)",
          color: "hsl(var(--primary))",
          marginBottom: 48,
        }}
      >
        Every letter is a promise
      </h3>

      {/* Letters */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "clamp(16px, 3vw, 32px)",
          marginBottom: 40,
        }}
      >
        {values.map((v, i) => {
          const isActive = isAlive || activeIndex === i;
          return (
            <span
              key={v.letter}
              className="font-display"
              style={{
                fontWeight: 800,
                fontSize: "clamp(56px, 8vw, 96px)",
                color: isActive ? "hsl(var(--secondary))" : "hsl(var(--primary) / 0.25)",
                transform: isActive ? "scale(1.15)" : "scale(1)",
                transition: "color 500ms ease-out, transform 500ms ease-out, opacity 500ms ease-out",
                opacity: isActive ? 1 : 0.6,
                lineHeight: 1,
              }}
            >
              {v.letter}
            </span>
          );
        })}
      </div>

      {/* Value panel */}
      <div
        style={{
          maxWidth: 500,
          margin: "0 auto",
          minHeight: 80,
          opacity: panelVisible ? 1 : 0,
          transition: "opacity 300ms ease",
        }}
      >
        <div
          className="font-display font-bold"
          style={{
            fontSize: 26,
            color: isAlive ? "hsl(var(--secondary))" : "hsl(var(--primary))",
            marginBottom: 8,
          }}
        >
          {currentValue.name}
        </div>
        <p className="font-body" style={{ fontWeight: 300, fontSize: 15, color: "hsl(var(--foreground) / 0.5)" }}>
          {currentValue.subs.map((s, i) => (
            <span key={i}>
              {i > 0 && <span style={{ color: "hsl(var(--secondary))", margin: "0 8px" }}>·</span>}
              {s}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default ALVIEAcronym;
