import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { roomsData, resortInfo } from '../data/resortData';
import {
  Calendar,
  Users,
  Home,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  X,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export default function BookingModal({ isOpen, onClose, preselectedRoom }) {
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 3);
  const tomorrowStr = tomorrowDate.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(todayStr);
  const [checkOut, setCheckOut] = useState(tomorrowStr);
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [selectedRoomId, setSelectedRoomId] = useState(roomsData[0].id);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingSummary, setBookingSummary] = useState(null);

  useEffect(() => {
    if (preselectedRoom) {
      setSelectedRoomId(preselectedRoom.id);
    }
  }, [preselectedRoom]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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
      setErrorMsg('Check-in date cannot be in the past.');
      return;
    }

    if (outDate <= inDate) {
      setErrorMsg('Check-out date must be at least one day after check-in.');
      return;
    }

    const room = roomsData.find((r) => r.id === selectedRoomId);
    const nights = calculateNights();

    setBookingSummary({
      guestName,
      guestEmail,
      guestPhone,
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

  const handleReset = () => {
    setBookingConfirmed(false);
    setBookingSummary(null);
    onClose();
  };

  const currentRoom = roomsData.find((r) => r.id === selectedRoomId) || roomsData[0];
  const nights = calculateNights();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-charcoal-950/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-3xl rounded-3xl bg-forest-950 text-cream-50 border border-gold-500/30 shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
          >
            {/* Modal Header */}
            <div className="p-6 sm:p-8 border-b border-white/10 flex items-center justify-between bg-charcoal-950/50">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-gold-400">
                  <Sparkles size={11} />
                  <span>{resortInfo.brandName} Direct Reservations</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-cream-50 mt-1">
                  Reserve Your Haven
                </h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="p-2 rounded-full bg-white/10 hover:bg-gold-500 hover:text-charcoal-950 transition-colors text-cream-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
              {bookingConfirmed && bookingSummary ? (
                /* Confirmation Screen */
                <div className="text-center py-6 space-y-6">
                  <div className="w-16 h-16 rounded-full bg-gold-500/20 text-gold-400 border border-gold-400/40 flex items-center justify-center mx-auto">
                    <CheckCircle2 size={36} />
                  </div>

                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-gold-400">
                      Booking Request Recorded
                    </span>
                    <h4 className="font-serif text-3xl text-cream-50 mt-1">
                      Sanctuary Awaits Your Arrival
                    </h4>
                    <p className="text-xs sm:text-sm text-sand-300 font-light max-w-md mx-auto mt-2 leading-relaxed">
                      Your direct reservation has been placed. Our host team will contact you within 2 business hours to confirm flight arrivals and personalized sanctuary amenities.
                    </p>
                  </div>

                  {/* Summary Card */}
                  <div className="p-6 rounded-2xl bg-forest-900/80 border border-gold-500/20 text-left max-w-md mx-auto space-y-3 text-xs">
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-sand-400">Reservation Reference</span>
                      <span className="font-mono text-gold-300 font-bold">{bookingSummary.bookingRef}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-sand-400">Residence</span>
                      <span className="text-cream-100 font-medium">{bookingSummary.roomName}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-sand-400">Stay Duration</span>
                      <span className="text-cream-100">{bookingSummary.checkIn} → {bookingSummary.checkOut} ({bookingSummary.nights} nights)</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-sand-400">Guests</span>
                      <span className="text-cream-100">{bookingSummary.adults} Adults{bookingSummary.children > 0 ? `, ${bookingSummary.children} Children` : ''}</span>
                    </div>
                    <div className="flex justify-between pt-1 text-sm">
                      <span className="text-gold-300 font-medium">Estimated Sanctuary Total</span>
                      <span className="font-bold text-gold-300">{bookingSummary.estimatedTotal}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleReset}
                    className="px-8 py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-bold text-xs uppercase tracking-widest transition-all"
                  >
                    Done & Return to Site
                  </button>
                </div>
              ) : (
                /* Booking Form */
                <form onSubmit={handleBookingSubmit} className="space-y-6">
                  {errorMsg && (
                    <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                      <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Room Selection Carousel Tabs */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-sand-300 font-medium mb-2.5">
                      1. Select Your Accommodation
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {roomsData.map((room) => (
                        <button
                          key={room.id}
                          type="button"
                          onClick={() => setSelectedRoomId(room.id)}
                          className={`p-3 rounded-2xl text-left transition-all border ${
                            selectedRoomId === room.id
                              ? 'bg-gold-500/20 border-gold-400 text-cream-50 shadow-md shadow-gold-500/10'
                              : 'bg-forest-900/60 border-white/10 text-sand-300 hover:bg-forest-900'
                          }`}
                        >
                          <div className="text-[10px] font-mono text-gold-400 uppercase tracking-widest line-clamp-1">
                            {room.category}
                          </div>
                          <div className="font-serif text-xs sm:text-sm font-medium mt-0.5 line-clamp-1">
                            {room.name.split(' ')[0]} {room.name.split(' ')[1]}
                          </div>
                          <div className="text-[11px] text-sand-400 mt-1 font-mono">
                            {room.startingPrice}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dates & Guests */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-sand-300 mb-1.5 flex items-center gap-1">
                        <Calendar size={11} className="text-gold-400" />
                        <span>Check-In</span>
                      </label>
                      <input
                        type="date"
                        min={todayStr}
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-forest-900 border border-gold-500/25 text-cream-50 text-xs focus:outline-none focus:border-gold-400"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-sand-300 mb-1.5 flex items-center gap-1">
                        <Calendar size={11} className="text-gold-400" />
                        <span>Check-Out</span>
                      </label>
                      <input
                        type="date"
                        min={checkIn || todayStr}
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-forest-900 border border-gold-500/25 text-cream-50 text-xs focus:outline-none focus:border-gold-400"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-sand-300 mb-1.5 flex items-center gap-1">
                        <Users size={11} className="text-gold-400" />
                        <span>Adults</span>
                      </label>
                      <select
                        value={adults}
                        onChange={(e) => setAdults(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-forest-900 border border-gold-500/25 text-cream-50 text-xs focus:outline-none focus:border-gold-400"
                      >
                        <option value={1}>1 Adult</option>
                        <option value={2}>2 Adults</option>
                        <option value={3}>3 Adults</option>
                        <option value={4}>4 Adults</option>
                        <option value={6}>5+ Adults (Villa)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-sand-300 mb-1.5 flex items-center gap-1">
                        <Users size={11} className="text-gold-400" />
                        <span>Children</span>
                      </label>
                      <select
                        value={childrenCount}
                        onChange={(e) => setChildrenCount(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-forest-900 border border-gold-500/25 text-cream-50 text-xs focus:outline-none focus:border-gold-400"
                      >
                        <option value={0}>0 Children</option>
                        <option value={1}>1 Child</option>
                        <option value={2}>2 Children</option>
                        <option value={3}>3+ Children</option>
                      </select>
                    </div>
                  </div>

                  {/* Guest Contact Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-sand-300 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="Lord / Lady / Dr."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-forest-900 border border-white/15 text-cream-50 text-xs focus:outline-none focus:border-gold-400"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-sand-300 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        placeholder="you@domain.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-forest-900 border border-white/15 text-cream-50 text-xs focus:outline-none focus:border-gold-400"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-sand-300 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        placeholder="+91 / International"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-forest-900 border border-white/15 text-cream-50 text-xs focus:outline-none focus:border-gold-400"
                        required
                      />
                    </div>
                  </div>

                  {/* Summary Bar & Submit */}
                  <div className="p-4 rounded-2xl bg-forest-900/90 border border-gold-400/25 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-mono text-sand-400 uppercase block">
                        Estimated {nights} Night Sanctuary Stay
                      </span>
                      <div className="font-serif text-xl sm:text-2xl text-gold-300 font-bold">
                        ₹{(parseInt(currentRoom.startingPrice.replace(/\D/g, '')) * (nights || 1)).toLocaleString('en-IN')}
                        <span className="text-xs font-normal text-sand-400 ml-1.5 font-sans">(includes taxes & breakfast)</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl shadow-gold-500/25 active:scale-95"
                    >
                      <ShieldCheck size={16} />
                      <span>Confirm Reservation</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
