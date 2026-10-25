import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FastForward, Play } from 'lucide-react';

export default function IntroVideo({ onComplete }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const videoRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const startPlayback = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsLoading(false);
          })
          .catch((error) => {
            console.warn('Autoplay prevented:', error);
            setAutoplayBlocked(true);
            setIsLoading(false);
          });
      }
    };

    if (video.readyState >= 3) {
      startPlayback();
    } else {
      video.addEventListener('canplay', startPlayback, { once: true });
    }

    return () => {
      video.removeEventListener('canplay', startPlayback);
    };
  }, []);

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration && progressBarRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      const pct = (current / total) * 100;
      progressBarRef.current.style.width = `${pct}%`;
    }
  };

  const handleVideoEnded = () => {
    onComplete();
  };

  const handleSkip = () => {
    onComplete();
  };

  const handleManualPlay = () => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setAutoplayBlocked(false);
        })
        .catch((e) => {
          console.error('Playback failed', e);
          onComplete();
        });
    }
  };

  return (
    <motion.div
      key="intro-container"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.05,
        filter: 'blur(8px)',
        transition: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] },
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-950 overflow-hidden select-none"
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src="/videos/Main-8.mp4"
        className="absolute inset-0 w-full h-full object-cover transform-gpu will-change-transform"
        playsInline
        muted
        autoPlay
        preload="auto"
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnded}
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => setIsLoading(false)}
        onError={() => {
          console.warn('Video failed to load from /videos/Main-8.mp4, testing fallback');
          setHasError(true);
          setTimeout(onComplete, 2500);
        }}
      />

      {/* Subtle Resort Logo & Overlay Branding */}
      <div className="absolute top-10 left-0 right-0 flex flex-col items-center justify-center text-center pointer-events-none z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.3 }}
          className="flex items-center gap-3"
        >
          <div className="h-[1px] w-8 sm:w-16 bg-gold-400/40" />
          <span className="text-[10px] sm:text-xs tracking-[0.35em] uppercase text-gold-300/80 font-medium">
            SANCTUARY & LUXURY RETREAT
          </span>
          <div className="h-[1px] w-8 sm:w-16 bg-gold-400/40" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, delay: 0.5 }}
          className="font-serif text-2xl sm:text-4xl tracking-[0.25em] text-cream-50 font-light mt-2"
        >
          HAPPENING VILLA
        </motion.h1>
      </div>

      {/* Video Loading / Buffering State */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-charcoal-950/60 backdrop-blur-sm z-20 pointer-events-none">
          <div className="w-12 h-12 rounded-full border-2 border-gold-500/30 border-t-gold-400 animate-spin" />
          <p className="mt-4 text-xs tracking-[0.25em] uppercase text-sand-300">
            Entering the Sanctuary...
          </p>
        </div>
      )}

      {/* Fallback if Autoplay is blocked by browser */}
      {autoplayBlocked && !isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute z-30 flex flex-col items-center text-center p-6 bg-charcoal-900/80 backdrop-blur-md rounded-2xl border border-gold-500/30 max-w-sm"
        >
          <p className="text-sm text-sand-200 mb-4 font-light">
            Experience the opening cinematic presentation of Happening Villa.
          </p>
          <button
            onClick={handleManualPlay}
            className="flex items-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-medium text-xs uppercase tracking-widest rounded-full transition-all duration-300 shadow-lg shadow-gold-500/20"
          >
            <Play size={14} className="fill-charcoal-950" />
            Play Experience
          </button>
        </motion.div>
      )}

      {/* Error Fallback */}
      {hasError && (
        <div className="absolute z-30 text-center p-6 bg-charcoal-900/90 rounded-xl border border-red-500/30 text-sand-200">
          <p className="text-sm">Video experience loading alternative view...</p>
          <button
            onClick={handleSkip}
            className="mt-4 px-5 py-2 bg-gold-500 text-charcoal-950 text-xs font-semibold rounded-full"
          >
            Proceed to Sanctuary
          </button>
        </div>
      )}

      {/* Bottom Controls Bar: Progress & Skip */}
      <div className="absolute bottom-8 left-6 right-6 sm:left-12 sm:right-12 z-20 flex items-center justify-between gap-4">
        {/* Minimal Progress Indicator (Direct ref for zero re-renders) */}
        <div className="flex items-center flex-1 max-w-xs">
          <div className="w-full h-[2px] bg-white/20 rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full bg-gold-400 transition-all duration-150 ease-out"
              style={{ width: '0%' }}
            />
          </div>
        </div>

        {/* Minimal Skip Intro Button */}
        <button
          onClick={handleSkip}
          className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-charcoal-900/60 hover:bg-gold-500 text-sand-200 hover:text-charcoal-950 text-xs font-medium tracking-widest uppercase border border-gold-500/30 hover:border-gold-400 backdrop-blur-md transition-all duration-300"
        >
          <span>Skip Intro</span>
          <FastForward size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}
