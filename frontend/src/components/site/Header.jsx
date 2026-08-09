import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail } from "lucide-react";
import { CONTACT } from "../../lib/data";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/industries", label: "Industries" },
  { to: "/process", label: "Process" },
  { to: "/blog", label: "Insights" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [loc.pathname]);

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-[#050B14]/80 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-20">
        <Link to="/" data-testid="logo-link" className="flex items-center gap-3 group">
          <span className="w-9 h-9 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] font-serif-lux text-xl">K</span>
          <span className="flex flex-col leading-none">
            <span className="font-serif-lux text-xl text-white tracking-wide">Kencroft</span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#D4AF37]">Strategy Group</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              data-testid={`nav-${l.label.toLowerCase()}`}
              className={({ isActive }) =>
                `relative text-sm tracking-wide transition-colors duration-300 group ${
                  isActive ? "text-[#D4AF37]" : "text-white/80 hover:text-white"
                }`
              }
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
            </NavLink>
          ))}
        </nav>

        <Link
          to="/schedule"
          data-testid="header-cta"
          className="hidden lg:inline-flex bg-[#D4AF37] text-[#050B14] px-6 py-3 uppercase tracking-wider text-xs font-semibold hover:bg-[#E5C158] transition-colors"
        >
          Schedule a Consultation
        </Link>

        <button
          data-testid="mobile-menu-toggle"
          className="lg:hidden text-white"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#050B14] border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {LINKS.map((l) => (
                <NavLink key={l.to} to={l.to} className="text-white/85 text-lg font-serif-lux">
                  {l.label}
                </NavLink>
              ))}
              <div className="pt-4 border-t border-white/10 flex flex-col gap-3 text-sm text-white/70">
                <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2"><Mail size={15} className="text-[#D4AF37]" />{CONTACT.email}</a>
                <a href={`tel:${CONTACT.phone}`} className="flex items-center gap-2"><Phone size={15} className="text-[#D4AF37]" />{CONTACT.phone}</a>
              </div>
              <Link to="/schedule" className="bg-[#D4AF37] text-[#050B14] px-6 py-3 uppercase tracking-wider text-xs font-semibold text-center mt-2">
                Schedule a Consultation
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
