<script lang="ts">
  import PlayIcon from "$lib/PlayIcon.svelte";
  import PauseIcon from "$lib/PauseIcon.svelte";
  import StepIcon from "$lib/StepIcon.svelte";

  interface Props {
    onPlay: () => void;
    onPause: () => void;
    onStep: () => void;
  }

  let { onPlay, onPause, onStep }: Props = $props();

  let playing = $state(false);
  const togglePlaying = () => {
    if (playing) {
      playing = false;
      onPause();
    } else {
      playing = true;
      onPlay();
    }
  };

  const step = () => {
    playing = false;
    onPause();
    onStep();
  };
</script>

<div class="cluster">
  <button type="button" onclick={togglePlaying} aria-pressed={playing}>
    {#if playing}
      <PauseIcon />
      Pause
    {:else}
      <PlayIcon />
      Play
    {/if}
  </button>
  <button type="button" onclick={step}>
    <StepIcon />
    Step
  </button>
</div>

<style>
  .cluster {
    display: flex;
    gap: var(--size_-2);
  }

  button {
    min-width: 4.75rem;
  }

  [aria-pressed="true"] {
    top: 1px;

    background: var(--green-3);
    color: var(--green-12);
    border: 1px solid var(--green-8);
  }
</style>
