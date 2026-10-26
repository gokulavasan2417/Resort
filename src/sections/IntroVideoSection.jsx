import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, FastForward, ArrowDown } from 'lucide-react';

const TOTAL_SCROLLS = 4;

export default function IntroVideoSection({ onComplete }) {
  const videoRef = useRef(null);
  const isCompletedRef = useRef(false);
  const scrollStepRef = useRef(0);
  const targetTimeRef = useRef(0);
  const rafRef = useRef(null);
  const wheelCooldownRef = useRef(false);

  const [scrollStep, setScrollStep] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Play smoothly to target time
  const animateToStep = (newStep) => {
    const video = videoRef.current;
    if (!video) return;

    const totalDuration = video.duration && !isNaN(video.duration) ? video.duration : 10.0;
    
    // Step 4 targets the exact last frame (duration - 0.05s) to stay on the final Happening Villa emblem
    const target =
      newStep === TOTAL_SCROLLS
        ? Math.max(0, totalDuration - 0.05)
        : (newStep / TOTAL_SCROLLS) * totalDuration;

    targetTimeRef.current = target;
    scrollStepRef.current = newStep;
    setScrollStep(newStep);

    if (newStep > 0) {
      setHasStarted(true);
    }

    if (newStep >= scrollStepRef.current) {
      // Play forward toward target checkpoint
      video.muted = true;
      video.playbackRate = 1.35; // Natural, cinematic playback speed

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      const checkTime = () => {
        if (!video) return;

        // When reached target or end of video
        if (video.currentTime >= targetTimeRef.current || video.ended) {
          video.pause();
          video.currentTime = targetTimeRef.current; // Freeze on exact frame

          if (newStep === TOTAL_SCROLLS) {
            isCompletedRef.current = true;
            setIsCompleted(true);
            document.body.style.overflow = ''; // Unlock body scroll
          }
        } else {
          rafRef.current = requestAnimationFrame(checkTime);
        }
      };

      rafRef.current = requestAnimationFrame(checkTime);
    } else {
      // Rewind backward step
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      video.pause();
      video.currentTime = target;

      if (isCompletedRef.current) {
        isCompletedRef.current = false;
        setIsCompleted(false);
        document.body.style.overflow = 'hidden';
      }
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Explicitly guarantee DOM muted status for browser autoplay compliance
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    // If loaded while scrolled, allow page scroll; otherwise lock until 4 scrolls complete
    if (window.scrollY > 80) {
      isCompletedRef.current = true;
      setIsCompleted(true);
    } else {
      document.body.style.overflow = 'hidden';
    }

    // Wheel event handler:
    // Exactly 4 scrolls down advance through the video to the final frame!
    const handleWheel = (e) => {
      if (!isCompletedRef.current) {
        e.preventDefault();

        if (Math.abs(e.deltaY) < 18) return;
        if (wheelCooldownRef.current) return;

        if (e.deltaY > 0) {
          // Scroll down -> advance 1 step (out of 4)
          if (scrollStepRef.current < TOTAL_SCROLLS) {
            wheelCooldownRef.current = true;
            const nextStep = scrollStepRef.current + 1;
            animateToStep(nextStep);
            setTimeout(() => {
              wheelCooldownRef.current = false;
            }, 600);
          }
        } else if (e.deltaY < 0) {
          // Scroll up -> rewind 1 step
          if (scrollStepRef.current > 0) {
            wheelCooldownRef.current = true;
            const prevStep = scrollStepRef.current - 1;
            animateToStep(prevStep);
            setTimeout(() => {
              wheelCooldownRef.current = false;
            }, 500);
          }
        }
      } else {
        // Video has completed and is staying on the last frame
        if (e.deltaY > 0) {
          // Scrolling down now proceeds to the Landing Page
          handleProceedToLanding();
        } else if (e.deltaY < 0 && window.scrollY <= 10) {
          // Scrolling up rewinds back to step 3
          e.preventDefault();
          isCompletedRef.current = false;
          setIsCompleted(false);
          document.body.style.overflow = 'hidden';
          animateToStep(TOTAL_SCROLLS - 1);
        }
      }
    };

    // Touch handlers for mobile
    let touchY = 0;
    const handleTouchStart = (e) => {
      touchY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (!isCompletedRef.current) {
        const deltaY = touchY - e.changedTouches[0].clientY;
        if (Math.abs(deltaY) > 35) {
          if (deltaY > 0 && scrollStepRef.current < TOTAL_SCROLLS) {
            animateToStep(scrollStepRef.current + 1);
          } else if (deltaY < 0 && scrollStepRef.current > 0) {
            animateToStep(scrollStepRef.current - 1);
          }
        }
      } else {
        const deltaY = touchY - e.changedTouches[0].clientY;
        if (deltaY > 35) {
          handleProceedToLanding();
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.body.style.overflow = '';
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
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

  return (
    <section
      id="intro-video"
      className="relative h-screen w-full overflow-hidden bg-charcoal-950 select-none cursor-pointer"
      onClick={() => {
        if (scrollStepRef.current < TOTAL_SCROLLS) {
          animateToStep(scrollStepRef.current + 1);
        }
      }}
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

      {/* Top Controls: Sound & Skip */}
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

      {/* 4-Scrolls Progress Indicator (Bottom Left) */}
      <div className="absolute bottom-10 left-6 sm:left-12 z-20 flex items-center gap-2 pointer-events-none">
        {[1, 2, 3, 4].map((stepNum) => (
          <div
            key={stepNum}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              scrollStep >= stepNum
                ? 'w-8 bg-gold-400 shadow-md shadow-gold-400/50'
                : 'w-3 bg-white/30'
            }`}
          />
        ))}
        <span className="text-[10px] font-mono tracking-widest text-gold-300/80 ml-2">
          {scrollStep}/4 SCROLLS
        </span>
      </div>

      {/* Initial Gentle Scroll Cue */}
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
              Scroll to Explore (4 Scrolls)
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

      {/* When 4 Scrolls Complete -> Stays on Final Frame + Prompt to Enter Landing Page */}
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
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 cursor-pointer flex flex-col items-center gap-2 group"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-gold-300 group-hover:text-white transition-colors font-medium drop-shadow-lg">
              Scroll Down To Enter Landing Page
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
