import { motion } from "motion/react";
import {
  FiMail,
  FiGlobe,
  FiDownload,
  FiSearch,
  FiGithub,
  FiLinkedin, // 👈 Added LinkedIn Icon
} from "react-icons/fi";

/* ---------- Animation Variants ---------- */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/* ---------- Resume Data ---------- */

const skills = [
  "Web Development",
  "HTML 5",
  "CSS",
  "JavaScript",
  "Tailwind CSS",
  "Figma",
  "UI/UX",
  "Git and GitHub",
  "React",
];

const softSkills = ["Problem Solving", "Communication", "Teamwork", "Adaptability"];

const experience = [
  {
    role: "Frontend Development Intern",
    company: "Netlinks",
    period: "2025",
    points: [
      "Built responsive and user-friendly web interfaces using React and Tailwind CSS.",
      "Collaborated with the design team to translate Figma files into functional code.",
      "Practiced version control and project collaboration using Git and GitHub.",
    ],
  },
];

const education = [
  {
    degree: "HTML, CSS, JavaScript & React",
    school: "Top In Town",
    period: "Completed 2025",
    note: "Focused on semantic page structure, DOM manipulation, and building reusable React components.",
  },
  {
    degree: "Frontend Development",
    school: "Netlinks",
    period: "Completed 2025",
    note: "Learned UI/UX fundamentals, responsive layouts, and project collaboration.",
  },
  {
    degree: "High School",
    school: "Graduated",
    period: "2025",
    note: "Developed strong communication, research, and time management skills.",
  },
];

/* ---------- Reusable Components ---------- */

function SectionHeading({ title }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <h2 className="text-lg font-bold uppercase tracking-widest text-cream print:text-black">
        {title}
      </h2>
      <div className="h-px flex-1 bg-line/50 print:bg-gray-300" />
    </div>
  );
}

function TimelineItem({ title, subtitle, period, note, isLast }) {
  return (
    <div className="relative pl-6 pb-6">
      {!isLast && (
        <div className="absolute bottom-0 left-[7px] top-2 w-[2px] bg-line print:bg-gray-300" />
      )}
      <span className="absolute left-0 top-1.5 h-[16px] w-[16px] rounded-full border-2 border-[#EE9096] bg-surface shadow-[0_0_10px_rgba(238,144,150,0.5)] print:border-gray-400 print:shadow-none" />
      
      <h3 className="text-sm font-semibold text-cream print:text-black">{title}</h3>
      <p className="text-xs text-ink-soft print:text-gray-600">{subtitle}</p>
      <p className="mt-1 text-xs font-medium text-[#147CBF]! print:text-black">{period}</p>
      {note && <p className="mt-2 text-xs leading-relaxed text-muted print:text-gray-700">{note}</p>}
    </div>
  );
}

/* ---------- Resume Page ---------- */

export default function Resume() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-bg text-cream py-10 px-4 sm:px-8 transition-colors duration-300 print:bg-white print:text-black print:py-0">
      
      {/* Main Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-4xl rounded-[2rem] border border-line bg-surface p-5 sm:p-8 shadow-[0_0_50px_rgba(238,144,150,0.05)] print:border-none print:shadow-none print:bg-white print:p-0"
      >
        
        {/* Top Window Bar */}
        <div className="mb-8 flex items-center justify-between border-b border-line pb-4 print:border-gray-300">
          <span className="text-sm font-bold uppercase tracking-widest text-cream print:text-black">
            Resume | 2026
          </span>
          <div className="flex gap-2 print:hidden">
            <div className="h-3 w-3 rounded-full bg-line" />
            <div className="h-3 w-3 rounded-full bg-line" />
            <div className="h-3 w-3 rounded-full bg-line" />
          </div>
        </div>

        {/* Profile Section */}
        <div className="mb-10 w-full">
          <div className="mb-5 flex items-center gap-4">
            <span className="rounded-full border border-line px-5 py-2 text-xs font-semibold uppercase tracking-widest text-cream print:border-gray-300 print:text-black">
              Web Developer
            </span>
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-[#147CBF] hover:text-[#147CBF] print:hidden">
              <FiSearch size={18} />
            </button>
          </div>

          <h1 className="mb-4 text-4xl font-extrabold uppercase tracking-tight text-cream sm:text-5xl print:text-black">
            Marwa Hamraz
          </h1>
          
          <p className="mb-6 max-w-3xl text-sm leading-relaxed text-ink-soft print:text-gray-700">
            Passionate Web Developer with a strong foundation in building responsive, user-friendly, and high-performance websites. Skilled in front-end development, with a focus on creating seamless digital experiences and solving complex technical challenges using React and Tailwind CSS.
          </p>

          {/* Contact Links */}
          <div className="flex flex-wrap gap-3">
            <a href="mailto:your.email@example.com" className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-cream transition-colors hover:border-[#EE9096] hover:text-[#EE9096] print:border-gray-300 print:text-black">
              <FiMail className="text-[#EE9096]! print:text-black" size={16} />
              marwaislam313@gmail.com
            </a>
            <a href="https://your-portfolio-link.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-cream transition-colors hover:border-[#147CBF] hover:text-[#147CBF] print:border-gray-300 print:text-black">
              <FiGlobe className="text-[#147CBF]! print:text-black" size={16} />
              your-portfolio-link.com
            </a>
            <a href="https://github.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-cream transition-colors hover:border-[#EE9096] hover:text-[#EE9096] print:border-gray-300 print:text-black">
              <FiGithub className="text-[#EE9096]! print:text-black" size={16} />
              github.com/yourusername
            </a>
            {/* 👇 NEW LINKEDIN LINK */}
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-cream transition-colors hover:border-[#147CBF] hover:text-[#147CBF] print:border-gray-300 print:text-black">
              <FiLinkedin className="text-[#147CBF]! print:text-black" size={16} />
              linkedin.com/in/yourusername
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="rounded-3xl border border-line p-6 sm:p-8 print:border-none print:p-0">
          <div className="grid gap-10 md:grid-cols-2">
            
            {/* Left Column */}
            <div>
              <SectionHeading title="Education" />
              <div className="mb-8">
                {education.map((ed, i) => (
                  <TimelineItem
                    key={ed.degree + i}
                    title={ed.school}
                    subtitle={ed.degree}
                    period={ed.period}
                    note={ed.note}
                    isLast={i === education.length - 1}
                  />
                ))}
              </div>

              <SectionHeading title="Work Experience" />
              <div className="mb-8">
                {experience.map((exp, i) => (
                  <TimelineItem
                    key={exp.role}
                    title={exp.role}
                    subtitle={exp.company}
                    period={exp.period}
                    note={exp.points.join(" ")}
                    isLast={i === experience.length - 1}
                  />
                ))}
              </div>

              <div className="mt-8">
                <SectionHeading title="Skills" />
                <div className="flex flex-wrap gap-2">
                  {softSkills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-line px-4 py-2 text-xs font-medium text-cream transition-colors hover:border-[#EE9096] print:border-gray-300 print:text-black"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div>
              <SectionHeading title="Technical Skills" />
              <ul className="space-y-4">
                {skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#147CBF] bg-surface shadow-[0_0_8px_rgba(20,124,191,0.3)] print:border-gray-400 print:shadow-none">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#147CBF] print:bg-gray-400" />
                    </div>
                    <span className="text-sm font-medium text-cream print:text-black">
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Download Button */}
        <div className="mt-8 flex justify-center print:hidden">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#EE9096] to-[#147CBF] px-8 py-3.5 text-sm font-bold text-white shadow-[0_0_20px_rgba(238,144,150,0.3)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(20,124,191,0.5)]"
          >
            <FiDownload size={18} />
            Download PDF
          </button>
        </div>

      </motion.div>
    </div>
  );
}