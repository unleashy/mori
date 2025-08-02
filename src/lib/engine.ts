import { type Field, neighbours } from "$lib/field.ts";
import { type Entity } from "$lib/entity.ts";
import { CompositeInteraction } from "$lib/interaction.ts";

export function step(field: Field<Entity>) {
  let interactions = [];

  for (let [x, y, entity] of field.iterRowMajor()) {
    if (entity) {
      interactions.push(entity.step(neighbours(field, x, y)));
    }
  }

  new CompositeInteraction(...interactions).step(field);
}
