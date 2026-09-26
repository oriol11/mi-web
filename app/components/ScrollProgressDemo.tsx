"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

export default function ScrollProgressDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: ref, offset: ["start start", "end end"] });

  // Smooth spring for scroll progress bar
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  const scrollItems = [
    "Glassmorphism surfaces blend light and blur",
    "Dark mode ensures accessibility at night",
    "Staggered animations feel organic and calm",
    "Elastic drag gives tangible feedback",
    "Progress reflects the user's journey",
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Progress bar */}
      <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden backdrop-blur-md border border-white/10 shadow-inner relative">
        <motion.div
          style={{ scaleX, transformOrigin: "left" }}
          className="h-full bg-gradient-to-r from-violet-400 via-rose-400 to-amber-300 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.25)]"
        />
        <div className="absolute inset-0 pointer-events-none rounded-full border border-white/5" />
      </div>

      {/* Scroll-triggered list */}
      <div
        ref={ref}
        className="h-52 overflow-y-auto rounded-2xl bg-gradient-to-b from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 p-4 space-y-3 shadow-inner"
      >
        {scrollItems.map((text, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            {text}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
