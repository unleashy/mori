import { type Entity, Tree } from "$lib/entity.ts";
import { type Neighbours } from "$lib/field.ts";
import { type Interaction, NullInteraction } from "$lib/interaction.ts";

export interface System {
  step(entity: Entity, neighbours: Neighbours): Interaction | undefined;
}

export class TreeSystem implements System {
  step(tree: Entity, neighbours: Neighbours): Interaction | undefined {
    if (!(tree instanceof Tree)) return undefined;

    return new NullInteraction();
  }
}
