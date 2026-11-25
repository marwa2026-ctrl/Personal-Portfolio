import { Link } from "react-router";
import { FiGithub, FiLinkedin, FiMail, FiUser } from "react-icons/fi"; // 👈 Changed to FiUser
import { navItems, site } from "../data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface transition-colors duration-300">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-xl font-semibold text-cream">{site.name}</p>
          <p className="mt-2 text-sm text-[#71717a]!">
            {site.role} · {site.location}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#EE9096]!">
            Navigate
          </p>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-sm text-[#147CBF]! transition-all duration-300 hover:text-[#EE9096]!"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#EE9096]!">
            Connect
          </p>
          <div className="mt-3 flex gap-4 text-xl">
            <a href={`mailto:${site.email}`} aria-label="Email" className="text-[#147CBF]! transition-colors hover:text-[#EE9096]!">
              <FiMail />
            </a>
            <a href="https://github.com/" aria-label="GitHub" className="text-[#147CBF]! transition-colors hover:text-[#EE9096]!">
              <FiGithub />
            </a>
            <a href="https://www.linkedin.com/" aria-label="LinkedIn" className="text-[#147CBF]! transition-colors hover:text-[#EE9096]!">
              <FiLinkedin />
            </a>
            
            {/* 👤 USER/ADMIN LOGIN ICON */}
            <Link 
              to="/settings" 
              aria-label="Settings" 
              className="text-[#147CBF]! transition-colors hover:text-[#EE9096]!"
            >
              <FiUser />
            </Link>
          </div>
          <p className="mt-4 text-xs text-[#71717a]!">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}