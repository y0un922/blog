import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const baseLayout = await readFile(new URL("../src/layouts/BaseLayout.astro", import.meta.url), "utf8");
const postCard = await readFile(new URL("../src/components/PostCard.astro", import.meta.url), "utf8");
const searchModal = await readFile(new URL("../src/components/SearchModal.astro", import.meta.url), "utf8");

test("base layout and post cards keep public assets base-aware", () => {
  assert.match(baseLayout, /href=\{`\$\{assetBase\}favicon\.svg`\}/);
  assert.match(postCard, /const cover = post\.data\.cover \? withBase\(post\.data\.cover\) : null;/);
});

test("search modal uses explicit base-aware URLs instead of a root fallback", () => {
  assert.match(searchModal, /data-search-index-url=\{searchIndexUrl\}/);
  assert.match(searchModal, /data-posts-base-url=\{postsBaseUrl\}/);
  assert.match(searchModal, /fetch\(searchIndexUrl\)/);
  assert.match(searchModal, /href="\$\{postsBaseUrl\}\$\{item\.slug\}\/"/);
  assert.doesNotMatch(searchModal, /\?\? "\/"/);
});
