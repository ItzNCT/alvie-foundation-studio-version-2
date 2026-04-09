import { useEffect, useRef, useState } from "react";

const chapters = [
  { name: "Introduction", numeral: "I", target: "section-introduction" },
  { name: "The problem", numeral: "II", target: "section-problem" },
  { name: "The necessity", numeral: "III", target: "section-necessity" },
  { name: "Our solution", numeral: "IV", target: "section-solution" },
  { name: "How we work", numeral: "V", target: "section-howwework" },
  { name: "About us", numeral: "VI", target: "section-aboutus" },
  { name: "Frequently asked questions", numeral: "VII", target: "section-faq" },
];

const MiniTOC = () => {
  const tocRef = useRef<HTMLDivElement>(null);
  const [isDarkBg, setIsDarkBg] = useState(true);

  useEffect(() => {
    let ctx: any;

    const initGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!tocRef.current) return;

      const heroItems = gsap.utils.toArray<HTMLElement>(".hero-toc-row");
      const miniItems = gsap.utils.toArray<HTMLElement>(".mini-toc-row");

      ctx = gsap.context(() => {
        // Animate each hero TOC row to fly toward its mini-TOC counterpart
        if (heroItems.length && miniItems.length) {
          heroItems.forEach((heroItem, index) => {
            const miniItem = miniItems[index];
            if (!heroItem || !miniItem) return;

            gsap.to(heroItem, {
              x: () => {
                const hr = heroItem.getBoundingClientRect();
                const mr = miniItem.getBoundingClientRect();
                return mr.left - hr.left;
              },
              y: () => {
                const hr = heroItem.getBoundingClientRect();
                const mr = miniItem.getBoundingClientRect();
                return mr.top - hr.top;
              },
              scale: 0.7,
              opacity: 0,
              scrollTrigger: {
                trigger: ".page-wrapper",
                start: "top top",
                end: "35vh top",
                scrub: 0.5,
                invalidateOnRefresh: true,
              },
              delay: index * 0.02,
            });
          });
        }

        // Mini-TOC slides in from right as it fades in
        gsap.fromTo(
          tocRef.current,
          { opacity: 0, x: 24 },
          {
            opacity: 1,
            x: 0,
            scrollTrigger: {
              trigger: ".page-wrapper",
              start: "25vh top",
              end: "45vh top",
              scrub: 0.5,
            },
          }
        );
      });
    };

    initGSAP();
    return () => ctx?.revert();
  }, []);

  // Detect light-background canvas sections
  useEffect(() => {
    const canvasSections = document.querySelectorAll(
      ".necessity-canvas, .canvas-section, .solution-canvas, .howwework-canvas, .aboutus-canvas, .faq-canvas"
    );

    if (!canvasSections.length) {
      const retryTimeout = setTimeout(() => {
        const sections = document.querySelectorAll(
          ".necessity-canvas, .canvas-section, .solution-canvas, .howwework-canvas, .aboutus-canvas, .faq-canvas"
        );
        if (!sections.length) return;

        const obs = new IntersectionObserver(
          (entries) => {
            const isOnLight = entries.some(
              (e) => e.isIntersecting && e.intersectionRatio > 0.3
            );
            setIsDarkBg(!isOnLight);
          },
          { threshold: [0, 0.3, 0.5, 1] }
        );
        sections.forEach((el) => obs.observe(el));
      }, 2000);
      return () => clearTimeout(retryTimeout);
    }

    const bgObserver = new IntersectionObserver(
      (entries) => {
        const isOnLight = entries.some(
          (e) => e.isIntersecting && e.intersectionRatio > 0.3
        );
        setIsDarkBg(!isOnLight);
      },
      { threshold: [0, 0.3, 0.5, 1] }
    );

    canvasSections.forEach((el) => bgObserver.observe(el));
    return () => bgObserver.disconnect();
  }, []);

  return (
    <div
      ref={tocRef}
      className="fixed z-20 font-body mini-toc-container hidden md:block"
      style={{
        bottom: 80,
        right: 48,
        opacity: 0,
      }}
    >
      {chapters.map((ch, i) => (
        <div
          key={ch.numeral}
          className={`mini-toc-row flex justify-between gap-5 ${i === 0 ? "active" : ""} ${!isDarkBg ? "light-mode" : ""}`}
          onClick={() => {
            const el = document.getElementById(ch.target);
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          style={{
            fontSize: 11,
            lineHeight: 2.2,
            fontWeight: 400,
            whiteSpace: "nowrap",
          }}
        >
          <span>{ch.name}</span>
          <span
            className="numeral"
            style={{ fontSize: 10 }}
          >
            {ch.numeral}
          </span>
        </div>
      ))}
    </div>
  );
};

export default MiniTOC;
