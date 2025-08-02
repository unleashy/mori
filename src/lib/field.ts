export interface Field<T> {
  readonly size: number;

  get(x: number, y: number): T | undefined;
  set(x: number, y: number, entity: T | undefined): void;

  iterRowMajor(): IterableIterator<[number, number, T | undefined]>;
}

export interface Neighbours<T> {
  readonly n: T | undefined;
  readonly ne: T | undefined;
  readonly e: T | undefined;
  readonly se: T | undefined;
  readonly s: T | undefined;
  readonly sw: T | undefined;
  readonly w: T | undefined;
  readonly nw: T | undefined;
}

export function neighbours<T>(
  field: Field<T>,
  x: number,
  y: number,
): Neighbours<T> {
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

export class ArrayField<T> implements Field<T> {
  readonly #size: number;
  #cells: Array<T | undefined>;

  constructor(size: number, cells: Array<T | undefined>) {
    if (cells.length !== size * size) {
      throw new Error("cell length does not match given size");
    }

    this.#size = size;
    this.#cells = cells;
  }

  get(x: number, y: number): T | undefined {
    if (this.#isInBounds(x, y)) {
      return this.#cells[this.#toIndex(x, y)];
    } else {
      return undefined;
    }
  }

  set(x: number, y: number, entity: T | undefined): void {
    if (this.#isInBounds(x, y)) {
      this.#cells[this.#toIndex(x, y)] = entity;
    }
  }

  get size(): number {
    return this.#size;
  }

  *iterRowMajor(): IterableIterator<[number, number, T | undefined]> {
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

export class EmptyField implements Field<undefined> {
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
