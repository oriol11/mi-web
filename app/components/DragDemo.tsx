"use client";

import { motion } from "framer-motion";

export default function DragDemo() {
  return (
    <motion.div
      drag
      dragConstraints={{ top: -120, left: -120, right: 120, bottom: 120 }}
      dragElastic={0.25}
      dragMomentum={false}
      className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-2xl cursor-grab active:cursor-grabbing flex items-center justify-center border border-white/30 backdrop-blur-md mx-auto relative z-10"
      whileDrag={{ scale: 1.15, rotate: 4, boxShadow: "0 20px 50px rgba(0,0,0,0.35)" }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <svg className="w-10 h-10 text-white drop-shadow-md" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16M8 4v16M16 4v16" />
      </svg>
    </motion.div>
  );
}
