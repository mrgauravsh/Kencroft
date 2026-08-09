import { useState } from "react";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { api, formatError } from "../../lib/api";
import { PROPERTY_TYPES, TIMELINES, SERVICE_OPTIONS } from "../../lib/data";

const empty = {
  full_name: "", company_name: "", business_name: "", job_title: "",
  email: "", phone: "", city: "", property_type: "", services: [],
  timeline: "", message: "", consent: false,
};

export function LeadForm() {
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const toggleService = (s) =>
    setForm((f) => ({ ...f, services: f.services.includes(s) ? f.services.filter((x) => x !== s) : [...f.services, s] }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.consent) { toast.error("Please agree to be contacted by Kencroft Strategy Group."); return; }
    setLoading(true);
    try {
      await api.post("/enquiries", form);
      setDone(true);
    } catch (err) {
      toast.error(formatError(err.response?.data?.detail));
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <motion.div
        data-testid="lead-success"
        initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-[#0A1120] border border-[#D4AF37]/40 p-12 md:p-16 text-center"
      >
        <CheckCircle2 className="text-[#D4AF37] mx-auto mb-6" size={54} />
        <h3 className="font-serif-lux text-3xl md:text-4xl text-white mb-4">Thank you.</h3>
        <p className="text-white/60 max-w-md mx-auto">Our consulting team will contact you shortly to discuss your hotel's growth.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} data-testid="lead-form" className="bg-[#0A1120] border border-white/10 p-8 md:p-12 space-y-5">
      <div className="grid md:grid-cols-2 gap-5">
        <Field label="Full Name *"><input required data-testid="lead-full-name" className="lux-input" value={form.full_name} onChange={(e) => set("full_name", e.target.value)} /></Field>
        <Field label="Company Name"><input data-testid="lead-company" className="lux-input" value={form.company_name} onChange={(e) => set("company_name", e.target.value)} /></Field>
        <Field label="Hotel / Business Name"><input data-testid="lead-business" className="lux-input" value={form.business_name} onChange={(e) => set("business_name", e.target.value)} /></Field>
        <Field label="Job Title"><input data-testid="lead-title" className="lux-input" value={form.job_title} onChange={(e) => set("job_title", e.target.value)} /></Field>
        <Field label="Email Address *"><input required type="email" data-testid="lead-email" className="lux-input" value={form.email} onChange={(e) => set("email", e.target.value)} /></Field>
        <Field label="Phone Number *"><input required data-testid="lead-phone" className="lux-input" value={form.phone} onChange={(e) => set("phone", e.target.value)} /></Field>
        <Field label="City"><input data-testid="lead-city" className="lux-input" value={form.city} onChange={(e) => set("city", e.target.value)} /></Field>
        <Field label="Type of Property">
          <select data-testid="lead-property" className="lux-input" value={form.property_type} onChange={(e) => set("property_type", e.target.value)}>
            <option value="">Select…</option>
            {PROPERTY_TYPES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </Field>
      </div>

      <Field label="Services Interested In">
        <div className="flex flex-wrap gap-2" data-testid="lead-services">
          {SERVICE_OPTIONS.map((s) => (
            <button type="button" key={s} onClick={() => toggleService(s)}
              className={`text-xs px-3 py-2 border transition-colors ${
                form.services.includes(s) ? "bg-[#D4AF37] text-[#050B14] border-[#D4AF37]" : "border-white/15 text-white/70 hover:border-[#D4AF37]/60"
              }`}>
              {s}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Estimated Project Timeline">
        <select data-testid="lead-timeline" className="lux-input" value={form.timeline} onChange={(e) => set("timeline", e.target.value)}>
          <option value="">Select…</option>
          {TIMELINES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </Field>

      <Field label="Message / Requirements">
        <textarea rows={4} data-testid="lead-message" className="lux-input resize-none" value={form.message} onChange={(e) => set("message", e.target.value)} />
      </Field>

      <label className="flex items-start gap-3 text-sm text-white/65 cursor-pointer">
        <input type="checkbox" data-testid="lead-consent" checked={form.consent} onChange={(e) => set("consent", e.target.checked)}
               className="mt-1 accent-[#D4AF37] w-4 h-4" />
        <span>I agree to be contacted by Kencroft Strategy Group.</span>
      </label>

      <button type="submit" disabled={loading} data-testid="lead-submit"
        className="w-full bg-[#D4AF37] text-[#050B14] px-8 py-4 uppercase tracking-wider text-sm font-semibold hover:bg-[#E5C158] transition-colors disabled:opacity-60">
        {loading ? "Sending…" : "Request a Consultation"}
      </button>
    </form>
  );
}

const Field = ({ label, children }) => (
  <label className="block">
    <span className="block text-xs uppercase tracking-wider text-white/50 mb-2">{label}</span>
    {children}
  </label>
);
