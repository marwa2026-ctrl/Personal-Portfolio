import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  FiArrowRight,
  FiArrowLeft,
  FiMapPin,
  FiMail,
  FiAward,
  FiBookOpen,
  FiTrendingUp,
  FiCheckCircle,
  FiUser,
  FiChevronDown,
  FiCode,
  FiMonitor,
  FiGitBranch,
  FiMessageSquare,
  FiEdit2,
  FiTrash2,
  FiSend,
  FiX,
} from "react-icons/fi";
import * as data from "../data/portfolio";

/* ── Safe helpers ─────────────────────────────────── */
const obj = (v) =>
  v && typeof v === "object" ? v : {};

const arr = (v) =>
  Array.isArray(v) ? v : [];

const str = (v) =>
  typeof v === "string" ? v : "";

/* ── Portfolio data ───────────────────────────────── */
const A = obj(data.about);
const S = obj(data.site);

const aboutEyebrow = str(A.eyebrow);
const aboutHeading = str(A.heading);
const aboutSubheading = str(A.subheading);
const aboutPhoto = str(A.photo);
const aboutPhotoAlt = str(A.photoAlt) || "Profile photo";

const clickHint =
  str(A.clickHint) || "Click my photo to learn more about me";

const siteLocation =
  str(S.location) || "Kabul, Afghanistan";

const siteEmail = str(S.email);

/* ── Education and skills ─────────────────────────── */
const educationList = [
  {
    id: "high-school",
    label: "High School",
    value: "Graduated 2025",
    skills: [
      "Communication and presentation",
      "Independent learning",
      "Research and problem-solving",
      "Time management and organization",
    ],
  },
  {
    id: "top-in-town",
    label: "HTML, CSS, JavaScript & React",
    value: "Top In Town · Completed 2025",
    skills: [
      "HTML5 — semantic page structure",
      "CSS3 — styling, Flexbox, and Grid",
      "JavaScript — variables, functions, arrays, and DOM basics",
      "Responsive website layouts",
      "React — components, JSX, and props",
      "Building interactive user interfaces",
      "Creating reusable website sections",
      "Debugging and solving frontend problems",
    ],
  },
  {
    id: "netlinks",
    label: "Frontend Development",
    value: "Netlinks · In Progress",
    skills: [
      "HTML5 — semantic structure and accessible elements",
      "CSS3 — layouts, styling, and animations",
      "JavaScript — programming fundamentals and interactivity",
      "React.js — components, props, and state",
      "Tailwind CSS — utility classes and responsive layouts",
      "Git — version control",
      "GitHub — repositories and project collaboration",
      "Figma — working with design files and layouts",
      "UI/UX design fundamentals",
      "Responsive design for mobile, tablet, and desktop",
      "Building projects with React and Vite",
    ],
  },
];

const educationIcons = [
  FiAward,
  FiBookOpen,
  FiTrendingUp,
];

const FEEDBACK_STORAGE_KEY = "marwa-about-feedback-v1";

export default function About() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [openCourse, setOpenCourse] = useState(null);

  /* ── Feedback state ─────────────────────────────── */
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbackText, setFeedbackText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [feedbackLoaded, setFeedbackLoaded] = useState(false);
  const [feedbackError, setFeedbackError] = useState("");

  /* Load saved feedback after the component mounts */
  useEffect(() => {
    try {
      const saved = localStorage.getItem(FEEDBACK_STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setFeedbacks(
            parsed.filter(
              (item) =>
                item &&
                typeof item.id === "string" &&
                typeof item.message === "string"
            )
          );
        }
      }
    } catch (error) {
      console.error("Could not load feedback:", error);
    } finally {
      setFeedbackLoaded(true);
    }
  }, []);

  /* Save feedback whenever the list changes */
  useEffect(() => {
    if (!feedbackLoaded) return;

    try {
      localStorage.setItem(
        FEEDBACK_STORAGE_KEY,
        JSON.stringify(feedbacks)
      );
      setFeedbackError("");
    } catch (error) {
      console.error("Could not save feedback:", error);
      setFeedbackError(
        "Feedback could not be saved. Check your browser storage settings."
      );
    }
  }, [feedbacks, feedbackLoaded]);

  /* ── Photo interaction ──────────────────────────── */
  const toggleAbout = () => {
    setIsFlipped((previous) => !previous);
  };

  const toggleCourse = (index) => {
    setOpenCourse((previous) =>
      previous === index ? null : index
    );
  };

  /* ── Add feedback ───────────────────────────────── */
  const handleFeedbackSubmit = (event) => {
    event.preventDefault();

    const message = feedbackText.trim();

    if (!message) {
      setFeedbackError("Please write your feedback first.");
      return;
    }

    const newFeedback = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      message,
      createdAt: new Date().toISOString(),
    };

    setFeedbacks((previous) => [newFeedback, ...previous]);
    setFeedbackText("");
    setFeedbackError("");
  };

  /* ── Start editing feedback ─────────────────────── */
  const handleEditStart = (feedback) => {
    setEditingId(feedback.id);
    setEditText(feedback.message);
    setFeedbackError("");
  };

  /* ── Save edited feedback ───────────────────────── */
  const handleEditSave = (event) => {
    event.preventDefault();

    const message = editText.trim();

    if (!message) {
      setFeedbackError("Feedback cannot be empty.");
      return;
    }

    setFeedbacks((previous) =>
      previous.map((feedback) =>
        feedback.id === editingId
          ? {
              ...feedback,
              message,
              updatedAt: new Date().toISOString(),
            }
          : feedback
      )
    );

    setEditingId(null);
    setEditText("");
    setFeedbackError("");
  };

  /* ── Cancel editing ─────────────────────────────── */
  const handleEditCancel = () => {
    setEditingId(null);
    setEditText("");
    setFeedbackError("");
  };

  /* ── Delete feedback ────────────────────────────── */
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this feedback?"
    );

    if (!confirmed) return;

    setFeedbacks((previous) =>
      previous.filter((feedback) => feedback.id !== id)
    );

    if (editingId === id) {
      setEditingId(null);
      setEditText("");
    }

    setFeedbackError("");
  };

  return (
    <section className="min-h-screen bg-bg px-5 py-16 text-cream sm:px-8 sm:py-20 transition-colors duration-300">
      <div className="mx-auto max-w-6xl">

        {/* ── HEADER ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center sm:mb-16"
        >
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-neon-pink!">
            {aboutEyebrow || "02 — ABOUT ME"}
          </p>

          <h1 className="font-display text-4xl font-semibold leading-tight text-cream sm:text-5xl lg:text-6xl">
            {aboutHeading || "Hi, I'm Marwa Hamraz"}
          </h1>

          {aboutSubheading && (
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-ink-soft sm:text-lg">
              {aboutSubheading}
            </p>
          )}

          <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-linear-to-r from-neon-pink to-neon-blue shadow-[0_0_10px_rgba(238,144,150,0.5)]" />
        </motion.div>

        {/* ── PHOTO AND INFORMATION ───────────────── */}
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">

          {/* ── PHOTO ─────────────────────────────── */}
          <motion.div
            layout
            className={`w-full ${
              isFlipped ? "lg:order-2" : "lg:order-1"
            }`}
            transition={{
              layout: {
                type: "spring",
                stiffness: 180,
                damping: 24,
              },
            }}
          >
            <motion.button
              type="button"
              layout
              onClick={toggleAbout}
              aria-label={
                isFlipped
                  ? "Return to the introduction"
                  : "Show my education and skills"
              }
              className="group relative block w-full overflow-hidden rounded-3xl border border-line bg-surface text-left shadow-[0_25px_70px_-25px_rgba(0,0,0,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue transition-all duration-300 hover:border-neon-pink hover:shadow-[0_0_30px_rgba(238,144,150,0.2)]"
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.99 }}
            >
              {aboutPhoto ? (
                <img
                  src={aboutPhoto}
                  alt={aboutPhotoAlt}
                  className="h-105 w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] sm:h-130 lg:h-145"
                />
              ) : (
                <div className="flex h-105 w-full flex-col items-center justify-center gap-4 text-cream sm:h-130 lg:h-145">
                  <FiUser size={64} className="text-neon-blue" />
                  <p className="text-sm text-ink-soft">
                    Add your photo in portfolio.js
                  </p>
                </div>
              )}

              {/* Photo overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black via-black/75 to-transparent px-5 pb-5 pt-20 sm:px-7 sm:pb-7">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xl font-semibold text-white sm:text-2xl">
                      {isFlipped
                        ? "My Education & Skills"
                        : "Get to Know Me"}
                    </p>

                    <p className="mt-2 text-sm leading-6 text-white/90">
                      {clickHint}
                    </p>
                  </div>

                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white backdrop-blur-sm transition group-hover:bg-neon-pink group-hover:border-neon-pink group-hover:text-white group-hover:shadow-[0_0_15px_rgba(238,144,150,0.5)]">
                    {isFlipped ? (
                      <FiArrowLeft size={22} />
                    ) : (
                      <FiArrowRight size={22} />
                    )}
                  </span>
                </div>
              </div>
            </motion.button>

            <p className="mt-4 text-center text-sm text-ink-soft">
              Click the photo to{" "}
              {isFlipped ? "go back" : "discover more"}.
            </p>
          </motion.div>

          {/* ── INFORMATION ───────────────────────── */}
          <motion.div
            layout
            className={`w-full ${
              isFlipped ? "lg:order-1" : "lg:order-2"
            }`}
          >
            <AnimatePresence mode="wait">
              {!isFlipped ? (
                /* ── FIRST VIEW ──────────────────── */
                <motion.div
                  key="introduction"
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-6"
                >
                  <div className="rounded-3xl border border-line bg-surface p-6 sm:p-8 lg:p-9 shadow-lg">
                    <div className="mb-6 flex items-center gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-2 text-neon-blue shadow-[0_0_15px_rgba(20,124,191,0.2)]">
                        <FiUser size={22} />
                      </span>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-neon-pink!">
                          Nice to meet you
                        </p>

                        <h2 className="mt-1 font-display text-2xl font-semibold text-cream sm:text-3xl">
                          Who Am I?
                        </h2>
                      </div>
                    </div>

                    <p className="text-base leading-8 text-cream">
                      I'm a passionate web developer based in{" "}
                      <span className="font-bold text-neon-blue!">
                        {siteLocation}
                      </span>
                      , focused on creating clean, responsive, and
                      user-friendly digital experiences.
                    </p>

                    <p className="mt-4 text-base leading-8 text-ink-soft">
                      I enjoy learning new technologies and turning
                      ideas into functional, visually appealing
                      websites.
                    </p>

                    {/* Personal details */}
                    <div className="mt-8 grid gap-4 sm:grid-cols-2">

                      <div className="rounded-2xl border border-line bg-surface-2 p-5 transition-colors hover:border-neon-yellow">
                        <FiMapPin
                          size={22}
                          className="mb-4 text-neon-yellow!"
                        />

                        <p className="text-xs font-bold uppercase tracking-[0.15em] text-ink-soft">
                          Location
                        </p>

                        <p className="mt-2 wrap-break-word text-sm font-semibold leading-6 text-cream">
                          {siteLocation}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-line bg-surface-2 p-5 transition-colors hover:border-neon-green">
                        <FiMail
                          size={22}
                          className="mb-4 text-neon-green!"
                        />

                        <p className="text-xs font-bold uppercase tracking-[0.15em] text-ink-soft">
                          Email
                        </p>

                        <a
                          href={
                            siteEmail
                              ? `mailto:${siteEmail}`
                              : undefined
                          }
                          className="mt-2 block break-all text-sm font-semibold leading-6 text-cream underline-offset-4 transition hover:text-neon-green! hover:underline"
                        >
                          {siteEmail || "Add your email"}
                        </a>
                      </div>
                    </div>

                    {/* Projects button */}
                    <div className="mt-8">
                      <Link
                        to="/projects"
                        className="inline-flex items-center justify-center gap-3 rounded-full bg-linear-to-r from-neon-pink to-neon-blue px-7 py-3.5 text-sm font-bold text-white! transition-all duration-300 hover:opacity-90 hover:shadow-[0_0_20px_rgba(20,124,191,0.4)]"
                      >
                        View My Work
                        <FiArrowRight size={18} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* ── SECOND VIEW ─────────────────── */
                <motion.div
                  key="education"
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 25 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-6"
                >
                  {/* Education and expandable skills */}
                  <div className="rounded-3xl border border-line bg-surface p-6 sm:p-8 shadow-lg">
                    <div className="mb-6 flex items-center gap-3">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-2 text-neon-pink shadow-[0_0_15px_rgba(238,144,150,0.2)]">
                        <FiBookOpen size={22} />
                      </span>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.15em] text-neon-blue!">
                          My Learning Journey
                        </p>

                        <h2 className="mt-1 font-display text-xl font-semibold text-cream sm:text-2xl">
                          Education & Skills
                        </h2>
                      </div>
                    </div>

                    <p className="mb-6 text-sm leading-7 text-ink-soft">
                      Explore my education and the skills I've
                      developed through my courses. Click a course
                      to see the related skills.
                    </p>

                    <div className="space-y-4">
                      {educationList.map((item, index) => {
                        const Icon =
                          educationIcons[
                            index % educationIcons.length
                          ];

                        const isOpen = openCourse === index;

                        return (
                          <div
                            key={item.id}
                            className="overflow-hidden rounded-2xl border border-line bg-surface-2 transition-colors hover:border-muted"
                          >
                            <button
                              type="button"
                              onClick={() => toggleCourse(index)}
                              aria-expanded={isOpen}
                              className="flex w-full items-center gap-4 p-4 text-left transition hover:bg-surface-3 sm:p-5"
                            >
                              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface-3 ${index === 0 ? 'text-neon-yellow' : index === 1 ? 'text-neon-green' : 'text-neon-blue'}`}>
                                <Icon size={20} />
                              </span>

                              <span className="min-w-0 flex-1">
                                <span className="block font-semibold leading-6 text-cream">
                                  {item.label}
                                </span>

                                <span className="mt-1 block text-sm leading-6 text-ink-soft">
                                  {item.value}
                                </span>
                              </span>

                              <FiChevronDown
                                size={20}
                                className={`shrink-0 text-muted transition-transform duration-300 ${
                                  isOpen ? "rotate-180 text-neon-pink!" : ""
                                }`}
                              />
                            </button>

                            <AnimatePresence initial={false}>
                              {isOpen && (
                                <motion.div
                                  key="skills"
                                  initial={{
                                    height: 0,
                                    opacity: 0,
                                  }}
                                  animate={{
                                    height: "auto",
                                    opacity: 1,
                                  }}
                                  exit={{
                                    height: 0,
                                    opacity: 0,
                                  }}
                                  transition={{
                                    duration: 0.3,
                                    ease: "easeInOut",
                                  }}
                                  className="overflow-hidden"
                                >
                                  <div className="border-t border-line px-5 py-5">
                                    <p className="mb-4 flex items-center gap-2 text-sm font-bold text-cream">
                                      <FiCode size={18} className="text-neon-pink!" />
                                      Skills Learned
                                    </p>

                                    <ul className="space-y-3">
                                      {item.skills.map(
                                        (skill, skillIndex) => (
                                          <li
                                            key={`${item.id}-${skillIndex}`}
                                            className="flex items-start gap-3 text-sm leading-6 text-ink-soft"
                                          >
                                            <FiCheckCircle
                                              size={17}
                                              className="mt-1 shrink-0 text-neon-green!"
                                            />
                                            <span>{skill}</span>
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Technical interests */}
                  <div className="rounded-3xl border border-line bg-surface p-6 sm:p-8 shadow-lg">
                    <div className="mb-5 flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-2 text-neon-blue shadow-[0_0_15px_rgba(20,124,191,0.2)]">
                        <FiMonitor size={20} />
                      </span>

                      <h2 className="font-display text-xl font-semibold text-cream">
                        My Technical Interests
                      </h2>
                    </div>

                    <p className="text-sm leading-7 text-ink-soft">
                      I enjoy building responsive interfaces,
                      creating reusable React components, improving
                      user experiences, and learning modern frontend
                      development techniques.
                    </p>

                    <div className="mt-5 flex items-center gap-3 rounded-2xl border border-line bg-surface-2 p-4">
                      <FiGitBranch
                        size={21}
                        className="shrink-0 text-neon-orange!"
                      />

                      <p className="text-sm leading-6 text-ink-soft">
                        I continue to practise through personal
                        projects and hands-on development.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsFlipped(false)}
                    className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold text-cream transition hover:border-neon-pink hover:text-neon-pink hover:bg-surface-2 hover:shadow-[0_0_15px_rgba(238,144,150,0.2)]"
                  >
                    <FiArrowLeft size={18} />
                    Back to Introduction
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ── FEEDBACK SECTION ────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="mt-20 border-t border-line pt-12 sm:mt-24 sm:pt-16"
        >
          <div className="mx-auto max-w-3xl">

            <div className="mb-8 text-center">
              <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-surface-2 text-neon-pink shadow-[0_0_20px_rgba(238,144,150,0.2)]">
                <FiMessageSquare size={25} />
              </span>

              <p className="text-xs font-bold uppercase tracking-[0.25em] text-neon-blue!">
                Let's Connect
              </p>

              <h2 className="mt-3 font-display text-3xl font-semibold text-cream sm:text-4xl">
                Share Your Feedback
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-ink-soft sm:text-base">
                Have a suggestion or something you'd like to share?
                Leave your feedback below. You can edit or delete
                your messages whenever you want.
              </p>
            </div>

            {/* Add feedback form */}
            <form
              onSubmit={handleFeedbackSubmit}
              className="rounded-3xl border border-line bg-surface p-5 shadow-lg sm:p-7"
            >
              <label
                htmlFor="feedback-message"
                className="mb-3 block text-sm font-semibold text-cream"
              >
                Your message
              </label>

              <textarea
                id="feedback-message"
                value={feedbackText}
                onChange={(event) => {
                  setFeedbackText(event.target.value);
                  setFeedbackError("");
                }}
                placeholder="Write your feedback here..."
                rows={5}
                maxLength={2000}
                required
                className="w-full resize-y rounded-2xl border border-line bg-bg px-4 py-4 text-sm leading-7 text-cream outline-none placeholder:text-muted focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors"
              />

              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-muted">
                  {feedbackText.length}/2000 characters
                </span>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-neon-pink to-neon-blue px-6 py-3 text-sm font-bold text-white! shadow-[0_0_15px_rgba(20,124,191,0.3)] transition-all duration-300 hover:opacity-90 hover:shadow-[0_0_25px_rgba(238,144,150,0.5)]"
                >
                  <FiSend size={16} />
                  Submit Feedback
                </button>
              </div>
            </form>

            {/* Error message */}
            {feedbackError && (
              <p
                role="alert"
                className="mt-4 rounded-xl border border-neon-red bg-neon-red/10 p-4 text-sm text-neon-red! shadow-[0_0_15px_rgba(182,3,0,0.1)]"
              >
                {feedbackError}
              </p>
            )}

            {/* Feedback list heading */}
            <div className="mb-5 mt-10 flex items-center justify-between gap-4">
              <h3 className="font-display text-xl font-semibold text-cream">
                Feedback Messages
              </h3>

              <span className="rounded-full border border-line bg-surface-2 px-3 py-1.5 text-xs font-semibold text-cream">
                {feedbacks.length}{" "}
                {feedbacks.length === 1 ? "message" : "messages"}
              </span>
            </div>

            {/* Saved feedback */}
            {!feedbackLoaded ? (
              <p className="py-8 text-center text-sm text-muted">
                Loading saved feedback...
              </p>
            ) : feedbacks.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-line bg-surface-2 px-6 py-10 text-center">
                <FiMessageSquare
                  size={30}
                  className="mx-auto mb-4 text-muted"
                />

                <p className="font-semibold text-cream">
                  No feedback yet
                </p>

                <p className="mt-2 text-sm leading-6 text-ink-soft">
                  Be the first to leave a message.
                </p>
              </div>
            ) : (
              /* 🚀 SCROLLABLE CONTAINER ADDED HERE */
              <div className="max-h-112.5 space-y-4 overflow-y-auto pr-2 pb-4 scrollbar-thin scrollbar-thumb-neon-pink/50 scrollbar-track-transparent hover:scrollbar-thumb-neon-pink">
                {feedbacks.map((feedback) => (
                  <article
                    key={feedback.id}
                    className="rounded-3xl border border-line bg-surface p-5 shadow-lg sm:p-6 transition-colors hover:border-muted"
                  >
                    {editingId === feedback.id ? (
                      /* Edit form */
                      <form onSubmit={handleEditSave}>
                        <label
                          htmlFor={`edit-${feedback.id}`}
                          className="mb-3 block text-sm font-semibold text-cream"
                        >
                          Edit your feedback
                        </label>

                        <textarea
                          id={`edit-${feedback.id}`}
                          value={editText}
                          onChange={(event) => {
                            setEditText(event.target.value);
                            setFeedbackError("");
                          }}
                          rows={4}
                          maxLength={2000}
                          required
                          className="w-full resize-y rounded-2xl border border-line bg-bg px-4 py-3 text-sm leading-7 text-cream outline-none placeholder:text-muted focus:border-neon-yellow transition-colors"
                        />

                        <div className="mt-4 flex flex-wrap gap-3">
                          <button
                            type="submit"
                            className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-neon-green to-neon-blue px-5 py-2.5 text-sm font-bold text-white! shadow-[0_0_15px_rgba(119,171,0,0.3)] transition hover:opacity-90"
                          >
                            <FiCheckCircle size={16} />
                            Save Changes
                          </button>

                          <button
                            type="button"
                            onClick={handleEditCancel}
                            className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-cream transition hover:border-neon-red hover:text-neon-red hover:bg-surface-2"
                          >
                            <FiX size={16} />
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      /* Display feedback */
                      <>
                        <div className="flex items-start gap-3">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-2 text-neon-yellow">
                            <FiUser size={19} />
                          </span>

                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-cream">
                              Visitor Feedback
                            </p>

                            <p className="mt-1 text-xs text-muted">
                              {new Date(
                                feedback.createdAt
                              ).toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <p className="mt-5 whitespace-pre-wrap wrap-break-word text-sm leading-7 text-cream">
                          {feedback.message}
                        </p>

                        {feedback.updatedAt && (
                          <p className="mt-3 text-xs text-muted">
                            Edited{" "}
                            {new Date(
                              feedback.updatedAt
                            ).toLocaleString()}
                          </p>
                        )}

                        <div className="mt-5 flex flex-wrap gap-3 border-t border-line pt-4">
                          <button
                            type="button"
                            onClick={() => handleEditStart(feedback)}
                            className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold text-cream transition hover:border-neon-blue hover:text-neon-blue hover:bg-surface-2 hover:shadow-[0_0_15px_rgba(20,124,191,0.2)]"
                          >
                            <FiEdit2 size={15} />
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(feedback.id)}
                            className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold text-cream transition hover:border-neon-red hover:text-neon-red hover:bg-surface-2 hover:shadow-[0_0_15px_rgba(182,3,0,0.2)]"
                          >
                            <FiTrash2 size={15} />
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </article>
                ))}
              </div>
            )}

            <p className="mt-6 text-center text-xs leading-6 text-muted">
              Feedback is stored locally in this browser. It is not
              automatically shared with other visitors.
            </p>
          </div>
        </motion.section>
      </div>
    </section>
  );
}