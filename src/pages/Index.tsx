import { Link } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowDown, Instagram, ShieldCheck, Hammer, Truck, Wrench } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { CollectionCard } from "@/components/CollectionCard";
import { collections, getFeaturedProducts, products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/contact";

import slide1 from "@/assets/slide1.jpg";
import slide2 from "@/assets/slide2.jpg";
import slide3 from "@/assets/slide3.jpg";
import slide4 from "@/assets/slide4.jpg";
import slide5 from "@/assets/slide5.jpg";
import warmLivingRoom from "@/assets/warm-living-room.jfif";
import wardrobeFitted from "@/assets/wardrobe-fitted.jfif";
import tvConsoleMarble from "@/assets/tv-console-marble.jfif";
import greenSofa from "@/assets/green-sofa.jfif";
import armchairBoucle from "@/assets/armchair-boucle.jfif";
import tvConsoleModern from "@/assets/tv-console-modern.jfif";
import officeReception from "@/assets/office-reception.jfif";

const Index = () => {
  const featured = getFeaturedProducts();
  const latestProducts = featured.length ? featured.slice(0, 4) : products.slice(0, 4);
  const displayedCollections = collections.slice(0, 6);
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const heroSlides = [slide1, slide2, slide3, slide4, slide5];
  const gallery = [...heroSlides];

  const changeHeroSlide = (index: number) => {
    if (index === activeHeroSlide) return;
    setSlideDirection(index > activeHeroSlide ? 1 : -1);
    setActiveHeroSlide(index);
  };

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveHeroSlide((current) => {
        const next = (current + 1) % heroSlides.length;
        setSlideDirection(1);
        return next;
      });
    }, 7000);

    return () => window.clearInterval(interval);
  }, [heroSlides.length]);

  const whyChoose = [
    { icon: ShieldCheck, title: "Registered Ghanaian Business", copy: "A trusted, fully registered company based in Madina, Accra." },
    { icon: Hammer, title: "Premium Craftsmanship", copy: "Every piece is hand-built by our workshop team with obsessive attention to finish." },
    { icon: Truck, title: "Doorstep Delivery", copy: "We deliver anywhere in Ghana — carefully packed, on schedule." },
    { icon: Wrench, title: "Professional Installation", copy: "Our own installers set up your wardrobes, TV walls and furniture in-home." },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section ref={heroRef} className="relative h-[100svh] -mt-16 md:-mt-20 overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroImageY }}>
          <AnimatePresence initial={false} mode="wait">
            <motion.img
              key={heroSlides[activeHeroSlide]}
              src={heroSlides[activeHeroSlide]}
              alt="Featured interior design showcase by Bartey Decor"
              initial={{ x: slideDirection * 120, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: slideDirection * -120, opacity: 0 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] as const }}
              className="w-full h-[120%] object-cover animate-ken-burns"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/20 to-charcoal/60" />
          <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 flex gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Show slide ${index + 1}`}
                onClick={() => changeHeroSlide(index)}
                className={`h-2.5 w-2.5 rounded-full border border-white/70 transition-all ${
                  activeHeroSlide === index ? "bg-white scale-125" : "bg-white/35"
                }`}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative container-full h-full flex flex-col justify-end pb-20 md:pb-28 pt-16 md:pt-20"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="max-w-3xl"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-[11px] font-semibold tracking-[0.3em] uppercase text-white/70 mb-6"
            >
              Custom Furniture & Interior Décor — Accra, Ghana
            </motion.p>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-white mb-8 leading-[0.9] tracking-tight">
              Your Style,
              <br />
              <span className="italic font-normal">Our Work</span>
            </h1>
            <p className="text-base md:text-lg text-white/80 mb-10 leading-relaxed max-w-xl">
              Bartey Decor designs, builds and installs premium custom furniture and fitted interiors for homes and businesses across Ghana.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-none px-10 py-6 text-sm tracking-[0.15em] uppercase btn-premium"
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
                className="rounded-none px-10 py-6 text-sm tracking-[0.15em] uppercase bg-transparent border-white/60 text-white hover:bg-white hover:text-charcoal"
              >
                <Link to="/contact?intent=consultation">
                  Book a Consultation
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/50">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="w-4 h-4 text-white/50" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured project */}
      <section className="py-20 md:py-28">
        <div className="container-full">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="relative aspect-[4/5] overflow-hidden group"
            >
              <img
                src={tvConsoleMarble}
                alt="Custom TV console with marble backdrop"
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="md:py-12"
            >
              <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-4">
                Signature Project
              </p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-[0.95]">
                Custom TV Walls
                <br />
                <span className="italic font-normal">Built for the Room</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">
                We design and build TV consoles and full media walls that fit your space perfectly — from floating cabinets to full slab-marble backdrops with warm timber slats and integrated lighting.
              </p>
              <Button
                asChild
                size="lg"
                className="rounded-none px-10 py-6 text-sm tracking-[0.15em] uppercase btn-premium"
              >
                <Link to={`/products?collection=tv-consoles`}>
                  Explore TV Consoles
                  <ArrowRight className="ml-3 w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Latest projects */}
      <section className="py-20 md:py-28 bg-linen">
        <div className="container-full">
          <div className="flex items-end justify-between mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-3">
                Featured Work
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground">
                Recent Projects
              </h2>
            </motion.div>
            <Link
              to="/products"
              className="hidden md:flex items-center gap-3 text-sm font-medium tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors group"
            >
              View Portfolio
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {latestProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          <div className="mt-14 text-center md:hidden">
            <Button
              asChild
              variant="outline"
              className="rounded-none px-8 py-5 text-sm tracking-[0.15em] uppercase"
            >
              <Link to="/products">View Full Portfolio</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-24 md:py-32">
        <div className="container-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-3">
              What We Build
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground">
              Our Services
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
            <div className="md:col-span-7">
              <CollectionCard collection={displayedCollections[0]} index={0} variant="wide" />
            </div>
            <div className="md:col-span-5">
              <CollectionCard collection={displayedCollections[1]} index={1} />
            </div>

            <div className="md:col-span-4">
              <CollectionCard collection={displayedCollections[2]} index={2} />
            </div>
            <div className="md:col-span-4">
              <CollectionCard collection={displayedCollections[3]} index={3} />
            </div>
            <div className="md:col-span-4">
              <CollectionCard collection={displayedCollections[4]} index={4} />
            </div>

            <div className="md:col-span-12">
              <CollectionCard collection={displayedCollections[5]} index={5} variant="wide" />
            </div>
          </div>
        </div>
      </section>

      {/* Why choose Bartey */}
      <section className="py-24 md:py-32 bg-linen">
        <div className="container-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-3">
              Why Bartey Decor
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground">
              Built on Trust & Craft
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {whyChoose.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-background p-8 border border-border/50 hover:border-primary/40 transition-colors duration-500"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl text-foreground mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About preview */}
      <section className="py-24 md:py-32">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          >
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-6">
              Our Story
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-[1.3] mb-8">
              Founded by <span className="italic">{CONTACT.founder}</span>, Bartey Decor
              is a fully registered Ghanaian company crafting elegant, functional furniture for modern living.
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
              From bespoke wardrobes to full commercial fit-outs, we take every project from consultation through design, production and installation — with the same standard of finish, every time.
            </p>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-none px-10 py-6 text-sm tracking-[0.15em] uppercase"
            >
              <Link to="/about">
                Read Our Story
                <ArrowRight className="ml-3 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Instagram / Gallery */}
      <section className="py-20 md:py-28 bg-linen">
        <div className="container-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-3">
              Follow the Studio
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
              {CONTACT.instagramHandle}
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Behind-the-scenes builds, installs and completed spaces — straight from our workshop in Accra.
            </p>
          </motion.div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4">
            {gallery.map((image, index) => (
              <motion.a
                key={index}
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="relative aspect-square overflow-hidden group cursor-pointer"
              >
                <img
                  src={image}
                  alt="Bartey Decor project"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-colors duration-300 flex items-center justify-center">
                  <Instagram className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
