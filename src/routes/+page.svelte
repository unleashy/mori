<script lang="ts">
  import { type Field, EmptyField } from "$lib/field.ts";
  import { generate } from "$lib/generator.ts";
  import { TreeSystem } from "$lib/system.ts";
  import { step } from "$lib/engine.ts";
  import Settings from "$lib/Settings.svelte";
  import FieldUi from "$lib/FieldUi.svelte";
  import Controls from "$lib/Controls.svelte";

  let amounts = $state({
    tree: 40,
    bear: 5,
    ljack: 2.5,
  });

  let controlsOpen = $state(false);
  let playing = $state(false);

  const FIELD_SIZE = 50;
  let field: Field = $state(new EmptyField(FIELD_SIZE));

  let month = $state(1);
  let year = $state(1);
  const stepDate = () => {
    month += 1;

    if (month > 12) {
      year += 1;
      month = 1;
    }
  };

  const onGen = () => {
    field = generate(FIELD_SIZE, amounts);
    controlsOpen = true;
    playing = false;
    month = 1;
    year = 1;
  };

  const systems = Object.freeze([new TreeSystem()]);
  const onStep = () => {
    step(systems, field);
    stepDate();
  };

  const PLAY_SPEED_MS = 200;
  let playTimer: number | undefined = $state();
  $effect(() => {
    if (playing) {
      playTimer = setInterval(onStep, PLAY_SPEED_MS);
    } else {
      clearInterval(playTimer);
    }

    return () => {
      clearInterval(playTimer);
    };
  });
</script>

<svelte:head>
  <title>森 Mori</title>
</svelte:head>

<header>
  <h1>
    <span lang="ja">森</span>&nbsp;Mori
    <span class="subtitle">a forest simulation</span>
  </h1>
</header>

<main>
  <FieldUi {field} />

  <div class="flow">
    <details open>
      <summary>Settings</summary>
      <Settings {onGen} bind:amounts />
    </details>

    <details bind:open={controlsOpen}>
      <summary>Simulation</summary>
      <div class="flow" style:--flow-size="var(--size_-2)">
        <p>Year {year} • Month {month}</p>
        <Controls bind:playing {onStep} />
      </div>
    </details>
  </div>
</main>

<style>
  header,
  main {
    padding-inline: var(--size-fluid_4);
    margin-block: var(--size-fluid_4);
  }

  h1 {
    font-size: var(--font-size_2);
    font-weight: var(--weight_0);
  }

  .subtitle {
    color: var(--text-deemphasis);
    font-size: var(--font-size_1);
  }

  main {
    display: flex;
    flex-wrap: wrap;
    gap: var(--size_0);

    & > :last-child {
      flex-basis: 0;
      flex-grow: 999;
      min-inline-size: 40%;
    }
  }

  summary {
    font-size: var(--font-size_0);
    font-weight: var(--weight_2);

    cursor: pointer;
    user-select: none;
  }

  summary + :global(*) {
    margin-top: var(--flow-size, var(--size_-2));
  }
</style>
