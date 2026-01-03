# Design System: Intelligence-Driven Minimalism (v1.0)

This architectural specification defines the visual identity, structural logic, and interactive soul of the portfolio. It is designed to be a definitive manual for all future development.

---

## 1. Design Philosophy: "The Bimodal Strategy"

The system is built on a sharp duality between **immersion** and **documentation**. Every section must strictly belong to one of these two "Spaces":

### A. The Interface (Dark Mode)
*   **Narrative:** The "Final Product," the high-tech output.
*   **Visuals:** Low-key lighting, neon highlights, deep teal surfaces, cinematic transitions.
*   **Sections:** `Hero`, `FeaturedProjects`, `Experience`, `AIToolsScroll`.

### B. The Blueprint (Light Mode)
*   **Narrative:** The "Working Files," the logic, and the process.
*   **Visuals:** High-key lighting, technical noise, archival grey, rigid grid patterns.
*   **Sections:** `About`, `Skills`, `Resume`, `Contact`, `Projects` (Listing).

---

## 2. Color Specification (Chromatic Logic)

All colors are controlled via Tailwind `brand` tokens and CSS variables.

| Token | Hex | RGB | Semantic Role |
| :--- | :--- | :--- | :--- |
| **Brand Primary** | `#2d936c` | `45, 147, 108` | **The Signal:** Active intelligence, focus, successful states. |
| **Brand Dark** | `#01161e` | `1, 22, 30` | **The Void:** Primary dark background, light mode typography. |
| **Brand Light** | `#e0e0e0` | `224, 224, 224` | **The Canvas:** Blueprint background, dark mode subtle text. |
| **Brand Card** | `#0c1f26` | `12, 31, 38` | **The Surface:** Interface containers, submerged logic. |
| **Brand Secondary**| `#55aaaa` | `85, 170, 170` | **The Aura:** Ambient cues, cilia, secondary highlights. |
| **Brand White** | `#ffffff` | `255, 255, 255` | **The Clarity:** Primary light typography over dark surfaces. |

---

## 3. Typography Matrix (Hierarchy of Intent)

The typography is optimized for a "System Specs" aesthetic. Use these precise mappings for all new development.

### 3.1 Headline System (`De Valencia`)
| Role | Size (TW) | Leading | Tracking | Weight | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display (Hero)** | `text-7xl` to `text-[12vw]` | `tight` | `tighter` | `100` | Used for massive background watermarks. |
| **Section Title** | `text-4xl md:text-7xl` | `tight` | `tight` | `normal` | Primary headings in `SectionHeader`. |
| **Sub-Heading** | `text-3xl` | `snug` | `normal` | `normal` | Project titles within cards. |

### 3.2 Metadata System (`Consolas`)
| Role | Size (TW) | Leading | Tracking | Weight | Format |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **System Tag** | `text-xs` | `none` | `widest` (0.2em) | `normal` | Uppercase. Used in `SystemLabel`. |
| **UI Action** | `text-xs` | `none` | `widest` | `normal` | Used in `BrandButton`. |
| **Breadcrumb** | `text-[10px]` | `none` | `wider` | `normal` | Smallest system labels (e.g., Footer). |

### 3.3 Body System (`Montserrat Alternates`)
| Role | Size (TW) | Leading | Tracking | Weight | Color Rule |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Primary Body** | `text-lg` | `relaxed` | `normal` | `300` (Light) | Light grey on dark; Dark navy on light. |
| **UI/Nav** | `text-sm` | `none` | `normal` | `400` (Reg) | High-contrast readability. |
| **Caption** | `text-xs` | `normal` | `wide` | `200` (ExLight)| Tertiary information. |

---

## 4. Atomic System Components

### 4.1 SectionHeader
- **Pattern:** `System Metadata` (Consolas) + `Display Title` (De Valencia) + `Body Desc` (Montserrat).
- **Rule:** Labels always come with a `w-12 h-[1px]` brand-primary prefix/suffix.

### 4.2 BrandButton
- **Hierarchy:**
    - **Primary:** The Gold Standard.
        - **Theme Light (on white):** Rest: `border-brand-dark/10`. Hover: Green fill, dark text, dark corners.
        - **Theme Dark (on dark):** Rest: `border-brand-primary/20`. Hover: White fill, dark text, green corners.
        - **Interaction:** Full boundary border at rest "collapses" into precision corners on hover.
    - **Secondary:** "The Logic Bridge".
        - **Interaction:** Inverse of Primary. 4 corners (`w-3 h-3`) at rest are connected by a faint dotted line. On hover, corners expand to meet in the middle (`w-full h-full`), forming a solid boundary.
        - **Fill:** Consistent `bg-brand-primary/10` tint across all themes to preserve the "Intelligence-Driven" aesthetic.
        - **Typography:** Theme-aware text on hover: `brand-dark` on light theme, and `brand-white` / `brand-light` on dark theme for maximized accessibility.
    - **Tertiary:** "The Viewport" (Ultra-Minimal / Ultra-Tight).
        - **Interaction:** Pure text at 100% opacity. No fill, no border, no data stream, no cursor glow.
        - **Hover:** 4 tiny precision L-corners (`w-2 h-2`) snap **ultra-tightly** (within 4-8px) around the text.
        - **Typography:** Theme-aware text color for brand consistency. No text-glitch effect.
- **Anatomy:** Strictly `font-consolas`, `text-xs`, `uppercase`, `tracking-[0.2em]`. No rounded corners.
- **Interactions (Data Stream):**
    - Scrolling hex data background (accelerates on hover).
    - Cursor-tracking radial glow (`brand-primary/40`).
    - Multi-channel RGB text glitch effect on hover.
    - Precision schematic corner markers appear on hover.
- **Feedback:** Tactile spring scaling (`active:scale-[0.98]`) on click.

### 4.3 SystemLabel
- **Pattern:** `[ VALUE ]`
- **Default:** `text-brand-primary` borderless text.
- **Pill:** Solid background with `text-brand-dark`.

---

## 5. Layout & Interactive Logic

### 5.1 The "Blueprint" Grid
- **Background:** `.blueprint-bg` (Light mode only).
- **Pattern:** `radial-gradient(var(--color-brand-dark) 0.5px, transparent 0.5px)` @ `30px 30px`.
- **Purpose:** Reinforces the "Documentation/Archival" theme.

### 5.2 Motion Standards
- **Global Stagger:** `0.1s` (GSAP).
- **Transition Duration:** `0.3s` to `0.8s` (Power2.out).
- **Interactive repulsion:** Particles react to mouse within `150px` radius.

---

## 6. Implementation Guardrails

1. **Colors:** ZERO hardcoded hex values in JSX. Use `brand-` utility classes or `ThemeConstants.ts`.
2. **Spacing:** Mandatory `mb-16` to `mb-32` between layout sections.
3. **Hierarchy:** Headlines MUST use `De Valencia`. All data MUST use `Consolas`.
4. **Theme:** Use the `.blueprint-bg` utility for all process-heavy pages.

---

> [!CAUTION]
> Avoid "softness." No large border-radii, no fuzzy shadows, and no generic `sans-serif` falls. Every pixel must look intentional and data-driven.
