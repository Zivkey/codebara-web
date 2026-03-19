"use client";

import { motion } from "framer-motion";

interface CapybaraSVGProps {
  chapter: number;
}

export default function CapybaraSVG({ chapter }: CapybaraSVGProps) {
  // Different moods per chapter
  const moods = [
    { eyeScale: 1, bodyRotate: 0, label: "floating" },
    { eyeScale: 0.9, bodyRotate: -2, label: "coding" },
    { eyeScale: 1.1, bodyRotate: 3, label: "relaxed" },
    { eyeScale: 1.2, bodyRotate: 0, label: "wink" },
  ];

  const mood = moods[chapter] || moods[0];

  return (
    <motion.div
      className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80"
      animate={{ rotate: mood.bodyRotate }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Body */}
        <g className="capybara-body">
          <ellipse cx="100" cy="130" rx="60" ry="45" fill="#8B6914" />
          <ellipse cx="100" cy="125" rx="55" ry="40" fill="#A67C2E" />
        </g>

        {/* Head */}
        <ellipse cx="100" cy="85" rx="40" ry="35" fill="#A67C2E" />
        <ellipse cx="100" cy="88" rx="38" ry="32" fill="#B8912F" />

        {/* Snout */}
        <ellipse cx="100" cy="100" rx="20" ry="12" fill="#C4A04A" />

        {/* Nose */}
        <ellipse cx="100" cy="95" rx="6" ry="4" fill="#5C4A1E" />

        {/* Eyes */}
        <g className="capybara-eye">
          <motion.circle
            cx="85"
            cy="78"
            r="5"
            fill="#1a1a1a"
            animate={{ scaleY: mood.eyeScale }}
          />
          <circle cx="83.5" cy="76.5" r="1.5" fill="white" opacity="0.8" />
        </g>
        <g className={chapter === 3 ? "" : "capybara-eye"}>
          <motion.circle
            cx="115"
            cy="78"
            r="5"
            fill="#1a1a1a"
            animate={{
              scaleY: chapter === 3 ? 0.2 : mood.eyeScale,
            }}
            transition={{ duration: 0.3 }}
          />
          {chapter !== 3 && (
            <circle cx="113.5" cy="76.5" r="1.5" fill="white" opacity="0.8" />
          )}
        </g>

        {/* Ears */}
        <ellipse cx="70" cy="62" rx="10" ry="8" fill="#8B6914" />
        <ellipse cx="130" cy="62" rx="10" ry="8" fill="#8B6914" />

        {/* Feet */}
        <ellipse cx="70" cy="170" rx="15" ry="8" fill="#8B6914" />
        <ellipse cx="130" cy="170" rx="15" ry="8" fill="#8B6914" />

        {/* Mouth - smile */}
        <path
          d="M90 102 Q100 108 110 102"
          stroke="#5C4A1E"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Chapter-specific accessories */}
        {chapter === 1 && (
          /* Coding - tiny laptop */
          <g>
            <rect
              x="70"
              y="140"
              width="25"
              height="16"
              rx="2"
              fill="#2a2a2a"
              stroke="#4EC99A"
              strokeWidth="0.5"
            />
            <rect x="73" y="143" width="19" height="10" rx="1" fill="#0D0B09" />
            <text
              x="76"
              y="150"
              fill="#4EC99A"
              fontSize="4"
              fontFamily="monospace"
            >
              {">_"}
            </text>
          </g>
        )}

        {chapter === 2 && (
          /* Coffee cup */
          <g>
            <rect x="130" y="110" width="14" height="18" rx="2" fill="#5C4A1E" />
            <path
              d="M144 116 Q150 118 144 122"
              stroke="#5C4A1E"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M134 108 Q137 102 140 108"
              stroke="#C4813A"
              strokeWidth="1"
              fill="none"
              opacity="0.6"
            />
          </g>
        )}
      </svg>

      {/* Glow effect */}
      <div
        className="absolute inset-0 rounded-full opacity-20 blur-3xl"
        style={{
          background:
            chapter === 0
              ? "var(--capybara)"
              : chapter === 1
                ? "var(--terminal)"
                : chapter === 2
                  ? "var(--gold)"
                  : "var(--jungle)",
        }}
      />
    </motion.div>
  );
}
