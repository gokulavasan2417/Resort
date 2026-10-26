import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, FastForward, ArrowDown } from 'lucide-react';

export default function HeroSection({ onExplore }) {
  const videoRef = useRef(null);
  const pauseTimeoutRef = useRef(null);
  const isCompletedRef = useRef(false);

  const [isMuted, setIsMuted] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // If user loaded the page already scrolled down, allow normal scroll
    if (window.scrollY > 80) {
      isCompletedRef.current = true;
      setIsCompleted(true);
    }

    const handleTimeUpdate = () => {
      // When video reaches within 0.3s of the end (the Happening Villa logo frame)
      if (video.duration && video.currentTime >= video.duration - 0.3) {
        video.pause();
        isCompletedRef.current = true;
        setIsCompleted(true);
      }
    };

    const handleEnded = () => {
      isCompletedRef.current = true;
      setIsCompleted(true);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    // Scroll wheel handler:
    // When at the top of the page and video has not completed:
    // Intercept scroll so page DOES NOT move to the next page!
    // Instead: scrolling plays the video forward!
    // Stopping scroll pauses the video!
    // When video completes, normal page scroll is restored to move to Page 2.
    const handleWheel = (e) => {
      // If user is at top of page and video hasn't finished:
      if (window.scrollY <= 15 && !isCompletedRef.current) {
        if (e.deltaY > 0) {
          // User scrolling down: lock page scroll and play video
          e.preventDefault();
          setHasStarted(true);

          // Dynamic playback rate based on scroll intensity
          if (Math.abs(e.deltaY) > 80) {
            video.playbackRate = 1.4;
          } else if (Math.abs(e.deltaY) > 30) {
            video.playbackRate = 1.15;
          } else {
            video.playbackRate = 1.0;
          }

          if (video.paused && !video.ended) {
            video.play().catch(() => {});
          }

          // Clear existing pause timer
          if (pauseTimeoutRef.current) {
            clearTimeout(pauseTimeoutRef.current);
          }

          // Pause video when scrolling stops (200ms inactivity)
          pauseTimeoutRef.current = setTimeout(() => {
            if (video && !video.paused) {
              video.pause();
            }
          }, 200);
        } else if (e.deltaY < 0) {
          // User scrolling up: gently rewind video
          e.preventDefault();
          video.pause();
          video.currentTime = Math.max(0, video.currentTime - 0.35);
          if (isCompletedRef.current) {
            isCompletedRef.current = false;
            setIsCompleted(false);
          }
        }
      }
    };

    // Touch handling for mobile
    let touchStartY = 0;
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (window.scrollY <= 15 && !isCompletedRef.current) {
        const deltaY = touchStartY - e.touches[0].clientY;
        if (deltaY > 5) {
          // Swiping up to scroll down
          e.preventDefault();
          setHasStarted(true);

          if (video.paused && !video.ended) {
            video.play().catch(() => {});
          }

          if (pauseTimeoutRef.current) {
            clearTimeout(pauseTimeoutRef.current);
          }

          pauseTimeoutRef.current = setTimeout(() => {
            if (video && !video.paused) {
              video.pause();
            }
          }, 220);
        } else if (deltaY < -5) {
          e.preventDefault();
          video.pause();
          video.currentTime = Math.max(0, video.currentTime - 0.3);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSkip = () => {
    isCompletedRef.current = true;
    setIsCompleted(true);
    const roomsEl = document.getElementById('rooms');
    if (roomsEl) {
      roomsEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      onExplore();
    }
  };

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-charcoal-950 select-none"
    >
      {/* Fullscreen Cinematic Main-8 Video */}
      <video
        ref={videoRef}
        src="/videos/Main-8.mp4"
        className="absolute inset-0 w-full h-full object-cover transform-gpu will-change-transform"
        playsInline
        muted={isMuted}
        preload="auto"
      />

      {/* Subtle Cinematic Vignette for Ambient Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-charcoal-950/40 pointer-events-none" />

      {/* Top Controls: Sound & Skip Button (Clean, unobtrusive) */}
      <div className="absolute top-24 right-6 sm:right-12 z-20 flex items-center gap-3">
        <button
          onClick={toggleSound}
          aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
          className="p-2.5 rounded-full bg-charcoal-950/60 hover:bg-gold-500 hover:text-charcoal-950 text-white border border-white/20 hover:border-gold-400 backdrop-blur-md transition-all duration-300 active:scale-95 shadow-lg"
        >
          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>

        <button
          onClick={handleSkip}
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-charcoal-950/60 hover:bg-gold-500 hover:text-charcoal-950 text-white border border-white/20 hover:border-gold-400 backdrop-blur-md text-[11px] uppercase tracking-widest font-medium transition-all duration-300 active:scale-95 shadow-lg"
        >
          <span>Skip to Rooms</span>
          <FastForward size={13} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Initial Subtle Scroll Cue (Fades out once user begins scrolling) */}
      <AnimatePresence>
        {!hasStarted && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.6 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center gap-2"
          >
            <span className="text-[10px] tracking-[0.35em] uppercase text-cream-100/90 font-light drop-shadow-md">
              Scroll to Play
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              className="w-5 h-8 rounded-full border border-white/40 flex items-start justify-center p-1"
            >
              <div className="w-1 h-2 bg-gold-400 rounded-full" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Completion Cue: Appears when video finishes on the Happening Villa logo */}
      <AnimatePresence>
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            onClick={handleSkip}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 cursor-pointer flex flex-col items-center gap-2 group"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-gold-300 group-hover:text-white transition-colors font-medium drop-shadow-lg">
              Scroll Down To Explore Rooms
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="p-2 rounded-full bg-charcoal-950/70 border border-gold-400/50 text-gold-300 group-hover:bg-gold-500 group-hover:text-charcoal-950 transition-all shadow-xl"
            >
              <ArrowDown size={16} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
