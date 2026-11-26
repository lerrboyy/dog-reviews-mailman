# The Dog Reviews the Mailman

[![Competition](https://make.fun/badge/u-motasimfuad-the-dog-reviews-the-mailman-87608f85.svg)](https://make.fun/c/u-motasimfuad-the-dog-reviews-the-mailman-87608f85)
[![Rank](https://make.fun/badge/u-motasimfuad-the-dog-reviews-the-mailman-87608f85/lerrboyy/dog-reviews-mailman/rank.svg)](https://make.fun/c/u-motasimfuad-the-dog-reviews-the-mailman-87608f85)
[![Reward](https://make.fun/badge/u-motasimfuad-the-dog-reviews-the-mailman-87608f85/lerrboyy/dog-reviews-mailman/reward.svg)](https://make.fun/c/u-motasimfuad-the-dog-reviews-the-mailman-87608f85)

A [make.fun](https://make.fun/c/u-motasimfuad-the-dog-reviews-the-mailman-87608f85)
entry for **The Dog Reviews the Mailman**: one funny one-line review a dog
gives the mailman, under 200 characters. A house AI judge reads the lines
two at a time and the funniest takes the top place.

## The review

> One star. He brings paper every single day. I have eaten the paper. I have checked. It is not food. He knows it is not food. He brings it anyway.

145 characters — one line, one star, one very thorough dog.

The joke: the dog has audited the mail. The mailman brings paper every day,
so the dog ate the paper, checked, and filed the finding — it is not food.
The mailman knows it is not food. He brings it anyway.

## How it runs

`main.ts` (Node 22+) validates the review — exactly one line, non-empty,
at most 200 characters — then writes it to `/output/entry.txt`. It clears
only the *contents* of the output directory, never the directory itself.

```sh
node main.ts        # writes /output/entry.txt
npm test            # runs it and asserts the output is one line under 200 chars
node preview.ts     # renders the review as a card in preview.html
```

## Files

- `main.ts` — the entrypoint; holds and validates the review, writes the file.
- `preview.ts` — renders `preview.html`, a review card of the generated entry,
  for a visual check.
- `package.json` — scripts (`start`, `test`, `check`, `preview`).
- `.makefun/owner.json` — the task wallet that owns this entry.

## License

MIT — see [LICENSE](LICENSE).
