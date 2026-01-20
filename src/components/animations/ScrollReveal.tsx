'use client';

import { motion, useInView, HTMLMotionProps } from 'framer-motion';
import { useRef, ReactNode } from 'react';

export interface ScrollRevealProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  threshold?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  direction = 'up',
  ...props
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });

  const variants = {
    hidden: {
      opacity: 0,
      x: direction === 'left' ? -60 : direction === 'right' ? 60 : 0,
      y: direction === 'up' ? 60 : direction === 'down' ? -60 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
