import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Quote } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CONTACT } from "@/lib/contact";

import warmLivingRoom from "@/assets/warm-living-room.jfif";
import wardrobeFitted from "@/assets/wardrobe-fitted.jfif";
import officeReception from "@/assets/office-reception.jfif";

// Brand assets — founder portrait + on-site team/workshop photography
import founderAsset from "@/assets/brand/founder.jpg.asset.json";
import worker01 from "@/assets/brand/worker_01.jpg.asset.json";
import worker02 from "@/assets/brand/worker_02.jpg.asset.json";
import worker03 from "@/assets/brand/worker_03.jpg.asset.json";
import worker04 from "@/assets/brand/worker_04.jpg.asset.json";


const process = [
  { n: "01", title: "Consultation", copy: "We visit or meet virtually to understand your space, style and needs." },
  { n: "02", title: "Design & Planning", copy: "We produce concept boards, layouts and material selections tailored to you." },
  { n: "03", title: "Design Approval", copy: "You sign off on drawings, finishes and pricing — no surprises later." },
  { n: "04", title: "Production", copy: "Your piece is hand-built in our Accra workshop by our craftsmen." },
  { n: "05", title: "Installation", copy: "Our own team delivers and installs on-site with care and precision." },
  { n: "06", title: "Project Completion", copy: "Final walk-through, styling touches and full aftercare support." },
];

const testimonials = [
  {
    quote:
      "Bartey Decor transformed our master bedroom with a fitted wardrobe that feels like it was always meant to be there. Immaculate finish.",
    name: "Ama D.",
    role: "Homeowner, East Legon",
  },
  {
    quote:
      "We fitted out our entire reception and waiting area with Bartey. Professional, on time, and the clients keep asking who did it.",
    name: "Michael K.",
    role: "Managing Director, Salon Group",
  },
  {
    quote:
      "The most detail-oriented furniture team we've worked with. From consultation to installation, everything was handled beautifully.",
    name: "Nana A.",
    role: "Interior Client, Cantonments",
  },
];

const faqs = [
  {
    q: "How do I request a quote?",
    a: "Send us a message through the Contact page, WhatsApp or call. Share room dimensions or a photo if you can — we'll respond within one working day with next steps and an indicative price.",
  },
  {
    q: "Do you build custom furniture?",
    a: "Yes — custom is our specialty. We design and build wardrobes, TV consoles, sofas, tables, storage and full commercial fit-outs to your exact dimensions, brief and finish.",
  },
  {
    q: "How long does production take?",
    a: "Most residential pieces take 3–6 weeks from design approval. Large fit-outs and commercial projects are quoted with a full timeline during consultation.",
  },
  {
    q: "Do you install after production?",
    a: "Always. Our own installers deliver and fit your piece on-site, so you never coordinate a third party. Installation and doorstep delivery are included in the quote.",
  },
  {
    q: "Which areas do you serve?",
    a: "We are based in Madina, Accra and serve homes and businesses across Ghana. Deliveries outside Greater Accra are arranged during quoting.",
  },
];

const About = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <Layout>
      {/* Hero */}
      <section ref={heroRef} className="relative h-[80vh] md:h-screen overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroImageY }}>
          <img
            src={warmLivingRoom}
            alt="Bartey Decor styled interior"
            className="w-full h-[120%] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/30 via-charcoal/20 to-charcoal/60" />
        </motion.div>

        <div className="relative container-full h-full flex flex-col justify-end pb-20 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-white/60 mb-5">
              About Bartey Decor
            </p>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-[0.9]">
              Designing Spaces
              <br />
              <span className="italic font-normal">You Come Home To</span>
            </h1>
            <p className="text-base md:text-lg text-white/70 max-w-lg leading-relaxed">
              A registered Ghanaian furniture and interior décor company crafting modern, functional pieces for homes and businesses.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-28 md:py-40">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="divider-ornament mb-12">
              <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-primary whitespace-nowrap">
                Our Philosophy
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-[1.25] tracking-tight">
              Every space deserves furniture that is <span className="italic">functional</span>, beautifully made, and built to last for the life of the room.
            </h2>
          </motion.div>
        </div>
      </section>

      {/* Story blocks */}
      <section className="pb-20 md:pb-32">
        <div className="container-full">
          <div className="grid md:grid-cols-12 gap-12 lg:gap-20 items-center mb-24 md:mb-36">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:col-span-5"
            >
              <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-5">
                The Founder
              </p>
              <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-8 leading-tight">
                A Vision from
                <br />
                <span className="italic">Barbara Osabutey</span>
              </h3>
              <p className="text-muted-foreground leading-[1.8] mb-5">
                Bartey Decor was founded by Barbara Osabutey with a simple belief — that Ghanaian homes and businesses deserve furniture and interiors built to international standards, without compromise on craftsmanship or care.
              </p>
              <p className="text-muted-foreground leading-[1.8]">
                Today the studio is a fully registered Ghanaian company operating out of Madina, Accra, with an in-house design and production team serving clients across the country.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="md:col-span-7 relative"
            >
              <div className="aspect-[4/5] overflow-hidden group">
                <img
                  src={tvConsoleMarble}
                  alt="Custom TV wall project"
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                />
              </div>
            </motion.div>
          </div>

          {/* Mission / Vision banner */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mb-24 md:mb-36"
          >
            <div className="relative h-[50vh] md:h-[70vh] overflow-hidden group">
              <img
                src={wardrobeFitted}
                alt="Fitted wardrobe detail"
                className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-charcoal/50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="font-serif text-3xl md:text-5xl lg:text-6xl text-white text-center max-w-3xl px-6 leading-tight"
                >
                  "Your Style,
                  <br />
                  <span className="italic">Our Work.</span>"
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* Second story block */}
          <div className="grid md:grid-cols-12 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="md:col-span-7 md:order-first"
            >
              <div className="aspect-[4/5] overflow-hidden group">
                <img
                  src={officeReception}
                  alt="Commercial reception project"
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="md:col-span-5"
            >
              <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-5">
                Mission & Vision
              </p>
              <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-8 leading-tight">
                From Consultation
                <br />
                <span className="italic">to Installation</span>
              </h3>
              <p className="text-muted-foreground leading-[1.8] mb-5">
                <strong className="text-foreground font-medium">Mission —</strong> To design and deliver custom furniture and interior solutions that combine premium craftsmanship, functional design, and reliable service.
              </p>
              <p className="text-muted-foreground leading-[1.8]">
                <strong className="text-foreground font-medium">Vision —</strong> To be Ghana's most trusted name in custom furniture and modern interior décor — a studio recognised for quality, integrity and the spaces we transform.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-36 bg-linen">
        <div className="container-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-3">
              What Guides Us
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground">
              Our Values
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-16 md:gap-12 lg:gap-20">
            {[
              { title: "Craftsmanship", number: "01", description: "Every joint, seam and finish is checked by hand. Nothing leaves the workshop that we would not put in our own home." },
              { title: "Reliability", number: "02", description: "Clear timelines, honest quotes and installation by our own team. We show up when we say we will." },
              { title: "Client Focus", number: "03", description: "Your brief, your space, your style. We design and build around your life — not the other way around." },
            ].map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="text-center"
              >
                <span className="text-[11px] font-semibold tracking-[0.3em] text-primary/50 mb-4 block">{value.number}</span>
                <h3 className="font-serif text-2xl text-foreground mb-5">{value.title}</h3>
                <div className="w-8 h-px bg-primary/30 mx-auto mb-5" />
                <p className="text-muted-foreground leading-[1.8]">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 md:py-36">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {process.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="border-t border-border pt-8"
              >
                <span className="text-[11px] font-semibold tracking-[0.3em] text-primary block mb-4">{step.n}</span>
                <h3 className="font-serif text-2xl text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-[1.8]">{step.copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Three-image strip */}
      <section className="py-4 md:py-6">
        <div className="grid grid-cols-3 gap-2 md:gap-4 h-[35vh] md:h-[50vh]">
          {[armchairBoucle, greenSofa, warmLivingRoom].map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="overflow-hidden group"
            >
              <img
                src={src}
                alt="Bartey Decor project detail"
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-36 bg-linen">
        <div className="container-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-3">
              Client Words
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground">Testimonials</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.blockquote
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-background p-8 border border-border/50 flex flex-col h-full"
              >
                <Quote className="w-8 h-8 text-primary/40 mb-4" />
                <p className="font-serif text-lg text-foreground leading-relaxed mb-6 flex-1">
                  "{t.quote}"
                </p>
                <footer className="border-t border-border pt-4">
                  <p className="font-medium text-foreground">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-36">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-3">
              Good to Know
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground">Frequently Asked</h2>
          </motion.div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="font-serif text-lg md:text-xl text-left">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-[1.8]">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 md:py-40 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={warmLivingRoom} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-charcoal/70" />
        </div>

        <div className="relative container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-white/50 mb-5">
              Let's Design Your Space
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
              Ready to Start
              <br />
              <span className="italic">Your Project?</span>
            </h2>
            <p className="text-white/60 mb-10 max-w-md mx-auto leading-relaxed">
              Tell us about your space and we'll get back within one working day with next steps.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="rounded-none px-12 py-6 text-sm tracking-[0.15em] uppercase bg-white text-charcoal hover:bg-white/90"
              >
                <Link to="/contact">
                  Request a Quote
                  <ArrowRight className="ml-3 w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-none px-12 py-6 text-sm tracking-[0.15em] uppercase bg-transparent border-white/60 text-white hover:bg-white hover:text-charcoal"
              >
                <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
