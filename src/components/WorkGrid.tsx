import { ScrollReveal } from "./ScrollReveal";
import { SpotlightCard } from "./SpotlightCard";
import { GlowBadge } from "./GlowBadge";
import { PlateHead } from "./PlateHead";

const PROJECTS = [
  {
    title: "ASL Translator",
    badge: "IEEE Award",
    desc: "Real-time computer-vision translator for American Sign Language — signs to speech across ~2,200 words, and speech back into an animated signing avatar.",
    tags: ["Computer Vision", "ML", "Accessibility"],
  },
  {
    title: "Emergency Drone Comm",
    badge: "3rd — Synopsys",
    desc: "BLE transmitter/receiver pair that lets a drone pull a person's location and emergency needs from their phone in under two seconds.",
    tags: ["BLE", "App Inventor", "Emergency Response"],
  },
  {
    title: "EduAI",
    badge: null,
    desc: "An AI-driven application built to help students learn — adaptive explanations over static answers.",
    tags: ["AI", "Education"],
  },
  {
    title: "3D Printing Business",
    badge: "$200+ revenue",
    desc: "Designed and sold 3D-printed gadgets to classmates — ran production, orders, and customer service solo alongside a full school schedule.",
    tags: ["Product Design", "Operations"],
  },
  {
    title: "Custom Dog Tags",
    badge: "Est. 2022",
    desc: "CNC-engraved dog tag business, co-founded with my sister. Revenue once funded emergency sparring helmets so my whole Taekwondo team could stay in a national tournament.",
    tags: ["Manufacturing", "CNC"],
  },
];

export function WorkGrid() {
  return (
    <section id="work" className="border-t border-border py-20">
      <div className="container">
        <PlateHead
          num="01"
          title="Selected Work"
          sub="Projects built to actually work, not just demo — each one solves a specific, real problem."
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 0.06}>
              <SpotlightCard className="h-full">
                <div className="mb-2.5 flex items-start justify-between gap-2">
                  <h3 className="text-lg font-semibold text-balance">{p.title}</h3>
                  {p.badge ? <GlowBadge>{p.badge}</GlowBadge> : null}
                </div>
                <p className="mb-4 text-sm text-foreground/75">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-sm border border-border px-2 py-0.5 font-mono text-[0.68rem] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
