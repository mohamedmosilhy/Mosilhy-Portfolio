import type { Profile } from "@/types/content";

export const profile = {
  greeting: "Hello, I’m",
  name: "Mohamed Mosilhy",
  role: "Full-stack developer",
  introduction:
    "I build fast, polished applications with clean architecture, optimized performance, and thoughtful user experiences.",
  biography: [
    "My web work includes React and Next.js interfaces, server-side application logic, relational data modeling, authentication, and tested business workflows.",
    "I also build animation-led interfaces and interactive 3D experiences, alongside Python projects in computer vision and scientific computing.",
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
