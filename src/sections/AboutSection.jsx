import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Award, Compass, SunMedium, ArrowRight } from 'lucide-react';
import { resortInfo } from '../data/resortData';

export default function AboutSection({ onExploreRooms }) {
  const pillars = [
    {
      icon: Leaf,
      title: "Untouched Alpine Wilderness",
      desc: "Set within 2,400 acres of protected highland reserve with century-old pine canopies.",
    },
    {
      icon: Award,
      title: "Artisanal Craftsmanship",
      desc: "Local granite, reclaimed cedar, and hand-woven textiles shaping every interior line.",
    },
    {
      icon: SunMedium,
      title: "Holistic Restoration",
      desc: "Thermal waters, forest therapy, and silence designed to realign mind and body.",
    },
  ];

  return (
    <section id="about" className="py-24 sm:py-32 bg-cream-100 relative overflow-hidden">
      {/* Decorative subtle background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sand-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-forest-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-700 block"
          >
            Sanctuary Philosophy
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-3 font-serif text-3xl sm:text-5xl text-forest-900 leading-tight"
          >
            A Sanctuary Crafted for <br />
            <span className="italic font-light">Mindful Solitude & Pure Grace.</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-[1.5px] bg-gold-500 mx-auto mt-6"
          />
        </div>

        {/* Editorial Asymmetrical Composition */}
        <div className="mt-16 sm:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Text Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col justify-center space-y-6"
          >
            <div className="space-y-4 text-sand-800 leading-relaxed text-sm sm:text-base font-light">
              <p>
                Founded on the belief that genuine luxury is found in stillness and connection with the earth, <strong className="text-forest-900 font-medium">{resortInfo.brandName}</strong> harmonizes world-class hospitality with environmental stewardship.
              </p>
              <p>
                From the moment you cross the ancient wooden bridge into our forested valley, the tempo of daily life recedes. Here, morning arrives with birdsong over mist-draped ridgelines, afternoons unfold beside heated quartzite waters, and twilight invites contemplative dining by wood-fired hearths.
              </p>
              <p>
                Every villa and suite has been oriented to preserve complete visual privacy while framing unobstructed panoramas of the surrounding mountain amphitheater.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onExploreRooms}
                className="group inline-flex items-center gap-3 text-xs uppercase tracking-widest font-semibold text-forest-900 hover:text-gold-700 transition-colors"
              >
                <span>Discover Accommodation</span>
                <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>
            </div>
          </motion.div>

          {/* Right Visual Composition */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="sm:col-span-7 rounded-2xl overflow-hidden shadow-2xl relative aspect-[4/5] bg-forest-900/10"
            >
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
                alt="Happening Villa Resort Estate architecture"
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-cream-50">
                <span className="text-[10px] uppercase tracking-widest text-gold-300">Sanctuary Architecture</span>
                <p className="font-serif text-lg text-white font-light">Organic Timber & Local Stone Design</p>
              </div>
            </motion.div>

            <div className="sm:col-span-5 flex flex-col justify-between gap-4 sm:gap-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="rounded-2xl overflow-hidden shadow-lg aspect-[4/3] bg-forest-900/10"
              >
                <img
                  src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80"
                  alt="Wine tasting cellar at Happening Villa"
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-out"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="p-6 rounded-2xl bg-forest-900 text-cream-50 shadow-xl border border-gold-500/20"
              >
                <span className="text-3xl sm:text-4xl font-serif text-gold-300 font-light">2,400</span>
                <p className="text-xs uppercase tracking-widest text-sand-300 mt-1 font-medium">Acres of Wilderness</p>
                <p className="text-xs text-sand-300/80 mt-2 font-light leading-relaxed">
                  Dedicated nature reserve permanently protected against commercial development.
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* 3 Pillars Grid */}
        <div className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 border-t border-sand-300/70 pt-12 sm:pt-16">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="p-6 rounded-2xl bg-white/70 border border-sand-200/80 hover:border-gold-400/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-forest-900/5 text-forest-900 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-gold-600" />
                </div>
                <h3 className="font-serif text-lg text-forest-900">{pillar.title}</h3>
                <p className="mt-2 text-xs sm:text-sm text-sand-700 leading-relaxed font-light">
                  {pillar.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
