import { useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Gem, TrendingUp, ShieldCheck } from "lucide-react";

/* ── Easing tokens (motion-guide.md) ────────────────────── */
const EASE = [0.4, 0, 0.2, 1] as const;
const SLOW_EASE = [0.16, 1, 0.3, 1] as const;

/* ── Benefits data ───────────────────────────────────────── */
const BENEFITS = [
  {
    Icon: Gem,
    title: "Authentic Design",
    description:
      "Visuals that speak your real-world capabilities without compromise.",
  },
  {
    Icon: TrendingUp,
    title: "Strategic Growth",
    description:
      "Every design decision is anchored to a long-term business objective.",
  },
  {
    Icon: ShieldCheck,
    title: "Market Trust",
    description:
      "A digital presence that makes your credibility instantly legible.",
  },
] as const;

/* ═══════════════════════════════════════════════════════════ */
/*  SolutionSection — Self-Contained Cinematic Slide          */
/* ═══════════════════════════════════════════════════════════ */
export default function SolutionSection() {
  const sectionRef = useRef<HTMLElement>(null);

  /* Framer Motion inView — drives top-block entrance */
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });

  /* prefers-reduced-motion (motion-guide.md §5) */
  const reduceMotion = useReducedMotion();
  const dur = (base: number) => (reduceMotion ? 0 : base);
  const fromY = (px: number) => (reduceMotion ? 0 : px);

  /* Refs for GSAP animations */
  const imageRef = useRef<HTMLImageElement>(null);
  const benefitsWrapperRef = useRef<HTMLDivElement>(null);
  const benefitCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* ── GSAP + Lenis ────────────────────────────────────────── */
  useEffect(() => {
    if (reduceMotion) return;

    let ctx: ReturnType<typeof import("gsap")["gsap"]["context"]> | undefined;
    let storedLenis: typeof import("@/lib/lenis")["lenis"] | null = null;
    let storedST:
      | (typeof import("gsap/ScrollTrigger"))["ScrollTrigger"]
      | null = null;

    const init = async () => {
      const [{ gsap }, { ScrollTrigger }, { lenis }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("@/lib/lenis"),
      ]);

      gsap.registerPlugin(ScrollTrigger);
      storedLenis = lenis;
      storedST = ScrollTrigger;
      lenis.on("scroll", ScrollTrigger.update);

      const cards = benefitCardRefs.current.filter(
        (el): el is HTMLDivElement => el !== null
      );
      if (!benefitsWrapperRef.current) return;

      ctx = gsap.context(() => {
        /*
         * Image — cinematic zoom-out reveal (The Magnifying Glass
         * effect from motion-guide.md): starts slightly enlarged and
         * breathes open as the section enters the viewport.
         */
        if (imageRef.current) {
          gsap.from(imageRef.current, {
            scale: 1.08,
            autoAlpha: 0,
            duration: 2.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        }

        /*
         * Benefit cards — staggered horizontal entrance from RIGHT,
         * intentionally mirroring TheProblemSection's left-entrance
         * to signal a shift from problem → solution.
         *
         * Card 0 travels +100px (enters first from the right).
         * Card 1 travels +150px.
         * Card 2 travels +200px (furthest, chases the others).
         */
        if (cards.length >= 3) {
          gsap.set(cards[0], { x: 100, autoAlpha: 0 });
          gsap.set(cards[1], { x: 150, autoAlpha: 0 });
          gsap.set(cards[2], { x: 200, autoAlpha: 0 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: benefitsWrapperRef.current,
              start: "top 85%",
              end: "top 25%",
              scrub: 1.5,
            },
          });

          tl.to(cards[0], { x: 0, autoAlpha: 1, ease: "none" }, 0)
            .to(cards[1], { x: 0, autoAlpha: 1, ease: "none" }, 0.08)
            .to(cards[2], { x: 0, autoAlpha: 1, ease: "none" }, 0.16);
        }
      });
    };

    init();

    return () => {
      if (storedLenis && storedST) {
        storedLenis.off("scroll", storedST.update);
      }
      ctx?.revert();
    };
  }, [reduceMotion]);

  return (
    /*
     * Viewport-locked cinematic slide — cream theme.
     *
     * flex flex-col with flex-1 on the image gives the image all
     * the space between the top text block and the bottom grid,
     * creating the cinematic "void" without needing justify-between
     * (which would shrink the image to its natural content size).
     */
    <section
      ref={sectionRef}
      className="sticky top-0 relative z-10 w-screen h-[100vh] h-[100svh] bg-[#F7F4EB] flex flex-col p-12 md:p-20 overflow-hidden snap-start snap-always gap-6 md:gap-8"
    >
      {/* ── Subtle inner vignette (cream tones only) ─────── */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_60%_40%,transparent_55%,rgba(220,215,200,0.35)_100%)]" />

      {/* ════════════════════════════════════════════════════ */}
      {/* TOP BLOCK — Framer Motion                           */}
      {/* ════════════════════════════════════════════════════ */}
      <div className="relative max-w-2xl flex-shrink-0">

        {/* Overline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: dur(0.6), ease: EASE, delay: 0.1 }}
          className="flex items-center gap-4 mb-3 text-primary/50 tracking-[0.2em] text-xs font-medium uppercase font-body"
        >
          <div className="w-12 h-px bg-primary flex-shrink-0" />
          The Solution
        </motion.div>

        {/* Headline — mask reveal */}
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: `${fromY(102)}%`, opacity: reduceMotion ? 1 : 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : {}}
            transition={{ duration: dur(0.95), ease: SLOW_EASE, delay: 0.2 }}
            className="font-display font-bold text-5xl md:text-7xl leading-tight tracking-[-0.02em] text-primary"
          >
            Visual Integrity<br className="hidden md:block" /> Restored
          </motion.h2>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════ */}
      {/* CENTER BLOCK — Cinematic image (GSAP zoom-reveal)   */}
      {/* ════════════════════════════════════════════════════ */}
      <div className="relative flex-1 min-h-0 overflow-hidden rounded-2xl">
        <img
          ref={imageRef}
          src="/images/solution-header-bg.webp"
          alt="ALVIE digital solutions showcase"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/*
         * Progressive bottom gradient: ensures the bottom benefits
         * grid reads clearly against whatever the image shows.
         * Never a flat overlay — motion-guide component-specs §6.
         */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#F7F4EB]/60 to-transparent pointer-events-none" />
      </div>

      {/* ════════════════════════════════════════════════════ */}
      {/* BOTTOM BLOCK — Benefits grid (GSAP horizontal)      */}
      {/* ════════════════════════════════════════════════════ */}
      <div ref={benefitsWrapperRef} className="relative flex-shrink-0">

        {/* Hairline divider — Framer Motion scaleX reveal */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: dur(1.2), ease: SLOW_EASE, delay: 0.45 }}
          className="w-full h-px bg-primary/10 origin-left mb-6 md:mb-8"
        />

        {/*
         * Always 3 columns. GSAP sets initial x-offset + autoAlpha,
         * then scrubs from right to x:0 as the section enters view
         * (right-to-left entrance mirrors TheProblemSection's
         * left-to-right, reinforcing the problem → solution arc).
         */}
        <div className="grid grid-cols-3 gap-4 md:gap-8">
          {BENEFITS.map(({ Icon, title, description }, i) => (
            <div
              key={i}
              ref={(el) => { benefitCardRefs.current[i] = el; }}
              className="flex flex-col items-center text-center gap-2 md:gap-3"
            >
              {/* Icon — sized to line-height of adjacent title */}
              <Icon
                className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0"
                strokeWidth={1.5}
              />

              {/* Title */}
              <span className="font-display font-bold text-xs sm:text-sm md:text-base leading-tight text-primary">
                {title}
              </span>

              {/* Description */}
              <p className="font-body text-[10px] sm:text-xs md:text-sm leading-[1.65] text-primary/60 max-w-[90px] sm:max-w-[160px] md:max-w-[200px] text-balance">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
