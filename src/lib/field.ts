import { type Entity } from "$lib/entity.ts";

export interface Field {
  readonly size: number;

  get(x: number, y: number): Entity | undefined;
  set(x: number, y: number, entity: Entity | undefined): void;

  iterRowMajor(): IterableIterator<[number, number, Entity | undefined]>;
}

export interface Neighbours {
  readonly n: Entity | undefined;
  readonly ne: Entity | undefined;
  readonly e: Entity | undefined;
  readonly se: Entity | undefined;
  readonly s: Entity | undefined;
  readonly sw: Entity | undefined;
  readonly w: Entity | undefined;
  readonly nw: Entity | undefined;
}

export function neighbours(field: Field, x: number, y: number): Neighbours {
  return {
    n: field.get(x, y - 1),
    s: field.get(x, y + 1),
    w: field.get(x - 1, y),
    e: field.get(x + 1, y),
    nw: field.get(x - 1, y - 1),
    ne: field.get(x + 1, y - 1),
    sw: field.get(x - 1, y + 1),
    se: field.get(x + 1, y + 1),
  };
}

export class ArrayField implements Field {
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

export class EmptyField implements Field {
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

  *iterRowMajor(): IterableIterator<[number, number, undefined]> {}
}
