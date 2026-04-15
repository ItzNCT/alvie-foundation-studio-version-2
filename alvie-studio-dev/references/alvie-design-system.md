# ALVIE - Knowledge Space
## Brand Identity
ALVIE is a digital solutions provider and strategic consultancy. We bridge the gap between real-world expertise and digital reputation. 
- Brand personality: "The Observer" - quiet, deeply empathetic, sophisticated
- Slogan: "Not just exist"
- Vision: "Crafting a digital world where all core values are seen and appreciated."
- Mission: "Synchronize your real-world capabilities with your digital reputation through strategic thinking and empathy."
---
## Design Tokens (Follow Strictly)
### Primary Colors
| UI Components       | **Light**     | **Dark**      |
| ------------------- | ------------- | ------------- |
| **Background**      | `#F9FAFB`     | `#121212`     |
| **Surface**         | `#FFFFFF`     | `#1E1E1E`     |
| **Primary**         | **`#0F5C4E`** | **`#4EB5A3`** |
| **Text on Primary** | `#FFFFFF`     | `#082F28`     |
| **Text Primary**    | `#111827`     | `#F9FAFB`     |
| **Text Secondary**  | `#6B7280`     | `#9CA3AF`     |
| **Border**          | `#E5E7EB`     | `#2D3748`     |
### Typography
- Display/Headlines: **Baloo 2** (Google Fonts) — Bold (700) or ExtraBold (800). Use ONLY at 32px+ where its rounded warmth shines.
- Body/UI: **Be Vietnam Pro** (Google Fonts) — Light (300), Regular (400), Medium (500), SemiBold (600). Use for all text under 24px. Clean, precise, supports Vietnamese perfectly.
- **Size**: 64px (H1), 42px (H2), 32px (H3), 20px (H4), 16px (H5), 14px (H6)
### Spacing
- Base unit: 8px
- Section vertical padding: 64–96px
- Component gaps: 16–32px
- Border-radius: 12px for cards, 8px for buttons, 24px for large containers
- Max content width: 1200px, centered
### Animation Timing
- Fast micro-interactions: 150ms
- Standard transitions: 300ms
- Reveal/entrance animations: 500–700ms
- Scroll-driven: scrubbed to scroll position
- Easing: cubic-bezier(0.4, 0, 0.2, 1) for standard, spring physics for organic feel
- ALL motion must be subtle, calm, unhurried — never bouncy or aggressive
---
## Design Philosophy (Follow Strictly)
### Must-followed (Most Important)
- Show, don't tell
- **Rejouice inspired:** strict grid system, generous negative space, visual hierarchy, chunked hidden content (tabs/accordions/sliders)
### Visual Hierarchy & Signifiers
- **Affordances:** UI must explain itself without text via visual states (e.g., grayed-out = disabled, borders = grouped, highlighted = active).
- **Hierarchy via Contrast:** Drive attention using size, weight, and color. Most critical elements must be large, bold, and positioned at the top.
- **Visual Communication:** Replace transitional text with icons (e.g., use `[Icon] -> [Icon]` instead of "From X to Y").
### Layout, Grids & Whitespace**
- **Spacing Rules:** Prioritize generous whitespace over rigid column alignment. Use a **4-point/8-point grid system** for all spacing to ensure mathematical consistency.
- **Proximity:** Group logically related elements tightly to establish visual relationships.
### Typography Optimization
- **Font Selection:** Use exactly **one** high-quality sans-serif family.
- **Scale:** Maximum 6 font sizes per website layout. For data-dense dashboards, cap the maximum size at 24px.
- **The "Pro" Header Hack:** For large display text, apply **-2% to -3% letter spacing** and reduce line height to **110% - 120%**.
### Color & Dark Mode Mechanics
- **Semantic Color:** Strictly reserve Red, Yellow, Green, and Blue for systemic feedback (Danger, Warning, Success, Trust/Action).
- **Dark Mode Rules:** Drop shadows do not work. Create depth by using **lighter surface colors** against darker backgrounds. Desaturate and dim colored chips/badges to avoid eye strain. Soften border contrast.
### Components & Shadows
- **Icons:** Always match icon dimensions perfectly to the line-height of the adjacent text (e.g., 24px icon for text with a 24px line-height).
- **Buttons:** Standard padding rule is **Horizontal Padding = 2x Vertical Padding**. Use "Ghost Buttons" (no background until hover) for secondary CTAs.
- **Shadows (Light Mode):** Low opacity + high blur. Increase shadow strength based on elevation (e.g., flat cards need minimal shadow; floating popovers need heavy shadow).
### Feedback & Micro-interactions
- **Mandatory UI States:** Every interactive element must account for: Default, Hover, Active/Pressed, Disabled, Focus, Error, and Loading.
- **Action Confirmation:** Use micro-interactions (like a sliding toast notification) to definitively confirm user actions.
- **Text over Images:** Never use flat, solid-color overlays. Use **linear gradients** or progressive glassmorphism blurs to maintain image visibility while ensuring text readability.
---
## Technical Stack
- Framework: React + TypeScript + Vite
- Styling: Tailwind CSS + shadcn/ui 
- Animation: GSAP (ScrollTrigger for scroll-driven), Framer Motion for React components
- Fonts: Google Fonts (Baloo 2 + Be Vietnam Pro)
- Media: WebM video with MP4 fallback, WebP/AVIF images with JPEG fallback
- Accessibility: WCAG AA minimum, prefers-reduced-motion support required
---
## Component Naming Convention
- Use PascalCase for components: HeroSection, FeatureVignette, CinematicBridge
- Use kebab-case for files: hero-section.tsx, feature-vignette.tsx
- Group by section: /components/hero/, /components/features/, /components/about/
---
## Content Voice
- Tone: Calm, sincere, warm. Like a deep conversation between trusted partners.
- Pronouns: "We" (ALVIE) and "You" (client) to creates closeness
- Never use buzzwords, hype language, or aggressive sales copy
- Every headline should feel like it could be whispered, not shouted