import { motion } from "framer-motion";

export default function MotionButton({ children }) {
  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      transition={{
        type: "spring",
        stiffness: 800,
        damping: 28,
      }}
      className="flex cursor-pointer items-center justify-center gap-1"
    >
      {children}
    </motion.button>
  );
}
