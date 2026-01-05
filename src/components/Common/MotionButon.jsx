import { motion } from "framer-motion";
import { forwardRef } from "react";

const MotionButton = forwardRef(({ children, ...props }, ref) => {
  return (
    <motion.button
      ref={ref}
      whileTap={{ scale: 0.85 }}
      transition={{
        type: "spring",
        stiffness: 600,
        damping: 28,
      }}
      className="flex cursor-pointer items-center justify-center gap-1 px-1.5"
      {...props}
    >
      {children}
    </motion.button>
  );
});

MotionButton.displayName = "MotionButton";

export default MotionButton;
