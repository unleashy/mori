import { Tree } from "$lib/entity.ts";
import { type Cell } from "$lib/field.ts";
import {
  type Interaction,
  NullInteraction,
  SpawnInteraction,
} from "$lib/interaction.ts";
import { binaryChoice, sample } from "$lib/random.ts";

export interface System {
  step(cell: Cell): Interaction | undefined;
}

export class TreeSystem implements System {
  step(cell: Cell): Interaction | undefined {
    if (!(cell.entity instanceof Tree)) return undefined;

    let tree = cell.entity;
    let interaction: Interaction | undefined;

    if (tree.isAdult && binaryChoice(0.15)) {
      let available = emptyNeighbours(cell.neighbours());
      if (available.length > 0) {
        let slot = sample(available);
        interaction = new SpawnInteraction(slot, Tree.createSapling());
      }
    }

    tree.ageUp();
    return interaction ?? new NullInteraction();
  }
}

function emptyNeighbours(neighbours: Iterable<Cell>): Cell[] {
  return [...neighbours].filter((it) => it.entity === undefined);
}
