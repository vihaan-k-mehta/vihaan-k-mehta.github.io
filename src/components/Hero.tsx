import { motion } from "framer-motion";
import { TopoBackground } from "./TopoBackground";
import { TextReveal } from "./ui/text-reveal";

export function Hero() {
  return (
    <header className="relative overflow-hidden py-24 sm:py-28">
      <TopoBackground className="absolute inset-0 h-full w-full opacity-60" />
      <div className="container relative">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 font-mono text-sm uppercase tracking-widest text-primary before:mr-1 before:content-['//_'] before:text-muted-foreground"
        >
          San Jose, CA — 8th Grade
        </motion.p>

        <TextReveal
          as="h1"
          per="char"
          preset="fade-in-blur"
          speedReveal={1.8}
          className="mb-2 font-mono text-5xl font-bold tracking-tight text-balance sm:text-7xl"
        >
          Vihaan Mehta
        </TextReveal>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-7 text-xl text-muted-foreground sm:text-2xl"
        >
          <span className="text-foreground font-semibold">Builder.</span>{" "}
          <span className="text-foreground font-semibold">Rider.</span>{" "}
          <span className="text-foreground font-semibold">Competitor.</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mb-8 max-w-xl text-base text-foreground/80 sm:text-lg"
        >
          I build things that solve real problems — a sign-language translator, an
          emergency comms system for first responders — then I go compete: on the
          mat, at the cube, and lately, on the trail. Currently running an original
          research study on mountain bike suspension.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap gap-3"
        >
          <a
            href="#work"
            className="rounded-sm bg-primary px-5 py-2.5 font-mono text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            See the work
          </a>
          <a
            href="#log"
            className="rounded-sm border border-border px-5 py-2.5 font-mono text-sm text-foreground transition-colors hover:border-foreground"
          >
            Field log →
          </a>
        </motion.div>
      </div>
    </header>
  );
}
