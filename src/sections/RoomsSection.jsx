import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { roomsData } from '../data/resortData';
import RoomCard from '../components/RoomCard';
import RoomModal from '../components/RoomModal';
import {
  Sparkles,
  Layers,
  Compass,
  Check,
  Eye,
  Info,
  Maximize2,
  X,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

export default function RoomsSection({ onBookRoom }) {
  const [activeTab, setActiveTab] = useState('collection'); // 'collection' | 'architectural'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalRoom, setActiveModalRoom] = useState(null);

  // Architectural View State (Rooms.mp4 reference)
  const [archStage, setArchStage] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState(null);

  const categories = ['All', 'Deluxe Room', 'Luxury Suite', 'Private Villa', 'Family Cottage'];

  const filteredRooms =
    selectedCategory === 'All'
      ? roomsData
      : roomsData.filter((r) => r.category === selectedCategory);

  const archStages = [
    {
      id: 'overview',
      number: '01',
      label: 'Macro Overview',
      title: 'THE SANCTUARY ELEVATION',
      description:
        'Individually sculpted into the coastal canopy gradient. Every villa is oriented to ensure absolute privacy with panoramic views over the misty forest amphitheater.',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2200&q=85',
    },
    {
      id: 'architecture',
      number: '02',
      label: 'Architectural Blueprint',
      title: 'THE UNIQUE DESIGN & 72° CANOPY',
      description:
        'Locally quarried Tamil Nadu quartzite stone paired with reclaimed timber. The 72° angled roof canopy harnesses natural mountain drafts and passive geothermal cooling.',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2200&q=85',
    },
    {
      id: 'portico',
      number: '03',
      label: 'Private Portico',
      title: 'ACOUSTIC TIMBER PORTICO',
      description:
        'A covered loggia and mineral spring threshold providing an acoustic buffer from the outside world, immersing guests into pure solitude before entering.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=85',
    },
    {
      id: 'interior',
      number: '04',
      label: 'Suite Interior',
      title: 'THE MASTER SUITE INTERIOR',
      description:
        'Interactive architectural chamber featuring handcrafted timber furnishings, freestanding Italian stone tub, organic linen bedding, and cantilevered canopy balcony.',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=2200&q=85',
    },
  ];

  const interiorHotspots = [
    {
      id: 'tub',
      x: 20,
      y: 65,
      title: 'Freestanding Stone Soaking Tub',
      specs: 'Carved Italian quartzite • Heated mineral bath • Panoramic forest glass',
      desc: 'Carved from a single monolith of Italian quartzite stone, positioned beside full-height glass for starlit evening soaks.',
    },
    {
      id: 'bed',
      x: 52,
      y: 55,
      title: 'California King Goose-Down Bed',
      specs: 'Hand-tufted teak frame • Organic Egyptian cotton • Hypoallergenic goose down',
      desc: 'Engineered for restorative alignment with 800-thread-count linens and natural botanical aromatherapy mist.',
    },
    {
      id: 'balcony',
      x: 82,
      y: 40,
      title: 'Cantilevered Cedar Balcony',
      specs: '22 sq m deck • Suspended teak daybed • Unbroken forest canopy panorama',
      desc: 'Extends directly into the pine canopies, creating an open-air haven for sunrise meditation and private champagne breakfasts.',
    },
    {
      id: 'hearth',
      x: 36,
      y: 36,
      title: 'Granite Hearth & Sommelier Bar',
      specs: 'Wood-burning fireplace • Sub-Zero wine vault • Artisanal espresso bar',
      desc: 'Warm local granite fireplace paired with a curated collection of international organic vintages and estate herbal teas.',
    },
  ];

  const currentArchStage = archStages[archStage];

  return (
    <section
      id="rooms"
      className="py-24 sm:py-32 bg-cream-50 relative overflow-hidden text-charcoal-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header: Page 2 Indicator */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-sand-300/60">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-mono font-semibold uppercase tracking-[0.3em] text-gold-700">
              <Sparkles size={12} className="text-gold-600" />
              <span>PAGE 02 • SANCTUARY LIVING</span>
            </div>

            <h2 className="mt-2 font-serif text-3xl sm:text-5xl text-forest-900 leading-tight">
              Accommodations & Private Sanctuaries
            </h2>

            <p className="mt-3 text-xs sm:text-sm text-sand-700 max-w-2xl font-light leading-relaxed">
              Each suite and villa is individually sculpted into the natural forest gradient, offering private thermal plunge pools, floor-to-ceiling glass, and dedicated concierge care.
            </p>
          </div>

          {/* View Mode Switcher: Collection Cards vs Architectural Tour */}
          <div className="flex items-center gap-2 bg-sand-200/70 p-1.5 rounded-2xl">
            <button
              onClick={() => setActiveTab('collection')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'collection'
                  ? 'bg-forest-900 text-gold-300 shadow-md'
                  : 'text-charcoal-800 hover:text-forest-900'
              }`}
            >
              All Residences
            </button>

            <button
              onClick={() => setActiveTab('architectural')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                activeTab === 'architectural'
                  ? 'bg-forest-900 text-gold-300 shadow-md'
                  : 'text-charcoal-800 hover:text-forest-900'
              }`}
            >
              <Layers size={13} />
              <span>Architectural Tour (Rooms.mp4)</span>
            </button>
          </div>
        </div>

        {/* VIEW 1: RESIDENCES COLLECTION (Natural clean grid) */}
        {activeTab === 'collection' && (
          <div className="mt-10">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pb-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-medium transition-all duration-300 ${
                    selectedCategory === cat
                      ? 'bg-forest-900 text-gold-300 shadow-md'
                      : 'bg-sand-100 text-charcoal-800 hover:bg-sand-200/80 border border-sand-300/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Room Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
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

            {/* Policy Banner */}
            <div className="mt-16 p-6 rounded-2xl bg-sand-100/70 border border-sand-200 text-center max-w-3xl mx-auto">
              <p className="text-xs text-sand-700 font-light leading-relaxed">
                * All room bookings include daily gourmet breakfast overlooking the gorge, high-speed mesh Wi-Fi, evening turn-down aromatherapy, and unrestricted access to the heated quartzite infinity pool.
              </p>
            </div>
          </div>
        )}

        {/* VIEW 2: ARCHITECTURAL DEEP-DIVE (Rooms.mp4 Inspired Interactive Experience) */}
        {activeTab === 'architectural' && (
          <div className="mt-10 rounded-3xl bg-charcoal-950 text-cream-50 overflow-hidden shadow-2xl border border-gold-500/30 p-6 sm:p-10 relative">
            
            {/* Stage Selector Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div className="flex flex-wrap items-center gap-2">
                {archStages.map((stg, idx) => (
                  <button
                    key={stg.id}
                    onClick={() => {
                      setArchStage(idx);
                      setActiveHotspot(null);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                      archStage === idx
                        ? 'bg-gold-500 text-charcoal-950 font-bold shadow-md'
                        : 'bg-charcoal-900 text-sand-300 hover:bg-charcoal-800 border border-white/10'
                    }`}
                  >
                    <span>{stg.number}</span> <span className="font-sans font-normal ml-1">{stg.label}</span>
                  </button>
                ))}
              </div>

              <span className="text-xs font-mono text-gold-400">
                CHAPTER {currentArchStage.number} / 04
              </span>
            </div>

            {/* Stage Content */}
            <div className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Stage Narrative */}
              <div className="lg:col-span-5 space-y-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-400 block">
                  CHAPTER {currentArchStage.number} • ARCHITECTURAL EXPLORATION
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl text-cream-50 leading-tight">
                  {currentArchStage.title}
                </h3>
                <p className="text-xs sm:text-sm text-sand-300 font-light leading-relaxed">
                  {currentArchStage.description}
                </p>

                {/* Blueprint Specs (Stage 2) */}
                {archStage === 1 && (
                  <div className="p-4 rounded-xl bg-charcoal-900/90 border border-gold-400/30 grid grid-cols-3 gap-2 text-center text-xs">
                    <div>
                      <span className="text-[10px] text-sand-400 font-mono block">Canopy Angle</span>
                      <span className="font-serif text-gold-300 font-medium">72° Cantilever</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-sand-400 font-mono block">Villa Span</span>
                      <span className="font-serif text-gold-300 font-medium">18.2 Meters</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-sand-400 font-mono block">Stone Masonry</span>
                      <span className="font-serif text-gold-300 font-medium">Tamil Quartzite</span>
                    </div>
                  </div>
                )}

                {/* Prev / Next Stage Buttons */}
                <div className="pt-4 flex items-center gap-3">
                  <button
                    onClick={() => setArchStage((p) => Math.max(p - 1, 0))}
                    disabled={archStage === 0}
                    className="p-2.5 rounded-full bg-charcoal-900 hover:bg-gold-500 hover:text-charcoal-950 border border-white/10 disabled:opacity-30 disabled:pointer-events-none transition-all"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => setArchStage((p) => Math.min(p + 1, archStages.length - 1))}
                    disabled={archStage === archStages.length - 1}
                    className="p-2.5 rounded-full bg-charcoal-900 hover:bg-gold-500 hover:text-charcoal-950 border border-white/10 disabled:opacity-30 disabled:pointer-events-none transition-all"
                  >
                    <ChevronRight size={16} />
                  </button>
                  <span className="text-xs text-sand-400 font-light pl-2">
                    {currentArchStage.label}
                  </span>
                </div>
              </div>

              {/* Right Stage Visual with Overlays */}
              <div className="lg:col-span-7 relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/15 shadow-2xl">
                <img
                  src={currentArchStage.image}
                  alt={currentArchStage.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent pointer-events-none" />

                {/* Blueprint Drawing Overlay for Stage 2 (72° angle callout from Rooms.mp4) */}
                {archStage === 1 && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-80" xmlns="http://www.w3.org/2000/svg">
                    <g className="animate-pulse">
                      <path d="M 320 120 A 40 40 0 0 1 360 150" fill="none" stroke="#cfb25a" strokeWidth="2" strokeDasharray="3 3" />
                      <line x1="320" y1="120" x2="280" y2="100" stroke="#cfb25a" strokeWidth="1.5" />
                      <text x="230" y="95" fill="#f5f0db" fontSize="11" fontFamily="monospace">72° CANOPY</text>
                    </g>
                    <g>
                      <line x1="200" y1="260" x2="480" y2="260" stroke="#cfb25a" strokeWidth="1.5" />
                      <line x1="200" y1="250" x2="200" y2="270" stroke="#cfb25a" strokeWidth="1.5" />
                      <line x1="480" y1="250" x2="480" y2="270" stroke="#cfb25a" strokeWidth="1.5" />
                      <text x="310" y="252" fill="#cfb25a" fontSize="10" fontFamily="monospace">18.2M SPAN</text>
                    </g>
                  </svg>
                )}

                {/* Interactive Hotspot Pins for Stage 4 (Offering Chapel / Interior from Rooms.mp4) */}
                {archStage === 3 && (
                  <>
                    {interiorHotspots.map((spot) => (
                      <div
                        key={spot.id}
                        style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                      >
                        <button
                          onClick={() => setActiveHotspot(activeHotspot?.id === spot.id ? null : spot)}
                          className="group relative flex items-center justify-center focus:outline-none"
                        >
                          <span className="absolute w-7 h-7 rounded-full bg-gold-400/40 animate-ping pointer-events-none" />
                          <span className="relative w-6 h-6 rounded-full bg-charcoal-950 border-2 border-gold-400 flex items-center justify-center text-gold-300 shadow-lg group-hover:scale-125 transition-transform">
                            <Sparkles size={11} />
                          </span>
                        </button>
                      </div>
                    ))}

                    {/* Hotspot Info Popup */}
                    <AnimatePresence>
                      {activeHotspot && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm p-4 rounded-xl bg-charcoal-950/95 backdrop-blur-xl border border-gold-400/40 shadow-2xl z-30 space-y-2"
                        >
                          <div className="flex items-start justify-between">
                            <h4 className="font-serif text-sm font-medium text-cream-50">
                              {activeHotspot.title}
                            </h4>
                            <button
                              onClick={() => setActiveHotspot(null)}
                              className="text-sand-400 hover:text-white"
                            >
                              <X size={14} />
                            </button>
                          </div>
                          <p className="text-xs text-sand-300 font-light leading-relaxed">
                            {activeHotspot.desc}
                          </p>
                          <div className="p-2 rounded bg-white/5 font-mono text-[10px] text-gold-300">
                            {activeHotspot.specs}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}

              </div>

            </div>

          </div>
        )}

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
