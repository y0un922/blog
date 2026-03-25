import { buildSearchDocuments, getPublishedPosts } from "../utils/posts";

export async function GET() {
  const posts = await getPublishedPosts();
  const documents = buildSearchDocuments(posts);

  return new Response(JSON.stringify(documents), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=300"
    }
  });
}
