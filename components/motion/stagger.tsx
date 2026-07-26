"use client";

import { Children, type ReactNode } from "react";

import { MotionBoundary } from "@/components/motion/motion-boundary";
import {
  MotionElement,
  type MotionElementName,
} from "@/components/motion/motion-element";
import {
  createStaggerVariants,
  staggerIntervals,
  staggerItemMaximum,
} from "@/components/motion/motion-variants";
import { useViewportMotion } from "@/components/motion/use-viewport-motion";

export interface StaggerProps {
  readonly children: ReactNode;
  readonly variant?: "fast" | "default";
  readonly as?: MotionElementName;
  readonly className?: string;
}

export function Stagger({
  children,
  variant = "default",
  as = "div",
  className,
}: StaggerProps) {
  const itemCount = Children.count(children);
  const { elementRef, state } = useViewportMotion({ once: true });
  const stagger =
    itemCount <= staggerItemMaximum ? staggerIntervals[variant] : 0;

  return (
    <MotionBoundary>
      <MotionElement
        elementRef={elementRef}
        as={as}
        className={className}
        initial={false}
        animate={state}
        variants={createStaggerVariants(variant, itemCount)}
        motionName="stagger"
        state={state}
        itemCount={itemCount}
        stagger={state === "reduced" ? 0 : stagger}
      >
        {children}
      </MotionElement>
    </MotionBoundary>
  );
}
