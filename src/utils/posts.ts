import { getCollection, type CollectionEntry } from "astro:content";

export const POSTS_PER_PAGE = 10;

export type PostEntry = CollectionEntry<"posts">;

export type CategorySummary = {
  slug: string;
  count: number;
};

export type TagSummary = {
  slug: string;
  label: string;
  count: number;
};

export type SearchDocument = {
  title: string;
  description: string;
  category: string;
  tags: string[];
  slug: string;
  date: string;
};

export async function getPublishedPosts() {
  const entries = await getCollection("posts", ({ data }) => !data.draft);
  return entries.sort((left, right) => right.data.date.valueOf() - left.data.date.valueOf());
}

export function withBase(pathname: string) {
  const base = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  const normalized = pathname === "/" ? "" : pathname.replace(/^\/+/, "");
  return normalized ? `${base}${normalized}` : base;
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(date);
}

export function slugifyTag(tag: string) {
  return tag
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function groupByCategory(posts: PostEntry[]): CategorySummary[] {
  const counts = new Map<string, number>();

  for (const post of posts) {
    counts.set(post.data.category, (counts.get(post.data.category) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([slug, count]) => ({ slug, count }))
    .sort((left, right) => left.slug.localeCompare(right.slug));
}

export function groupByTag(posts: PostEntry[]): TagSummary[] {
  const counts = new Map<string, TagSummary>();

  for (const post of posts) {
    for (const tag of post.data.tags) {
      const slug = slugifyTag(tag);
      const current = counts.get(slug);

      if (current) {
        current.count += 1;
      } else {
        counts.set(slug, { slug, label: tag, count: 1 });
      }
    }
  }

  return [...counts.values()].sort((left, right) => left.slug.localeCompare(right.slug));
}

export function getSiteStats(posts: PostEntry[]) {
  const categories = groupByCategory(posts);
  const tags = groupByTag(posts);
  const latest = posts[0]?.data.date ?? null;

  return {
    totalPosts: posts.length,
    totalCategories: categories.length,
    totalTags: tags.length,
    latest
  };
}

export function paginatePosts(posts: PostEntry[], page: number, pageSize = POSTS_PER_PAGE) {
  const totalPages = Math.max(1, Math.ceil(posts.length / pageSize));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;

  return {
    items: posts.slice(start, end),
    currentPage,
    totalPages,
    totalItems: posts.length
  };
}

export function getPageUrl(page: number) {
  return page <= 1 ? withBase("/") : withBase(`/page/${page}/`);
}

export function getCategoryUrl(category: string) {
  return withBase(`/categories/${category}/`);
}

export function getTagUrl(tag: string) {
  return withBase(`/tags/${slugifyTag(tag)}/`);
}

export function getPostUrl(post: PostEntry) {
  return withBase(`/posts/${post.id}/`);
}

export function getPostsForCategory(posts: PostEntry[], category: string) {
  return posts.filter((post) => post.data.category === category);
}

export function getPostsForTag(posts: PostEntry[], tagSlug: string) {
  return posts.filter((post) => post.data.tags.some((tag) => slugifyTag(tag) === tagSlug));
}

export function getAdjacentPosts(posts: PostEntry[], currentId: string) {
  const currentIndex = posts.findIndex((post) => post.id === currentId);
  return {
    previous: currentIndex >= 0 ? posts[currentIndex + 1] ?? null : null,
    next: currentIndex > 0 ? posts[currentIndex - 1] ?? null : null
  };
}

export function buildSearchDocuments(posts: PostEntry[]): SearchDocument[] {
  return posts.map((post) => ({
    title: post.data.title,
    description: post.data.description,
    category: post.data.category,
    tags: post.data.tags,
    slug: post.id,
    date: formatDate(post.data.date)
  }));
}
