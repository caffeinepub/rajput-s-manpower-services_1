# Rajput's Manpower Services

## Current State
HomePage.tsx has: top utility bar, sticky header, hero section, services section, about section, testimonials section, contact/quote form, footer.

## Requested Changes (Diff)

### Add
- **RMS Company Banner**: A full-width visual banner below the header (above the hero) featuring the generated banner image `/assets/generated/rms-banner.dim_1200x400.jpg` with RMS branding overlay.
- **Our Work Section**: A new section after the About section with a grid of 4 work photos showcasing company expertise:
  - `/assets/generated/work-construction.dim_800x500.jpg` - Industrial Staffing
  - `/assets/generated/work-recruitment.dim_800x500.jpg` - Recruitment & Placement
  - `/assets/generated/work-industrial.dim_800x500.jpg` - Industrial Operations
  - `/assets/generated/work-security.dim_800x500.jpg` - Security Services

### Modify
- Nothing else changes.

### Remove
- Nothing.

## Implementation Plan
1. Add RMS banner section just below the header (before the hero section) using the generated banner image.
2. Add "Our Work" section after the About section, with a 2x2 or 4-column photo grid, each card showing the image with a caption/label overlay.
