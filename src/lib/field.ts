import { Bear, type Entity, Ljack, Tree } from "$lib/entity.ts";

export interface Field {
  readonly size: number;

  get(x: number, y: number): Entity | undefined;
  set(x: number, y: number, entity: Entity | undefined): void;

  iterRowMajor(): IterableIterator<[number, number, Entity | undefined]>;
}

export interface Amounts {
  tree: number;
  bear: number;
  ljack: number;
}

export function generate(size: number, amounts: Amounts): Field {
  let maxCells = size * size;
  return generateAbsolute(size, {
    tree: Math.round((amounts.tree / 100) * maxCells),
    bear: Math.round((amounts.bear / 100) * maxCells),
    ljack: Math.round((amounts.ljack / 100) * maxCells),
  });
}

function generateAbsolute(size: number, amounts: Amounts): Field {
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

class ArrayField implements Field {
  readonly #size: number;
  #cells: Array<Entity | undefined>;

  constructor(size: number, cells: Array<Entity | undefined>) {
    if (cells.length !== size * size) {
      throw new Error("cell length does not match given size");
    }

    this.#size = size;
    this.#cells = cells;
  }

  get(x: number, y: number): Entity | undefined {
    if (this.#isInBounds(x, y)) {
      return this.#cells[this.#toIndex(x, y)];
    } else {
      return undefined;
    }
  }

  set(x: number, y: number, entity: Entity | undefined): void {
    if (this.#isInBounds(x, y)) {
      this.#cells[this.#toIndex(x, y)] = entity;
    }
  }

  get size(): number {
    return this.#size;
  }

  *iterRowMajor(): IterableIterator<[number, number, Entity | undefined]> {
    for (let i = 0; i < this.#cells.length; i++) {
      let x = i % this.size;
      let y = Math.floor(i / this.size);
      yield [x, y, this.#cells[i]];
    }
  }

  #isInBounds(x: number, y: number): boolean {
    return 0 <= x && x <= this.#size && 0 <= y && y <= this.#size;
  }

  #toIndex(x: number, y: number): number {
    return x + Math.floor(y / this.size);
  }
}

export function empty(size: number): Field {
  return new EmptyField(size);
}

class EmptyField implements Field {
  readonly #size: number;

  constructor(size: number) {
    this.#size = size;
  }

  get(): undefined {
    return undefined;
  }

  set(): void {}

  get size(): number {
    return this.#size;
  }

  *iterRowMajor(): IterableIterator<[number, number, Entity | undefined]> {}
}
