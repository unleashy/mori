<script lang="ts">
  interface Props {
    onGen: () => void;
    amounts: {
      tree: number;
      bear: number;
      ljack: number;
    };
  }

  let { onGen, amounts = $bindable() }: Props = $props();

  const MAX_PCT = 100;
  let totalAmount = $derived(amounts.tree + amounts.bear + amounts.ljack);
  let emptyAmount = $derived(MAX_PCT - totalAmount);

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
    <span><span lang="ja">木</span> tree coverage (%):</span>
    <input
      id="tree-amount"
      type="number"
      bind:value={() => amounts.tree, setAmount("tree")}
      min="0"
      max={maxima.tree}
    />
  </label>

  <label class="flow" style:--flow-size="var(--size_-2)">
    <span><span lang="ja">熊</span> bear amount (%):</span>
    <input
      id="bear-amount"
      type="number"
      bind:value={() => amounts.bear, setAmount("bear")}
      min="0"
      max={maxima.bear}
    />
  </label>

  <label class="flow" style:--flow-size="var(--size_-2)">
    <span><span lang="ja">材</span> lumberjack amount (%):</span>
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
      {totalAmount}%
    </output>
  </p>

  <p>Empty cells: <output>{MAX_PCT - totalAmount}%</output></p>

  <button type="button" onclick={() => onGen()} data-button-kind="primary">
    Generate map
  </button>
</div>

<style>
  input,
  label {
    display: inline;
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

  hr {
    width: 100%;
    height: 1px;

    margin-block: var(--size_-2);

    border: 1px dashed var(--grey-9);
  }
</style>
