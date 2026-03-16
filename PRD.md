# PRD - Shadan Jewelry Theme

## Overview
Premium jewelry e-commerce theme for Salla platform, inspired by Luluoro's minimalist luxury aesthetic.

## Brand Identity
- **Name:** شذن (Shadan)
- **Industry:** Fine Jewelry / Luxury Accessories
- **Vibe:** Quiet luxury, timeless elegance, understated sophistication

## Design Direction (Luluoro-inspired)

### Visual Language
- **Color Palette:**
  - Primary: `#1A1A1A` (Rich Black)
  - Secondary: `#F5F5F3` (Warm Off-White)
  - Accent: `#C9A962` (Muted Gold)
  - Text: `#333333` (Soft Black)
  - Muted: `#8A8A8A` (Warm Gray)

- **Typography:**
  - Headings: Elegant serif (Playfair Display or similar)
  - Body: Clean sans-serif (Inter or DM Sans)
  - Arabic: Noto Sans Arabic or Tajawal

- **Spacing:** Generous whitespace, breathing room between elements
- **Imagery:** High-contrast product photography, soft shadows, minimal backgrounds

### Key Effects (from Luluoro)
- Smooth scroll reveal animations
- Subtle hover lift on product cards
- Fade-in on scroll for sections
- Soft image zoom on hover
- Staggered loading for product grids

## Salla Theme Requirements

### Required Files Structure
```
theme/
├── assets/
│   ├── css/
│   │   └── theme.css
│   ├── js/
│   │   └── theme.js
│   └── images/
├── views/
│   ├── index.twig
│   ├── product.twig
│   ├── category.twig
│   ├── cart.twig
│   └── checkout.twig
├── config/
│   └── settings.json
└── theme.json
```

### Salla-Specific Features
- Product cards with quick view
- Variant selectors (size, color)
- Cart drawer/sidebar
- Mobile-responsive navigation
- Search with autocomplete
- Customer account pages

## Pages to Design

1. **Homepage**
   - Hero section with large lifestyle image
   - Featured collections grid
   - New arrivals carousel
   - Brand story section
   - Instagram feed integration

2. **Product Page**
   - Large image gallery with zoom
   - Clean product info layout
   - Size guide modal
   - Related products
   - Customer reviews

3. **Collection/Category Page**
   - Filter sidebar
   - Grid/list view toggle
   - Sort options
   - Pagination

4. **Cart & Checkout**
   - Minimalist cart drawer
   - Streamlined checkout flow
   - Trust badges

## Technical Stack
- Salla Theme Engine (Twig templates)
- Vanilla JavaScript (no heavy frameworks)
- CSS Grid & Flexbox
- CSS custom properties for theming
- Intersection Observer for scroll animations

## Animation Specifications
- **Scroll Reveal:** Elements fade in + translate Y (20px → 0) over 600ms
- **Hover Lift:** Cards lift 4px with subtle shadow increase
- **Image Zoom:** Scale 1.05 over 400ms ease-out
- **Page Transitions:** Fade between pages 300ms

## Deliverables
- [ ] Complete theme folder structure
- [ ] All Twig templates
- [ ] CSS with custom properties
- [ ] JavaScript for interactions
- [ ] Documentation for installation

## Next Steps
1. Create theme.json and config/settings.json
2. Build base CSS with design tokens
3. Create homepage template
4. Add animations and interactions
