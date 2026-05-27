"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type LoadingRevealProps = {
  children: React.ReactNode;
};

export default function LoadingReveal({
  children,
}: LoadingRevealProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.05,
              filter: "blur(12px)",
            }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#020817]"
          >
            {/* Background Glow */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/20 blur-3xl"
              />

              <motion.div
                animate={{
                  scale: [1.1, 1, 1.1],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-3xl"
              />
            </div>

            {/* Animated Text */}
            <div className="relative z-10 text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-200 bg-clip-text text-6xl font-black tracking-tight text-transparent md:text-8xl"
              >
                ARDENT
              </motion.h1>

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "220px" }}
                transition={{
                  duration: 2.5,
                  ease: "easeInOut",
                }}
                className="mx-auto mt-8 h-[3px] rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-300 shadow-[0_0_30px_rgba(59,130,246,0.9)]"
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mt-6 text-sm uppercase tracking-[0.4em] text-cyan-100/70"
              >
                Vision AI Interface
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main UI */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{
          opacity: loading ? 0 : 1,
          y: loading ? 30 : 0,
        }}
        transition={{
          duration: 1,
          ease: "easeOut",
        }}
      >
        {children}
      </motion.div>
    </>
  );
}