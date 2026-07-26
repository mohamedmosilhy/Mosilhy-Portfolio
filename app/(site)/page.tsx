import { getHomePageModel } from "@/lib/content/site-content";

export default async function HomePage() {
  const model = await getHomePageModel();

  return <h1 className="sr-only">{model.metadata.defaultTitle}</h1>;
}
