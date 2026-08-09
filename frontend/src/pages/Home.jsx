import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Marquee from "react-fast-marquee";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "../components/ui/accordion";
import { Reveal, Overline, MaskLine } from "../components/site/Reveal";
import { Counter } from "../components/site/Counter";
import { LeadForm } from "../components/site/LeadForm";
import { MagneticButton } from "../components/site/MagneticButton";
import { ArrowUpRight, ArrowRight, Quote } from "lucide-react";
import { IMG, SERVICES, INDUSTRIES, WHY, PROCESS, STATS, TESTIMONIALS, FAQS, POSTS } from "../lib/data";

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div>
      {/* HERO */}
      <section ref={heroRef} className="relative h-[100svh] min-h-[640px] overflow-hidden flex items-end">
        <motion.div style={{ y, scale }} className="absolute inset-0">
          <img src={IMG.hero} alt="Luxury hospitality" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-[#050B14]/70 to-[#050B14]/40" />
        </motion.div>

        <motion.div style={{ opacity }} className="relative max-w-7xl mx-auto px-6 md:px-12 pb-20 md:pb-28 w-full">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <Overline>Premium Hospitality Consulting</Overline>
          </motion.div>
          <h1 className="font-serif-lux font-light text-white text-5xl sm:text-6xl lg:text-8xl tracking-tight leading-[0.95] mt-6 max-w-5xl">
            <MaskLine delay={0.35}>Transforming Hospitality</MaskLine>
            <MaskLine delay={0.5}>Through <span className="italic text-[#D4AF37]">Strategic</span></MaskLine>
            <MaskLine delay={0.65}>Excellence</MaskLine>
          </h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8 }}
            className="text-white/70 text-base md:text-lg max-w-2xl mt-8 leading-relaxed font-light">
            Helping hotels, resorts, and hospitality businesses increase profitability, operational excellence, and guest satisfaction through strategic consulting.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.15, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 mt-10">
            <Link to="/schedule" data-testid="hero-schedule-btn"
              className="bg-[#D4AF37] text-[#050B14] px-8 py-4 uppercase tracking-wider text-xs md:text-sm font-semibold hover:bg-[#E5C158] transition-colors inline-flex items-center justify-center gap-2">
              Schedule a Consultation <ArrowRight size={16} />
            </Link>
            <Link to="/contact" data-testid="hero-expert-btn"
              className="border border-[#D4AF37] text-[#D4AF37] px-8 py-4 uppercase tracking-wider text-xs md:text-sm font-semibold hover:bg-[#D4AF37]/10 transition-colors inline-flex items-center justify-center">
              Talk to an Expert
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* STATS STRIP */}
      <section className="border-y border-white/10 bg-[#0A1120]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-5 divide-x divide-white/10">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="py-10 px-4 text-center">
              <div className="font-serif-lux text-4xl md:text-5xl text-[#D4AF37]">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="text-white/50 text-xs uppercase tracking-wider mt-2">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-6">
          <Reveal><Overline>About Kencroft Strategy Group</Overline></Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-serif-lux font-light text-white text-4xl md:text-5xl tracking-tight mt-6 leading-tight">
              We partner with hospitality businesses to unlock enduring growth.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-white/60 mt-6 leading-relaxed max-w-lg">
              Kencroft Strategy Group advises the world's finest hotels, resorts and hospitality groups. We combine deep operational expertise with rigorous, data-driven strategy to elevate every dimension of your business.
            </p>
          </Reveal>
          <div className="grid grid-cols-2 gap-6 mt-10 max-w-md">
            {["Profitability", "Operational Efficiency", "Guest Experience", "Long-term Growth"].map((t, i) => (
              <Reveal key={t} delay={0.3 + i * 0.06}>
                <div className="border-l border-[#D4AF37]/50 pl-4">
                  <span className="text-white/80 text-sm">{t}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.5}>
            <Link to="/about" className="inline-flex items-center gap-2 text-[#D4AF37] mt-10 text-sm uppercase tracking-wider hover:gap-4 transition-all">
              Discover our story <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
        <div className="md:col-span-6 relative">
          <Reveal delay={0.2}>
            <div className="relative">
              <img src={IMG.about} alt="Hospitality architecture" className="w-full h-[420px] md:h-[520px] object-cover" />
              <div className="absolute -bottom-8 -left-8 hidden md:block w-48 h-48 border border-[#D4AF37]/40 bg-[#0A1120] p-6">
                <div className="font-serif-lux text-5xl text-[#D4AF37]">15+</div>
                <div className="text-white/60 text-xs uppercase tracking-wider mt-2">Years advising luxury hospitality</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="py-8 border-y border-white/10 overflow-hidden">
        <Marquee speed={40} gradient={false}>
          {["Strategy for Growth", "Operational Excellence", "Revenue Optimisation", "Guest Experience", "Premium Hospitality Consulting"].map((t) => (
            <span key={t} className="font-serif-lux italic text-6xl md:text-8xl text-stroke mx-10">{t} ·</span>
          ))}
        </Marquee>
      </section>

      {/* SERVICES */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <Reveal><Overline>What We Do</Overline></Reveal>
            <Reveal delay={0.1}><h2 className="font-serif-lux font-light text-white text-4xl md:text-5xl tracking-tight mt-4">Full-spectrum hospitality consulting</h2></Reveal>
          </div>
          <Reveal delay={0.2}><Link to="/services" className="text-[#D4AF37] text-sm uppercase tracking-wider inline-flex items-center gap-2 hover:gap-4 transition-all">All services <ArrowRight size={16} /></Link></Reveal>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.id} delay={(i % 3) * 0.08}>
                <div data-testid={`service-card-${s.id}`}
                  className="group relative bg-[#0A1120] p-8 h-full hover:bg-[#0F172A] transition-colors duration-500 overflow-hidden">
                  <Icon className="text-[#D4AF37] mb-6" size={30} strokeWidth={1.2} />
                  <h3 className="font-serif-lux text-2xl text-white mb-2">{s.title}</h3>
                  <p className="text-white/45 text-sm mb-4">{s.tagline}</p>
                  <ul className="space-y-1.5">
                    {s.items.slice(0, 3).map((it) => (
                      <li key={it} className="text-white/60 text-sm flex items-center gap-2">
                        <span className="w-1 h-1 bg-[#D4AF37] rounded-full" />{it}
                      </li>
                    ))}
                  </ul>
                  <ArrowUpRight className="absolute top-8 right-8 text-white/20 group-hover:text-[#D4AF37] transition-colors" size={20} />
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="bg-[#0A1120] border-y border-white/10 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <Reveal><Overline>Why Kencroft Strategy Group</Overline></Reveal>
          <Reveal delay={0.1}><h2 className="font-serif-lux font-light text-white text-4xl md:text-5xl tracking-tight mt-4 max-w-2xl">The advantage of a specialist partner</h2></Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={(i % 3) * 0.1}>
                <div className="border border-white/10 p-8 hover:border-[#D4AF37]/50 hover:-translate-y-1 transition-all duration-500 h-full">
                  <div className="font-serif-lux text-[#D4AF37]/40 text-4xl mb-4">0{i + 1}</div>
                  <h3 className="text-white text-xl mb-3 font-serif-lux">{w.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS TIMELINE */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <Reveal><Overline>Our Consulting Process</Overline></Reveal>
        <Reveal delay={0.1}><h2 className="font-serif-lux font-light text-white text-4xl md:text-5xl tracking-tight mt-4 mb-16">A disciplined path from insight to impact</h2></Reveal>
        <div className="relative">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/10" />
          <div className="space-y-12">
            {PROCESS.map((p, i) => (
              <Reveal key={p.n} delay={0.05}>
                <div className={`relative pl-10 md:pl-0 md:grid md:grid-cols-2 md:gap-16 ${i % 2 ? "md:text-left" : "md:text-right"}`}>
                  <div className={`absolute left-[-5px] md:left-1/2 md:-translate-x-1/2 top-2 w-2.5 h-2.5 rounded-full bg-[#D4AF37]`} />
                  <div className={`${i % 2 ? "md:col-start-2" : "md:col-start-1"}`}>
                    <span className="font-serif-lux text-[#D4AF37]/40 text-5xl">{p.n}</span>
                    <h3 className="font-serif-lux text-2xl text-white mt-2">{p.title}</h3>
                    <p className={`text-white/55 text-sm mt-3 leading-relaxed ${i % 2 ? "" : "md:ml-auto"} max-w-sm`}>{p.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="bg-[#0A1120] border-y border-white/10 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <Reveal><Overline>Industries We Serve</Overline></Reveal>
              <Reveal delay={0.1}><h2 className="font-serif-lux font-light text-white text-4xl md:text-5xl tracking-tight mt-4">Expertise across hospitality</h2></Reveal>
            </div>
            <Reveal delay={0.2}><Link to="/industries" className="text-[#D4AF37] text-sm uppercase tracking-wider inline-flex items-center gap-2 hover:gap-4 transition-all">Explore all <ArrowRight size={16} /></Link></Reveal>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {INDUSTRIES.slice(0, 8).map((ind, i) => (
              <Reveal key={ind.title} delay={(i % 4) * 0.08}>
                <div className="group relative h-72 overflow-hidden border border-white/10">
                  <img src={ind.image} alt={ind.title} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-[#050B14]/40 to-transparent" />
                  <div className="absolute bottom-0 p-6">
                    <h3 className="font-serif-lux text-xl text-white">{ind.title}</h3>
                    <p className="text-white/60 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">{ind.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <Reveal><Overline>Client Voices</Overline></Reveal>
        <Reveal delay={0.1}><h2 className="font-serif-lux font-light text-white text-4xl md:text-5xl tracking-tight mt-4 mb-16">Trusted at the highest level</h2></Reveal>
        <div className="grid md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={(i % 2) * 0.1}>
              <div className="border border-white/10 p-8 md:p-10 hover:border-[#D4AF37]/40 transition-colors duration-500 h-full">
                <Quote className="text-[#D4AF37] mb-6" size={34} />
                <p className="font-serif-lux text-xl md:text-2xl text-white/90 italic leading-relaxed">"{t.quote}"</p>
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="text-white font-medium">{t.name}</div>
                  <div className="text-white/50 text-sm">{t.role}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* LEAD GENERATION */}
      <section id="enquiry" className="relative py-24 md:py-32 border-y border-white/10">
        <img src={IMG.process} alt="" className="absolute inset-0 w-full h-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-[#050B14]/85" />
        <div className="relative max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-5">
            <Reveal><Overline>Let's Talk</Overline></Reveal>
            <Reveal delay={0.1}><h2 className="font-serif-lux font-light text-white text-4xl md:text-5xl tracking-tight mt-4 leading-tight">Let's Discuss Your Hotel's Growth</h2></Reveal>
            <Reveal delay={0.2}><p className="text-white/60 mt-6 leading-relaxed">Share a few details and our consulting team will reach out to explore how Kencroft Strategy Group can elevate your property's performance.</p></Reveal>
          </div>
          <div className="md:col-span-7">
            <Reveal delay={0.2}><LeadForm /></Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <Reveal className="text-center"><Overline>Frequently Asked Questions</Overline></Reveal>
        <Reveal delay={0.1}><h2 className="font-serif-lux font-light text-white text-4xl md:text-5xl tracking-tight mt-4 mb-12 text-center">Answers for decision-makers</h2></Reveal>
        <Accordion type="single" collapsible className="w-full" data-testid="faq-accordion">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b border-white/10">
              <AccordionTrigger className="text-left text-white hover:text-[#D4AF37] font-serif-lux text-lg md:text-xl py-6 hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="text-white/55 leading-relaxed text-base pb-6">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* BLOG PREVIEW */}
      <section className="bg-[#0A1120] border-t border-white/10 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <Reveal><Overline>Kencroft Insights</Overline></Reveal>
              <Reveal delay={0.1}><h2 className="font-serif-lux font-light text-white text-4xl md:text-5xl tracking-tight mt-4">Latest perspectives</h2></Reveal>
            </div>
            <Reveal delay={0.2}><Link to="/blog" className="text-[#D4AF37] text-sm uppercase tracking-wider inline-flex items-center gap-2 hover:gap-4 transition-all">All insights <ArrowRight size={16} /></Link></Reveal>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {POSTS.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.1}>
                <Link to={`/blog/${p.slug}`} className="group block">
                  <div className="overflow-hidden mb-6 h-56">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <span className="text-[#D4AF37] text-xs uppercase tracking-wider">{p.category} · {p.read}</span>
                  <h3 className="font-serif-lux text-2xl text-white mt-3 group-hover:text-[#D4AF37] transition-colors leading-tight">{p.title}</h3>
                  <p className="text-white/50 text-sm mt-3 leading-relaxed">{p.excerpt}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 text-center">
        <Reveal>
          <h2 className="font-serif-lux font-light text-white text-4xl md:text-6xl tracking-tight leading-tight max-w-4xl mx-auto">
            Ready to transform your <span className="italic text-[#D4AF37]">hospitality</span> business?
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-10 flex justify-center">
            <Link to="/schedule">
              <MagneticButton data-testid="final-cta" className="bg-[#D4AF37] text-[#050B14] px-10 py-5 uppercase tracking-wider text-sm font-semibold">
                Start Your Transformation
              </MagneticButton>
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
