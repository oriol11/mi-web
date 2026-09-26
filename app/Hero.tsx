"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Glassmorphism container */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden backdrop-blur-sm">
        {/* Animated gradient orbs */}
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl dark:bg-blue-500/5" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl dark:bg-purple-500/5" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl dark:bg-pink-500/5" />
        </motion.div>

        {/* Glassmorphism card */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative z-10 max-w-6xl mx-auto text-center px-8 py-16 md:px-16 md:py-20 rounded-3xl border border-white/20 dark:border-white/10 bg-white/30 dark:bg-gray-900/30 backdrop-blur-xl shadow-xl shadow-black/5 dark:shadow-black/20"
        >
          {/* Headline with animated gradient */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-white dark:via-blue-400 dark:to-purple-400 mb-6 leading-tight"
          >
            Construye interfaces
          </motion.h1>

          {/* Subtitle with staggered entrance animation */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Animaciones fluidas, transiciones elegantes y micro-interacciones
            que deleitan a tus usuarios. Todo con el poder de Framer Motion.
          </motion.p>

          {/* CTA buttons with shimmer hover */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {/* Primary CTA – shimmer hover */}
            <Link
              href="#demo"
              className="group relative px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-semibold text-lg overflow-hidden transition-all hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-white/10"
            >
              <span className="relative z-10">Ver Demo</span>
              {/* Shimmer overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{ transformOrigin: "left" }}
              />
            </Link>

            {/* Secondary CTA – outline style */}
            <Link
              href="#code"
              className="px-8 py-4 bg-transparent border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold text-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              Ver Código
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator with bounce */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center pt-3"
          >
            <motion.div
              animate={{ y: [0, 6, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}