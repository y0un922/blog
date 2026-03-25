import rss from "@astrojs/rss";
import { getPublishedPosts } from "../utils/posts";

export async function GET() {
  const posts = await getPublishedPosts();

  return rss({
    title: "y0un92 // Terminal Editorial",
    description: "Engineering notes and terminal editorial writing.",
    site: new URL("https://y0un92.github.io/blog/"),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      link: `posts/${post.id}/`,
      pubDate: post.data.date
    })),
    customData: "<language>en</language>"
  });
}
