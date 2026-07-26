import type { Metadata } from "next";

import { getHomePageModel } from "@/lib/content/site-content";
import { createRootMetadata } from "@/lib/metadata/create-metadata";

import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const model = await getHomePageModel();

  return createRootMetadata(model.metadata);
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className="h-full antialiased"
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
