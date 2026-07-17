import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface Stat {
  label: string;
  value: number;
  suffix?: string;
}

const stats: Stat[] = [
  { label: "Projects Completed", value: 320, suffix: "+" },
  { label: "Satisfied Clients", value: 240, suffix: "+" },
  { label: "Furniture Installed", value: 1800, suffix: "+" },
  { label: "Commercial Projects", value: 45, suffix: "+" },
  { label: "Residential Projects", value: 275, suffix: "+" },
  { label: "Years of Experience", value: 12, suffix: "" },
];

const Counter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      // ease-out
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
};

export const StatsSection = () => {
  return (
    <section className="py-24 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.08]"
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
          className="text-center mb-16"
        >
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-gold mb-3">
            By The Numbers
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-primary-foreground">
            Built On Trust & Craft
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center border-t border-primary-foreground/15 pt-6"
            >
              <p className="font-serif text-4xl md:text-5xl text-gold mb-2 tabular-nums">
                <Counter target={s.value} suffix={s.suffix} />
              </p>
              <p className="text-[11px] tracking-[0.22em] uppercase text-primary-foreground/70">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
