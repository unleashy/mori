import { Ljack, Tree } from "$lib/entity.ts";
import { type Cell } from "$lib/field.ts";
import {
  CompositeInteraction,
  DeleteInteraction,
  type Interaction,
  MoveInteraction,
  NullInteraction,
  SpawnInteraction,
} from "$lib/interaction.ts";
import { binaryChoice, sample, sampleUpToN } from "$lib/random.ts";

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

export class LjackSystem implements System {
  step(cell: Cell): Interaction | undefined {
    if (!(cell.entity instanceof Ljack)) return undefined;

    let interactions: Interaction[] = [];

    let trees = sampleUpToN(treeNeighbours(cell.neighbours()), 4);
    if (trees.length > 0) {
      interactions = trees.map((tree) => new DeleteInteraction(tree));
    }

    if (binaryChoice(0.4)) {
      let available = emptyNeighbours(cell.neighbours());
      if (available.length > 0) {
        let slot = sample(available);
        interactions.push(new MoveInteraction(cell, slot));
      }
    }

    return interactions.length > 0
      ? new CompositeInteraction(interactions)
      : new NullInteraction();
  }
}

function emptyNeighbours(neighbours: Cell[]): Cell[] {
  return neighbours.filter((it) => it.entity === undefined);
}

function treeNeighbours(neighbours: Cell[]): Cell[] {
  return neighbours.filter(
    (it) => it.entity instanceof Tree && it.entity.isAdult,
  );
}
