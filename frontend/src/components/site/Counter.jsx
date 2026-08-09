import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";

export function Counter({ to, suffix = "", duration = 2 }) {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) {
        setStarted(true);
        const controls = animate(0, to, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setVal(Math.round(v)) });
        return () => controls.stop();
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration, started]);

  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}
