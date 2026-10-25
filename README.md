# Aethelgard Sanctuary & Luxury Resort — Premium Website

A cinematic, ultra-luxury resort website built with **React**, **Vite**, **Tailwind CSS**, and **Framer Motion**.

---

## Key Features

1. **Cinematic Opening Video**
   - Fullscreen presentation using the provided video asset (`/videos/Main-3.mp4`).
   - Muted autoplay with `playsInline` for seamless desktop and mobile compatibility.
   - Minimal Skip Intro control and sound toggle.
   - Progress bar indicator and loading states.
   - Graceful fallback for blocked autoplay or media errors.
   - Triggers a smooth Framer Motion transition on `onEnded` without layout shifts or flashes.

2. **Hero & Dynamic Navigation**
   - Transparent navbar that transitions to a blurred glassmorphic header upon scroll.
   - Fullscreen editorial hero section with staggered typography reveals and scroll indicator.
   - Mobile menu drawer with smooth entrance/exit animations.

3. **Curated Resort Accommodations**
   - 4 room categories:
     - **Deluxe Forest Sanctuary** (Deluxe Room)
     - **Verdant Horizon Suite** (Luxury Suite)
     - **The Celestial Infinity Villa** (Private Villa)
     - **Silver Fir Family Residence** (Family Cottage)
   - Interactive `RoomCard` with hover zoom, capacity specs, bed configuration, and pricing.
   - `RoomModal` for high-resolution galleries, amenities breakdown, and direct booking links.

4. **Dedicated Experience Sections**
   - **About Section**: Architectural story, 2,400-acre wilderness reserve, craftsmanship, and holistic restoration.
   - **Pool Section**: Tiered quartzite infinity pool with geothermal regulation (28°C/82°F) and poolside living CTA.
   - **Family & Children**: Forest canopy play, young rangers nature lab, and meadow games.
   - **Dining & Gastronomy**: Meal schedules (Breakfast, Lunch, Dinner), 3 distinct venues, and an interactive sample tasting menu modal.
   - **Wellness & Spa**: Botanical rituals, valley yoga, thermal bath cycles, and Shinrin-yoku forest bathing.
   - **Facilities**: 12 resort amenities with Lucide icons (Wi-Fi, EV Valet, 24/7 Concierge, Helipad, etc.).
   - **Experiences**: Travel-magazine styled cards for starlit dining, foraging expeditions, and kayaking.

5. **Interactive Gallery & Lightbox**
   - Asymmetrical editorial grid filterable by category (Architecture, Accommodation, Pool, Dining, Wellness, Landscapes, Family).
   - Fullscreen lightbox modal supporting Next/Prev navigation, keyboard arrow keys, and Escape-key closing.

6. **Guest Testimonials & Reviews**
   - Carousel of guest impressions with 5-star ratings, guest origins, and stay details.

7. **Validated Booking & Contact Experiences**
   - **Booking Desk**: Interactive date pickers with validation (past dates blocked, check-out must follow check-in, duration calculator, party size, and enquiry confirmation modal).
   - **Guest Liaison & Contact**: Address, coordinates, map view card, FAQ accordion, and full guest enquiry form with input validation and clear confirmation status.

---

## Technology Stack

- **React 18** (`react`, `react-dom`)
- **Vite 6** (`vite`, `@vitejs/plugin-react`)
- **Tailwind CSS 3** (`tailwindcss`, `postcss`, `autoprefixer`)
- **Framer Motion 11** (`framer-motion`)
- **Lucide React** (`lucide-react`)

---

## Local Development & Build

### Install Dependencies
```bash
pnpm install
# or
npm install
```

### Run Development Server
```bash
pnpm run dev
# or
npm run dev
```

The application will be accessible at `http://localhost:3000`.

### Production Build
```bash
pnpm run build
# or
npm run build
```

Build outputs are saved to the `dist/` directory.

### Preview Production Build
```bash
pnpm run preview
# or
npm run preview
```

---

## Configurable Resort Content

All resort content, texts, images, rates, hours, and facilities can be edited in:
`src/data/resortData.js`
