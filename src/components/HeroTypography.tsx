"use client";

import { motion, MotionValue, useTransform, useSpring } from "framer-motion";

interface HeroTypographyProps {
  scrollYProgress: MotionValue<number>;
}

export default function HeroTypography({
  scrollYProgress,
}: HeroTypographyProps) {
  /* ─── Scroll-linked motion values ─── */
  // Typography fades out as scroll progresses
  const rawOpacity = useTransform(scrollYProgress, [0, 0.5, 0.75], [1, 0.8, 0]);
  const opacity = useSpring(rawOpacity, { stiffness: 80, damping: 25 });

  // Typography floats upward
  const rawY = useTransform(scrollYProgress, [0, 0.7], [0, -80]);
  const y = useSpring(rawY, { stiffness: 80, damping: 25 });

  /* ─── Staggered entrance animation ─── */
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };



  return (
    <motion.div
      className="absolute inset-0 z-10 flex items-center pointer-events-none"
      style={{ opacity, y }}
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20">
        <motion.div
          className="w-full flex flex-col items-center justify-center pointer-events-auto relative"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* ─── Tagline ─── */}
          <motion.div variants={itemVariants} className="text-center mb-10 sm:mb-14">
            <span className="inline-block font-oliver font-light text-[3rem] sm:text-[5rem] md:text-[6.5rem] lg:text-[8rem] leading-[1] tracking-[0.02em] text-[rgb(132,66,66)]">
              Luxury Crafted
            </span>
          </motion.div>

          {/* ─── CTA Button ─── */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <a
              href="#collections"
              className="group inline-flex flex-col gap-1 text-white font-sans text-[11px] sm:text-[13px] tracking-[0.3em] uppercase font-medium transition-all"
            >
              <span className="relative pb-1">
                Explore Designs
                {/* Underline that animates on hover */}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white transform origin-left scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:origin-right group-hover:scale-x-0" />
              </span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
