import type { Profile } from "@/types/content";

const journey = [
  {
    id: "cs50-foundations",
    period: "The beginning",
    eyebrow: "CS50",
    title: "Learning how to think in code",
    description:
      "I started with CS50. It was the beginning of my programming journey, giving me a foundation in C, Python, SQL, algorithms, and the web. More importantly, it taught me how to break a difficult problem into smaller parts and keep working until the system made sense.",
    evidence: ["C", "Python", "SQL", "Flask", "Problem solving"],
    order: 1,
  },
  {
    id: "biomedical-engineering",
    period: "The engineering years",
    eyebrow: "Cairo University",
    title: "Using software to understand real signals",
    description:
      "I then earned my bachelor’s degree in Biomedical Engineering at Cairo University. Engineering made programming practical: I used Python to work with biomedical signals, medical images, data, and machine-learning models. Projects such as the Signal Equalizer, Fourier Image Mixer, Computer Vision Toolbox, and stroke-clot classification taught me to measure, experiment, and explain technical decisions.",
    evidence: [
      "Signal processing",
      "Computer vision",
      "Machine learning",
      "Scientific computing",
    ],
    order: 2,
  },
  {
    id: "odin-project",
    period: "The self-taught path",
    eyebrow: "The Odin Project",
    title: "Connecting the whole web stack",
    description:
      "After university, I continued the journey on my own through The Odin Project and completed its MERN stack path. Building projects from browser fundamentals through React, Node.js, Express, databases, authentication, and testing taught me how complete products fit together—not only how individual technologies work.",
    evidence: [
      "JavaScript",
      "React",
      "Node.js",
      "Express",
      "Databases",
      "Testing",
    ],
    order: 3,
  },
  {
    id: "freelance-work",
    period: "The professional chapter",
    eyebrow: "Freelance",
    title: "Building for people, not assignments",
    description:
      "That foundation led me into freelance work and a growing range of client projects. Real briefs taught me to turn unclear ideas into useful interfaces, communicate trade-offs, work within deadlines, and care about performance, maintainability, and the final experience. Today I bring engineering, full-stack development, and thoughtful motion together to build software that feels clear and dependable.",
    evidence: [
      "Client discovery",
      "Full-stack delivery",
      "Performance",
      "Motion and interaction",
    ],
    order: 4,
  },
] as const;

export const profile = {
  greeting: "Hello, I’m",
  name: "Mohamed Mosilhy",
  role: "Full-stack developer",
  introduction:
    "I build fast, polished applications with clean architecture, optimized performance, and thoughtful user experiences.",
  biography: journey.map((chapter) => chapter.description),
  journey,
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
