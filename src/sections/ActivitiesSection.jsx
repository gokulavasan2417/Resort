import React from 'react';
import { motion } from 'framer-motion';
import { familyData, roomsData } from '../data/resortData';
import {
  Heart,
  Smile,
  Sparkles,
  Compass,
  ArrowRight,
  ShieldCheck,
  Trees,
  Flame,
  Star,
  Users,
} from 'lucide-react';

export default function ActivitiesSection({ onInquireFamily, onBookFamily }) {
  const familyResidence = roomsData.find((r) => r.id === 'family-cottage') || roomsData[3];

  const familyHighlights = [
    {
      icon: Trees,
      title: "Young Rangers Discovery",
      desc: "Daily naturalist walks tracking native butterfly species, identifying medicinal trees, and building bird boxes.",
    },
    {
      icon: Flame,
      title: "Evening Campfire & Hearth",
      desc: "Private lawn fire pits with artisan toasted s'mores, acoustic folklore stories, and telescope celestial viewing.",
    },
    {
      icon: ShieldCheck,
      title: "Thoughtful Family Care",
      desc: "Connecting en-suite bedrooms, child-safe balcony balustrades, baby listening services, and tailored kids menus.",
    },
  ];

  return (
    <section id="family" className="py-24 sm:py-32 bg-cream-100 relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sand-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-forest-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-700"
          >
            <Sparkles size={12} className="text-gold-600" />
            <span>Family & Multi-Generational Living</span>
          </motion.div>

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

                <div className="mt-6 pt-4 border-t border-sand-200 flex items-center justify-between text-xs font-medium text-forest-900 group-hover:text-gold-700 transition-colors">
                  <span>Nature Discovery Activity</span>
                  <ArrowRight size={13} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Featured Family Residence Showcase Banner */}
        {familyResidence && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-16 rounded-3xl overflow-hidden bg-forest-900 text-cream-50 shadow-2xl border border-gold-500/20 grid grid-cols-1 lg:grid-cols-12"
          >
            {/* Image Side */}
            <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-full">
              <img
                src={familyResidence.image}
                alt={familyResidence.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-forest-900/60 hidden lg:block" />
            </div>

            {/* Info Side */}
            <div className="lg:col-span-6 p-8 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold-300 block">
                  Dedicated Family Residence
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl text-cream-50 mt-1">
                  {familyResidence.name}
                </h3>
                <p className="text-xs sm:text-sm text-sand-300 font-light mt-3 leading-relaxed">
                  {familyResidence.description}
                </p>
              </div>

              {/* Specs & Highlights */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-forest-950/60 border border-gold-400/20 text-xs">
                <div>
                  <span className="text-[10px] text-sand-400 uppercase font-mono block">Space</span>
                  <span className="font-medium text-cream-100">{familyResidence.roomSize}</span>
                </div>
                <div>
                  <span className="text-[10px] text-sand-400 uppercase font-mono block">Capacity</span>
                  <span className="font-medium text-cream-100">{familyResidence.capacity}</span>
                </div>
                <div>
                  <span className="text-[10px] text-sand-400 uppercase font-mono block">Starting Rate</span>
                  <span className="font-bold text-gold-300">{familyResidence.startingPrice}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onBookFamily ? onBookFamily() : onInquireFamily()}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg shadow-gold-500/20"
                >
                  <span className="font-serif font-bold text-sm leading-none">₹</span>
                  <span>Book Family Residence</span>
                </button>

                <button
                  onClick={onInquireFamily}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-forest-800 hover:bg-forest-700 text-cream-100 border border-gold-400/30 font-medium text-xs uppercase tracking-wider transition-all"
                >
                  <Compass size={14} />
                  <span>Inquire Bespoke Package</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* 3 Pillars of Family Care */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-sand-300/60">
          {familyHighlights.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white/60 border border-sand-200">
                <div className="p-3 rounded-xl bg-forest-900/5 text-forest-900">
                  <Icon size={20} className="text-gold-600" />
                </div>
                <div>
                  <h4 className="font-serif text-base text-forest-900 font-medium">{item.title}</h4>
                  <p className="mt-1 text-xs text-sand-700 leading-relaxed font-light">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
