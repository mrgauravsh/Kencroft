import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PageHero } from "../components/site/PageHero";
import { Reveal, Overline } from "../components/site/Reveal";
import { Counter } from "../components/site/Counter";
import { IMG, STATS, WHY } from "../lib/data";

const CHAPTERS = [
  { n: "01", title: "Our Purpose", body: "Kencroft Strategy Group exists to help exceptional hospitality businesses realise their full potential. We believe great properties deserve strategy that is as refined as the experiences they create." },
  { n: "02", title: "Our Approach", body: "We are specialists, not generalists. Every consultant brings operational hotel experience, so our recommendations are grounded in the realities of running a property — and always tied to measurable outcomes." },
  { n: "03", title: "Our Promise", body: "We do not hand over a deck and disappear. We stay through implementation, training your teams and embedding change until performance improves and compounds." },
];

export default function About() {
  return (
    <div>
      <PageHero overline="About Kencroft Strategy Group" title="Where hospitality meets strategy" image={IMG.meeting}
        subtitle="We partner with hotels, resorts and hospitality groups to improve profitability, operational efficiency, guest experience, financial performance and long-term growth." />

      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28 grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-6">
          <Reveal><img src={IMG.about2} alt="Executive consulting" className="w-full h-[520px] object-cover" /></Reveal>
        </div>
        <div className="md:col-span-6">
          <Reveal><Overline>Our Ethos</Overline></Reveal>
          <Reveal delay={0.1}><h2 className="font-serif-lux font-light text-white text-3xl md:text-4xl tracking-tight mt-6 leading-tight">Strategy for growth, engineered for hospitality.</h2></Reveal>
          <Reveal delay={0.2}><p className="text-white/60 mt-6 leading-relaxed">From five-star flagships to boutique retreats, we bring the rigour of world-class management consulting to an industry we know intimately. The result is strategy that is bold in ambition and precise in execution.</p></Reveal>
        </div>
      </section>

      <section className="bg-[#0A1120] border-y border-white/10 py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6 md:px-12 space-y-16">
          {CHAPTERS.map((c) => (
            <Reveal key={c.n}>
              <div className="grid md:grid-cols-12 gap-8 items-start border-b border-white/10 pb-16 last:border-0 last:pb-0">
                <div className="md:col-span-3"><span className="font-serif-lux text-6xl text-[#D4AF37]/40">{c.n}</span></div>
                <div className="md:col-span-9">
                  <h3 className="font-serif-lux text-3xl text-white mb-4">{c.title}</h3>
                  <p className="text-white/60 leading-relaxed text-lg">{c.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-y border-white/10 py-12">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} className="text-center">
              <div className="font-serif-lux text-4xl md:text-5xl text-[#D4AF37]"><Counter to={s.value} suffix={s.suffix} /></div>
              <div className="text-white/50 text-xs uppercase tracking-wider mt-2">{s.label}</div>
            </Reveal>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={(i % 3) * 0.08}>
              <div className="border border-white/10 p-8 hover:border-[#D4AF37]/50 transition-colors duration-500 h-full">
                <h3 className="text-white text-xl mb-3 font-serif-lux">{w.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{w.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <div className="mt-16 text-center">
            <Link to="/schedule" className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#050B14] px-8 py-4 uppercase tracking-wider text-sm font-semibold hover:bg-[#E5C158] transition-colors">
              Schedule a Consultation <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
