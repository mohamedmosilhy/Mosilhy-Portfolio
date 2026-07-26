export type MotionEasing = readonly [
  x1: number,
  y1: number,
  x2: number,
  y2: number,
];

export const motionTokens = {
  duration: {
    instant: 0,
    micro: 120,
    fast: 180,
    base: 260,
    slow: 420,
    deliberate: 600,
  },
  easing: {
    standard: [0.2, 0, 0, 1],
    enter: [0.16, 1, 0.3, 1],
    exit: [0.4, 0, 1, 1],
    emphasized: [0.22, 1, 0.36, 1],
    linear: [0, 0, 1, 1],
  },
  distance: {
    subtle: 8,
    small: 16,
    medium: 24,
  },
  scale: {
    hover: 1.02,
  },
  lift: {
    hover: -4,
    button: -1,
  },
  spring: {
    responsive: {
      stiffness: 420,
      damping: 32,
      mass: 0.8,
    },
    gentle: {
      stiffness: 220,
      damping: 28,
      mass: 1,
    },
  },
} as const satisfies {
  duration: Record<string, number>;
  easing: Record<string, MotionEasing>;
  distance: Record<string, number>;
  scale: Record<string, number>;
  lift: Record<string, number>;
  spring: Record<
    string,
    {
      readonly stiffness: number;
      readonly damping: number;
      readonly mass: number;
    }
  >;
};
