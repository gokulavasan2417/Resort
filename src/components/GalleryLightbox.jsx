import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function GalleryLightbox({ images, currentIndex, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (currentIndex === null || !images || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-charcoal-950/95 backdrop-blur-xl"
        />

        {/* Top Controls */}
        <div className="fixed top-5 left-5 right-5 z-20 flex items-center justify-between text-white pointer-events-none">
          <div className="pointer-events-auto flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-gold-400 font-medium">
              {currentImage.category}
            </span>
            <span className="text-xs text-white/50">•</span>
            <span className="text-xs text-sand-300">
              {currentIndex + 1} / {images.length}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Lightbox"
            className="pointer-events-auto p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Arrow Left */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Previous Image"
          className="fixed left-3 sm:left-6 z-20 p-3 rounded-full bg-charcoal-950/70 hover:bg-gold-500 hover:text-charcoal-950 text-white transition-all backdrop-blur-md border border-white/10"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Navigation Arrow Right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next Image"
          className="fixed right-3 sm:right-6 z-20 p-3 rounded-full bg-charcoal-950/70 hover:bg-gold-500 hover:text-charcoal-950 text-white transition-all backdrop-blur-md border border-white/10"
        >
          <ChevronRight size={24} />
        </button>

        {/* Central Display */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="relative max-w-5xl max-h-[85vh] z-10 flex flex-col items-center"
        >
          <img
            src={currentImage.src}
            alt={currentImage.title}
            className="max-h-[72vh] w-auto max-w-full rounded-xl object-contain shadow-2xl border border-white/10"
          />

          <div className="mt-4 text-center px-4 max-w-2xl">
            <h3 className="font-serif text-lg sm:text-xl text-cream-50 font-normal">
              {currentImage.title}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-sand-300 font-light">
              {currentImage.desc}
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
