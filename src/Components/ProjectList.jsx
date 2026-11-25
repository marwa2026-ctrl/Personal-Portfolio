import { motion } from "motion/react";
import { FiArrowRight } from "react-icons/fi";

export default function ProjectList({ items }) {
  const list = Array.isArray(items) ? items : [];

  if (list.length === 0) {
    return (
      <p className="col-span-full text-center text-sm text-muted">
        No projects added yet.
      </p>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {list.map((item, index) => {
        const p = item && typeof item === "object" ? item : {};
        const number = typeof p.number === "string" ? p.number : "";
        const tech = typeof p.tech === "string" ? p.tech : "";
        const title = typeof p.title === "string" ? p.title : "";
        const description = typeof p.description === "string" ? p.description : "";
        const link = typeof p.link === "string" && p.link ? p.link : "#";

        return (
          <motion.article
            key={`project-${index}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="group rounded-2xl border border-white/10 bg-surface p-6 transition hover:border-line/40"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">
              {number}
              {number && tech ? " — " : ""}
              {tech}
            </p>
            <h3 className="mt-3 font-display text-xl font-semibold text-cream">
              {title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-line">
              {description}
            </p>
            <a
              href={link}
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-cream transition group-hover:text-white"
            >
              View Project <FiArrowRight />
            </a>
          </motion.article>
        );
      })}
    </div>
  );
}