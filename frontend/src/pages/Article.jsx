import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "../components/site/Reveal";
import { POSTS } from "../lib/data";

export default function Article() {
  const { slug } = useParams();
  const post = POSTS.find((p) => p.slug === slug) || POSTS[0];
  const more = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div>
      <section className="relative pt-40 pb-16 md:pt-52 md:pb-20 overflow-hidden">
        <img src={post.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050B14]/70 to-[#050B14]" />
        <div className="relative max-w-3xl mx-auto px-6 md:px-12">
          <Link to="/blog" className="inline-flex items-center gap-2 text-[#D4AF37] text-xs uppercase tracking-wider mb-8"><ArrowLeft size={14} /> All Insights</Link>
          <span className="text-[#D4AF37] text-xs uppercase tracking-wider block">{post.category} · {post.read} · {post.date}</span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="font-serif-lux font-light text-white text-4xl md:text-6xl tracking-tight mt-5 leading-[1]">{post.title}</motion.h1>
        </div>
      </section>

      <article className="max-w-2xl mx-auto px-6 md:px-12 pb-24">
        <div className="prose-lux space-y-6 text-white/70 leading-relaxed text-lg">
          <p className="first-letter:font-serif-lux first-letter:text-7xl first-letter:text-[#D4AF37] first-letter:float-left first-letter:mr-3 first-letter:leading-none">
            {post.excerpt} In an industry defined by service and margin alike, the properties that thrive are those that treat strategy as a discipline rather than an afterthought.
          </p>
          <p>Leading hospitality businesses no longer separate operational excellence from commercial performance. They recognise that every guest interaction, every cost line, and every technology decision compounds into the property's long-term position.</p>
          <h2 className="font-serif-lux text-3xl text-white pt-4">The strategic imperative</h2>
          <p>At Kencroft Strategy Group, our engagements consistently reveal the same truth: the gap between good and great is rarely a single dramatic decision. It is the accumulation of disciplined choices — pricing calibrated to real demand, SOPs that scale, teams empowered to deliver, and data that informs rather than overwhelms.</p>
          <blockquote className="border-l-2 border-[#D4AF37] pl-6 italic font-serif-lux text-2xl text-white/90 my-8">
            "Strategy without execution is decoration. We stay until the numbers move."
          </blockquote>
          <p>The framework we apply is deliberately rigorous. We diagnose before we prescribe, we benchmark against the best in class, and we measure relentlessly. The outcome is not a report that sits on a shelf, but a transformation embedded in the daily rhythm of the property.</p>
          <h2 className="font-serif-lux text-3xl text-white pt-4">Where to begin</h2>
          <p>For most properties, the highest-impact first step is a focused diagnostic. It surfaces the two or three initiatives that will move the needle fastest, and builds the momentum and confidence needed for deeper transformation.</p>
        </div>

        <div className="mt-14 border-t border-white/10 pt-10">
          <Link to="/contact" className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#050B14] px-8 py-4 uppercase tracking-wider text-sm font-semibold hover:bg-[#E5C158] transition-colors">
            Discuss this with an expert <ArrowRight size={16} />
          </Link>
        </div>
      </article>

      <section className="bg-[#0A1120] border-t border-white/10 py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h3 className="font-serif-lux text-3xl text-white mb-10">More insights</h3>
          <div className="grid md:grid-cols-3 gap-10">
            {more.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <Link to={`/blog/${p.slug}`} className="group block">
                  <div className="overflow-hidden mb-5 h-48"><img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /></div>
                  <span className="text-[#D4AF37] text-xs uppercase tracking-wider">{p.category}</span>
                  <h4 className="font-serif-lux text-xl text-white mt-2 group-hover:text-[#D4AF37] transition-colors">{p.title}</h4>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
