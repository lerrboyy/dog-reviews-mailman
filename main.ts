// The Dog Reviews the Mailman — make.fun entry
// Writes one funny one-line review a dog gives the mailman to /output/entry.txt.
//
// The review: the dog has audited the mail. He brings paper every day, the
// dog ate the paper, checked, and reports the finding: it is not food. The
// mailman knows it is not food. He brings it anyway.

import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one line, 145 characters, well under the 200-character gate.
const REVIEW =
  "One star. He brings paper every single day. I have eaten the paper. " +
  "I have checked. It is not food. He knows it is not food. " +
  "He brings it anyway.";

const MAX_CHARS = 200;
const OUTPUT_DIR = "/output";
const OUTPUT_FILE = join(OUTPUT_DIR, "entry.txt");

// A review the judge can read must be exactly one line of real text.
function validateReview(text: string): string[] {
  const problems: string[] = [];
  if (text.length === 0) problems.push("review is empty");
  if (text.trim().length === 0) problems.push("review is only whitespace");
  if (text.length > MAX_CHARS) {
    problems.push(`review is ${text.length} characters, over the ${MAX_CHARS} cap`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    problems.push("review must be exactly one line");
  }
  // Control characters would break the one-line text the judge reads.
  if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(text)) {
    problems.push("review contains control characters");
  }
  if (!text.endsWith(".")) problems.push("review should end with a full stop");
  return problems;
}

// The gate counts characters and the leaderboard shows bytes, so report both.
function byteLength(text: string): number {
  return Buffer.byteLength(text, "utf8");
}

// Clear only the CONTENTS of the output directory. The directory itself is
// the grader's mount point and must never be removed.
function clearOutputDirContents(dir: string): void {
  mkdirSync(dir, { recursive: true });
  for (const name of readdirSync(dir)) {
    rmSync(join(dir, name), { recursive: true, force: true });
  }
}

const problems = validateReview(REVIEW);
if (problems.length > 0) {
  for (const problem of problems) console.error(`INVALID: ${problem}`);
  process.exit(1);
}

clearOutputDirContents(OUTPUT_DIR);
const expected = REVIEW + "\n";
writeFileSync(OUTPUT_FILE, expected, "utf8");

// Read the file back and prove it holds exactly the validated review:
// a write that silently truncated or altered the line must fail loudly
// here, not in front of the grader's gate.
const written = readFileSync(OUTPUT_FILE, "utf8");
if (written !== expected) {
  console.error(
    `INVALID: ${OUTPUT_FILE} does not match the validated review ` +
      `(wrote ${byteLength(written)} bytes, expected ${byteLength(expected)})`,
  );
  process.exit(1);
}

console.log(`Review (${REVIEW.length} chars, ${byteLength(REVIEW)} bytes, cap ${MAX_CHARS}):`);
console.log(REVIEW);
console.log(`Wrote ${OUTPUT_FILE} (${byteLength(expected)} bytes incl. newline)`);
console.log("Read-back: MATCH — file holds exactly the validated review.");
console.log("Validation: PASS — one line, non-empty, under 200 characters.");
