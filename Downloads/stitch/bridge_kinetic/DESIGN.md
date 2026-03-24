# Design System Specification: The Fluid Architect

## 1. Overview & Creative North Star
The North Star for this design system is **"The Fluid Architect."** 

In a placement management landscape often defined by rigid spreadsheets and cold data, this system introduces a sense of kinetic intelligence. We are moving beyond the "template" look of SaaS by embracing a futuristic, editorial aesthetic that mirrors the precision of **Linear** and the organic flow of **Stripe**. 

The design rejects the "boxy" nature of traditional platforms. Instead, it utilizes **2xl roundedness**, **asymmetric breathing room**, and **tonal layering** to create an interface that feels less like a tool and more like a high-end workspace. We prioritize "Data-Driven Elegance"—where complex information is decluttered through sophisticated typography and glassmorphic depth.

---

## 2. Colors & Surface Philosophy
Our palette transitions from deep, authoritative blues to visionary purples, reflecting the journey of placement and growth.

### The "No-Line" Rule
To achieve a premium, futuristic feel, **1px solid borders are prohibited for sectioning.** Boundaries must be defined through background color shifts.
*   **Example:** A `surface-container-low` sidebar sitting against a `surface` main content area. Let the change in hex value create the edge, not a stroke.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the following tiers to define importance:
*   **Base Layer:** `surface` (#f6f6ff)
*   **Structural Sections:** `surface-container-low` (#eef0ff) 
*   **Interactive Cards:** `surface-container-lowest` (#ffffff) — This creates a "lifted" effect.
*   **High-Priority Overlays:** `surface-container-high` (#d9e2ff)

### The Glass & Gradient Rule
*   **CTAs & Primary Actions:** Use a linear gradient from `primary` (#4647d3) to `secondary` (#6a37d4) at a 135° angle.
*   **Floating Elements:** Use `surface-container-lowest` at 80% opacity with a `backdrop-blur` of 20px to create a "frosted glass" effect for navigation bars and search modals.

---

## 3. Typography
We utilize a dual-sans-serif approach to balance high-end editorial style with functional data density.

*   **Display & Headlines (Manrope):** Chosen for its geometric precision and modern "tech" soul. Use `display-lg` (3.5rem) with negative letter-spacing (-0.02em) for hero moments.
*   **Interface & Body (Inter):** The industry standard for readability. Use `body-md` (0.875rem) for the majority of data-heavy placement tables to maximize information density without sacrificing clarity.
*   **Hierarchy Tip:** Always pair a `headline-sm` (Manrope) with a `label-md` (Inter) in `on-surface-variant` to create a clear "Title -> Metadata" relationship.

---

## 4. Elevation & Depth
We eschew traditional "Drop Shadows" in favor of **Tonal Layering**.

*   **The Layering Principle:** Depth is achieved by stacking. Place a white card (`surface-container-lowest`) on a light blue background (`surface-container-low`). This provides a soft, natural lift.
*   **Ambient Shadows:** When a shadow is required (e.g., a floating interactive roadmap), use a "Long Shadow" approach:
    *   `box-shadow: 0 20px 40px rgba(39, 46, 66, 0.06);` (Using a tinted version of `on-surface`).
*   **The Ghost Border:** If a border is required for accessibility in input fields, use `outline-variant` at 20% opacity. Never use 100% black or high-contrast grey borders.

---

## 5. Components

### Sidebar & Navigation
*   **Fixed Left Sidebar:** Use `surface-container-low`. Active states for navigation items should not use a box; use a vertical pill indicator (2px width) in `primary` and a subtle shift to `surface-container-highest`.
*   **Top Navbar:** Glassmorphic. 80% `surface` with a 20px blur. No bottom border.

### Progress Bars & Roadmaps
*   **Placement Progress:** Use a thick (12px) track in `surface-container-highest` with a gradient fill (`primary` to `secondary`). 
*   **Interactive Roadmaps:** Nodes should be `surface-container-lowest` with `2xl` corners. Use `tertiary` (#00628c) for connector lines to distinguish "Process" from "Action."

### Status Badges (Tag Badges)
*   **Eligible:** `on-tertiary-container` text on `tertiary-container` background.
*   **Not Eligible:** `on-error-container` text on `error-container` background (at 30% opacity for a softer look).
*   **Styling:** All badges must use `full` rounded corners (capsule style).

### Cards & Data Lists
*   **No Dividers:** Forbid the use of line dividers between list items. Use `spacing-4` (1rem) of vertical white space and `surface-container-low` hover states to separate content.
*   **Card Geometry:** Always use the `2xl` (1rem) roundedness scale for cards.

### Input Fields
*   **Search:** Top navbar search should be a "Ghost Input"—no background, just a search icon and `body-lg` placeholder text. Only shows a `surface-container-highest` background on focus.

---

## 6. Do’s and Don’ts

### Do
*   **DO** use whitespace as a functional tool. If a screen feels cluttered, increase the spacing scale instead of adding lines.
*   **DO** use `primary-fixed-dim` for "soft" buttons that need to stand out without the weight of a full gradient.
*   **DO** ensure all interactive elements have a minimum target size of 44px, even if the visual element is smaller.

### Don't
*   **DON'T** use pure black (#000000) for text. Use `on-surface` (#272e42) to maintain a soft, premium feel.
*   **DON'T** use the `none` or `sm` roundedness tokens. This system is defined by its soft, `2xl` curves.
*   **DON'T** use 1px dividers. If you feel the need to separate two sections, use a 4px gap or a tonal shift.