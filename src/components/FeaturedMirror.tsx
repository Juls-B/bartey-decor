import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SafeImage } from "@/components/SafeImage";

/**
 * FeaturedMirror
 * --------------
 * Homepage highlight for the signature Luxury Decorative Mirror.
 * TODO: swap `imageUrl` for the real mirror photograph once uploaded.
 */
export const FeaturedMirror = () => {
  return (
    <section id="featured-mirror" className="py-24 md:py-32 bg-linen scroll-mt-24">
      <div className="container-full">
        <div className="grid md:grid-cols-12 gap-8 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="md:col-span-7 relative"
          >
            <div className="relative aspect-[4/5] md:aspect-[5/6] overflow-hidden group">
              <SafeImage
                src=""
                fallbackLabel="Luxury Decorative Mirror"
                alt="Luxury Decorative Mirror by Bartey Decor"
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                containerClassName="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-charcoal/30 via-transparent to-transparent" />
              <div className="absolute top-5 left-5 inline-flex items-center gap-2 rounded-full bg-background/85 backdrop-blur px-3 py-1.5 text-[10px] tracking-[0.25em] uppercase text-foreground shadow-sm">
                <Sparkles className="w-3 h-3 text-gold" />
                Signature Product
              </div>
            </div>
            {/* Gold frame accent */}
            <div className="pointer-events-none absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-gold hidden md:block" />
            <div className="pointer-events-none absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-gold hidden md:block" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="md:col-span-5"
          >
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-4">
              Featured Piece
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-5 leading-[0.95]">
              Luxury Decorative
              <br />
              <span className="italic font-normal">Mirror</span>
            </h2>
            <div className="inline-flex items-baseline gap-3 mb-6">
              <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Price</span>
              <span className="font-serif text-3xl md:text-4xl text-gold">GH₵ 3,500</span>
            </div>
            <p className="text-muted-foreground leading-[1.9] mb-8 max-w-md">
              A hand-crafted statement mirror that transforms entryways, dressing rooms and living spaces. Warm brushed frame, deep bevel, and a scale that anchors the entire room. Made to order in our Adenta workshop.
            </p>
            <ul className="mb-8 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><span className="mt-2 h-1 w-4 bg-gold" /> Solid timber & brushed metal frame</li>
              <li className="flex items-start gap-2"><span className="mt-2 h-1 w-4 bg-gold" /> Custom sizing on request</li>
              <li className="flex items-start gap-2"><span className="mt-2 h-1 w-4 bg-gold" /> Doorstep delivery & installation across Ghana</li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="rounded-none px-8 py-6 text-xs tracking-[0.2em] uppercase btn-premium">
                <Link to="/contact?service=Luxury%20Decorative%20Mirror">
                  Request This Piece
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-none px-8 py-6 text-xs tracking-[0.2em] uppercase">
                <Link to="/products#mirrors">View Mirror Gallery</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
