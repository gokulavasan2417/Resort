import React from 'react';
import { motion } from 'framer-motion';
import { poolData } from '../data/resortData';
import { Droplets, Sparkles, Sun, Waves, ArrowRight } from 'lucide-react';

export default function PoolSection({ onBookStay }) {
  return (
    <section id="pool" className="py-24 sm:py-32 bg-forest-950 text-cream-50 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest-900/40 via-transparent to-forest-950 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Top Bar */}
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-400"
          >
            <Waves size={13} className="text-gold-400" />
            <span>{poolData.subtitle}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="mt-3 font-serif text-3xl sm:text-5xl lg:text-6xl text-cream-50 leading-tight"
          >
            {poolData.headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-5 text-sm sm:text-base text-sand-300 font-light leading-relaxed"
          >
            {poolData.description}
          </motion.p>
        </div>

        {/* Large Imagery and Highlights Grid */}
        <div className="mt-14 sm:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Hero Pool Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-8 rounded-3xl overflow-hidden shadow-2xl relative aspect-[16/10] sm:aspect-[16/9] border border-gold-500/20 group"
          >
            <img
              src={poolData.image}
              alt="Happening Villa Heated Quartzite Infinity Pool"
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-gold-300">Geothermal Sanctuary</span>
                <p className="font-serif text-xl sm:text-2xl text-white">Tiered Alpine Horizon Pool</p>
              </div>
              <div className="hidden sm:block text-right">
                <span className="text-xs text-sand-300 block">Temperature</span>
                <span className="text-base font-serif text-gold-300">28°C / 82°F Constant</span>
              </div>
            </div>
          </motion.div>

          {/* Secondary Features Column */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {poolData.highlights.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  className="p-5 rounded-2xl bg-forest-900/60 border border-gold-500/15 backdrop-blur-sm hover:border-gold-400/40 transition-colors"
                >
                  <h4 className="font-serif text-base text-gold-300 flex items-center gap-2">
                    <Sparkles size={14} className="text-gold-400" />
                    <span>{item.title}</span>
                  </h4>
                  <p className="mt-1 text-xs text-sand-300/90 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="pt-2"
            >
              <button
                onClick={onBookStay}
                className="w-full py-4 rounded-full bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg shadow-gold-500/20 flex items-center justify-center gap-2 group"
              >
                <span>Discover Poolside Living</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
