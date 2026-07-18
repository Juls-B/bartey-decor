import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Images } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { SafeImage } from "@/components/SafeImage";
import { services, serviceCategories, type ServiceCategoryId, type Service } from "@/data/services";
import { cn } from "@/lib/utils";
import warmLivingRoom from "@/assets/warm-living-room.jfif";

type Filter = "all" | ServiceCategoryId;

const Products = () => {
  const [filter, setFilter] = useState<Filter>("all");
  const location = useLocation();

  const filtered = useMemo(
    () => (filter === "all" ? services : services.filter((s) => s.category === filter)),
    [filter]
  );

  // If we arrive with a hash, ensure filter is "all" so the target section exists.
  useEffect(() => {
    if (location.hash) {
      setFilter("all");
      const id = location.hash.replace("#", "");
      // Delay slightly so the section is in the DOM
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60);
    }
  }, [location.hash]);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[45vh] md:h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img src={warmLivingRoom} alt="Bartey Decor bespoke interiors" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-charcoal/30" />
        </div>
        <div className="relative container-full h-full flex flex-col justify-end pb-14 md:pb-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }}>
            <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-gold mb-3">
              Our Services
            </p>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-4 leading-[0.95] max-w-3xl">
              Bespoke furniture <br className="hidden md:block" /> & interior craftsmanship
            </h1>
            <p className="text-base md:text-lg text-white/75 max-w-xl">
              Each service has its own dedicated section — jump straight to what you need.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category tabs */}
      <section className="py-6 border-b border-border sticky top-16 md:top-20 bg-background/95 backdrop-blur-md z-40">
        <div className="container-full">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide -mb-2 pb-2">
            <FilterButton active={filter === "all"} onClick={() => setFilter("all")}>All Services</FilterButton>
            {serviceCategories.map((cat) => (
              <FilterButton key={cat.id} active={filter === cat.id} onClick={() => setFilter(cat.id)}>
                {cat.name}
              </FilterButton>
            ))}
          </div>
        </div>
      </section>

      {/* Quick jump index */}
      {filter === "all" && (
        <section className="py-8 border-b border-border/60 bg-linen">
          <div className="container-full">
            <p className="text-[10px] tracking-[0.3em] uppercase text-primary/70 mb-3">Jump to</p>
            <div className="flex flex-wrap gap-2">
              {services.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.slug}`}
                  className="text-[11px] tracking-[0.15em] uppercase px-3 py-1.5 border border-border bg-background hover:border-primary hover:text-primary transition-colors"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Anchored service sections */}
      <section className="py-16 md:py-20">
        <div className="container-full space-y-24 md:space-y-32">
          {filtered.map((service, i) => (
            <ServiceSection key={service.id} service={service} reverse={i % 2 === 1} />
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative h-[55vh] overflow-hidden">
        <div className="absolute inset-0">
          <img src={warmLivingRoom} alt="Interior styled by Bartey Decor" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-charcoal/70" />
        </div>
        <div className="relative h-full flex items-center justify-center text-center px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-gold mb-4">Ready to begin?</p>
            <h2 className="font-serif text-3xl md:text-5xl text-white mb-6">Let's design your space</h2>
            <Button asChild size="lg" className="rounded-none px-10 py-6 text-sm tracking-[0.15em] uppercase bg-gold text-charcoal hover:bg-gold/90">
              <Link to="/contact">
                Start Your Project
                <ArrowRight className="ml-3 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

const ServiceSection = ({ service, reverse }: { service: Service; reverse: boolean }) => {
  const [active, setActive] = useState(0);
  const primary = service.gallery[active] ?? service.gallery[0];
  const thumbs = service.gallery.slice(0, 5);

  return (
    <article id={service.slug} className="scroll-mt-32 md:scroll-mt-36">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className={cn("grid md:grid-cols-12 gap-6 lg:gap-12 items-stretch", reverse && "md:[&>*:first-child]:order-2")}
      >
        <div className="md:col-span-8 relative">
          <div className="relative aspect-[4/3] md:aspect-[16/11] overflow-hidden group bg-secondary">
            <SafeImage
              src={primary}
              alt={`${service.name} — Bartey Decor`}
              fallbackLabel={service.name}
              className="w-full h-full object-cover transition-transform duration-[1.8s] ease-out group-hover:scale-[1.04]"
              containerClassName="w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 bg-background/85 text-[10px] tracking-[0.18em] uppercase text-foreground">
              <Images className="w-3 h-3" />
              {service.gallery.length}
            </div>
          </div>
          {thumbs.length > 1 && (
            <div className="mt-3 grid grid-cols-5 gap-2">
              {thumbs.map((src, i) => (
                <button
                  key={`${service.id}-${i}`}
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "aspect-square overflow-hidden border-2 transition-all",
                    i === active ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"
                  )}
                  aria-label={`Show image ${i + 1}`}
                >
                  <SafeImage
                    src={src}
                    alt={`${service.name} thumbnail ${i + 1}`}
                    fallbackLabel={service.name}
                    className="w-full h-full object-cover"
                    containerClassName="w-full h-full"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="md:col-span-4 flex flex-col justify-center">
          <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-primary/70 mb-3">
            {serviceCategories.find((c) => c.id === service.category)?.name}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4 leading-[1.05]">
            {service.name}
          </h2>
          <div className="w-10 h-px bg-gold mb-5" />
          <p className="text-muted-foreground leading-[1.7] mb-6 text-[15px]">
            {service.shortDescription}
          </p>
          {service.price && (
            <p className="mb-6 font-serif text-xl text-gold">{service.price}</p>
          )}
          <Button asChild className="rounded-none px-6 py-6 text-xs tracking-[0.2em] uppercase self-start">
            <Link to={`/contact?service=${encodeURIComponent(service.name)}`}>
              Request a Quote
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </motion.div>
    </article>
  );
};

const FilterButton = ({ children, active, onClick }: { children: React.ReactNode; active: boolean; onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "px-5 h-10 whitespace-nowrap text-[11px] tracking-[0.18em] uppercase border transition-all duration-300",
      active
        ? "bg-primary text-primary-foreground border-primary"
        : "bg-transparent text-foreground border-border hover:border-primary/60 hover:text-primary"
    )}
  >
    {children}
  </button>
);

export default Products;
