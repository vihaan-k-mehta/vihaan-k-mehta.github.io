export function PlateHead({ num, title, sub }: { num: string; title: string; sub?: string }) {
  return (
    <div className="mb-10">
      <div className="mb-3 flex items-baseline gap-3">
        <span className="rounded-sm border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-xs text-primary">
          PLATE {num}
        </span>
        <h2 className="font-mono text-xl font-semibold uppercase tracking-wide">{title}</h2>
      </div>
      {sub ? <p className="max-w-xl text-muted-foreground">{sub}</p> : null}
    </div>
  );
}
