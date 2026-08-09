import { useState } from "react";
import { Link } from "react-router-dom";
import { Linkedin, Facebook, Instagram, Twitter, Mail, Phone, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { CONTACT } from "../../lib/data";
import { api, formatError } from "../../lib/api";

export function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const subscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const { data } = await api.post("/newsletter", { email });
      toast.success(data.message);
      setEmail("");
    } catch (err) {
      toast.error(formatError(err.response?.data?.detail));
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer data-testid="site-footer" className="bg-[#050B14] border-t border-white/10 pt-24 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16">
          <div className="md:col-span-4">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <span className="w-9 h-9 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] font-serif-lux text-xl">K</span>
              <span className="flex flex-col leading-none">
                <span className="font-serif-lux text-xl text-white">Kencroft</span>
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#D4AF37]">Strategy Group</span>
              </span>
            </Link>
            <p className="text-white/55 text-sm leading-relaxed max-w-xs">
              Strategy for Growth. Kencroft Strategy Group partners with the world's finest hotels, resorts and hospitality groups to elevate profitability, operations and guest experience.
            </p>
            <div className="flex gap-4 mt-6">
              {[Linkedin, Facebook, Instagram, Twitter].map((Icon, i) => (
                <a key={i} href="#" aria-label="social" data-testid={`footer-social-${i}`}
                   className="w-10 h-10 border border-white/15 flex items-center justify-center text-white/60 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-white text-sm uppercase tracking-wider mb-5">Quick Links</h4>
            <ul className="space-y-3 text-sm text-white/55">
              {[["About","/about"],["Services","/services"],["Industries","/industries"],["Process","/process"],["Insights","/blog"],["Contact","/contact"]].map(([t,u]) => (
                <li key={u}><Link to={u} className="hover:text-[#D4AF37] transition-colors">{t}</Link></li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-white text-sm uppercase tracking-wider mb-5">Contact</h4>
            <ul className="space-y-3 text-sm text-white/55">
              <li><a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors"><Mail size={15} className="text-[#D4AF37]" />{CONTACT.email}</a></li>
              <li><a href={`tel:${CONTACT.phone}`} className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors"><Phone size={15} className="text-[#D4AF37]" />{CONTACT.phone}</a></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-white text-sm uppercase tracking-wider mb-5">Kencroft Insights</h4>
            <p className="text-white/55 text-sm mb-4">Executive perspectives on hospitality strategy, delivered occasionally.</p>
            <form onSubmit={subscribe} className="flex" data-testid="newsletter-form">
              <input
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email" data-testid="newsletter-input"
                className="lux-input flex-1 !py-3 text-sm"
              />
              <button type="submit" disabled={loading} data-testid="newsletter-submit"
                      className="bg-[#D4AF37] text-[#050B14] px-4 hover:bg-[#E5C158] transition-colors disabled:opacity-60">
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} Kencroft Strategy Group. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-[#D4AF37] transition-colors">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
