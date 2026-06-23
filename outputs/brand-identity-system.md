# Mortgage by Q — Brand Identity System
**Version**: 1.0 — Draft for Review  
**Synthesized from**: Dribbble Mortgage Design (Zeyox Studio), Own Up palette research, competitor analysis  
**Status**: Ready for designer/developer handoff

---

## Brand Positioning Statement

> **Mortgage by Q is the trusted advisor in your corner — not another faceless lender.**
> We shop 150+ lenders so you don't have to. Modern, human, and refreshingly transparent.

**Brand Archetype**: The Guide (trusted expert friend who navigates complexity on your behalf)  
**Brand Personality**: Confident · Warm · Direct · Modern · Knowledgeable

---

## Color Palette

### Primary Colors

| Name | Hex | Usage |
|:---|:---|:---|
| **Q Deep Teal** | `#0D3D3A` | Primary brand color. Headlines, hero background, deep sections |
| **Q Gold / Amber** | `#D4A03A` | Primary accent. CTAs, icon fills, hover states, underlines |
| **Q Cream / Off-White** | `#F7F3EC` | Default page background. Warm, not clinical white |

### Secondary Colors

| Name | Hex | Usage |
|:---|:---|:---|
| **Q Forest** | `#1A4A3A` | Service cards background, dark panels |
| **Q Sage Light** | `#C8E0D2` | Soft section fills, badge backgrounds |
| **Q Terracotta** | `#C26840` | Warm accent for "human" sections (Why Choose Us, testimonials) |
| **Q Near-Black** | `#111B17` | Dark hero, footer background, property gallery sections |
| **Pure White** | `#FFFFFF` | Text on dark backgrounds, nav overlays |

### Accent / CTA Color

| Name | Hex | Usage |
|:---|:---|:---|
| **Q Spark (Lime-adjacent)** | `#C8E84A` | Optional high-energy accent. Use sparingly — hero CTA button, icon hover only |

> **Design Rule**: Primary palette is Teal + Gold + Cream. Terracotta is used for warmth sections only. Spark is used for maximum-attention moments only (1 per page maximum).

### Section Color-Blocking System
*(Inspired by the Dribbble design's rotating section palettes)*

| Section | Background | Text | Accent |
|:---|:---|:---|:---|
| Nav / Header | `rgba(255,255,255,0.90)` glassmorphism pill | `#0D3D3A` | `#D4A03A` |
| Hero | Full-bleed photo | White text | `#D4A03A` CTA |
| Services Grid | `#C8E0D2` (sage light) | `#0D3D3A` | `#1A4A3A` cards |
| Why Choose Q | `#C26840` (terracotta) | White | White icons |
| Stats / Numbers | `#0D3D3A` (deep teal) | White | `#D4A03A` numbers |
| Properties / Gallery | `#111B17` (near-black) | White | `#D4A03A` |
| Testimonials | `#F7F3EC` (cream) | `#0D3D3A` | `#D4A03A` |
| Footer | `#C8E84A` (spark) | `#111B17` | `#0D3D3A` |

---

## Typography System

### Font Pairings

#### Option A — Editorial Authority (Recommended)
| Role | Font | Style | Notes |
|:---|:---|:---|:---|
| **Display / Hero** | `Clash Display` | Black, 800 weight | Ultra-bold, condensed. Free on Fontshare. The "MORTGAGE" font energy. |
| **Headings H2–H3** | `Clash Display` | Bold, 700 | Consistent display family |
| **Body / Subheadings** | `Outfit` | Regular 400, Medium 500 | Clean modern geometric sans. Google Fonts. |
| **Small Labels / Nav** | `Outfit` | SemiBold 600, all-caps, letter-spacing 0.1em | Airy, editorial |

#### Option B — Warm Authority (Alternative)
| Role | Font | Style | Notes |
|:---|:---|:---|:---|
| **Display / Hero** | `Anton` | Regular (inherently bold) | Free on Google Fonts. Ultra-condensed headline impact. |
| **Headings H2–H3** | `Cormorant Garamond` | Bold Italic | Adds warmth and prestige. Pairs beautifully. |
| **Body** | `Inter` | Regular | Industry standard clean sans. |

> **Recommendation**: Use Option A for a more modern, distinct identity.

### Type Scale

| Level | Size (Desktop) | Weight | Case |
|:---|:---|:---|:---|
| Hero H1 | `80–120px` | 800 (Black) | ALL CAPS |
| Section H2 | `48–64px` | 700 (Bold) | ALL CAPS |
| Sub-heading H3 | `28–36px` | 600 | Title Case |
| Body | `16–18px` | 400 | Sentence case |
| Caption / Labels | `12–14px` | 600 | ALL CAPS + letter spacing |
| CTA Buttons | `14–16px` | 600 | ALL CAPS or Title Case |

### Typographic Wallpaper Rule
*(From the Dribbble footer design)*
- The word **"MORTGAGE BY Q"** or simply **"BY Q"** should appear at massive scale (full-width display size) in the footer section
- Color: `#0D3D3A` on `#C8E84A` spark background — or white on near-black
- This is the **signature brand moment** on every page

---

## Logo System

### Concept Direction

```
◆  MORTGAGE BY Q
```

**Symbol Options** (pick one direction):
1. **◆ Diamond/Rhombus** — geometric precision, modern, symmetrical. Works as a standalone mark.
2. **Q-mark** — stylized letter Q with a unique serif tail or geometric cut. The Q itself becomes the icon.
3. **⬡ Hexagon with Q inside** — structured, systematic, premium.

**Recommended Direction**: A custom-drawn **Q lettermark** where the tail of the Q is elongated like an arrow or a checkmark — implying progress, forward motion, and completion. The wordmark below reads `MORTGAGE BY Q` in Clash Display all-caps.

### Logo Lockups

| Lockup | Usage |
|:---|:---|
| **Horizontal**: `[Symbol] MORTGAGE BY Q` | Main website nav, email header |
| **Stacked**: Symbol centered above `MORTGAGE BY Q` | Square thumbnails, social profile, app icon |
| **Symbol only**: Just the Q mark | Favicon, watermark, small brand moments |
| **Wordmark only**: `MORTGAGE BY Q` in Clash Display | Hero text, footer typographic wallpaper |

### Color Variants

| Variant | Symbol | Wordmark | Background |
|:---|:---|:---|:---|
| Primary | `#D4A03A` Gold | `#0D3D3A` Teal | `#F7F3EC` Cream |
| Reversed | `#D4A03A` Gold | `#FFFFFF` White | `#0D3D3A` Teal |
| Dark | `#0D3D3A` Teal | `#0D3D3A` Teal | `#C8E84A` Spark |
| Monochrome | `#111B17` | `#111B17` | White |

---

## UI Component Style Guide

### Navigation Bar
- **Style**: Floating glassmorphism pill — `rgba(255,255,255,0.88)` with `backdrop-filter: blur(20px)`
- **Border**: 1px solid `rgba(255,255,255,0.4)`
- **Shadow**: `0 4px 30px rgba(0,0,0,0.08)`
- **Logo**: Left-aligned, `#0D3D3A`
- **Nav links**: `Outfit` SemiBold, `#111B17`, small-caps, letter-spacing
- **CTA**: Dark pill button `#0D3D3A` background, white text — "Get My Rate"

### CTA Buttons

| Type | Background | Text | Border-Radius | Notes |
|:---|:---|:---|:---|:---|
| **Primary** | `#D4A03A` Gold | `#111B17` Dark | `9999px` (full pill) | Arrow icon right |
| **Secondary** | `#0D3D3A` Teal | White | `9999px` (full pill) | Arrow icon right |
| **Ghost** | Transparent | `#0D3D3A` | `9999px` | `2px solid #0D3D3A` border |
| **Dark** | `#111B17` | White | `9999px` | Used on light backgrounds |

**CTA Rule**: All primary CTAs should include a `→` or circular arrow icon inline. Inspired by the Dribbble avatar + arrow cluster treatment.

### Service Cards
- **Background**: `#1A4A3A` (deep forest green)
- **Border-radius**: `16px`
- **Icon**: Circular `#D4A03A` or `#C8E84A` background, `#0D3D3A` icon inside, `56px` diameter
- **Title**: `Outfit` SemiBold, White, small-caps
- **Body**: `Outfit` Regular, `rgba(255,255,255,0.65)`, `14px`
- **Footer link**: `"Learn more →"` in `#C8E84A` Spark
- **Hover**: Subtle upward translate + `box-shadow: 0 20px 40px rgba(0,0,0,0.3)`

### Stat Counters (Number Display)
- Large display number: `Clash Display` 800 weight, `#D4A03A` Gold
- Label below: `Outfit` Medium, White, small-caps
- Background section: `#0D3D3A` Deep Teal
- Animate on scroll (counter from 0 to final number)

### Avatar Cluster + CTA (Inline Hero Element)
- 3–4 small circular headshots arranged in an overlapping row (each 40px)
- Beside them: a gold pill with `→` icon — the "Get Started" action
- This replaces the traditional large hero CTA button. Ultra-modern.
- Text beside: `"Join 500+ families who found their home with Q"`

---

## Photography Direction

### Style Guide
| Dimension | Direction |
|:---|:---|
| **Subject** | Real-looking people. Families, couples, first-timers. Warm and aspirational — not stock photo perfect |
| **Tone** | Warm amber/golden hour tones. Naturally lit. Never cold or clinical |
| **Settings** | Homes, outdoor porches, kitchen tables, signing moments, keys in hands |
| **Composition** | Subjects can break out of rectangular frames (editorial cut-out style, inspired by Movement Mortgage) |
| **Diversity** | Inclusive — reflect Q's non-traditional borrower ICP (multi-ethnic, multi-generational) |
| **Property Photos** | Modern, architectural, aspirational homes — used on dark background gallery sections |

### What to Avoid
- Generic blue-sky stock photo couples
- Overly posed "banker handshake" imagery
- Any photo that looks like it came from Shutterstock's first page for "mortgage"

---

## Homepage Section Blueprint

| # | Section | Background | Key Elements |
|:---|:---|:---|:---|
| 1 | **Nav** | Glassmorphism pill | Logo + links + "Get My Rate" pill button |
| 2 | **Hero** | Full-bleed lifestyle photo | H1 "YOUR TRUSTED MORTGAGE PARTNER IN CALIFORNIA" + avatar cluster CTA |
| 3 | **Trust Bar** | `#F7F3EC` cream | Lender logos: "150+ lenders" + review stars + NMLS badge |
| 4 | **Services** | `#C8E0D2` sage | 4 dark cards: Purchase · Refinance · HELOC · VA Loans |
| 5 | **Stats** | `#0D3D3A` teal | 3 animated counters: 150+ Lenders · $X Saved Avg · 5-Star Rating |
| 6 | **Why Choose Q** | `#C26840` terracotta | Family photo + 3 value props: Expert Guidance · Customized · Competitive |
| 7 | **How It Works** | `#F7F3EC` cream | 3-step process: Apply → We Shop → You Close |
| 8 | **Property Gallery** | `#111B17` near-black | Staggered cards of modern homes — aspirational |
| 9 | **Testimonials** | `#F7F3EC` cream | Star reviews, client photos, key outcome stats |
| 10 | **Rate Calculator** | `#0D3D3A` teal | Interactive slider: loan amount → monthly payment estimate |
| 11 | **CTA Banner** | `#D4A03A` gold | "Ready to Find Your Rate?" + large CTA button |
| 12 | **Footer** | `#C8E84A` spark lime | Massive `MORTGAGE BY Q` typographic wallpaper + nav links + copyright |

---

## Voice & Tone Guidelines

| Situation | Tone | Example Copy |
|:---|:---|:---|
| Hero Headline | Bold, direct, empowering | "YOUR TRUSTED PARTNER IN HOME FINANCING" |
| Section Intro | Warm, clear, no jargon | "We shop 150+ lenders so you get the best rate — not the first one." |
| CTA | Action-forward, benefit-led | "Get My Rate Now" / "Find My Loan" / "Start My Application" |
| Value Props | Confident, specific | "Expert Guidance. Customized Solutions. Competitive Rates." |
| Error / Friction | Reassuring, human | "We'll handle the hard part. Just tell us a bit about your situation." |
| Social Proof | Authentic, outcome-focused | "Maria got approved when three other lenders said no." |

### Words to Use
`trusted` · `clear` · `your` · `real` · `fast` · `human` · `expert` · `custom`

### Words to Avoid
`innovative` · `solutions` · `utilize` · `synergy` · `leverage` · `seamless journey`

---

## Brand Differentiation Summary

| What Most Competitors Do | What Mortgage by Q Does |
|:---|:---|
| Generic blue/white palette | Teal + Gold + Cream with bold section color-blocking |
| Big rectangular hero buttons | Avatar cluster + pill arrow CTA |
| Stock photos of happy couples | Warm, real, aspirational lifestyle photography |
| Text-heavy service lists | Dark card grid with bold icons and minimal copy |
| Plain footer with links | Full-width typographic wallpaper brand statement |
| "Apply Now" everywhere | Guided "Get My Rate" language — lower friction |
