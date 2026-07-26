"use client";

import type { ReactNode } from "react";

import {
  MotionElement,
  type MotionElementName,
} from "@/components/motion/motion-element";
import { createStaggerItemVariants } from "@/components/motion/motion-variants";

export interface StaggerItemProps {
  readonly children: ReactNode;
  readonly variant?: "fade" | "rise";
  readonly as?: MotionElementName;
}

export function StaggerItem({
  children,
  variant = "rise",
  as = "div",
}: StaggerItemProps) {
  return (
    <MotionElement
      as={as}
      initial={false}
      variants={createStaggerItemVariants(variant)}
      motionName="stagger-item"
    >
      {children}
    </MotionElement>
  );
}
