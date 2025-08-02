import { type Field } from "$lib/field.ts";

export interface Interaction<T> {
  step(field: Field<T>): void;
}

export class NullInteraction implements Interaction<never> {
  step() {
    /* no-op */
  }
}

export class CompositeInteraction<T> implements Interaction<T> {
  readonly #interactions: ReadonlyArray<Interaction<T>>;

  constructor(...interactions: Array<Interaction<T>>) {
    this.#interactions = interactions;
  }

  step(field: Field<T>): void {
    for (let interaction of this.#interactions) {
      interaction.step(field);
    }
  }
}
