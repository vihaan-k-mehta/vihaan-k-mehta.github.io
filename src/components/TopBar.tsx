export function TopBar() {
  return (
    <div className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur">
      <div className="container flex items-center justify-between py-3.5 font-mono text-sm">
        <div className="font-semibold tracking-tight">
          VM<span className="text-primary">_</span>2027
        </div>
        <nav className="flex gap-6 text-muted-foreground">
          <a href="#work" className="transition-colors hover:text-foreground">Work</a>
          <a href="#record" className="transition-colors hover:text-foreground">Record</a>
          <a href="#log" className="transition-colors hover:text-foreground">Field Log</a>
          <a href="#contact" className="transition-colors hover:text-foreground">Contact</a>
        </nav>
        <div className="hidden text-muted-foreground sm:block">37.3382° N, 121.8863° W</div>
      </div>
    </div>
  );
}
