import { type Entity } from "$lib/entity.ts";

export interface Field {
  readonly size: number;

  get(x: number, y: number): Entity | undefined;
  set(x: number, y: number, entity: Entity | undefined): void;

  [Symbol.iterator](): Iterator<[number, number, Entity | undefined]>;
}

function isInBounds(field: Field, x: number, y: number): boolean {
  return 0 <= x && x <= field.size && 0 <= y && y <= field.size;
}

export interface Cell {
  readonly entity: Entity | undefined;
  replace(entity: Entity | undefined): void;
  neighbours(): Cell[];
}

export class FieldCell implements Cell {
  readonly #field: Field;
  readonly #x: number;
  readonly #y: number;

  constructor(field: Field, x: number, y: number) {
    this.#field = field;
    this.#x = x;
    this.#y = y;
  }

  get entity(): Entity | undefined {
    return this.#field.get(this.#x, this.#y);
  }

  replace(entity: Entity | undefined): void {
    this.#field.set(this.#x, this.#y, entity);
  }

  neighbours(): Cell[] {
    return [
      [this.#x, this.#y - 1],
      [this.#x, this.#y + 1],
      [this.#x - 1, this.#y],
      [this.#x + 1, this.#y],
      [this.#x - 1, this.#y - 1],
      [this.#x + 1, this.#y - 1],
      [this.#x - 1, this.#y + 1],
      [this.#x + 1, this.#y + 1],
    ]
      .filter(([x, y]) => isInBounds(this.#field, x, y))
      .map(([x, y]) => new FieldCell(this.#field, x, y));
  }
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
    if (isInBounds(this, x, y)) {
      return this.#cells[this.#toIndex(x, y)];
    } else {
      return undefined;
    }
  }

  set(x: number, y: number, entity: Entity | undefined): void {
    if (isInBounds(this, x, y)) {
      this.#cells[this.#toIndex(x, y)] = entity;
    }
  }

  get size(): number {
    return this.#size;
  }

  *[Symbol.iterator](): Iterator<[number, number, Entity | undefined]> {
    for (let i = 0; i < this.#cells.length; ++i) {
      let x = i % this.size;
      let y = Math.trunc(i / this.size);
      yield [x, y, this.#cells[i]];
    }
  }

  #toIndex(x: number, y: number): number {
    return x + y * this.size;
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

  *[Symbol.iterator](): Iterator<[number, number, Entity | undefined]> {}
}
