import { useState } from "react";
import { Link } from "react-router-dom";
import { PageHero } from "../components/site/PageHero";
import { Reveal } from "../components/site/Reveal";
import { POSTS, IMG } from "../lib/data";

export default function Blog() {
  const cats = ["All", ...Array.from(new Set(POSTS.map((p) => p.category)))];
  const [cat, setCat] = useState("All");
  const posts = cat === "All" ? POSTS : POSTS.filter((p) => p.category === cat);
  const [feat, ...rest] = posts;

  return (
    <div>
      <PageHero overline="Kencroft Insights" title="Perspectives on hospitality strategy" image={IMG.about}
        subtitle="Executive thinking on revenue, operations, guest experience and the future of hospitality." />

      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="flex flex-wrap gap-3" data-testid="blog-filters">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} data-testid={`blog-filter-${c.toLowerCase()}`}
              className={`text-xs uppercase tracking-wider px-4 py-2 border transition-colors ${
                cat === c ? "bg-[#D4AF37] text-[#050B14] border-[#D4AF37]" : "border-white/15 text-white/60 hover:border-[#D4AF37]/60"
              }`}>{c}</button>
          ))}
        </div>
      </section>

      {feat && (
        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-12">
          <Reveal>
            <Link to={`/blog/${feat.slug}`} className="group grid md:grid-cols-2 gap-10 items-center border-b border-white/10 pb-16">
              <div className="overflow-hidden h-72 md:h-96">
                <img src={feat.image} alt={feat.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div>
                <span className="text-[#D4AF37] text-xs uppercase tracking-wider">Featured · {feat.category} · {feat.read}</span>
                <h2 className="font-serif-lux font-light text-white text-3xl md:text-5xl tracking-tight mt-4 group-hover:text-[#D4AF37] transition-colors leading-tight">{feat.title}</h2>
                <p className="text-white/55 mt-6 leading-relaxed">{feat.excerpt}</p>
                <span className="text-white/40 text-sm mt-6 block">{feat.date}</span>
              </div>
            </Link>
          </Reveal>
        </section>
      )}

      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        <div className="grid md:grid-cols-3 gap-10">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.08}>
              <Link to={`/blog/${p.slug}`} className="group block">
                <div className="overflow-hidden mb-6 h-56"><img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /></div>
                <span className="text-[#D4AF37] text-xs uppercase tracking-wider">{p.category} · {p.read}</span>
                <h3 className="font-serif-lux text-2xl text-white mt-3 group-hover:text-[#D4AF37] transition-colors leading-tight">{p.title}</h3>
                <p className="text-white/50 text-sm mt-3 leading-relaxed">{p.excerpt}</p>
                <span className="text-white/40 text-xs mt-4 block">{p.date}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
