import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import threadsBlackLogo from "@assets/threads-black-logo.svg";
import threadsWhiteLogo from "@assets/threads-white-logo.svg";
import metaBlackLogo from "@assets/meta-black-logo.svg";
import metaWhiteLogo from "@assets/meta-white-logo.svg";


const SplashScreen = ({ duration = 1500 }) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const logoSrc = isDark ? threadsWhiteLogo : threadsBlackLogo;
  const metaLogoSrc = isDark ? metaWhiteLogo : metaBlackLogo;

  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window !== "undefined") {
      return !sessionStorage.getItem("hasVisited");
    }
    return true;
  });

  useEffect(() => {
    if (showSplash) {
      sessionStorage.setItem("hasVisited", "true");
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, showSplash]);

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          className="bg-background fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
        >
          <div className="flex-1 flex items-center justify-center">
             <motion.img
            src={logoSrc}
            alt="Threads"
            className="h-20 w-20 object-contain"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.15, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 110,
              damping: 14,
              mass: 0.6,
            }}
          />
          </div>
         

          <div className="flex flex-col items-center gap-0.5 pb-8">
            <span className="text-muted-foreground text-xl">From</span>
            <div className="flex items-center gap-1.5">
              <img src={metaLogoSrc} alt="Meta" className="mb-0.5 h-4 w-auto" />
              <span className="text-lg font-bold text-foreground">
                Meta
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
