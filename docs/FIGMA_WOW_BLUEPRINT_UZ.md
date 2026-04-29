# VioraHub WOW Figma Blueprint (UZ)

## Frame Set
- Desktop: 1440 x Auto
- Tablet: 768 x Auto
- Mobile: 390 x Auto

## Grid
- Desktop container: 1220px, 12 columns, 24 gutter
- Tablet container: 92%, 8 columns
- Mobile container: 100% - 32px, 4 columns

## Design Tokens
- BG: #0A0A0A
- Surface: rgba(255,255,255,0.04)
- Surface Strong: rgba(255,255,255,0.08)
- Border: rgba(255,255,255,0.10)
- Accent: #7C3AED
- Accent 2: #A855F7
- Text: #FFFFFF
- Muted: #B3B3B3

## Typography
- Font: Manrope
- H1: 72/74, Semibold
- H2: 52/54, Semibold
- H3: 30/36, Semibold
- Body L: 20/34
- Body: 16/28
- Meta: 12/18 uppercase

## Components
- Button Primary: gradient #7C3AED -> #A855F7, radius 999
- Button Secondary: transparent glass, border 1px rgba white 0.22
- Card: glass panel + 1px inner highlight + shadow
- Badge: uppercase mini pill, border accent
- KPI block: big number + short label

## Home IA
1. Hero with dual gradient orbs + KPI mini blocks
2. Stats row (4 cards)
3. Services grid (6 cards)
4. Portfolio horizontal strip
5. Why Us 4 cards
6. CTA full width block
7. Premium footer

## Motion
- Page sections: 0->1 opacity + y 20->0
- Card hover: y -8, border accent
- Hero orb float: 10-12s infinite ease in out
- Counter animation: 0 -> value in 1.3s

## Admin Dashboard
- Sticky command bar
- KPI summary cards
- Tabbed content editor
- Publish block + audit log
- Lead pipeline cards

## Figma Build Checklist
- Auto layout only
- Constraints set for responsive
- Components + variants for buttons, cards, inputs, tabs
- Color styles + text styles published
- Developer handoff page with spacing tokens
