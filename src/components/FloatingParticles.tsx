"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { floatingCodeSnippets } from "@/data/chapters";

interface FloatingParticlesProps {
  chapter: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
  content: string;
  size: number;
}

export default function FloatingParticles({ chapter }: FloatingParticlesProps) {
  const particles = useMemo(() => {
    const count = 12;
    const items: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const contentArrays: Record<number, string[]> = {
        0: floatingCodeSnippets as string[],
        1: ["Spring", "React", "Docker", "K8s", "CI/CD", "REST", "gRPC", "AWS", "Git", "npm", "mvn", "TS"],
        2: ["Project", "API", "Build", "Ship", "Deploy", "Test", "Scale", "Monitor", "Log", "Debug", "Push", "Merge"],
        3: ["\u25CB", "\u25B3", "\u25A1", "\u25C7", "\u2606", "\u2B21", "\u25CB", "\u25B3", "\u25A1", "\u25C7", "\u2606", "\u2B21"],
      };
      const arr = contentArrays[chapter] || [];

      items.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 4,
        duration: 5 + Math.random() * 5,
        content: arr[i % arr.length] || "",
        size: chapter === 3 ? 16 + Math.random() * 12 : 10 + Math.random() * 4,
      });
    }
    return items;
  }, [chapter]);

  const colors = {
    0: "text-cream/20",
    1: "text-terminal/20",
    2: "text-gold/20",
    3: "text-jungle/30",
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block">
      {particles.map((p) => (
        <motion.div
          key={`${chapter}-${p.id}`}
          className={`absolute font-mono ${colors[chapter as keyof typeof colors] || "text-cream/20"}`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: `${p.size}px`,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.6, 0.3, 0.5, 0],
            y: [0, -30, -15, -40, -60],
            x: [0, 10, -5, 15, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {p.content}
        </motion.div>
      ))}
    </div>
  );
}
