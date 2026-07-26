"use client";

import type { Variants } from "framer-motion";
import * as m from "framer-motion/m";
import type { ComponentType, ReactNode, Ref } from "react";

export type MotionElementName =
  | "article"
  | "div"
  | "footer"
  | "header"
  | "li"
  | "main"
  | "nav"
  | "ol"
  | "section"
  | "ul";

const elements = {
  article: m.article,
  div: m.div,
  footer: m.footer,
  header: m.header,
  li: m.li,
  main: m.main,
  nav: m.nav,
  ol: m.ol,
  section: m.section,
  ul: m.ul,
} as const;

interface MotionElementProps {
  readonly animate?: string;
  readonly as?: MotionElementName;
  readonly children: ReactNode;
  readonly className?: string;
  readonly elementRef?: Ref<HTMLElement>;
  readonly initial?: false | string;
  readonly itemCount?: number;
  readonly motionName: string;
  readonly stagger?: number;
  readonly state?: string;
  readonly variants: Variants;
}

export function MotionElement({
  animate,
  as = "div",
  children,
  className,
  elementRef,
  initial,
  itemCount,
  motionName,
  stagger,
  state,
  variants,
}: MotionElementProps) {
  const Component = elements[as] as ComponentType<{
    readonly animate?: string;
    readonly children: ReactNode;
    readonly className?: string;
    readonly initial?: false | string;
    readonly ref?: Ref<HTMLElement>;
    readonly variants: Variants;
    readonly "data-motion": string;
    readonly "data-motion-item-count"?: number;
    readonly "data-motion-state"?: string;
    readonly "data-motion-stagger"?: number;
  }>;

  return (
    <Component
      ref={elementRef}
      className={className}
      initial={initial}
      animate={animate}
      variants={variants}
      data-motion={motionName}
      data-motion-item-count={itemCount}
      data-motion-state={state}
      data-motion-stagger={stagger}
    >
      {children}
    </Component>
  );
}
