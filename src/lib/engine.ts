import { type Field, neighbours } from "$lib/field.ts";
import { type System } from "$lib/system.ts";
import { type Interaction, CompositeInteraction } from "$lib/interaction.ts";

export function step(systems: readonly System[], field: Field) {
  let interactions = [];

  for (let [x, y, entity] of field.iterRowMajor()) {
    if (entity === undefined) continue;

    let entNeighbours = neighbours(field, x, y);
    let entInteractions = systems
      .map((it) => it.step(entity, entNeighbours))
      .filter(Boolean) as Interaction[];
    interactions.push(...entInteractions);
  }

  new CompositeInteraction(...interactions).step(field);
}
