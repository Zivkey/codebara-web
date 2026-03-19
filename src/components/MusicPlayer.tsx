"use client";

import { useRef, useState, useEffect } from "react";

const chapterAccentColors: Record<number, string> = {
  0: "#C4813A",
  1: "#00FF41",
  2: "#A67C52",
  3: "#C4813A",
};

export default function MusicPlayer({ chapter = 0 }: { chapter?: number }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.08);

  const accentColor = chapterAccentColors[chapter] || chapterAccentColors[0];

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
    <div className="flex items-center gap-2">
      <audio ref={audioRef} src="/audio/jazz.mp3" loop preload="auto" />

      <button
        onClick={togglePlay}
        className="flex items-center transition-colors"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isPlaying ? accentColor : "rgba(240,230,210,0.3)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.5s ease" }}>
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          {isPlaying && (
            <>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </>
          )}
        </svg>
      </button>

      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
        className="w-16 h-[3px] appearance-none bg-cream/20 rounded-full cursor-pointer"
        style={{
          accentColor,
        }}
      />
      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: ${accentColor};
          box-shadow: 0 0 6px ${accentColor}80;
          transition: background 0.5s ease, box-shadow 0.5s ease;
        }
        input[type="range"]::-moz-range-thumb {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: ${accentColor};
          box-shadow: 0 0 6px ${accentColor}80;
          border: none;
          transition: background 0.5s ease, box-shadow 0.5s ease;
        }
      `}</style>
    </div>
  );
}
