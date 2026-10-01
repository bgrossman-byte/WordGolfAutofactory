import { test } from "node:test";
import assert from "node:assert/strict";
import { formatElapsed, isNewBest, speedrunKey } from "../src/speedrun.js";

test("formatElapsed renders m:ss.t", () => {
  assert.equal(formatElapsed(0), "0:00.0");
  assert.equal(formatElapsed(1_250), "0:01.2");
  assert.equal(formatElapsed(65_900), "1:05.9");
  assert.equal(formatElapsed(600_000), "10:00.0");
});

test("formatElapsed clamps negative durations", () => {
  assert.equal(formatElapsed(-500), "0:00.0");
});

test("speedrunKey is stable per start/target pair", () => {
  assert.equal(speedrunKey("chime", "chats"), "word-golf:speedrun-best:chime-chats");
  assert.notEqual(speedrunKey("chime", "chats"), speedrunKey("chats", "chime"));
});

test("isNewBest beats a previous time or fills an empty record", () => {
  assert.equal(isNewBest(5_000, null), true);
  assert.equal(isNewBest(4_000, 5_000), true);
  assert.equal(isNewBest(5_000, 5_000), false);
  assert.equal(isNewBest(6_000, 5_000), false);
});
