"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const items = [
  { label: "Design", color: "bg-violet-500" },
  { label: "Prototype", color: "bg-rose-500" },
  { label: "Build", color: "bg-amber-500" },
  { label: "Launch", color: "bg-emerald-500" },
  { label: "Iterate", color: "bg-cyan-500" },
];

export default function StaggerListDemo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.55, ease: "easeOut" },
    },
  };

  return (
    <motion.ul
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="space-y-3"
    >
      {items.map(({ label, color }) => (
        <motion.li
          key={label}
          variants={itemVariants}
          className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className={`w-3 h-3 rounded-full shadow-inner ${color}`} />
          <span className="font-medium text-white/90 tracking-wide">{label}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
}
