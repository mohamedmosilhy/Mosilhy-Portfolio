import type { Profile } from "@/types/content";

export const profile = {
  greeting: "Hello, I’m",
  name: "Mohamed Mosilhy",
  role: "Full-stack developer",
  introduction:
    "I build fast, polished applications with clean architecture, optimized performance, and thoughtful user experiences.",
  biography: [
    "I came to programming through biomedical engineering, where code gave me a practical way to explore signals, images, and data. Python turned abstract technical problems into tools I could test, understand, and improve.",
    "That curiosity grew into computer vision and scientific-computing projects. Working across image processing, Fourier analysis, and machine learning taught me to break complex problems into clear, measurable steps.",
    "I wanted those ideas to become products people could actually use, so I moved deeper into web development—first shaping responsive interfaces, then learning the server logic, databases, authentication, and testing behind them.",
    "Today I work across the full stack with React and Next.js, combining an engineer’s systems thinking with a growing focus on motion, interaction, and browser-based 3D. The goal is always the same: make ambitious software feel clear and human.",
  ],
  experience: [],
  interests: [
    {
      id: "full-stack-systems",
      label: "Full-stack systems",
      description:
        "Web applications that connect maintainable interfaces, server logic, and relational data.",
      order: 1,
    },
    {
      id: "interactive-experiences",
      label: "Interactive experiences",
      description:
        "Animation, responsive interaction, and browser-based 3D presentation.",
      order: 2,
    },
    {
      id: "biomedical-engineering",
      label: "Biomedical engineering",
      description:
        "An engineering background that also informs computer-vision and scientific-computing projects.",
      order: 3,
    },
  ],
  location: "Cairo, Egypt",
  portrait: {
    kind: "image",
    src: "/images/profile/mohamed-mosilhy.avif",
    alt: "Portrait of Mohamed Mosilhy",
    width: 720,
    height: 960,
  },
  email: "mailto:mmosilhyofficial@gmail.com",
  primaryCta: {
    label: "View projects",
    href: "/#projects",
  },
  secondaryCta: {
    label: "Get in touch",
    href: "/#contact",
  },
} as const satisfies Profile;
