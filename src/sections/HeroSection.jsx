import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Calendar, Sparkles, Compass } from 'lucide-react';
import { resortInfo } from '../data/resortData';

export default function HeroSection({ onExplore, onBook }) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Media with Parallax/Zoom */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.5, ease: 'easeOut' }}
          className="w-full h-full"
        >
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2200&q=85"
            alt="Happening Villa Luxury Resort Landscape"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        {/* Cinematic Multilayered Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/45 to-charcoal-950/70" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-charcoal-950/20 to-charcoal-950/80" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16 flex flex-col items-center">
        {/* Top subtle badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-gold-400/30 text-gold-300 text-[11px] uppercase tracking-[0.25em] font-medium"
        >
          <Sparkles size={12} className="text-gold-400" />
          <span>A World of Quiet Splendor</span>
        </motion.div>

        {/* Brand Title */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="mt-6 text-xs sm:text-sm uppercase tracking-[0.4em] text-sand-300 font-light"
        >
          {resortInfo.brandName} • {resortInfo.brandSubtitle}
        </motion.p>

        {/* Editorial Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-cream-50 font-normal tracking-tight leading-[1.1]"
        >
          Where Nature Meets <br className="hidden sm:inline" />
          <span className="italic font-light gold-gradient-text">Extraordinary Luxury.</span>
        </motion.h1>

        {/* Supporting Narrative */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-6 sm:mt-8 max-w-2xl text-sm sm:text-base md:text-lg text-sand-200/90 font-light leading-relaxed tracking-wide"
        >
          Discover an untouched alpine haven where serene forests, geothermal healing waters, and bespoke gastronomic artistry converge. Reconnect with silence, space, and understated elegance.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full sm:w-auto"
        >
          <button
            onClick={onExplore}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-cream-50 hover:bg-gold-300 text-forest-950 text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-xl hover:shadow-gold-500/20"
          >
            <Compass size={15} className="group-hover:rotate-45 transition-transform duration-500" />
            <span>Explore Our Resort</span>
          </button>

          <button
            onClick={onBook}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gold-500 hover:bg-gold-400 text-charcoal-950 text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-xl shadow-gold-500/20"
          >
            <span className="font-serif font-bold text-base leading-none group-hover:scale-110 transition-transform duration-300">₹</span>
            <span>Book Your Stay</span>
          </button>
        </motion.div>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer text-sand-300 hover:text-white transition-colors"
        onClick={onExplore}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase font-light text-sand-300/80">Scroll to Discover</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-5 h-9 rounded-full border border-gold-400/40 flex items-start justify-center p-1.5"
        >
          <div className="w-1 h-2 bg-gold-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
