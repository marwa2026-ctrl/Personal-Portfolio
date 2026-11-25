import { motion } from "motion/react";
import { FiArrowRight } from "react-icons/fi";

export default function ProjectCard({ data }) {
  const p = data && typeof data === "object" ? data : {};
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group rounded-2xl border border-white/10 bg-surface p-6 transition hover:border-line/40"
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-muted">
        {(p.number || "") + " — " + (p.tech || "")}
      </p>
      <h3 className="mt-3 font-display text-xl font-semibold text-cream">
        {p.title || ""}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-line">
        {p.description || ""}
      </p>
      <a
        href={p.link || "#"}
        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-cream transition group-hover:text-white"
      >
        View Project <FiArrowRight />
      </a>
    </motion.article>
  );
}