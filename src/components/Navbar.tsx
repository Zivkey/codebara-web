"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MusicPlayer from "./MusicPlayer";

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

const chapterThemes: Record<number, { accent: string; accentHover: string; border: string; btnBg: string; btnText: string; label: string }> = {
  0: { accent: "text-capybara", accentHover: "hover:text-capybara", border: "border-capybara/50", btnBg: "hover:bg-capybara/10", btnText: "text-capybara", label: "Let's Talk" },
  1: { accent: "text-hacker", accentHover: "hover:text-hacker", border: "border-hacker/50", btnBg: "hover:bg-hacker/10", btnText: "text-hacker", label: "$ connect" },
  2: { accent: "text-coffee", accentHover: "hover:text-coffee", border: "border-coffee/50", btnBg: "hover:bg-coffee/10", btnText: "text-coffee", label: "Let's Chat" },
  3: { accent: "text-capybara", accentHover: "hover:text-capybara", border: "border-capybara/50", btnBg: "hover:bg-capybara/10", btnText: "text-capybara", label: "Get In Touch" },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [chapter, setChapter] = useState(0);

  useEffect(() => {
    const handler = (e: Event) => {
      setChapter((e as CustomEvent).detail);
    };
    window.addEventListener("chapterChange", handler);
    return () => window.removeEventListener("chapterChange", handler);
  }, []);

  const theme = chapterThemes[chapter] || chapterThemes[0];

  const scrollTo = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-md bg-onyx/70 border-b border-white/5"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo("#hero")}
          className="font-syne text-2xl font-bold tracking-tight"
        >
          Code<span className={`${theme.accent} transition-colors duration-500`}>bara</span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <MusicPlayer chapter={chapter} />
          {navItems.map((item, i) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              onClick={() => scrollTo(item.href)}
              className={`font-mono text-sm text-cream/60 ${theme.accentHover} transition-colors duration-300`}
            >
              {item.label}
            </motion.button>
          ))}
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            onClick={() => scrollTo("#contact")}
            className={`btn-glow font-mono text-sm px-4 py-2 border ${theme.border} rounded-lg ${theme.btnText} ${theme.btnBg} transition-colors duration-500`}
          >
            {theme.label}
          </motion.button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-cream"
          />
          <motion.span
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-0.5 bg-cream"
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-cream"
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-4 pt-6 pb-4">
              <MusicPlayer chapter={chapter} />
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.href)}
                  className={`font-mono text-sm text-cream/60 ${theme.accentHover} transition-colors text-left`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("#contact")}
                className={`font-mono text-sm px-4 py-2 border ${theme.border} rounded-lg ${theme.btnText} ${theme.btnBg} w-fit transition-colors duration-500`}
              >
                {theme.label}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
