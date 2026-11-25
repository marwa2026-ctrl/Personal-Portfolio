import { useState } from "react";
import { NavLink, Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  FiMenu,
  FiX,
  FiMoon,
  FiSun,
  FiHome,
  FiUser,
  FiBriefcase,
  FiFolder,
  FiBookOpen,
  FiCode,
  FiMail,
  FiHelpCircle,
  FiAward,
  FiHeart,
  FiStar,
  FiLayers,
  FiImage,
  FiMessageCircle,
  FiSettings,
  FiCompass,
  FiFileText,
} from "react-icons/fi";

import { navItems, site } from "../data/portfolio";
import { useTheme } from "../context/ThemeContext";

const navIcons = {
  Home: FiHome,
  About: FiUser,
  Services: FiBriefcase,
  Projects: FiFolder,
  "My Projects": FiFolder,
  Skills: FiCode,
  Skill: FiCode,
  Blog: FiBookOpen,
  Contact: FiMail,
  Help: FiHelpCircle,
  Education: FiAward,
  Favorites: FiHeart,
  "My Work": FiLayers,
  Portfolio: FiImage,
  Messages: FiMessageCircle,
  Settings: FiSettings,
  Explore: FiCompass,
  Certificates: FiStar,
  Resume: FiFileText,
};

// ✨ Reusable navigation icon with hover rotation
function NavIcon({ item, isHovered, size = 16, className = "" }) {
  const Icon = navIcons[item.label] || FiCompass;

  return (
    <motion.span
      className={`inline-flex shrink-0 items-center justify-center transition-colors duration-300 ${className}`}
      animate={{
        rotate: isHovered ? 360 : 0,
      }}
      transition={{
        duration: 0.6,
        ease: "easeInOut",
      }}
    >
      <Icon size={size} />
    </motion.span>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b border-line/20 bg-bg/80 text-cream backdrop-blur-xl transition-colors duration-300"
    >
      {/* ✨ Glow line at the bottom */}
      <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#EE9096]/50 to-transparent" />

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        
        {/* 💗 LOGO */}
        <Link
          to="/"
          onClick={closeMenu}
          className="group relative text-xl font-bold tracking-tight sm:text-2xl"
        >
          <span className="bg-gradient-to-r from-[#EE9096] to-[#147CBF] bg-[length:200%_auto] bg-clip-text text-transparent transition-all duration-500 group-hover:bg-[position:100%_center] drop-shadow-[0_0_10px_rgba(238,144,150,0.4)] group-hover:drop-shadow-[0_0_15px_rgba(20,124,191,0.6)]">
            {site.name}
          </span>
        </Link>

        {/* ✨ Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onMouseEnter={() => setHoveredLink(item.path)}
              onMouseLeave={() => setHoveredLink(null)}
              className="group inline-flex items-center gap-2 text-sm font-medium transition-all duration-300"
            >
              {({ isActive }) => (
                <>
                  {/* Icon: Solid color so it never disappears */}
                  <NavIcon
                    item={item}
                    isHovered={hoveredLink === item.path}
                    className={
                      isActive 
                        ? "text-[#147CBF]" 
                        : "text-muted group-hover:text-[#EE9096]"
                    }
                  />
                  {/* Text: Gradient applied here */}
                  <span
                    className={`transition-all duration-300 ${
                      isActive
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-[#EE9096] to-[#147CBF] font-bold drop-shadow-[0_0_8px_rgba(238,144,150,0.3)]"
                        : "text-muted group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#EE9096] group-hover:to-[#147CBF]"
                    }`}
                  >
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}

          {/* ☀️ Desktop Theme Toggle */}
          <div className="hidden items-center md:flex">
            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-cream transition-all duration-300 hover:border-[#147CBF] hover:text-[#147CBF] hover:bg-surface-2 hover:shadow-[0_0_15px_rgba(20,124,191,0.3)]"
            >
              {isDark ? <FiSun size={19} /> : <FiMoon size={19} />}
            </button>
          </div>
        </div>

        {/* 📱 Mobile Theme and Menu Buttons */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-cream transition-all duration-300 hover:border-[#147CBF] hover:text-[#147CBF] hover:bg-surface-2 hover:shadow-[0_0_15px_rgba(20,124,191,0.3)]"
          >
            {isDark ? <FiSun size={19} /> : <FiMoon size={19} />}
          </button>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-cream transition-all duration-300 hover:border-[#EE9096] hover:text-[#EE9096] hover:bg-surface-2 hover:shadow-[0_0_15px_rgba(238,144,150,0.3)]"
          >
            {isMenuOpen ? <FiX size={21} /> : <FiMenu size={21} />}
          </button>
        </div>
      </nav>

      {/* 💕 Animated Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-line/20 bg-bg md:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4 sm:px-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  onMouseEnter={() => setHoveredLink(item.path)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-surface-2 border-l-2 border-[#147CBF]"
                        : "text-muted hover:bg-surface border-l-2 border-transparent"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* Icon: Solid color */}
                      <NavIcon
                        item={item}
                        size={17}
                        isHovered={hoveredLink === item.path}
                        className={
                          isActive 
                            ? "text-[#147CBF]" 
                            : "text-muted group-hover:text-[#EE9096]"
                        }
                      />
                      {/* Text: Gradient */}
                      <span
                        className={`transition-all duration-300 ${
                          isActive
                            ? "text-transparent bg-clip-text bg-gradient-to-r from-[#EE9096] to-[#147CBF] font-bold"
                            : "group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#EE9096] group-hover:to-[#147CBF]"
                        }`}
                      >
                        {item.label}
                      </span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}