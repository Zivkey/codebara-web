"use client";

import { motion, MotionValue } from "framer-motion";
import { useScrollElement } from "../useScrollElement";

interface Props {
  progress: MotionValue<number>;
  active: boolean;
}


export default function ChapterVoid({ progress, active }: Props) {
  const titleStyle = useScrollElement(progress, "left", -1, -0.5, 0.75, 0.92);
  const techStyle = useScrollElement(progress, "right", -1, -0.5, 0.77, 0.94);
  const taglineStyle = useScrollElement(progress, "left", -1, -0.5, 0.73, 0.9);
  const ctaStyle = useScrollElement(progress, "right", -1, -0.5, 0.72, 0.9);
  const ring1Style = useScrollElement(progress, "scale", 0.02, 0.2, 0.75, 0.92);
  const ring2Style = useScrollElement(progress, "scale", 0.05, 0.22, 0.58, 0.82);

  return (
    <div
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{
        pointerEvents: active ? "auto" : "none",
        opacity: active ? 1 : 0,
      }}
    >

      {/* LEFT - Title */}
      <motion.div
        className="absolute left-6 sm:left-12 lg:left-24 top-[12%] sm:top-[18%]"
        style={titleStyle}
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-[2px] bg-capybara/50" />
          <span className="font-mono text-xs text-capybara/70 uppercase tracking-[0.3em]">
            est. 2026
          </span>
        </div>
        <h1 className="font-syne text-6xl sm:text-8xl lg:text-[7rem] font-bold tracking-tight leading-[0.9]">
          Code
          <br />
          <span className="text-capybara">bara</span>
        </h1>
      </motion.div>

      {/* Tech tags - below title on mobile, right side on desktop */}
      <motion.div
        className="absolute left-6 sm:right-12 lg:right-24 top-[35%] sm:top-[22%] sm:left-auto sm:text-right"
        style={techStyle}
      >
        <div className="flex flex-col items-start sm:items-end gap-3 sm:gap-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-cream/60 uppercase tracking-[0.2em]">
              Code Craftsman
            </span>
            <div className="w-2.5 h-2.5 rounded-full bg-capybara animate-pulse" />
          </div>
          <div className="flex flex-row sm:flex-col gap-2">
            {["Spring Boot", "React", "DevOps"].map((tech) => (
              <span
                key={tech}
                className="font-mono text-xs sm:text-sm text-cream/70 border border-white/15 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/[0.06]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* BOTTOM LEFT - Tagline */}
      <motion.div
        className="absolute left-6 sm:left-12 lg:left-24 bottom-[24%] sm:bottom-[18%]"
        style={taglineStyle}
      >
        <p className="font-mono text-xs sm:text-sm text-cream/60 max-w-[320px] leading-relaxed">
          Crafting robust backends & pixel-perfect
          <br />
          frontends from{" "}
          <span className="text-capybara">Ni&scaron;, Serbia</span>
        </p>
        <div className="w-20 h-[2px] bg-gradient-to-r from-capybara/40 to-transparent mt-5" />
      </motion.div>

      {/* BOTTOM RIGHT - CTA */}
      <motion.div
        className="absolute left-6 sm:left-auto sm:right-12 lg:right-24 bottom-[12%] sm:bottom-[18%]"
        style={ctaStyle}
      >
        <button
          onClick={() =>
            document
              .querySelector("#services")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="group btn-glow font-mono text-base px-8 py-4 border border-capybara/40 rounded-full text-capybara hover:bg-capybara/10 flex items-center gap-3"
        >
          <span>Explore</span>
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            &darr;
          </motion.span>
        </button>
      </motion.div>

      {/* Decorative rings */}
      <motion.div
        className="absolute w-80 h-80 sm:w-96 sm:h-96 lg:w-[28rem] lg:h-[28rem] rounded-full border border-capybara/[0.06] hidden sm:block"
        style={ring1Style}
      />
      <motion.div
        className="absolute w-[24rem] h-[24rem] sm:w-[30rem] sm:h-[30rem] lg:w-[34rem] lg:h-[34rem] rounded-full border border-cream/[0.03] hidden sm:block"
        style={ring2Style}
      />

    </div>
  );
}
