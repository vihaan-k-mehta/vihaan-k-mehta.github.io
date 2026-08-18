import { useRef, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { cn } from "@/lib/utils";

export function SpotlightCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const background = useMotionTemplate`radial-gradient(220px circle at ${x}px ${y}px, hsl(var(--primary) / 0.14), transparent 70%)`;

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25 }}
      className={cn(
        "group relative overflow-hidden rounded-md border border-border bg-card p-6",
        className
      )}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background }}
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
}
