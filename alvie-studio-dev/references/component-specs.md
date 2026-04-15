# ALVIE - Component Specifications

## 1. Universal UI States
Every interactive element MUST account for all 7 states:
1. Default
2. Hover
3. Active/Pressed
4. Disabled (Use visual affordances like grayed-out colors)
5. Focus (Ensure accessibility rings are visible)
6. Error
7. Loading

## 2. Buttons & CTAs
- **Padding Rule:** Horizontal Padding must always equal exactly 2x Vertical Padding.
- **Primary Buttons:** Use `--alvie-green` with clear hover states.
- **Secondary CTAs:** MUST use "Ghost Buttons" (transparent background until hovered).

## 3. Icons
- **Sizing:** Icon dimensions must perfectly match the line-height of the adjacent text (e.g., use a 24px icon for text that has a 24px line-height).
- **Visual Communication:** Always replace transitional or instructional text with icons where possible (e.g., `[Icon] -> [Icon]` instead of "From X to Y").

## 4. Cards, Elevation & Shadows
- **Light Mode Shadows:** Use low opacity combined with high blur.
- **Elevation Logic:** Shadow strength must increase based on elevation (e.g., flat cards need minimal shadow; floating popovers/modals need heavy shadow).
- **Dark Mode Depth:** Do NOT use drop shadows in dark mode. Create depth by using lighter surface colors against darker backgrounds. Desaturate and dim colored chips/badges to avoid eye strain, and soften border contrast.

## 5. Feedback & Micro-interactions
- **Action Confirmation:** Always use micro-interactions (such as a sliding toast notification) to definitively confirm user actions.

## 6. Media & Overlays
- **Text over Images:** NEVER use flat, solid-color overlays. You must use linear gradients or progressive glassmorphism blurs to maintain image visibility while ensuring the text remains readable.