import type { MetadataRoute } from "next";

import { getHomePageModel } from "@/lib/content/site-content";
import { createRobots } from "@/lib/metadata/discovery";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const model = await getHomePageModel();

  return createRobots(model.metadata);
}
