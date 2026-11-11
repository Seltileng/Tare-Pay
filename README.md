# Tare-Pay
### 0. Brand Identity: Tare Pay

**Product name:** Tare Pay (always written "Tare Pay" in UI copy, never "TarePay" or "Tare pay"; use "TARE PAY" only inside the logo wordmark).
**Positioning:** A trusted digital cooperative society platform for Nigerian members: savings, shares, loans and governance in one place.
**Replace all generic references** to "Cooperative Society platform" or "Coop" with "Tare Pay", including the virtual account name format (`Tare Pay / John Doe`), page titles, email/receipt headers, toasts, the footer and the PDF statement headers.

#### Logo assets
The logo is a single continuous line that forms clasped hands (members joining together) and rises to an upward-trend node (financial growth). Build these as reusable React components in `components/brand/`:

1. `TarePayMark`: icon only (for the collapsed sidebar, favicon, mobile header, loading screen, avatar placeholders).
2. `TarePayLogo`: icon plus "TARE PAY" wordmark (for the sidebar, auth screens, landing header, footer).
3. Both accept `size`, `className` and `variant: "default" | "inverted"`. They use `currentColor` for the strokes and text so they adapt to light mode (navy `#0F172A`), dark mode and navy surfaces (white `#FFFFFF`). Never hard-code the fill colour.
4. Remove the logo's white background rectangle, so it is transparent on any surface.
5. Keep clear space equal to the node's diameter on all sides, and set a minimum size of 24px for the mark and 96px for the full logo.
6. Do not stretch, rotate, recolour with gradients, or place on busy backgrounds.

Base geometry (use exactly; the viewBox crops the icon tightly):

```tsx
// components/brand/TarePayMark.tsx
export function TarePayMark({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="100 120 300 250"
      width={size}
      height={(size * 250) / 300}
      role="img"
      aria-label="Tare Pay"
      className={className}
    >
      <g stroke="currentColor" strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M 120 320 C 170 320, 180 240, 220 240 C 245 240, 245 285, 220 285 C 195 285, 270 170, 310 220 C 330 245, 345 240, 380 140" />
        <path d="M 140 345 C 190 345, 230 320, 280 300" strokeWidth={8} opacity={0.25} />
      </g>
      <circle cx={380} cy={140} r={9} fill="currentColor" />
    </svg>
  );
}
```

`TarePayLogo` renders `TarePayMark` followed by the text "TARE PAY" (Inter or Plus Jakarta Sans, weight 700, `tracking-[0.3em]`, uppercase). In the sidebar, show the full logo when expanded and the mark only when collapsed, with a smooth width transition.

#### Where the brand appears
- **Favicon and app icons:** generate `app/icon.svg` (mark on a navy rounded square, mark in white) and an `apple-icon`; add a web manifest with `name: "Tare Pay"`, `theme_color: #0F172A`.
- **Metadata:** `title.template: "%s | Tare Pay"`, with Open Graph and Twitter card tags set up in the root layout.
- **Splash and loading screen:** centred mark with a subtle stroke-draw animation (SVG `pathLength` animation via Framer Motion, ~1.2s, then fade), shown on first load and during the route-level `loading.tsx`. Respect `prefers-reduced-motion`.
- **Auth screens:** split layout. The left panel is navy with a faint pattern, an inverted logo, and a tagline ("Save together. Grow together."). The right panel holds the form on a light surface.
- **Receipts, statements and audit reports:** header with the logo, society name, reference number and generated date.
- **Empty states and error pages (404/500):** use the mark as a watermark or accent.
- **Voice and tone:** warm, clear, trustworthy. Plain English, no jargon, with a respectful tone for older members. Example microcopy: "Your Tare Pay account number", "Copied to clipboard".

#### Brand colour application
- Logo and primary UI: Deep Navy `#0F172A`
- Growth and success accents (including the trend node in the **app-header version only**, optional): Emerald `#059669`
- Backgrounds: Slate `#F8FAFC`
- Always check that the logo meets 4.5:1 contrast on any surface it sits on.