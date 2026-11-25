import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FiMail,
  FiMapPin,
  FiGithub,
  FiLinkedin,
  FiArrowUpRight,
  FiSend,
  FiFileText,
  FiCheckCircle,
  FiArrowLeft,
} from "react-icons/fi";
import PageTransition from "../Components/PageTransition";

const backgroundImage =
  "https://i.pinimg.com/1200x/fb/03/7a/fb037ac419147afc41b7e77529b180d7.jpg";

const ease = [0.22, 1, 0.36, 1];

const fieldVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

function SendMessageButton({ isAnimating, isSent }) {
  return (
    <motion.button
      type="submit"
      disabled={isAnimating || isSent}
      whileHover={!isAnimating && !isSent ? { y: -2 } : {}}
      whileTap={{ scale: 0.9 }}
      animate={
        isAnimating
          ? { scale: [1, 0.9, 1.03, 1] }
          : { scale: 1 }
      }
      transition={{ duration: 0.42, ease }}
      aria-label="Send message"
      className="relative flex h-[68px] w-[78px] shrink-0 items-center justify-center overflow-visible rounded-[24px] border border-[#EE9096]/50 bg-gradient-to-br from-[#EE9096] to-[#147CBF] text-white! shadow-[0_0_20px_rgba(238,144,150,0.3)] backdrop-blur-xl transition-all duration-300 hover:opacity-90 hover:shadow-[0_0_30px_rgba(20,124,191,0.5)] disabled:cursor-not-allowed"
    >
      <svg
        viewBox="0 0 78 68"
        className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible"
        fill="none"
        aria-hidden="true"
      >
        <AnimatePresence>
          {isAnimating && (
            <motion.path
              key="flight-trail"
              d="M 27 39 C 39 36, 42 27, 51 24 S 61 17, 66 8"
              stroke="#EE9096"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: [0, 1, 0],
              }}
              transition={{
                pathLength: { duration: 0.28, ease },
                opacity: { duration: 0.4, times: [0, 0.3, 1] },
              }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>
      </svg>

      <AnimatePresence mode="wait">
        {isSent ? (
          <motion.span
            key="document"
            initial={{ opacity: 0, scale: 0.55, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease }}
            className="absolute z-20"
          >
            <FiFileText size={27} strokeWidth={2} />
          </motion.span>
        ) : (
          <motion.span
            key="airplane"
            initial={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
            animate={
              isAnimating
                ? {
                    opacity: 0,
                    x: 42,
                    y: -38,
                    rotate: 14,
                    scale: 0.7,
                  }
                : { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }
            }
            transition={{ duration: 0.28, ease: [0.32, 0, 0.67, 0] }}
            className="absolute z-20"
          >
            <FiSend size={27} strokeWidth={2.1} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

function ContactField({ label, name, value, onChange, placeholder, type = "text" }) {
  return (
    <motion.label
      variants={fieldVariants}
      className="group block"
    >
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#EE9096]! transition-colors group-focus-within:text-[#147CBF]!">
        {label}
      </span>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="w-full rounded-2xl border border-line bg-surface-2/80 px-4 py-4 text-sm text-cream outline-none backdrop-blur-md transition-all duration-300 placeholder:text-muted hover:border-[#EE9096]/50 focus:border-[#147CBF] focus:bg-surface-3/90 focus:shadow-[0_0_0_3px_rgba(20,124,191,0.15)]"
      />
    </motion.label>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isAnimating, setIsAnimating] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isAnimating || submitted) return;

    setIsAnimating(true);

    // 👇 SAVE TO LOCAL STORAGE FOR THE ADMIN DASHBOARD
    const newMessage = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      date: new Date().toISOString(),
    };

    const existingMessages = JSON.parse(localStorage.getItem("marwa-contact-messages") || "[]");
    localStorage.setItem("marwa-contact-messages", JSON.stringify([newMessage, ...existingMessages]));
    // 👆 END OF SAVE LOGIC

    // Demo only: no email is sent.
    window.setTimeout(() => {
      setIsAnimating(false);
      setIsSent(true);
      setSubmitted(true);
    }, 450);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    setIsAnimating(false);
    setIsSent(false);
    setSubmitted(false);
  };

  return (
    <PageTransition>
      <main className="relative isolate min-h-screen overflow-hidden bg-bg text-cream transition-colors duration-300">
        {/* Background image and overlays */}
        <div className="absolute inset-0 -z-20">
          <img
            src={backgroundImage}
            alt=""
            className="h-full w-full object-cover opacity-70"
          />
        </div>

        {/* Lighter overlays so the image is clearly visible */}
        <div className="absolute inset-0 -z-10 bg-bg/40" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-bg/60 via-bg/20 to-surface/60" />

        {/* Subtle background light (Pink & Blue) */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 top-20 -z-10 h-96 w-96 rounded-full bg-gradient-to-br from-[#EE9096]/20 to-[#147CBF]/20 blur-[120px]"
          animate={{
            x: [0, -25, 0],
            y: [0, 30, 0],
            scale: [1, 1.12, 1],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
          {/* Page heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="mb-14 max-w-3xl sm:mb-20"
          >
            <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-[#EE9096]!">
              <span className="h-px w-8 bg-[#EE9096]" />
              05 — GET IN TOUCH
            </p>

            <h1 className="text-5xl font-light leading-[1.08] tracking-tight text-cream sm:text-6xl lg:text-7xl">
              Let&apos;s start a
              <span className="mt-2 block font-serif italic text-[#147CBF]!">
                conversation.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-ink-soft sm:text-base">
              Have a project in mind or want to work together? Send me a
              message. I&apos;d love to hear what you&apos;re creating.
            </p>
          </motion.div>

          <div className="grid items-start gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            {/* Contact information */}
            <motion.aside
              initial={{ opacity: 0, x: -35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, delay: 0.12, ease }}
              className="space-y-10"
            >
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.22em] text-ink-soft">
                  Contact details
                </p>
                <h2 className="text-2xl font-light sm:text-3xl text-cream">
                  Let&apos;s connect.
                </h2>
              </div>

              <a
                href="mailto:marwaislam313@gmail.com"
                className="group flex items-center gap-4"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-surface-2/80 backdrop-blur-sm text-[#EE9096]! transition-all duration-300 group-hover:border-[#EE9096] group-hover:bg-[#EE9096]/10 group-hover:shadow-[0_0_15px_rgba(238,144,150,0.3)]">
                  <FiMail size={20} />
                </span>
                <span>
                  <span className="block text-xs text-ink-soft">Email me</span>
                  <span className="mt-1 block text-sm font-medium text-cream">
                    marwaislam313@gmail.com
                  </span>
                </span>
                <FiArrowUpRight className="ml-auto text-muted transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#EE9096]!" />
              </a>

              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-surface-2/80 backdrop-blur-sm text-[#147CBF]!">
                  <FiMapPin size={20} />
                </span>
                <span>
                  <span className="block text-xs text-ink-soft">Location</span>
                  <span className="mt-1 block text-sm font-medium text-cream">
                    Kabul, Afghanistan
                  </span>
                </span>
              </div>

              <div className="border-t border-line pt-7">
                <p className="mb-5 text-xs uppercase tracking-[0.22em] text-ink-soft">
                  Find me online
                </p>

                <div className="flex gap-3">
                  <a
                    href="https://github.com/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-surface-2/80 backdrop-blur-sm text-[#147CBF]! transition-all duration-300 hover:-translate-y-1 hover:border-[#147CBF] hover:bg-[#147CBF]/10 hover:shadow-[0_0_15px_rgba(20,124,191,0.3)]"
                  >
                    <FiGithub size={20} />
                  </a>
                  <a
                    href="https://www.linkedin.com/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-surface-2/80 backdrop-blur-sm text-[#EE9096]! transition-all duration-300 hover:-translate-y-1 hover:border-[#EE9096] hover:bg-[#EE9096]/10 hover:shadow-[0_0_15px_rgba(238,144,150,0.3)]"
                  >
                    <FiLinkedin size={20} />
                  </a>
                </div>
              </div>
            </motion.aside>

            {/* Animated form card */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
              className="relative isolate"
            >
              {/* Large, visible soft shadow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-5 -z-10 rounded-[2.5rem] bg-black/20 blur-3xl sm:-inset-8"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-2 -z-10 rounded-[2.5rem] bg-[#EE9096]/10 blur-2xl"
              />

              {/* Animated outer border */}
              <div className="relative overflow-hidden rounded-[2rem] p-px shadow-[0_30px_100px_rgba(0,0,0,0.15)]">
                <motion.div
                  aria-hidden="true"
                  className="absolute -inset-[100%] opacity-60"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 0deg, rgba(238,144,150,0.6) 70deg, transparent 130deg, transparent 230deg, rgba(20,124,191,0.6) 290deg, transparent 360deg)",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                <div className="relative rounded-[calc(2rem-1px)] border border-line bg-surface/90 p-6 backdrop-blur-2xl sm:p-9 lg:p-10">
                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 18, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.45, ease }}
                        className="flex min-h-[460px] flex-col items-center justify-center text-center"
                      >
                        <motion.div
                          initial={{ scale: 0.5, rotate: -15 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.45, ease }}
                          className="mb-6 flex h-20 w-20 items-center justify-center rounded-[28px] border border-[#77AB00]/30 bg-[#77AB00]/10 text-[#77AB00]! shadow-[0_0_30px_rgba(119,171,0,0.2)]"
                        >
                          <FiCheckCircle size={34} />
                        </motion.div>

                        <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#EE9096]!">
                          Demo complete
                        </p>
                        <h2 className="text-3xl font-light text-cream sm:text-4xl">
                          Thanks for reaching out.
                        </h2>
                        <p className="mt-4 max-w-sm text-sm leading-7 text-ink-soft">
                          Your form animation is complete. This is a demo:
                          your message has not been sent or saved.
                        </p>

                        <button
                          type="button"
                          onClick={resetForm}
                          className="mt-8 inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-medium text-cream transition-all duration-300 hover:border-[#147CBF] hover:text-[#147CBF]! hover:bg-surface-2 hover:shadow-[0_0_15px_rgba(20,124,191,0.2)]"
                        >
                          <FiArrowLeft size={16} />
                          Write another message
                        </button>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="contact-form"
                        onSubmit={handleSubmit}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, y: -10 }}
                        variants={{
                          hidden: {},
                          visible: {
                            transition: {
                              staggerChildren: 0.09,
                              delayChildren: 0.08,
                            },
                          },
                        }}
                        className="space-y-6"
                      >
                        <motion.div
                          variants={fieldVariants}
                          transition={{ duration: 0.5, ease }}
                          className="mb-8"
                        >
                          <p className="mb-2 text-xs uppercase tracking-[0.22em] text-ink-soft">
                            Your message
                          </p>
                          <h2 className="text-2xl font-light text-cream sm:text-3xl">
                            Tell me about it.
                          </h2>
                        </motion.div>

                        <div className="grid gap-5 sm:grid-cols-2">
                          <ContactField
                            label="Your name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Jane Smith"
                          />
                          <ContactField
                            label="Email address"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="jane@example.com"
                            type="email"
                          />
                        </div>

                        <ContactField
                          label="Subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="What would you like to discuss?"
                        />

                        <motion.label
                          variants={fieldVariants}
                          className="group block"
                        >
                          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#EE9096]! transition-colors group-focus-within:text-[#147CBF]!">
                            Your message
                          </span>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Tell me a little about your project..."
                            rows={5}
                            required
                            className="w-full resize-y rounded-2xl border border-line bg-surface-2/80 px-4 py-4 text-sm leading-7 text-cream outline-none backdrop-blur-md transition-all duration-300 placeholder:text-muted hover:border-[#EE9096]/50 focus:border-[#147CBF] focus:bg-surface-3/90 focus:shadow-[0_0_0_3px_rgba(20,124,191,0.15)]"
                          />
                        </motion.label>

                        <motion.div
                          variants={fieldVariants}
                          transition={{ duration: 0.5, ease }}
                          className="flex flex-wrap items-center justify-between gap-5 border-t border-line pt-6"
                        >
                          <p className="max-w-[220px] text-xs leading-6 text-ink-soft">
                            This is a front-end demo. No message will be
                            emailed or stored.
                          </p>

                          <div className="flex items-center gap-4">
                            <span className="hidden text-sm font-medium text-[#147CBF]! sm:inline">
                              Send message
                            </span>
                            <SendMessageButton
                              isAnimating={isAnimating}
                              isSent={isSent}
                            />
                          </div>
                        </motion.div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}