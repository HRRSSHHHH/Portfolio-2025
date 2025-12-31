# Design System: Intelligence-Driven Minimalism

> [!NOTE]
> This document defines the definitive design language for the portfolio. It is based on a deep audit of the codebase, capturing the "Dark-to-Light" duality and "Strategic Intelligence" vibe.

## Core Philosophy
**Vibe:** Confidently Future-Proof.
**Descriptor:** Intelligence-Driven Minimalism / Precision-Humanism.
**Structure:** Bimodal Experience.
1.  **The Interface (Dark Mode):** landing screen, hero, immersion. (Hero, ParticleBackground)
2.  **The Blueprint (Light Mode):** documentation, content, clarity. (Skills, Resume, Contact, Marquee)
3.  **The Depth (Dark Teal):** specific feature showcases. (Featured Projects, AI Tools)

## Color Palette (The Tech-Organic Mix)

| Token Name | Hex Value | Usage |
| :--- | :--- | :--- |
| **Brand Primary** | `#2d936c` | "Terminal Green" - Active intelligence, status, focus, cursor interactions. |
| **Brand Dark** | `#01161e` | Deep Navy/Black - Hero background, text color in Light Mode. |
| **Brand Light** | `#e0e0e0` | Clean Light Gray - **Primary background for inner pages** (Skills, Resume, Contact). |
| **Brand Card** | `#0c1f26` | Dark Teal - Featured Projects background, AI Tools specific sections. |
| **Brand Secondary** | `#55aaaa` | Muted Teal/Cyan - Cilia, interactive highlights. |
| **Brand White** | `#ffffff` | Pure white for text on Dark/Card backgrounds. |

## Typography (The Hierarchy of Intent)

### 1. Headline: `De Valencia`
*   **Usage:** Massive, high-impact headlines (10vw-12vw).
*   **Context:** Hero titles ("Designing Intelligence"), Section Headers ("Dimensions", "The Trajectory"), Background Watermarks (Contact).
*   **Weight:** Often used with `font-thin` or specific `100` weight for elegance.

### 2. Functional Metadata: `Consolas`
*   **Usage:** "System Specs" style headers.
*   **Pattern:** `[ Label ] ----- [ Value ]`. Used for tagging skills, dates, and "The Blueprint" section headers.
*   **Context:** Technical labeling, not body copy.

### 3. Body / UI: `Montserrat Alternates`
*   **Usage:** Navigation, project descriptions, button text, form inputs.
*   **Context:** The human readable layer.

## Layout Principles
*   **The Manifesto Header:** Inner pages (`Projects`, `Skills`, `Resume`) almost always start with a large `De Valencia` headline paired with a `Consolas` sub-header group.
*   **Whitespace:** Significant vertical spacing. Margins of `mb-32` or `mb-40` are standard.
*   **The Blueprint Grid:** Strict column layouts (e.g., ID | Context | Case Study in `Projects.tsx`).

## Interaction & Motion
*   **Entry:** `GSAP ScrollTrigger` with `stagger: 0.1` is the standard rhythm.
*   **Transition:** `ParticleTransition.tsx` covers the screen with brand colors (`#2d936c`, `#222`, `#888`) on route changes.
*   **Hover States:**
    *   **Lift:** `-translate-y-2` on cards (Projects).
    *   **Fill:** Buttons or steps fill with green/white on hover (Resume, Skills).
    *   **Scale:** Subtle image scaling.
*   **HUD Elements:**
    *   **Restricted:** Confined to the Hero (Corner guides) and specific "System Spec" dividers. NOT used as general chrome borders on content cards.

## Implementation Guidelines
*   **Tailwind Config:** MUST support both Dark and Light contexts.
    *   `bg-brand-dark` vs `bg-brand-light`.
    *   `text-brand-light` (on dark) vs `text-brand-dark` (on light).
*   **CSS Variables:** Ensure `--color-brand-primary` is available for Canvas/WebGL (Particles).
*   **Refactoring:** Migrating hardcoded hex values to these tokens is the priority to ensure this consistency is maintained.
