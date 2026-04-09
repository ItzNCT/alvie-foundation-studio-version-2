import { useRef, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import useReducedMotion from "@/hooks/useReducedMotion";
import useRevealOnScroll from "@/hooks/useRevealOnScroll";
import ALVIEAcronym from "@/components/about/ALVIEAcronym";
import NamelessBeauties from "@/components/about/NamelessBeauties";
import TornEdge from "@/components/ui/TornEdge";
import ElasticContent from "@/components/ui/ElasticContent";

const IMAGE_TEACUP = "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=750&fit=crop";
const IMAGE_GOLDEN = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1400&h=700&fit=crop";

const AboutUsCanvas = () => {
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);

  const opener = useRevealOnScroll(0.15);
  const acronymLine = useRevealOnScroll(0.15);
  const visionPhoto = useRevealOnScroll(0.1);
  const mission = useRevealOnScroll(0.15);
  const closer = useRevealOnScroll(0.1);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          document.querySelectorAll(".mini-toc-row").forEach((r) => r.classList.remove("active"));
          document.querySelector(".mini-toc-row:nth-child(6)")?.classList.add("active");
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const reveal = (revealed: boolean, delay = 0): React.CSSProperties => ({
    opacity: reducedMotion || revealed ? 1 : 0,
    transform: reducedMotion || revealed ? "translateY(0)" : "translateY(24px)",
    transition: reducedMotion
      ? "none"
      : `opacity 700ms cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform 700ms cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
  });

  return (
    <section
      ref={sectionRef}
      id="section-aboutus"
      className="aboutus-canvas relative"
      style={{ zIndex: 15, backgroundColor: "hsl(var(--background))" }}
    >
      <TornEdge variant={2} />

      <ElasticContent>
        <div style={{ paddingTop: 120, paddingBottom: 0 }}>

          {/* ═══ BLOCK 1: Editorial Origin — Polaroid + Text ═══ */}
          <div
            ref={opener.ref}
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1.3fr",
              gap: isMobile ? 40 : 64,
              maxWidth: 950,
              margin: "0 auto",
              alignItems: "center",
            }}
          >
            {/* Polaroid */}
            <div
              style={{
                ...reveal(opener.revealed, 0),
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                className="polaroid"
                style={{
                  transform: reducedMotion || opener.revealed ? "rotate(-2deg)" : "rotate(-8deg)",
                  transition: reducedMotion ? "none" : "transform 600ms ease-out, opacity 700ms ease-out",
                  maxWidth: isMobile ? 240 : 300,
                  opacity: reducedMotion || opener.revealed ? 1 : 0,
                }}
              >
                <img
                  src={IMAGE_TEACUP}
                  alt="Ceramic cup in warm morning light"
                  className="alvie-photo"
                  style={{
                    width: "100%",
                    aspectRatio: "4/5",
                    objectFit: "cover",
                    borderRadius: 2,
                  }}
                />
                <p className="polaroid-caption">a nameless beauty</p>
              </div>
            </div>

            {/* Text */}
            <div style={isMobile ? {} : reveal(opener.revealed, 200)}>
              <span
                className="font-body"
                style={{
                  fontWeight: 500,
                  fontSize: 14,
                  color: "hsl(var(--secondary))",
                  letterSpacing: "0.1em",
                  ...reveal(opener.revealed, 100),
                }}
              >
                VI
              </span>
              <div
                style={{
                  width: 40,
                  height: 1,
                  background: "hsl(var(--secondary))",
                  margin: "16px 0",
                  ...reveal(opener.revealed, 150),
                }}
              />
              <h2
                className="font-display font-bold"
                style={{
                  fontSize: "clamp(28px, 4vw, 44px)",
                  color: "hsl(var(--primary))",
                  lineHeight: 1.2,
                  ...reveal(opener.revealed, 200),
                }}
              >
                We are the quiet observers.
              </h2>
              <div style={{ height: 20 }} />
              <p
                className="font-body"
                style={{
                  fontWeight: 300,
                  fontSize: 16,
                  color: "hsl(var(--foreground) / 0.6)",
                  lineHeight: 1.8,
                  ...reveal(opener.revealed, 300),
                }}
              >
                Quiet and deeply empathetic amidst a rushed business world. We devote our
                full attention to recognizing the authentic beauty hidden deep within your
                business — like appreciating a gentle ray of afternoon sunlight or a simple
                smile from a passerby.
              </p>
            </div>
          </div>

          {/* 96px gap */}
          <div style={{ height: 96 }} />

          {/* ═══ BLOCK 2: ALVIE Acronym ═══ */}
          <div ref={acronymLine.ref}>
            {/* Subtle gold line above */}
            <div
              style={{
                width: 64,
                height: 1,
                background: "hsl(var(--secondary))",
                margin: "0 auto 24px",
                opacity: reducedMotion || acronymLine.revealed ? 1 : 0,
                transform: reducedMotion || acronymLine.revealed ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "center",
                transition: reducedMotion ? "none" : "transform 500ms ease-out, opacity 500ms ease-out",
              }}
            />
            <ALVIEAcronym />
          </div>

          {/* 96px gap */}
          <div style={{ height: 96 }} />

          {/* ═══ BLOCK 3: Full-Width Photo + Vision Overlay ═══ */}
          <div
            ref={visionPhoto.ref}
            style={{
              position: "relative",
              borderRadius: 12,
              overflow: "hidden",
              height: "clamp(360px, 50vh, 520px)",
              transform: reducedMotion || visionPhoto.revealed ? "scale(1)" : "scale(1.03)",
              transition: reducedMotion ? "none" : "transform 1s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            <img
              src={IMAGE_GOLDEN}
              alt="Warm interior light"
              className="alvie-photo"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            {/* Dark gradient overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(26,26,24,0.65) 0%, transparent 55%)",
              }}
            />
            {/* Content at bottom-left */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                padding: isMobile ? 24 : 48,
                maxWidth: 460,
              }}
            >
              <span
                className="font-body"
                style={{
                  fontWeight: 500,
                  fontSize: 11,
                  color: "hsl(var(--secondary))",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                }}
              >
                Our vision
              </span>
              <p
                className="font-display font-bold"
                style={{
                  fontSize: "clamp(22px, 3vw, 32px)",
                  color: "rgba(255,255,255,0.9)",
                  fontStyle: "italic",
                  lineHeight: 1.35,
                  marginTop: 8,
                }}
              >
                Crafting a digital world where all core values are truly seen and appreciated.
              </p>
            </div>
          </div>

          {/* 64px gap */}
          <div style={{ height: 64 }} />

          {/* ═══ BLOCK 4: Mission — Right-Aligned ═══ */}
          <div
            ref={mission.ref}
            style={{
              maxWidth: 480,
              marginLeft: "auto",
              textAlign: "right",
              ...reveal(mission.revealed, 0),
            }}
          >
            <span
              className="font-body"
              style={{
                fontWeight: 500,
                fontSize: 11,
                color: "hsl(var(--secondary))",
                textTransform: "uppercase",
                letterSpacing: "2px",
              }}
            >
              Our mission
            </span>
            <div
              style={{
                width: 40,
                height: 1,
                background: "hsl(var(--secondary))",
                marginLeft: "auto",
                marginTop: 12,
                marginBottom: 16,
              }}
            />
            <p
              className="font-display font-bold"
              style={{
                fontSize: "clamp(20px, 2.5vw, 28px)",
                color: "hsl(var(--primary))",
                fontStyle: "italic",
                lineHeight: 1.35,
              }}
            >
              Synchronize your real-world capabilities with your digital reputation through
              strategic thinking and empathy.
            </p>
          </div>

          {/* 80px gap */}
          <div style={{ height: 80 }} />

          {/* ═══ BLOCK 5: Nameless Beauties ═══ */}
          <NamelessBeauties />

          {/* ═══ BLOCK 6: "To not just exist." ═══ */}
          <div
            ref={closer.ref}
            style={{
              textAlign: "center",
              paddingTop: 160,
              paddingBottom: 160,
            }}
          >
            <h2
              className="font-display font-bold"
              style={{
                fontSize: "clamp(36px, 5vw, 64px)",
                color: "hsl(var(--primary))",
                lineHeight: 1.2,
                letterSpacing: "0.5px",
                opacity: reducedMotion || closer.revealed ? 1 : 0,
                transition: reducedMotion ? "none" : "opacity 1.5s ease-out",
              }}
            >
              To not just exist.
            </h2>
          </div>
        </div>
      </ElasticContent>

      <TornEdge variant={1} flip />
    </section>
  );
};

export default AboutUsCanvas;
