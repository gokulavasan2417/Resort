import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { roomsData } from '../data/resortData';
import RoomModal from '../components/RoomModal';
import {
  Compass,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Eye,
  Check,
  Maximize2,
  Users,
  Bed,
  Layers,
  ArrowDown,
  Info,
  X,
} from 'lucide-react';

export default function RoomsSection({ onBookRoom }) {
  const [activeStage, setActiveStage] = useState(0);
  const [activeRoomIndex, setActiveRoomIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [activeModalRoom, setActiveModalRoom] = useState(null);
  const containerRef = useRef(null);

  const stages = [
    {
      id: 'overview',
      number: '01',
      label: 'Sanctuary Overview',
      title: 'THE SANCTUARY LIVING',
      subtitle: 'HAPPENING VILLA ARCHITECTURE',
      description:
        'Individually sculpted into the coastal forest canopy, each residence offers total visual seclusion, heated private mineral pools, and unobstructed nature panoramas.',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2200&q=85',
      badge: 'MACRO PERSPECTIVE',
    },
    {
      id: 'architecture',
      number: '02',
      label: 'Architectural Design',
      title: 'THE UNIQUE ARCHITECTURE',
      subtitle: 'BIOCLIMATIC CEDAR & STONE STRUCTURE',
      description:
        'Hand-quarried quartzite foundations paired with reclaimed alpine cedar. Every villa is angled at 72° to optimize solar geometry, mountain breezes, and geothermal water cycles.',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2200&q=85',
      badge: 'ARCHITECTURAL ANATOMY',
    },
    {
      id: 'portico',
      number: '03',
      label: 'Private Portico',
      title: 'THE RETREAT PORTICO',
      subtitle: 'PRIVATE THRESHOLD OF QUIETUDE',
      description:
        'A covered timber loggia and cascading mineral water threshold. The entrance creates an acoustic buffer from the outside world, immersing guests into pure stillness.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=85',
      badge: 'SANCTUARY THRESHOLD',
    },
    {
      id: 'interior',
      number: '04',
      label: 'Suite Interior',
      title: 'THE MASTER SANCTUARY',
      subtitle: 'INTERACTIVE ARCHITECTURAL INTERIOR',
      description:
        'Step inside our signature living space. Explore handcrafted materials, freestanding stone bath, organic linen bedding, and cantilevered canopy balcony.',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=2200&q=85',
      badge: 'INTERIOR SPECIFICATIONS',
    },
    {
      id: 'residences',
      number: '05',
      label: 'The Residences',
      title: 'ACCOMMODATIONS COLLECTION',
      subtitle: 'EXPLORE & SELECT YOUR SUITE',
      description:
        'Compare our 4 distinct living sanctuaries, review detailed floorplans and amenities, and reserve your restorative stay.',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2200&q=85',
      badge: 'RESERVE SANCTUARY',
    },
  ];

  // Hotspots for Stage 4 (Interior View - inspired by the Offering Chapel in Rooms.mp4)
  const interiorHotspots = [
    {
      id: 'tub',
      x: 18,
      y: 68,
      title: 'Freestanding Stone Soaking Tub',
      category: 'Thermal Bathing',
      specs: 'Italian quartzite • Geothermally heated to 38°C • Panoramic canopy glass',
      desc: 'Carved from a single monolith of Italian quartzite stone, positioned beside full-height glass for starlit evening soaks.',
      image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'bed',
      x: 52,
      y: 56,
      title: 'California King Goose-Down Bed',
      category: 'Restorative Sleep',
      specs: 'Solid timber frame • Organic Egyptian cotton • Hypoallergenic goose down',
      desc: 'Engineered for restorative alignment with a hand-tufted organic mattress, 800-thread-count linens, and aromatic lavender mist.',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'balcony',
      x: 82,
      y: 40,
      title: 'Cantilevered Cedar Balcony',
      category: 'Outdoor Living',
      specs: '22 sq m deck • Suspended teak daybed • Unbroken forest canopy panorama',
      desc: 'Extends directly into the pine canopies, creating an open-air haven for sunrise meditation and private champagne breakfasts.',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'hearth',
      x: 35,
      y: 35,
      title: 'Granite Hearth & Sommelier Bar',
      category: 'Bespoke Comfort',
      specs: 'Wood-burning fireplace • Sub-Zero wine vault • Artisanal espresso bar',
      desc: 'Warm local granite fireplace paired with a curated collection of international organic wines and estate herbal teas.',
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const currentStage = stages[activeStage];
  const selectedRoom = roomsData[activeRoomIndex];

  const nextStage = () => {
    setActiveStage((prev) => Math.min(prev + 1, stages.length - 1));
    setActiveHotspot(null);
  };

  const prevStage = () => {
    setActiveStage((prev) => Math.max(prev - 1, 0));
    setActiveHotspot(null);
  };

  return (
    <section
      id="rooms"
      ref={containerRef}
      className="relative min-h-screen bg-charcoal-950 text-cream-50 overflow-hidden select-none"
    >
      {/* Dynamic Background with Cinematic Camera Zoom Stages */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={`stage-bg-${activeStage}`}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.85, ease: [0.25, 1, 0.5, 1] }}
          className="absolute inset-0 w-full h-full transform-gpu will-change-transform"
        >
          <img
            src={currentStage.image}
            alt={currentStage.title}
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* Atmospheric Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/95 via-charcoal-950/60 to-charcoal-950/40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/95 via-transparent to-charcoal-950/60 pointer-events-none" />

      {/* Blueprint Technical Lines (Visible in Stage 2 & 3 - inspired by Rooms.mp4) */}
      {(activeStage === 1 || activeStage === 2) && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-70"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(197, 160, 89, 0.08)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Architectural Callout Arc (72° angle callout like Rooms.mp4's 70° angle) */}
          <g className="animate-pulse">
            <path
              d="M 650 280 A 60 60 0 0 1 710 320"
              fill="none"
              stroke="#cfb25a"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <line x1="650" y1="280" x2="600" y2="250" stroke="#cfb25a" strokeWidth="1.5" />
            <text x="540" y="245" fill="#f5f0db" fontSize="12" fontFamily="monospace" letterSpacing="2">
              72° CANOPY ANGLE
            </text>
          </g>

          {/* Dimension Line */}
          <g>
            <line x1="450" y1="520" x2="850" y2="520" stroke="#cfb25a" strokeWidth="1.5" />
            <line x1="450" y1="510" x2="450" y2="530" stroke="#cfb25a" strokeWidth="1.5" />
            <line x1="850" y1="510" x2="850" y2="530" stroke="#cfb25a" strokeWidth="1.5" />
            <text x="610" y="510" fill="#cfb25a" fontSize="11" fontFamily="monospace" letterSpacing="3">
              SPAN: 18.2 METERS
            </text>
          </g>

          {/* Elevation Callout */}
          <g>
            <circle cx="820" cy="380" r="4" fill="#cfb25a" />
            <line x1="820" y1="380" x2="920" y2="340" stroke="#cfb25a" strokeWidth="1" strokeDasharray="3 3" />
            <rect x="920" y="325" width="160" height="24" rx="4" fill="rgba(21, 36, 27, 0.85)" stroke="#cfb25a" strokeWidth="1" />
            <text x="930" y="341" fill="#f5f0db" fontSize="10" fontFamily="monospace">
              HAND-CUT QUARTZITE
            </text>
          </g>
        </svg>
      )}

      {/* Main Experience Layout */}
      <div className="relative z-20 w-full min-h-screen max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col justify-between pt-28 pb-12">
        
        {/* Top Header: Badge & Quick Chapter Step */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-full bg-forest-900/80 border border-gold-400/30 text-gold-300 text-[10px] font-mono tracking-[0.25em] uppercase">
              {currentStage.badge}
            </span>
            <span className="hidden sm:inline-block text-xs font-light text-sand-300/80 tracking-wider">
              {currentStage.label}
            </span>
          </div>

          {/* Stage Step Tabs (01..05) */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {stages.map((stage, idx) => (
              <button
                key={stage.id}
                onClick={() => {
                  setActiveStage(idx);
                  setActiveHotspot(null);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-300 flex items-center gap-1.5 ${
                  activeStage === idx
                    ? 'bg-gold-500 text-charcoal-950 font-bold shadow-md shadow-gold-500/20'
                    : 'bg-charcoal-900/60 hover:bg-charcoal-800 text-sand-300/70 border border-white/10'
                }`}
              >
                <span>{stage.number}</span>
                <span className="hidden md:inline font-sans font-normal text-[11px]">{stage.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Middle Stage-Specific Interactive Content */}
        <div className="my-auto py-8">
          
          {/* STAGES 1, 2, 3: Cinematic Narrative & Architectural Blueprint */}
          {activeStage < 3 && (
            <motion.div
              key={`stage-${activeStage}`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl space-y-5"
            >
              <div className="inline-flex items-center gap-2 text-gold-400 text-xs font-mono tracking-widest">
                <Sparkles size={13} />
                <span>STAGE {currentStage.number} • {currentStage.subtitle}</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-cream-50 leading-tight uppercase tracking-tight">
                {currentStage.title}
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-sand-200 font-light leading-relaxed">
                {currentStage.description}
              </p>

              {/* Technical Callout Card (Stage 2) */}
              {activeStage === 1 && (
                <div className="mt-6 p-5 rounded-2xl bg-charcoal-900/80 backdrop-blur-md border border-gold-400/25 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <span className="text-[10px] text-sand-400 uppercase tracking-widest block font-mono">Slope Pitch</span>
                    <span className="text-base sm:text-lg font-serif text-gold-300">72° Cantilever</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-sand-400 uppercase tracking-widest block font-mono">Villa Footprint</span>
                    <span className="text-base sm:text-lg font-serif text-gold-300">165 sq m</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-sand-400 uppercase tracking-widest block font-mono">Thermal Rating</span>
                    <span className="text-base sm:text-lg font-serif text-gold-300">Net Zero Passive</span>
                  </div>
                </div>
              )}

              {/* Navigation Action */}
              <div className="pt-4 flex items-center gap-4">
                <button
                  onClick={nextStage}
                  className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl shadow-gold-500/20 group"
                >
                  <span>Explore Next Milestone</span>
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setActiveStage(4)}
                  className="text-xs uppercase tracking-widest text-sand-300 hover:text-white underline underline-offset-4 transition-colors font-light"
                >
                  Skip to All Residences
                </button>
              </div>
            </motion.div>
          )}

          {/* STAGE 4: Interactive Suite Interior Hotspots (Rooms.mp4 Offering Chapel style) */}
          {activeStage === 3 && (
            <div className="relative w-full">
              {/* Hotspot Radar Pins overlay on the interior image */}
              <div className="relative w-full aspect-[16/9] max-h-[560px] rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
                <img
                  src={currentStage.image}
                  alt="Suite Interior"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-charcoal-950/40 pointer-events-none" />

                {/* Hotspot Pins */}
                {interiorHotspots.map((spot) => (
                  <div
                    key={spot.id}
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                  >
                    <button
                      onClick={() => setActiveHotspot(activeHotspot?.id === spot.id ? null : spot)}
                      aria-label={spot.title}
                      className="group relative flex items-center justify-center focus:outline-none"
                    >
                      {/* Pulse Ring */}
                      <span className="absolute w-8 h-8 rounded-full bg-gold-400/40 animate-ping pointer-events-none" />
                      {/* Outer Dot */}
                      <span className="relative w-7 h-7 rounded-full bg-charcoal-950/90 border-2 border-gold-400 flex items-center justify-center text-gold-300 shadow-lg group-hover:scale-125 transition-transform duration-300">
                        <Sparkles size={12} />
                      </span>
                      {/* Floating Label */}
                      <span className="hidden sm:block absolute left-9 top-1/2 -translate-y-1/2 whitespace-nowrap px-2.5 py-1 rounded-md bg-charcoal-900/90 backdrop-blur-md border border-gold-400/30 text-[10px] text-cream-50 font-mono tracking-wider pointer-events-none shadow-md">
                        {spot.title}
                      </span>
                    </button>
                  </div>
                ))}

                {/* Active Hotspot Modal/Tooltip Card */}
                <AnimatePresence>
                  {activeHotspot && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className="absolute bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:max-w-md p-5 rounded-2xl bg-charcoal-950/95 backdrop-blur-xl border border-gold-400/40 shadow-2xl z-30 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="text-[10px] font-mono text-gold-400 uppercase tracking-widest">
                            {activeHotspot.category}
                          </span>
                          <h4 className="font-serif text-lg text-cream-50">
                            {activeHotspot.title}
                          </h4>
                        </div>
                        <button
                          onClick={() => setActiveHotspot(null)}
                          className="p-1 rounded-lg text-sand-400 hover:text-white hover:bg-white/10"
                        >
                          <X size={16} />
                        </button>
                      </div>

                      <p className="text-xs text-sand-300 font-light leading-relaxed">
                        {activeHotspot.desc}
                      </p>

                      <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-sand-300">
                        {activeHotspot.specs}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom Guidance */}
              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs text-sand-400 font-light flex items-center gap-2">
                  <Info size={14} className="text-gold-400" />
                  <span>Click any glowing architectural pin to inspect luxury suite components</span>
                </p>
                <button
                  onClick={nextStage}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-semibold text-xs uppercase tracking-widest transition-all"
                >
                  <span>View All Residences</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* STAGE 5: The 4 Luxury Residences Interactive Showcase & Booking */}
          {activeStage === 4 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Room Switcher & Detailed Specs */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Suite Category Pills */}
                <div className="flex flex-wrap gap-2">
                  {roomsData.map((room, idx) => (
                    <button
                      key={room.id}
                      onClick={() => setActiveRoomIndex(idx)}
                      className={`px-3.5 py-2 rounded-xl text-xs uppercase tracking-wider font-medium transition-all duration-300 ${
                        activeRoomIndex === idx
                          ? 'bg-gold-500 text-charcoal-950 font-bold shadow-lg shadow-gold-500/20'
                          : 'bg-charcoal-900/80 hover:bg-charcoal-800 text-sand-300 border border-white/10'
                      }`}
                    >
                      {room.category}
                    </button>
                  ))}
                </div>

                {/* Selected Room Details */}
                <motion.div
                  key={`room-detail-${selectedRoom.id}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-400 block">
                      {selectedRoom.category} • SANCTUARY SUITE
                    </span>
                    <h3 className="font-serif text-2xl sm:text-4xl text-cream-50 mt-1">
                      {selectedRoom.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gold-300/90 italic font-light mt-1">
                      {selectedRoom.tagline}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-sand-300 font-light leading-relaxed">
                    {selectedRoom.description}
                  </p>

                  {/* Room Specs Grid */}
                  <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-charcoal-900/80 border border-white/10">
                    <div>
                      <span className="text-[10px] font-mono text-sand-400 uppercase block">Size</span>
                      <span className="text-xs sm:text-sm font-medium text-cream-100">{selectedRoom.roomSize}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-sand-400 uppercase block">Capacity</span>
                      <span className="text-xs sm:text-sm font-medium text-cream-100">{selectedRoom.capacity}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-sand-400 uppercase block">Starting Rate</span>
                      <span className="text-xs sm:text-sm font-bold text-gold-300">{selectedRoom.startingPrice} <span className="text-[10px] font-normal text-sand-400">/nt</span></span>
                    </div>
                  </div>

                  {/* Key Amenities */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-sand-400 block">
                      Curated Sanctuary Inclusions
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-sand-300">
                      {selectedRoom.amenities.slice(0, 4).map((amenity, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Check size={13} className="text-gold-400 flex-shrink-0" />
                          <span className="truncate">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions: Book Now & Full Tour */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => onBookRoom(selectedRoom)}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl shadow-gold-500/20 active:scale-95"
                    >
                      <span className="font-serif font-bold text-base leading-none">₹</span>
                      <span>Book {selectedRoom.category}</span>
                    </button>

                    <button
                      onClick={() => setActiveModalRoom(selectedRoom)}
                      className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-charcoal-900 hover:bg-charcoal-800 border border-white/15 text-sand-200 text-xs uppercase tracking-wider font-medium transition-all"
                    >
                      <Eye size={15} />
                      <span>View Gallery & Specs</span>
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Right Column: High-Res Visual Showcase with Gallery Thumbnails */}
              <div className="lg:col-span-7 space-y-4">
                <motion.div
                  key={`room-img-${selectedRoom.id}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-white/15 shadow-2xl group"
                >
                  <img
                    src={selectedRoom.image}
                    alt={selectedRoom.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-gold-300">
                        {selectedRoom.bedConfiguration}
                      </span>
                      <h4 className="font-serif text-xl sm:text-2xl text-white">
                        {selectedRoom.name}
                      </h4>
                    </div>

                    <button
                      onClick={() => setActiveModalRoom(selectedRoom)}
                      className="p-2.5 rounded-full bg-charcoal-950/80 backdrop-blur-md border border-white/20 text-white hover:text-gold-300 transition-colors"
                      aria-label="Enlarge Room Details"
                    >
                      <Maximize2 size={16} />
                    </button>
                  </div>
                </motion.div>

                {/* Secondary Photo Thumbnails */}
                <div className="grid grid-cols-2 gap-4">
                  {selectedRoom.secondaryImages?.map((img, i) => (
                    <div
                      key={i}
                      onClick={() => setActiveModalRoom(selectedRoom)}
                      className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 cursor-pointer group"
                    >
                      <img
                        src={img}
                        alt={`${selectedRoom.name} interior ${i + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-charcoal-950/30 group-hover:bg-transparent transition-colors" />
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Bottom Bar: Prev/Next Stage & Stage Indicator */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <div className="flex items-center gap-3">
            <button
              onClick={prevStage}
              disabled={activeStage === 0}
              aria-label="Previous Stage"
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                activeStage === 0
                  ? 'opacity-30 cursor-not-allowed bg-white/5 text-sand-500'
                  : 'bg-charcoal-900/80 hover:bg-gold-500 border border-white/15 text-cream-100 hover:text-charcoal-950 active:scale-95'
              }`}
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={nextStage}
              disabled={activeStage === stages.length - 1}
              aria-label="Next Stage"
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                activeStage === stages.length - 1
                  ? 'opacity-30 cursor-not-allowed bg-white/5 text-sand-500'
                  : 'bg-charcoal-900/80 hover:bg-gold-500 border border-white/15 text-cream-100 hover:text-charcoal-950 active:scale-95'
              }`}
            >
              <ChevronRight size={18} />
            </button>

            <span className="text-xs font-mono text-sand-400 pl-2">
              CHAPTER {currentStage.number} / 0{stages.length}
            </span>
          </div>

          {/* Quick jump to Family Section */}
          <button
            onClick={() => {
              const el = document.getElementById('family');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest text-sand-300 hover:text-gold-300 transition-colors font-medium"
          >
            <span>Proceed to Family Experiences</span>
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>

      {/* Right-Edge Vertical Progress Rail (inspired by Rooms.mp4 vertical track) */}
      <div className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-4 pointer-events-auto">
        <div className="relative flex flex-col items-center gap-5 py-4 px-2 rounded-full bg-charcoal-950/70 backdrop-blur-md border border-white/10 shadow-2xl">
          {stages.map((stage, idx) => (
            <button
              key={`rail-${stage.id}`}
              onClick={() => {
                setActiveStage(idx);
                setActiveHotspot(null);
              }}
              title={stage.label}
              className="group relative flex items-center justify-center"
            >
              {/* Dot */}
              <span
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeStage === idx
                    ? 'bg-gold-400 ring-4 ring-gold-400/25 scale-125'
                    : 'bg-white/30 hover:bg-white/60'
                }`}
              />

              {/* Tooltip Label */}
              <span className="absolute right-7 px-2.5 py-1 rounded-md bg-charcoal-900/95 backdrop-blur-md border border-white/15 text-[10px] font-mono tracking-wider text-cream-50 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                {stage.number} • {stage.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Full Room Details Modal */}
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
