// Review-card preview for "The Dog Reviews the Mailman".
// Reads the generated /output/entry.txt and renders it as a dog-review card
// (preview.html) in this directory, so the entry can be eyeballed and
// screenshotted with Playwright. This is a local checking aid only — the
// graded artifact is /output/entry.txt, written by main.ts.

import { readFileSync, writeFileSync } from "node:fs";

const ENTRY_PATH = "/output/entry.txt";
const PREVIEW_PATH = "preview.html";

const review = readFileSync(ENTRY_PATH, "utf8").trim();
const chars = [...review].length;

const stars = "★☆☆☆☆";

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>The Dog Reviews the Mailman</title>
<style>
  * { box-sizing: border-box; }
  body {
    margin: 0; min-height: 100vh; display: flex; align-items: center;
    justify-content: center; background: #f4ede1;
    font-family: Georgia, "Times New Roman", serif; color: #2b2118;
  }
  .card {
    width: 640px; max-width: 92vw; background: #fffdf8;
    border: 2px solid #2b2118; border-radius: 16px;
    box-shadow: 8px 8px 0 #2b2118; padding: 32px 36px;
  }
  .header { display: flex; align-items: center; gap: 16px; }
  .avatar {
    width: 64px; height: 64px; border-radius: 50%;
    background: #f2c94c; border: 2px solid #2b2118;
    display: flex; align-items: center; justify-content: center;
    font-size: 34px;
  }
  .who { line-height: 1.25; }
  .who .name { font-size: 22px; font-weight: bold; }
  .who .meta { font-size: 14px; color: #7a6a58; }
  .stars { color: #e8a100; font-size: 26px; letter-spacing: 4px; margin: 18px 0 6px; }
  .review { font-size: 22px; line-height: 1.55; margin: 0; }
  .footer {
    margin-top: 22px; padding-top: 14px; border-top: 1px dashed #c9bba6;
    font-size: 14px; color: #7a6a58;
    display: flex; justify-content: space-between;
  }
</style>
</head>
<body>
  <main class="card">
    <div class="header">
      <div class="avatar" aria-hidden="true">&#128054;</div>
      <div class="who">
        <div class="name">Bark Twain</div>
        <div class="meta">Verified porch guardian &middot; reviewing The Mailman</div>
      </div>
    </div>
    <div class="stars" aria-label="1 out of 5 stars">${stars}</div>
    <p class="review">${review}</p>
    <div class="footer">
      <span>make.fun &middot; The Dog Reviews the Mailman</span>
      <span>${chars} / 200 characters</span>
    </div>
  </main>
</body>
</html>
`;

writeFileSync(PREVIEW_PATH, html, "utf8");
console.log(`Wrote ${PREVIEW_PATH} (${chars} chars in the review).`);
