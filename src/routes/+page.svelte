<script lang="ts">
  import { empty, generate } from "$lib/field.ts";
  import Settings from "$lib/Settings.svelte";
  import FieldUi from "$lib/FieldUi.svelte";
  import "@fontsource/kanchenjunga/latin.css";
  import "$lib/style.css";

  let amounts = $state({
    tree: 40,
    bear: 5,
    ljack: 2.5,
  });

  const FIELD_SIZE = 50;
  let field = $state(empty(FIELD_SIZE));

  const onGen = () => {
    field = generate(FIELD_SIZE, amounts);
  };
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

    <details>
      <summary>Simulation</summary>

      <p>play/pause/step goes here</p>
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
