import { type Field, FieldCell } from "$lib/field.ts";
import { type System } from "$lib/system.ts";
import { CompositeInteraction, type Interaction } from "$lib/interaction.ts";

export function step(systems: readonly System[], field: Field) {
  let allInteractions = [];

  for (let [x, y, entity] of field) {
    if (entity === undefined) continue;

    let cell = new FieldCell(field, x, y);
    let interactions = systems
      .map((it) => it.step(cell))
      .filter(Boolean) as Interaction[];
    allInteractions.push(...interactions);
  }

  new CompositeInteraction(...allInteractions).step();
}
