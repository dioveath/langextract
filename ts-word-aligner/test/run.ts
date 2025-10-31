import { alignBeats } from "../src";
import type { StoryBeatCandidate } from "../src";

const story = `Lena walked into the forest.
She followed a narrow path until she found an ancient tree.
The tree whispered secrets and offered her a glowing seed.
She returned home determined to plant it.`;

const beatCandidates: StoryBeatCandidate[] = [
  {
    title: "Into the woods",
    script: "Lena walked into the forest.\nShe followed a narrow path",
  },
  {
    title: "A mysterious gift",
    script:
      "until she discovered an ancient tree that whispered secrets and offered her a glowing seed.",
  },
  {
    title: "Homecoming",
    script: "She brought the seed home and planned to plant it.",
  },
];

const results = alignBeats(story, beatCandidates, {
  fuzzyThreshold: 0.55,
  maxExpansion: 160,
  maxContraction: 0.45,
});

console.log("Aligned beats:\n");
for (const beat of results) {
  console.log({
    title: beat.title,
    exact: beat.exact,
    similarity: Number(beat.similarity.toFixed(3)),
    start: beat.start,
    end: beat.end,
  });
  console.log("Matched text:\n" + beat.matchedText + "\n");
}

const reconstructed = results.map((beat) => beat.matchedText).join("");
console.log("Story fully reconstructed:", reconstructed === story);
