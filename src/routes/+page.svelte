<script>
  import "@fontsource/kanchenjunga/latin.css";
  import "$lib/style.css";
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
  <canvas width="500" height="500"></canvas>
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

  canvas {
    width: 75vmin;
    aspect-ratio: 1;

    background: var(--grey-2);
    border: 1px solid var(--grey-6);
  }
</style>
