import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, FastForward, ArrowDown } from 'lucide-react';
import { resortInfo } from '../data/resortData';

export default function IntroVideoSection({ onComplete }) {
  const videoRef = useRef(null);
  const pauseTimeoutRef = useRef(null);
  const isCompletedRef = useRef(false);

  const [isMuted, setIsMuted] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const playVideo = (speed = 1.0) => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playbackRate = speed;

    if (video.paused && !video.ended) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  };

  const pauseVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    if (!video.paused) {
      video.pause();
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Explicitly guarantee DOM muted status for browser autoplay compliance
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    // If user loaded the page already scrolled down, allow normal page scroll
    if (window.scrollY > 100) {
      isCompletedRef.current = true;
      setIsCompleted(true);
    } else {
      // Lock scroll while intro video is playing so scrolling plays the video FIRST
      document.body.style.overflow = 'hidden';
    }

    const handleTimeUpdate = () => {
      // When video reaches within 0.3s of the end (the Happening Villa logo frame)
      if (video.duration && video.currentTime >= video.duration - 0.3) {
        pauseVideo();
        isCompletedRef.current = true;
        setIsCompleted(true);
        document.body.style.overflow = ''; // Unlock page scroll to allow moving to Landing Page
      }
    };

    const handleEnded = () => {
      pauseVideo();
      isCompletedRef.current = true;
      setIsCompleted(true);
      document.body.style.overflow = '';
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    // Scroll wheel handler:
    // While video is not completed, scrolling down plays video forward.
    // Stopping scroll pauses video.
    // Once video completes, page scroll is restored to glide down to the Landing Page.
    const handleWheel = (e) => {
      if (!isCompletedRef.current) {
        e.preventDefault();
        setHasStarted(true);

        if (e.deltaY > 0) {
          // Scrolling down: Play video
          const speed = Math.abs(e.deltaY) > 80 ? 1.4 : Math.abs(e.deltaY) > 30 ? 1.2 : 1.0;
          playVideo(speed);

          if (pauseTimeoutRef.current) {
            clearTimeout(pauseTimeoutRef.current);
          }

          // Pause video when scrolling stops (220ms inactivity)
          pauseTimeoutRef.current = setTimeout(() => {
            pauseVideo();
          }, 220);
        } else if (e.deltaY < 0) {
          // Scrolling up: Rewind slightly
          pauseVideo();
          if (video) {
            video.currentTime = Math.max(0, video.currentTime - 0.4);
          }
        }
      }
    };

    // Touch handlers for mobile
    let touchStartY = 0;
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (!isCompletedRef.current) {
        const deltaY = touchStartY - e.touches[0].clientY;
        if (deltaY > 4) {
          e.preventDefault();
          setHasStarted(true);
          playVideo(1.1);

          if (pauseTimeoutRef.current) {
            clearTimeout(pauseTimeoutRef.current);
          }

          pauseTimeoutRef.current = setTimeout(() => {
            pauseVideo();
          }, 220);
        } else if (deltaY < -4) {
          e.preventDefault();
          pauseVideo();
          if (video) {
            video.currentTime = Math.max(0, video.currentTime - 0.3);
          }
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.body.style.overflow = '';
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

  const handleProceedToLanding = () => {
    isCompletedRef.current = true;
    setIsCompleted(true);
    document.body.style.overflow = '';
    onComplete();
  };

  const handleVideoClick = () => {
    setHasStarted(true);
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      playVideo();
    } else {
      pauseVideo();
    }
  };

  return (
    <section
      id="intro-video"
      className="relative h-screen w-full overflow-hidden bg-charcoal-950 select-none cursor-pointer"
      onClick={handleVideoClick}
    >
      {/* Fullscreen Video Element */}
      <video
        ref={videoRef}
        src="/videos/Main-8.mp4"
        className="absolute inset-0 w-full h-full object-cover transform-gpu will-change-transform"
        playsInline
        muted={isMuted}
        preload="auto"
      />

      {/* Subtle Cinematic Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-charcoal-950/40 pointer-events-none" />

      {/* Minimal Top Controls: Sound & Skip to Landing Page */}
      <div
        className="absolute top-24 right-6 sm:right-12 z-20 flex items-center gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={toggleSound}
          aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
          className="p-2.5 rounded-full bg-charcoal-950/60 hover:bg-gold-500 hover:text-charcoal-950 text-white border border-white/20 hover:border-gold-400 backdrop-blur-md transition-all duration-300 active:scale-95 shadow-lg"
        >
          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>

        <button
          onClick={handleProceedToLanding}
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-charcoal-950/60 hover:bg-gold-500 hover:text-charcoal-950 text-white border border-white/20 hover:border-gold-400 backdrop-blur-md text-[11px] uppercase tracking-widest font-medium transition-all duration-300 active:scale-95 shadow-lg"
        >
          <span>Skip to Landing Page</span>
          <FastForward size={13} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Initial Gentle Scroll Cue */}
      <AnimatePresence>
        {!hasStarted && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.6 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center gap-2"
          >
            <span className="text-[10px] tracking-[0.35em] uppercase text-cream-100/90 font-light drop-shadow-md">
              Scroll to Play Cinematic
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

      {/* When Intro Finishes -> Prompt to Enter Landing Page */}
      <AnimatePresence>
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            onClick={(e) => {
              e.stopPropagation();
              handleProceedToLanding();
            }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 cursor-pointer flex flex-col items-center gap-2 group"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-gold-300 group-hover:text-white transition-colors font-medium drop-shadow-lg">
              Scroll Down To Enter Sanctuary
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="p-2.5 rounded-full bg-charcoal-950/80 border border-gold-400/50 text-gold-300 group-hover:bg-gold-500 group-hover:text-charcoal-950 transition-all shadow-xl"
            >
              <ArrowDown size={16} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
