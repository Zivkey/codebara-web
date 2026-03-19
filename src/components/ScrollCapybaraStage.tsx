"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useMotionValue } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { chapters } from "@/data/chapters";
import ChapterVoid from "./chapters/ChapterVoid";
import ChapterBuild from "./chapters/ChapterBuild";
import ChapterWork from "./chapters/ChapterWork";
import ChapterConnect from "./chapters/ChapterConnect";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const chapterColors: Record<number, { text: string; line: string; bg: string; glow: string }> = {
  0: { text: "text-capybara", line: "bg-capybara/30", bg: "bg-capybara", glow: "0 0 12px 2px rgba(196,129,58,0.4)" },
  1: { text: "text-hacker", line: "bg-hacker/30", bg: "bg-hacker", glow: "0 0 12px 2px rgba(0,255,65,0.4)" },
  2: { text: "text-coffee", line: "bg-coffee/30", bg: "bg-coffee", glow: "0 0 12px 2px rgba(166,124,82,0.4)" },
  3: { text: "text-capybara", line: "bg-capybara/30", bg: "bg-capybara", glow: "0 0 12px 2px rgba(196,129,58,0.4)" },
};

const videoSources = [
  { src: "/videos/1-2.mp4", range: [0, 0.333] },
  { src: "/videos/2-3.mp4", range: [0.333, 0.666] },
  { src: "/videos/3-4.mp4", range: [0.666, 1] },
];

export default function ScrollCapybaraStage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([null, null, null]);
  const bgVideoRefs = useRef<(HTMLVideoElement | null)[]>([null, null, null]);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [activeVideo, setActiveVideo] = useState(-1);
  const [scrollPercent, setScrollPercent] = useState(0);
  const chapterProgress0 = useMotionValue(0.01);
  const chapterProgress1 = useMotionValue(0);
  const chapterProgress2 = useMotionValue(0);
  const chapterProgress3 = useMotionValue(0);
  const chapterProgressAll = [chapterProgress0, chapterProgress1, chapterProgress2, chapterProgress3];

  const handleScrollProgress = useCallback(
    (progress: number) => {
      // Set video currentTime directly - no smoothing
      let newActiveVideo = -1;
      for (let i = 0; i < videoSources.length; i++) {
        const [start, end] = videoSources[i].range;
        if (progress >= start && progress < end) {
          newActiveVideo = i;
          const video = videoRefs.current[i];
          const bgVideo = bgVideoRefs.current[i];
          if (video && video.duration) {
            const localProgress = (progress - start) / (end - start);
            const time = localProgress * video.duration;
            video.currentTime = time;
            if (bgVideo && bgVideo.duration) {
              bgVideo.currentTime = time;
            }
          }
          break;
        }
      }
      if (progress >= 1) {
        newActiveVideo = 2;
        const video = videoRefs.current[2];
        const bgVideo = bgVideoRefs.current[2];
        if (video && video.duration) {
          video.currentTime = video.duration;
          if (bgVideo && bgVideo.duration) {
            bgVideo.currentTime = video.duration;
          }
        }
      }
      setActiveVideo(newActiveVideo);

      // Determine current chapter and update all progress values
      let activeChapter = 0;
      for (const chapter of chapters) {
        if (
          progress >= chapter.scrollRange[0] &&
          progress < chapter.scrollRange[1]
        ) {
          activeChapter = chapter.id;
          break;
        }
      }

      if (progress >= 1) {
        activeChapter = 3;
      }

      // Set each chapter's own progress - inactive chapters get 0
      for (const chapter of chapters) {
        const [start, end] = chapter.scrollRange;
        if (chapter.id === activeChapter) {
          const local = progress >= 1 ? 1 : (progress - start) / (end - start);
          chapterProgressAll[chapter.id].set(local);
        } else {
          // Set to value past exitEnd so all elements are at opacity 0
          chapterProgressAll[chapter.id].set(chapter.id === 0 ? 1 : 0);
        }
      }

      setScrollPercent(progress);
      setCurrentChapter(activeChapter);
    },
    [chapterProgressAll]
  );

  useEffect(() => {
    if (!containerRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        handleScrollProgress(self.progress);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [handleScrollProgress]);

  useEffect(() => {
    const bgClass = chapters[currentChapter]?.background || "chapter-bg-0";
    document.body.className = document.body.className
      .replace(/chapter-bg-\d/g, "")
      .trim();
    document.body.classList.add("chapter-bg", bgClass);

    return () => {
      document.body.classList.remove("chapter-bg", bgClass);
    };
  }, [currentChapter]);

  return (
    <div ref={containerRef} className="relative" style={{ height: "1200vh" }}>
      <div id="hero" className="absolute top-0" />
      <div id="services" className="absolute top-[34%]" />
      <div id="work" className="absolute top-[58%]" />
      <div id="contact" className="absolute top-[98%]" />

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background - base dark */}
        <div className="absolute inset-0 bg-onyx" />

        {/* Background glow that follows video colors */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {videoSources.map((v, i) => (
            <div
              key={`bg-${v.src}`}
              className={`absolute inset-0 ${
                activeVideo === i ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Blurred duplicate video as background */}
              <video
                className="absolute w-full h-full object-cover scale-150 blur-[100px] opacity-50 saturate-[1.8]"
                muted
                playsInline
                preload="auto"
                src={v.src}
                ref={(el) => {
                  bgVideoRefs.current[i] = el;
                }}
              />
              {/* Dark overlay to keep it subtle */}
              <div className="absolute inset-0 bg-onyx/60" />
            </div>
          ))}
        </div>


        {/* Videos - large, centered, with heavy fading edges */}
        <div className="absolute inset-0 flex items-center justify-center z-0">
          {videoSources.map((v, i) => (
            <div
              key={v.src}
              className={`absolute ${
                activeVideo === i ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <div className="relative w-screen h-screen overflow-hidden video-mask">
                <video
                  ref={(el) => {
                    videoRefs.current[i] = el;
                  }}
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                  preload="auto"
                  src={v.src}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Chapter UI overlays - above video */}
        <div className="absolute inset-0 z-10">
          <ChapterVoid progress={chapterProgress0} active={currentChapter === 0} />
          <ChapterBuild
            progress={chapterProgress1}
            active={currentChapter === 1}
          />
          <ChapterWork progress={chapterProgress2} active={currentChapter === 2} />
          <ChapterConnect
            progress={chapterProgress3}
            active={currentChapter === 3}
          />
        </div>


        {/* Progress bar - right side */}
        <div className="absolute right-5 sm:right-7 top-1/2 -translate-y-1/2 z-20 hidden sm:flex flex-col items-center h-[60vh]">
          {/* Track */}
          <div className="relative w-[3px] h-full rounded-full bg-white/[0.07]">
            {/* Fill */}
            <div
              className="absolute top-0 left-0 w-full rounded-full transition-colors duration-500"
              style={{
                height: `${scrollPercent * 100}%`,
                background: `linear-gradient(to bottom, ${
                  currentChapter === 0 ? "#C4813A" :
                  currentChapter === 1 ? "#00FF41" :
                  currentChapter === 2 ? "#A67C52" :
                  "#C4813A"
                }, ${
                  currentChapter === 0 ? "#C4813A88" :
                  currentChapter === 1 ? "#00FF4188" :
                  currentChapter === 2 ? "#A67C5288" :
                  "#C4813A88"
                })`,
              }}
            />
            {/* Knob */}
            <div
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full transition-colors duration-500"
              style={{
                top: `${scrollPercent * 100}%`,
                backgroundColor:
                  currentChapter === 0 ? "#C4813A" :
                  currentChapter === 1 ? "#00FF41" :
                  currentChapter === 2 ? "#A67C52" :
                  "#C4813A",
                boxShadow: `0 0 8px ${
                  currentChapter === 0 ? "rgba(196,129,58,0.5)" :
                  currentChapter === 1 ? "rgba(0,255,65,0.5)" :
                  currentChapter === 2 ? "rgba(166,124,82,0.5)" :
                  "rgba(196,129,58,0.5)"
                }`,
              }}
            />
          </div>
          {/* Chapter labels */}
          <div className="absolute -left-8 top-0 bottom-0 flex flex-col justify-between items-end">
            {chapters.map((ch) => {
              const isActive = currentChapter === ch.id;
              const color = chapterColors[ch.id];
              return (
                <button
                  key={ch.id}
                  onClick={() => {
                    const scrollTarget =
                      ch.scrollRange[0] *
                      (containerRef.current?.scrollHeight || 0);
                    window.scrollTo({ top: scrollTarget, behavior: "smooth" });
                  }}
                  className={`font-mono text-[10px] uppercase tracking-wider transition-all duration-300 ${
                    isActive ? `${color.text} opacity-100` : "text-cream/20 hover:text-cream/40 opacity-100"
                  }`}
                >
                  {ch.id + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer - inside sticky, visible on last chapter */}
        <div
          className={`absolute bottom-0 left-0 right-0 z-30 border-t border-white/5 py-6 px-6 transition-opacity duration-500 ${
            currentChapter === 3 ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-mono text-xs text-cream/40">
              &copy; 2025 Codebara &middot; Built with &#9749; in Ni&scaron;
            </p>
            <div className="flex items-center gap-6">
              <a
                href="https://github.com/codebara"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-cream/40 hover:text-capybara transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/codebara"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-cream/40 hover:text-capybara transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
