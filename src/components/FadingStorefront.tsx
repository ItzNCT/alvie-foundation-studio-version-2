import { useRef, useState, useEffect, useCallback } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Image,
  Star,
  ShoppingCart,
  Mail,
  Bell,
  TrendingDown,
  Loader2,
  AlertTriangle,
  Shield,
  Users,
} from "lucide-react";

/* ── Phase config ─────────────────────────────────── */
const PHASES = [
  { label: "Connection", duration: 3000 },
  { label: "Trust", duration: 3000 },
  { label: "Customers", duration: 3000 },
  { label: "Opportunities", duration: 3000 },
] as const;

const TOTAL_DURATION = PHASES.reduce((s, p) => s + p.duration, 0);

/* ── Reduced-motion static snapshot ───────────────── */
const StaticSnapshot = () => (
  <div
    className="grid grid-cols-2 gap-4"
    style={{ maxWidth: 560, margin: "0 auto" }}
  >
    {PHASES.map((p, i) => (
      <div
        key={i}
        className="rounded-lg p-4"
        style={{
          background: "hsl(var(--muted))",
          border: "1px solid hsl(var(--border))",
        }}
      >
        <p
          className="font-body font-medium text-sm"
          style={{ color: "hsl(var(--primary))", marginBottom: 4 }}
        >
          Losing {p.label.toLowerCase()}
        </p>
        <p
          className="font-body text-xs"
          style={{ color: "hsl(var(--foreground) / 0.5)" }}
        >
          Phase {i + 1}
        </p>
      </div>
    ))}
  </div>
);

/* ── Browser chrome ───────────────────────────────── */
const BrowserChrome = ({
  phase,
  progress,
  isMobile,
}: {
  phase: number;
  progress: number;
  isMobile: boolean;
}) => {
  const warningFlash = phase === 0 && progress > 0.5;

  return (
    <div
      className="flex items-center gap-2 px-3 sm:px-4"
      style={{
        height: isMobile ? 32 : 40,
        background: "hsl(var(--foreground) / 0.04)",
        borderBottom: "1px solid hsl(var(--border))",
        borderRadius: "12px 12px 0 0",
      }}
    >
      {/* Traffic lights */}
      <div className="flex gap-1.5 shrink-0">
        <span
          className="rounded-full"
          style={{ width: 10, height: 10, background: "#EC6A5E" }}
        />
        <span
          className="rounded-full"
          style={{ width: 10, height: 10, background: "#F5BF4F" }}
        />
        <span
          className="rounded-full"
          style={{ width: 10, height: 10, background: "#61C554" }}
        />
      </div>

      {/* URL bar */}
      <div
        className="flex items-center flex-1 rounded-md px-3 text-xs font-body truncate"
        style={{
          height: isMobile ? 22 : 26,
          background: "hsl(var(--background))",
          border: `1px solid ${warningFlash ? "hsl(0 70% 55% / 0.5)" : "hsl(var(--border))"}`,
          color: warningFlash
            ? "hsl(0 70% 45%)"
            : "hsl(var(--foreground) / 0.4)",
          transition: "border-color 400ms, color 400ms",
          fontSize: isMobile ? 10 : 12,
        }}
      >
        {warningFlash && (
          <AlertTriangle
            size={12}
            className="mr-1 shrink-0"
            style={{ color: "hsl(0 70% 55%)" }}
          />
        )}
        yourbusiness.com
      </div>
    </div>
  );
};

/* ── Fake website content (degrades per phase) ───── */
const FakeWebsite = ({
  phase,
  progress,
  isMobile,
}: {
  phase: number;
  progress: number;
  isMobile: boolean;
}) => {
  /* Helper: linear interpolation based on phase progress */
  const lerp = (a: number, b: number) => a + (b - a) * progress;

  /* Phase 0: connection — broken images, loading spinners */
  const imgBroken = phase > 0 || progress > 0.4;
  const showSpinner = phase === 0 && progress > 0.3;

  /* Phase 1: trust — stars, badge, testimonial */
  const starCount = phase < 1 ? 5 : phase === 1 ? Math.round(lerp(5, 1)) : 1;
  const badgeVisible = phase < 1 || (phase === 1 && progress < 0.5);
  const testimonialOpacity =
    phase < 1 ? 1 : phase === 1 ? 1 - progress : 0;

  /* Phase 2: customers — counter, cart, chart */
  const visitorCount =
    phase < 2
      ? 1247
      : phase === 2
        ? Math.round(lerp(1247, 0))
        : 0;
  const cartItems =
    phase < 2 ? 3 : phase === 2 ? Math.round(lerp(3, 0)) : 0;

  /* Phase 3: opportunities — inbox, bell, form */
  const inboxCount =
    phase < 3
      ? 12
      : phase === 3
        ? Math.round(lerp(12, 0))
        : 0;
  const formOpacity =
    phase < 3 ? 1 : phase === 3 ? 1 - progress * 0.7 : 0.3;

  const textSm = isMobile ? 10 : 12;
  const textXs = isMobile ? 9 : 11;

  return (
    <div
      className="flex flex-col gap-3 p-3 sm:p-4"
      style={{
        background: "hsl(var(--background))",
        minHeight: isMobile ? 200 : 280,
        borderRadius: "0 0 12px 12px",
        overflow: "hidden",
      }}
    >
      {/* Hero image area */}
      <div
        className="rounded-md flex items-center justify-center"
        style={{
          height: isMobile ? 60 : 90,
          background: imgBroken
            ? "hsl(var(--muted))"
            : "hsl(var(--foreground) / 0.06)",
          border: "1px solid hsl(var(--border))",
          transition: "background 600ms",
        }}
      >
        {imgBroken ? (
          <div className="flex flex-col items-center gap-1">
            <Image
              size={isMobile ? 16 : 22}
              style={{ color: "hsl(var(--foreground) / 0.2)" }}
            />
            <span
              className="font-body"
              style={{
                fontSize: textXs,
                color: "hsl(var(--foreground) / 0.2)",
              }}
            >
              Image not found
            </span>
          </div>
        ) : (
          <div
            className="rounded"
            style={{
              width: "80%",
              height: "70%",
              background:
                "linear-gradient(135deg, hsl(var(--foreground) / 0.08), hsl(var(--foreground) / 0.03))",
            }}
          />
        )}
        {showSpinner && (
          <Loader2
            size={16}
            className="absolute animate-spin"
            style={{ color: "hsl(var(--foreground) / 0.3)" }}
          />
        )}
      </div>

      {/* Content row */}
      <div className="flex gap-3">
        {/* Main content */}
        <div className="flex-1 flex flex-col gap-2">
          {/* Star rating */}
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={isMobile ? 10 : 14}
                fill={s <= starCount ? "#D49A5A" : "transparent"}
                style={{
                  color:
                    s <= starCount
                      ? "#D49A5A"
                      : "hsl(var(--foreground) / 0.15)",
                  transition: "color 300ms, fill 300ms",
                }}
              />
            ))}
            {badgeVisible && (
              <span
                className="flex items-center gap-0.5 ml-1"
                style={{
                  transition: "opacity 400ms",
                  opacity: badgeVisible ? 1 : 0,
                }}
              >
                <Shield
                  size={isMobile ? 9 : 12}
                  style={{ color: "hsl(166 72% 21%)" }}
                />
                <span
                  className="font-body font-medium"
                  style={{
                    fontSize: textXs,
                    color: "hsl(166 72% 21%)",
                  }}
                >
                  Verified
                </span>
              </span>
            )}
          </div>

          {/* Testimonial */}
          <p
            className="font-body italic"
            style={{
              fontSize: textXs,
              color: "hsl(var(--foreground) / 0.5)",
              opacity: testimonialOpacity,
              transition: "opacity 600ms",
              lineHeight: 1.5,
            }}
          >
            "Excellent service and quality..."
          </p>

          {/* Analytics line */}
          <div className="flex items-center gap-2 mt-1">
            <TrendingDown
              size={isMobile ? 12 : 14}
              style={{
                color:
                  phase >= 2
                    ? "hsl(0 60% 50% / 0.6)"
                    : "hsl(var(--foreground) / 0.2)",
                transition: "color 400ms",
              }}
            />
            <div
              className="flex-1 h-1 rounded-full overflow-hidden"
              style={{ background: "hsl(var(--foreground) / 0.06)" }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${phase < 2 ? 75 : phase === 2 ? lerp(75, 10) : 10}%`,
                  background:
                    phase >= 2
                      ? "hsl(0 60% 50% / 0.5)"
                      : "hsl(var(--foreground) / 0.15)",
                  transition: "width 800ms, background 400ms",
                }}
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div
          className="flex flex-col items-end gap-2 shrink-0"
          style={{ minWidth: isMobile ? 70 : 90 }}
        >
          {/* Visitors */}
          <div className="flex items-center gap-1">
            <Users
              size={isMobile ? 10 : 12}
              style={{ color: "hsl(var(--foreground) / 0.3)" }}
            />
            <span
              className="font-body font-medium"
              style={{
                fontSize: textSm,
                color: "hsl(var(--foreground) / 0.6)",
              }}
            >
              {visitorCount.toLocaleString()}
            </span>
          </div>

          {/* Cart */}
          <div className="flex items-center gap-1">
            <ShoppingCart
              size={isMobile ? 10 : 12}
              style={{ color: "hsl(var(--foreground) / 0.3)" }}
            />
            <span
              className="font-body"
              style={{
                fontSize: textXs,
                color: "hsl(var(--foreground) / 0.5)",
              }}
            >
              {cartItems} items
            </span>
          </div>

          {/* Inbox */}
          <div className="flex items-center gap-1">
            <Mail
              size={isMobile ? 10 : 12}
              style={{
                color: "hsl(var(--foreground) / 0.3)",
                opacity: formOpacity,
                transition: "opacity 600ms",
              }}
            />
            <span
              className="font-body"
              style={{
                fontSize: textXs,
                color: "hsl(var(--foreground) / 0.5)",
                opacity: formOpacity,
                transition: "opacity 600ms",
              }}
            >
              {inboxCount} new
            </span>
          </div>

          {/* Bell */}
          <Bell
            size={isMobile ? 10 : 12}
            style={{
              color: "hsl(var(--foreground) / 0.2)",
              opacity: formOpacity,
              transition: "opacity 600ms",
            }}
          />
        </div>
      </div>

      {/* Contact form area */}
      <div
        className="rounded-md p-2 mt-auto"
        style={{
          background: "hsl(var(--foreground) / 0.03)",
          border: "1px solid hsl(var(--border))",
          opacity: formOpacity,
          transition: "opacity 600ms",
        }}
      >
        <div
          className="rounded h-2 mb-1.5"
          style={{
            width: "60%",
            background: "hsl(var(--foreground) / 0.08)",
          }}
        />
        <div
          className="rounded h-2"
          style={{
            width: "40%",
            background: "hsl(var(--foreground) / 0.06)",
          }}
        />
      </div>
    </div>
  );
};

/* ── Phase indicator bar ──────────────────────────── */
const PhaseIndicator = ({
  phase,
  elapsed,
  isMobile,
  darkMode = false,
}: {
  phase: number;
  elapsed: number;
  isMobile: boolean;
  darkMode?: boolean;
}) => {
  const totalProgress = (elapsed / TOTAL_DURATION) * 100;

  return (
    <div style={{ maxWidth: isMobile ? "100%" : 500, margin: "0 auto" }}>
      {/* Labels */}
      <div className="flex justify-between mb-2">
        {PHASES.map((p, i) => (
          <span
            key={i}
            className="font-body font-medium"
            style={{
              fontSize: isMobile ? 10 : 12,
              color:
                phase === i
                  ? darkMode ? "rgba(247, 244, 235, 0.9)" : "hsl(var(--primary))"
                  : darkMode ? "rgba(247, 244, 235, 0.25)" : "hsl(var(--foreground) / 0.25)",
              transition: "color 300ms",
            }}
          >
            {p.label}
          </span>
        ))}
      </div>

      {/* Progress line */}
      <div
        className="rounded-full overflow-hidden"
        style={{
          height: 2,
          background: darkMode ? "rgba(247, 244, 235, 0.08)" : "hsl(var(--foreground) / 0.08)",
        }}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: `${totalProgress}%`,
            background: "hsl(var(--secondary))",
            transition: "width 100ms linear",
          }}
        />
      </div>
    </div>
  );
};

/* ── Main component ───────────────────────────────── */
interface FadingStorefrontProps {
  darkMode?: boolean;
  prefersReducedMotion?: boolean;
}

const FadingStorefront = ({ darkMode = false, prefersReducedMotion: prefReducedProp }: FadingStorefrontProps) => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [reducedMotionLocal, setReducedMotionLocal] = useState(false);

  const reducedMotion = prefReducedProp ?? reducedMotionLocal;

  useEffect(() => {
    if (prefReducedProp !== undefined) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotionLocal(mq.matches);
    const h = () => setReducedMotionLocal(mq.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, [prefReducedProp]);

  /* IntersectionObserver to start */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Animation loop */
  useEffect(() => {
    if (!visible || reducedMotion) return;
    const interval = setInterval(() => {
      setElapsed((prev) => (prev + 50) % TOTAL_DURATION);
    }, 50);
    return () => clearInterval(interval);
  }, [visible, reducedMotion]);

  /* Determine current phase & progress */
  let phase = 0;
  let acc = 0;
  for (let i = 0; i < PHASES.length; i++) {
    if (elapsed < acc + PHASES[i].duration) {
      phase = i;
      break;
    }
    acc += PHASES[i].duration;
    if (i === PHASES.length - 1) phase = i;
  }
  const phaseProgress = Math.min(
    1,
    (elapsed - acc) / PHASES[phase].duration
  );

  /* Reveal animation */
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
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
    <div
      ref={containerRef}
      style={{
        marginTop: darkMode ? 0 : (isMobile ? 64 : 80),
        opacity: reducedMotion || revealed ? 1 : 0,
        transform: reducedMotion || revealed ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 700ms cubic-bezier(0.4,0,0.2,1), transform 700ms cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      {reducedMotion ? (
        <StaticSnapshot />
      ) : (
        <>
          {/* Browser mockup */}
          <div
            style={{
              maxWidth: isMobile ? "100%" : 520,
              margin: "0 auto",
              borderRadius: 12,
              border: "1px solid hsl(var(--border))",
              boxShadow:
                "0 20px 60px -15px hsl(var(--foreground) / 0.1), 0 8px 20px -8px hsl(var(--foreground) / 0.06)",
              transform: isMobile ? "none" : "rotate(-1.5deg)",
              overflow: "hidden",
              background: "hsl(var(--background))",
            }}
          >
            <BrowserChrome
              phase={phase}
              progress={phaseProgress}
              isMobile={isMobile}
            />
            <FakeWebsite
              phase={phase}
              progress={phaseProgress}
              isMobile={isMobile}
            />
          </div>

          {/* Caption */}
          <p
            className="font-body italic text-center"
            style={{
              fontWeight: 300,
              fontSize: 14,
              color: darkMode
                ? "rgba(247, 244, 235, 0.4)"
                : "hsl(var(--foreground) / 0.4)",
              marginTop: 24,
            }}
          >
            The vicious cycle of digital neglect
          </p>

          {/* Phase indicator */}
          <div style={{ marginTop: 20 }}>
            <PhaseIndicator
              phase={phase}
              elapsed={elapsed}
              isMobile={isMobile}
              darkMode={darkMode}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default FadingStorefront;
