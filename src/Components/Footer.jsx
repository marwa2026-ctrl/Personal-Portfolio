import { Link } from "react-router";
import { FiGithub, FiLinkedin, FiMail, FiUser } from "react-icons/fi"; // 👈 Changed to FiUser
import { navItems, site } from "../data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface transition-colors duration-300">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-xl font-semibold text-cream">{site.name}</p>
          <p className="mt-2 text-sm text-muted!">
            {site.role} · {site.location}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-neon-pink!">
            Navigate
          </p>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-sm text-neon-blue! transition-all duration-300 hover:text-neon-pink!"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-neon-pink!">
            Connect
          </p>
          <div className="mt-3 flex gap-4 text-xl">
            <a href={`mailto:${site.email}`} aria-label="Email" className="text-neon-blue! transition-colors hover:text-neon-pink!">
              <FiMail />
            </a>
            <a href="https://github.com/" aria-label="GitHub" className="text-neon-blue! transition-colors hover:text-neon-pink!">
              <FiGithub />
            </a>
            <a href="https://www.linkedin.com/" aria-label="LinkedIn" className="text-neon-blue! transition-colors hover:text-neon-pink!">
              <FiLinkedin />
            </a>
            
            {/* 👤 USER/ADMIN LOGIN ICON */}
            <Link 
              to="/settings" 
              aria-label="Settings" 
              className="text-neon-blue! transition-colors hover:text-neon-pink!"
            >
              <FiUser />
            </Link>
          </div>
          <p className="mt-4 text-xs text-muted!">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}