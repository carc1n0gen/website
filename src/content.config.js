import { defineCollection } from "astro:content";
import { z } from "zod";

import { blogLoader } from "./lib/content-loaders";

const blog = defineCollection({
  loader: blogLoader({
    base: "./src/content/blog",
    pattern: "**/*.{md,mdx,astro}",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    keywords: z.string().optional(),
    tags: z.array(z.string()).optional(),
    date: z.coerce.date(),
    updated: z.coerce.date(),
    url: z.string(),
    disqus_identifier: z.string(),
  }),
});

export const collections = {
  blog,
};
