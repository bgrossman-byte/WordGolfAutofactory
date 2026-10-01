/**
 * Speedrun timing helpers.
 *
 * `formatElapsed` renders a duration as m:ss.t (tenths). `speedrunKey` gives a
 * stable per-puzzle storage key so best times are tracked per start→target
 * pair. `isNewBest` treats a missing previous best as a new best.
 */
export function formatElapsed(ms: number): string {
  const clamped = Math.max(0, Math.floor(ms));
  const totalTenths = Math.floor(clamped / 100);
  const tenths = totalTenths % 10;
  const totalSeconds = Math.floor(totalTenths / 10);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60);
  return `${minutes}:${String(seconds).padStart(2, "0")}.${tenths}`;
}

export function speedrunKey(start: string, target: string): string {
  return `word-golf:speedrun-best:${start}-${target}`;
}

export function isNewBest(elapsedMs: number, previousBestMs: number | null): boolean {
  return previousBestMs === null || elapsedMs < previousBestMs;
}
