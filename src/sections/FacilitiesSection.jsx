import React from 'react';
import { motion } from 'framer-motion';
import { facilitiesData } from '../data/resortData';
import {
  Wifi,
  Car,
  Clock,
  UtensilsCrossed,
  Briefcase,
  HeartHandshake,
  Gamepad2,
  Dumbbell,
  Compass,
  PlaneTakeoff,
  ShieldCheck,
  Accessibility,
} from 'lucide-react';

export default function FacilitiesSection() {
  const getFacilityIcon = (iconName) => {
    const props = { size: 22, className: "text-gold-600 transition-colors group-hover:text-gold-400" };
    switch (iconName) {
      case 'Wifi': return <Wifi {...props} />;
      case 'Car': return <Car {...props} />;
      case 'Clock': return <Clock {...props} />;
      case 'UtensilsCrossed': return <UtensilsCrossed {...props} />;
      case 'Briefcase': return <Briefcase {...props} />;
      case 'HeartHandshake': return <HeartHandshake {...props} />;
      case 'Gamepad2': return <Gamepad2 {...props} />;
      case 'Dumbbell': return <Dumbbell {...props} />;
      case 'Compass': return <Compass {...props} />;
      case 'PlaneTakeoff': return <PlaneTakeoff {...props} />;
      case 'ShieldCheck': return <ShieldCheck {...props} />;
      case 'Accessibility': return <Accessibility {...props} />;
      default: return <Compass {...props} />;
    }
  };

  return (
    <section id="facilities" className="py-24 sm:py-32 bg-cream-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-700 block"
          >
            Guest Conveniences & Estate Amenities
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="mt-3 font-serif text-3xl sm:text-5xl text-forest-900"
          >
            Flawless Comfort in the Wild
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-3 text-xs sm:text-sm text-sand-700 font-light max-w-xl mx-auto leading-relaxed"
          >
            Every modern convenience and bespoke service curated to ensure effortless tranquility during your mountain retreat.
          </motion.p>
        </div>

        {/* 12 Facilities Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilitiesData.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.5 }}
              className="group p-6 rounded-2xl bg-white border border-sand-300/60 shadow-sm hover:shadow-xl hover:bg-forest-900 hover:text-white transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-sand-100 group-hover:bg-forest-800 flex items-center justify-center transition-colors mb-4">
                  {getFacilityIcon(item.icon)}
                </div>
                <h3 className="font-serif text-base text-forest-900 group-hover:text-cream-50 transition-colors font-medium">
                  {item.name}
                </h3>
                <p className="mt-2 text-xs text-sand-700 group-hover:text-sand-300/90 leading-relaxed font-light transition-colors">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-sand-200/50 group-hover:border-white/10 flex items-center justify-between text-[10px] uppercase tracking-wider text-sand-500 group-hover:text-gold-300">
                <span>Sanctuary Amenity</span>
                <span className="font-mono">0{idx + 1}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
