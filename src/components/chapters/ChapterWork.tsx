"use client";

import { motion, MotionValue } from "framer-motion";
import { portfolio } from "@/data/chapters";
import { useScrollElement } from "../useScrollElement";

interface Props {
  progress: MotionValue<number>;
  active: boolean;
}

export default function ChapterWork({ progress, active }: Props) {
  const headerStyle = useScrollElement(progress, "right", 0.0, 0.15, 0.75, 0.92);
  const descStyle = useScrollElement(progress, "left", 0.03, 0.18, 0.73, 0.9);
  const card0Style = useScrollElement(progress, "left", 0.05, 0.2, 0.72, 0.9);
  const card1Style = useScrollElement(progress, "right", 0.09, 0.25, 0.74, 0.92);
  const card2Style = useScrollElement(progress, "left", 0.13, 0.28, 0.76, 0.94);
  const linkStyle = useScrollElement(progress, "right", 0.16, 0.32, 0.78, 0.95);
  const lineStyle = useScrollElement(progress, "right", 0.18, 0.34, 0.8, 0.95);

  const cardStyles = [card0Style, card1Style, card2Style];

  return (
    <div
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{
        pointerEvents: active ? "auto" : "none",
        opacity: active ? 1 : 0,
      }}
    >
      {/* RIGHT - Section header - warm & relaxed */}
      <motion.div
        className="absolute left-4 right-4 sm:right-12 sm:left-auto lg:right-24 top-[10%] sm:top-[13%] text-center sm:text-right"
        style={headerStyle}
      >
        <div className="flex items-center justify-center sm:justify-end gap-3 mb-4">
          <span className="font-syne text-xs text-coffee/70 uppercase tracking-[0.3em]">
            portfolio
          </span>
          <div className="w-10 h-[2px] bg-gradient-to-r from-coffee/50 to-latte/30" />
        </div>
        <h2 className="font-syne text-3xl sm:text-5xl lg:text-7xl font-bold leading-[0.95]">
          Recent
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-coffee to-latte">Work</span>
        </h2>
      </motion.div>

      {/* LEFT - Description - chill vibe */}
      <motion.div
        className="absolute left-6 sm:left-12 lg:left-24 top-[12%] sm:top-[15%] hidden sm:block"
        style={descStyle}
      >
        <p className="font-syne text-sm text-latte/60 max-w-[240px] leading-relaxed italic">
          A selection of projects
          <br />
          brewed with patience.
          <br />
          <span className="text-coffee not-italic">Each crafted with care.</span>
        </p>
        <div className="w-14 h-[2px] bg-gradient-to-r from-coffee/40 to-latte/20 mt-5 rounded-full" />
      </motion.div>

      {/* PORTFOLIO CARDS - warm cozy style */}
      <div className="absolute left-4 right-4 sm:left-12 sm:right-auto lg:left-24 bottom-[3%] sm:top-[28%] sm:bottom-auto sm:w-[380px] flex flex-col gap-2 sm:gap-3">
        {portfolio.map((project, i) => (
          <motion.div
            key={project.title}
            style={cardStyles[i]}
            className="card-hover card-hover-coffee group relative border border-coffee/15 rounded-lg sm:rounded-2xl overflow-hidden bg-[#1a1308]/90 backdrop-blur-md"
          >
            {/* Mobile: compact horizontal layout */}
            <div className="flex items-center gap-3 p-3 sm:hidden">
              <div className="flex-shrink-0 w-10 h-10 rounded-md border border-coffee/20 bg-coffee/[0.08] flex items-center justify-center">
                <span className="font-syne text-sm font-bold text-coffee/70 italic">
                  {i + 1}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-syne text-sm font-bold text-cream">
                    {project.title}
                  </h3>
                  <span className="font-syne text-[9px] text-coffee/40 italic">
                    no.{i + 1}
                  </span>
                </div>
                <p className="font-mono text-[11px] text-latte/50 line-clamp-1 mt-0.5">
                  {project.description}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 px-3 pb-3 sm:hidden">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[9px] px-1.5 py-0.5 rounded-full border border-coffee/15 text-coffee/60 bg-coffee/[0.05]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Desktop: full layout */}
            <div className="hidden sm:block p-4 lg:p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-syne text-lg font-bold text-cream">
                  {project.title}
                </h3>
                <span className="font-syne text-xs text-coffee/40 italic">
                  no.{i + 1}
                </span>
              </div>
              <p className="font-mono text-xs text-latte/60 mb-4 leading-relaxed line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[11px] px-3 py-1 rounded-full border border-coffee/20 text-coffee/80 bg-coffee/[0.08]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="absolute -bottom-8 -right-8 w-36 h-36 rounded-full bg-coffee/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </motion.div>
        ))}

        {/* View all */}
        <motion.div className="flex justify-start mt-2" style={linkStyle}>
          <a
            href="#"
            className="group font-syne text-sm text-coffee/60 hover:text-latte transition-colors flex items-center gap-2"
          >
            <span>View All Projects</span>
            <motion.span
              className="inline-block"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              &rarr;
            </motion.span>
          </a>
        </motion.div>
      </div>

      {/* Decorative line - soft gradient */}
      <motion.div
        className="absolute right-6 sm:right-12 lg:right-24 top-[36%] bottom-[32%] w-[1px] bg-gradient-to-b from-transparent via-coffee/10 to-transparent hidden lg:block"
        style={lineStyle}
      />
    </div>
  );
}
