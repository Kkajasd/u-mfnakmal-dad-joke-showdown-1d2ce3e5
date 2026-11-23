import { mkdirSync, writeFileSync } from "node:fs";

// Dad Joke Showdown: a single original dad joke, told at the dinner table.
// The pun lands on the last words: dinner rolls that "rose to the occasion"
// leave Dad with the "yeast" of his worries — least, but bread-flavoured.
// A fresh angle (rolls rising at dinner, not a recycled one-liner), playful
// and clean enough for the family table, with the punchline at the very end.
// Deterministic: the same text on every run. No network, no file reads.
// Never deletes /output: the dir is created if missing and entry.txt is
// written in place (the sandbox bind-mounts /output).
const LINE =
  "I told the dinner rolls they were really on a roll tonight, and they rose to the occasion — now they're the yeast of my worries.";

// Guard the sealed scorer's gate (1-200 UTF-8 chars, one line, not blank)
// before writing, so a bad line fails loudly here instead of scoring 0.
// [...LINE] counts Unicode code points, matching the scorer's char count.
const chars = [...LINE];
if (chars.length < 1 || chars.length > 200 || LINE.includes("\n") || LINE.trim() === "") {
  throw new Error(`entry line fails the 1-200 char single-line gate (${chars.length} chars)`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
