import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ServiceCard } from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { services, serviceCategories, type ServiceCategoryId } from "@/data/services";
import { cn } from "@/lib/utils";
import warmLivingRoom from "@/assets/warm-living-room.jfif";

type Filter = "all" | ServiceCategoryId;

const Products = () => {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(
    () => (filter === "all" ? services : services.filter((s) => s.category === filter)),
    [filter]
  );

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[45vh] md:h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={warmLivingRoom}
            alt="Bartey Decor bespoke interiors"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-charcoal/30" />
        </div>

        <div className="relative container-full h-full flex flex-col justify-end pb-14 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          >
            <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-gold mb-3">
              Our Services
            </p>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-4 leading-[0.95] max-w-3xl">
              Bespoke furniture <br className="hidden md:block" /> & interior craftsmanship
            </h1>
            <p className="text-base md:text-lg text-white/75 max-w-xl">
              From custom wardrobes to full kitchen fit-outs — every piece designed,
              built and installed by the Bartey Decor team in Accra.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category tabs */}
      <section className="py-6 border-b border-border sticky top-16 md:top-20 bg-background/95 backdrop-blur-md z-40">
        <div className="container-full">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide -mb-2 pb-2">
            <FilterButton active={filter === "all"} onClick={() => setFilter("all")}>
              All Services
            </FilterButton>
            {serviceCategories.map((cat) => (
              <FilterButton
                key={cat.id}
                active={filter === cat.id}
                onClick={() => setFilter(cat.id)}
              >
                {cat.name}
              </FilterButton>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 md:py-24">
        <div className="container-full">
          <div className="flex items-end justify-between mb-10 md:mb-14 gap-6 flex-wrap">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-primary/70 mb-2">
                {filter === "all" ? "All Services" : serviceCategories.find((c) => c.id === filter)?.name}
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground">
                {filtered.length} {filtered.length === 1 ? "service" : "services"} on offer
              </h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              Tap any service to open its gallery, or request a tailored quote for your space.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {filtered.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative h-[55vh] overflow-hidden">
        <div className="absolute inset-0">
          <img src={warmLivingRoom} alt="Interior styled by Bartey Decor" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-charcoal/70" />
        </div>
        <div className="relative h-full flex items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-gold mb-4">
              Ready to begin?
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-white mb-6">
              Let's design your space
            </h2>
            <Button
              asChild
              size="lg"
              className="rounded-none px-10 py-6 text-sm tracking-[0.15em] uppercase bg-gold text-charcoal hover:bg-gold/90"
            >
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

const FilterButton = ({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) => (
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
