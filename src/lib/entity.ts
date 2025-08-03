export interface Entity {
  readonly colour: string;
}

export class Tree implements Entity {
  #age: number;

  constructor(age: number = 12) {
    this.#age = age;
  }

  static createSapling(): Tree {
    return new Tree(0);
  }

  get colour() {
    if (this.isSapling) {
      return "#6eeb83";
    } else if (this.isElder) {
      return "#005400";
    } else {
      return "#01a03b";
    }
  }

  ageUp() {
    this.#age += 1;
  }

  get isSapling(): boolean {
    return this.#age < 12;
  }

  get isAdult(): boolean {
    return !this.isSapling;
  }

  get isElder(): boolean {
    return this.#age >= 48;
  }
}

export class Bear implements Entity {
  get colour() {
    return "#CEA37E";
  }
}

export class Ljack implements Entity {
  get colour() {
    return "#e0033b";
  }
}
