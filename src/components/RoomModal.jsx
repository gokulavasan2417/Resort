import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Users, Bed, Maximize2, ShieldCheck, Calendar, ChevronRight } from 'lucide-react';

export default function RoomModal({ room, onClose, onBookRoom }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!room) return null;

  const allImages = [room.image, ...(room.secondaryImages || [])];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-charcoal-950/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-cream-50 rounded-2xl shadow-2xl overflow-hidden border border-sand-300 z-10 max-h-[92vh] flex flex-col"
        >
          {/* Header Close Button */}
          <button
            onClick={onClose}
            aria-label="Close details"
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-charcoal-950/70 hover:bg-charcoal-950 text-white transition-colors backdrop-blur-md"
          >
            <X size={18} />
          </button>

          {/* Scrollable Content Container */}
          <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
            {/* Image Gallery Showcase */}
            <div>
              <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-xl overflow-hidden bg-forest-900/10">
                <img
                  src={allImages[activeImageIndex]}
                  alt={room.name}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase bg-charcoal-950/80 text-gold-300 border border-gold-400/20 backdrop-blur-md">
                    {room.category}
                  </span>
                </div>
              </div>

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex gap-2 sm:gap-3 mt-3">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 sm:w-24 aspect-[16/10] rounded-lg overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx
                          ? 'border-gold-500 scale-105 shadow-md'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Room Info Header */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-sand-300/60 pb-5">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl text-forest-900">
                  {room.name}
                </h2>
                <p className="text-sm text-gold-700 italic font-serif mt-1">
                  {room.tagline}
                </p>
              </div>

              {room.startingPrice && (
                <div className="sm:text-right">
                  <div className="flex items-baseline sm:justify-end gap-1.5">
                    <span className="text-xs uppercase tracking-wider text-sand-600">Starting at</span>
                    <span className="text-2xl sm:text-3xl font-serif font-bold text-forest-900">
                      {room.startingPrice}
                    </span>
                    <span className="text-xs text-sand-600">/ night</span>
                  </div>
                  <p className="text-[11px] text-sand-500 mt-0.5">
                    {room.priceNote}
                  </p>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-sand-800 leading-relaxed">
              {room.description}
            </p>

            {/* Specifications */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-sand-100/60 border border-sand-200">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-forest-900 text-gold-400">
                  <Users size={16} />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-sand-600">Capacity</span>
                  <span className="block text-xs sm:text-sm font-medium text-forest-900">{room.capacity}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-forest-900 text-gold-400">
                  <Bed size={16} />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-sand-600">Bedding</span>
                  <span className="block text-xs sm:text-sm font-medium text-forest-900">{room.bedConfiguration}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-forest-900 text-gold-400">
                  <Maximize2 size={16} />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-sand-600">Living Area</span>
                  <span className="block text-xs sm:text-sm font-medium text-forest-900">{room.roomSize}</span>
                </div>
              </div>
            </div>

            {/* Inclusions & Curated Amenities */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-forest-900 mb-3 flex items-center gap-2">
                <ShieldCheck size={14} className="text-gold-600" />
                <span>Sanctuary Inclusions & Features</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {room.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-sand-800">
                    <Check size={15} className="text-gold-600 mt-0.5 flex-shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Modal CTA */}
            <div className="pt-4 border-t border-sand-300/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-sand-600">
                * Rates are indicative and depend on dates, seasonal demand, and inclusions.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onBookRoom(room);
                }}
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-forest-900 hover:bg-forest-800 text-gold-300 hover:text-white font-medium text-xs uppercase tracking-widest transition-all duration-300 shadow-md flex items-center justify-center gap-2"
              >
                <Calendar size={14} />
                <span>Reserve {room.category}</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
