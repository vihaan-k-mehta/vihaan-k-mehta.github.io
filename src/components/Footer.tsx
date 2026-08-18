export function Footer() {
  return (
    <footer id="contact" className="border-t border-border py-14">
      <div className="container flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="mb-2 font-mono text-sm uppercase tracking-widest text-primary before:mr-1 before:content-['//_'] before:text-muted-foreground">
            Get in touch
          </p>
          <a
            href="https://github.com/vihaan-k-mehta"
            target="_blank"
            rel="noopener"
            className="border-b border-border pb-0.5 font-mono text-sm transition-colors hover:border-primary hover:text-primary"
          >
            GitHub ↗
          </a>
        </div>
        <p className="font-mono text-xs text-muted-foreground">
          BUILT &amp; MAINTAINED BY VIHAAN MEHTA · SAN JOSE, CA
        </p>
      </div>
    </footer>
  );
}
