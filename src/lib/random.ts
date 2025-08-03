export function randomInt(minInclusive: number, maxExclusive: number): number {
  let bound = maxExclusive - minInclusive;
  return minInclusive + Math.trunc(Math.random() * bound);
}

export function randomFloat(min: number, max: number): number {
  let bound = max - min;
  return min + Math.random() * bound;
}

export function shuffleMutably(xs: unknown[]) {
  for (let i = xs.length - 1; i > 0; --i) {
    let j = randomInt(0, i + 1);
    [xs[i], xs[j]] = [xs[j], xs[i]];
  }
}

export function weightedChoice(...proportions: readonly number[]): number {
  let sum = proportions.reduce((a, b) => a + b, 0);
  if (sum <= 0) throw new RangeError("proportions must sum to >= 0");

  let point = randomFloat(0, sum);
  let mass = 0;

  let i = 0;
  for (let p of proportions) {
    mass += p;
    if (point < mass) break;

    ++i;
  }

  return i;
}

export function binaryChoice(trueProportion: number): boolean {
  return weightedChoice(trueProportion, 1 - trueProportion) === 0;
}

export function sample<T>(items: readonly T[]): T {
  if (items.length === 0) throw new RangeError("no items to sample");
  return items[randomInt(0, items.length)];
}
