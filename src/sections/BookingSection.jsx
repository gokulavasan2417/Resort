import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { roomsData } from '../data/resortData';
import { Calendar, Users, Home, CheckCircle2, AlertCircle, Sparkles, X, ArrowRight } from 'lucide-react';

export default function BookingSection({ preselectedRoom, onClosePreselected }) {
  // Format current date as YYYY-MM-DD for min date
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 3);
  const tomorrowStr = tomorrowDate.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(todayStr);
  const [checkOut, setCheckOut] = useState(tomorrowStr);
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [selectedRoomId, setSelectedRoomId] = useState(roomsData[0].id);
  const [errorMsg, setErrorMsg] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingSummary, setBookingSummary] = useState(null);

  // Sync when preselectedRoom is passed
  useEffect(() => {
    if (preselectedRoom) {
      setSelectedRoomId(preselectedRoom.id);
    }
  }, [preselectedRoom]);

  // Calculate nights
  const calculateNights = () => {
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const diffTime = outDate - inDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (inDate < today) {
      setErrorMsg('Check-in date cannot be in the past. Please select today or a future date.');
      return;
    }

    if (outDate <= inDate) {
      setErrorMsg('Check-out date must be at least one day after your check-in date.');
      return;
    }

    const room = roomsData.find((r) => r.id === selectedRoomId);
    const nights = calculateNights();

    setBookingSummary({
      roomName: room?.name,
      roomCategory: room?.category,
      checkIn,
      checkOut,
      nights,
      adults,
      children: childrenCount,
      estimatedTotal: room?.startingPrice
        ? `₹${(parseInt(room.startingPrice.replace(/\D/g, '')) * nights).toLocaleString('en-IN')}`
        : 'On Request',
      bookingRef: `HV-${Math.floor(100000 + Math.random() * 900000)}`,
    });

    setBookingConfirmed(true);
  };

  const currentRoom = roomsData.find((r) => r.id === selectedRoomId);

  return (
    <section id="booking" className="py-24 sm:py-32 bg-forest-900 text-cream-50 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-forest-800/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-400"
          >
            <span className="font-serif font-bold text-xs text-gold-400 leading-none">₹</span>
            <span>Direct Sanctuary Reservations</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="mt-3 font-serif text-3xl sm:text-5xl text-cream-50"
          >
            Reserve Your Haven
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-3 text-xs sm:text-sm text-sand-300 font-light"
          >
            Select your preferred dates and accommodation. Our concierge team ensures every arrival is tailored to perfection.
          </motion.p>
        </div>

        {/* Booking Interactive Card Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 rounded-3xl bg-forest-950/90 border border-gold-500/25 p-6 sm:p-10 shadow-2xl backdrop-blur-xl"
        >
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2.5">
              <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleBookingSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Check-In Date */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-sand-300 font-medium mb-2 flex items-center gap-1.5">
                  <Calendar size={12} className="text-gold-400" />
                  <span>Check-In Date</span>
                </label>
                <input
                  type="date"
                  min={todayStr}
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-forest-900 border border-gold-500/20 text-cream-50 text-xs sm:text-sm focus:outline-none focus:border-gold-400 transition-colors"
                  required
                />
              </div>

              {/* Check-Out Date */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-sand-300 font-medium mb-2 flex items-center gap-1.5">
                  <Calendar size={12} className="text-gold-400" />
                  <span>Check-Out Date</span>
                </label>
                <input
                  type="date"
                  min={checkIn || todayStr}
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-forest-900 border border-gold-500/20 text-cream-50 text-xs sm:text-sm focus:outline-none focus:border-gold-400 transition-colors"
                  required
                />
              </div>

              {/* Adults & Children */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-sand-300 font-medium mb-2 flex items-center gap-1.5">
                  <Users size={12} className="text-gold-400" />
                  <span>Guests</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full px-3 py-3 rounded-xl bg-forest-900 border border-gold-500/20 text-cream-50 text-xs focus:outline-none focus:border-gold-400 transition-colors"
                  >
                    {[1, 2, 3, 4, 6].map((n) => (
                      <option key={n} value={n} className="bg-forest-950 text-cream-50">
                        {n} Adult{n > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>

                  <select
                    value={childrenCount}
                    onChange={(e) => setChildrenCount(Number(e.target.value))}
                    className="w-full px-3 py-3 rounded-xl bg-forest-900 border border-gold-500/20 text-cream-50 text-xs focus:outline-none focus:border-gold-400 transition-colors"
                  >
                    {[0, 1, 2, 3].map((n) => (
                      <option key={n} value={n} className="bg-forest-950 text-cream-50">
                        {n} Child{n !== 1 ? 'ren' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Room Category Selection */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-sand-300 font-medium mb-2 flex items-center gap-1.5">
                  <Home size={12} className="text-gold-400" />
                  <span>Accommodation</span>
                </label>
                <select
                  value={selectedRoomId}
                  onChange={(e) => setSelectedRoomId(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-forest-900 border border-gold-500/20 text-cream-50 text-xs sm:text-sm focus:outline-none focus:border-gold-400 transition-colors"
                >
                  {roomsData.map((room) => (
                    <option key={room.id} value={room.id} className="bg-forest-950 text-cream-50">
                      {room.category} ({room.startingPrice})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Selected Room Preview Strip */}
            {currentRoom && (
              <div className="p-4 rounded-2xl bg-forest-900/60 border border-gold-500/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={currentRoom.image}
                    alt={currentRoom.name}
                    className="w-14 h-14 rounded-xl object-cover border border-gold-500/30"
                  />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-gold-400 font-medium">
                      Selected: {currentRoom.category}
                    </span>
                    <h4 className="font-serif text-base text-cream-50 font-normal">{currentRoom.name}</h4>
                    <span className="text-xs text-sand-300/80">{currentRoom.capacity} • {currentRoom.roomSize}</span>
                  </div>
                </div>

                <div className="text-right flex items-center gap-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-sand-400 block">Stay Duration</span>
                    <span className="text-sm font-medium text-gold-300 font-mono">
                      {calculateNights()} Night{calculateNights() !== 1 ? 's' : ''}
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-charcoal-950 text-xs uppercase tracking-widest font-semibold transition-all shadow-lg shadow-gold-500/20 flex items-center gap-2 group"
                  >
                    <span>Check Availability</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}
          </form>

          {/* Clear explanation of enquiry-based demonstration reservation flow */}
          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <p className="text-[11px] text-sand-300/70 font-light">
              Demonstration Booking System: Submissions create an enquiry summary. In production, this connects to your property management system (PMS) or booking engine.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {bookingConfirmed && bookingSummary && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setBookingConfirmed(false)}
              className="fixed inset-0 bg-charcoal-950/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-cream-50 text-charcoal-950 rounded-2xl p-6 sm:p-8 shadow-2xl z-10 border border-sand-300"
            >
              <button
                onClick={() => setBookingConfirmed(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-sand-200 text-charcoal-800 transition-colors"
              >
                <X size={18} />
              </button>

              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-forest-900 text-gold-400 mx-auto flex items-center justify-center mb-4">
                  <CheckCircle2 size={24} />
                </div>

                <span className="text-[10px] uppercase tracking-widest text-gold-700 font-semibold block">
                  Reservation Enquiry Recorded
                </span>
                <h3 className="font-serif text-2xl text-forest-900 mt-1">
                  Sanctuary Stay Summary
                </h3>
                <p className="text-xs font-mono text-sand-600 mt-1">
                  Enquiry Reference: {bookingSummary.bookingRef}
                </p>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-sand-100/70 border border-sand-200 space-y-2.5 text-xs">
                <div className="flex justify-between py-1 border-b border-sand-200">
                  <span className="text-sand-600">Selected Room</span>
                  <span className="font-medium text-forest-900">{bookingSummary.roomName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-sand-200">
                  <span className="text-sand-600">Category</span>
                  <span className="font-medium text-forest-900">{bookingSummary.roomCategory}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-sand-200">
                  <span className="text-sand-600">Dates</span>
                  <span className="font-medium text-forest-900">
                    {bookingSummary.checkIn} to {bookingSummary.checkOut} ({bookingSummary.nights} Nights)
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-sand-200">
                  <span className="text-sand-600">Party</span>
                  <span className="font-medium text-forest-900">
                    {bookingSummary.adults} Adults, {bookingSummary.children} Children
                  </span>
                </div>
                <div className="flex justify-between py-1 font-semibold text-sm text-forest-900">
                  <span>Estimated Total</span>
                  <span className="text-gold-800">{bookingSummary.estimatedTotal}</span>
                </div>
              </div>

              <p className="mt-4 text-[11px] text-sand-600 leading-relaxed text-center">
                This is a frontend demonstration enquiry. Our guest relations team would ordinarily reach out within 2 hours to confirm personalized concierge requests and arrange airport transfers.
              </p>

              <button
                onClick={() => setBookingConfirmed(false)}
                className="mt-6 w-full py-3 rounded-full bg-forest-900 hover:bg-forest-800 text-white text-xs uppercase tracking-widest font-semibold transition-colors"
              >
                Close Summary
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
