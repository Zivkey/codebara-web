"use client";

import { motion, MotionValue } from "framer-motion";
import { useScrollElement } from "../useScrollElement";

interface Props {
  progress: MotionValue<number>;
  active: boolean;
}

export default function ChapterConnect({ progress, active }: Props) {
  const headerStyle = useScrollElement(progress, "left", 0.0, 0.15, 2, 3);
  const subtitleStyle = useScrollElement(progress, "right", 0.03, 0.18, 2, 3);
  const formStyle = useScrollElement(progress, "scale", 0.06, 0.22, 2, 3);
  const nameStyle = useScrollElement(progress, "left", 0.09, 0.25, 2, 3);
  const emailStyle = useScrollElement(progress, "right", 0.11, 0.27, 2, 3);
  const msgStyle = useScrollElement(progress, "scale", 0.13, 0.29, 2, 3);
  const btnStyle = useScrollElement(progress, "right", 0.15, 0.31, 2, 3);
  const statusStyle = useScrollElement(progress, "left", 0.17, 0.33, 2, 3);

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        pointerEvents: active ? "auto" : "none",
        opacity: active ? 1 : 0,
      }}
    >
      {/* LEFT COLUMN - hidden on mobile, form has its own title */}
      <div className="absolute left-6 sm:left-12 lg:left-24 top-0 bottom-0 hidden lg:flex flex-col justify-center gap-8 max-w-[400px]">
        {/* Big bold heading */}
        <motion.div style={headerStyle}>
          <h2 className="font-syne text-5xl sm:text-7xl lg:text-[6rem] font-bold leading-[0.9] tracking-tight">
            <span className="text-cream">Get In</span>
            <br />
            <span className="text-cream/70">Touch</span>
          </h2>
          <div className="w-20 h-[2px] bg-cream/20 mt-6 rounded-full" />
        </motion.div>

        {/* Subtitle */}
        <motion.div style={subtitleStyle}>
          <p className="font-syne text-lg sm:text-xl text-cream/70 leading-relaxed">
            Have an idea? Let&apos;s make it
            <span className="text-cream font-bold"> real</span>.
          </p>
        </motion.div>

        {/* Status */}
        <motion.div style={statusStyle}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-3 h-3 rounded-full bg-capybara animate-pulse" />
            <span className="font-syne text-sm text-cream/80 font-bold uppercase tracking-wider">
              Available
            </span>
          </div>
          <span className="font-mono text-xs text-cream/50">
            Response time: &lt; 24h
          </span>
          <div className="flex items-center gap-5 mt-4">
            <a
              href="https://github.com/codebara"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-cream/60 hover:text-cream transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/codebara"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-cream/60 hover:text-cream transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>

      {/* CONTACT FORM */}
      <motion.div
        className="absolute left-4 right-4 top-0 bottom-0 flex items-center justify-center lg:left-[60%] lg:right-[3rem]"
        style={formStyle}
      >
        <form
          onSubmit={(e) => e.preventDefault()}
          className="relative w-full max-w-md lg:max-w-lg rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/15 sm:border-white/10 bg-onyx/80 sm:bg-white/[0.03] backdrop-blur-xl sm:backdrop-blur-md overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cream/15 to-transparent" />

          {/* Mobile-only title */}
          <div className="lg:hidden mb-6">
            <h2 className="font-syne text-3xl sm:text-4xl font-bold leading-[0.9] tracking-tight mb-2">
              <span className="text-cream">Get In </span>
              <span className="text-cream/70">Touch</span>
            </h2>
            <p className="font-syne text-sm text-cream/60">
              Have an idea? Let&apos;s make it <span className="text-cream font-bold">real</span>.
            </p>
          </div>

          <div className="space-y-5 mb-8">
            <motion.div style={nameStyle}>
              <label className="font-syne text-xs text-cream uppercase tracking-wider mb-2 block">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full font-syne text-lg bg-white/[0.04] border border-white/15 rounded-xl px-4 py-3 text-cream placeholder:text-cream/50 focus:outline-none focus:border-cream/30 transition-colors"
              />
            </motion.div>
            <motion.div style={emailStyle}>
              <label className="font-syne text-xs text-cream uppercase tracking-wider mb-2 block">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full font-syne text-lg bg-white/[0.04] border border-white/15 rounded-xl px-4 py-3 text-cream placeholder:text-cream/50 focus:outline-none focus:border-cream/30 transition-colors"
              />
            </motion.div>
            <motion.div style={msgStyle}>
              <label className="font-syne text-xs text-cream uppercase tracking-wider mb-2 block">Message</label>
              <textarea
                placeholder="Tell me about your project..."
                rows={4}
                className="w-full font-syne text-lg bg-white/[0.04] border border-white/15 rounded-xl px-4 py-3 text-cream placeholder:text-cream/50 focus:outline-none focus:border-cream/30 transition-colors resize-none"
              />
            </motion.div>
          </div>

          <motion.div style={btnStyle}>
            <button
              type="submit"
              className="w-full font-syne text-base sm:text-lg font-bold py-3 sm:py-4 bg-capybara rounded-2xl text-cream hover:brightness-110 transition-all"
              style={{ boxShadow: "0 4px 20px rgba(196,129,58,0.2)" }}
            >
              Send Message
            </button>
            {/* Mobile-only status */}
            <div className="lg:hidden flex items-center justify-center gap-3 mt-4">
              <div className="w-2.5 h-2.5 rounded-full bg-capybara animate-pulse" />
              <span className="font-mono text-xs text-cream/50">
                Available &middot; Response time: &lt; 24h
              </span>
            </div>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
