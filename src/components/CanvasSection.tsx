import { useRef, useState, useEffect, useCallback } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Search } from "lucide-react";
import StrategyComparison from "@/components/StrategyComparison";
import FadingStorefront from "@/components/FadingStorefront";
import TornEdge from "@/components/ui/TornEdge";
import useRevealOnScroll from "@/hooks/useRevealOnScroll";
import useReducedMotion from "@/hooks/useReducedMotion";

const IMAGE_CRAFT =
  "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=1000&fit=crop";

/* ── Typing animation sequence ─────────────────────────── */
const useTypingAnimation = (active: boolean, reducedMotion: boolean) => {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const runningRef = useRef(false);
  const cancelRef = useRef(false);

  useEffect(() => {
    const id = setInterval(() => setShowCursor((p) => !p), 530);
    return () => clearInterval(id);
  }, []);

  const run = useCallback(async () => {
    if (runningRef.current || reducedMotion) return;
    runningRef.current = true;
    cancelRef.current = false;

    const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

    const typeText = async (target: string, speed: number) => {
      for (let i = 1; i <= target.length; i++) {
        if (cancelRef.current) return;
        setDisplayText(target.slice(0, i));
        await wait(speed);
      }
    };

    const deleteText = async (text: string, speed: number) => {
      for (let i = text.length - 1; i >= 0; i--) {
        if (cancelRef.current) return;
        setDisplayText(text.slice(0, i));
        await wait(speed);
      }
      setDisplayText("");
    };

    while (!cancelRef.current) {
      setDisplayText("");
      await wait(500);
      await typeText("Your Company Na", 80);
      await wait(1500);
      await typeText("Your Company Name", 150);
      await wait(1500);
      await deleteText("Your Company Name", 50);
      await wait(1500);
      await typeText("...", 300);
      await wait(2000);
    }

    runningRef.current = false;
  }, [reducedMotion]);

  useEffect(() => {
    if (active && !reducedMotion) {
      const timeout = setTimeout(run, 500);
      return () => {
        clearTimeout(timeout);
        cancelRef.current = true;
      };
    }
  }, [active, run, reducedMotion]);

  return { displayText: reducedMotion ? "Your Company Name" : displayText, showCursor };
};

/* ── Component ─────────────────────────────────────────── */
const CanvasSection = () => {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [searchVisible, setSearchVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const header = useRevealOnScroll();
  const provoke = useRevealOnScroll();
  const photoReveal = useRevealOnScroll();
  const searchBlock = useRevealOnScroll();
  const strategyBlock = useRevealOnScroll();

  const { displayText, showCursor } = useTypingAnimation(searchVisible, prefersReducedMotion);

  /* ── IntersectionObserver for search bar typing ───────── */
  useEffect(() => {
    const el = document.querySelector(".hesitation-search");
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setSearchVisible(true);
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* ── Mini-TOC sync ── */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          document.querySelectorAll(".mini-toc-row").forEach((r) => r.classList.remove("active"));
          document.querySelector(".mini-toc-row:nth-child(2)")?.classList.add("active");
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const elasticStyle: React.CSSProperties = {
    marginLeft: isMobile ? 0 : "var(--nav-width, 64px)",
    width: isMobile ? "100%" : "calc(100vw - var(--nav-width, 64px))",
    paddingLeft: isMobile ? 24 : "var(--safe-space, 48px)",
    paddingRight: isMobile ? 24 : "var(--safe-space, 48px)",
    transition:
      "margin-left 400ms cubic-bezier(0.4,0,0.2,1), width 400ms cubic-bezier(0.4,0,0.2,1)",
  };

  const revealStyle = (revealed: boolean, delay = 0): React.CSSProperties => ({
    opacity: prefersReducedMotion || revealed ? 1 : 0,
    transform: prefersReducedMotion || revealed ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 700ms cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform 700ms cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
  });

  return (
    <section
      ref={sectionRef}
      id="section-problem"
      className="canvas-section relative"
      style={{
        zIndex: 15,
        backgroundColor: "hsl(var(--background))",
      }}
    >
      {/* Torn paper top edge */}
      <TornEdge variant={1} />

      {/* Soft bottom-edge gradient for uncover transition */}
      <div
        className="absolute left-0 right-0 bottom-0 pointer-events-none"
        style={{
          height: 120,
          background: "linear-gradient(to bottom, hsl(var(--background)), transparent)",
          zIndex: 1,
        }}
      />

      <div
        style={{
          ...elasticStyle,
          paddingTop: isMobile ? 64 : 120,
          paddingBottom: 120,
        }}
      >
        {/* ── BLOCK 1: Editorial Two-Column — Text + Photo ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? 40 : 64,
            maxWidth: 1000,
            marginLeft: "auto",
            marginRight: "auto",
            alignItems: "center",
          }}
        >
          {/* Mobile: photo first */}
          {isMobile && (
            <div ref={photoReveal.ref} style={revealStyle(photoReveal.revealed)}>
              <div
                style={{
                  borderRadius: 8,
                  overflow: "hidden",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
                }}
              >
                <img
                  src={IMAGE_CRAFT}
                  alt="Warm detail of creative craftsmanship"
                  className="alvie-photo"
                  loading="lazy"
                  width={800}
                  height={1000}
                  style={{
                    width: "100%",
                    aspectRatio: "4/5",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
            </div>
          )}

          {/* Left column — text content */}
          <div>
            <div ref={header.ref}>
              <h2
                className="font-display font-bold"
                style={{
                  fontSize: "clamp(28px, 4vw, 48px)",
                  color: "hsl(var(--primary))",
                  lineHeight: 1.15,
                  textAlign: "left",
                  ...revealStyle(header.revealed),
                }}
              >
                Does your digital presence match your operational capacity?
              </h2>
            </div>

            <p
              className="font-body"
              style={{
                fontWeight: 400,
                fontSize: "clamp(15px, 1.5vw, 17px)",
                color: "hsl(var(--foreground) / 0.7)",
                lineHeight: 1.8,
                textAlign: "left",
                marginTop: 24,
                ...revealStyle(header.revealed, 200),
              }}
            >
              You've probably noticed this before. The hesitation to share your
              website or business materials. Because you know that your digital
              platforms don't accurately represent the quality of your operations.
              If you recognize this inconsistency, the market observes it as well.
            </p>
          </div>

          {/* Right column — Photo (desktop only) */}
          {!isMobile && (
            <div ref={photoReveal.ref} style={revealStyle(photoReveal.revealed, 300)}>
              <div
                style={{
                  borderRadius: 8,
                  overflow: "hidden",
                  transform: "rotate(-2deg)",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
                }}
              >
                <img
                  src={IMAGE_CRAFT}
                  alt="Warm detail of creative craftsmanship"
                  className="alvie-photo"
                  loading="lazy"
                  width={800}
                  height={1000}
                  style={{
                    width: "100%",
                    aspectRatio: "4/5",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* ── BLOCK 2: The Breathing Moment — Isolated Question ── */}
        <div style={{ height: 120 }} />

        <div ref={provoke.ref} style={{ textAlign: "center", maxWidth: 500, margin: "0 auto" }}>
          <div
            style={{
              width: 40,
              height: 1,
              background: "hsl(var(--secondary))",
              margin: "0 auto 24px",
              transform: prefersReducedMotion || provoke.revealed ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "center",
              transition: "transform 500ms cubic-bezier(0.4,0,0.2,1)",
            }}
          />
          <h3
            className="font-display font-bold italic"
            style={{
              fontSize: "clamp(28px, 3.5vw, 44px)",
              color: "hsl(var(--primary))",
              lineHeight: 1.3,
              ...revealStyle(provoke.revealed, 150),
            }}
          >
            Do you really just want to exist like that?
          </h3>
        </div>

        <div style={{ height: 80 }} />

        {/* ── BLOCK 3: Hesitation Search Bar ── */}
        <div
          ref={searchBlock.ref}
          className="hesitation-search-wrapper"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            ...revealStyle(searchBlock.revealed),
          }}
        >
          <div
            className="hesitation-search"
            role="presentation"
            aria-label="Animated demonstration of hesitation when sharing your company online"
            style={{
              width: "100%",
              maxWidth: 560,
              height: isMobile ? 56 : 64,
              border: "1px solid hsl(var(--primary) / 0.15)",
              borderRadius: 12,
              background: "hsl(var(--primary) / 0.03)",
              padding: "0 24px",
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: isMobile ? 16 : 18,
              color: "hsl(var(--foreground))",
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
          >
            <Search
              size={20}
              style={{
                color: "hsl(var(--primary) / 0.3)",
                marginRight: 16,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                color: displayText
                  ? "hsl(var(--foreground))"
                  : "hsl(var(--foreground) / 0.25)",
                flex: 1,
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {displayText || "Search your company..."}
            </span>
            <span
              style={{
                display: "inline-block",
                width: 2,
                height: 22,
                background: "hsl(var(--primary))",
                marginLeft: 2,
                opacity: showCursor ? 1 : 0,
                transition: "opacity 100ms",
                flexShrink: 0,
              }}
            />
          </div>

          <p
            className="font-body italic text-center"
            style={{
              fontWeight: 300,
              fontSize: 14,
              color: "hsl(var(--foreground) / 0.45)",
              maxWidth: 400,
              marginTop: 24,
            }}
          >
            The moment of hesitation that costs you opportunities every day.
          </p>
        </div>

        <div style={{ height: 60 }} />

        {/* ── BLOCK 4: Strategy Reality — FadingStorefront + Comparison ── */}
        <div
          ref={strategyBlock.ref}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1.2fr",
            gap: 40,
            maxWidth: 960,
            margin: "0 auto",
            alignItems: "center",
            ...revealStyle(strategyBlock.revealed),
          }}
        >
          <div>
            <FadingStorefront darkMode={false} />
          </div>
          <div>
            <StrategyComparison />
          </div>
        </div>
      </div>

      {/* Torn paper bottom edge (inverted) */}
      <TornEdge variant={2} flip />
    </section>
  );
};

export default CanvasSection;
