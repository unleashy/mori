<script lang="ts">
  import type { Attachment } from "svelte/attachments";

  interface Props {
    size: number;
  }

  const { size }: Props = $props();

  const CELL_SIZE = 50;
  const renderSize = $derived(CELL_SIZE * size);

  let devicePixelRatio = $state(1);
  const canvasAtt: Attachment<HTMLCanvasElement> = (canvas) => {
    canvas.style.width = `calc(75vmin * ${devicePixelRatio})`;
    canvas.width = renderSize * devicePixelRatio;
    canvas.height = renderSize * devicePixelRatio;

    let ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("no context");

    ctx.scale(devicePixelRatio, devicePixelRatio);
  };
</script>

<svelte:window bind:devicePixelRatio />

<canvas width={renderSize} height={renderSize} {@attach canvasAtt}></canvas>

<style>
  canvas {
    width: 75vmin;
    max-width: 100%;
    aspect-ratio: 1;

    padding: var(--size_-2);

    background: var(--grey-2);
    border: 1px solid var(--grey-6);
  }
</style>
