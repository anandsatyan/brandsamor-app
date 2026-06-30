import { useEffect, useRef } from 'react';

type MistBlob = {
  x: number;
  y: number;
  radius: number;
  speed: number;
  phase: number;
};

const MIST_BLOBS: MistBlob[] = [
  { x: 0.18, y: 0.32, radius: 0.38, speed: 0.11, phase: 0 },
  { x: 0.72, y: 0.28, radius: 0.42, speed: 0.09, phase: 1.4 },
  { x: 0.48, y: 0.68, radius: 0.34, speed: 0.13, phase: 2.6 },
  { x: 0.85, y: 0.55, radius: 0.28, speed: 0.1, phase: 4.1 },
];

const WISP_COUNT = 5;

export const HeroMistEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return undefined;

    const grainCanvas = document.createElement('canvas');
    const grainCtx = grainCanvas.getContext('2d', { alpha: true });
    if (!grainCtx) return undefined;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reducedMotion = motionQuery.matches;

    const onMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
    };
    motionQuery.addEventListener('change', onMotionChange);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let grainWidth = 0;
    let grainHeight = 0;
    let raf = 0;
    let start = performance.now();
    let staticGrainDrawn = false;

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

    const draw = (now: number) => {
      const elapsed = (now - start) / 1000;
      ctx.clearRect(0, 0, width, height);

      drawMist(elapsed);

      if (!reducedMotion || !staticGrainDrawn) {
        drawGrain();
        staticGrainDrawn = true;
      }

      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(grainCanvas, 0, 0, width, height);
      ctx.restore();

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      motionQuery.removeEventListener('change', onMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="hero-panel__mist pointer-events-none absolute inset-0 z-[1] h-full w-full"
    />
  );
};
