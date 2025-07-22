<script>
  import "@fontsource/kanchenjunga/latin.css";
  import "$lib/style.css";
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Kiwi+Maru:wght@400&display=swap&text=森+Mori"
    rel="stylesheet"
  />
  <title>森 Mori</title>
</svelte:head>

<header>
  <h1><span lang="ja">森</span> Mori</h1>
</header>

<main>
  <p>Hello, world.</p>
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

  [lang="ja"] {
    font-family: "Kiwi Maru";
  }
</style>
