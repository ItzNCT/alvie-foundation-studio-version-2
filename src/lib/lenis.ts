import Lenis from "lenis";

/*
 * Singleton Lenis instance — shared across the whole app.
 *
 * Lenis intercepts native scroll and replaces it with a smooth,
 * interpolated value. All GSAP ScrollTrigger instances should call
 * `ScrollTrigger.update()` on each Lenis scroll event so their
 * scrub positions stay in sync with the smoothed scroll value.
 *
 * Import this module for its side-effect (starts the RAF loop) and
 * then import the `lenis` named export when you need to attach or
 * detach ScrollTrigger.update.
 *
 * Usage:
 *   import { lenis } from "@/lib/lenis";
 *   lenis.on("scroll", ScrollTrigger.update);   // in useEffect
 *   lenis.off("scroll", ScrollTrigger.update);  // in cleanup
 */
export const lenis = new Lenis({
  duration: 1.1,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
});

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
