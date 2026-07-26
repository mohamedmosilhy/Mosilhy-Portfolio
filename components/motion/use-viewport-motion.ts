"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";

import { useReducedMotionPreference } from "@/components/motion/reduced-motion";

const revealMargin = "0px 0px -10% 0px";
const revealAmount = 0.15;

interface ViewportMotionOptions {
  readonly amount?: "some" | number;
  readonly margin?: `${number}px ${number}px ${number}% ${number}px`;
  readonly once: boolean;
}

export function useViewportMotion({
  amount = revealAmount,
  margin = revealMargin,
  once,
}: ViewportMotionOptions) {
  const elementRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotionPreference();
  const isInView = useInView(elementRef, {
    amount,
    margin,
    once,
  });
  const state = shouldReduceMotion
    ? "reduced"
    : isInView
      ? "visible"
      : "hidden";

  return {
    elementRef,
    state,
  } as const;
}
