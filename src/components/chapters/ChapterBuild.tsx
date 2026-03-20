"use client";

import { motion, MotionValue } from "framer-motion";
import { services } from "@/data/chapters";
import { useScrollElement } from "../useScrollElement";

interface Props {
  progress: MotionValue<number>;
  active: boolean;
}

const iconMap: Record<string, string> = {
  Backend: ">_",
  Frontend: "[]",
  DevOps: "~/",
};

export default function ChapterBuild({ progress, active }: Props) {
  const headerStyle = useScrollElement(progress, "left", 0.0, 0.15, 0.75, 0.92);
  const statsStyle = useScrollElement(progress, "right", 0.03, 0.18, 0.77, 0.94);
  const card0Style = useScrollElement(progress, "left", 0.06, 0.22, 0.72, 0.9);
  const card1Style = useScrollElement(progress, "scale", 0.1, 0.26, 0.74, 0.92);
  const card2Style = useScrollElement(progress, "right", 0.14, 0.3, 0.76, 0.94);
  const lineStyle = useScrollElement(progress, "left", 0.18, 0.34, 0.78, 0.95);

  const cardStyles = [card0Style, card1Style, card2Style];

  return (
    <div
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{
        pointerEvents: active ? "auto" : "none",
        opacity: active ? 1 : 0,
      }}
    >
      {/* LEFT - Section header - hacker terminal style */}
      <motion.div
        className="absolute left-6 sm:left-12 lg:left-24 top-[10%] sm:top-[13%]"
        style={headerStyle}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-[2px] bg-hacker/50" />
          <span className="font-mono text-xs text-hacker/70 uppercase tracking-[0.3em]">
            {"$ ./services"}
          </span>
          <span className="w-2 h-4 bg-hacker/80 animate-pulse" />
        </div>
        <h2 className="font-mono text-4xl sm:text-6xl lg:text-7xl font-bold leading-[0.95]">
          <span className="text-hacker/40">root@</span>
          <br />
          <span className="text-hacker">BUILD</span>
        </h2>
      </motion.div>

      {/* RIGHT - Stats - terminal output */}
      <motion.div
        className="absolute right-6 sm:right-12 lg:right-24 top-[10%] sm:top-[16%] text-right hidden sm:block"
        style={statsStyle}
      >
        <div className="flex flex-col items-end gap-3 font-mono">
          {[
            { num: "50+", label: "commits.pushed" },
            { num: "99%", label: "uptime.sla" },
            { num: "3", label: "core.modules" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <span className="text-xs text-hacker/40">
                {stat.label}:
              </span>
              <span className="text-xl font-bold text-hacker">
                {stat.num}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* SERVICE CARDS - dark hacker terminals */}
      <div className="absolute bottom-[3%] sm:bottom-[5%] left-1/2 -translate-x-1/2 w-full max-w-[90rem] px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              style={cardStyles[i]}
              className="card-hover card-hover-hacker group relative border border-hacker/20 rounded-lg sm:rounded-2xl bg-[#020d02]/95 backdrop-blur-md overflow-hidden"
            >
              {/* Terminal top bar - hidden on mobile */}
              <div className="hidden sm:flex absolute top-0 left-0 right-0 h-8 bg-hacker/[0.06] border-b border-hacker/10 items-center px-4 gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-hacker/30" />
                <div className="w-2.5 h-2.5 rounded-full bg-hacker/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-hacker/10" />
                <span className="font-mono text-[10px] text-hacker/30 ml-3">
                  ~/{service.title.toLowerCase()}.sh
                </span>
              </div>

              {/* Mobile: compact horizontal layout */}
              <div className="flex items-center gap-3 p-3 sm:hidden">
                <div className="flex-shrink-0 w-10 h-10 rounded-md border border-hacker/20 bg-hacker/[0.06] flex items-center justify-center">
                  <span className="font-mono text-sm text-hacker/70">
                    {iconMap[service.title]}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-mono text-sm font-bold text-hacker">
                      ./{service.title}
                    </h3>
                    <span className="font-mono text-[9px] text-hacker/30 tracking-wider">
                      PID:{String(i + 1).padStart(4, "0")}
                    </span>
                  </div>
                  <p className="font-mono text-[11px] text-hacker/45 line-clamp-1 mt-0.5">
                    {service.description}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 px-3 pb-3 sm:hidden">
                {service.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[9px] px-1.5 py-0.5 rounded border border-hacker/15 text-hacker/60 bg-hacker/[0.05]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Desktop: full vertical layout */}
              <div className="hidden sm:block p-10">
                <div className="mt-6 flex items-center justify-between mb-5">
                  <span className="font-mono text-2xl text-hacker/60">
                    {iconMap[service.title]}
                  </span>
                  <span className="font-mono text-xs text-hacker/30 uppercase tracking-[0.2em]">
                    PID:{String(i + 1).padStart(4, "0")}
                  </span>
                </div>
                <h3 className="font-mono text-2xl font-bold text-hacker mb-2">
                  ./{service.title}
                </h3>
                <p className="font-mono text-sm text-hacker/50 mb-6 leading-relaxed">
                  <span className="text-hacker/30">$ </span>{service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs px-3 py-1.5 rounded border border-hacker/20 text-hacker/70 bg-hacker/[0.06]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="absolute -bottom-10 -right-10 w-52 h-52 rounded-full bg-hacker/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative line - scanline */}
      <motion.div
        className="absolute left-6 sm:left-12 lg:left-24 top-[38%] bottom-[32%] w-[1px] bg-gradient-to-b from-transparent via-hacker/15 to-transparent hidden lg:block"
        style={lineStyle}
      />
    </div>
  );
}
