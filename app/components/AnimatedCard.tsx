"use client";

import { motion } from "framer-motion";

const itemVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

export function AnimatedCard() {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.05, y: -4 }}
      className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg cursor-pointer transition-all duration-300"
    >
      <h3 className="text-xl font-bold mb-2">Tarjeta Animada</h3>
      <p className="text-gray-600 dark:text-gray-400">Pasa el ratón o haz clic</p>
    </motion.div>
  );
}