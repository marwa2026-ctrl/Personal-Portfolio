import { motion } from "motion/react";
import PageTransition from "../components/PageTransition";
import SectionHeading from "../components/SectionHeading";
import { education } from "../data/portfolio";

export default function Education() {
  // 1. Automatically find the Netlinks course and update its status to Completed
  const processedItems = education.items.map((item) => {
    const isNetlinks =
      item.title?.toLowerCase().includes("netlinks") ||
      item.description?.toLowerCase().includes("netlinks") ||
      (item.tags && item.tags.some((t) => t.toLowerCase().includes("netlinks")));

    return {
      ...item,
      status: isNetlinks ? "Completed" : item.status,
      type: isNetlinks ? "Completed" : item.type,
    };
  });

  // 2. Add your new courses here!
  const newItems = [
    {
      number: "upskill",
      date: "Current",
      type: "In Progress",
      title: "Backend Development Class",
      description: "Currently studying backend development at Upskill Center.",
      tags: ["Backend", "Server", "Database"],
      status: "In Progress",
    },
    {
      number: "code-to-inspire",
      date: "Current",
      type: "Self Study",
      title: "Code to Inspire Website",
      description: "Self-studying web development through Code to Inspire.",
      tags: ["Self Study", "Web Development"],
      status: "In Progress",
    },
    {
      number: "codomax",
      date: "Current",
      type: "Self Study",
      title: "Codomax",
      description: "Self-studying programming through Codomax.",
      tags: ["Self Study", "Programming"],
      status: "In Progress",
    },
  ];

  // Combine your original data with the new items
  const defaultItems = [...processedItems, ...newItems];

  // 👇 3. Check LocalStorage for custom items and filter out hidden ones
  const savedEdu = JSON.parse(localStorage.getItem("custom-education") || "null");
  let displayItems = defaultItems;

  if (savedEdu && Array.isArray(savedEdu) && savedEdu.length > 0) {
    // Only show items that are NOT marked as visible: false
    const visibleEdu = savedEdu.filter((item) => item.visible !== false);

    displayItems = visibleEdu.map((item, i) => ({
      number: item.id || `custom-${i}`,
      date: item.year || "Current",
      type: "Course",
      title: item.title,
      description: `${item.sub ? item.sub + " — " : ""}${item.desc || ""}`,
      tags: [],
      status: "Completed",
    }));
  }

  return (
    <PageTransition>
      <section className="mx-auto max-w-4xl px-6 py-20 transition-colors duration-300">
        <SectionHeading
          eyebrow={education.eyebrow}
          title={education.heading}
          intro={education.intro}
        />

        {/* Changed the timeline line to a subtle Blue glow */}
        <div className="relative border-l border-[#147CBF]/30 pl-8">
          {displayItems.map((item, i) => (
            <motion.div
              key={item.number || `edu-${i}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative mb-10 last:mb-0"
            >
              {/* 🌟 The glowing Pink timeline dot */}
              <span className="absolute -left-[41px] flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#EE9096] bg-bg shadow-[0_0_12px_rgba(238,144,150,0.8)]" />
              
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="font-bold uppercase tracking-widest text-[#EE9096]!">
                  {item.date}
                </span>
                <span className="text-muted">·</span>
                <span className="uppercase tracking-widest text-[#147CBF]! font-semibold">
                  {item.type}
                </span>
              </div>
              
              <h3 className="mt-2 font-display text-xl font-semibold text-cream">
                {item.title}
              </h3>
              
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {item.description}
              </p>
              
              {item.tags && item.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-line bg-surface-2 px-2.5 py-0.5 text-xs text-cream transition-colors hover:border-[#EE9096] hover:text-[#EE9096]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
              
              {/* Status Badge - Glows Blue if In Progress, Pink if Completed */}
              <span className={`mt-3 inline-block rounded-full px-2.5 py-0.5 text-xs font-bold border ${
                item.status.toLowerCase().includes("progress")
                  ? "bg-[#147CBF]/10 text-[#147CBF]! border-[#147CBF]/30"
                  : "bg-[#EE9096]/10 text-[#EE9096]! border-[#EE9096]/30"
              }`}>
                {item.status}
              </span>
            </motion.div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}