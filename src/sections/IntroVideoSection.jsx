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
  const canProceedAfterCompleteRef = useRef(false);
  const hasProceededRef = useRef(false);

  const [isMuted, setIsMuted] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  // Safely freeze on the exact last frame of the video
  const freezeOnLastFrame = () => {
    const video = videoRef.current;
    if (!video) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    video.pause();

    const duration = video.duration && !isNaN(video.duration) ? video.duration : 10.0;
    // Stay directly on the final frame (duration - 0.05s) displaying the Happening Luxury Villa emblem
    video.currentTime = Math.max(0, duration - 0.05);

    isCompletedRef.current = true;
    setIsCompleted(true);
    document.body.style.overflow = '';

    // Cooldown to prevent scroll momentum from the 4th scroll from immediately jumping away
    canProceedAfterCompleteRef.current = false;
    setTimeout(() => {
      canProceedAfterCompleteRef.current = true;
    }, 600);
  };

  const animateToStep = (newStep) => {
    const video = videoRef.current;
    if (!video) return;

    const totalDuration = video.duration && !isNaN(video.duration) ? video.duration : 10.0;
    
    // Step 4 targets the exact last frame (duration - 0.05s)
    const target =
      newStep >= TOTAL_SCROLLS
        ? Math.max(0, totalDuration - 0.05)
        : (newStep / TOTAL_SCROLLS) * totalDuration;

    targetTimeRef.current = target;
    scrollStepRef.current = newStep;

    if (newStep >= scrollStepRef.current) {
      // Play forward toward target checkpoint
      video.muted = true;
      video.playbackRate = 1.35;

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
          if (newStep >= TOTAL_SCROLLS) {
            freezeOnLastFrame();
          } else {
            video.pause();
            video.currentTime = targetTimeRef.current;
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
        canProceedAfterCompleteRef.current = false;
        document.body.style.overflow = 'hidden';
      }
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = false; // Never loop - must stay firmly on the last frame!

    if (window.scrollY > 80) {
      isCompletedRef.current = true;
      setIsCompleted(true);
      canProceedAfterCompleteRef.current = true;
    } else {
      document.body.style.overflow = 'hidden';
    }

    const handleEnded = () => {
      freezeOnLastFrame();
    };

    video.addEventListener('ended', handleEnded);

    const handleWheel = (e) => {
      if (hasProceededRef.current) return;
      if (!isCompletedRef.current) {
        e.preventDefault();

        if (Math.abs(e.deltaY) < 18) return;
        if (wheelCooldownRef.current) return;

        if (e.deltaY > 0) {
          // Scroll down -> advance step (1 to 4)
          if (scrollStepRef.current < TOTAL_SCROLLS) {
            wheelCooldownRef.current = true;
            const nextStep = scrollStepRef.current + 1;
            animateToStep(nextStep);
            setTimeout(() => {
              wheelCooldownRef.current = false;
            }, 600);
          }
        } else if (e.deltaY < 0) {
          // Scroll up -> rewind step
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
          // Only proceed after cooldown has elapsed so momentum from 4th scroll doesn't skip the last frame!
          if (canProceedAfterCompleteRef.current) {
            handleProceedToLanding();
          } else {
            e.preventDefault();
          }
        } else if (e.deltaY < 0 && window.scrollY <= 10) {
          // Scroll up rewinds back to step 3
          e.preventDefault();
          animateToStep(TOTAL_SCROLLS - 1);
        }
      }
    };

    let touchY = 0;
    const handleTouchStart = (e) => {
      touchY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (hasProceededRef.current) return;
      const deltaY = touchY - e.changedTouches[0].clientY;
      if (!isCompletedRef.current) {
        if (Math.abs(deltaY) > 35) {
          if (deltaY > 0 && scrollStepRef.current < TOTAL_SCROLLS) {
            animateToStep(scrollStepRef.current + 1);
          } else if (deltaY < 0 && scrollStepRef.current > 0) {
            animateToStep(scrollStepRef.current - 1);
          }
        }
      } else {
        if (deltaY > 35 && canProceedAfterCompleteRef.current) {
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
      video.removeEventListener('ended', handleEnded);
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
    if (hasProceededRef.current) return;
    hasProceededRef.current = true;
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
