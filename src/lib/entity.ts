export interface Entity {
  readonly colour: string;
}

export class Tree implements Entity {
  get colour() {
    return "#01a03b";
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
