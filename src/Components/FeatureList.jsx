import { motion } from "motion/react";

export default function FeatureList({ items }) {
  const list = Array.isArray(items) ? items : [];

  if (list.length === 0) {
    return (
      <p className="col-span-full text-center text-sm text-muted">
        No features added yet.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {list.map((item, index) => {
        const f = item && typeof item === "object" ? item : {};
        return (
          <motion.div
            key={`feature-${index}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="rounded-2xl border border-white/10 bg-surface-2 p-6 transition hover:border-line/40"
          >
            <h3 className="font-display text-lg font-semibold text-cream">
              {typeof f.title === "string" ? f.title : ""}
            </h3>
            <p className="mt-2 text-sm text-line">
              {typeof f.description === "string" ? f.description : ""}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}