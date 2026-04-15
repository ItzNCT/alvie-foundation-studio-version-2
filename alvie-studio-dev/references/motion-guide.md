# ALVIE - Motion & Interaction Guide

## 1. Core Motion Philosophy
ALVIE's brand personality is "The Observer" - quiet, deeply empathetic, sophisticated. Therefore, ALL motion must be subtle, calm, unhurried — never bouncy or aggressive. We embrace the Wabi-sabi spirit: organic, authentic, and deeply human.

- **No generic bounce:** Avoid extreme elasticity. Use spring physics only for organic, natural feels, not playful bounces.
- **The Magnifying Glass effect:** We use a Magnifying Glass to zoom in on the simple beauties and tiny details. Implement slow, subtle scale-ups (e.g., `scale: 1.05` over 3-5 seconds) for background images or hero visuals.
- **The Bridge effect:** We build a Bridge, seamlessly connecting your real-world expertise with your digital reputation. Section transitions must flow seamlessly into one another using scroll-driven scrubbing.

## 2. Technical Motion Stack
- **Scroll-driven Animations:** MUST use GSAP and ScrollTrigger.
- **UI/Component Animations:** Use Framer Motion for React components (hover states, dialogs, modals).

## 3. Strict Timing & Easing Rules
Adhere strictly to these design tokens:
- **Fast micro-interactions:** 150ms. (e.g., button hovers, link underlines).
- **Standard transitions:** 300ms. (e.g., opening a dropdown, changing tabs).
- **Reveal/entrance animations:** 500–700ms. (e.g., text fading in on scroll).
- **Standard Easing:** `cubic-bezier(0.4, 0, 0.2, 1)`.

## 4. UI Feedback & States
- **Mandatory UI States:** Every interactive element must account for: Default, Hover, Active/Pressed, Disabled, Focus, Error, and Loading.
- **Action Confirmation:** Use micro-interactions (like a sliding toast notification) to definitively confirm user actions.

## 5. Accessibility (CRITICAL)
- **WCAG AA Minimum:** Motion must never cause motion sickness.
- **Reduced Motion:** `prefers-reduced-motion` support is REQUIRED. Always wrap GSAP and Framer Motion logic to check `window.matchMedia("(prefers-reduced-motion: reduce)")`. If true, either snap to the end state instantly or replace movement with a simple 300ms opacity fade.

## 6. Implementation Notes for Claude
When asked to "animate this component" or "add interaction":
1. Determine if it's a micro-interaction (Framer Motion, 150ms) or a scroll narrative (GSAP, scrubbed/500ms).
2. Ensure the movement feels like "a warm, reassuring hug" - composed and sincere.
3. ALWAYS clean up GSAP contexts (`gsap.context()`) in React `useEffect` to prevent memory leaks.