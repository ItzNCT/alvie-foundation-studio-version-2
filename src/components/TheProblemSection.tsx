import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, X } from "lucide-react";

/* ── Animation helpers ───────────────────────────────── */
const EASE = [0.4, 0, 0.2, 1] as const;
const SLOW_EASE = [0.16, 1, 0.3, 1] as const;

const maskReveal = {
  hidden: { y: "100%", opacity: 0 },
  visible: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: { duration: 0.9, ease: SLOW_EASE, delay: i * 0.15 },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay: i * 0.1 },
  }),
};

/* ── Data ────────────────────────────────────────────── */
const TABS = [
  {
    title: "The Hesitation",
    content:
      "The hesitation to share your website or business materials.",
  },
  {
    title: "The Inconsistency",
    content:
      "Because you know that your digital platforms don't accurately represent the quality of your operations.",
  },
  {
    title: "The Market's View",
    content:
      "If you recognize this inconsistency, the market observes it as well.",
  },
];

const INEFFECTIVE = [
  "Lose trust",
  "Miss opportunities",
  "Convey a false narrative of your business",
];

const GOOD = [
  "Validate your capabilities",
  "Attract potential customers, investors, and partners",
  "Create an accurate and professional first impression",
  "Accurately communicate your values and standards",
];

/* ═══════════════════════════════════════════════════════ */
/*  Part 1 – The Hook                                     */
/* ═══════════════════════════════════════════════════════ */
function TheHook() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="pb-16 md:pb-24">
      {["Does your digital presence", "match your operational capacity?"].map(
        (line, i) => (
          <div key={i} className="overflow-hidden">
            <motion.h2
              custom={i}
              variants={maskReveal}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="font-display font-extrabold text-[clamp(2rem,5vw,3.75rem)] leading-[1.1] text-alvie-black"
            >
              {line}
            </motion.h2>
          </div>
        )
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════ */
/*  Part 2 – The Hesitation                               */
/* ═══════════════════════════════════════════════════════ */
function TheHesitation() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      custom={0}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="grid grid-cols-1 md:grid-cols-[40%_1fr] gap-8 md:gap-12 pb-16 md:pb-24"
    >
      {/* Left – Visual placeholder */}
      <div className="relative overflow-hidden rounded-2xl bg-alvie-green/5 aspect-[4/3] md:aspect-auto">
        {TABS.map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-2xl bg-alvie-green"
            initial={false}
            animate={{
              opacity: active === i ? 1 : 0,
              scale: active === i ? 1.04 : 1,
            }}
            transition={{ duration: 1.2, ease: SLOW_EASE }}
            style={{
              backgroundImage: `url('/placeholder.svg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: `brightness(${0.55 + i * 0.08})`,
            }}
          />
        ))}
        {/* Subtle grain overlay */}
        <div className="absolute inset-0 mix-blend-overlay opacity-20 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC44IiBudW1PY3RhdmVzPSI0IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI24pIiBvcGFjaXR5PSIwLjMiLz48L3N2Zz4=')]" />
      </div>

      {/* Right – Accordion tabs */}
      <div className="flex flex-col justify-center gap-0">
        {TABS.map((tab, i) => {
          const isActive = active === i;
          return (
            <button
              key={i}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              className="text-left border-t border-alvie-black/10 last:border-b group"
            >
              <div className="flex items-center justify-between py-5 md:py-6">
                <span
                  className={`font-body text-lg md:text-xl font-medium transition-colors duration-300 ${
                    isActive ? "text-alvie-green" : "text-alvie-black/60"
                  }`}
                >
                  {tab.title}
                </span>
                <motion.span
                  animate={{ rotate: isActive ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="text-alvie-gold text-2xl leading-none font-light"
                >
                  +
                </motion.span>
              </div>
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: SLOW_EASE }}
                    className="overflow-hidden"
                  >
                    <p className="font-body text-sm md:text-base text-alvie-black/70 pb-5 md:pb-6 leading-relaxed max-w-md">
                      {tab.content}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════ */
/*  Part 3 – The Crossroads                               */
/* ═══════════════════════════════════════════════════════ */
function TheCrossroads() {
  const [isGood, setIsGood] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const items = isGood ? GOOD : INEFFECTIVE;

  return (
    <motion.div
      ref={ref}
      custom={0}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="pt-8 md:pt-12"
    >
      {/* Toggle pill */}
      <div className="flex justify-center mb-10 md:mb-14">
        <div className="relative flex items-center bg-alvie-black/[0.06] rounded-full p-1 gap-0">
          <button
            onClick={() => setIsGood(false)}
            className={`relative z-10 px-5 md:px-7 py-2.5 rounded-full font-body text-sm md:text-[15px] font-medium transition-colors duration-300 ${
              !isGood ? "text-alvie-white" : "text-alvie-black/50"
            }`}
          >
            Ineffective Strategy
          </button>
          <button
            onClick={() => setIsGood(true)}
            className={`relative z-10 px-5 md:px-7 py-2.5 rounded-full font-body text-sm md:text-[15px] font-medium transition-colors duration-300 ${
              isGood ? "text-alvie-white" : "text-alvie-black/50"
            }`}
          >
            Good Strategy
          </button>
          {/* Sliding pill bg */}
          <motion.div
            layout
            className={`absolute top-1 bottom-1 rounded-full ${
              isGood ? "bg-alvie-green" : "bg-[#4A5D6B]"
            }`}
            transition={{ type: "spring", stiffness: 350, damping: 35 }}
            style={{
              left: isGood ? "50%" : "4px",
              right: isGood ? "4px" : "50%",
            }}
          />
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          {items.map((item, i) => (
            <motion.div
              key={`${isGood}-${i}`}
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{
                duration: 0.45,
                ease: EASE,
                delay: i * 0.07,
              }}
              className={`rounded-xl px-5 py-5 md:px-6 md:py-6 border transition-colors duration-500 ${
                isGood
                  ? "bg-alvie-green/[0.04] border-alvie-green/15"
                  : "bg-[#4A5D6B]/[0.06] border-[#4A5D6B]/10"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-colors duration-500 ${
                    isGood ? "bg-alvie-green/15 text-alvie-green" : "bg-[#4A5D6B]/15 text-[#4A5D6B]"
                  }`}
                >
                  {isGood ? (
                    <Check className="w-3 h-3" strokeWidth={2.5} />
                  ) : (
                    <X className="w-3 h-3" strokeWidth={2.5} />
                  )}
                </div>
                <p
                  className={`font-body text-sm md:text-[15px] leading-relaxed transition-colors duration-500 ${
                    isGood ? "text-alvie-black" : "text-alvie-black/60"
                  }`}
                >
                  {item}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════ */
/*  Part 4 – The Provocation                              */
/* ═══════════════════════════════════════════════════════ */
function TheProvocation() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center bg-alvie-green overflow-hidden"
    >
      {/* Subtle grain */}
      <div className="absolute inset-0 mix-blend-soft-light opacity-[0.08] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC44IiBudW1PY3RhdmVzPSI0IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI24pIiBvcGFjaXR5PSIwLjMiLz48L3N2Zz4=')]" />

      <div className="px-6 md:px-12 max-w-4xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: SLOW_EASE }}
          className="font-display font-extrabold text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.1] text-alvie-gold"
        >
          Do you really just want to exist like that?
        </motion.h2>

        {/* Breathing line accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, ease: SLOW_EASE, delay: 0.4 }}
          className="mx-auto mt-8 h-[2px] w-24 origin-center"
        >
          <div className="h-full w-full bg-alvie-gold/40 animate-[pulse_4s_ease-in-out_infinite]" />
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════ */
/*  Main Composite                                        */
/* ═══════════════════════════════════════════════════════ */
export default function TheProblemSection() {
  return (
    <>
      {/* Floating Atelier on dark bg */}
      <section className="problem-section relative bg-alvie-green py-16 md:py-24" style={{ position: 'relative', zIndex: 15 }}>
        <div className="mx-auto max-w-[1200px] px-5 md:px-10">
          <div className="bg-alvie-white rounded-3xl shadow-[0_8px_60px_-12px_rgba(15,92,78,0.12)] px-6 py-12 md:px-14 md:py-20 lg:px-20 lg:py-24">
            <TheHook />
            <TheHesitation />
            <TheCrossroads />
          </div>
        </div>
      </section>

      {/* Provocation – full bleed dark */}
      <TheProvocation />
    </>
  );
}
