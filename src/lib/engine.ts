import { type Field } from "$lib/field.ts";
import { type Neighbours } from "$lib/entity.ts";
import { CompositeInteraction } from "$lib/interaction.ts";

export function step(field: Field) {
  let interactions = [];

  for (let [x, y, entity] of field.iterRowMajor()) {
    if (entity) {
      interactions.push(entity.step(neighbours(field, x, y)));
    }
  }

  new CompositeInteraction(...interactions).step(field);
}

function neighbours(field: Field, x: number, y: number): Neighbours {
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
