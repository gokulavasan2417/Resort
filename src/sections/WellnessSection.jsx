import React from 'react';
import { motion } from 'framer-motion';
import { wellnessData } from '../data/resortData';
import { Sparkles, Sun, Droplets, Trees, Heart, ArrowRight } from 'lucide-react';

export default function WellnessSection({ onInquireWellness }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles size={16} className="text-gold-600" />;
      case 'Sun':
        return <Sun size={16} className="text-gold-600" />;
      case 'Droplets':
        return <Droplets size={16} className="text-gold-600" />;
      case 'Trees':
        return <Trees size={16} className="text-gold-600" />;
      default:
        return <Sparkles size={16} className="text-gold-600" />;
    }
  };

  return (
    <section id="wellness" className="py-24 sm:py-32 bg-cream-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-700 block"
          >
            {wellnessData.subtitle}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="mt-3 font-serif text-3xl sm:text-5xl text-forest-900 leading-tight"
          >
            {wellnessData.headline}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-4 text-xs sm:text-sm md:text-base text-sand-700 font-light max-w-2xl mx-auto leading-relaxed"
          >
            {wellnessData.description}
          </motion.p>
        </div>

        {/* Content Layout */}
        <div className="mt-16 sm:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Wellness Services List */}
          <div className="lg:col-span-6 space-y-4">
            {wellnessData.services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="p-6 rounded-2xl bg-white border border-sand-200/80 hover:border-gold-400/50 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-sand-100 flex items-center justify-center">
                      {getIcon(service.icon)}
                    </div>
                    <h3 className="font-serif text-lg text-forest-900">{service.title}</h3>
                  </div>
                  <span className="text-[11px] uppercase tracking-wider text-sand-500 font-medium px-2.5 py-1 rounded-full bg-sand-100">
                    {service.duration}
                  </span>
                </div>
                <p className="mt-3 text-xs sm:text-sm text-sand-700 font-light leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}

            <div className="pt-2">
              <button
                onClick={onInquireWellness}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-forest-900 hover:text-gold-700 transition-colors"
              >
                <span>Consult with Wellness Concierge</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Right Serene Image Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-6 rounded-3xl overflow-hidden shadow-2xl relative aspect-[4/5] bg-forest-900/10 border border-sand-300"
          >
            <img
              src={wellnessData.image}
              alt="Happening Villa Wellness Sanctuary and Botanical Spa"
              loading="lazy"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-cream-50">
              <span className="text-[10px] uppercase tracking-widest text-gold-300">Daily Sanctuary Sessions</span>
              <p className="font-serif text-xl sm:text-2xl text-white font-light">Morning Valley Yoga & Dusk Forest Therapy</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
