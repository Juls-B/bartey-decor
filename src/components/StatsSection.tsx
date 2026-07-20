import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface Stat {
  label: string;
  value: number;
  suffix?: string;
}

const counters: Stat[] = [
  { label: "Projects Completed", value: 320, suffix: "+" },
  { label: "Happy Clients", value: 240, suffix: "+" },
  { label: "Furniture Installed", value: 1800, suffix: "+" },
];


// Circular / bar metrics — percentage-based for visual variety.
const progressMetrics = [
  { label: "Customer Satisfaction", value: 98, display: "98%" },
  { label: "Residential Projects", value: 78, display: "275+" },
  { label: "Commercial Projects", value: 52, display: "45+" },
];

const useAnimatedNumber = (target: number, inView: boolean, duration = 1600) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);
  return value;
};

const Counter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const value = useAnimatedNumber(target, inView);
  return (
    <span ref={ref}>
      {Math.round(value).toLocaleString()}
      {suffix}
    </span>
  );
};

const CircularProgress = ({ target, display }: { target: number; display: string }) => {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const value = useAnimatedNumber(target, inView, 1800);
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg ref={ref} width="120" height="120" viewBox="0 0 120 120" className="-rotate-90">
        <circle cx="60" cy="60" r={radius} stroke="currentColor" strokeWidth="4" fill="none" className="text-primary-foreground/15" />
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="hsl(var(--gold))"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.1s linear" }}
        />
      </svg>
      <span className="absolute font-serif text-2xl md:text-3xl text-gold tabular-nums">{display}</span>
    </div>
  );
};

const ProgressBar = ({ target, display, label }: { target: number; display: string; label: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const value = useAnimatedNumber(target, inView, 1600);

  return (
    <div ref={ref} className="w-full">
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-[11px] tracking-[0.22em] uppercase text-primary-foreground/70">{label}</span>
        <span className="font-serif text-xl text-gold tabular-nums">{display}</span>
      </div>
      <div className="h-1.5 w-full bg-primary-foreground/15 overflow-hidden rounded-full">
        <div
          className="h-full bg-gradient-to-r from-gold to-gold-light rounded-full"
          style={{ width: `${value}%`, transition: "width 0.1s linear" }}
        />
      </div>
    </div>
  );
};

export const StatsSection = () => {
  return (
    <section className="py-20 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, hsl(var(--gold)) 0%, transparent 40%), radial-gradient(circle at 80% 80%, hsl(var(--gold-light)) 0%, transparent 45%)",
        }}
      />
      <div className="container-full relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 md:mb-20"
        >
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-gold mb-3">
            By The Numbers
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-primary-foreground">
            Built On Trust &amp; Craft
          </h2>
        </motion.div>

        {/* Counter cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-10 mb-16 md:mb-20">
          {counters.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center border-t border-primary-foreground/15 pt-6 transition-colors duration-300 hover:border-gold"
            >
              <p className="font-serif text-4xl md:text-5xl lg:text-6xl text-gold mb-2 tabular-nums">
                <Counter target={s.value} suffix={s.suffix} />
              </p>
              <p className="text-[11px] tracking-[0.22em] uppercase text-primary-foreground/70">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Circular progress row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10 mb-16 md:mb-20">
          {progressMetrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <CircularProgress target={m.value} display={m.display} />
              <p className="mt-4 text-[11px] tracking-[0.22em] uppercase text-primary-foreground/70">
                {m.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Progress bars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
          {progressMetrics.map((m, i) => (
            <motion.div
              key={`bar-${m.label}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <ProgressBar target={m.value} display={m.display} label={m.label} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
