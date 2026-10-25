import React from 'react';
import { motion } from 'framer-motion';
import { Users, Bed, Maximize2, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function RoomCard({ room, index, onViewDetails, onBookRoom }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col bg-cream-50 rounded-2xl overflow-hidden border border-sand-300/40 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5"
    >
      {/* Room Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-forest-900/10">
        <img
          src={room.image}
          alt={room.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
        />

        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3.5 py-1.5 rounded-full text-[10px] font-medium tracking-widest uppercase bg-charcoal-950/70 backdrop-blur-md text-gold-300 border border-gold-400/20">
            {room.category}
          </span>
        </div>

        {/* Starting Price Pill */}
        {room.startingPrice && (
          <div className="absolute bottom-4 right-4 z-10">
            <div className="px-3 py-1.5 rounded-lg bg-charcoal-950/80 backdrop-blur-md border border-white/10 text-right">
              <span className="text-[10px] uppercase tracking-wider text-sand-300 block">From</span>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-serif font-bold text-cream-50">{room.startingPrice}</span>
                <span className="text-[10px] text-sand-300/80">/ night</span>
              </div>
            </div>
          </div>
        )}

        {/* Subtle hover gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
      </div>

      {/* Card Body */}
      <div className="flex-1 p-6 sm:p-7 flex flex-col justify-between">
        <div>
          <h3 className="font-serif text-xl sm:text-2xl text-forest-900 font-normal group-hover:text-gold-700 transition-colors">
            {room.name}
          </h3>
          <p className="mt-1 text-xs text-gold-700/90 italic font-serif">
            {room.tagline}
          </p>

          <p className="mt-3 text-xs sm:text-sm text-sand-700 leading-relaxed line-clamp-2">
            {room.description}
          </p>

          {/* Key Specs Grid */}
          <div className="mt-5 grid grid-cols-3 gap-2 py-3.5 px-3 rounded-xl bg-sand-100/70 border border-sand-200/60 text-charcoal-800">
            <div className="flex items-center gap-2">
              <Users size={14} className="text-gold-600 flex-shrink-0" />
              <div className="overflow-hidden">
                <span className="block text-[9px] uppercase tracking-wider text-sand-600">Guests</span>
                <span className="block text-xs font-medium truncate">{room.capacity}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 border-l border-sand-300/50 pl-2">
              <Bed size={14} className="text-gold-600 flex-shrink-0" />
              <div className="overflow-hidden">
                <span className="block text-[9px] uppercase tracking-wider text-sand-600">Bed</span>
                <span className="block text-xs font-medium truncate">{room.bedConfiguration.split('(')[0]}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 border-l border-sand-300/50 pl-2">
              <Maximize2 size={14} className="text-gold-600 flex-shrink-0" />
              <div className="overflow-hidden">
                <span className="block text-[9px] uppercase tracking-wider text-sand-600">Size</span>
                <span className="block text-xs font-medium truncate">{room.roomSize ? room.roomSize.split('/')[0] : 'Spacious'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons / Actions */}
        <div className="mt-6 pt-4 border-t border-sand-200/80 flex items-center gap-3">
          <button
            onClick={() => onViewDetails(room)}
            className="flex-1 py-2.5 px-4 rounded-xl border border-sand-400/50 hover:border-gold-600 bg-white hover:bg-sand-50 text-xs uppercase tracking-wider font-medium text-forest-900 transition-all duration-300 flex items-center justify-center gap-1.5"
          >
            <span>View Details</span>
            <ArrowUpRight size={13} className="text-gold-600" />
          </button>

          <button
            onClick={() => onBookRoom(room)}
            className="flex-1 py-2.5 px-4 rounded-xl bg-forest-900 hover:bg-forest-800 text-white text-xs uppercase tracking-wider font-medium shadow-sm hover:shadow-md transition-all duration-300 text-center"
          >
            Book This Room
          </button>
        </div>
      </div>
    </motion.div>
  );
}
