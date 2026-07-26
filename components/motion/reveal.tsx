"use client";

import type { ReactNode } from "react";

import { MotionBoundary } from "@/components/motion/motion-boundary";
import {
  MotionElement,
  type MotionElementName,
} from "@/components/motion/motion-element";
import {
  createRevealVariants,
  type RevealDistance,
} from "@/components/motion/motion-variants";
import { useViewportMotion } from "@/components/motion/use-viewport-motion";

export interface RevealProps {
  readonly children: ReactNode;
  readonly variant?: "fade" | "rise" | "slide-inline";
  readonly distance?: RevealDistance;
  /** Delay in milliseconds, capped at the documented 210ms sequence budget. */
  readonly delay?: number;
  readonly as?: MotionElementName;
  readonly once?: boolean;
  readonly className?: string;
}

export function Reveal({
  children,
  variant = "rise",
  distance = "small",
  delay = 0,
  as = "div",
  once = true,
  className,
}: RevealProps) {
  const { elementRef, state } = useViewportMotion({ once });

  return (
    <MotionBoundary>
      <MotionElement
        elementRef={elementRef}
        as={as}
        className={className}
        initial={false}
        animate={state}
        variants={createRevealVariants(variant, delay, distance)}
        motionName="reveal"
        state={state}
      >
        {children}
      </MotionElement>
    </MotionBoundary>
  );
}
