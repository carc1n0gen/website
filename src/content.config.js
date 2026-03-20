import { defineCollection } from "astro:content";
import { z } from "zod";

import { blogLoader } from "./lib/content-loaders";

const blog = defineCollection({
  loader: blogLoader({ base: "./src/content/blog", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    updated: z.coerce.date(),
    url: z.string(),
  }),
});

export const collections = {
  blog,
};
