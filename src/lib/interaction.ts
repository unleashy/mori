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
    if (this.cell.entity === undefined) {
      this.cell.replace(this.entity);
    }
  }
}

export class DeleteInteraction implements Interaction {
  constructor(readonly cell: Cell) {}

  step() {
    if (this.cell.entity !== undefined) {
      this.cell.replace(undefined);
    }
  }
}

export class MoveInteraction implements Interaction {
  constructor(
    readonly from: Cell,
    readonly to: Cell,
  ) {}

  step() {
    if (this.to.entity === undefined) {
      let entity = this.from.entity;
      this.from.replace(undefined);
      this.to.replace(entity);
    }
  }
}

export class CompositeInteraction implements Interaction {
  readonly #interactions: readonly Interaction[];

  constructor(interactions: Interaction[]) {
    this.#interactions = interactions;
  }

  step(): void {
    for (let interaction of this.#interactions) {
      interaction.step();
    }
  }
}
