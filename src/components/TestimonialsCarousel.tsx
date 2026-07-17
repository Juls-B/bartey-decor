import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote, Star, ArrowLeft, ArrowRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "Bartey Decor transformed our master bedroom with a fitted wardrobe that feels like it was always meant to be there. Immaculate finish.",
    name: "Ama D.",
    role: "Homeowner, East Legon",
    rating: 5,
  },
  {
    quote:
      "We fitted out our entire reception and waiting area with Bartey. Professional, on time, and clients keep asking who did it.",
    name: "Michael K.",
    role: "Managing Director, Salon Group",
    rating: 5,
  },
  {
    quote:
      "The most detail-oriented furniture team we've worked with. From consultation to installation, everything was handled beautifully.",
    name: "Nana A.",
    role: "Interior Client, Cantonments",
    rating: 5,
  },
  {
    quote:
      "Our kitchen is exactly what we imagined — soft-close everywhere, hidden storage, and the finish is flawless. Worth every cedi.",
    name: "Kwame O.",
    role: "Homeowner, Adenta",
    rating: 5,
  },
];

export const TestimonialsCarousel = () => {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const t = window.setInterval(next, 7000);
    return () => window.clearInterval(t);
  }, []);

  const current = testimonials[index];

  return (
    <section className="py-24 md:py-32">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-3">
            Client Stories
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground">
            Loved by Homes <span className="italic">& Businesses</span>
          </h2>
        </motion.div>

        <div className="relative bg-linen p-8 md:p-16 min-h-[320px] flex flex-col justify-center">
          <Quote className="absolute top-6 left-6 md:top-10 md:left-10 w-12 h-12 md:w-16 md:h-16 text-gold/40" />
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-2xl mx-auto"
            >
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="font-serif text-xl md:text-2xl lg:text-3xl text-foreground leading-[1.5] mb-8 italic">
                “{current.quote}”
              </p>
              <div className="w-10 h-px bg-gold mx-auto mb-4" />
              <p className="text-sm font-medium text-foreground">{current.name}</p>
              <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mt-1">{current.role}</p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center justify-between">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonial"
              className="h-10 w-10 rounded-full bg-background border border-border hover:border-primary flex items-center justify-center transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Show testimonial ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${i === index ? "w-8 bg-primary" : "w-4 bg-border"}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              className="h-10 w-10 rounded-full bg-background border border-border hover:border-primary flex items-center justify-center transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
