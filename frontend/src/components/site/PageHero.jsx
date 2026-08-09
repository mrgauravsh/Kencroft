import { motion } from "framer-motion";
import { Overline, MaskLine } from "./Reveal";

export function PageHero({ overline, title, subtitle, image }) {
  return (
    <section className="relative pt-40 pb-20 md:pt-52 md:pb-28 overflow-hidden">
      {image && (
        <>
          <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050B14]/70 via-[#050B14]/85 to-[#050B14]" />
        </>
      )}
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}><Overline>{overline}</Overline></motion.div>
        <h1 className="font-serif-lux font-light text-white text-4xl sm:text-5xl lg:text-7xl tracking-tight leading-[0.98] mt-6 max-w-4xl">
          {title.split(" ").reduce((acc, w, i) => {
            const line = Math.floor(i / 3);
            acc[line] = (acc[line] || "") + w + " ";
            return acc;
          }, []).map((line, i) => <MaskLine key={i} delay={0.2 + i * 0.12}>{line}</MaskLine>)}
        </h1>
        {subtitle && (
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="text-white/60 text-base md:text-lg max-w-2xl mt-8 leading-relaxed">{subtitle}</motion.p>
        )}
      </div>
    </section>
  );
}
