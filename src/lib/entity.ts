export interface Entity {
  readonly colour: string;
}

export class Tree implements Entity {
  #age = 12;

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
