import { motion } from "motion/react";
import { FiCode, FiLayers, FiZap, FiGitBranch } from "react-icons/fi";

const SKILLS = [
  { name: "React", icon: FiCode },
  { name: "JavaScript", icon: FiZap },
  { name: "CSS", icon: FiLayers },
  { name: "Git", icon: FiGitBranch },
  { name: "Figma", icon: FiLayers },
  { name: "HTML", icon: FiCode },
];

const ORBIT = [
  { top: "6%", left: "42%" },
  { top: "22%", left: "82%" },
  { top: "62%", left: "82%" },
  { top: "82%", left: "42%" },
  { top: "62%", left: "4%" },
  { top: "22%", left: "4%" },
];

export default function SkillVisual() {
  const list = Array.isArray(SKILLS) ? SKILLS : [];

  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      {/* Glow */}
      <motion.div
        className="absolute inset-6 rounded-full bg-gradient-to-br from-white/15 via-white/5 to-transparent blur-2xl"
        animate={{ scale: [1, 1.06, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Outer ring */}
      <motion.div
        className="absolute inset-6 rounded-full border border-white/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 shadow-[0_0_20px_rgba(255,255,255,0.6)]" />
      </motion.div>

      {/* Inner dashed ring */}
      <motion.div
        className="absolute inset-12 rounded-full border border-dashed border-white/10"
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-white/40" />
      </motion.div>

      {/* Center core */}
      <motion.div
        className="absolute inset-24 flex flex-col items-center justify-center rounded-full border border-white/15 bg-gradient-to-br from-white/15 to-white/0 backdrop-blur-md"
        animate={{ y: [-6, 6, -6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <p className="font-display text-3xl font-semibold text-white">{"</>"}</p>
        <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60">
          Building
        </p>
      </motion.div>

      {/* Orbiting skill chips */}
      {list.map((skill, index) => {
        const Icon =
          skill && typeof skill.icon === "function" ? skill.icon : FiCode;
        const pos = ORBIT[index % ORBIT.length];
        const name =
          skill && typeof skill.name === "string" ? skill.name : "";

        return (
          <motion.div
            key={`skill-${index}`}
            className="absolute flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur-md"
            style={{ top: pos.top, left: pos.left }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, index % 2 === 0 ? -8 : 8, 0],
            }}
            transition={{
              opacity: { delay: 0.4 + index * 0.08, duration: 0.4 },
              scale: { delay: 0.4 + index * 0.08, duration: 0.4 },
              y: {
                duration: 4 + index * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <Icon className="text-white/60" />
            {name}
          </motion.div>
        );
      })}

      {/* Code snippet card */}
      <motion.div
        className="absolute -bottom-4 -right-4 rounded-2xl border border-white/10 bg-surface-2/80 p-3 font-mono text-[10px] text-white/40 shadow-2xl backdrop-blur"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <p>{"<div className='magic'>"}</p>
        <p className="pl-3 text-white/60">{"✨ build()"}</p>
        <p>{"</div>"}</p>
      </motion.div>
    </div>
  );
}