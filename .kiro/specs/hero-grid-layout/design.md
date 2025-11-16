# Design Document: Hero Grid Layout

## Overview

This design restructures the HeroSection component to display student images in a grid format beside the main hero content. The layout will use CSS Grid to create a responsive two-column design on desktop (text left, images right) that stacks vertically on mobile devices. The separate StudentHeroImages component will be removed from the page layout to eliminate duplication.

## Architecture

### Component Structure

```
HeroSection (Modified)
├── Background Elements (gradient orbs, patterns)
├── Grid Container (responsive 1-col mobile, 2-col desktop)
│   ├── Left Column: Hero Content
│   │   ├── Trust Badge ("Trusted by 200+ Students")
│   │   ├── Headline
│   │   ├── Description
│   │   ├── CTA Buttons
│   │   └── Stats Section (3 cards)
│   └── Right Column: Student Image Grid
│       └── 4 Image Cards (2x2 grid)
│           ├── Image
│           ├── Hover Overlay
│           └── Caption/Subtitle
└── Features Section (below grid, full width)
```

### Layout Strategy

- **Desktop (≥768px)**: Two-column grid with 60/40 split (text/images)
- **Mobile (<768px)**: Single column, stacked layout (text above, images below)
- **Image Grid**: 2x2 grid within the right column, consistent on all screen sizes

## Components and Interfaces

### Modified HeroSection Component

**File**: `app/components/HeroSection.tsx`

**Key Changes**:
1. Add student image data array within component
2. Wrap main content in responsive grid container
3. Create left column for existing hero content
4. Create right column with 2x2 image grid
5. Maintain all existing state and authentication logic

**Props**: None (existing component has no props)

**State**:
- `isLoggedIn`: boolean (existing)

**Image Data Structure**:
```typescript
interface StudentImage {
  src: string
  alt: string
  caption: string
  subtitle: string
  gradientFrom: string
  gradientTo: string
}
```

### Page Layout Update

**File**: `app/page.tsx`

**Changes**:
- Remove `<StudentHeroImages />` component import and usage
- Keep `<HeroSection />` as the primary hero section
- Maintain existing component order for other sections

## Data Models

### Student Images Array

```typescript
const studentImages: StudentImage[] = [
  {
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=500&fit=crop",
    alt: "Students collaborating",
    caption: "Collaborative Learning",
    subtitle: "Group Study Sessions",
    gradientFrom: "blue-100",
    gradientTo: "blue-200"
  },
  {
    src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=500&fit=crop",
    alt: "Student preparing",
    caption: "Focused Preparation",
    subtitle: "Individual Study",
    gradientFrom: "purple-100",
    gradientTo: "purple-200"
  },
  {
    src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=500&fit=crop",
    alt: "Campus life",
    caption: "Campus Excellence",
    subtitle: "Academic Success",
    gradientFrom: "green-100",
    gradientTo: "green-200"
  },
  {
    src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=500&fit=crop",
    alt: "Student achievement",
    caption: "Career Success",
    subtitle: "Placement Achievement",
    gradientFrom: "orange-100",
    gradientTo: "orange-200"
  }
]
```

## Responsive Design Specifications

### Desktop Layout (≥768px)

```css
Grid Container:
- display: grid
- grid-template-columns: 1.2fr 0.8fr
- gap: 3rem (48px)
- align-items: center

Left Column:
- text-align: left (change from center)
- max-width: none

Right Column:
- 2x2 grid of images
- gap: 1rem (16px)
```

### Mobile Layout (<768px)

```css
Grid Container:
- display: grid
- grid-template-columns: 1fr
- gap: 2rem (32px)

Left Column:
- text-align: center (maintain existing)
- order: 1

Right Column:
- order: 2
- 2x2 grid maintained
- gap: 0.75rem (12px)
```

### Image Card Specifications

```css
Image Card:
- aspect-ratio: 4/5
- border-radius: 1rem (16px)
- overflow: hidden
- position: relative
- box-shadow: lg
- hover:shadow-2xl
- transition: all 300ms

Hover Overlay:
- position: absolute
- inset: 0
- background: gradient from black/60 to transparent
- opacity: 0 (default), 1 (hover)
- transition: opacity 300ms

Caption Container:
- position: absolute
- bottom: 1rem
- left/right: 1rem
- color: white
- font-weight: bold (caption)
- font-size: sm (caption), xs (subtitle)
```

## Error Handling

### Image Loading

- Use `alt` text for accessibility
- Fallback gradient background if image fails to load
- No explicit error handling needed (browser handles gracefully)

### Responsive Breakpoints

- Use Tailwind's `md:` prefix for 768px breakpoint
- Mobile-first approach (default styles for mobile)
- Test on common viewport sizes: 375px, 768px, 1024px, 1440px

## Testing Strategy

### Visual Testing

1. **Desktop Layout**
   - Verify two-column grid displays correctly
   - Check text alignment (left-aligned on desktop)
   - Verify image grid displays as 2x2
   - Test hover effects on images

2. **Mobile Layout**
   - Verify single-column stacked layout
   - Check text alignment (center-aligned on mobile)
   - Verify images appear below content
   - Test touch interactions on images

3. **Responsive Transitions**
   - Test layout changes at 768px breakpoint
   - Verify smooth transitions between layouts
   - Check for layout shifts or content jumping

### Functional Testing

1. **Authentication State**
   - Verify correct buttons display when logged out
   - Verify correct buttons display when logged in
   - Test button click handlers

2. **Navigation**
   - Test all CTA button links
   - Verify routing works correctly

### Cross-Browser Testing

- Chrome, Firefox, Safari, Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

### Accessibility Testing

- Verify all images have descriptive alt text
- Check keyboard navigation
- Test with screen readers
- Verify color contrast ratios

## Implementation Notes

### Tailwind CSS Classes

Key classes to use:
- `grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr]` - Responsive grid
- `gap-8 md:gap-12` - Responsive gap
- `text-center md:text-left` - Responsive text alignment
- `grid grid-cols-2 gap-3 md:gap-4` - Image grid
- `aspect-[4/5]` - Image aspect ratio
- `group` and `group-hover:` - Hover effects

### Performance Considerations

- Images are loaded from Unsplash CDN (already optimized)
- Use appropriate image sizes (400x500)
- Lazy loading handled by browser
- No additional JavaScript needed for grid layout

### Cleanup Tasks

1. Remove `StudentHeroImages` component file (optional, can keep for reference)
2. Remove import from `app/page.tsx`
3. Remove component usage from `app/page.tsx`
4. Verify no other pages use `StudentHeroImages`

## Design Decisions and Rationales

### Why 60/40 Split?

The 1.2fr/0.8fr grid split gives more space to the text content (which is the primary message) while still providing substantial visual impact from the images. This ratio ensures the headline and CTA buttons remain prominent.

### Why 2x2 Image Grid?

Four images provide enough visual variety without overwhelming the hero section. A 2x2 grid is compact, balanced, and works well in the allocated space. It's also easy to scan and doesn't require scrolling.

### Why Keep Stats Below?

The stats section (100+ Experiences, 25+ Companies, 200+ Students) works better as a full-width element below the main hero content. This maintains visual hierarchy and prevents the right column from becoming too crowded.

### Why Remove StudentHeroImages Component?

Having two separate sections with student images creates redundancy and increases page length unnecessarily. Integrating the images directly into the hero section creates a more cohesive, modern design that follows current web design trends.

### Why Mobile-First Approach?

Starting with mobile styles and adding desktop enhancements ensures the design works on all devices and follows responsive design best practices. It also aligns with Tailwind CSS's mobile-first philosophy.
