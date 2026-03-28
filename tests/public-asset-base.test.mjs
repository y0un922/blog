import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const baseLayout = await readFile(new URL("../src/layouts/BaseLayout.astro", import.meta.url), "utf8");
const globalStyles = await readFile(new URL("../src/styles/global.css", import.meta.url), "utf8");

test("font-face sources stay base-aware without hardcoded asset URLs in global.css", () => {
  assert.match(globalStyles, /src:\s*var\(--font-space-grotesk-400\);/);
  assert.match(globalStyles, /src:\s*var\(--font-space-grotesk-500\);/);
  assert.match(globalStyles, /src:\s*var\(--font-space-grotesk-700\);/);
  assert.match(globalStyles, /src:\s*var\(--font-jetbrains-mono-400\);/);
  assert.match(globalStyles, /src:\s*var\(--font-jetbrains-mono-700\);/);
  assert.doesNotMatch(globalStyles, /url\("\/(?:blog\/)?fonts\//);
  assert.match(baseLayout, /const fontBase = `\$\{assetBase\}fonts`;/);
  assert.match(baseLayout, /--font-space-grotesk-400: url\("\$\{fontBase\}\/space-grotesk-400\.ttf"\) format\("truetype"\);/);
  assert.match(baseLayout, /--font-jetbrains-mono-700: url\("\$\{fontBase\}\/jetbrains-mono-700\.ttf"\) format\("truetype"\);/);
});
