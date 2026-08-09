"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";

import { cn } from "@/lib/utils/cn";

export interface TracingBeamProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function TracingBeam({ children, className }: TracingBeamProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const gradientId = useId().replaceAll(":", "");
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start 65%", "end 40%"],
  });

  useEffect(() => {
    const content = contentRef.current;

    if (!content) return;

    const updateHeight = () => setHeight(content.offsetHeight);
    updateHeight();

    if (typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(updateHeight);

    observer.observe(content);

    return () => observer.disconnect();
  }, []);

  const start = useSpring(
    useTransform(scrollYProgress, [0, 0.85], [0, Math.max(height - 160, 0)]),
    { stiffness: 320, damping: 55 },
  );
  const end = useSpring(
    useTransform(scrollYProgress, [0, 1], [80, Math.max(height, 80)]),
    { stiffness: 320, damping: 55 },
  );

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <div
        aria-hidden="true"
        className="absolute top-0 -left-space-10 hidden h-full w-5 md:block"
      >
        <span className="absolute top-0 left-1/2 size-3 -translate-x-1/2 rounded-full border border-accent bg-canvas shadow-[0_0_0_5px_var(--color-canvas)]" />
        <svg
          viewBox={`0 0 20 ${Math.max(height, 1)}`}
          width="20"
          height={height}
          className="block overflow-visible"
        >
          <path
            d={`M 10 0 V ${height}`}
            fill="none"
            stroke="var(--color-border-strong)"
            strokeWidth="1"
          />
          <motion.path
            d={`M 10 0 V ${height}`}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="2"
            className="motion-reduce:hidden"
          />
          <defs>
            <motion.linearGradient
              id={gradientId}
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={start}
              y2={end}
            >
              <stop stopColor="var(--color-accent)" stopOpacity="0" />
              <stop offset="0.18" stopColor="var(--color-accent)" />
              <stop offset="0.72" stopColor="var(--color-teal-400)" />
              <stop
                offset="1"
                stopColor="var(--color-teal-400)"
                stopOpacity="0"
              />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </div>
  );
}
