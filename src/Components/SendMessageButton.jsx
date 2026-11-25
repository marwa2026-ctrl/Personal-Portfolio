
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiSend, FiFileText } from "react-icons/fi";

export default function SendMessageButton({
  onClick,
  type = "button",
  disabled = false,
}) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleClick = (event) => {
    if (isAnimating || isSent || disabled) return;

    setIsAnimating(true);

    if (onClick) {
      onClick(event);
    }

    window.setTimeout(() => {
      setIsAnimating(false);
      setIsSent(true);
    }, 450);
  };

  return (
    <motion.button
      type={type}
      disabled={disabled || isAnimating || isSent}
      onClick={handleClick}
      aria-label={isSent ? "Message ready" : "Send message"}
      whileTap={!isAnimating && !isSent ? { scale: 0.9 } : undefined}
      animate={
        isAnimating
          ? { scale: [1, 0.9, 1.04, 1] }
          : { scale: 1 }
      }
      transition={{
        duration: 0.42,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative flex h-[76px] w-[88px] shrink-0 items-center justify-center overflow-visible rounded-[27px] border border-white/25 bg-white/15 text-white shadow-[0_8px_25px_rgba(0,0,0,0.22),inset_0_1px_1px_rgba(255,255,255,0.25)] backdrop-blur-xl transition-colors duration-200 hover:bg-white/25 disabled:cursor-not-allowed"
    >
      {/* Curved airplane flight trail */}
      <svg
        className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible"
        viewBox="0 0 88 76"
        fill="none"
        aria-hidden="true"
      >
        <AnimatePresence>
          {isAnimating && (
            <motion.path
              key="flight-trail"
              d="M 35 43 C 45 40, 48 31, 57 27 S 68 20, 73 11"
              stroke="white"
              strokeWidth="1.6"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1],
                opacity: [0, 1, 0],
              }}
              transition={{
                pathLength: {
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                },
                opacity: {
                  duration: 0.4,
                  times: [0, 0.35, 1],
                  ease: "easeOut",
                },
              }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>
      </svg>

      {/* Animated icons */}
      <AnimatePresence mode="wait">
        {!isSent ? (
          <motion.span
            key="send-icon"
            className="absolute z-20 flex items-center justify-center"
            initial={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
            animate={
              isAnimating
                ? {
                    x: 43,
                    y: -39,
                    rotate: 13,
                    scale: 0.72,
                    opacity: 0,
                  }
                : { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }
            }
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.28,
              ease: [0.32, 0, 0.67, 0],
            }}
          >
            <FiSend size={29} strokeWidth={2.2} />
          </motion.span>
        ) : (
          <motion.span
            key="document-icon"
            className="absolute z-20 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.55, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              duration: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <FiFileText size={29} strokeWidth={2} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
