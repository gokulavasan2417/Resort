import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import IntroVideo from './components/IntroVideo';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import RoomsSection from './sections/RoomsSection';
import PoolSection from './sections/PoolSection';
import ActivitiesSection from './sections/ActivitiesSection';
import DiningSection from './sections/DiningSection';
import WellnessSection from './sections/WellnessSection';
import FacilitiesSection from './sections/FacilitiesSection';
import ExperiencesSection from './sections/ExperiencesSection';
import GallerySection from './sections/GallerySection';
import TestimonialsSection from './sections/TestimonialsSection';
import BookingSection from './sections/BookingSection';
import ContactSection from './sections/ContactSection';

export default function App() {
  // Show intro video once per visit
  const [showIntro, setShowIntro] = useState(true);
  const [preselectedRoom, setPreselectedRoom] = useState(null);

  const scrollToSection = (id) => {
    const el = document.getElementById(id.replace('#', ''));
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookRoom = (room) => {
    setPreselectedRoom(room);
    scrollToSection('booking');
  };

  const handleOpenBooking = () => {
    scrollToSection('booking');
  };

  return (
    <div className="min-h-screen bg-cream-100 text-charcoal-900 font-sans selection:bg-gold-500 selection:text-white">
      {/* Cinematic Intro Video Overlay */}
      <AnimatePresence mode="wait">
        {showIntro && (
          <IntroVideo onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      {/* Main Website Experience */}
      <div className={`transition-opacity duration-1000 ${showIntro ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar onOpenBooking={handleOpenBooking} />

        <main>
          <HeroSection
            onExplore={() => scrollToSection('about')}
            onBook={handleOpenBooking}
          />

          <AboutSection onExploreRooms={() => scrollToSection('rooms')} />

          <RoomsSection onBookRoom={handleBookRoom} />

          <PoolSection onBookStay={handleOpenBooking} />

          <ActivitiesSection onInquireFamily={() => scrollToSection('contact')} />

          <DiningSection onReserveTable={() => scrollToSection('contact')} />

          <WellnessSection onInquireWellness={() => scrollToSection('contact')} />

          <FacilitiesSection />

          <ExperiencesSection onBookExperience={() => scrollToSection('contact')} />

          <GallerySection />

          <TestimonialsSection />

          <BookingSection
            preselectedRoom={preselectedRoom}
            onClosePreselected={() => setPreselectedRoom(null)}
          />

          <ContactSection />
        </main>

        <Footer onNavClick={(href) => scrollToSection(href)} />
      </div>
    </div>
  );
}
