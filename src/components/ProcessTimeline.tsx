import { motion } from "framer-motion";
import { MessageSquare, PencilRuler, CheckCircle2, Hammer, Wrench, Sparkles } from "lucide-react";

const steps = [
  { icon: MessageSquare, title: "Consultation", copy: "We visit or meet virtually to understand your space, style and needs." },
  { icon: PencilRuler, title: "Design", copy: "Concept boards, layouts, materials — tailored to your brief." },
  { icon: CheckCircle2, title: "Approval", copy: "Sign off drawings, finishes and pricing before we build." },
  { icon: Hammer, title: "Production", copy: "Hand-built in our Accra workshop by our craftsmen." },
  { icon: Wrench, title: "Installation", copy: "Our own team delivers and installs on-site with care." },
  { icon: Sparkles, title: "Final Delivery", copy: "Final walk-through, styling touches and aftercare." },
];

export const ProcessTimeline = () => {
  return (
    <section id="process" className="py-24 md:py-32 scroll-mt-24">
      <div className="container-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-3">
            How We Work
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground">Our Process</h2>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center relative"
              >
                <div className="relative mx-auto mb-5 h-16 w-16 rounded-full bg-background border-2 border-gold flex items-center justify-center text-primary shadow-[0_10px_30px_-15px_hsl(var(--primary)/0.5)]">
                  <step.icon className="w-6 h-6" />
                  <span className="absolute -bottom-2 -right-2 h-6 w-6 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-serif text-lg text-foreground mb-2">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
