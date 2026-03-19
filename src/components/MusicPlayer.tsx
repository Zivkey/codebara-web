"use client";

import { useRef, useState, useEffect } from "react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.08);
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        setIsPlaying(false);
        const startOnClick = () => {
          audioRef.current?.play();
          setIsPlaying(true);
          document.removeEventListener("click", startOnClick);
        };
        document.addEventListener("click", startOnClick);
      });
    }
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      className="relative flex items-center gap-2"
      onMouseEnter={() => setShowSlider(true)}
      onMouseLeave={() => setShowSlider(false)}
    >
      <audio ref={audioRef} src="/audio/jazz.mp3" loop preload="auto" />

      <button
        onClick={togglePlay}
        className="flex items-center gap-2 text-cream/50 hover:text-capybara transition-colors"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isPlaying ? "#C4813A" : "rgba(240,230,210,0.3)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          {isPlaying && (
            <>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </>
          )}
        </svg>
      </button>

      <div
        className="overflow-hidden flex items-center transition-all duration-200"
        style={{ width: showSlider ? 80 : 0, opacity: showSlider ? 1 : 0 }}
      >
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-full h-[3px] appearance-none bg-cream/20 rounded-full cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-capybara [&::-webkit-slider-thumb]:shadow-[0_0_6px_rgba(196,129,58,0.5)] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-capybara/80 [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-capybara [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-capybara/80 [&::-moz-range-thumb]:shadow-[0_0_6px_rgba(196,129,58,0.5)]"
        />
      </div>
    </div>
  );
}
