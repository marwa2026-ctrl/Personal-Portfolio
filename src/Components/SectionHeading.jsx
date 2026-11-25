import { motion } from "motion/react";

export default function SectionHeading({ eyebrow, title, intro, center = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={`mb-12 max-w-2xl ${center ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
        {title}
      </h2>
      {intro && <p className="mt-4 text-base leading-relaxed text-muted">{intro}</p>}
    </motion.div>
  );
}