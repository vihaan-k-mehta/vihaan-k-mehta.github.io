import { useEffect, useRef } from "react";

type Line = { base: number; amp: number; freq: number; phase: number; speed: number };

export function TopoBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lines: Line[] = [];
    let t = 0;
    let raf = 0;

    function seedLines(h: number) {
      lines = [];
      const count = 9;
      for (let i = 0; i < count; i++) {
        lines.push({
          base: (h / (count + 1)) * (i + 1),
          amp: 18 + Math.random() * 26,
          freq: 0.0025 + Math.random() * 0.003,
          phase: Math.random() * Math.PI * 2,
          speed: 0.15 + Math.random() * 0.15,
        });
      }
    }

    function draw() {
      if (!canvas || !ctx) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(232,238,245,0.5)";
      ctx.lineWidth = 1;
      lines.forEach((L, i) => {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 6) {
          const y =
            L.base +
            Math.sin(x * L.freq + L.phase + t * L.speed) * L.amp +
            Math.sin(x * L.freq * 2.3 + L.phase) * (L.amp * 0.35);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.globalAlpha = 0.14 + (i % 3) * 0.05;
        ctx.stroke();
      });
      ctx.globalAlpha = 1;
    }

    function resize() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedLines(h);
      draw();
    }

    function loop() {
      t += 1;
      draw();
      raf = requestAnimationFrame(loop);
    }

    window.addEventListener("resize", resize);
    resize();
    if (!reduced) raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
