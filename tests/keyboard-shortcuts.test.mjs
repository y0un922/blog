import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const baseLayout = await readFile(new URL("../src/layouts/BaseLayout.astro", import.meta.url), "utf8");
const pageLayout = await readFile(new URL("../src/layouts/PageLayout.astro", import.meta.url), "utf8");
const postCard = await readFile(new URL("../src/components/PostCard.astro", import.meta.url), "utf8");

test("base layout exposes a lazyvim-style shortcut help panel", () => {
  assert.match(baseLayout, /data-shortcuts-panel/);
  assert.match(baseLayout, /g h/);
  assert.match(baseLayout, /g a/);
  assert.match(baseLayout, /g c/);
  assert.match(baseLayout, /g p/);
  assert.match(baseLayout, /gg/);
  assert.match(baseLayout, /Shift \+ g|Shift\+g/);
});

test("base layout script wires global navigation and scroll keys", () => {
  assert.match(baseLayout, /sequenceBuffer|pendingSequence/);
  assert.match(baseLayout, /event\.key === "\?"/);
  assert.match(baseLayout, /event\.key === "Escape"/);
  assert.match(baseLayout, /event\.key === "j"/);
  assert.match(baseLayout, /event\.key === "k"/);
  assert.match(baseLayout, /scrollBy\(/);
  assert.match(baseLayout, /scrollTo\(/);
});

test("page layout marks the feed anchor for keyboard navigation", () => {
  assert.match(pageLayout, /id="post-feed"/);
});

test("post cards expose a keyboard-selection hook", () => {
  assert.match(postCard, /data-shortcut-card/);
  assert.match(postCard, /data-shortcut-index/);
});

test("base layout promotes j and k into card selection with enter-to-open", () => {
  assert.match(baseLayout, /activeCardIndex/);
  assert.match(baseLayout, /getFeedCards/);
  assert.match(baseLayout, /setActiveCard/);
  assert.match(baseLayout, /openActiveCard/);
  assert.match(baseLayout, /event\.key === "Enter"/);
  assert.match(baseLayout, /data-selected|dataset\.selected/);
});
