import { type Interaction, NullInteraction } from "$lib/interaction.ts";
import { type Neighbours } from "$lib/field.ts";

export interface Entity {
  readonly colour: string;

  step(neighbours: Neighbours<Entity>): Interaction<Entity>;
}

export class Tree implements Entity {
  step(neighbours: Neighbours<Entity>): Interaction<Entity> {
    return new NullInteraction();
  }

  get colour() {
    return "#01a03b";
  }
}

export class Bear implements Entity {
  step(neighbours: Neighbours<Entity>): Interaction<Entity> {
    return new NullInteraction();
  }

  get colour() {
    return "#CEA37E";
  }
}

export class Ljack implements Entity {
  step(neighbours: Neighbours<Entity>): Interaction<Entity> {
    return new NullInteraction();
  }

  get colour() {
    return "#e0033b";
  }
}
