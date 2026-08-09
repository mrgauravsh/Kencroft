import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PageHero } from "../components/site/PageHero";
import { Reveal } from "../components/site/Reveal";
import { INDUSTRIES, IMG } from "../lib/data";

export default function Industries() {
  return (
    <div>
      <PageHero overline="Industries We Serve" title="Expertise across every hospitality sector" image={IMG.hero}
        subtitle="From luxury flagships to hospitality investors, we tailor our strategy to the distinct dynamics of each segment we serve." />

      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={ind.title} delay={(i % 3) * 0.08}>
              <div className="group relative h-96 overflow-hidden border border-white/10">
                <img src={ind.image} alt={ind.title} className="absolute inset-0 w-full h-full object-cover opacity-55 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-[#050B14]/40 to-transparent" />
                <div className="absolute bottom-0 p-8">
                  <h3 className="font-serif-lux text-2xl text-white">{ind.title}</h3>
                  <p className="text-white/60 text-sm mt-2 leading-relaxed">{ind.desc}</p>
                  <span className="inline-flex items-center gap-2 text-[#D4AF37] text-xs uppercase tracking-wider mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Discuss your project <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-[#0A1120] border-t border-white/10 py-20 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-serif-lux font-light text-white text-3xl md:text-4xl tracking-tight">A strategy shaped for your segment</h2>
          <Link to="/schedule" className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#050B14] px-8 py-4 uppercase tracking-wider text-sm font-semibold hover:bg-[#E5C158] transition-colors mt-8">
            Schedule a Consultation <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
