"use client";

import { LazyMotion } from "framer-motion";
import type { ReactNode } from "react";

const loadMotionFeatures = () =>
  import("@/components/motion/motion-features").then(
    (module) => module.default,
  );

export function MotionBoundary({ children }: { readonly children: ReactNode }) {
  return (
    <LazyMotion features={loadMotionFeatures} strict>
      {children}
    </LazyMotion>
  );
}
