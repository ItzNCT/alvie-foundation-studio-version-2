import { useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/* ── Easing tokens (motion-guide.md) ────────────────────── */
const EASE = [0.4, 0, 0.2, 1] as const;
const SLOW_EASE = [0.16, 1, 0.3, 1] as const;

/* ── Stats data ──────────────────────────────────────────── */
const STATS = [
  {
    number: "75%",
    description:
      "of potential partners judge your true credibility based solely on your website's presence.",
    reference: "(Stanford, 2023)",
  },
  {
    number: "94%",
    description:
      "of first impressions are quietly formed by the visual authenticity of your digital design.",
    reference: "Forbes, 2023",
  },
  {
    number: "84%",
    description:
      "of consumers trust a grounded, dedicated website far more than fleeting social media facades.",
    reference: "(Dicom Interactive)",
  },
] as const;

/* ═══════════════════════════════════════════════════════════ */
/*  TheProblemSection — Self-Contained Cinematic Slide        */
/* ═══════════════════════════════════════════════════════════ */
export default function TheProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);

  /* Framer Motion inView — drives top-block entrance */
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });

  /* prefers-reduced-motion (motion-guide.md §5) */
  const reduceMotion = useReducedMotion();
  const dur = (base: number) => (reduceMotion ? 0 : base);
  const fromY = (px: number) => (reduceMotion ? 0 : px);

  /* Refs for GSAP horizontal scroll animation */
  const statsWrapperRef = useRef<HTMLDivElement>(null);
  const statCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* ── GSAP + Lenis: horizontal scroll entrance for stats ── */
  useEffect(() => {
    /*
     * Bail immediately if the user prefers reduced motion.
     * Stat cards will remain in their natural CSS-visible state.
     */
    if (reduceMotion) return;

    let ctx: ReturnType<typeof import("gsap")["gsap"]["context"]> | undefined;
    let storedLenis: typeof import("@/lib/lenis")["lenis"] | null = null;
    let storedST: (typeof import("gsap/ScrollTrigger"))["ScrollTrigger"] | null = null;

    const init = async () => {
      const [
        { gsap },
        { ScrollTrigger },
        { lenis },
      ] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("@/lib/lenis"),
      ]);

      gsap.registerPlugin(ScrollTrigger);

      storedLenis = lenis;
      storedST = ScrollTrigger;

      /*
       * Wire Lenis → ScrollTrigger so every smoothed scroll tick
       * keeps scrub positions perfectly in sync.
       */
      lenis.on("scroll", ScrollTrigger.update);

      const cards = statCardRefs.current.filter(
        (el): el is HTMLDivElement => el !== null
      );
      if (cards.length < 3 || !statsWrapperRef.current) return;

      ctx = gsap.context(() => {
        /*
         * Initial positions — staggered x-offsets so cards are
         * clipped by the section's overflow-hidden until the
         * scrub reveals them from left to right.
         *
         * Card 0 travels -100px (enters first).
         * Card 1 travels -150px (enters second).
         * Card 2 travels -200px (enters last, furthest chase).
         */
        gsap.set(cards[0], { x: -100, autoAlpha: 0 });
        gsap.set(cards[1], { x: -150, autoAlpha: 0 });
        gsap.set(cards[2], { x: -200, autoAlpha: 0 });

        /*
         * Scrubbed timeline: scroll from "stats row enters at 85%
         * of viewport" → "stats row reaches 25% of viewport"
         * drives all three cards to x:0.
         *
         * scrub: 1.5 — GSAP lags 1.5s behind the raw progress,
         * giving a buttery, Lenis-quality feel even beyond the
         * section boundary.
         *
         * ease: "none" inside a scrubbed timeline — the scrub's
         * own lag provides the organic deceleration; a curve here
         * would fight it and create unnatural double-easing.
         */
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: statsWrapperRef.current,
            start: "top 85%",
            end: "top 25%",
            scrub: 1.5,
          },
        });

        tl.to(cards[0], { x: 0, autoAlpha: 1, ease: "none" }, 0)
          .to(cards[1], { x: 0, autoAlpha: 1, ease: "none" }, 0.08)
          .to(cards[2], { x: 0, autoAlpha: 1, ease: "none" }, 0.16);
      });
    };

    init();

    return () => {
      /* Detach Lenis listener before reverting GSAP context */
      if (storedLenis && storedST) {
        storedLenis.off("scroll", storedST.update);
      }
      ctx?.revert();
    };
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      className="sticky top-0 relative z-10 w-screen h-[100vh] h-[100svh] bg-[#0A0A0A] flex flex-col justify-between p-12 md:p-20 overflow-hidden snap-start snap-always"
    >
      {/* ── Radial vignette ──────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.7)_100%)]" />

      {/* ════════════════════════════════════════════════════ */}
      {/* TOP-LEFT BLOCK — Framer Motion                      */}
      {/* ════════════════════════════════════════════════════ */}
      <div className="relative max-w-2xl">

        {/* Overline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: dur(0.6), ease: EASE, delay: 0.1 }}
          className="flex items-center gap-4 mb-3 text-white/50 tracking-[0.2em] text-xs font-medium uppercase font-body"
        >
          <div className="w-12 h-px bg-primary flex-shrink-0" />
          The Reality
        </motion.div>

        {/* Headline — mask reveal */}
        <div className="overflow-hidden mb-4 md:mb-6">
          <motion.h2
            initial={{ y: `${fromY(102)}%`, opacity: reduceMotion ? 1 : 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : {}}
            transition={{ duration: dur(0.95), ease: SLOW_EASE, delay: 0.2 }}
            className="font-display font-bold text-5xl md:text-7xl leading-tight tracking-[-0.02em] text-white"
          >
            The Trust Gap
          </motion.h2>
        </div>

        {/* Body text */}
        <motion.p
          initial={{ opacity: 0, y: fromY(16) }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: dur(0.8), ease: EASE, delay: 0.38 }}
          className="font-body text-xs sm:text-sm md:text-base leading-[1.75] text-white/70 max-w-2xl indent-8 md:indent-12"
        >
          You've probably noticed this before. The hesitation to share your
          website or business materials. Because you know that your digital
          platforms don't accurately represent the quality of your operations.
          If you recognize this inconsistency, the market observes it as well.
        </motion.p>
      </div>

      {/* ════════════════════════════════════════════════════ */}
      {/* BOTTOM GRID — GSAP horizontal scroll animation      */}
      {/* ════════════════════════════════════════════════════ */}
      <div ref={statsWrapperRef} className="relative">

        {/* Hairline divider — Framer Motion scaleX reveal */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: dur(1.2), ease: SLOW_EASE, delay: 0.45 }}
          className="w-full h-px bg-white/10 origin-left mb-8 md:mb-10"
        />

        {/*
         * Always 3 columns — stats must never stack inside a
         * h-[100svh] viewport-locked container.
         * GSAP sets initial x-offset + autoAlpha on each card,
         * then scrubs them to x:0 as the section scrolls into view.
         */}
        <div className="grid grid-cols-3 gap-4 md:gap-8">
          {STATS.map((stat, i) => (
            <div
              key={i}
              ref={(el) => { statCardRefs.current[i] = el; }}
              className="flex flex-col items-center text-center gap-2 md:gap-3"
            >
              {/* Large number */}
              <span className="font-display font-normal text-6xl md:text-8xl leading-[0.9] tracking-[-0.03em] text-primary">
                {stat.number}
              </span>

              {/* Description */}
              <p className="font-body text-[10px] sm:text-xs md:text-sm leading-[1.65] text-white/80 max-w-[90px] sm:max-w-[160px] md:max-w-[220px] text-balance">
                {stat.description}
              </p>

              {/* Reference */}
              <span className="font-body text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.06em] text-white/50">
                {stat.reference}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
