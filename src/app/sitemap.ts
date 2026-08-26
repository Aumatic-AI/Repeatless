import { MetadataRoute } from "next";
import { blogs } from "../../public/data/blogs";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.repeatless.in";

  const blogRoutes = blogs.map((blog) => ({
    url: `${base}/casestudies/${blog.slug}`,
    lastModified: new Date(blog.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/casestudies`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogRoutes,
  ];
}
