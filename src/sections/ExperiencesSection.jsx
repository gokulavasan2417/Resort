import React from 'react';
import { motion } from 'framer-motion';
import { experiencesData } from '../data/resortData';
import { Compass, Sparkles, ArrowRight } from 'lucide-react';

export default function ExperiencesSection({ onBookExperience }) {
  return (
    <section id="experiences" className="py-24 sm:py-32 bg-forest-950 text-cream-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-400"
            >
              <Compass size={13} className="text-gold-400" />
              <span>Curated Highlands Itineraries</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="mt-3 font-serif text-3xl sm:text-5xl text-cream-50"
            >
              Unforgettable Alpine Journeys
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mt-3 text-xs sm:text-sm text-sand-300 max-w-xl font-light"
            >
              From private starlit dining on rocky promontories to guided botanical foraging deep inside old-growth reserves.
            </motion.p>
          </div>

          <button
            onClick={onBookExperience}
            className="px-6 py-3 rounded-full border border-gold-400/40 hover:border-gold-300 text-gold-300 hover:text-white text-xs uppercase tracking-widest font-medium transition-all"
          >
            Custom Itineraries
          </button>
        </div>

        {/* Magazine-style 4 Cards Grid */}
        <div className="mt-14 sm:mt-18 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiencesData.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.7 }}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] flex flex-col justify-end p-6 border border-white/10 hover:border-gold-400/40 transition-all duration-500 shadow-xl"
            >
              {/* Background Image */}
              <img
                src={exp.image}
                alt={exp.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
              />

              {/* Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

              {/* Content */}
              <div className="relative z-10">
                <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold block mb-1">
                  {exp.category}
                </span>
                <h3 className="font-serif text-xl text-cream-50 group-hover:text-gold-200 transition-colors">
                  {exp.title}
                </h3>
                <p className="mt-2 text-xs text-sand-300/80 font-light leading-relaxed line-clamp-3">
                  {exp.description}
                </p>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-sand-400">Exclusive Experience</span>
                  <button
                    onClick={onBookExperience}
                    className="p-1.5 rounded-full bg-white/10 group-hover:bg-gold-500 text-white group-hover:text-charcoal-950 transition-colors"
                  >
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
