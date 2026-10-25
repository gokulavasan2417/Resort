import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { diningData } from '../data/resortData';
import { Utensils, Clock, Sparkles, Wine, Calendar, Check, X } from 'lucide-react';

export default function DiningSection({ onReserveTable }) {
  const [selectedVenue, setSelectedVenue] = useState(0);
  const [showMenuModal, setShowMenuModal] = useState(false);

  const sampleMenuCourse = [
    { name: "Wild Foraged Morel Velouté", desc: "Black truffle oil, pine needle infused froth, toasted sourdough crisp", price: "₹1,450" },
    { name: "Glacial Char & Alpine Herbs", desc: "Pan-seared river char, smoked celeriac purée, elderberry glaze", price: "₹2,650" },
    { name: "Highland Grass-Fed Tenderloin", desc: "Braised parsnip fondant, bone marrow jus, wild juniper reduction", price: "₹3,850" },
    { name: "Dark Fir Honey & Spruce Mousse", desc: "Caramelized hazelnut crumble, lingonberry sorbet, edible alpine flora", price: "₹1,150" },
  ];

  return (
    <section id="dining" className="py-24 sm:py-32 bg-forest-900 text-cream-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-400"
            >
              <Utensils size={13} className="text-gold-400" />
              <span>{diningData.subtitle}</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="mt-3 font-serif text-3xl sm:text-5xl text-cream-50 leading-tight"
            >
              {diningData.headline}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mt-3 text-xs sm:text-sm text-sand-300 max-w-xl font-light"
            >
              {diningData.description}
            </motion.p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowMenuModal(true)}
              className="px-6 py-3 rounded-full border border-gold-400/40 hover:border-gold-300 text-gold-300 hover:text-white text-xs uppercase tracking-widest font-medium transition-all"
            >
              View Sample Menu
            </button>
            <button
              onClick={onReserveTable}
              className="px-6 py-3 rounded-full bg-gold-500 hover:bg-gold-400 text-charcoal-950 text-xs uppercase tracking-widest font-semibold transition-all shadow-md shadow-gold-500/20"
            >
              Table Reservation
            </button>
          </div>
        </div>

        {/* Operating Hours Bar */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {diningData.hours.map((schedule, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="p-5 rounded-2xl bg-forest-950/60 border border-gold-500/15 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2 text-gold-400">
                <Clock size={15} />
                <span className="text-[11px] uppercase tracking-wider font-semibold">{schedule.meal}</span>
              </div>
              <p className="font-serif text-lg text-cream-50 mt-1">{schedule.time}</p>
              <p className="text-xs text-sand-300/80 mt-1 font-light">{schedule.type}</p>
            </motion.div>
          ))}
        </div>

        {/* 3 Dining Venues Showcase */}
        <div className="mt-16 sm:mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {diningData.venues.map((venue, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.7 }}
                className="group rounded-2xl overflow-hidden bg-forest-950/80 border border-gold-500/15 flex flex-col hover:border-gold-400/40 transition-all duration-500"
              >
                <div className="relative aspect-[16/11] overflow-hidden">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest bg-charcoal-950/70 text-gold-300 backdrop-blur-md border border-gold-400/20">
                      Estate Venue
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl text-cream-50 group-hover:text-gold-300 transition-colors">
                      {venue.name}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-sand-300/90 leading-relaxed font-light">
                      {venue.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] text-gold-400/80 uppercase tracking-wider">Reservations Recommended</span>
                    <button
                      onClick={onReserveTable}
                      className="text-xs text-gold-300 hover:text-white underline underline-offset-4 transition-colors font-medium"
                    >
                      Inquire Table
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Sample Menu Modal */}
      <AnimatePresence>
        {showMenuModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMenuModal(false)}
              className="fixed inset-0 bg-charcoal-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-cream-50 text-forest-950 rounded-2xl p-6 sm:p-8 shadow-2xl z-10 border border-sand-300"
            >
              <div className="flex items-center justify-between border-b border-sand-300 pb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-gold-700 font-semibold">The Hearth & Canopy</span>
                  <h3 className="font-serif text-2xl text-forest-900">Autumn Tasting Menu Highlights</h3>
                </div>
                <button
                  onClick={() => setShowMenuModal(false)}
                  className="p-2 rounded-full hover:bg-sand-200 text-charcoal-900 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-6 space-y-5">
                {sampleMenuCourse.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-baseline gap-4 border-b border-sand-200/60 pb-3">
                    <div>
                      <h4 className="font-serif text-base text-forest-900">{item.name}</h4>
                      <p className="text-xs text-sand-700 mt-0.5">{item.desc}</p>
                    </div>
                    <span className="font-serif font-medium text-gold-800 text-sm">{item.price}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-4 border-t border-sand-300 flex items-center justify-between">
                <p className="text-[11px] text-sand-600 italic">
                  * 7-Course Wine Pairing available with head sommelier.
                </p>
                <button
                  onClick={() => {
                    setShowMenuModal(false);
                    onReserveTable();
                  }}
                  className="px-6 py-2.5 rounded-full bg-forest-900 text-white text-xs uppercase tracking-widest font-medium hover:bg-forest-800 transition-colors"
                >
                  Reserve Table
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
