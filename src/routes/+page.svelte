<script lang="ts">
  import type { Attachment } from "svelte/attachments";
  import "@fontsource/kanchenjunga/latin.css";
  import "$lib/style.css";

  let devicePixelRatio = $state(1);

  const RENDER_SIZE = 500;
  const canvasAtt: Attachment<HTMLCanvasElement> = (canvas) => {
    canvas.style.width = `calc(75vmin * ${devicePixelRatio})`;
    canvas.width = RENDER_SIZE * devicePixelRatio;
    canvas.height = RENDER_SIZE * devicePixelRatio;

    let ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("no context");

    ctx.scale(devicePixelRatio, devicePixelRatio);
  };

  const MAX_AMOUNT = 100;

  let amounts = $state({
    tree: 30,
    bear: 20,
    ljack: 10,
  });

  let totalAmount = $derived(amounts.tree + amounts.bear + amounts.ljack);
  let emptyAmount = $derived(MAX_AMOUNT - totalAmount);

  let maxima = $derived({
    tree: amounts.tree + emptyAmount,
    bear: amounts.bear + emptyAmount,
    ljack: amounts.ljack + emptyAmount,
  });

  const setAmount = (actor: keyof typeof amounts) => (x: number) => {
    if (0 <= x && x <= maxima[actor]) {
      amounts[actor] = x;
    }
  };
</script>

<svelte:window bind:devicePixelRatio />

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
  <canvas width={RENDER_SIZE} height={RENDER_SIZE} {@attach canvasAtt}>
  </canvas>

  <div class="flow">
    <details open>
      <summary>Settings</summary>

      <div class="flow" style:--flow-size="var(--size_-1)">
        <label class="flow" style:--flow-size="var(--size_-2)">
          <span>Amount of <span lang="ja">木</span> trees:</span>
          <input
            id="tree-amount"
            type="number"
            bind:value={() => amounts.tree, setAmount("tree")}
            min="0"
            max={maxima.tree}
          />
        </label>

        <label class="flow" style:--flow-size="var(--size_-2)">
          <span>Amount of <span lang="ja">熊</span> bears:</span>
          <input
            id="bear-amount"
            type="number"
            bind:value={() => amounts.bear, setAmount("bear")}
            min="0"
            max={maxima.bear}
          />
        </label>

        <label class="flow" style:--flow-size="var(--size_-2)">
          <span>Amount of <span lang="ja">材</span> lumberjacks:</span>
          <input
            id="ljack-amount"
            type="number"
            bind:value={() => amounts.ljack, setAmount("ljack")}
            min="0"
            max={maxima.ljack}
          />
        </label>

        <hr />

        <p>
          Total occupancy:
          <output for="tree-amount bear-amount ljack-amount">
            {totalAmount}
          </output>
          out of {MAX_AMOUNT}
        </p>

        <p>Empty cells: <output>{MAX_AMOUNT - totalAmount}</output></p>

        <button type="button">Start simulation</button>
      </div>
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

  canvas {
    width: 75vmin;
    max-width: 100%;
    aspect-ratio: 1;

    padding: var(--size_-2);

    background: var(--grey-2);
    border: 1px solid var(--grey-6);
  }

  summary {
    font-size: var(--font-size_0);
    font-weight: var(--weight_2);

    cursor: pointer;
    user-select: none;
  }

  summary + * {
    margin-top: var(--flow-size, var(--size_-2));
  }

  input,
  label {
    display: inline;
  }

  input,
  button {
    border-radius: 5px;
  }

  input {
    padding-block: var(--size_-3);
    padding-inline-end: var(--size_-2);
    text-indent: var(--size_-2);

    background: var(--grey-2);
    border: 1px solid var(--grey-6);

    &:hover,
    &:focus {
      border-color: var(--grey-8);
      background: var(--grey-1);
    }
  }

  button {
    position: relative;
    min-height: 5ex;

    margin-block-start: var(--size_-1);
    padding-block: var(--size_-2);
    padding-inline: var(--size_0);

    color: var(--grey-1);
    background: var(--green-9);

    font-weight: var(--weight_2);

    &:hover,
    &:focus {
      background: var(--green-10);
    }

    &:active {
      color: var(--grey-6);
      top: 1px;
    }
  }

  hr {
    width: 100%;
    height: 1px;

    margin-block: var(--size_-2);

    border: 1px dashed var(--grey-9);
  }
</style>
