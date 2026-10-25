import React from 'react';
import { motion } from 'framer-motion';
import { familyData } from '../data/resortData';
import { Heart, Smile, Sparkles, Compass, ArrowRight } from 'lucide-react';

export default function ActivitiesSection({ onInquireFamily }) {
  return (
    <section id="family" className="py-24 sm:py-32 bg-cream-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-700 block"
          >
            {familyData.subtitle}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="mt-3 font-serif text-3xl sm:text-5xl text-forest-900 leading-tight"
          >
            {familyData.headline}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-4 text-xs sm:text-sm md:text-base text-sand-700 font-light max-w-2xl mx-auto leading-relaxed"
          >
            {familyData.description}
          </motion.p>
        </div>

        {/* 3 Family Feature Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {familyData.features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.7 }}
              className="group bg-white rounded-2xl overflow-hidden border border-sand-300/60 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex flex-col"
            >
              <div className="relative aspect-[16/11] overflow-hidden bg-forest-900/10">
                <img
                  src={feature.image}
                  alt={feature.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="w-8 h-8 rounded-full bg-charcoal-950/70 backdrop-blur-md flex items-center justify-center text-gold-300 text-xs font-serif">
                    0{idx + 1}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl text-forest-900 group-hover:text-gold-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-sand-700 leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-sand-200 flex items-center text-xs font-medium text-forest-900 group-hover:text-gold-700 transition-colors">
                  <span>Nature Discovery Activity</span>
                  <ArrowRight size={13} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Family CTA Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <button
            onClick={onInquireFamily}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-forest-900 hover:bg-forest-800 text-gold-300 hover:text-white font-medium text-xs uppercase tracking-widest transition-all duration-300 shadow-md"
          >
            <Compass size={14} />
            <span>Explore Family Activities & Packages</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
