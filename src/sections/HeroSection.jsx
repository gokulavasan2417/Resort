import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Volume2,
  VolumeX,
  FastForward,
  Play,
  Pause,
  ArrowDown,
  Sparkles,
  Compass,
} from 'lucide-react';
import { resortInfo } from '../data/resortData';

export default function HeroSection({ onExplore, onBook }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  const [currentTimeStr, setCurrentTimeStr] = useState('00:00');
  const [durationStr, setDurationStr] = useState('00:10');
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isEnded, setIsEnded] = useState(false);

  // Format seconds to mm:ss
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // Set duration when metadata loads
    const handleLoadedMetadata = () => {
      setDurationStr(formatTime(video.duration));
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    if (video.duration) {
      setDurationStr(formatTime(video.duration));
    }

    // Update progress bar
    const handleTimeUpdate = () => {
      if (video.duration) {
        const pct = (video.currentTime / video.duration) * 100;
        setVideoProgress(pct);
        setCurrentTimeStr(formatTime(video.currentTime));
      }
    };
    video.addEventListener('timeupdate', handleTimeUpdate);

    const handleEnded = () => {
      setIsPlaying(false);
      setIsEnded(true);
    };
    video.addEventListener('ended', handleEnded);

    // Scroll-driven playback:
    // When user scrolls, video plays.
    // When user stops scrolling (180ms inactivity), video pauses.
    // When user scrolls again, video resumes playing.
    const handleScrollOrWheel = () => {
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Only respond when intro container is active/visible in viewport
      if (rect.bottom > 100 && rect.top <= 0) {
        setHasScrolled(true);

        // Play video while scrolling
        if (video.paused && !video.ended) {
          video
            .play()
            .then(() => {
              setIsPlaying(true);
            })
            .catch(() => {
              // Silently handle browser autoplay policy
            });
        }

        // Clear existing pause timeout
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        // Pause as soon as user stops scrolling (180ms debounce)
        scrollTimeoutRef.current = setTimeout(() => {
          if (video && !video.paused) {
            video.pause();
            setIsPlaying(false);
          }
        }, 180);
      } else if (rect.top > 0) {
        // User scrolled back to top
        if (!video.paused) {
          video.pause();
          setIsPlaying(false);
        }
      } else if (rect.bottom <= 0) {
        // User scrolled completely past intro
        if (!video.paused) {
          video.pause();
          setIsPlaying(false);
        }
      }
    };

    window.addEventListener('scroll', handleScrollOrWheel, { passive: true });
    window.addEventListener('wheel', handleScrollOrWheel, { passive: true });
    window.addEventListener('touchmove', handleScrollOrWheel, { passive: true });

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      window.removeEventListener('scroll', handleScrollOrWheel);
      window.removeEventListener('wheel', handleScrollOrWheel);
      window.removeEventListener('touchmove', handleScrollOrWheel);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSkipToRooms = () => {
    const roomsEl = document.getElementById('rooms');
    if (roomsEl) {
      roomsEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      onExplore();
    }
  };

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setIsEnded(false);
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[220vh] bg-charcoal-950 select-none"
    >
      {/* Sticky Fullscreen Video Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-charcoal-950 flex flex-col justify-between">
        
        {/* Main Background Video */}
        <video
          ref={videoRef}
          src="/videos/Main-8.mp4"
          className="absolute inset-0 w-full h-full object-cover transform-gpu will-change-transform"
          playsInline
          muted={isMuted}
          preload="auto"
        />

        {/* Cinematic Vignette Overlays for Maximum Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-transparent to-charcoal-950/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/60 via-transparent to-charcoal-950/60 pointer-events-none" />

        {/* Top Floating Controls Bar */}
        <div className="relative z-20 w-full max-w-[1700px] mx-auto px-6 sm:px-12 lg:px-20 pt-24 sm:pt-28 flex items-center justify-between">
          
          {/* Subtle Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-charcoal-950/70 backdrop-blur-md border border-gold-400/30 text-gold-300 text-[10px] sm:text-xs font-medium tracking-[0.25em] uppercase">
            <Sparkles size={11} className="text-gold-400" />
            <span>Cinematic Sanctuary Intro</span>
          </div>

          {/* Sound & Skip Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSound}
              aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
              className="p-2.5 rounded-full bg-charcoal-950/70 hover:bg-gold-500 hover:text-charcoal-950 text-white border border-white/20 hover:border-gold-400 backdrop-blur-md transition-all duration-300 active:scale-95 shadow-lg"
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>

            <button
              onClick={handleSkipToRooms}
              className="group inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-charcoal-950/70 hover:bg-gold-500 hover:text-charcoal-950 text-white border border-white/20 hover:border-gold-400 backdrop-blur-md text-xs uppercase tracking-widest font-medium transition-all duration-300 active:scale-95 shadow-lg"
            >
              <span>Skip to Rooms</span>
              <FastForward size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

        </div>

        {/* Center: Interactive Scroll Guidance Cue */}
        <div className="relative z-20 my-auto text-center px-4 pointer-events-none">
          <AnimatePresence>
            {!hasScrolled && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8 }}
                className="inline-flex flex-col items-center gap-3 p-6 sm:p-8 rounded-3xl bg-charcoal-950/75 backdrop-blur-xl border border-gold-400/30 shadow-2xl max-w-md mx-auto"
              >
                <div className="w-12 h-12 rounded-full border border-gold-400/40 flex items-center justify-center text-gold-300 animate-pulse">
                  <Play size={20} className="fill-gold-300 ml-0.5" />
                </div>
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl text-cream-50 font-normal">
                    Scroll To Play Cinematic Intro
                  </h2>
                  <p className="text-xs text-sand-300 font-light mt-1.5 leading-relaxed">
                    Scroll down to explore. Stopping your scroll pauses the cinematic; scrolling resumes playback.
                  </p>
                </div>
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="mt-1 flex items-center gap-1.5 text-[11px] font-mono text-gold-400 uppercase tracking-widest"
                >
                  <ArrowDown size={14} />
                  <span>Scroll Down</span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Replay Option when Ended */}
          {isEnded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex flex-col items-center gap-4 p-6 rounded-3xl bg-charcoal-950/80 backdrop-blur-xl border border-gold-400/40 shadow-2xl pointer-events-auto"
            >
              <h3 className="font-serif text-xl text-cream-50">
                Welcome to {resortInfo.brandName}
              </h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSkipToRooms}
                  className="px-6 py-3 rounded-full bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-bold text-xs uppercase tracking-widest transition-all shadow-lg"
                >
                  Proceed to Rooms (Page 2)
                </button>
                <button
                  onClick={handleReplay}
                  className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-wider font-medium transition-all"
                >
                  Replay Intro
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Bottom Bar: Live Playback Status & Video Progress Track */}
        <div className="relative z-20 w-full max-w-[1700px] mx-auto px-6 sm:px-12 lg:px-20 pb-8 sm:pb-10">
          <div className="p-4 sm:p-5 rounded-2xl bg-charcoal-950/80 backdrop-blur-xl border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xl">
            
            {/* Status indicator: Playing on Scroll / Paused */}
            <div className="flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  isPlaying
                    ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50 animate-ping'
                    : 'bg-amber-400/80'
                }`}
              />
              <span className="font-mono text-xs uppercase tracking-wider text-cream-100 font-medium">
                {isPlaying ? 'PLAYING ON SCROLL' : 'PAUSED • SCROLL TO ADVANCE'}
              </span>
            </div>

            {/* Video Progress Line */}
            <div className="flex-1 max-w-md sm:mx-6 flex items-center gap-3">
              <span className="font-mono text-[10px] text-sand-400 w-10 text-right">
                {currentTimeStr}
              </span>
              <div className="flex-1 h-[3px] bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-gold-500 to-amber-300 transition-all duration-100"
                  style={{ width: `${videoProgress}%` }}
                />
              </div>
              <span className="font-mono text-[10px] text-sand-400 w-10">
                {durationStr}
              </span>
            </div>

            {/* Action to proceed to page 2 */}
            <button
              onClick={handleSkipToRooms}
              className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-gold-500/20 hover:bg-gold-500 text-gold-300 hover:text-charcoal-950 border border-gold-400/40 text-xs font-semibold uppercase tracking-wider transition-all duration-300"
            >
              <span>Explore Page 2: Rooms</span>
              <ArrowDown size={14} />
            </button>

          </div>
        </div>

      </div>
    </section>
  );
}
