import { motion } from "framer-motion";

export function TextReveal({
  text,
  as: Tag = "span",
  className,
  delay = 0,
  stagger = 0.05,
}: {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = text.split(" ");
  const MotionTag = motion(Tag as any);

  return (
    <MotionTag className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.08em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.7,
              ease: [0.19, 1, 0.22, 1],
              delay: delay + i * stagger,
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
