import { useState, useEffect, useRef } from "react";
import useReducedMotion from "@/hooks/useReducedMotion";

const IMAGE_RAIN = "https://images.unsplash.com/photo-1515694346937-94d85e39d29a?w=400&h=500&fit=crop";
const IMAGE_BOOK = "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=400&h=500&fit=crop";
const IMAGE_COBBLE = "https://images.unsplash.com/photo-1504198070170-4ca53bb1c1fa?w=400&h=500&fit=crop";

type TextItem = { type: "text"; text: string; bg: string };
type PhotoItem = { type: "photo"; src: string; caption: string; rotation: number };
type BeautyItem = TextItem | PhotoItem;

const beauties: BeautyItem[] = [
  { type: "text", text: "A kind smile from a passerby", bg: "rgba(140, 156, 129, 0.06)" },
  { type: "text", text: "Train tracks stretching endlessly into the horizon", bg: "rgba(217, 160, 140, 0.06)" },
  { type: "text", text: "The stillness of a mountain at dawn", bg: "rgba(163, 181, 189, 0.06)" },
  { type: "photo", src: IMAGE_RAIN, caption: "the sound of rain", rotation: 2 },
  { type: "text", text: "Morning light through old wooden shutters", bg: "rgba(222, 194, 192, 0.06)" },
  { type: "text", text: "The sound of rain on terracotta tiles", bg: "rgba(184, 111, 82, 0.05)" },
  { type: "text", text: "Endless grasslands swaying in the wind", bg: "rgba(180, 191, 169, 0.06)" },
  { type: "photo", src: IMAGE_BOOK, caption: "well-loved pages", rotation: -1.5 },
  { type: "text", text: "A cup of tea growing cold while you think", bg: "rgba(194, 153, 149, 0.05)" },
  { type: "text", text: "The worn edges of a well-loved book", bg: "rgba(90, 96, 68, 0.05)" },
  { type: "text", text: "Cobblestones polished by a thousand footsteps", bg: "rgba(107, 142, 155, 0.05)" },
  { type: "photo", src: IMAGE_COBBLE, caption: "a thousand footsteps", rotation: 2.5 },
  { type: "text", text: "Silence between two people who understand each other", bg: "rgba(121, 100, 111, 0.05)" },
];

const staggerOrder = [3, 7, 0, 5, 9, 2, 6, 1, 8, 4, 10, 11, 12];
const floatDurations = [6, 7, 5.5, 6.5, 7.5, 5, 8, 6.2, 5.8, 7.2, 6.8, 5.3, 7.1];
const floatDelays = [0, 1, 0.5, 1.5, 0.3, 2, 0.8, 1.2, 1.8, 0.6, 0.4, 1.4, 0.9];

const NamelessBeauties = () => {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={containerRef} style={{ textAlign: "center" }}>
      <h3
        className="font-display font-bold"
        style={{
          fontSize: "clamp(24px, 3vw, 36px)",
          color: "hsl(var(--primary))",
        }}
      >
        The nameless beauties
      </h3>
      <p
        className="font-body"
        style={{
          fontWeight: 300,
          fontStyle: "italic",
          fontSize: 15,
          color: "hsl(var(--foreground) / 0.45)",
          maxWidth: 520,
          margin: "12px auto 0",
          lineHeight: 1.6,
        }}
      >
        They range from the smallest details that bring us deep gratitude, to the
        peace and profound depth within our souls.
      </p>

      <div
        style={{
          marginTop: 48,
          maxWidth: 800,
          margin: "48px auto 0",
          columnCount: 3,
          columnGap: 20,
        }}
        className="nameless-grid"
      >
        {beauties.map((b, i) => {
          const order = staggerOrder.indexOf(i);
          const delay = (order >= 0 ? order : i) * 120;

          if (b.type === "photo") {
            return (
              <div
                key={i}
                className="polaroid"
                style={{
                  breakInside: "avoid",
                  margin: "0 auto 20px",
                  transform:
                    reducedMotion || revealed
                      ? `rotate(${b.rotation}deg)`
                      : `rotate(${b.rotation + (b.rotation > 0 ? 4 : -4)}deg)`,
                  opacity: reducedMotion || revealed ? 1 : 0,
                  transition: reducedMotion
                    ? "none"
                    : `opacity 600ms ease-out ${delay}ms, transform 600ms ease-out ${delay}ms`,
                }}
              >
                <img
                  src={b.src}
                  alt={b.caption}
                  className="alvie-photo"
                  style={{
                    width: "100%",
                    aspectRatio: "4/5",
                    objectFit: "cover",
                    borderRadius: 2,
                  }}
                />
                <p className="polaroid-caption">{b.caption}</p>
              </div>
            );
          }

          return (
            <div
              key={i}
              className="beauty-card"
              style={{
                breakInside: "avoid",
                marginBottom: 20,
                borderRadius: 12,
                padding: 28,
                background: b.bg,
                opacity: reducedMotion || revealed ? 1 : 0,
                transform:
                  reducedMotion || revealed ? "translateY(0)" : "translateY(16px)",
                transition: reducedMotion
                  ? "none"
                  : `opacity 400ms ease-out ${delay}ms, transform 400ms ease-out ${delay}ms`,
                animation:
                  !reducedMotion && revealed
                    ? `gentle-float ${floatDurations[i]}s ease-in-out infinite ${floatDelays[i]}s`
                    : "none",
              }}
            >
              <p
                className="font-body"
                style={{
                  fontWeight: 300,
                  fontStyle: "italic",
                  fontSize: "clamp(14px, 1.4vw, 16px)",
                  color: "hsl(var(--foreground) / 0.55)",
                  lineHeight: 1.6,
                  textAlign: "center",
                }}
              >
                {b.text}
              </p>
            </div>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nameless-grid { column-count: 1 !important; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .nameless-grid { column-count: 2 !important; }
        }
      `}</style>
    </div>
  );
};

export default NamelessBeauties;
