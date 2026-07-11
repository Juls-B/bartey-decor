import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Images, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SafeImage } from "@/components/SafeImage";
import type { Service } from "@/data/services";

interface ServiceCardProps {
  service: Service;
  index?: number;
}

/**
 * ServiceCard
 * -----------
 * Premium service tile:
 *  - Large primary image with hover thumb-strip preview of the gallery
 *  - "View Gallery" opens an immersive dialog carousel
 *  - CTA to request a quote (routed to /contact)
 */
export const ServiceCard = ({ service, index = 0 }: ServiceCardProps) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const next = () => setActive((i) => (i + 1) % service.gallery.length);
  const prev = () =>
    setActive((i) => (i - 1 + service.gallery.length) % service.gallery.length);

  const primary = service.gallery[0];
  const previews = service.gallery.slice(1, 4);

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: (index % 4) * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="group relative flex flex-col bg-card border border-border/60 hover:border-primary/40 transition-all duration-500 hover:shadow-[0_18px_60px_-30px_hsl(var(--primary)/0.35)]"
      >
        {/* Primary image */}
        <button
          type="button"
          onClick={() => {
            setActive(0);
            setOpen(true);
          }}
          className="relative aspect-[4/5] overflow-hidden bg-secondary block"
          aria-label={`Open ${service.name} gallery`}
        >
          <SafeImage
            src={primary}
            alt={`${service.name} — sample project`}
            fallbackLabel={service.name}
            className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
            containerClassName="absolute inset-0 w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

          {/* Gallery count chip */}
          <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-2.5 py-1 bg-background/85 backdrop-blur-sm text-[10px] tracking-[0.18em] uppercase text-foreground shadow-sm">
            <Images className="w-3 h-3" />
            {service.gallery.length}
          </div>

          {/* Hover overlay CTA */}
          <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between text-primary-foreground">
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/80">
              View gallery
            </span>
            <ArrowUpRight className="w-5 h-5 text-white translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500" />
          </div>
        </button>

        {/* Preview thumb strip */}
        {previews.length > 0 && (
          <div className="grid grid-cols-3 gap-[2px] bg-border/60">
            {previews.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => {
                  setActive(i + 1);
                  setOpen(true);
                }}
                className="aspect-[4/3] overflow-hidden bg-secondary group/thumb"
                aria-label={`Open ${service.name} — image ${i + 2}`}
              >
                <SafeImage
                  src={src}
                  alt={`${service.name} thumbnail ${i + 2}`}
                  fallbackLabel={service.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/thumb:scale-110"
                  containerClassName="w-full h-full"
                />
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="p-6 md:p-7 flex flex-col flex-1">
          <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-primary/70 mb-2">
            Service
          </p>
          <h3 className="font-serif text-2xl md:text-[26px] leading-tight text-foreground mb-3">
            {service.name}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
            {service.shortDescription}
          </p>
          <div className="flex items-center justify-between gap-4 pt-4 border-t border-border/60">
            <button
              type="button"
              onClick={() => {
                setActive(0);
                setOpen(true);
              }}
              className="text-[11px] tracking-[0.22em] uppercase text-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5"
            >
              View gallery
              <Images className="w-3.5 h-3.5" />
            </button>
            <Button
              asChild
              size="sm"
              variant="ghost"
              className="rounded-none px-3 h-9 text-[11px] tracking-[0.22em] uppercase text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Link to={`/contact?service=${encodeURIComponent(service.name)}`}>
                Request quote
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Link>
            </Button>
          </div>
        </div>
      </motion.article>

      {/* Gallery Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-6xl w-[95vw] p-0 bg-background border-border overflow-hidden">
          <DialogTitle className="sr-only">{service.name} — Gallery</DialogTitle>
          <DialogDescription className="sr-only">
            {service.shortDescription}
          </DialogDescription>

          <div className="grid md:grid-cols-[1fr_320px]">
            {/* Main image + controls */}
            <div className="relative bg-charcoal aspect-[4/3] md:aspect-auto md:h-[78vh]">
              <SafeImage
                src={service.gallery[active]}
                alt={`${service.name} — image ${active + 1}`}
                fallbackLabel={service.name}
                className="w-full h-full object-contain"
                containerClassName="absolute inset-0"
              />
              {service.gallery.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-background/85 hover:bg-background flex items-center justify-center transition-colors"
                    aria-label="Previous image"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-background/85 hover:bg-background flex items-center justify-center transition-colors"
                    aria-label="Next image"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </>
              )}
              <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-background/85 text-[10px] tracking-[0.2em] uppercase">
                {active + 1} / {service.gallery.length}
              </div>
            </div>

            {/* Info panel */}
            <div className="p-6 md:p-8 flex flex-col max-h-[78vh] overflow-y-auto">
              <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-primary/70 mb-3">
                Bartey Decor Service
              </p>
              <h2 className="font-serif text-2xl md:text-3xl leading-tight mb-4">
                {service.name}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                {service.description}
              </p>
              {service.materials && (
                <div className="mb-6 pb-6 border-b border-border/60">
                  <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-1.5">
                    Materials
                  </p>
                  <p className="text-sm text-foreground">{service.materials}</p>
                </div>
              )}

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-1.5 mb-6">
                {service.gallery.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActive(i)}
                    className={`aspect-square overflow-hidden border-2 transition-colors ${
                      i === active ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                    aria-label={`View image ${i + 1}`}
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

              <div className="mt-auto space-y-2">
                <Button
                  asChild
                  className="w-full rounded-none h-12 text-xs tracking-[0.2em] uppercase"
                >
                  <Link to={`/contact?service=${encodeURIComponent(service.name)}`}>
                    Request a Quote
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-none h-12 text-xs tracking-[0.2em] uppercase border-foreground/30"
                >
                  <Link to="/contact">Book a Consultation</Link>
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
