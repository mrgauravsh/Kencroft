import { useState } from "react";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Clock, MessageCircle, ArrowRight } from "lucide-react";
import { PageHero } from "../components/site/PageHero";
import { Reveal, Overline } from "../components/site/Reveal";
import { api, formatError } from "../lib/api";
import { CONTACT, IMG } from "../lib/data";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/contact", form);
      toast.success(data.message);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      toast.error(formatError(err.response?.data?.detail));
    } finally { setLoading(false); }
  };

  return (
    <div>
      <PageHero overline="Contact" title="Start your hospitality transformation" image={IMG.process}
        subtitle="Reach out to our consulting team. We respond to every enquiry personally and promptly." />

      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-5 space-y-8">
          <Reveal><Overline>Get in touch</Overline></Reveal>
          <div className="space-y-6">
            {[
              { Icon: Mail, label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
              { Icon: Phone, label: "Phone", value: CONTACT.phone, href: `tel:${CONTACT.phone}` },
              { Icon: MapPin, label: "Office", value: "Global hospitality advisory — remote & on-site engagements worldwide" },
              { Icon: Clock, label: "Working Hours", value: "Mon – Sat · 9:00 AM – 7:00 PM IST" },
            ].map(({ Icon, label, value, href }) => (
              <Reveal key={label}>
                <div className="flex gap-4 border-b border-white/10 pb-6">
                  <span className="w-11 h-11 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0"><Icon size={18} /></span>
                  <div>
                    <div className="text-white/40 text-xs uppercase tracking-wider">{label}</div>
                    {href ? <a href={href} data-testid={`contact-${label.toLowerCase()}`} className="text-white hover:text-[#D4AF37] transition-colors">{value}</a> : <div className="text-white/80 text-sm">{value}</div>}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <a href={`https://wa.me/${CONTACT.phoneRaw}`} target="_blank" rel="noreferrer" data-testid="whatsapp-btn"
              className="inline-flex items-center gap-3 bg-[#0A1120] border border-[#D4AF37]/40 text-white px-6 py-4 hover:border-[#D4AF37] transition-colors w-full justify-center">
              <MessageCircle size={18} className="text-[#D4AF37]" /> Chat on WhatsApp
            </a>
          </Reveal>
        </div>

        <div className="md:col-span-7">
          <Reveal>
            <form onSubmit={submit} data-testid="contact-form" className="bg-[#0A1120] border border-white/10 p-8 md:p-10 space-y-5">
              <h3 className="font-serif-lux text-2xl text-white mb-2">Send us a message</h3>
              <div className="grid sm:grid-cols-2 gap-5">
                <input required placeholder="Full Name" data-testid="contact-name" className="lux-input" value={form.name} onChange={(e) => set("name", e.target.value)} />
                <input required type="email" placeholder="Email Address" data-testid="contact-email-input" className="lux-input" value={form.email} onChange={(e) => set("email", e.target.value)} />
                <input placeholder="Phone Number" data-testid="contact-phone" className="lux-input" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
                <input placeholder="Subject" data-testid="contact-subject" className="lux-input" value={form.subject} onChange={(e) => set("subject", e.target.value)} />
              </div>
              <textarea required rows={5} placeholder="How can we help?" data-testid="contact-message" className="lux-input resize-none" value={form.message} onChange={(e) => set("message", e.target.value)} />
              <button type="submit" disabled={loading} data-testid="contact-submit"
                className="w-full bg-[#D4AF37] text-[#050B14] px-8 py-4 uppercase tracking-wider text-sm font-semibold hover:bg-[#E5C158] transition-colors disabled:opacity-60 inline-flex items-center justify-center gap-2">
                {loading ? "Sending…" : <>Send Message <ArrowRight size={16} /></>}
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        <Reveal>
          <div className="relative h-80 border border-white/10 overflow-hidden bg-[#0A1120] flex items-center justify-center">
            <iframe title="map" src="https://www.openstreetmap.org/export/embed.html?bbox=72.77%2C18.89%2C72.99%2C19.10&layer=mapnik"
              className="w-full h-full opacity-70 grayscale" style={{ border: 0 }} loading="lazy" />
            <div className="absolute inset-0 bg-[#050B14]/30 pointer-events-none" />
          </div>
        </Reveal>
      </section>
    </div>
  );
}
