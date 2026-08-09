import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      data-testid="scroll-progress"
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[60] bg-[#D4AF37]"
      style={{ scaleX }}
    />
  );
}
