import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Mail, Phone, Inbox, MessageSquare, Users, FileText, CalendarDays, Clock } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../lib/api";

export default function AdminDashboard() {
  const { logout } = useAuth();
  const nav = useNavigate();
  const [data, setData] = useState(null);
  const [tab, setTab] = useState("enquiry");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    api.get("/admin/leads")
      .then((r) => setData(r.data))
      .catch(() => nav("/admin/login"));
  }, [nav]);

  if (!data) return <div className="min-h-screen bg-[#050B14] flex items-center justify-center text-white/50">Loading…</div>;

  const leads = data.leads.filter((l) => (tab === "newsletter" ? false : l.type === tab));
  const stats = [
    { icon: Inbox, label: "Total Leads", value: data.stats.total },
    { icon: FileText, label: "Enquiries", value: data.stats.enquiries },
    { icon: MessageSquare, label: "Contacts", value: data.stats.contacts },
    { icon: CalendarDays, label: "Bookings", value: data.stats.bookings ?? 0 },
    { icon: Users, label: "Subscribers", value: data.stats.subscribers },
  ];

  return (
    <div className="min-h-screen bg-[#050B14] text-white">
      <header className="border-b border-white/10 bg-[#0A1120]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] font-serif-lux">K</span>
            <span className="font-serif-lux text-lg">Kencroft Admin</span>
          </div>
          <button onClick={() => { logout(); nav("/admin/login"); }} data-testid="admin-logout"
            className="flex items-center gap-2 text-white/60 hover:text-[#D4AF37] text-sm transition-colors"><LogOut size={16} /> Sign Out</button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
        <h1 className="font-serif-lux text-3xl mb-8">Lead Management</h1>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="border border-white/10 bg-[#0A1120] p-6">
                <Icon className="text-[#D4AF37] mb-3" size={22} />
                <div className="text-3xl font-serif-lux">{s.value}</div>
                <div className="text-white/40 text-xs uppercase tracking-wider mt-1">{s.label}</div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-2 mb-6">
          {[["enquiry", "Enquiries"], ["contact", "Contacts"], ["booking", "Bookings"], ["newsletter", "Newsletter"]].map(([k, l]) => (
            <button key={k} onClick={() => { setTab(k); setSelected(null); }} data-testid={`admin-tab-${k}`}
              className={`px-4 py-2 text-xs uppercase tracking-wider border transition-colors ${
                tab === k ? "bg-[#D4AF37] text-[#050B14] border-[#D4AF37]" : "border-white/15 text-white/60 hover:border-[#D4AF37]/50"
              }`}>{l}</button>
          ))}
        </div>

        {tab === "newsletter" ? (
          <div className="border border-white/10 bg-[#0A1120]" data-testid="admin-newsletter-list">
            {data.newsletter.length === 0 ? <p className="p-8 text-white/40">No subscribers yet.</p> :
              data.newsletter.map((n) => (
                <div key={n.id} className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                  <span className="text-white/80 flex items-center gap-2"><Mail size={14} className="text-[#D4AF37]" />{n.email}</span>
                  <span className="text-white/30 text-xs">{new Date(n.created_at).toLocaleDateString()}</span>
                </div>
              ))}
          </div>
        ) : tab === "booking" ? (
          <div className="border border-white/10 bg-[#0A1120]" data-testid="admin-bookings-list">
            {(data.bookings || []).length === 0 ? <p className="p-8 text-white/40">No bookings yet.</p> :
              data.bookings.map((b) => (
                <div key={b.id} className="px-6 py-5 border-b border-white/5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-white font-medium">{b.full_name}</span>
                    <span className="flex items-center gap-4 text-sm text-[#D4AF37]">
                      <span className="flex items-center gap-1.5"><CalendarDays size={14} />{b.date}</span>
                      <span className="flex items-center gap-1.5"><Clock size={14} />{b.time} IST</span>
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-white/55">
                    <a href={`mailto:${b.email}`} className="flex items-center gap-1.5 hover:text-[#D4AF37]"><Mail size={13} />{b.email}</a>
                    <a href={`tel:${b.phone}`} className="flex items-center gap-1.5 hover:text-[#D4AF37]"><Phone size={13} />{b.phone}</a>
                    {b.company_name && <span>{b.company_name}</span>}
                  </div>
                  {b.topic && <p className="text-white/70 text-sm mt-2">{b.topic}</p>}
                </div>
              ))}
          </div>
        ) : (
          <div className="grid lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2 border border-white/10 bg-[#0A1120] max-h-[600px] overflow-y-auto" data-testid="admin-leads-list">
              {leads.length === 0 ? <p className="p-8 text-white/40">No {tab} leads yet.</p> :
                leads.map((l) => (
                  <button key={l.id} onClick={() => setSelected(l)}
                    className={`w-full text-left px-5 py-4 border-b border-white/5 hover:bg-white/5 transition-colors ${selected?.id === l.id ? "bg-white/5 border-l-2 border-l-[#D4AF37]" : ""}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">{l.full_name || l.name}</span>
                      <span className="text-white/30 text-xs">{new Date(l.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="text-white/45 text-sm mt-1 truncate">{l.business_name || l.subject || l.email}</div>
                  </button>
                ))}
            </div>
            <div className="lg:col-span-3 border border-white/10 bg-[#0A1120] p-8" data-testid="admin-lead-detail">
              {!selected ? <p className="text-white/40">Select a lead to view details.</p> : (
                <div className="space-y-4">
                  <h3 className="font-serif-lux text-2xl">{selected.full_name || selected.name}</h3>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <a href={`mailto:${selected.email}`} className="flex items-center gap-2 text-[#D4AF37]"><Mail size={14} />{selected.email}</a>
                    {selected.phone && <a href={`tel:${selected.phone}`} className="flex items-center gap-2 text-[#D4AF37]"><Phone size={14} />{selected.phone}</a>}
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10 text-sm">
                    {Object.entries({
                      Company: selected.company_name, Business: selected.business_name, "Job Title": selected.job_title,
                      City: selected.city, Property: selected.property_type, Timeline: selected.timeline, Subject: selected.subject,
                    }).filter(([, v]) => v).map(([k, v]) => (
                      <div key={k}><div className="text-white/40 text-xs uppercase tracking-wider">{k}</div><div className="text-white/85">{v}</div></div>
                    ))}
                  </div>
                  {selected.services?.length > 0 && (
                    <div className="pt-2"><div className="text-white/40 text-xs uppercase tracking-wider mb-2">Services Interested In</div>
                      <div className="flex flex-wrap gap-2">{selected.services.map((s) => <span key={s} className="text-xs px-3 py-1 border border-[#D4AF37]/40 text-[#D4AF37]">{s}</span>)}</div></div>
                  )}
                  {selected.message && <div className="pt-2"><div className="text-white/40 text-xs uppercase tracking-wider mb-1">Message</div><p className="text-white/75 leading-relaxed">{selected.message}</p></div>}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
