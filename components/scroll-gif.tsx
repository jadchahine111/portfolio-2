"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { parseGIF, decompressFrames } from "gifuct-js";

interface ScrollGifProps {
  src: string;
  className?: string;
}

export function ScrollGif({ src, className = "" }: ScrollGifProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<ImageData[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Parse GIF and extract frames
  useEffect(() => {
    let cancelled = false;

    async function loadFrames() {
      const resp = await fetch(src);
      const buff = await resp.arrayBuffer();
      const gif = parseGIF(buff);
      const frames = decompressFrames(gif, true);

      if (cancelled || frames.length === 0) return;

      const { width, height } = gif.lsd;
      setDimensions({ width, height });

      // Build full ImageData for each frame using a temp canvas
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = width;
      tempCanvas.height = height;
      const tempCtx = tempCanvas.getContext("2d")!;

      const imageDataFrames: ImageData[] = [];

      for (const frame of frames) {
        const { patch, dims, disposalType } = frame;
        const imageData = new ImageData(
          new Uint8ClampedArray(patch),
          dims.width,
          dims.height
        );

        // Draw patch onto temp canvas at correct position
        const patchCanvas = document.createElement("canvas");
        patchCanvas.width = dims.width;
        patchCanvas.height = dims.height;
        const patchCtx = patchCanvas.getContext("2d")!;
        patchCtx.putImageData(imageData, 0, 0);

        tempCtx.drawImage(patchCanvas, dims.left, dims.top);

        // Capture full frame
        imageDataFrames.push(
          tempCtx.getImageData(0, 0, width, height)
        );

        if (disposalType === 2) {
          tempCtx.clearRect(dims.left, dims.top, dims.width, dims.height);
        }
      }

      if (!cancelled) {
        framesRef.current = imageDataFrames;
      }
    }

    loadFrames();
    return () => { cancelled = true; };
  }, [src]);

  // Scroll-driven frame rendering
  const renderFrame = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const frames = framesRef.current;
    if (!container || !canvas || frames.length === 0) return;

    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Progress: 0 when element enters viewport from bottom, 1 when it leaves from top
    const progress = Math.min(
      1,
      Math.max(0, (windowHeight - rect.top) / (windowHeight + rect.height))
    );

    const frameIndex = Math.min(
      frames.length - 1,
      Math.floor(progress * frames.length)
    );

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.putImageData(frames[frameIndex], 0, 0);
    }
  }, []);

  useEffect(() => {
    let rafId: number;

    function onScroll() {
      rafId = requestAnimationFrame(renderFrame);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    // Initial render
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [renderFrame]);

  return (
    <div ref={containerRef} className={className}>
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
