import { motion } from "motion/react";

export default function FeatureCard({ data, index = 0 }) {
  const d = data && typeof data === "object" ? data : {};
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="rounded-2xl border border-white/10 bg-surface-2 p-6 transition hover:border-line/40"
    >
      <h3 className="font-display text-lg font-semibold text-cream">
        {d.title || ""}
      </h3>
      <p className="mt-2 text-sm text-line">{d.description || ""}</p>
    </motion.div>
  );
}