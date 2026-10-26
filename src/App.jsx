import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSection from './sections/HeroSection';
import RoomsSection from './sections/RoomsSection';
import ActivitiesSection from './sections/ActivitiesSection';
import ContactSection from './sections/ContactSection';
import AboutSection from './sections/AboutSection';
import BookingModal from './components/BookingModal';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedRoom, setPreselectedRoom] = useState(null);

  const scrollToSection = (id) => {
    const el = document.getElementById(id.replace('#', ''));
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookRoom = (room) => {
    setPreselectedRoom(room);
    setIsBookingOpen(true);
  };

  const handleOpenBooking = () => {
    setPreselectedRoom(null);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-cream-100 text-charcoal-900 font-sans selection:bg-gold-500 selection:text-white">
      {/* Fixed Luxury Navigation Header */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Main Website Experience with Smooth Scroll Flow */}
      <main>
        {/* 1. Landing Page (Scroll Animation based on Intro.mp4 reference) */}
        <HeroSection
          onExplore={() => scrollToSection('rooms')}
          onBook={handleOpenBooking}
        />

        {/* 2. Rooms Page (Architectural Scroll Experience based on Rooms.mp4 reference) */}
        <RoomsSection onBookRoom={handleBookRoom} />

        {/* 3. Family Page (Family Moments, Young Rangers, Cottages & Stargazing) */}
        <ActivitiesSection
          onInquireFamily={() => scrollToSection('contact')}
          onBookFamily={() => handleBookRoom(null)}
        />

        {/* 4. Contact Page (Direct Sanctuary Enquiries, Map, Concierge & FAQs) */}
        <ContactSection />

        {/* 5. About Us Last Page (Sanctuary Philosophy, 2,400-Acre Wilderness & Heritage) */}
        <AboutSection onExploreRooms={() => scrollToSection('rooms')} />
      </main>

      {/* Footer */}
      <Footer onNavClick={(href) => scrollToSection(href)} />

      {/* Global Luxury Reservation Drawer / Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedRoom={preselectedRoom}
      />
    </div>
  );
}
