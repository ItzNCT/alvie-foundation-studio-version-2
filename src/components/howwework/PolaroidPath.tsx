import { useIsMobile } from "@/hooks/use-mobile";
import useReducedMotion from "@/hooks/useReducedMotion";
import useRevealOnScroll from "@/hooks/useRevealOnScroll";

const IMAGE_SKETCH = "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=600&h=750&fit=crop";
const IMAGE_COMPASS = "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&h=750&fit=crop";
const IMAGE_PEN = "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=750&fit=crop";
const IMAGE_DETAIL = "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?w=600&h=750&fit=crop";
const IMAGE_SEEDLING = "https://images.unsplash.com/photo-1416339134316-0e91dc9ded92?w=600&h=750&fit=crop";

const phases = [
  {
    num: "01",
    title: "Discovery",
    body: "We begin by listening. Through deep research and first-principle thinking, we find the truth behind the surface.",
    image: IMAGE_SKETCH,
    caption: "looking deeper",
    rotation: -2,
  },
  {
    num: "02",
    title: "Strategy",
    body: "We translate raw insights into a clear digital roadmap. Every design decision traces back to a strategic reason.",
    image: IMAGE_COMPASS,
    caption: "finding direction",
    rotation: 3,
  },
  {
    num: "03",
    title: "Design",
    body: "Strategy becomes visible. We craft every touchpoint as a bespoke creation — refined until it resonates.",
    image: IMAGE_PEN,
    caption: "making it real",
    rotation: -1.5,
  },
  {
    num: "04",
    title: "Refine",
    body: "Through honest feedback and objective critique, we push every detail until it meets the highest standard.",
    image: IMAGE_DETAIL,
    caption: "every detail matters",
    rotation: 2.5,
  },
  {
    num: "05",
    title: "Launch & beyond",
    body: "Your digital presence goes live — but our partnership doesn't end. A brand is a living thing.",
    image: IMAGE_SEEDLING,
    caption: "growing together",
    rotation: -3,
  },
];

const Polaroid = ({
  src,
  caption,
  rotation,
  revealed,
  reducedMotion,
}: {
  src: string;
  caption: string;
  rotation: number;
  revealed: boolean;
  reducedMotion: boolean;
}) => {
  const startRotation = rotation + (rotation > 0 ? 6 : -6);
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "12px 12px 40px 12px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
        maxWidth: 280,
        margin: "0 auto",
        opacity: reducedMotion || revealed ? 1 : 0,
        transform: reducedMotion || revealed
          ? `rotate(${rotation}deg)`
          : `rotate(${startRotation}deg) translateY(20px)`,
        transition: "opacity 600ms ease-out, transform 600ms ease-out",
      }}
    >
      <img
        src={src}
        alt={caption}
        className="alvie-photo"
        loading="lazy"
        style={{
          width: "100%",
          aspectRatio: "4 / 5",
          objectFit: "cover",
          borderRadius: 2,
          display: "block",
        }}
        onError={(e) => {
          const el = e.currentTarget;
          el.style.display = "none";
          const fallback = el.nextElementSibling as HTMLElement;
          if (fallback) fallback.style.display = "flex";
        }}
      />
      <div
        style={{
          display: "none",
          aspectRatio: "4 / 5",
          background: "linear-gradient(135deg, hsl(var(--primary) / 0.08), hsl(var(--secondary) / 0.08))",
          borderRadius: 2,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span className="font-body" style={{ fontSize: 13, color: "hsl(var(--foreground) / 0.2)" }}>
          Photo placeholder
        </span>
      </div>
      <p
        className="font-body"
        style={{
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: 13,
          color: "hsl(var(--foreground) / 0.4)",
          textAlign: "center",
          marginTop: 12,
        }}
      >
        {caption}
      </p>
    </div>
  );
};

const PhaseBlock = ({
  phase,
  index,
  isMobile,
  reducedMotion,
}: {
  phase: (typeof phases)[0];
  index: number;
  isMobile: boolean;
  reducedMotion: boolean;
}) => {
  const { ref, revealed } = useRevealOnScroll(0.15);
  const isPhotoLeft = index % 2 === 0;

  const textContent = (
    <div style={{ position: "relative", maxWidth: 320 }}>
      <span
        className="font-display"
        style={{
          fontWeight: 800,
          fontSize: 48,
          color: "hsl(var(--secondary) / 0.08)",
          position: "absolute",
          top: -12,
          left: -8,
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {phase.num}
      </span>
      <h4
        className="font-display font-bold"
        style={{
          fontSize: 22,
          color: "hsl(var(--primary))",
          position: "relative",
        }}
      >
        {phase.title}
      </h4>
      <p
        className="font-body"
        style={{
          fontWeight: 300,
          fontSize: 15,
          color: "hsl(var(--foreground) / 0.55)",
          lineHeight: 1.8,
          marginTop: 12,
          maxWidth: 320,
        }}
      >
        {phase.body}
      </p>
    </div>
  );

  const polaroid = (
    <Polaroid
      src={phase.image}
      caption={phase.caption}
      rotation={isMobile ? 0 : phase.rotation}
      revealed={revealed}
      reducedMotion={reducedMotion}
    />
  );

  if (isMobile) {
    return (
      <div ref={ref} style={{ marginBottom: 64 }}>
        <div style={{ maxWidth: 220, margin: "0 auto" }}>{polaroid}</div>
        <div style={{ marginTop: 24 }}>{textContent}</div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 40,
        alignItems: "center",
        maxWidth: 900,
        margin: "0 auto 64px",
      }}
    >
      {isPhotoLeft ? (
        <>
          {polaroid}
          <div style={{
            opacity: reducedMotion || revealed ? 1 : 0,
            transform: reducedMotion || revealed ? "translateX(0)" : "translateX(20px)",
            transition: "opacity 600ms ease-out 100ms, transform 600ms ease-out 100ms",
          }}>
            {textContent}
          </div>
        </>
      ) : (
        <>
          <div style={{
            opacity: reducedMotion || revealed ? 1 : 0,
            transform: reducedMotion || revealed ? "translateX(0)" : "translateX(-20px)",
            transition: "opacity 600ms ease-out 100ms, transform 600ms ease-out 100ms",
          }}>
            {textContent}
          </div>
          {polaroid}
        </>
      )}
    </div>
  );
};

const PolaroidPath = () => {
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  const headerReveal = useRevealOnScroll();

  return (
    <div>
      <div ref={headerReveal.ref}>
        <h3
          className="font-display font-bold"
          style={{
            fontSize: "clamp(24px, 3vw, 36px)",
            color: "hsl(var(--primary))",
            textAlign: "left",
            opacity: reducedMotion || headerReveal.revealed ? 1 : 0,
            transform: reducedMotion || headerReveal.revealed ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 700ms cubic-bezier(0.4,0,0.2,1), transform 700ms cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          How every project unfolds
        </h3>
      </div>
      <div style={{ height: 48 }} />

      <div style={{ position: "relative" }}>
        {/* Center connecting line (desktop only) */}
        {!isMobile && (
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 64,
              width: 1,
              background: "hsl(var(--secondary) / 0.1)",
              transform: "translateX(-0.5px)",
              pointerEvents: "none",
            }}
          />
        )}

        {phases.map((phase, i) => (
          <PhaseBlock
            key={phase.num}
            phase={phase}
            index={i}
            isMobile={isMobile}
            reducedMotion={reducedMotion}
          />
        ))}
      </div>
    </div>
  );
};

export default PolaroidPath;
