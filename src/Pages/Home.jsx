import { useRef, useState, useEffect, useMemo } from "react";
import { Link } from "react-router";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "motion/react";
import {
  FiArrowDown,
  FiArrowRight,
  FiDownload,
  FiMapPin,
  FiMail,
  FiCode,
  FiLayers,
  FiZap,
  FiGitBranch,
  FiFigma,
  FiTerminal,
  FiSmartphone,
  FiCpu,
  FiStar,
  FiTrendingUp,
  FiUsers,
  FiChevronLeft,
  FiChevronRight,
  FiX,
} from "react-icons/fi";

import * as data from "../data/portfolio";

// 👇 IMPORT YOUR IMAGES HERE (Vite will handle the hashing)
import imgGraphicDesigner from "../assets/image/Screenshot 2026-09-10 211913.png";
import imgPersonalPortfolio from "../assets/image/me.png";
import imgDRPortfolio from "../assets/image/DR.jpeg";
import imgTailwind from "../assets/image/Tailwindcss.png";
import imgLumea from "../assets/image/Screenshot 2026-09-10 092852.png";

/* ── Safe helpers ─────────────────────────────────── */

const obj = (v) => (v && typeof v === "object" ? v : {});
const arr = (v) => (Array.isArray(v) ? v : []);
const str = (v) => (typeof v === "string" ? v : "");

/* ── Data extraction ──────────────────────────────── */

const H = obj(data.hero);
const F = obj(data.features);
const P = obj(data.projects);
const A = obj(data.about);
const S = obj(data.site);

const heroEyebrow = str(H.eyebrow);
const heroHeadline = str(H.headline);
const heroSubheadline = str(H.subheadline);
const heroLocation = str(H.location);
const heroPrimary = obj(H.ctaPrimary);
const heroSecondary = obj(H.ctaSecondary);

const siteEmail = str(S.email);

const featuresHeading = str(F.heading) || "Why work with me?";
const featuresList = arr(F.items);

const aboutEyebrow = str(A.eyebrow);
const aboutHeading = str(A.heading) || "About me";
const aboutBody = str(A.body);
const aboutPhoto = str(A.photo);
const aboutPhotoAlt = str(A.photoAlt) || "Profile";

const shortAbout =
  aboutBody.length > 240
    ? aboutBody.slice(0, 240).trim() + "…"
    : aboutBody;

/* ═══════════════════════════════════════════════════
   COSMIC CODE VORTEX (COLORFUL CODE + PINK/BLUE GLOW)
═══════════════════════════════════════════════════ */

// 🌈 The colorful code tokens
const COLORED_SNIPPETS = [
  [
    { text: "const", color: "text-[#EE9096]" }, // Pink
    { text: " future", color: "text-[#147CBF]" }, // Blue
    { text: " = ", color: "text-cream" }, 
    { text: "()", color: "text-[#EF8503]" }, // Orange
    { text: " => ", color: "text-[#EE9096]" }, // Pink
    { text: "{", color: "text-[#FDC700]" }, // Yellow
  ],
  [
    { text: "  ", color: "text-transparent" },
    { text: "return", color: "text-[#EE9096]" }, // Pink
    { text: " innovate", color: "text-[#77AB00]" }, // Green
    { text: "();", color: "text-cream" }, 
  ],
  [
    { text: "function", color: "text-[#EE9096]" }, // Pink
    { text: " create", color: "text-[#147CBF]" }, // Blue
    { text: "() {", color: "text-[#FDC700]" }, // Yellow
  ],
  [
    { text: "  ", color: "text-transparent" },
    { text: "const", color: "text-[#EE9096]" }, // Pink
    { text: " world", color: "text-[#147CBF]" }, // Blue
    { text: " = ", color: "text-cream" },
    { text: "[]", color: "text-[#147CBF]" }, // Blue
    { text: ";", color: "text-cream" },
  ],
  [
    { text: "  ", color: "text-transparent" },
    { text: "return", color: "text-[#EE9096]" }, // Pink
    { text: " world", color: "text-[#147CBF]" }, // Blue
    { text: ";", color: "text-cream" },
  ],
  [
    { text: "class", color: "text-[#EE9096]" }, // Pink
    { text: " Developer", color: "text-[#FDC700]" }, // Yellow
    { text: " {", color: "text-cream" },
  ],
  [
    { text: "  ", color: "text-transparent" },
    { text: "build", color: "text-[#77AB00]" }, // Green
    { text: "(ideas) {", color: "text-[#FDC700]" }, // Yellow
  ],
  [
    { text: "    ", color: "text-transparent" },
    { text: "return", color: "text-[#EE9096]" }, // Pink
    { text: " magic", color: "text-[#147CBF]" }, // Blue
    { text: ";", color: "text-cream" },
  ],
  [
    { text: "export", color: "text-[#EE9096]" }, // Pink
    { text: " default", color: "text-[#EE9096]" }, // Pink
    { text: " Reality", color: "text-[#147CBF]" }, // Blue
    { text: ";", color: "text-cream" },
  ],
  [
    { text: "import", color: "text-[#EE9096]" }, // Pink
    { text: " { Future } ", color: "text-cream" },
    { text: "from", color: "text-[#EE9096]" }, // Pink
    { text: " ", color: "text-transparent" },
    { text: "'tomorrow'", color: "text-[#77AB00]" }, // Green
    { text: ";", color: "text-cream" },
  ],
  [
    { text: "await", color: "text-[#EE9096]" }, // Pink
    { text: " build", color: "text-[#147CBF]" }, // Blue
    { text: "(website)", color: "text-[#EF8503]" }, // Orange
    { text: ";", color: "text-cream" },
  ],
  [
    { text: "if", color: "text-[#EE9096]" }, // Pink
    { text: " (dream) { ", color: "text-[#FDC700]" }, // Yellow
    { text: "code", color: "text-[#77AB00]" }, // Green
    { text: "(); }", color: "text-cream" },
  ],
  [
    { text: "const", color: "text-[#EE9096]" }, // Pink
    { text: " imagination", color: "text-[#147CBF]" }, // Blue
    { text: " = ", color: "text-cream" },
    { text: "true", color: "text-[#EF8503]" }, // Orange
    { text: ";", color: "text-cream" },
  ],
  [
    { text: "while", color: "text-[#EE9096]" }, // Pink
    { text: " (learning) { ", color: "text-[#FDC700]" }, // Yellow
    { text: "grow", color: "text-[#77AB00]" }, // Green
    { text: "(); }", color: "text-cream" },
  ],
  [
    { text: "return", color: "text-[#EE9096]" }, // Pink
    { text: " creativity ", color: "text-[#147CBF]" }, // Blue
    { text: "+", color: "text-[#EF8503]" }, // Orange
    { text: " code", color: "text-[#147CBF]" }, // Blue
    { text: ";", color: "text-cream" },
  ],
];

function CosmicCodeVortex() {
  const stars = useMemo(
    () =>
      Array.from({ length: 65 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: 2 + Math.random() * 4,
        delay: Math.random() * 3,
      })),
    []
  );

  const codeLines = useMemo(
    () =>
      Array.from({ length: 32 }, (_, i) => ({
        id: i,
        tokens: COLORED_SNIPPETS[i % COLORED_SNIPPETS.length],
        top: `${(i / 32) * 100}%`,
        delay: (i % 7) * 0.15,
        duration: 6 + (i % 5) * 1.2,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden rounded-3xl bg-black">
      {/* Deep space background with Pink/Blue tint */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(ellipse at 50% 48%, #0a1029 0%, #03040a 48%, #000000 100%)",
        }}
      />

      {/* Twinkling stars */}
      {stars.map((star) => (
        <motion.span
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{ opacity: [0.08, 0.8, 0.08], scale: [0.7, 1.4, 0.7] }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Pink/Blue Glow behind the code globe */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(238,144,150,0.2) 0%, rgba(20,124,191,0.15) 48%, transparent 72%)",
          filter: "blur(20px)",
        }}
        animate={{ scale: [0.92, 1.08, 0.92], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Globe made entirely from flowing code */}
      <div className="absolute left-1/2 top-1/2 h-[270px] w-[270px] -translate-x-1/2 -translate-y-1/2 sm:h-[320px] sm:w-[320px]">
        {/* Outer orbit rings */}
        <motion.div
          className="absolute -inset-[13px] rounded-full border border-[#EE9096]/40 shadow-[0_0_15px_rgba(238,144,150,0.3)]"
          style={{ transform: "rotateX(68deg) rotateZ(-18deg)" }}
          animate={{ rotateZ: [-18, 342] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -inset-[25px] rounded-full border border-[#147CBF]/30 shadow-[0_0_15px_rgba(20,124,191,0.2)]"
          style={{ transform: "rotateX(72deg) rotateZ(28deg)" }}
          animate={{ rotateZ: [28, -332] }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        />

        {/* Spherical code surface */}
        <div
          className="absolute inset-0 overflow-hidden rounded-full border border-white/10"
          style={{
            background:
              "radial-gradient(circle at 34% 25%, #1a2542 0%, #0a0f1c 42%, #020305 78%, #000000 100%)",
            boxShadow:
              "inset -28px -20px 48px rgba(0,0,0,0.9), inset 12px 10px 28px rgba(238,144,150,0.15), 0 0 35px rgba(0,0,0,0.8), 0 0 85px rgba(20,124,191,0.2)",
          }}
        >
          {/* Moving code rows */}
          <div className="absolute inset-0 overflow-hidden rounded-full">
            {codeLines.map((line) => (
              <motion.div
                key={line.id}
                className="absolute left-[-20%] w-[140%] whitespace-nowrap font-mono text-[10px] font-medium tracking-wide sm:text-[11px]"
                style={{ top: line.top }}
                animate={{
                  x: ["-2%", "-35%", "-2%"],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: line.duration,
                  delay: line.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="mr-3 text-[#EE9096]/60">
                  {`{ ${String(line.id + 1).padStart(2, "0")} }`}
                </span>
                
                {/* Colorful code tokens */}
                {line.tokens.map((token, idx) => (
                  <span
                    key={idx}
                    className={token.color}
                    style={{ textShadow: "0 0 10px currentColor" }}
                  >
                    {token.text}
                  </span>
                ))}
              </motion.div>
            ))}
          </div>

          {/* Globe curvature and depth shading */}
          <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-transparent to-black/80" />
          <div className="pointer-events-none absolute inset-[7%] rounded-full border border-white/10" />
          <div className="pointer-events-none absolute inset-y-0 left-[25%] w-[50%] rounded-[50%] border-x border-[#EE9096]/20" />
          <div className="pointer-events-none absolute inset-y-0 left-[39%] w-[22%] rounded-[50%] border-x border-[#147CBF]/20" />
        </div>
      </div>

      {/* Small orbiting light */}
      <motion.span
        className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-[#EE9096] shadow-[0_0_20px_6px_rgba(238,144,150,0.8)]"
        animate={{ rotate: 360 }}
        style={{ transformOrigin: "0 -155px" }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
      />

      {/* Bottom caption */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-5 left-5 z-10 text-[9px] uppercase tracking-wider text-[#EE9096] sm:left-8 sm:text-[10px]"
      >
        Building ideas into reality
      </motion.p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   FLOATING HERO BUTTONS
═══════════════════════════════════════════════════ */

const floatingBadges = [
  {
    label: "React Developer",
    icon: FiCpu,
    position: "left-[-4px] top-[8%] sm:left-[-38px] sm:top-[13%]",
    delay: 0.7,
    duration: 5,
  },
  {
    label: "Creative UI",
    icon: FiLayers,
    position: "right-[-4px] top-[29%] sm:right-[-36px] sm:top-[26%]",
    delay: 1,
    duration: 5.5,
  },
  {
    label: "Clean Code",
    icon: FiCode,
    position: "bottom-[23%] left-[-4px] sm:bottom-[24%] sm:left-[-32px]",
    delay: 1.25,
    duration: 4.8,
  },
  {
    label: "Always Learning",
    icon: FiZap,
    position: "bottom-[9%] right-[-4px] sm:bottom-[10%] sm:right-[-28px]",
    delay: 1.5,
    duration: 5.2,
  },
];

function FloatingHeroButtons() {
  return (
    <>
      {floatingBadges.map((badge, index) => {
        const Icon = badge.icon;

        return (
          <motion.div
            key={badge.label}
            initial={{ opacity: 0, scale: 0.75, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              delay: badge.delay,
              duration: 0.7,
              type: "spring",
              stiffness: 120,
              damping: 14,
            }}
            whileHover={{ scale: 1.07, y: -4 }}
            className={`absolute z-20 ${badge.position}`}
          >
            <motion.div
              animate={{
                y: [0, -8, 0],
                rotate: index % 2 === 0 ? [0, 1, 0] : [0, -1, 0],
              }}
              transition={{
                duration: badge.duration,
                delay: badge.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="group flex cursor-default items-center w-full h-10 gap-1 rounded-full border border-line bg-surface-2/80 px-2 text-xs font-medium text-cream shadow-[0_0_15px_rgba(238,144,150,0.15)] backdrop-blur-xl transition-colors duration-300 hover:border-[#EE9096] hover:bg-surface-2 sm:gap-3 sm:px-4 sm:py-3 sm:text-sm"
            >
              <motion.span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line bg-surface-3 text-[#147CBF]"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <Icon className="text-sm sm:text-base drop-shadow-[0_0_8px_currentColor]" />
              </motion.span>

              <span className="whitespace-nowrap">{badge.label}</span>

              <motion.span
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#EE9096]"
                animate={{ opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }}
                transition={{
                  duration: 2,
                  delay: index * 0.25,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>
        );
      })}
    </>
  );
}

/* ── Skills ───────────────────────────────────────── */

const FEATURE_ICONS = [FiStar, FiTrendingUp, FiZap, FiUsers];

/* ═══════════════════════════════════════════════════
   FEATURE CARD
═══════════════════════════════════════════════════ */

function FeatureCard({ item, index }) {
  const f = obj(item);
  const Icon = FEATURE_ICONS[index % FEATURE_ICONS.length];

  const hoverVariants = [
    { scale: 1.03, rotate: -1 },
    { scale: 1.03, y: -6 },
    { scale: 1.03, rotate: 1 },
    { scale: 1.03, x: 4 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: index % 2 === 0 ? -2 : 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.1, type: "spring" }}
      whileHover={hoverVariants[index % hoverVariants.length]}
      className="group relative overflow-hidden rounded-2xl border border-line bg-surface-2 p-6 transition-colors hover:border-[#EE9096] shadow-[0_0_30px_rgba(0,0,0,0.05)]"
    >
      <motion.div
        className="pointer-events-none absolute -inset-24 bg-gradient-to-br from-[#EE9096]/5 to-[#147CBF]/5 opacity-50 transition-opacity group-hover:opacity-100"
        animate={{ rotate: 360 }}
        transition={{ duration: 24 + index * 4, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="relative mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#EE9096] to-[#147CBF] text-white shadow-lg"
        whileHover={{ rotate: [0, -12, 12, -8, 0], scale: 1.1 }}
        transition={{ duration: 0.6 }}
      >
        <Icon className="text-lg" />
      </motion.div>

      <h3 className="relative font-display text-lg font-semibold text-cream">
        {str(f.title)}
      </h3>

      <p className="relative mt-2 text-sm text-ink-soft">
        {str(f.description)}
      </p>

      <span className="pointer-events-none absolute bottom-3 right-4 font-display text-3xl font-bold text-cream/5">
        {String(index + 1).padStart(2, "0")}
      </span>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   PROJECT IMAGE ACCORDION
═══════════════════════════════════════════════════ */

function ProjectSlider({ items }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (items.length === 0) {
    return (
      <p className="text-center text-sm text-muted">
        No projects added yet.
      </p>
    );
  }

  return (
    <div className="w-full">
      <div className="flex h-[350px] w-full gap-2 sm:h-[450px] sm:gap-3 lg:h-[500px]">
        {items.map((item, index) => {
          const p = obj(item);
          const title = str(p.title);
          const description = str(p.description);
          const image = str(p.image);
          const tech = str(p.tech);
          const number = str(p.number) || String(index + 1).padStart(2, "0");
          const isActive = activeIndex === index;

          return (
            <motion.button
              key={`project-${index}`}
              type="button"
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onClick={() => setActiveIndex(index)}
              animate={{ flexGrow: isActive ? 6 : 1 }}
              transition={{ duration: 0.65, ease: [0.2, 0.75, 0.25, 1] }}
              className="group relative min-w-0 flex-1 overflow-hidden rounded-2xl border border-line bg-surface-2 text-left shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-[#147CBF]"
              aria-label={title}
              aria-pressed={isActive}
            >
              {image ? (
                <motion.img
                  src={image}
                  alt={title}
                  draggable={false}
                  animate={{
                    scale: isActive ? 1.05 : 1,
                    filter: isActive
                      ? "brightness(1) saturate(1)"
                      : "brightness(0.5) saturate(0.5)",
                  }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-surface-2">
                  <span className="font-display text-5xl font-bold text-cream/10">
                    {number}
                  </span>
                </div>
              )}

              <div
                className={`absolute inset-0 transition-colors duration-500 ${
                  isActive
                    ? "bg-gradient-to-t from-black/90 via-black/40 to-transparent"
                    : "bg-black/60"
                }`}
              />

              {isActive && (
                <span className="absolute left-1/2 top-5 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold tracking-[0.2em] text-white/90 sm:top-6 sm:text-xs">
                  {number} / 05
                </span>
              )}

              <span
                className={`absolute left-1/2 font-display font-semibold text-white transition-all duration-500 ${
                  isActive
                    ? "bottom-5 w-[calc(100%-28px)] -translate-x-1/2 rotate-0 whitespace-normal text-center text-base leading-tight drop-shadow-lg sm:bottom-7 sm:w-[calc(100%-44px)] sm:text-2xl"
                    : "bottom-5 w-max -translate-x-1/2 rotate-[-90deg] whitespace-nowrap text-xs tracking-wide sm:text-sm"
                }`}
              >
                {title}
              </span>

              <motion.div
                initial={false}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
                transition={{ duration: 0.3, delay: isActive ? 0.12 : 0 }}
                className="pointer-events-none absolute bottom-[62px] left-4 right-4 text-center sm:bottom-[78px] sm:left-7 sm:right-7"
              >
                <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#EE9096] sm:text-[10px]">
                  {tech}
                </p>
                <p className="line-clamp-3 text-[10px] leading-relaxed text-white/85 sm:text-xs">
                  {description}
                </p>
              </motion.div>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <p className="min-w-0 truncate text-[10px] font-medium uppercase tracking-wider text-muted sm:text-xs">
          {String(activeIndex + 1).padStart(2, "0")} — {str(obj(items[activeIndex]).title)}
        </p>

        <div className="flex shrink-0 items-center gap-1.5" aria-label="Choose a project">
          {items.map((item, index) => (
            <button
              key={`project-dot-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show ${str(obj(item).title)}`}
              aria-pressed={activeIndex === index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "w-5 bg-[#147CBF] shadow-[0_0_10px_rgba(20,124,191,0.6)]"
                  : "w-1.5 bg-line hover:bg-muted"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   PROJECT DETAIL
═══════════════════════════════════════════════════ */

function ProjectDetail({ item, onClose, onPrev, onNext, index, total }) {
  const p = obj(item);
  const title = str(p.title);
  const description = str(p.description);
  const tech = str(p.tech);
  const number = str(p.number) || String(index + 1).padStart(2, "0");
  const link = str(p.link) || "#";
  const image = str(p.image);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 30 }}
        transition={{ type: "spring", damping: 24, stiffness: 280 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-[#147CBF]/30 bg-surface shadow-[0_0_50px_rgba(20,124,191,0.15)]"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition hover:bg-black/70"
          aria-label="Close"
        >
          <FiX />
        </button>

        <div className="relative h-56 w-full bg-surface-2 sm:h-64">
          {image ? (
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-display text-6xl font-bold text-cream/10">
                {number}
              </span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
        </div>

        <div className="relative -mt-12 p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#147CBF]">
            {number}
            {number && tech ? " — " : ""}
            {tech}
          </p>

          <h3 className="mt-2 font-display text-2xl font-semibold text-cream">
            {title}
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            {description}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#EE9096] to-[#147CBF] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 shadow-[0_0_20px_rgba(238,144,150,0.4)]"
            >
              View Project <FiArrowRight />
            </a>

            <div className="flex items-center gap-2">
              <span className="mr-2 text-xs text-muted">
                {index + 1} / {total}
              </span>

              <button
                type="button"
                onClick={onPrev}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-cream transition hover:border-[#147CBF] hover:bg-surface-2"
                aria-label="Previous project"
              >
                <FiChevronLeft />
              </button>

              <button
                type="button"
                onClick={onNext}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-cream transition hover:border-[#147CBF] hover:bg-surface-2"
                aria-label="Next project"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   PROJECTS SECTION
═══════════════════════════════════════════════════ */

const customProjectsData = [
  {
    title: "Graphic Designer Portfolio",
    description: "A visually striking portfolio showcasing creative design work and branding.",
    image: imgGraphicDesigner,
    tech: "React • Tailwind • Framer Motion",
    link: "#",
  },
  {
    title: "Personal Portfolio",
    description: "My personal portfolio website built to showcase my skills and projects.",
    image: imgPersonalPortfolio,
    tech: "React • Vite • Tailwind",
    link: "#",
  },
  {
    title: "DR Portfolio",
    description: "A professional portfolio website with a clean and modern aesthetic.",
    image: imgDRPortfolio,
    tech: "React • CSS",
    link: "#",
  },
  {
    title: "Tailwind CSS Presentation",
    description: "An interactive presentation explaining the power of Tailwind CSS.",
    image: imgTailwind,
    tech: "HTML • CSS • JS",
    link: "#",
  },
  {
    title: "Luméa",
    description: "Beauty in its purest form.", 
    image: imgLumea,
    tech: "UI/UX • Web Design",
    link: "#",
  },
];

function ProjectsSection({ projects }) {
  const list = customProjectsData;

  const eyebrow = str(projects.eyebrow) || "MY WORK";
  const heading = str(projects.heading) || "Selected Projects";
  const intro = str(projects.intro) || "A collection of my recent work and experiments.";

  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 max-w-2xl"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#EE9096]">
            {eyebrow}
          </p>

          <h2 className="font-display text-3xl font-semibold text-cream sm:text-4xl">
            {heading}
          </h2>

          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            {intro}
          </p>
        </motion.div>

        <ProjectSlider items={list} />

        <div className="mt-10 text-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium text-cream transition hover:border-[#EE9096] hover:text-[#EE9096] hover:bg-surface-2 hover:shadow-[0_0_20px_rgba(238,144,150,0.2)]"
          >
            See all projects <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════════════ */

export default function Home() {
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.4]);

  return (
    <div>
      {/* ═════════ HERO ═════════ */}
      <motion.section
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity }}
        className="mx-auto max-w-6xl px-6 pb-20 pt-16 sm:pt-24"
      >
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Hero text */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#147CBF]"
            >
              <motion.span
                className="inline-block h-1.5 w-1.5 rounded-full bg-[#EE9096] shadow-[0_0_10px_rgba(238,144,150,0.8)]"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              {heroEyebrow}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-xl font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl"
            >
              <span className="bg-gradient-to-r from-[#EE9096] to-[#147CBF] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(238,144,150,0.3)]">
                {heroHeadline}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-lg text-base leading-relaxed text-ink-soft"
            >
              {heroSubheadline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted"
            >
              {heroLocation ? (
                <span className="flex items-center gap-1.5">
                  <FiMapPin className="text-[#EE9096]" />
                  {heroLocation}
                </span>
              ) : null}

              {siteEmail ? (
                <span className="flex items-center gap-1.5">
                  <FiMail className="text-[#147CBF]" />
                  {siteEmail}
                </span>
              ) : null}
            </motion.div>

            {/* Animated hero CTA buttons */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.15, delayChildren: 0.4 },
                },
              }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              {/* Primary button */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1, y: 0,
                    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to={str(heroPrimary.path) || "/projects"}
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#EE9096] to-[#147CBF] px-6 py-3.5 text-sm font-medium text-white shadow-[0_0_20px_rgba(238,144,150,0.4)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(20,124,191,0.6)]"
                >
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-[-60%] w-1/3 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    animate={{ left: ["-60%", "140%"] }}
                    transition={{
                      duration: 1.1, delay: 1.4,
                      repeat: Infinity, repeatDelay: 4,
                      ease: "easeInOut",
                    }}
                  />
                  <span className="relative z-10">
                    {str(heroPrimary.label) || "View My Work"}
                  </span>
                  <motion.span
                    className="relative z-10 flex items-center"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.25 }}
                  >
                    <FiArrowRight />
                  </motion.span>
                </Link>
              </motion.div>

              {/* Secondary button - NOW SCROLLS TO ABOUT */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1, y: 0,
                    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.97 }}
              >
                <a
                  href="#about"
                  className="group inline-flex items-center gap-3 rounded-full border border-[#147CBF]/40 bg-surface-2 px-6 py-3.5 text-sm font-medium text-cream backdrop-blur-sm transition-all duration-300 hover:border-[#147CBF] hover:bg-[#147CBF]/10 hover:shadow-[0_0_20px_rgba(20,124,191,0.3)]"
                >
                  <motion.span
                    className="flex items-center text-[#147CBF]"
                    whileHover={{ y: 3 }}
                    transition={{ duration: 0.25 }}
                  >
                    <FiArrowDown /> {/* 👈 Changed icon to ArrowDown */}
                  </motion.span>
                  <span>More About Me</span> {/* 👈 Changed text */}
                  <motion.span
                    className="flex items-center text-muted transition-colors group-hover:text-[#147CBF]"
                    whileHover={{ x: 3, y: -3 }}
                    transition={{ duration: 0.25 }}
                  >
                    <FiArrowRight />
                  </motion.span>
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Hero visual with floating animated buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto h-[400px] w-full max-w-md overflow-visible sm:h-[500px]"
          >
            <div className="absolute inset-0 overflow-hidden rounded-3xl shadow-[0_0_80px_rgba(20,124,191,0.15)] ring-1 ring-line">
              <CosmicCodeVortex />
            </div>
            <FloatingHeroButtons />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 flex items-center gap-2 text-xs uppercase tracking-widest text-muted"
        >
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="text-[#147CBF]"
          >
            <FiArrowDown />
          </motion.span>
          Scroll
        </motion.div>
      </motion.section>

      {/* ═════════ ABOUT ═════════ */}
      {/* 👇 Added id="about" so the button above can jump down to it */}
      <section id="about" className="border-t border-line bg-surface scroll-mt-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 md:grid-cols-2">
          {/* About image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto w-full max-w-sm"
          >
            <div className="relative overflow-hidden rounded-3xl border border-line shadow-[0_0_50px_rgba(238,144,150,0.1)]">
              {aboutPhoto ? (
                <img
                  src={aboutPhoto}
                  alt={aboutPhotoAlt}
                  loading="lazy"
                  className="h-[360px] w-full object-cover"
                />
              ) : (
                <div className="flex h-[360px] w-full items-center justify-center bg-surface-2 text-muted">
                  No photo
                </div>
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            <motion.div
              className="absolute -bottom-4 -right-4 rounded-2xl border border-[#EE9096]/30 bg-surface-2 px-4 py-2 shadow-[0_0_20px_rgba(238,144,150,0.2)]"
              animate={{ y: [-3, 3, -3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#EE9096]">
                Based in
              </p>
              <p className="text-xs font-medium text-cream">
                {heroLocation || "Afghanistan"}
              </p>
            </motion.div>
          </motion.div>

          {/* About text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#147CBF]">
              {aboutEyebrow}
            </p>

            <h2 className="font-display text-3xl font-semibold text-cream sm:text-4xl">
              {aboutHeading}
            </h2>

            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              {shortAbout}
            </p>

            <Link
              to="/about"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-cream transition hover:border-[#147CBF] hover:text-[#147CBF] hover:bg-surface-2 hover:shadow-[0_0_15px_rgba(20,124,191,0.2)]"
            >
              Read full story <FiArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═════════ WHY ME ═════════ */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#EE9096]">
            WHY ME
          </p>

          <h2 className="font-display text-3xl font-semibold text-cream sm:text-4xl">
            {featuresHeading}
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuresList.length > 0 ? (
            featuresList.map((item, index) => (
              <FeatureCard key={`feature-${index}`} item={item} index={index} />
            ))
          ) : (
            <p className="col-span-full text-center text-sm text-muted">
              No features added yet.
            </p>
          )}
        </div>
      </section>

      {/* ═════════ PROJECTS ═════════ */}
      <ProjectsSection projects={P} />
    </div>
  );
}