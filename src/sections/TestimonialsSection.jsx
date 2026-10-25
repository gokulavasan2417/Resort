import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonialsData } from '../data/resortData';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : testimonialsData.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < testimonialsData.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="py-24 sm:py-32 bg-cream-100 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-700 block"
          >
            Guest Impressions
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="mt-3 font-serif text-3xl sm:text-5xl text-forest-900"
          >
            Stories from the Sanctuary
          </motion.h2>
        </div>

        {/* Testimonial Showcase Box */}
        <div className="mt-14 sm:mt-18 relative">
          <div className="relative min-h-[320px] sm:min-h-[280px] p-8 sm:p-14 rounded-3xl bg-white border border-sand-300/70 shadow-xl flex flex-col justify-between">
            <Quote size={40} className="text-gold-400/30 absolute top-8 right-8" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {/* 5 Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(testimonialsData[activeIndex].rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-gold-500 fill-gold-500" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="font-serif text-lg sm:text-2xl text-forest-900 italic font-light leading-relaxed">
                  "{testimonialsData[activeIndex].quote}"
                </p>

                {/* Author Info */}
                <div className="pt-4 border-t border-sand-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-serif text-base text-forest-900 font-medium">
                      {testimonialsData[activeIndex].author}
                    </h4>
                    <span className="text-xs text-sand-600 block">
                      {testimonialsData[activeIndex].location} • Stayed at {testimonialsData[activeIndex].stayedIn}
                    </span>
                  </div>

                  <span className="text-[11px] uppercase tracking-wider text-sand-500 font-mono">
                    {testimonialsData[activeIndex].date}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              aria-label="Previous Testimonial"
              className="p-3 rounded-full bg-white hover:bg-forest-900 text-forest-900 hover:text-white border border-sand-300 shadow-sm transition-all"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-2">
              {testimonialsData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeIndex === idx ? 'w-8 bg-gold-600' : 'w-2 bg-sand-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              aria-label="Next Testimonial"
              className="p-3 rounded-full bg-white hover:bg-forest-900 text-forest-900 hover:text-white border border-sand-300 shadow-sm transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
