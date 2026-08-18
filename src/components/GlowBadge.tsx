import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function GlowBadge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide text-primary",
        className
      )}
    >
      <motion.span
        className="absolute inset-0 rounded-full"
        animate={{ boxShadow: ["0 0 0px hsl(var(--primary)/0)", "0 0 10px hsl(var(--primary)/0.45)", "0 0 0px hsl(var(--primary)/0)"] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="relative">{children}</span>
    </span>
  );
}
