import { useState, useEffect, useRef, useCallback } from "react";
import useReducedMotion from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/use-mobile";

/* ── Phase type ──────────────────────────────────────── */
type Phase =
  | "idle"
  | "bad-countdown"
  | "bad-closing"
  | "bad-message"
  | "good-opening"
  | "good-countdown"
  | "good-message"
  | "pause";

/* ── Cursor SVG ──────────────────────────────────────── */
const CursorIcon = () => (
  <svg width="24" height="28" viewBox="0 0 24 28" fill="none" style={{ filter: "drop-shadow(1px 2px 3px rgba(26,26,24,0.3))" }}>
    <path
      d="M2 1L2 21L7.5 15.5L13 27L17 25L11.5 14L19 12.5L2 1Z"
      fill="hsl(var(--foreground))"
      stroke="hsl(var(--background))"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

/* ── Bad website abstract blocks ─────────────────────── */
const BadSite = ({ count, xHover }: { count: number; xHover: boolean }) => (
  <div style={{ width: "100%", height: "100%", background: "#f0f0f0", padding: 16, overflow: "hidden", position: "relative" }}>
    {/* Nav bar */}
    <div style={{ display: "flex", gap: 10, marginBottom: 14, alignItems: "center" }}>
      <div style={{ width: 70, height: 10, background: "#ccc", borderRadius: 4 }} />
      <div style={{ flex: 1 }} />
      <div style={{ width: 36, height: 8, background: "#ddd", borderRadius: 4 }} />
      <div style={{ width: 36, height: 8, background: "#ddd", borderRadius: 4 }} />
      <div style={{ width: 36, height: 8, background: "#ddd", borderRadius: 4 }} />
    </div>
    {/* Hero area */}
    <div
      style={{
        background: "#e2e2e2",
        height: "38%",
        borderRadius: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {count >= 6 ? (
        /* Spinning loader */
        <div
          style={{
            width: 28,
            height: 28,
            border: "3px solid #ccc",
            borderTop: "3px solid #999",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
      ) : (
        <span style={{ fontSize: 28, color: "#bbb" }}>⚠️</span>
      )}
    </div>
    {/* Misaligned text lines */}
    <div style={{ marginTop: 14 }}>
      <div style={{ width: "88%", height: 9, background: "#d9d9d9", borderRadius: 3, marginBottom: 7 }} />
      <div style={{ width: "55%", height: 9, background: "#d9d9d9", borderRadius: 3, marginBottom: 7, marginLeft: 28 }} />
      <div style={{ width: "72%", height: 9, background: "#e0e0e0", borderRadius: 3 }} />
    </div>
    {/* Garish buttons */}
    <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
      <div style={{ background: "#ff4444", padding: "5px 14px", borderRadius: 2, fontSize: 10, color: "#fff", fontWeight: 700 }}>
        CLICK HERE!!!
      </div>
      <div style={{ background: "#00ff88", padding: "5px 14px", borderRadius: 2, fontSize: 10, color: "#333", fontWeight: 700 }}>
        BUY NOW
      </div>
    </div>

    {/* Popup banners — appear at count <= 5 */}
    {count <= 5 && count > 0 && (
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#ff4444",
          color: "#fff",
          fontSize: 10,
          fontWeight: 800,
          fontFamily: "var(--font-body)",
          padding: "6px 10px",
          textAlign: "center",
          animation: "slide-up-popup 300ms ease-out forwards",
          zIndex: 2,
          letterSpacing: 0.5,
        }}
      >
        🔔 SUBSCRIBE NOW!!! DON'T MISS OUT!!!
      </div>
    )}

    {count <= 4 && count > 0 && (
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "10%",
          right: "10%",
          background: "#ffe600",
          color: "#333",
          fontSize: 11,
          fontWeight: 800,
          fontFamily: "var(--font-body)",
          padding: "10px",
          textAlign: "center",
          borderRadius: 4,
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          animation: "scale-in-popup 200ms ease-out forwards",
          zIndex: 3,
        }}
      >
        💥 CLICK HERE FOR 50% DISCOUNT!!!
        <div style={{ fontSize: 8, marginTop: 2, color: "#666" }}>* limited time only</div>
      </div>
    )}

    {/* X close button highlight in chrome — rendered as overlay at top-right */}
    {xHover && (
      <div
        style={{
          position: "absolute",
          top: -40,
          right: 8,
          width: 28,
          height: 28,
          borderRadius: 6,
          background: count <= 1 ? "rgba(255,59,48,0.25)" : "rgba(255,59,48,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 200ms ease",
          zIndex: 20,
        }}
      >
        <span style={{ fontSize: 14, color: "#FF3B30", fontWeight: 700 }}>✕</span>
      </div>
    )}
  </div>
);

/* ── Good website abstract blocks ────────────────────── */
const GoodSite = ({
  scrolled,
  clicked,
  ctaSuccess,
  contentVisible,
}: {
  scrolled: boolean;
  clicked: boolean;
  ctaSuccess: boolean;
  contentVisible: boolean;
}) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      background: "hsl(var(--background))",
      padding: 16,
      overflow: "hidden",
      transition: "transform 600ms ease",
      transform: scrolled ? "translateY(-18%)" : "translateY(0)",
    }}
  >
    {/* Nav */}
    <div
      style={{
        display: "flex",
        gap: 10,
        marginBottom: 18,
        alignItems: "center",
        opacity: contentVisible ? 1 : 0,
        transition: "opacity 400ms ease 0ms",
      }}
    >
      <div style={{ width: 56, height: 10, background: "hsl(var(--primary))", borderRadius: 4 }} />
      <div style={{ flex: 1 }} />
      <div style={{ width: 32, height: 7, background: "hsl(var(--primary) / 0.25)", borderRadius: 4 }} />
      <div style={{ width: 32, height: 7, background: "hsl(var(--primary) / 0.25)", borderRadius: 4 }} />
      <div style={{ width: 32, height: 7, background: "hsl(var(--primary) / 0.25)", borderRadius: 4 }} />
    </div>
    {/* Hero — warm gradient */}
    <div
      style={{
        background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.85) 100%)",
        height: "42%",
        borderRadius: 12,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "0 22px",
        opacity: contentVisible ? 1 : 0,
        transition: "opacity 400ms ease 150ms",
      }}
    >
      <div style={{ width: "68%", height: 9, background: "hsl(var(--background))", borderRadius: 4, marginBottom: 7 }} />
      <div style={{ width: "48%", height: 7, background: "hsl(var(--background) / 0.5)", borderRadius: 4, marginBottom: 14 }} />
      <div
        style={{
          background: ctaSuccess ? "hsl(var(--primary))" : "hsl(var(--secondary))",
          padding: "4px 14px",
          borderRadius: 8,
          fontSize: 10,
          color: "hsl(var(--background))",
          fontWeight: 500,
          transform: clicked ? "scale(0.92)" : "scale(1)",
          boxShadow: clicked ? "inset 0 2px 4px rgba(0,0,0,0.2)" : "0 1px 3px rgba(0,0,0,0.1)",
          transition: "transform 150ms ease, background 300ms ease, box-shadow 150ms ease",
        }}
      >
        {ctaSuccess ? "✓ Thank you" : "Get started"}
      </div>
    </div>
    {/* Clean text lines */}
    <div
      style={{
        marginTop: 18,
        opacity: contentVisible ? 1 : 0,
        transition: "opacity 400ms ease 300ms",
      }}
    >
      <div style={{ width: "78%", height: 7, background: "hsl(var(--foreground) / 0.2)", borderRadius: 3, marginBottom: 7 }} />
      <div style={{ width: "62%", height: 7, background: "hsl(var(--foreground) / 0.15)", borderRadius: 3, marginBottom: 7 }} />
      <div style={{ width: "70%", height: 7, background: "hsl(var(--foreground) / 0.1)", borderRadius: 3 }} />
    </div>
    {/* Card row */}
    <div
      style={{
        display: "flex",
        gap: 8,
        marginTop: 14,
        opacity: contentVisible ? 1 : 0,
        transition: "opacity 400ms ease 450ms",
      }}
    >
      {[1, 2, 3].map((n) => (
        <div
          key={n}
          style={{
            flex: 1,
            height: 44,
            background: "hsl(var(--primary) / 0.06)",
            borderRadius: 8,
            border: "1px solid hsl(var(--primary) / 0.1)",
          }}
        />
      ))}
    </div>
  </div>
);

/* ── Browser Chrome Frame ────────────────────────────── */
const BrowserFrame = ({
  children,
  visible,
  slamShut,
  cursorPos,
}: {
  children: React.ReactNode;
  visible: boolean;
  slamShut: boolean;
  cursorPos?: { x: number; y: number };
}) => (
  <div
    aria-hidden="true"
    style={{
      width: "100%",
      maxWidth: 600,
      margin: "0 auto",
      borderRadius: 12,
      overflow: "hidden",
      boxShadow: visible
        ? "0 20px 60px -15px rgba(26,26,24,0.15), 0 8px 24px -8px rgba(26,26,24,0.08)"
        : "none",
      transform: visible ? "scale(1) rotate(-1deg)" : "scale(0) rotate(-1deg)",
      opacity: visible ? 1 : 0,
      transition: slamShut
        ? "transform 200ms cubic-bezier(0.55, 0, 1, 0.45), opacity 150ms ease"
        : "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 400ms ease",
      position: "relative",
    }}
  >
    {/* Chrome bar */}
    <div
      style={{
        background: "#E5E5E5",
        height: 40,
        display: "flex",
        alignItems: "center",
        padding: "0 14px",
        gap: 8,
        position: "relative",
      }}
    >
      <div style={{ display: "flex", gap: 7 }}>
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FF5F57" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FFBD2E" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28CA41" }} />
      </div>
      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <div
          style={{
            background: "#F5F5F5",
            borderRadius: 6,
            height: 28,
            width: "60%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: 11, color: "#999", fontFamily: "var(--font-body)" }}>www.yourcompany.com</span>
        </div>
      </div>
    </div>
    {/* Content */}
    <div style={{ height: 300, overflow: "hidden", position: "relative", background: "#fff" }}>
      {children}
      {/* Cursor */}
      {cursorPos && (
        <div
          style={{
            position: "absolute",
            left: `${cursorPos.x}%`,
            top: `${cursorPos.y}%`,
            transition: "left 1s cubic-bezier(0.4,0,0.2,1), top 1s cubic-bezier(0.4,0,0.2,1)",
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          <CursorIcon />
        </div>
      )}
    </div>
  </div>
);

/* ── Static fallback for reduced motion ──────────────── */
const StaticFallback = () => {
  const isMobile = useIsMobile();
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        gap: 24,
        maxWidth: 640,
        margin: "0 auto",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid hsl(var(--foreground) / 0.08)", height: 220 }}>
          <BadSite count={2} xHover={false} />
        </div>
        <p
          className="font-body"
          style={{ fontSize: 13, color: "hsl(var(--foreground) / 0.4)", marginTop: 12 }}
        >
          Without strategic design
        </p>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid hsl(var(--foreground) / 0.08)", height: 220 }}>
          <GoodSite scrolled={false} clicked={false} ctaSuccess={false} contentVisible={true} />
        </div>
        <p
          className="font-body"
          style={{ fontSize: 13, color: "hsl(var(--primary))", marginTop: 12, fontWeight: 500 }}
        >
          With ALVIE
        </p>
      </div>
    </div>
  );
};

/* ── Inline keyframes (injected once) ────────────────── */
const styleId = "seven-second-test-styles";
const injectStyles = () => {
  if (document.getElementById(styleId)) return;
  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes slide-up-popup { from { transform: translateY(100%); } to { transform: translateY(0); } }
    @keyframes scale-in-popup { from { transform: scale(0.7); opacity: 0; } to { transform: scale(1); opacity: 1; } }
    @keyframes pulse-number { 0% { transform: scale(1); } 30% { transform: scale(1.12); } 100% { transform: scale(1); } }
    @keyframes msg-fade-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  `;
  document.head.appendChild(style);
};

/* ── Main Component ──────────────────────────────────── */
const SevenSecondTest = () => {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [count, setCount] = useState(7);
  const [browserVisible, setBrowserVisible] = useState(false);
  const [slamShut, setSlamShut] = useState(false);
  const [isGoodSite, setIsGoodSite] = useState(false);
  const [message, setMessage] = useState("");
  const [subMessage, setSubMessage] = useState("");
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | undefined>(undefined);
  const [goodScrolled, setGoodScrolled] = useState(false);
  const [goodClicked, setGoodClicked] = useState(false);
  const [goodCtaSuccess, setGoodCtaSuccess] = useState(false);
  const [goodContentVisible, setGoodContentVisible] = useState(false);
  const [xHover, setXHover] = useState(false);
  const activeRef = useRef(false);

  // Inject keyframes
  useEffect(() => { injectStyles(); }, []);

  // IntersectionObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const runSequence = useCallback(async () => {
    activeRef.current = true;

    const wait = (ms: number) =>
      new Promise<void>((resolve) => { setTimeout(resolve, ms); });

    const isActive = () => activeRef.current;

    while (isActive()) {
      // === RESET ===
      setIsGoodSite(false);
      setSlamShut(false);
      setBrowserVisible(true);
      setMessage("");
      setSubMessage("");
      setCursorPos(undefined);
      setGoodScrolled(false);
      setGoodClicked(false);
      setGoodCtaSuccess(false);
      setGoodContentVisible(false);
      setXHover(false);
      setPhase("bad-countdown");

      // === ACT 1: Bad website countdown 7 → 0 ===
      for (let i = 7; i >= 0; i--) {
        if (!isActive()) return;
        setCount(i);

        // At 3 — cursor starts moving toward X
        if (i === 3) {
          setCursorPos({ x: 88, y: 4 });
          setXHover(true);
        }
        // At 1 — cursor right on X, pressed look
        if (i === 1) {
          setCursorPos({ x: 93, y: 2 });
        }

        await wait(1000);
      }
      if (!isActive()) return;

      // === SLAM SHUT ===
      setPhase("bad-closing");
      setSlamShut(true);
      setBrowserVisible(false);
      setCursorPos(undefined);
      setXHover(false);
      await wait(500);
      if (!isActive()) return;

      // === Bad message ===
      setPhase("bad-message");
      setMessage("They've already left.");
      setSubMessage("and they won't come back.");
      await wait(2500);
      if (!isActive()) return;

      // === Clear ===
      setMessage("");
      setSubMessage("");
      await wait(500);
      if (!isActive()) return;

      // === ACT 2: Good website ===
      setIsGoodSite(true);
      setSlamShut(false);
      setGoodScrolled(false);
      setGoodClicked(false);
      setGoodCtaSuccess(false);
      setGoodContentVisible(false);
      setCursorPos(undefined);
      setPhase("good-opening");
      setBrowserVisible(true);
      await wait(300);
      // Content fades in staggered
      setGoodContentVisible(true);
      await wait(400);
      if (!isActive()) return;

      // === Good countdown 7 → 0 ===
      setPhase("good-countdown");
      for (let i = 7; i >= 0; i--) {
        if (!isActive()) return;
        setCount(i);

        if (i === 6) setCursorPos({ x: 40, y: 40 }); // enters viewport
        if (i === 5) {
          setCursorPos({ x: 50, y: 65 });
          setGoodScrolled(true);
        }
        if (i === 4) setCursorPos({ x: 30, y: 55 }); // browsing
        if (i === 3) {
          setCursorPos({ x: 22, y: 50 }); // CTA area
          setGoodClicked(true);
        }
        if (i === 2) {
          setGoodClicked(false);
          setGoodCtaSuccess(true);
          setCursorPos({ x: 45, y: 60 }); // continues exploring
        }

        await wait(1000);
      }
      if (!isActive()) return;

      // === Good message — browser STAYS OPEN ===
      setPhase("good-message");
      setCursorPos(undefined);
      setMessage("They stayed. They explored. They reached out.");
      setSubMessage("7 seconds. First impression made.");
      await wait(2500);
      if (!isActive()) return;

      // === Pause — everything fades ===
      setPhase("pause");
      setMessage("");
      setSubMessage("");
      setBrowserVisible(false);
      await wait(1200);
      if (!isActive()) return;

      setPhase("idle");
    }
  }, []);

  // Start/stop based on visibility
  useEffect(() => {
    if (isVisible && !reducedMotion) {
      activeRef.current = true;
      runSequence();
    } else {
      activeRef.current = false;
      setPhase("idle");
      setBrowserVisible(false);
      setMessage("");
      setSubMessage("");
      setCursorPos(undefined);
    }
    return () => { activeRef.current = false; };
  }, [isVisible, reducedMotion, runSequence]);

  const isGoodPhase = phase.startsWith("good");
  const showCountdown = phase === "bad-countdown" || phase === "good-countdown" || phase === "good-opening";

  if (reducedMotion) {
    return (
      <div
        ref={containerRef}
        aria-label="Comparison showing how website design affects first impressions within 7 seconds"
        style={{ minHeight: 300 }}
      >
        <StaticFallback />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      aria-label="Animation demonstrating how a visitor judges a website within 7 seconds"
      style={{ maxWidth: 700, margin: "0 auto", minHeight: 460, position: "relative" }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          height: "70%",
          borderRadius: "50%",
          background: isGoodPhase || phase === "good-message"
            ? "radial-gradient(circle, rgba(15,92,78,0.05) 0%, transparent 70%)"
            : phase !== "idle" && phase !== "pause"
            ? "radial-gradient(circle, rgba(140,63,51,0.05) 0%, transparent 70%)"
            : "none",
          transition: "background 1s ease",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Countdown number + messages area */}
      <div
        style={{
          textAlign: "center",
          height: 100,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {showCountdown && (
          <span
            className="font-display"
            key={`${isGoodSite}-${count}`}
            style={{
              fontWeight: 800,
              fontSize: "clamp(48px, 8vw, 72px)",
              color: isGoodPhase ? "hsl(var(--secondary))" : "hsl(var(--primary))",
              lineHeight: 1,
              animation: "pulse-number 300ms ease-out",
              display: "block",
            }}
          >
            {count}
          </span>
        )}
        {message && !showCountdown && (
          <div style={{ animation: "msg-fade-in 500ms ease forwards" }}>
            <span
              className="font-body"
              style={{
                fontWeight: 600,
                fontSize: "clamp(16px, 2.5vw, 20px)",
                color: isGoodPhase || phase === "good-message"
                  ? "hsl(var(--primary))"
                  : "hsl(var(--foreground) / 0.8)",
                display: "block",
              }}
            >
              {message}
            </span>
            {subMessage && (
              <span
                className="font-body"
                style={{
                  fontWeight: 300,
                  fontSize: "clamp(12px, 1.5vw, 14px)",
                  color: isGoodPhase || phase === "good-message"
                    ? "hsl(var(--secondary))"
                    : "hsl(var(--foreground) / 0.4)",
                  display: "block",
                  marginTop: 6,
                }}
              >
                {subMessage}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Browser mockup */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <BrowserFrame visible={browserVisible} slamShut={slamShut} cursorPos={cursorPos}>
          {isGoodSite ? (
            <GoodSite
              scrolled={goodScrolled}
              clicked={goodClicked}
              ctaSuccess={goodCtaSuccess}
              contentVisible={goodContentVisible}
            />
          ) : (
            <BadSite count={count} xHover={xHover} />
          )}
        </BrowserFrame>
      </div>

      {/* Message below browser (for good-message phase when browser stays open) */}
      {phase === "good-message" && message && (
        <div
          style={{
            textAlign: "center",
            marginTop: 24,
            animation: "msg-fade-in 500ms ease forwards",
            position: "relative",
            zIndex: 1,
          }}
        >
          <span
            className="font-body"
            style={{
              fontWeight: 600,
              fontSize: "clamp(16px, 2.5vw, 20px)",
              color: "hsl(var(--primary))",
              display: "block",
            }}
          >
            {message}
          </span>
          {subMessage && (
            <span
              className="font-body"
              style={{
                fontWeight: 300,
                fontSize: "clamp(12px, 1.5vw, 14px)",
                color: "hsl(var(--secondary))",
                display: "block",
                marginTop: 6,
              }}
            >
              {subMessage}
            </span>
          )}
        </div>
      )}

      {/* Phase label */}
      <p
        className="font-body text-center"
        style={{
          fontSize: 13,
          marginTop: 20,
          fontWeight: isGoodPhase || phase === "good-message" ? 500 : 400,
          color:
            isGoodPhase || phase === "good-message"
              ? "hsl(var(--primary))"
              : "hsl(var(--foreground) / 0.35)",
          transition: "color 300ms ease",
          minHeight: 20,
          position: "relative",
          zIndex: 1,
        }}
      >
        {isGoodPhase || phase === "good-message"
          ? "With ALVIE"
          : phase !== "idle" && phase !== "pause"
          ? "Without strategic design"
          : ""}
      </p>
    </div>
  );
};

export default SevenSecondTest;
