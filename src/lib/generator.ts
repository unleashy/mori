import { type Entity, Tree, Bear, Ljack } from "$lib/entity.ts";
import { type Field, ArrayField } from "$lib/field.ts";

export interface Amounts {
  tree: number;
  bear: number;
  ljack: number;
}

export function generate(size: number, amounts: Amounts): Field<Entity> {
  let maxCells = size * size;
  return generateAbsolute(size, {
    tree: Math.round((amounts.tree / 100) * maxCells),
    bear: Math.round((amounts.bear / 100) * maxCells),
    ljack: Math.round((amounts.ljack / 100) * maxCells),
  });
}

function generateAbsolute(size: number, amounts: Amounts): Field<Entity> {
  let maxCells = size * size;
  let totalAmount = amounts.tree + amounts.bear + amounts.ljack;
  let emptyCells = maxCells - totalAmount;
  if (emptyCells < 0) {
    throw new Error("size too small for given amount distribution");
  }

  let field: Array<Entity | undefined> = [];

  for (let i = 0; i < amounts.tree; ++i) field.push(new Tree());
  for (let i = 0; i < amounts.bear; ++i) field.push(new Bear());
  for (let i = 0; i < amounts.ljack; ++i) field.push(new Ljack());
  for (let i = 0; i < emptyCells; ++i) field.push(undefined);

  // TODO: swappable rng impl
  shuffleMutably(field);

  return new ArrayField(size, field);
}

function shuffleMutably(xs: unknown[]) {
  for (let i = xs.length - 1; i > 0; --i) {
    let j = randomInt(0, i + 1);
    [xs[i], xs[j]] = [xs[j], xs[i]];
  }
}

function randomInt(minInclusive: number, maxExclusive: number): number {
  let bound = maxExclusive - minInclusive;
  return minInclusive + Math.trunc(Math.random() * bound);
}
