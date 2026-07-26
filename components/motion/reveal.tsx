"use client";

import type { ReactNode } from "react";

import { MotionBoundary } from "@/components/motion/motion-boundary";
import {
  MotionElement,
  type MotionElementName,
} from "@/components/motion/motion-element";
import { createRevealVariants } from "@/components/motion/motion-variants";
import { useViewportMotion } from "@/components/motion/use-viewport-motion";

export interface RevealProps {
  readonly children: ReactNode;
  readonly variant?: "fade" | "rise" | "slide-inline";
  /** Delay in milliseconds, capped at the documented 210ms sequence budget. */
  readonly delay?: number;
  readonly as?: MotionElementName;
  readonly once?: boolean;
}

export function Reveal({
  children,
  variant = "rise",
  delay = 0,
  as = "div",
  once = true,
}: RevealProps) {
  const { elementRef, state } = useViewportMotion({ once });

  return (
    <MotionBoundary>
      <MotionElement
        elementRef={elementRef}
        as={as}
        initial={false}
        animate={state}
        variants={createRevealVariants(variant, delay)}
        motionName="reveal"
        state={state}
      >
        {children}
      </MotionElement>
    </MotionBoundary>
  );
}
