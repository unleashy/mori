<script lang="ts">
  import type { Attachment } from "svelte/attachments";
  import type { Field } from "$lib/field.ts";

  interface Props {
    field: Field;
  }

  const { field }: Props = $props();

  const RENDER_SIZE = 500;
  const cellSize = $derived(RENDER_SIZE / field.size);

  const render = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, RENDER_SIZE, RENDER_SIZE);

    for (let [x, y, entity] of field) {
      if (entity === undefined) continue;

      ctx.fillStyle = entity.colour;
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  };

  let devicePixelRatio = $state(1);
  const canvasAtt: Attachment<HTMLCanvasElement> = (canvas) => {
    canvas.style.width = `calc(75vmin * ${devicePixelRatio})`;
    canvas.width = RENDER_SIZE * devicePixelRatio;
    canvas.height = RENDER_SIZE * devicePixelRatio;

    let ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("no context");

    ctx.scale(devicePixelRatio, devicePixelRatio);

    let rafId: number | undefined;
    const rafLoop = () => {
      rafId = requestAnimationFrame(rafLoop);
      render(ctx);
    };

    rafId = requestAnimationFrame(rafLoop);
    return () => cancelAnimationFrame(rafId as number);
  };
</script>

<svelte:window bind:devicePixelRatio />

<canvas width={RENDER_SIZE} height={RENDER_SIZE} {@attach canvasAtt}></canvas>

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
