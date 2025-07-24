<script lang="ts">
  interface Props {
    amounts: {
      tree: number;
      bear: number;
      ljack: number;
    };
    maxAmount: number;
  }

  let { amounts = $bindable(), maxAmount }: Props = $props();

  let totalAmount = $derived(amounts.tree + amounts.bear + amounts.ljack);
  let emptyAmount = $derived(maxAmount - totalAmount);

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
    out of {maxAmount}
  </p>

  <p>Empty cells: <output>{maxAmount - totalAmount}</output></p>

  <button type="button">Start simulation</button>
</div>

<style>
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
