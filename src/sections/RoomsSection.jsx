import React, { useState } from 'react';
import { motion } from 'framer-motion';
import RoomCard from '../components/RoomCard';
import RoomModal from '../components/RoomModal';
import { roomsData } from '../data/resortData';
import { Sparkles, SlidersHorizontal } from 'lucide-react';

export default function RoomsSection({ onBookRoom }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalRoom, setActiveModalRoom] = useState(null);

  const categories = ['All', 'Deluxe Room', 'Luxury Suite', 'Private Villa', 'Family Cottage'];

  const filteredRooms =
    selectedCategory === 'All'
      ? roomsData
      : roomsData.filter((r) => r.category === selectedCategory);

  return (
    <section id="rooms" className="py-24 sm:py-32 bg-cream-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-700"
            >
              <Sparkles size={12} className="text-gold-600" />
              <span>Sanctuary Living</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="mt-3 font-serif text-3xl sm:text-5xl text-forest-900"
            >
              Accommodations & Private Sanctuaries
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mt-3 text-xs sm:text-sm text-sand-700 max-w-xl font-light"
            >
              Each suite and villa is individually sculpted into the natural forest gradient, offering private thermal baths, floor-to-ceiling glass, and dedicated concierge care.
            </motion.p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-medium transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-forest-900 text-gold-300 shadow-md'
                    : 'bg-sand-100 text-charcoal-800 hover:bg-sand-200/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Room Cards Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredRooms.map((room, index) => (
            <RoomCard
              key={room.id}
              room={room}
              index={index}
              onViewDetails={(r) => setActiveModalRoom(r)}
              onBookRoom={(r) => onBookRoom(r)}
            />
          ))}
        </div>

        {/* Accommodation Policy Callout */}
        <div className="mt-16 p-6 rounded-2xl bg-sand-100/60 border border-sand-200/70 text-center max-w-3xl mx-auto">
          <p className="text-xs text-sand-700 font-light leading-relaxed">
            * All room bookings include daily breakfast overlooking the gorge, high-speed Wi-Fi, evening turn-down aromatherapy, and unrestricted access to the thermal infinity pool.
          </p>
        </div>
      </div>

      {/* Detail Modal */}
      <RoomModal
        room={activeModalRoom}
        onClose={() => setActiveModalRoom(null)}
        onBookRoom={(r) => {
          setActiveModalRoom(null);
          onBookRoom(r);
        }}
      />
    </section>
  );
}
