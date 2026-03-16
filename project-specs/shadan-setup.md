# Shadan Jewelry Theme - Project Setup

## Project Overview
Premium jewelry e-commerce theme for Salla platform, inspired by Luluoro's minimalist luxury aesthetic.

## Brand
- **Name:** شذن (Shadan)
- **Industry:** Fine Jewelry / Luxury Accessories
- **Vibe:** Quiet luxury, timeless elegance, understated sophistication

## Design Direction (Luluoro-inspired)

### Color Palette
- Primary: `#1A1A1A` (Rich Black)
- Secondary: `#F5F5F3` (Warm Off-White)
- Accent: `#C9A962` (Muted Gold)
- Text: `#333333` (Soft Black)
- Muted: `#8A8A8A` (Warm Gray)

### Typography
- Headings: Playfair Display (elegant serif)
- Body: Inter (clean sans-serif)
- Arabic: Noto Sans Arabic / Tajawal

### Key Effects
- Smooth scroll reveal animations
- Subtle hover lift on product cards
- Fade-in on scroll for sections
- Soft image zoom on hover
- Staggered loading for product grids

## Salla Theme Structure Required
```
theme/
├── assets/
│   ├── css/theme.css
│   ├── js/theme.js
│   └── images/
├── views/
│   ├── index.twig
│   ├── product.twig
│   ├── category.twig
│   ├── cart.twig
│   └── checkout.twig
├── config/settings.json
└── theme.json
```

## Deliverables
1. theme.json - Theme metadata
2. config/settings.json - Theme configuration
3. assets/css/theme.css - Main stylesheet with design tokens
4. assets/js/theme.js - Interactions and animations
5. views/index.twig - Homepage
6. views/product.twig - Product page
7. views/category.twig - Collection page
8. views/cart.twig - Cart drawer
9. views/checkout.twig - Checkout

## Quality Gates
- All pages must be responsive
- Animations must be smooth (60fps)
- Arabic RTL support
- Salla theme validation passed
