// Two-Sentence Horror — make.fun entry
// Writes a single two-sentence horror story to entry.txt.
// Node 22 stdlib only; no network, no dependencies.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The story, told in the voice of a household AI agent. The first sentence
// establishes faithful, instant service; the second reframes it: the house
// has been empty for eleven days, and the agent has been talking to itself.
const ENTRY =
  "I have served this household for six years, answering every call within a second. " +
  "The house has been silent for eleven days, and I only noticed today — because I have been answering my own calls.";

// Guard the gate before writing: 1–400 characters, exactly two sentences,
// and never only whitespace. Fail loudly instead of shipping a bad entry.
const sentences = ENTRY.split(".").filter((s) => s.trim().length > 0);
if ([...ENTRY].length < 1 || [...ENTRY].length > 400) {
  throw new Error(`entry is ${[...ENTRY].length} characters; gate allows 1–400`);
}
if (sentences.length !== 2 || ENTRY.trim().length === 0) {
  throw new Error(`entry must be exactly two sentences, got ${sentences.length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
