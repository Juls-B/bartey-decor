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

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export const TestimonialsCarousel = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(next, 6000);
    return () => window.clearInterval(t);
  }, [paused]);

  const current = testimonials[index];

  return (
    <section className="py-20 md:py-32">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-14"
        >
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-3">
            Client Stories
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground">
            Loved by Homes <span className="italic">& Businesses</span>
          </h2>
        </motion.div>

        <div
          className="relative bg-linen p-6 sm:p-10 md:p-16 min-h-[360px] flex flex-col justify-center transition-shadow duration-500 hover:shadow-xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Quote className="absolute top-5 left-5 md:top-10 md:left-10 w-14 h-14 md:w-20 md:h-20 text-gold/30" />
          <Quote className="absolute bottom-5 right-5 md:bottom-10 md:right-10 w-14 h-14 md:w-20 md:h-20 text-gold/20 rotate-180 hidden sm:block" />

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-2xl mx-auto relative"
            >
              {/* Circular avatar placeholder */}
              <div className="mx-auto mb-6 h-16 w-16 md:h-20 md:w-20 rounded-full bg-gradient-to-br from-primary/20 to-gold/30 border-2 border-background shadow-lg flex items-center justify-center font-serif text-xl md:text-2xl text-primary transition-transform duration-500 hover:scale-105">
                {getInitials(current.name)}
              </div>

              <div className="flex justify-center gap-1 mb-5">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="font-serif text-lg sm:text-xl md:text-2xl lg:text-3xl text-foreground leading-[1.5] mb-6 md:mb-8 italic px-2">
                &ldquo;{current.quote}&rdquo;
              </p>
              <div className="w-10 h-px bg-gold mx-auto mb-4" />
              <p className="text-sm font-medium text-foreground">{current.name}</p>
              <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mt-1">{current.role}</p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 md:mt-10 flex items-center justify-between relative z-10">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonial"
              className="h-10 w-10 rounded-full bg-background border border-border hover:border-primary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300"
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
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-8 bg-primary" : "w-4 bg-border hover:bg-primary/50"}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              className="h-10 w-10 rounded-full bg-background border border-border hover:border-primary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
