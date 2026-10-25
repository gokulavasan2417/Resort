import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { resortInfo, faqsData, roomsData } from '../data/resortData';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Compass,
  ChevronDown,
  Send,
  CheckCircle,
  AlertCircle,
  Navigation,
} from 'lucide-react';

export default function ContactSection() {
  const [activeFaq, setActiveFaq] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    arrival: '',
    departure: '',
    adults: '2',
    children: '0',
    preferredRoom: roomsData[0].category,
    specialRequests: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Full name is required.';
    if (!formData.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please provide a valid email format.';
    }
    if (!formData.phone.trim()) errors.phone = 'Contact telephone is required.';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-cream-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-700 block"
          >
            Location & Bespoke Enquiries
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="mt-3 font-serif text-3xl sm:text-5xl text-forest-900"
          >
            Connect With Our Sanctuary
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-3 text-xs sm:text-sm text-sand-700 font-light max-w-xl mx-auto"
          >
            Whether planning a restorative personal retreat, private celebration, or helicopter transfer, our guest relations team is dedicated to your journey.
          </motion.p>
        </div>

        {/* 2-Column Layout: Contact Details & Interactive Form */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left: Contact Info, Map Card & FAQs */}
          <div className="lg:col-span-5 space-y-8">
            {/* Quick Details Box */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-sand-300/70 shadow-md space-y-5">
              <h3 className="font-serif text-xl text-forest-900">Sanctuary Contacts</h3>

              <div className="space-y-4 text-xs sm:text-sm text-sand-800 font-light">
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-sand-100 text-gold-700 mt-0.5">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-sand-500 font-medium">Estate Address</span>
                    <span className="text-forest-900 font-medium">{resortInfo.location}</span>
                    <span className="block text-[11px] text-sand-500 mt-0.5 font-mono">{resortInfo.coordinates}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-sand-100 text-gold-700 mt-0.5">
                    <Phone size={16} />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-sand-500 font-medium">Direct Telephone</span>
                    <a href={`tel:${resortInfo.contactPhone}`} className="text-forest-900 font-medium hover:text-gold-700 transition-colors">
                      {resortInfo.contactPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-sand-100 text-gold-700 mt-0.5">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-sand-500 font-medium">Concierge Email</span>
                    <a href={`mailto:${resortInfo.contactEmail}`} className="text-forest-900 font-medium hover:text-gold-700 transition-colors">
                      {resortInfo.contactEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-sand-100 text-gold-700 mt-0.5">
                    <Clock size={16} />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-sand-500 font-medium">Check-In & Check-Out</span>
                    <span className="text-forest-900">Check-in from {resortInfo.checkInTime} • Check-out at {resortInfo.checkOutTime}</span>
                  </div>
                </div>
              </div>

              {/* Get Directions CTA */}
              <div className="pt-2">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-forest-900 hover:bg-forest-800 text-gold-300 hover:text-white text-xs uppercase tracking-widest font-medium transition-all flex items-center justify-center gap-2"
                >
                  <Navigation size={14} />
                  <span>Get Driving Directions</span>
                </a>
              </div>
            </div>

            {/* Stylized Map View Card */}
            <div className="rounded-3xl overflow-hidden bg-forest-950 text-cream-50 p-6 border border-gold-500/20 shadow-lg relative aspect-[16/9] flex flex-col justify-end">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="relative z-10">
                <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold">Estate Geography</span>
                <p className="font-serif text-lg text-cream-50 mt-1">Chennai Coastal Crest</p>
                <p className="text-xs text-sand-300 mt-1 font-light">
                  {resortInfo.airportDistance}
                </p>
              </div>
            </div>

            {/* Frequently Asked Questions Accordion */}
            <div className="space-y-3">
              <h4 className="font-serif text-lg text-forest-900">Frequently Inquired</h4>
              {faqsData.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-sand-300/70 bg-white overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-5 py-3.5 text-left flex items-center justify-between text-xs sm:text-sm font-medium text-forest-900 hover:text-gold-700 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      size={16}
                      className={`text-gold-600 transition-transform duration-300 ${
                        activeFaq === idx ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {activeFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-4 text-xs text-sand-700 leading-relaxed font-light border-t border-sand-200/50 pt-2">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Guest Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-3xl bg-white border border-sand-300/80 shadow-xl">
              <span className="text-[10px] uppercase tracking-widest text-gold-700 font-semibold block">
                Direct Guest Liaison
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-forest-900 mt-1">
                Personalized Retreat Enquiry
              </h3>
              <p className="text-xs sm:text-sm text-sand-700 font-light mt-2 leading-relaxed">
                Provide your travel details below and our concierge team will curate a tailored proposal for your stay.
              </p>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 p-8 rounded-2xl bg-forest-900 text-cream-50 text-center space-y-4"
                >
                  <div className="w-12 h-12 rounded-full bg-gold-500 text-charcoal-950 mx-auto flex items-center justify-center">
                    <CheckCircle size={24} />
                  </div>
                  <h4 className="font-serif text-xl sm:text-2xl text-cream-50">
                    Enquiry Recorded Successfully
                  </h4>
                  <p className="text-xs sm:text-sm text-sand-200 font-light leading-relaxed max-w-md mx-auto">
                    Thank you, <strong className="text-gold-300">{formData.name}</strong>. This frontend demonstration form has validated your input. In production, this instantly notifies the Head of Guest Relations.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        arrival: '',
                        departure: '',
                        adults: '2',
                        children: '0',
                        preferredRoom: roomsData[0].category,
                        specialRequests: '',
                      });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-full bg-cream-50 text-forest-950 text-xs uppercase tracking-widest font-semibold hover:bg-gold-300 transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-sand-700 font-medium mb-1.5">
                        Guest Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Lady Evelyn Montgomery"
                        className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm bg-sand-50/50 focus:outline-none transition-colors ${
                          formErrors.name ? 'border-red-500 bg-red-50/30' : 'border-sand-300 focus:border-forest-900'
                        }`}
                      />
                      {formErrors.name && (
                        <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle size={11} /> {formErrors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-sand-700 font-medium mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. evelyn@sanctuary.com"
                        className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm bg-sand-50/50 focus:outline-none transition-colors ${
                          formErrors.email ? 'border-red-500 bg-red-50/30' : 'border-sand-300 focus:border-forest-900'
                        }`}
                      />
                      {formErrors.email && (
                        <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle size={11} /> {formErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Phone & Preferred Room */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-sand-700 font-medium mb-1.5">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 019-2834"
                        className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm bg-sand-50/50 focus:outline-none transition-colors ${
                          formErrors.phone ? 'border-red-500 bg-red-50/30' : 'border-sand-300 focus:border-forest-900'
                        }`}
                      />
                      {formErrors.phone && (
                        <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle size={11} /> {formErrors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-sand-700 font-medium mb-1.5">
                        Preferred Sanctuary
                      </label>
                      <select
                        name="preferredRoom"
                        value={formData.preferredRoom}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-sand-300 text-xs sm:text-sm bg-sand-50/50 focus:outline-none focus:border-forest-900"
                      >
                        {roomsData.map((room) => (
                          <option key={room.id} value={room.category}>
                            {room.category} ({room.name})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Dates: Arrival & Departure */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-sand-700 font-medium mb-1.5">
                        Estimated Arrival
                      </label>
                      <input
                        type="date"
                        name="arrival"
                        value={formData.arrival}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-sand-300 text-xs sm:text-sm bg-sand-50/50 focus:outline-none focus:border-forest-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-sand-700 font-medium mb-1.5">
                        Estimated Departure
                      </label>
                      <input
                        type="date"
                        name="departure"
                        value={formData.departure}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-sand-300 text-xs sm:text-sm bg-sand-50/50 focus:outline-none focus:border-forest-900"
                      />
                    </div>
                  </div>

                  {/* Adults & Children Selection */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-sand-700 font-medium mb-1.5">
                        Adults
                      </label>
                      <select
                        name="adults"
                        value={formData.adults}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-sand-300 text-xs bg-sand-50/50 focus:outline-none focus:border-forest-900"
                      >
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                          <option key={n} value={n}>
                            {n} Adult{n > 1 ? 's' : ''}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-sand-700 font-medium mb-1.5">
                        Children
                      </label>
                      <select
                        name="children"
                        value={formData.children}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-sand-300 text-xs bg-sand-50/50 focus:outline-none focus:border-forest-900"
                      >
                        {[0, 1, 2, 3, 4].map((n) => (
                          <option key={n} value={n}>
                            {n} Child{n !== 1 ? 'ren' : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-sand-700 font-medium mb-1.5">
                      Bespoke Requests & Dietary Needs
                    </label>
                    <textarea
                      name="specialRequests"
                      rows={3}
                      value={formData.specialRequests}
                      onChange={handleInputChange}
                      placeholder="e.g. Private airport helicopter transfer, sommelier champagne greeting, vegan menu requirements..."
                      className="w-full px-4 py-3 rounded-xl border border-sand-300 text-xs sm:text-sm bg-sand-50/50 focus:outline-none focus:border-forest-900 resize-none"
                    />
                  </div>

                  <p className="text-[11px] text-sand-600 leading-relaxed font-light">
                    * By submitting this enquiry, you acknowledge that this is a frontend demonstration showcase.
                  </p>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-forest-900 hover:bg-forest-800 text-gold-300 hover:text-white font-medium text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 group"
                  >
                    <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                    <span>Submit Sanctuary Enquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
