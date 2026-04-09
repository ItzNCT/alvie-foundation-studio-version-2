import { useRef, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import useRevealOnScroll from "@/hooks/useRevealOnScroll";
import TheInvitation from "@/components/faq/TheInvitation";
import TornEdge from "@/components/ui/TornEdge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/* ── Q&A Data ── */
const qaItems = [
  {
    q: "Will investing in my digital presence actually help my business grow?",
    a: "Yes — if you're already delivering strong work in the real world. The problem isn't your capabilities; it's that the market can't see them clearly. A strategic digital presence doesn't create value from nothing — it amplifies the value you already have. It turns invisible expertise into visible credibility. When your online presence accurately reflects your real-world quality, you naturally attract better clients, stronger partnerships, and higher-value opportunities.",
  },
  {
    q: "Can't I just use AI tools, Wix, or hire a freelancer for less?",
    a: `You absolutely can, and depending on where you are in your journey, those tools might serve you well. AI design tools, website builders, and freelance marketplaces have made it easier than ever to create something that looks decent on the surface — and that's genuinely valuable for businesses just getting started.\n\nBut here's what we've observed: there's a meaningful difference between a digital presence that exists and one that strategically works for your business. AI can generate visuals, but it can't sit with you to understand why your clients trust you. A template can give you pages, but it can't structure a narrative around your unique strengths. A freelancer can deliver files, but they may not ask the deeper questions about your business model that shape truly effective design.\n\nThe question isn't really about cost — it's about what stage your business is at. If you're at the point where your digital presence needs to actively earn trust, attract serious partners, and accurately represent years of expertise, that's when the gap between a tool and a strategic partner becomes the gap between blending in and standing out. We don't compete with AI or templates — we start where they stop.`,
  },
  {
    q: "I'm a small business — isn't this kind of service only for big companies?",
    a: "This is one of the most common misconceptions we encounter, and it's completely understandable. The truth is actually the opposite: smaller businesses often benefit the most from strategic digital work because you can't afford to waste your limited touchpoints. A large corporation has a hundred chances to make an impression. You might only get one — that one visit to your website, that one glance at your brand materials. It needs to count. We calibrate every project to your specific scale and budget, because great strategy isn't about spending more; it's about spending deliberately.",
  },
  {
    q: "What exactly do I get when I work with ALVIE?",
    a: "Every project is different because every business is different, but here's what stays consistent: you get a thorough research phase where we study your actual operations, a clear strategy document that maps your digital direction, and bespoke deliverables — whether that's a brand identity, website, app, or full digital ecosystem. You also get something less tangible but equally valuable: a partner who genuinely cares about understanding your business before designing anything. We don't hand over files and disappear. We provide implementation guidance and ongoing support so everything stays cohesive long after the project ends.",
  },
  {
    q: "How long does a typical project take?",
    a: "Most projects range from 6 to 12 weeks depending on scope. A focused brand identity might take 6 weeks. A comprehensive digital ecosystem — brand, website, and strategy — typically needs 10 to 12 weeks to do properly. We can sometimes accommodate tighter deadlines, but we'll always be honest with you: rushing strategic work means compromising on the research and refinement that make the difference between 'nice' and 'exceptional.' We'd rather take a few extra weeks and deliver something that serves you for years.",
  },
  {
    q: "What if I don't like the direction you take?",
    a: "That's a completely valid concern, and it's exactly why our process is built on collaboration, not surprise reveals. You're involved at every key checkpoint — from initial research findings to strategy alignment to design concepts. We don't disappear into a room for weeks and emerge with a finished product. At each stage, we share our thinking, explain the reasoning behind every decision, and make sure we're aligned before moving forward. Revisions are a natural and expected part of the process, not a failure. By the time we reach the final deliverable, it feels like something we built together — because we did.",
  },
  {
    q: "I already have a logo and some brand materials. Do I need to start from scratch?",
    a: "Not necessarily. Sometimes the foundation is solid and just needs refinement or extension. Other times, existing materials may actually be working against you without you realizing it. We'll assess what you have with fresh, objective eyes during the research phase and give you an honest recommendation. If your current identity genuinely serves your business well, we'll tell you — we have no interest in selling you work you don't need. But if there's a disconnect between your real quality and your visual representation, we'll explain exactly where the gap is and how to close it.",
  },
  {
    q: "We operate in Vietnam. Can you deliver to international standards?",
    a: "Absolutely — and this is actually core to who we are. We're based in Da Nang, but our standards, methodology, and design philosophy are global. We follow international accessibility guidelines, use industry-standard tools and frameworks, and design for audiences who compare everything they see to the best websites in the world. Your potential client in Singapore or partner in Germany doesn't grade your digital presence on a regional curve. They judge it against Apple, Airbnb, and your direct competitors worldwide. We design with that reality firmly in mind.",
  },
  {
    q: "Is this investment really worth it?",
    a: "We understand the hesitation — investing in something like design and strategy requires trust, especially when the results aren't always immediately visible. Here's how we think about it: every day your digital presence doesn't match your real capabilities, there's an invisible cost. The client who researched you online but chose a competitor because their website looked more professional. The partnership opportunity that never materialized because your first impression didn't inspire confidence. You'll never see invoices for those missed opportunities, but they're real. A strategic digital presence doesn't guarantee overnight transformation — nothing honest can promise that. But it systematically removes the barriers between your genuine expertise and the people who need to find you.",
  },
  {
    q: "Should I wait until my business is more established before investing?",
    a: "Only if you're comfortable with your current digital presence representing your business during that entire growth period. Many businesses tell themselves 'we'll fix the website later' — and later becomes years of missed first impressions, weaker positioning, and opportunities that quietly went to competitors who looked more prepared. Your brand shouldn't reflect where you were; it should reflect where you're heading. Some of the most impactful work we do is with businesses at a turning point — ready to grow but held back by a digital presence that doesn't match their ambition. Starting now means every new client interaction, every pitch, every partnership conversation from this point forward benefits from the investment.",
  },
];

/* ── Canvas ── */
const FAQCanvas = () => {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { ref: openerRef, revealed: openerRevealed } = useRevealOnScroll(0.15);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          document.querySelectorAll(".mini-toc-row").forEach((r) => r.classList.remove("active"));
          document.querySelector(".mini-toc-row:nth-child(7)")?.classList.add("active");
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const prefersRM =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const elasticStyle: React.CSSProperties = isMobile
    ? { padding: "0 24px" }
    : {
        marginLeft: "var(--nav-width, 64px)",
        width: "calc(100vw - var(--nav-width, 64px))",
        paddingLeft: "var(--safe-space, 48px)",
        paddingRight: "var(--safe-space, 48px)",
        transition: "margin-left 400ms cubic-bezier(0.4,0,0.2,1), width 400ms cubic-bezier(0.4,0,0.2,1)",
      };

  const show = (delay: number, dur = 500): React.CSSProperties =>
    prefersRM
      ? { opacity: 1 }
      : {
          opacity: 1,
          transform: "translateY(0)",
          transition: `opacity ${dur}ms ease ${delay}ms, transform ${dur}ms ease ${delay}ms`,
        };

  const hidden: React.CSSProperties = prefersRM
    ? {}
    : { opacity: 0, transform: "translateY(16px)" };

  return (
    <section
      ref={sectionRef}
      id="section-faq"
      className="faq-canvas"
      style={{
        position: "relative",
        zIndex: 15,
        background: "hsl(var(--background))",
      }}
    >
      <TornEdge variant={2} />

      <div style={{ ...elasticStyle, position: "relative", zIndex: 2 }}>
        {/* BLOCK 1: Section Opener */}
        <div
          ref={openerRef}
          style={{
            paddingTop: 120,
            textAlign: "center",
            maxWidth: 600,
            margin: "0 auto",
          }}
        >
          <span
            className="font-body"
            style={{
              fontWeight: 500,
              fontSize: 14,
              color: "hsl(var(--secondary))",
              display: "block",
              ...hidden,
              ...(openerRevealed ? show(0) : {}),
            }}
          >
            VII
          </span>
          <div
            style={{
              width: 40,
              height: 1,
              background: "hsl(var(--secondary))",
              margin: "16px auto",
              transform: prefersRM || openerRevealed ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "center",
              transition: openerRevealed
                ? "transform 400ms ease 100ms"
                : undefined,
            }}
          />
          <h2
            className="font-display font-bold"
            style={{
              fontSize: "clamp(26px, 3.5vw, 44px)",
              color: "hsl(var(--primary))",
              lineHeight: 1.2,
              ...hidden,
              ...(openerRevealed ? show(200) : {}),
            }}
          >
            Before we begin, let's address what's on your mind.
          </h2>
        </div>

        {/* 48px gap */}
        <div style={{ height: 48 }} />

        {/* BLOCK 2: Q&A Accordion */}
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <Accordion type="single" collapsible className="w-full">
            {qaItems.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-b" style={{ borderColor: "rgba(26,26,24,0.06)" }}>
                <AccordionTrigger
                  className="font-display font-bold text-left py-6 hover:no-underline [&>svg]:text-[hsl(var(--secondary))]"
                  style={{
                    fontSize: "clamp(18px, 2.2vw, 24px)",
                    color: "hsl(var(--primary))",
                    lineHeight: 1.35,
                  }}
                >
                  {item.q}
                </AccordionTrigger>
                <AccordionContent
                  className="font-body"
                  style={{
                    fontWeight: 300,
                    fontSize: "clamp(14px, 1.4vw, 16px)",
                    color: "rgba(26,26,24,0.6)",
                    lineHeight: 1.85,
                    whiteSpace: "pre-line",
                    paddingBottom: 24,
                  }}
                >
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Gold separator line */}
        <div style={{ height: 64 }} />
        <div
          style={{
            width: 200,
            maxWidth: "100%",
            height: 1,
            background: "hsl(var(--secondary) / 0.15)",
            margin: "0 auto",
          }}
        />
        <div style={{ height: 64 }} />

        {/* BLOCK 3: The Invitation */}
        <TheInvitation />

        {/* Bottom padding */}
        <div style={{ height: 100 }} />
      </div>
    </section>
  );
};

export default FAQCanvas;
