import type { Variants } from "framer-motion";

import { motionTokens } from "@/components/motion/motion-tokens";

const revealDelayMaximum = 210;
export const staggerItemMaximum = 6;
export const staggerIntervals = {
  fast: 50,
  default: 70,
} as const;
export type RevealDistance = "subtle" | "small";

function seconds(milliseconds: number) {
  return milliseconds / 1000;
}

function normalizeRevealDelay(delay: number) {
  if (!Number.isFinite(delay)) {
    return 0;
  }

  return Math.min(Math.max(delay, 0), revealDelayMaximum);
}

const immediateVisible = {
  opacity: 1,
  x: 0,
  y: 0,
  transition: {
    duration: seconds(motionTokens.duration.instant),
  },
} as const;

export function createRevealVariants(
  variant: "fade" | "rise" | "slide-inline",
  delay: number,
  distance: RevealDistance = "small",
): Variants {
  const hidden = {
    opacity: 0,
    x: variant === "slide-inline" ? motionTokens.distance[distance] : 0,
    y: variant === "rise" ? motionTokens.distance[distance] : 0,
  };

  return {
    hidden,
    reduced: immediateVisible,
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        delay: seconds(normalizeRevealDelay(delay)),
        duration: seconds(motionTokens.duration.slow),
        ease: motionTokens.easing.enter,
      },
    },
  };
}

export function createStaggerVariants(
  variant: "default" | "fast",
  itemCount: number,
): Variants {
  const stagger =
    itemCount <= staggerItemMaximum ? seconds(staggerIntervals[variant]) : 0;

  return {
    hidden: {},
    reduced: {
      transition: {
        delayChildren: 0,
        staggerChildren: 0,
      },
    },
    visible: {
      transition: {
        delayChildren: 0,
        staggerChildren: stagger,
      },
    },
  };
}

export function createStaggerItemVariants(variant: "fade" | "rise"): Variants {
  return {
    hidden: {
      opacity: 0,
      y: variant === "rise" ? motionTokens.distance.subtle : 0,
    },
    reduced: immediateVisible,
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: seconds(motionTokens.duration.base),
        ease: motionTokens.easing.enter,
      },
    },
  };
}

export const pageEntranceVariants: Variants = {
  hidden: {
    opacity: 0,
    y: motionTokens.distance.subtle,
  },
  reduced: immediateVisible,
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: seconds(motionTokens.duration.slow),
      ease: motionTokens.easing.enter,
    },
  },
};
