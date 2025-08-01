import { type Interaction, NullInteraction } from "$lib/interaction.ts";

export interface Entity {
  readonly colour: string;

  step(neighbours: Neighbours): Interaction;
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

export class Tree implements Entity {
  step(neighbours: Neighbours): Interaction {
    return new NullInteraction();
  }

  get colour() {
    return "#01a03b";
  }
}

export class Bear implements Entity {
  step(neighbours: Neighbours): Interaction {
    return new NullInteraction();
  }

  get colour() {
    return "#CEA37E";
  }
}

export class Ljack implements Entity {
  step(neighbours: Neighbours): Interaction {
    return new NullInteraction();
  }

  get colour() {
    return "#e0033b";
  }
}
