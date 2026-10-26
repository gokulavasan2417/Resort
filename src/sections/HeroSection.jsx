import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Compass, ArrowDown, Sparkles } from 'lucide-react';
import { resortInfo } from '../data/resortData';

export const heroSlides = [
  {
    id: 1,
    locationTag: "EAST COAST SANCTUARY • CHENNAI",
    title: "HAPPENING VILLA",
    subtitle: "Where Nature Meets Extraordinary Luxury",
    description:
      "An architectural sanctuary nestled amidst ancient canopy groves and private mineral waters. Reconnect with silence, space, and understated elegance.",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2400&q=85",
    actionText: "EXPLORE SANCTUARY",
    target: "rooms",
  },
  {
    id: 2,
    locationTag: "DETACHED ARCHITECTURAL PAVILION",
    title: "CELESTIAL INFINITY",
    subtitle: "Total Seclusion with Heated Quartzite Plunge",
    description:
      "Perched in a private bamboo grove with outdoor cliffside rain showers, heated infinity plunge pool, and 24-hour dedicated butler service.",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2400&q=85",
    actionText: "DISCOVER VILLA",
    target: "rooms",
  },
  {
    id: 3,
    locationTag: "PANORAMIC ALPINE SUITES",
    title: "VERDANT HORIZON",
    subtitle: "Sweeping Vistas Over Mist-Draped Ridges",
    description:
      "Designed for contemplative quietude. Features an Italian stone soaking tub, fireplace lounge, and sunset-facing cantilevered cedar terrace.",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=2400&q=85",
    actionText: "VIEW SUITE",
    target: "rooms",
  },
  {
    id: 4,
    locationTag: "GEOTHERMAL WATERSCAPE",
    title: "OASIS OF STILLNESS",
    subtitle: "Tiered Heated Quartzite Pools",
    description:
      "Gently heated year-round to 28°C and sculpted from natural quartzite stone. Floating daybeds, botanical infusions, and subterranean hydrotherapy.",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2400&q=85",
    actionText: "DISCOVER WATERS",
    target: "rooms",
  },
  {
    id: 5,
    locationTag: "MULTI-GENERATION SANCTUARY",
    title: "SILVER FIR HAVEN",
    subtitle: "Two-Story Residence for Family Retreats",
    description:
      "A warm timber haven with private wildflower garden, stargazing telescope, artisan hearth, and Young Rangers forest discovery walks.",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=2400&q=85",
    actionText: "EXPLORE FAMILY HAVEN",
    target: "family",
  },
];

export default function HeroSection({ onExplore, onBook }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const isTransitioningRef = useRef(false);
  const heroRef = useRef(null);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);

  const total = heroSlides.length;

  const goToSlide = useCallback((newIndex, dir = 1) => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setDirection(dir);
    setCurrentIndex(newIndex);
    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 700);
  }, []);

  const nextSlide = useCallback(() => {
    const nextIdx = (currentIndex + 1) % total;
    goToSlide(nextIdx, 1);
  }, [currentIndex, total, goToSlide]);

  const prevSlide = useCallback(() => {
    const prevIdx = (currentIndex - 1 + total) % total;
    goToSlide(prevIdx, -1);
  }, [currentIndex, total, goToSlide]);

  // Wheel scroll interaction:
  // Down wheel advances slides. When at last slide, scrolls down to rooms.
  // Up wheel retreats slides.
  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;

    let wheelCooldown = false;

    const handleWheel = (e) => {
      // If user is scrolled down beyond hero, allow normal scroll
      if (window.scrollY > 50) return;

      // Detect strong intent
      if (Math.abs(e.deltaY) < 25) return;

      if (wheelCooldown) return;

      if (e.deltaY > 0) {
        // Scrolling down
        if (currentIndex < total - 1) {
          e.preventDefault();
          wheelCooldown = true;
          nextSlide();
          setTimeout(() => {
            wheelCooldown = false;
          }, 850);
        } else {
          // At the last slide: smoothly let user scroll down into Rooms section
          // (no preventDefault, so browser scrolls down naturally)
        }
      } else if (e.deltaY < 0) {
        // Scrolling up
        if (currentIndex > 0) {
          e.preventDefault();
          wheelCooldown = true;
          prevSlide();
          setTimeout(() => {
            wheelCooldown = false;
          }, 850);
        }
      }
    };

    heroEl.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      heroEl.removeEventListener('wheel', handleWheel);
    };
  }, [currentIndex, total, nextSlide, prevSlide]);

  // Touch Swipe for mobile/tablet
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const deltaY = touchStartY.current - e.changedTouches[0].clientY;
    const deltaX = touchStartX.current - e.changedTouches[0].clientX;

    // Horizontal swipe or vertical swipe when at top
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX > 0) nextSlide();
      else prevSlide();
    } else if (window.scrollY < 20 && Math.abs(deltaY) > 50) {
      if (deltaY > 0 && currentIndex < total - 1) {
        nextSlide();
      } else if (deltaY < 0 && currentIndex > 0) {
        prevSlide();
      }
    }
  };

  // Gentle auto-play timer (pauses when hovering controls/cards)
  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(timer);
  }, [isAutoPlay, nextSlide]);

  const currentSlide = heroSlides[currentIndex];

  // Cards to show in preview carousel (slides after the current one)
  const previewCards = [];
  for (let i = 1; i <= 3; i++) {
    const previewIdx = (currentIndex + i) % total;
    previewCards.push({
      ...heroSlides[previewIdx],
      actualIndex: previewIdx,
    });
  }

  // Handle CTA action
  const handleActionClick = () => {
    const targetSection = currentSlide.target || 'rooms';
    const el = document.getElementById(targetSection);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onExplore();
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
      className="relative h-screen min-h-[680px] max-h-[1080px] w-full overflow-hidden bg-charcoal-950 select-none"
    >
      {/* Background Media with Butter-Smooth Crossfade & Ken-Burns Zoom */}
      <AnimatePresence mode="popLayout" custom={direction}>
        <motion.div
          key={`bg-${currentSlide.id}`}
          custom={direction}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{
            opacity: { duration: 0.9, ease: [0.25, 1, 0.5, 1] },
            scale: { duration: 6, ease: 'easeOut' },
          }}
          className="absolute inset-0 w-full h-full transform-gpu will-change-transform"
        >
          <img
            src={currentSlide.image}
            alt={currentSlide.title}
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* Cinematic Overlays: Soft side vignette for readability + subtle grain & gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/90 via-charcoal-950/50 to-charcoal-950/25 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/95 via-transparent to-charcoal-950/60 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-charcoal-950/70 pointer-events-none" />

      {/* Main Content Layout */}
      <div className="relative z-10 w-full h-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col justify-between pt-28 pb-10">
        
        {/* Top Spacer / Subtle Tag */}
        <div className="flex items-center gap-3">
          <motion.div
            key={`pill-${currentSlide.id}`}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-charcoal-900/60 backdrop-blur-md border border-gold-400/30 text-gold-300 text-[10px] sm:text-xs font-medium tracking-[0.25em] uppercase"
          >
            <Sparkles size={11} className="text-gold-400" />
            <span>{currentSlide.locationTag}</span>
          </motion.div>
        </div>

        {/* Middle: Content on Left + Floating Preview Cards on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end my-auto py-4">
          
          {/* Left Column: Editorial Headline & Narrative */}
          <div className="lg:col-span-7 xl:col-span-6 flex flex-col justify-end">
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${currentSlide.id}`}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-4 sm:space-y-5"
              >
                {/* Large Bold Typography (Matching Intro.mp4 style) */}
                <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl xl:text-8xl text-cream-50 font-normal tracking-tight uppercase leading-[0.95] drop-shadow-lg">
                  {currentSlide.title}
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-base lg:text-lg text-gold-300/90 font-light tracking-wide italic">
                  {currentSlide.subtitle}
                </p>

                {/* Narrative Description */}
                <p className="text-xs sm:text-sm md:text-base text-sand-200/90 font-light max-w-xl leading-relaxed tracking-wide">
                  {currentSlide.description}
                </p>

                {/* Call To Action Buttons */}
                <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-4">
                  {/* Pill CTA button with compass (like Intro.mp4) */}
                  <button
                    onClick={handleActionClick}
                    className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-cream-50 hover:bg-gold-400 text-charcoal-950 text-xs sm:text-sm font-semibold tracking-widest uppercase transition-all duration-300 shadow-xl hover:shadow-gold-500/25 active:scale-95"
                  >
                    <Compass size={16} className="text-charcoal-950 group-hover:rotate-45 transition-transform duration-500" />
                    <span>{currentSlide.actionText}</span>
                  </button>

                  {/* Reserve / Book button */}
                  <button
                    onClick={onBook}
                    className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-gold-500 hover:bg-gold-400 text-charcoal-950 text-xs sm:text-sm font-semibold tracking-widest uppercase transition-all duration-300 shadow-lg shadow-gold-500/20 active:scale-95"
                  >
                    <span className="font-serif font-bold text-sm sm:text-base leading-none">₹</span>
                    <span>Book Stay</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Floating Preview Cards Carousel (Intro.mp4 style) */}
          <div className="hidden md:flex lg:col-span-5 xl:col-span-6 justify-end items-end overflow-visible pl-4">
            <div className="flex items-center gap-4 sm:gap-5">
              {previewCards.map((card, idx) => (
                <motion.div
                  key={`card-${card.id}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: 'easeOut' }}
                  onClick={() => goToSlide(card.actualIndex, 1)}
                  className="group relative w-36 sm:w-44 md:w-48 lg:w-44 xl:w-52 h-56 sm:h-64 lg:h-72 rounded-2xl overflow-hidden cursor-pointer shadow-2xl border border-white/20 hover:border-gold-400 transition-all duration-500 hover:-translate-y-2 hover:shadow-gold-500/20 flex-shrink-0"
                >
                  {/* Card Background Image */}
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />

                  {/* Card Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />

                  {/* Card Badge Counter */}
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-charcoal-950/70 backdrop-blur-md border border-white/10 flex items-center justify-center text-[10px] font-mono text-gold-300 font-semibold">
                    0{card.actualIndex + 1}
                  </div>

                  {/* Card Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 space-y-1">
                    <span className="text-[9px] uppercase tracking-widest text-gold-400 font-medium line-clamp-1">
                      {card.locationTag.split('•')[0]}
                    </span>
                    <h3 className="font-serif text-sm sm:text-base text-cream-50 uppercase font-medium leading-tight group-hover:text-gold-300 transition-colors line-clamp-2">
                      {card.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Navigation Bar: Prev/Next + Progress Line + Slide Number Counter */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/10">
          
          {/* Controls: Prev & Next Arrow Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="w-11 h-11 rounded-full bg-charcoal-900/70 hover:bg-gold-500 border border-white/20 hover:border-gold-400 backdrop-blur-md text-cream-100 hover:text-charcoal-950 flex items-center justify-center transition-all duration-300 active:scale-95 group shadow-lg"
            >
              <ChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="w-11 h-11 rounded-full bg-charcoal-900/70 hover:bg-gold-500 border border-white/20 hover:border-gold-400 backdrop-blur-md text-cream-100 hover:text-charcoal-950 flex items-center justify-center transition-all duration-300 active:scale-95 group shadow-lg"
            >
              <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Center: Glowing Progress Line Bar */}
          <div className="flex-1 max-w-xs sm:max-w-md mx-4">
            <div className="w-full h-[2.5px] bg-white/15 rounded-full overflow-hidden relative">
              <motion.div
                key={`progress-${currentIndex}`}
                initial={{ width: `${(currentIndex / total) * 100}%` }}
                animate={{ width: `${((currentIndex + 1) / total) * 100}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-gold-400 to-gold-200 shadow-sm shadow-gold-400/50"
              />
            </div>
            {/* Dots */}
            <div className="flex justify-between mt-2">
              {heroSlides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => goToSlide(idx, idx > currentIndex ? 1 : -1)}
                  className={`text-[9px] font-mono tracking-wider transition-colors ${
                    idx === currentIndex ? 'text-gold-300 font-bold' : 'text-sand-400/50 hover:text-sand-300'
                  }`}
                >
                  0{idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Big Dynamic Number Counter (Intro.mp4 style) */}
          <div className="flex items-baseline gap-1 text-right">
            <AnimatePresence mode="wait">
              <motion.span
                key={`counter-${currentIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="font-serif text-3xl sm:text-5xl text-cream-50 font-normal leading-none"
              >
                0{currentIndex + 1}
              </motion.span>
            </AnimatePresence>
            <span className="text-xs sm:text-sm font-light text-sand-300/60">
              / 0{total}
            </span>
          </div>

        </div>

      </div>

      {/* Floating "Scroll to explore" down-arrow */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        onClick={onExplore}
        className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 cursor-pointer text-sand-300/70 hover:text-gold-300 transition-colors pointer-events-auto"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase font-light">Scroll To Explore</span>
        <ArrowDown size={13} className="text-gold-400" />
      </motion.div>
    </section>
  );
}
