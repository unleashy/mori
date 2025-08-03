import { type Cell } from "$lib/field.ts";
import { type Entity } from "$lib/entity.ts";

export interface Interaction {
  step(): void;
}

export class NullInteraction implements Interaction {
  step() {
    /* no-op */
  }
}

export class SpawnInteraction implements Interaction {
  constructor(
    readonly cell: Cell,
    readonly entity: Entity,
  ) {}

  step() {
    this.cell.replace(this.entity);
  }
}

export class CompositeInteraction implements Interaction {
  readonly #interactions: readonly Interaction[];

  constructor(...interactions: Interaction[]) {
    this.#interactions = interactions;
  }

  step(): void {
    for (let interaction of this.#interactions) {
      interaction.step();
    }
  }
}
