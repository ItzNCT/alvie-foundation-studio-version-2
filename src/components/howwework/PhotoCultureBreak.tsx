import { useIsMobile } from "@/hooks/use-mobile";
import useReducedMotion from "@/hooks/useReducedMotion";
import useRevealOnScroll from "@/hooks/useRevealOnScroll";

const IMAGE_TEAM = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&h=700&fit=crop";

const cultureCards = [
  {
    title: "Quality over quantity",
    body: "We focus all our energy on perfecting every single project.",
  },
  {
    title: "Psychological safety",
    body: "A space where anyone can share ideas without fear of judgment.",
  },
  {
    title: "Discovery over assumption",
    body: "Facts and objectivity always come first.",
  },
];

const PhotoCultureBreak = () => {
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  const photoReveal = useRevealOnScroll(0.15);
  const cardsReveal = useRevealOnScroll(0.15);

  return (
    <div>
      {/* Full-width photo with overlaid quote */}
      <div
        ref={photoReveal.ref}
        style={{
          position: "relative",
          borderRadius: 12,
          overflow: "hidden",
          height: "clamp(360px, 45vh, 560px)",
        }}
      >
        <img
          src={IMAGE_TEAM}
          alt="ALVIE team collaboration"
          className="alvie-photo"
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transform: reducedMotion || photoReveal.revealed ? "scale(1)" : "scale(1.03)",
            transition: "transform 1s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        {/* Dark gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(26,26,24,0.65) 0%, transparent 50%)",
            pointerEvents: "none",
          }}
        />
        {/* Quote text */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            padding: isMobile ? 24 : 40,
          }}
        >
          <p
            className="font-display font-bold italic"
            style={{
              fontSize: "clamp(22px, 3vw, 32px)",
              color: "rgba(255,255,255,0.92)",
              maxWidth: 460,
              lineHeight: 1.35,
            }}
          >
            "We believe that outstanding work can only come from a team that is genuinely happy."
          </p>
        </div>
      </div>

      <div style={{ height: 48 }} />

      {/* Three culture cards */}
      <div
        ref={cardsReveal.ref}
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
          gap: 24,
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        {cultureCards.map((card, i) => (
          <div
            key={card.title}
            style={{
              borderTop: "2px solid hsl(var(--secondary))",
              padding: 24,
              opacity: reducedMotion || cardsReveal.revealed ? 1 : 0,
              transform: reducedMotion || cardsReveal.revealed ? "translateY(0)" : "translateY(24px)",
              transition: `opacity 700ms cubic-bezier(0.4,0,0.2,1) ${i * 100}ms, transform 700ms cubic-bezier(0.4,0,0.2,1) ${i * 100}ms`,
            }}
          >
            <h5
              className="font-body"
              style={{
                fontWeight: 600,
                fontSize: 16,
                color: "hsl(var(--primary))",
              }}
            >
              {card.title}
            </h5>
            <p
              className="font-body"
              style={{
                fontWeight: 300,
                fontSize: 13,
                color: "hsl(var(--foreground) / 0.45)",
                lineHeight: 1.6,
                marginTop: 8,
              }}
            >
              {card.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoCultureBreak;
