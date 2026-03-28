import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const homepage = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");

test("homepage keeps the localized contact navigation item", () => {
  assert.match(homepage, />\s*联系我\s*</);
});

test("homepage renders local post cover images in the main feed", () => {
  const coverMatches = homepage.match(/\/blog\/covers\/[^"]+/g) ?? [];
  assert.ok(coverMatches.length >= 3, "expected at least three local cover images in the homepage feed");
});

test("homepage includes the prototype-style brand version line", () => {
  assert.match(homepage, /VER\s+4\.0\.2-STABLE/i);
});
