<script lang="ts">
  import Settings from "$lib/Settings.svelte";
  import FieldUi from "$lib/FieldUi.svelte";
  import "@fontsource/kanchenjunga/latin.css";
  import "$lib/style.css";

  const FIELD_SIZE = 10;
  const MAX_AMOUNT = FIELD_SIZE * FIELD_SIZE;

  let amounts = $state({
    tree: 30,
    bear: 20,
    ljack: 10,
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
  <FieldUi size={FIELD_SIZE} />

  <div class="flow">
    <details open>
      <summary>Settings</summary>
      <Settings bind:amounts maxAmount={MAX_AMOUNT} />
    </details>

    <details>
      <summary>Stats</summary>

      <p>stats</p>
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
