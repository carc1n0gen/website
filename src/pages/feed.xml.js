import { Feed } from "feed";
import { getCollection } from "astro:content";

import { SITE_TITLE, SITE_SUBTITLE, SITE_URL } from "@/constants";

export async function GET(context) {
  const posts = (await getCollection("blog")).sort((a, b) => {
    return b.data.date.valueOf() - a.data.date.valueOf();
  });

  const feed = new Feed({
    title: SITE_TITLE,
    description: SITE_SUBTITLE,
    id: SITE_URL,
    link: SITE_URL,
    language: "en",
    feedLinks: {
      atom: `${SITE_URL}/feed.xml`,
    },
    author: {
      name: "Carson Evans",
      link: `${SITE_URL}/contact`,
    },
  });

  posts.forEach((post) => {
    feed.addItem({
      title: post.data.title,
      id: `${SITE_URL}${post.data.url}`,
      link: `${SITE_URL}${post.data.url}`,
      description: post.data.description,
      author: [
        {
          name: "Carson Evans",
          link: `${SITE_URL}/contact`,
        }
      ],
      date: post.data.date,
      updated: post.data.updated,
    });
  });

  return new Response(feed.atom1(), {
    headers: {
      "Content-Type": "application/atom+xml",
    },
  });
}
