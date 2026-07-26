"use client";

import type { ReactNode } from "react";

import { MotionBoundary } from "@/components/motion/motion-boundary";
import { MotionElement } from "@/components/motion/motion-element";
import { pageEntranceVariants } from "@/components/motion/motion-variants";
import { useViewportMotion } from "@/components/motion/use-viewport-motion";

export interface PageEntranceProps {
  readonly children: ReactNode;
}

export function PageEntrance({ children }: PageEntranceProps) {
  const { elementRef, state } = useViewportMotion({
    amount: "some",
    margin: "0px 0px 0% 0px",
    once: true,
  });

  return (
    <MotionBoundary>
      <MotionElement
        elementRef={elementRef}
        initial={false}
        animate={state}
        variants={pageEntranceVariants}
        motionName="page-entrance"
        state={state}
      >
        {children}
      </MotionElement>
    </MotionBoundary>
  );
}
