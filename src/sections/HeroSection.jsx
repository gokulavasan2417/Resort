import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Compass, ArrowDown } from 'lucide-react';

export const introSlides = [
  {
    id: 1,
    region: 'East Coast Sanctuary - Chennai',
    titleLine1: 'HAPPENING',
    titleLine2: 'VILLA RETREAT',
    cardTitle: 'HAPPENING VILLA',
    description:
      'Set within lush canopy forests, Happening Villa is a cultural and nature sanctuary offering mineral pools, mindful contemplation, and restorative serenity.',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2400&q=85',
  },
  {
    id: 2,
    region: 'Private Bamboo Grove',
    titleLine1: 'CELESTIAL',
    titleLine2: 'INFINITY VILLA',
    cardTitle: 'CELESTIAL INFINITY',
    description:
      'A detached architectural residence featuring heated quartzite plunge pool, stone fireplace, cliffside rain shower, and 24-hour dedicated butler care.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2400&q=85',
  },
  {
    id: 3,
    region: 'Panoramic Alpine Ridge',
    titleLine1: 'VERDANT',
    titleLine2: 'HORIZON SUITE',
    cardTitle: 'VERDANT HORIZON',
    description:
      'Expansive living spaces framing unobstructed sunset horizons over mist-draped peaks, complete with Italian soaking tub and private cantilevered terrace.',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=2400&q=85',
  },
  {
    id: 4,
    region: 'Geothermal Waterscape',
    titleLine1: 'OASIS OF',
    titleLine2: 'STILLNESS POOL',
    cardTitle: 'OASIS OF STILLNESS',
    description:
      'Tiered quartzite infinity waters gently regulated to 28°C across all seasons. Floating teak daybeds, botanical infusions, and mineral hydrotherapy.',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2400&q=85',
  },
  {
    id: 5,
    region: 'Multi-Generation Heritage',
    titleLine1: 'SILVER FIR',
    titleLine2: 'FAMILY HAVEN',
    cardTitle: 'SILVER FIR HAVEN',
    description:
      'A two-story timber haven with private wildflower gardens, night-sky telescope, open hearth, and Young Rangers forest discovery walks.',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=2400&q=85',
  },
];

export default function HeroSection({ onExplore, onBook }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const heroRef = useRef(null);
  const wheelLockRef = useRef(false);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);

  const total = introSlides.length;

  const goToSlide = useCallback((index) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  }, [isAnimating]);

  const handleNext = useCallback(() => {
    const nextIdx = (currentIndex + 1) % total;
    goToSlide(nextIdx);
  }, [currentIndex, total, goToSlide]);

  const handlePrev = useCallback(() => {
    const prevIdx = (currentIndex - 1 + total) % total;
    goToSlide(prevIdx);
  }, [currentIndex, total, goToSlide]);

  // Touch Swipe
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const deltaY = touchStartY.current - e.changedTouches[0].clientY;
    const deltaX = touchStartX.current - e.changedTouches[0].clientX;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX > 0) handleNext();
      else handlePrev();
    }
  };

  const current = introSlides[currentIndex];

  // 3 preview cards on right (Intro.mp4 style)
  const upcomingCards = [];
  for (let i = 1; i <= 3; i++) {
    const cardIdx = (currentIndex + i) % total;
    upcomingCards.push({
      ...introSlides[cardIdx],
      originalIndex: cardIdx,
    });
  }

  return (
    <section
      id="hero"
      ref={heroRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-screen w-full overflow-hidden bg-charcoal-950 select-none flex flex-col justify-between"
    >
      {/* Background Image with Smooth Crossfade & Ken-Burns Zoom */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={`bg-${current.id}`}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{
            opacity: { duration: 0.85, ease: [0.25, 1, 0.5, 1] },
            scale: { duration: 7, ease: 'easeOut' },
          }}
          className="absolute inset-0 w-full h-full transform-gpu will-change-transform"
        >
          <img
            src={current.image}
            alt={`${current.titleLine1} ${current.titleLine2}`}
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* Cinematic Vignette Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/90 via-charcoal-950/45 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-transparent to-charcoal-950/50 pointer-events-none" />

      {/* Content Layout */}
      <div className="relative z-10 w-full h-full max-w-[1700px] mx-auto px-6 sm:px-12 lg:px-20 flex flex-col justify-between pt-28 pb-10 flex-1">
        
        {/* Middle Container */}
        <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6">
          
          {/* Left Column: Bold Condensed Typography */}
          <div className="lg:col-span-6 xl:col-span-5 pr-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${current.id}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-4 sm:space-y-5"
              >
                {/* Region / Category Subtitle */}
                <p className="text-xs sm:text-sm font-sans font-medium tracking-widest text-cream-100 uppercase">
                  {current.region}
                </p>

                {/* Massive Bold Headline in 2 lines */}
                <div className="font-oswald text-5xl sm:text-7xl md:text-8xl lg:text-[88px] xl:text-[96px] font-bold text-white uppercase tracking-tight leading-[0.88] drop-shadow-md">
                  <div>{current.titleLine1}</div>
                  <div>{current.titleLine2}</div>
                </div>

                {/* Narrative Description */}
                <p className="text-xs sm:text-sm md:text-base text-cream-100/85 font-light leading-relaxed max-w-lg tracking-normal">
                  {current.description}
                </p>

                {/* Pill Buttons: DISCOVER LOCATION + RESERVE */}
                <div className="pt-3 flex items-center gap-4">
                  <button
                    onClick={onExplore}
                    className="group inline-flex items-center gap-3 px-6 sm:px-7 py-3 rounded-full bg-charcoal-950/40 hover:bg-white text-white hover:text-charcoal-950 border border-white/40 hover:border-white backdrop-blur-md text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-xl active:scale-95"
                  >
                    <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center">
                      <Compass size={12} className="group-hover:rotate-45 transition-transform duration-500" />
                    </span>
                    <span>DISCOVER LOCATION</span>
                  </button>

                  <button
                    onClick={onBook}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold-500 hover:bg-gold-400 text-charcoal-950 text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-lg shadow-gold-500/25 active:scale-95"
                  >
                    <span className="font-serif font-bold text-sm leading-none">₹</span>
                    <span>BOOK STAY</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Floating Cards Carousel */}
          <div className="hidden md:flex lg:col-span-6 xl:col-span-7 justify-end items-center overflow-visible pl-4">
            <div className="flex items-center gap-4 sm:gap-5">
              {upcomingCards.map((card, idx) => (
                <motion.div
                  key={`carousel-card-${card.id}`}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: 'easeOut' }}
                  onClick={() => goToSlide(card.originalIndex)}
                  className="group relative w-44 sm:w-52 md:w-56 lg:w-48 xl:w-56 h-64 sm:h-76 md:h-84 lg:h-76 xl:h-88 rounded-2xl overflow-hidden cursor-pointer shadow-2xl border border-white/25 hover:border-gold-400 transition-all duration-500 hover:-translate-y-2 hover:shadow-gold-500/25 flex-shrink-0"
                >
                  {/* Card Background Image */}
                  <img
                    src={card.image}
                    alt={card.cardTitle}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />

                  {/* Dark Bottom Gradient for text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/30 to-transparent" />

                  {/* Card Labels at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 space-y-1">
                    <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white/80 font-medium truncate">
                      {card.region}
                    </p>
                    <h3 className="font-oswald text-base sm:text-lg font-bold text-white uppercase tracking-tight leading-tight group-hover:text-gold-300 transition-colors">
                      {card.cardTitle}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Controls Bar: Circular Arrows + Amber Progress Line + Big Slide Number */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/10">
          
          {/* Left: Previous & Next Circular Buttons + Progress Bar */}
          <div className="flex items-center gap-4 sm:gap-6">
            
            {/* Circular Navigation Buttons */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={handlePrev}
                aria-label="Previous Slide"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/40 hover:border-gold-400 text-white hover:text-gold-300 hover:bg-white/10 flex items-center justify-center transition-all duration-300 active:scale-95 group"
              >
                <ChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={handleNext}
                aria-label="Next Slide"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/40 hover:border-gold-400 text-white hover:text-gold-300 hover:bg-white/10 flex items-center justify-center transition-all duration-300 active:scale-95 group"
              >
                <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Amber Progress Bar Line */}
            <div className="w-36 sm:w-60 md:w-80 h-[3px] bg-white/20 rounded-full overflow-hidden relative">
              <motion.div
                key={`progress-${currentIndex}`}
                initial={{ width: `${(currentIndex / total) * 100}%` }}
                animate={{ width: `${((currentIndex + 1) / total) * 100}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-amber-500 to-amber-300 shadow-sm shadow-amber-400/50"
              />
            </div>

          </div>

          {/* Right: Big Bold Slide Number */}
          <div className="flex items-baseline">
            <AnimatePresence mode="wait">
              <motion.span
                key={`number-${currentIndex}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="font-oswald text-4xl sm:text-6xl font-bold text-white tracking-tight leading-none"
              >
                {currentIndex + 1}
              </motion.span>
            </AnimatePresence>
            <span className="font-oswald text-xs sm:text-sm text-white/50 ml-1.5 font-light">
              / {total}
            </span>
          </div>

        </div>

      </div>

      {/* Floating Scroll Down to Rooms Indicator */}
      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        onClick={onExplore}
        className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 cursor-pointer text-white/60 hover:text-gold-300 transition-colors pointer-events-auto"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase font-light">Explore Accommodations</span>
        <ArrowDown size={12} className="text-amber-400" />
      </motion.div>
    </section>
  );
}
