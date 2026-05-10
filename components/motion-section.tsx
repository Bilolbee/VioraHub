"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ReactNode } from "react";

type MotionVariant = "fade-up" | "scale-in" | "stagger-children" | "parallax-soft";

type MotionSectionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  amount?: number;
  variant?: MotionVariant;
};

type MotionItemProps = {
  children: ReactNode;
  className?: string;
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] }
  }
};

const scaleInVariants: Variants = {
  hidden: { opacity: 0, y: 22, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.78, ease: [0.22, 1, 0.36, 1] }
  }
};

const parallaxSoftVariants: Variants = {
  hidden: { opacity: 0, y: 18, rotateX: 8 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.86, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerParentVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
      staggerChildren: 0.1,
      delayChildren: 0.06
    }
  }
};

const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.64, ease: [0.22, 1, 0.36, 1] }
  }
};

function getVariants(variant: MotionVariant): Variants {
  if (variant === "scale-in") return scaleInVariants;
  if (variant === "parallax-soft") return parallaxSoftVariants;
  if (variant === "stagger-children") return staggerParentVariants;
  return fadeUpVariants;
}

export function MotionSection({
  children,
  className,
  delay = 0,
  once = true,
  amount = 0.2,
  variant = "fade-up"
}: MotionSectionProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={getVariants(variant)}
      transition={{ delay }}
      style={variant === "parallax-soft" ? { transformStyle: "preserve-3d" } : undefined}
    >
      {children}
    </motion.div>
  );
}

export function MotionItem({ children, className }: MotionItemProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={staggerItemVariants}>
      {children}
    </motion.div>
  );
}
