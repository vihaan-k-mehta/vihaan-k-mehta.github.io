export function Marquee({ items }: { items: string[] }) {
  const loop = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-border bg-secondary/40 py-3">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {loop.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            {item}
            <span className="text-primary">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
