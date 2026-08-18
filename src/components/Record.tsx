import { ScrollReveal } from "./ScrollReveal";
import { Counter } from "./Counter";
import { PlateHead } from "./PlateHead";

const STATS = [
  { value: 50, suffix: "+", label: "Taekwondo competitions" },
  { value: 10.13, decimals: 2, suffix: "s", label: "Best 3×3 solve" },
  { value: 5, suffix: "×", label: "WCA competitions" },
];

const TIMELINE = [
  { year: "2024", result: "California State Champion", detail: "Poomsae Gold · AAU Nationals Poomsae, 5th nationally", highlight: true },
  { year: "2025", result: "CA State Bronze", detail: "AAU Nationals — 5th in Poomsae, 5th in Sparring" },
  { year: "2026", result: "CA State Bronze", detail: "AAU Nationals qualifier" },
  { year: "Math", result: "Consistent top scorer", detail: "Math Olympiad · MathCounts Chapter representative · ASMA" },
  { year: "Cubing", result: "2×2 through 5×5", detail: "Square-1, Megaminx, 3BLD, one-handed, and more" },
];

export function Record() {
  return (
    <section id="record" className="border-t border-border py-20">
      <div className="container">
        <PlateHead num="02" title="Competition Record" sub="Seven years on the mat, five years on the cube." />

        <div className="mb-14 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-4">
          <div className="bg-background p-5">
            <span className="block font-mono text-2xl font-bold">1st Dan</span>
            <span className="text-sm text-muted-foreground">Black Belt</span>
          </div>
          {STATS.map((s) => (
            <div key={s.label} className="bg-background p-5">
              <Counter
                value={s.value}
                decimals={s.decimals ?? 0}
                suffix={s.suffix}
                className="block font-mono text-2xl font-bold"
              />
              <span className="text-sm text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="relative border-l border-border pl-8">
          {TIMELINE.map((t, i) => (
            <ScrollReveal key={t.year} delay={i * 0.08} y={16}>
              <div className="relative pb-8 last:pb-0">
                <span
                  className={
                    "absolute -left-[41px] top-1.5 h-3 w-3 rounded-full border-2 " +
                    (t.highlight ? "border-primary bg-primary" : "border-border bg-background")
                  }
                />
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-mono text-sm text-primary">{t.year}</span>
                  <span className="font-semibold">{t.result}</span>
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">{t.detail}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
