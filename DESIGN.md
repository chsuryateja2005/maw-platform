# MAW Design System

**Theme**: Dark sidebar + light content (Admin/Manager/Delivery); light portals (Customer/Collab/Support) | **Accent**: Indigo (#6366f1) | **Fonts**: General Sans display, DM Sans body, Geist Mono

## Palette

| Role | Light | Dark |
| --- | --- | --- |
| Background | 97% neutral cool | 10% slate blue |
| Foreground | 25% slate blue | 95% near-white |
| Card | White | 14% slate blue |
| Accent | Indigo (L:52 C:0.29 H:262) | Indigo (L:62 C:0.23 H:262) |
| Destructive | Red-orange (L:55 C:0.22 H:25) | Red-orange (L:65 C:0.19 H:22) |
| Border | 88% gray | 20% slate |
| Sidebar (Light) | White | n/a |
| Sidebar (Dark) | 6% deep slate | Dark bg |

## Zones

| Zone | Treatment | Dark Variant |
| --- | --- | --- |
| Header | Bg-card with border-b subtle | 14% slate, white text |
| Sidebar (light portals) | White with soft borders | n/a |
| Sidebar (dark portals) | 6% deep slate (#0f172a), white text | Primary |
| Content area | Off-white (97%) with card elevation | 10% slate blue |
| Card | White with subtle shadow, border | 14% slate, elevated |
| Footer | Muted bg (92%), border-t | 25% slate |

## Typography

| Tier | Family | Weight | Size | Usage |
| --- | --- | --- | --- | --- |
| Display | General Sans | 700 | 32–48px | Page titles, hero |
| Body | DM Sans | 400 | 14–16px | Content, UI labels |
| Mono | Geist Mono | 400 | 12–13px | Code, IDs, timestamps |

## Interaction & Motion

- **Transition default**: `cubic-bezier(0.4, 0, 0.2, 1)` @ 300ms
- **Loading skeleton**: `shimmer` 2s infinite (gradient sweep 1000px)
- **KPI counter**: `counter-up` 800ms `cubic-bezier(0.34, 1.56, 0.64, 1)` (bounce-out easing)
- **Pulse highlights**: `pulse-glow` 2s on accent buttons, card hovers
- **Page fade**: `fade-in` 400ms on route transitions
- **Button hover**: `bg-opacity-90` + `shadow-md` on primary CTA

## Shadows

| Class | Elevation | Use Case |
| --- | --- | --- |
| shadow-xs | 1px offset | Subtle dividers, input focus |
| shadow-sm | 1px + 3px offset | Floating labels |
| shadow-md | 4px + 6px offset | Modals, dropdowns |
| shadow-lg | 10px + 15px offset | Elevated surfaces |
| shadow-elevated | 20px + 40px offset | Hero cards, full-page overlays |
| shadow-subtle | Indigo-tinted 1px | Active accent states |

## Structural Principles

- **Card-based grid**: 2–4 columns responsive, 16px gap
- **Sidebar width**: 280px (light), 280px (dark)
- **Content max-width**: 1400px
- **Radius hierarchy**: 0.5rem default (lg), 0.375rem for inputs (md), 0.25rem for small elements (sm)
- **Dark portal sidebar visual**: Deep slate with white text, indigo accent on active nav items
- **Light portal nav**: Soft gray sidebar or top nav bar with indigo accent
- **Consistency**: Indigo (#6366f1) accent across ALL 6 portals for visual unity

## Component Patterns

- **KPI Card**: White/dark-card bg, bold primary number, muted label, animated counter (800ms), icon accent-colored
- **Data Table**: Striped rows (alternate muted/card), sticky header, hover row highlight
- **Button**: Primary indigo, secondary muted, destructive red; all with subtle shadows
- **Input**: Border-input, focus ring indigo, padding 8px; light label above
- **Toast notification**: Via Sonner — indigo success, red destructive, soft shadow
- **Modal**: Elevated shadow-lg, semi-transparent dark backdrop, indigo CTA
- **Loading state**: Skeleton shimmer (gradient animation) on tables and list items

## Signature Detail

- **Dual visual contrast**: Indigo accent bridges dark (admin) and light (customer) portals — same accent, strikingly different surfaces creates coherent ecosystem
- **KPI counter animation**: Numbers animate from 0 to target over 800ms with bounce-out easing — micro-interaction that feels premium and responsive
- **Skeleton shimmer**: Gradient sweep loading states (not spinners) across all async content — aligns with modern SaaS expectations
- **Sidebar asymmetry**: Light portal sidebars feel open and airy; dark portals feel grounded and focused — intentional surface contrast, not just color inversion
