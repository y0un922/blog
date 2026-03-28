```markdown
# Design System Specification: Terminal Editorial

## 1. Overview & Creative North Star
**The Creative North Star: "The Neo-Technical Manuscript"**

This design system rejects the "SaaS-standard" layout in favor of a high-end, editorial experience that merges the precision of a terminal with the rhythmic whitespace of a luxury print journal. It is built for power users who value the "TUI" (Terminal User Interface) aesthetic but demand the polish of a modern, fluid digital experience.

We break the template look by embracing **intentional asymmetry** and **typographic dominance**. Instead of center-aligned, boxy grids, we use left-heavy terminal-inspired layouts, overlapping surface layers, and high-contrast pastel accents to guide the eye. The interface should feel like it was "typed" into existence, yet refined by a master typographer.

---

## 2. Color & Surface Architecture
The palette is a sophisticated evolution of the Catppuccin Mocha spectrum, optimized for deep-focus environments.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to define sections. Layout boundaries must be established exclusively through background shifts (e.g., a `surface_container_low` card sitting on a `surface` background) or rhythmic vertical spacing. 

### Surface Hierarchy
We use a "Nesting" philosophy. Importance is conveyed by moving toward the light or retreating into the dark:
- **Base Layer:** `surface` (#121221) – The bedrock of the application.
- **Structural Zones:** `surface_container` (#1e1e2e) – Primary content areas.
- **Interactive Elements:** `surface_container_high` (#292839) – Floating menus or active panels.
- **Deep Insets:** `surface_container_lowest` (#0d0d1c) – Used for terminal inputs or code blocks to create a "punched-in" effect.

### The "Glass & Gradient" Rule
To prevent the UI from feeling "flat" or "stale," we utilize a signature **Glassmorphism** effect for high-level overlays (modals, command palettes).
- **Glass Token:** Use `surface_container` at 70% opacity with a `24px` backdrop-blur.
- **Signature Glow:** Primary actions should use a subtle linear gradient: `primary` (#e2c7ff) to `primary_container` (#cba6f7) at a 135° angle to add depth.

---

## 3. Typography
We utilize **Space Grotesk** as the primary voice. It provides a "technical-humanist" feel—the geometry of a monospace font with the legibility of a Swiss grotesque.

- **Display (The Statement):** Use `display-lg` for hero headers. Tracking should be tightened (-0.02em) to feel authoritative. 
- **Headline & Title (The Anchor):** Use `headline-sm` for section headers. Always pair these with a `label-sm` "prefix" (e.g., `01 // SECTION NAME`) in `secondary` (#a8c8ff) to lean into the technical manuscript aesthetic.
- **Body (The Content):** `body-md` is the workhorse. Maintain a generous line-height (1.6) to ensure the high-contrast text doesn't fatigue the eye.
- **Labels (The Metadata):** Use `label-md` in `on_surface_variant` (#cdc3d1) for all secondary data. This differentiates "data" from "content."

---

## 4. Elevation & Depth
Depth in this system is a result of **Tonal Layering**, not structural shadows.

### The Layering Principle
Think of the UI as layers of dark acrylic. A card doesn't "float" because of a shadow; it exists because it is a different shade of dark than the floor beneath it.
- **Level 0:** `surface_dim`
- **Level 1 (The Page):** `surface`
- **Level 2 (The Component):** `surface_container`

### Ambient Shadows
If an element must float (e.g., a popover), use an **Ambient Glow** rather than a shadow:
- **Shadow Token:** `0px 20px 40px rgba(0, 0, 0, 0.4)`. The color is never pure black, but a deep indigo derived from `surface_container_lowest`.

### The Ghost Border Fallback
Where accessibility requires a container boundary, use a **Ghost Border**:
- **Token:** `outline_variant` (#4a444f) at 30% opacity. It should be felt, not seen.

---

## 5. Components & UI Patterns

### Buttons (The Tactical Trigger)
- **Primary:** Filled with `primary` (#e2c7ff). Text is `on_primary` (#3f1e66). Sharp `sm` (0.125rem) corners to maintain the terminal feel.
- **Secondary:** Ghost style. No background. `outline` (#968e9a) at 20% opacity. On hover, background shifts to `surface_bright`.
- **Tertiary:** Text-only with a leading symbol (e.g., `> _`).

### Input Fields (The Command Line)
- **Style:** Underline only or "Inset Box."
- **Focus State:** The background shifts to `surface_container_highest` and the bottom border glows with `tertiary` (#f5c2e7).
- **ASCII Flourish:** Use characters like `[` and `]` to wrap focus states or selection indicators.

### Cards & Lists (The Editorial Feed)
- **Rule:** Absolute prohibition of divider lines. 
- **Separation:** Use `1.75rem` (Spacing-8) of vertical whitespace between items. 
- **Interactive States:** On hover, a card should shift from `surface_container` to `surface_container_high` with a 200ms ease-out transition.

### Navigation (The Sidebar)
- Utilize a "Vertical Column" layout. Icons should be minimal, paired with `label-sm` text. Use `secondary` (#a8c8ff) for the active state indicator—a vertical 2px line on the far left.

---

## 6. Do’s and Don’ts

### Do:
- **Embrace Asymmetry:** Align text to the left but allow imagery or secondary data to bleed off the right edge.
- **Use "Technical" Spacing:** Use the spacing scale precisely. A `1.1rem` (Spacing-5) gap should be consistent across all component internals.
- **Leverage the Accent Palette:** Use `green` (#a6e3a1) for success and `peach` (#fab387) for warnings, but keep them as small "dots" or "pills" to avoid overwhelming the dark base.

### Don’t:
- **No Heavy Shadows:** Never use high-opacity, small-radius shadows. They break the "Acrylic" feel.
- **No Rounded "Pills":** Avoid `full` (9999px) roundedness on buttons. Stick to `sm` (0.125rem) or `md` (0.375rem) to keep the "terminal" edge.
- **No Centered Content:** In an editorial system, "centered" often looks "undecided." Commit to a strong left-aligned grid.

---

## 7. Signature Technical Layouts
To truly honor the "ASCII-inspired" request, use the following layout patterns:
1. **The Bracketed Header:** `[ 01 // OVERVIEW ]` using `label-md` and the `mauve` (#cba6f7) token.
2. **The Terminal Breadcrumb:** `root / settings / appearance` using `JetBrains Mono` at `0.75rem`.
3. **The Data Matrix:** For list views, use a table structure without lines, where column headers are `on_surface_variant` at 50% opacity.```