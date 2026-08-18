import { ScrollReveal } from "./ScrollReveal";
import { PlateHead } from "./PlateHead";
import { motion } from "framer-motion";

const ENTRIES = [
  {
    status: "In progress",
    title: "Research: suspension lockout & trail vibration",
    body: "An original study measuring how front-suspension lockout changes the vibration transmitted to a rider on rough trail — logged with a handlebar-mounted accelerometer, analyzed statistically, written up as a full paper.",
    bullets: [
      "Targeting the Synopsys Science & Technology Championship",
      "Submitting to a peer-reviewed youth research journal after",
    ],
  },
  {
    status: "Ongoing",
    title: "Mountain biking",
    body: "My newest obsession — trail riding, and the engineering rabbit hole of e-bikes: motor, battery, and drivetrain trade-offs. It's the whole reason the research project above exists.",
    bullets: [],
  },
];

export function FieldLog() {
  return (
    <section id="log" className="border-t border-border py-20">
      <div className="container">
        <PlateHead num="03" title="Field Log" sub="What I'm actually working on right now." />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {ENTRIES.map((e, i) => (
            <ScrollReveal key={e.title} delay={i * 0.08}>
              <div className="relative h-full rounded-md border border-border bg-gradient-to-b from-white/5 to-transparent p-6">
                <span className="mb-2.5 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-primary">
                  <motion.span
                    className="h-1.5 w-1.5 rounded-full bg-primary"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                  />
                  {e.status}
                </span>
                <h3 className="mb-2 text-lg font-semibold text-balance">{e.title}</h3>
                <p className="mb-3 text-sm text-foreground/75">{e.body}</p>
                {e.bullets.length > 0 ? (
                  <ul className="list-disc space-y-1 pl-4 text-sm text-foreground/75">
                    {e.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
