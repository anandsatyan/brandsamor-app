import { useEffect, useRef } from 'react';

/**
 * Hero grain cursor modes:
 * - `none` — ambient mist + grain only
 * - `bubbling` — original bubbling cursor wake + particle scatter
 */
export type HeroCursorEffect = 'none' | 'bubbling';

type MistBlob = {
  x: number;
  y: number;
  radius: number;
  speed: number;
  phase: number;
};

type Speck = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
};

const MIST_BLOBS: MistBlob[] = [
  { x: 0.18, y: 0.32, radius: 0.38, speed: 0.11, phase: 0 },
  { x: 0.72, y: 0.28, radius: 0.42, speed: 0.09, phase: 1.4 },
  { x: 0.48, y: 0.68, radius: 0.34, speed: 0.13, phase: 2.6 },
  { x: 0.85, y: 0.55, radius: 0.28, speed: 0.1, phase: 4.1 },
];

const WISP_COUNT = 5;
const MAX_SPECKS = 140;

export const HeroMistEffect = ({
  cursorEffect = 'none',
}: {
  cursorEffect?: HeroCursorEffect;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return undefined;

    const grainCanvas = document.createElement('canvas');
    const grainCtx = grainCanvas.getContext('2d', { alpha: true });
    if (!grainCtx) return undefined;

    const grainLayer = document.createElement('canvas');
    const grainLayerCtx = grainLayer.getContext('2d', { alpha: true });
    if (!grainLayerCtx) return undefined;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reducedMotion = motionQuery.matches;

    const onMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
    };
    motionQuery.addEventListener('change', onMotionChange);

    const interactive = cursorEffect === 'bubbling';

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let grainWidth = 0;
    let grainHeight = 0;
    let raf = 0;
    let start = performance.now();
    let staticGrainDrawn = false;
    let lastFrame = performance.now();

    let pointerActive = false;
    let targetX = 0;
    let targetY = 0;
    let softX = 0;
    let softY = 0;
    let influence = 0;
    let spawnCarry = 0;
    const specks: Speck[] = [];

    const host = canvas.closest('.hero-panel') as HTMLElement | null;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      grainWidth = Math.max(1, width * 2);
      grainHeight = Math.max(1, height * 2);
      grainCanvas.width = grainWidth;
      grainCanvas.height = grainHeight;
      grainLayer.width = Math.floor(width * dpr);
      grainLayer.height = Math.floor(height * dpr);
      grainLayerCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      staticGrainDrawn = false;
    };

    const drawGrain = () => {
      const image = grainCtx.createImageData(grainWidth, grainHeight);
      const pixels = image.data;

      for (let i = 0; i < pixels.length; i += 4) {
        if (Math.random() > 0.78) {
          pixels[i] = 255;
          pixels[i + 1] = 255;
          pixels[i + 2] = 255;
          pixels[i + 3] = (14 + Math.random() * 42) | 0;
        }
      }

      grainCtx.putImageData(image, 0, 0);
    };

    const drawMistBlob = (x: number, y: number, radius: number, innerAlpha: number) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, `rgba(255, 248, 242, ${innerAlpha})`);
      gradient.addColorStop(0.5, `rgba(255, 235, 220, ${innerAlpha * 0.45})`);
      gradient.addColorStop(1, 'rgba(255, 220, 200, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    };

    const drawMist = (elapsed: number) => {
      ctx.save();
      ctx.globalCompositeOperation = 'soft-light';

      for (const blob of MIST_BLOBS) {
        const drift = reducedMotion ? 0 : elapsed * blob.speed;
        const x = (blob.x + Math.sin(drift + blob.phase) * 0.07) * width;
        const y = (blob.y + Math.cos(drift * 0.65 + blob.phase) * 0.05) * height;
        const pulse = 1 + Math.sin(drift * 0.45) * 0.1;
        const radius = blob.radius * Math.min(width, height) * pulse;
        drawMistBlob(x, y, radius, 0.14);
      }

      for (let i = 0; i < WISP_COUNT; i += 1) {
        const phase = elapsed * 0.07 + i * 1.35;
        const x = ((phase * 0.1 + i * 0.17) % 1.25 - 0.12) * width;
        const y = (0.22 + i * 0.14 + Math.sin(phase * 0.9) * 0.04) * height;
        const radius = 0.12 * Math.min(width, height);
        drawMistBlob(x, y, radius, 0.09);
      }

      ctx.restore();
    };

    const spawnSpecks = (count: number) => {
      for (let i = 0; i < count; i += 1) {
        if (specks.length >= MAX_SPECKS) specks.shift();
        const angle = Math.random() * Math.PI * 2;
        const speed = 28 + Math.random() * 90;
        const life = 0.35 + Math.random() * 0.55;
        specks.push({
          x: softX + (Math.random() - 0.5) * 18,
          y: softY + (Math.random() - 0.5) * 18,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life,
          maxLife: life,
          size: 0.6 + Math.random() * 1.6,
        });
      }
    };

    const updateSpecks = (dt: number) => {
      for (let i = specks.length - 1; i >= 0; i -= 1) {
        const speck = specks[i];
        speck.life -= dt;
        if (speck.life <= 0) {
          specks.splice(i, 1);
          continue;
        }
        speck.x += speck.vx * dt;
        speck.y += speck.vy * dt;
        speck.vx *= 0.96;
        speck.vy *= 0.96;
      }
    };

    const drawSpecks = () => {
      if (specks.length === 0) return;
      grainLayerCtx.save();
      for (const speck of specks) {
        const alpha = (speck.life / speck.maxLife) * 0.28;
        grainLayerCtx.fillStyle = `rgba(255, 248, 240, ${alpha})`;
        grainLayerCtx.beginPath();
        grainLayerCtx.arc(speck.x, speck.y, speck.size, 0, Math.PI * 2);
        grainLayerCtx.fill();
      }
      grainLayerCtx.restore();
    };

    const drawBubblingCursor = (dt: number) => {
      softX += (targetX - softX) * Math.min(1, dt * 10);
      softY += (targetY - softY) * Math.min(1, dt * 10);
      influence += ((pointerActive ? 1 : 0) - influence) * Math.min(1, dt * 6);

      grainLayerCtx.clearRect(0, 0, width, height);
      grainLayerCtx.imageSmoothingEnabled = false;
      grainLayerCtx.drawImage(grainCanvas, 0, 0, width, height);

      if (influence > 0.01) {
        const clearRadius = Math.min(width, height) * (0.16 + influence * 0.08);
        grainLayerCtx.save();
        grainLayerCtx.globalCompositeOperation = 'destination-out';
        const clear = grainLayerCtx.createRadialGradient(
          softX,
          softY,
          0,
          softX,
          softY,
          clearRadius,
        );
        clear.addColorStop(0, `rgba(0, 0, 0, ${0.92 * influence})`);
        clear.addColorStop(0.4, `rgba(0, 0, 0, ${0.45 * influence})`);
        clear.addColorStop(1, 'rgba(0, 0, 0, 0)');
        grainLayerCtx.fillStyle = clear;
        grainLayerCtx.fillRect(0, 0, width, height);
        grainLayerCtx.restore();

        grainLayerCtx.save();
        grainLayerCtx.globalCompositeOperation = 'lighter';
        const glow = grainLayerCtx.createRadialGradient(
          softX,
          softY,
          0,
          softX,
          softY,
          clearRadius * 0.85,
        );
        glow.addColorStop(0, `rgba(255, 244, 232, ${0.06 * influence})`);
        glow.addColorStop(0.55, `rgba(255, 220, 200, ${0.02 * influence})`);
        glow.addColorStop(1, 'rgba(255, 220, 200, 0)');
        grainLayerCtx.fillStyle = glow;
        grainLayerCtx.fillRect(0, 0, width, height);
        grainLayerCtx.restore();

        if (pointerActive) {
          spawnCarry += dt * 55 * influence;
          const toSpawn = spawnCarry | 0;
          if (toSpawn > 0) {
            spawnCarry -= toSpawn;
            spawnSpecks(toSpawn);
          }
        }
      }

      updateSpecks(dt);
      drawSpecks();

      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(grainLayer, 0, 0, width, height);
      ctx.restore();
    };

    const draw = (now: number) => {
      const elapsed = (now - start) / 1000;
      const dt = Math.min(0.05, (now - lastFrame) / 1000);
      lastFrame = now;
      ctx.clearRect(0, 0, width, height);

      drawMist(elapsed);

      if (!reducedMotion || !staticGrainDrawn) {
        drawGrain();
        staticGrainDrawn = true;
      }

      if (interactive && !reducedMotion) {
        drawBubblingCursor(dt);
      } else {
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(grainCanvas, 0, 0, width, height);
        ctx.restore();
      }

      raf = requestAnimationFrame(draw);
    };

    const setPointerFromEvent = (event: PointerEvent) => {
      if (!interactive || reducedMotion || !host) return;
      const rect = host.getBoundingClientRect();
      targetX = event.clientX - rect.left;
      targetY = event.clientY - rect.top;
      if (!pointerActive) {
        softX = targetX;
        softY = targetY;
      }
      pointerActive = true;
    };

    const onPointerLeave = () => {
      pointerActive = false;
    };

    resize();
    window.addEventListener('resize', resize);

    if (interactive && host) {
      host.addEventListener('pointermove', setPointerFromEvent);
      host.addEventListener('pointerenter', setPointerFromEvent);
      host.addEventListener('pointerleave', onPointerLeave);
    }

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      motionQuery.removeEventListener('change', onMotionChange);
      if (interactive && host) {
        host.removeEventListener('pointermove', setPointerFromEvent);
        host.removeEventListener('pointerenter', setPointerFromEvent);
        host.removeEventListener('pointerleave', onPointerLeave);
      }
    };
  }, [cursorEffect]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="hero-panel__mist pointer-events-none absolute inset-0 z-[1] h-full w-full"
    />
  );
};
