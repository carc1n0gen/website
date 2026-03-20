import { stat } from "fs/promises";
import { fileURLToPath } from "url";

import { glob } from "astro/loaders";

export function blogLoader(options) {
  const inner = glob(options);
  return {
    name: "blog",
    load: async (context) => {
      const originalParseData = context.parseData;
      context.parseData = async ({ id, data, filePath }) => {
        let mtime;
        if (filePath) {
          try {
            const absPath = filePath.startsWith("file:")
              ? fileURLToPath(filePath)
              : filePath;
            mtime = (await stat(absPath)).mtime;
          } catch (err) {
            console.warn(`Could not get mtime for file: ${filePath}`, err);
          }
        }
        const match = id.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/);
        if (match) {
          const [, dateStr, slug] = match;
          const [year, month, day] = dateStr.split("-");
          data = {
            title: slug
              .replace(/-/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase()),
            date: dateStr,
            url: `/blog/${year}/${month}/${day}/${slug}`,
            ...(mtime ? { updated: mtime } : {}),
            ...data,
          };
        }
        return originalParseData({ id, data, filePath });
      };
      await inner.load(context);
    },
  };
}
