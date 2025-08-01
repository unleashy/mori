import { type Field } from "$lib/field.ts";

export interface Interaction {
  step(field: Field): void;
}

export class NullInteraction implements Interaction {
  step() {
    /* no-op */
  }
}

export class CompositeInteraction implements Interaction {
  readonly #interactions: Interaction[];

  constructor(...interactions: Interaction[]) {
    this.#interactions = interactions;
  }

  step(field: Field): void {
    for (let interaction of this.#interactions) {
      interaction.step(field);
    }
  }
}
