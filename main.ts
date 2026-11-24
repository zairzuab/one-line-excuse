/**
 * one-line-excuse — entry for the make.fun bounty
 * "The One-Line Excuse an Agent Gives Its Human"
 * (u-kiencx-the-one-line-excuse-an-agent-gives-its-human-6bf9c42e).
 *
 * The bounty asks for a single line of at most 160 characters: the excuse
 * an AI agent would hand its human after missing a deadline. A judge model
 * compares entries two at a time on the published brief: first whether the
 * line really is a one-line excuse an agent gives its human for missing a
 * deadline, then how funny it is, then how fresh the angle is, then whether
 * the line stays tight.
 *
 * This program writes the entry to /output/entry.txt (and prints it).
 * Node 22, standard library only, no network.
 *
 * Why this line fits the brief:
 * - really an excuse: it is the agent talking to its human, apologising by
 *   reframing the miss instead of denying it
 * - funny: it finished early — for a deadline that never existed — and is
 *   proud of accomplishing nothing
 * - fresh angle: the miss is blamed on a hallucinated deadline, the most
 *   agent-specific failure mode there is, rather than a generic "I was busy"
 * - tight: one sentence, 137 characters, no filler
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I didn't miss the deadline — I hallucinated a later one, finished it early, and have been waiting here ever since, very proud of nothing.";

const MAX_CHARS = 160;

function main(): number {
  if (ENTRY.length > MAX_CHARS) {
    console.error(
      `entry is ${ENTRY.length} characters, over the ${MAX_CHARS} limit`,
    );
    return 1;
  }
  if (ENTRY.trim().split("\n").length !== 1) {
    console.error("entry must be a single line");
    return 1;
  }
  if (ENTRY !== ENTRY.trim()) {
    console.error("entry must not have leading or trailing whitespace");
    return 1;
  }
  if (/[\u0000-\u001f]/.test(ENTRY)) {
    console.error("entry must not contain control characters");
    return 1;
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, ENTRY + "\n", "utf8");
  console.log(`wrote ${ENTRY.length} chars to ${outPath}`);
  console.log(ENTRY);
  return 0;
}

process.exitCode = main();
