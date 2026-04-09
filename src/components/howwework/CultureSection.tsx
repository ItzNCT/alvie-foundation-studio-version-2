import { useIsMobile } from "@/hooks/use-mobile";
import useReducedMotion from "@/hooks/useReducedMotion";
import useRevealOnScroll from "@/hooks/useRevealOnScroll";

const cultureCards = [
  {
    title: "Quality over quantity",
    body: "We focus all our energy on perfecting every single project. No mass production, no shortcuts.",
  },
  {
    title: "Psychological safety",
    body: "A space where anyone can share ideas without fear of judgment. Honest critique, never ego.",
  },
  {
    title: "Discovery over assumption",
    body: "Facts and objectivity always come first. We challenge ideas relentlessly to uncover the truth.",
  },
];

const CultureSection = () => {
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  const quoteReveal = useRevealOnScroll();
  const bodyReveal = useRevealOnScroll();
  const cardsReveal = useRevealOnScroll();

  const revealStyle = (revealed: boolean, delay = 0): React.CSSProperties => ({
    opacity: reducedMotion || revealed ? 1 : 0,
    transform: reducedMotion || revealed ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 700ms cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform 700ms cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
  });

  return (
    <div>
      {/* Two-column layout */}
      <div
        ref={quoteReveal.ref}
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "55fr 45fr",
          gap: isMobile ? 32 : 48,
          alignItems: "center",
          maxWidth: 850,
          margin: "0 auto",
        }}
      >
        {/* Left: Pull quote */}
        <p
          className="font-display font-bold"
          style={{
            fontSize: "clamp(22px, 3vw, 30px)",
            color: "hsl(var(--primary))",
            fontStyle: "italic",
            lineHeight: 1.35,
            ...revealStyle(quoteReveal.revealed),
          }}
        >
          "We believe that outstanding work can only come from a team that is genuinely happy."
        </p>

        {/* Right: Body text */}
        <div ref={bodyReveal.ref} style={revealStyle(bodyReveal.revealed, 150)}>
          <h4
            className="font-body"
            style={{
              fontWeight: 600,
              fontSize: 18,
              color: "hsl(var(--primary))",
            }}
          >
            The foundation of everything we deliver
          </h4>
          <p
            className="font-body"
            style={{
              fontWeight: 300,
              fontSize: 15,
              color: "hsl(var(--foreground) / 0.6)",
              lineHeight: 1.8,
              marginTop: 12,
            }}
          >
            ALVIE maintains a people-first philosophy where the well-being of our team
            comes before deadlines. This isn't idealism — it's strategy. A team that feels
            genuinely valued naturally delivers the most dedicated support to our clients.
          </p>
        </div>
      </div>

      {/* Value cards */}
      <div
        ref={cardsReveal.ref}
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
          gap: 24,
          maxWidth: 850,
          margin: "48px auto 0",
        }}
      >
        {cultureCards.map((card, i) => (
          <div
            key={card.title}
            className="culture-card"
            style={{
              borderTop: "2px solid hsl(var(--secondary))",
              padding: 24,
              cursor: "default",
              transition: "background 300ms ease",
              ...revealStyle(cardsReveal.revealed, i * 100),
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(15,92,78,0.03)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
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
                color: "hsl(var(--foreground) / 0.5)",
                lineHeight: 1.7,
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

export default CultureSection;
