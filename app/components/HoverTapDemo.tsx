"use client";

import { motion } from "framer-motion";

interface HoverTapDemoProps {
  children: React.ReactNode;
}

const HoverTapDemo: React.FC<HoverTapDemoProps> = ({ children }) => {
  return (
    <motion.div
      className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
      whileHover={{ scale: 1.08, rotate: 6, boxShadow: "0 25px 50px -15px rgba(0,0,0/0.3)" }}
      whileTap={{ scale: 0.92, rotate: -4 }}
      transition={{ type: "spring", stiffness: 500, damping: 15 }}
    >
      {children}
    </motion.div>
  );
};

export default HoverTapDemo;