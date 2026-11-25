import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { FiArrowUpRight, FiExternalLink, FiHeart } from "react-icons/fi";

import PageTransition from "../components/PageTransition";
import SectionHeading from "../components/SectionHeading";
import { projects } from "../data/portfolio";

import bootcampImage from "../assets/image/Screenshot 2026-09-10 092852.png";
import presentationImage from "../assets/image/Screenshot 2026-08-24 231044.png";
import netlinksImage from "../assets/image/netlinks.png";
import portfolioImage from "../assets/image/Screenshot 2026-09-10 211913.png";
import meProtflio from "../assets/image/me.png";
import DRProtflio from "../assets/image/DR.jpeg";
import Tailwindcss from "../assets/image/Tailwindcss.png";
import PromptIMAGE from "../assets/image/PropmtEngineering.png";
import Zohco from "../assets/image/Zohco-Website.png";
import Prive from "../assets/image/prive.png";
import bootcamp from "../assets/image/bootcamp two.png";

const projectImages = [
  bootcampImage,
  presentationImage,
  netlinksImage,
  portfolioImage,
  meProtflio,
  DRProtflio,
  Tailwindcss,
  PromptIMAGE,
  Zohco,
  Prive,
  bootcamp,
];

const RADIUS = 420;
const CYLINDER_TILT_X = 8;

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const thumbnailsRef = useRef(null);
  const lastSwitchRef = useRef(0);
  const shouldReduceMotion = useReducedMotion();

  // 👇 Check LocalStorage for custom projects and filter out hidden ones
  const savedProj = JSON.parse(localStorage.getItem("custom-projects") || "null");
  
  let projectItems = [];
  
  if (savedProj && Array.isArray(savedProj) && savedProj.length > 0) {
    // Only show items that are NOT marked as visible: false
    const visibleProjects = savedProj.filter((p) => p.visible !== false);
    
    projectItems = visibleProjects.map((p, index) => ({
      number: String(index + 1).padStart(2, "0"),
      title: p.title,
      description: p.desc,
      tech: p.tech,
      link: "#",
      image: projectImages[index % projectImages.length], 
    }));
  } else {
    // Otherwise, use your default portfolio data
    projectItems = projects.items.map((project, index) => ({
      ...project,
      image: projectImages[index] ?? project.image,
    }));
  }

  const count = projectItems.length;
  const activeProject = projectItems[activeIndex] || projectItems[0] || {};

  // Horizontal-only thumbnail scroll — page stays put.
  useEffect(() => {
    const strip = thumbnailsRef.current;
    if (!strip) return;
    const child = strip.children[activeIndex];
    if (!child) return;
    const target =
      child.offsetLeft - strip.clientWidth / 2 + child.clientWidth / 2;
    strip.scrollTo({
      left: target,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  }, [activeIndex, shouldReduceMotion]);

  // Mouse-only navigation (left third = prev, right third = next).
  const handlePointerMove = (event) => {
    if (shouldReduceMotion || count === 0) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;

    setPointer({ x: (x - 0.5) * 2, y: (y - 0.5) * 2 });

    const now = Date.now();
    if (now - lastSwitchRef.current < 650) return;

    if (x < 0.33) {
      setActiveIndex((i) => (i - 1 + count) % count);
      lastSwitchRef.current = now;
    } else if (x > 0.67) {
      setActiveIndex((i) => (i + 1) % count);
      lastSwitchRef.current = now;
    }
  };

  const resetPointer = () => setPointer({ x: 0, y: 0 });
  const animationDuration = shouldReduceMotion ? 0 : 0.6;

  const getCardTransform = (cardIndex) => {
    let offset = cardIndex - activeIndex;
    if (offset > count / 2) offset -= count;
    if (offset < -count / 2) offset += count;

    const abs = Math.abs(offset);
    const hidden = abs > 4;

    const angleStep = 360 / Math.max(count, 6);
    const angleDeg = offset * angleStep;

    const angleRad = (angleDeg * Math.PI) / 180;
    const x = Math.sin(angleRad) * RADIUS;
    const z = Math.cos(angleRad) * RADIUS;

    const normalizedZ = (z + RADIUS) / (2 * RADIUS);
    const scale = 0.55 + normalizedZ * 0.55;
    const opacity = hidden ? 0 : 0.15 + normalizedZ * 0.85;
    const rotateY = -angleDeg;
    const zIndex = Math.round(z + RADIUS);

    const px = pointer.x * 6 * normalizedZ;
    const py = pointer.y * 4 * normalizedZ;

    return {
      x: x + px,
      y: py,
      z,
      scale,
      opacity,
      rotateY,
      zIndex,
      hidden,
    };
  };

  const renderCardFace = (project, isActive) => {
    const isLink = project.link && project.link !== "#";
    const Wrapper = isActive && isLink ? motion.a : motion.div;
    const linkProps =
      isActive && isLink
        ? {
            href: project.link,
            target: "_blank",
            rel: "noopener noreferrer",
            "aria-label": `Visit ${project.title} website`,
          }
        : {};

    return (
      <Wrapper
        {...linkProps}
        animate={
          isActive
            ? { rotateY: pointer.x * -3, rotateX: pointer.y * 2 }
            : { rotateY: 0, rotateX: 0 }
        }
        transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: "easeOut" }}
        className={`group relative flex h-full w-full items-center justify-center overflow-hidden rounded-md bg-surface-2 ${
          isActive && isLink ? "cursor-pointer" : "cursor-default"
        }`}
        style={{
          transformStyle: "preserve-3d",
          boxShadow: isActive
            ? "0 0 35px rgba(238,144,150,0.3), 0 0 70px rgba(20,124,191,0.15)"
            : "0 12px 40px rgba(0,0,0,0.35)",
        }}
      >
        <img
          src={project.image}
          alt={isActive ? project.title : ""}
          draggable="false"
          className="h-full w-full object-contain"
        />
        {isActive && isLink && (
          <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-neon-pink/50 bg-surface-3/80 text-neon-pink opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
            <FiArrowUpRight size={20} />
          </span>
        )}
      </Wrapper>
    );
  };

  // If all projects are hidden, show a message.
  if (projectItems.length === 0) {
    return (
      <PageTransition>
        <section className="mx-auto max-w-7xl px-5 py-32 text-center text-cream">
          <h2 className="text-2xl font-bold">No projects found.</h2>
          <p className="text-muted mt-2">Add some projects in the Admin Settings page.</p>
        </section>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <section className="mx-auto max-w-7xl overflow-hidden px-5 py-16 sm:px-8 lg:py-20">
        <SectionHeading
          eyebrow={projects.eyebrow}
          title={projects.heading}
          intro={projects.intro}
        />

        <div className="mx-auto mt-12 max-w-6xl">
          <div className="overflow-hidden rounded-3xl border border-line bg-surface px-4 pb-8 pt-10 sm:px-8 sm:pt-12 lg:px-12 shadow-lg">
            <div className="relative z-30 mb-6 min-h-19 text-center">
              <motion.div
                key={`${activeProject.number}-heading`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: animationDuration }}
              >
                <h2 className="font-display text-2xl font-medium text-cream sm:text-3xl">
                  {activeProject.title}
                </h2>
                <p className="mt-2 text-xs text-neon-blue! sm:text-sm font-semibold">
                  {activeProject.tech}
                </p>
              </motion.div>
            </div>

            <div
              onMouseMove={handlePointerMove}
              onMouseLeave={resetPointer}
              className="relative mx-auto flex h-90 w-full max-w-4xl items-center justify-center overflow-hidden perspective-[1400px] sm:h-115 lg:h-135"
            >
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-r from-neon-pink/20 to-neon-blue/20 blur-3xl sm:h-72 sm:w-72" />

              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  transformStyle: "preserve-3d",
                  rotateX: CYLINDER_TILT_X,
                }}
              >
                {projectItems.map((project, i) => {
                  const t = getCardTransform(i);
                  const isActive = i === activeIndex;
                  return (
                    <motion.div
                      key={project.number || i}
                      animate={{
                        x: t.x,
                        y: t.y,
                        scale: t.scale,
                        opacity: t.opacity,
                        rotateY: t.rotateY,
                        zIndex: t.zIndex,
                      }}
                      transition={{
                        duration: animationDuration,
                        ease: [0.25, 0.8, 0.25, 1],
                      }}
                      className="absolute flex h-[72%] w-[44%] max-w-120 items-center justify-center"
                      style={{
                        transformStyle: "preserve-3d",
                        pointerEvents: t.hidden ? "none" : "auto",
                      }}
                    >
                      {renderCardFace(project, isActive)}
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            <div className="relative z-30 mx-auto mt-4 flex max-w-4xl items-center justify-between">
              <button
                type="button"
                onClick={() => setLiked((c) => !c)}
                aria-label={liked ? "Unlike carousel" : "Like carousel"}
                aria-pressed={liked}
                className={`flex h-10 w-10 items-center justify-center transition-colors ${
                  liked ? "text-neon-pink! drop-shadow-[0_0_10px_rgba(238,144,150,0.6)]" : "text-muted hover:text-neon-pink!"
                }`}
              >
                <FiHeart size={23} fill={liked ? "currentColor" : "none"} />
              </button>

              <p className="text-xs font-medium tracking-[0.2em] text-ink-soft">
                {String(activeIndex + 1).padStart(2, "0")}
                <span className="mx-2">/</span>
                {String(count).padStart(2, "0")}
              </p>
            </div>
          </div>

          <div className="mt-7 border-b border-line pb-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-neon-pink!">
                  {activeProject.number} — {activeProject.tech}
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold text-cream sm:text-3xl">
                  {activeProject.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-ink-soft">
                  {activeProject.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {(activeProject.tech || "")
                    .split(/[,/|]+/)
                    .map((t) => t.trim())
                    .filter(Boolean)
                    .map((t) => (
                      <span
                        key={t}
                        className="border border-line bg-surface-2 px-3 py-1.5 text-xs text-cream transition-colors hover:border-neon-blue"
                      >
                        {t}
                      </span>
                    ))}
                </div>
              </div>

              {activeProject.link && activeProject.link !== "#" ? (
                <motion.a
                  href={activeProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.04, x: 3 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                  className="mt-1 inline-flex shrink-0 items-center gap-3 self-start rounded-full bg-linear-to-r from-neon-pink to-neon-blue px-6 py-3.5 text-sm font-bold text-white! shadow-[0_0_20px_rgba(238,144,150,0.3)] transition-all duration-300 hover:opacity-90 hover:shadow-[0_0_30px_rgba(20,124,191,0.5)]"
                >
                  View Live Website
                  <FiExternalLink size={16} />
                </motion.a>
              ) : (
                <p className="mt-2 text-xs text-muted">
                  Live website link coming soon.
                </p>
              )}
            </div>
          </div>

          <div
            ref={thumbnailsRef}
            className="mt-7 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-4 pt-2 scrollbar-thin [scrollbar-color:#EE9096_transparent]"
          >
            {projectItems.map((project, i) => (
              <button
                key={project.number || i}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={`Show ${project.title}`}
                aria-current={i === activeIndex}
                className={`relative shrink-0 snap-center overflow-hidden rounded-md border-2 transition-all duration-300 ${
                  i === activeIndex
                    ? "border-neon-pink! opacity-100 shadow-[0_0_15px_rgba(238,144,150,0.5)]"
                    : "border-transparent opacity-50 hover:opacity-80"
                }`}
                style={{ width: 120, height: 72 }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}