import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { galleryImages } from '../data/resortData';
import GalleryLightbox from '../components/GalleryLightbox';
import { Image as ImageIcon, Eye } from 'lucide-react';

export default function GallerySection() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filters = ['All', 'Architecture', 'Accommodation', 'Pool', 'Dining', 'Wellness', 'Landscapes', 'Family'];

  const filteredImages =
    selectedFilter === 'All'
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedFilter);

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
  };

  const handlePrev = () => {
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredImages.length - 1));
  };

  const handleNext = () => {
    setLightboxIndex((prev) => (prev < filteredImages.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="gallery" className="py-24 sm:py-32 bg-cream-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-700"
          >
            <ImageIcon size={13} className="text-gold-600" />
            <span>Visual Anthology</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="mt-3 font-serif text-3xl sm:text-5xl text-forest-900"
          >
            Moments Captured in Stillness
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-3 text-xs sm:text-sm text-sand-700 font-light max-w-xl mx-auto"
          >
            A visual glimpse into our alpine sanctuary, where architecture recedes and nature commands every view.
          </motion.p>
        </div>

        {/* Filter Pills */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-medium transition-all duration-300 ${
                selectedFilter === filter
                  ? 'bg-forest-900 text-gold-300 shadow-md'
                  : 'bg-sand-100 text-charcoal-800 hover:bg-sand-200/80'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Masonry / Editorial Asymmetrical Gallery Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredImages.map((image, idx) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06, duration: 0.5 }}
              onClick={() => handleOpenLightbox(idx)}
              className={`group relative rounded-2xl overflow-hidden bg-forest-900/10 cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 ${
                idx === 0 || idx === 5 ? 'sm:col-span-2 aspect-[16/10]' : 'aspect-square'
              }`}
            >
              <img
                src={image.src}
                alt={image.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Hover overlay with eye icon & details */}
              <div className="absolute inset-0 bg-charcoal-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                <div className="flex justify-between items-start">
                  <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest bg-charcoal-950/80 text-gold-300 border border-gold-400/20 backdrop-blur-md">
                    {image.category}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center">
                    <Eye size={15} />
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-lg text-cream-50 font-medium">{image.title}</h3>
                  <p className="text-xs text-sand-300/90 mt-1 line-clamp-1">{image.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <GalleryLightbox
        images={filteredImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
}
