import { Link } from "react-router-dom";
import { ArrowRight, Instagram, Phone, MapPin, Mail } from "lucide-react";
import { services } from "@/data/services";
import logoAsset from "@/assets/brand/logo.jpeg";
import { CONTACT } from "@/lib/contact";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Services" },
  { to: "/#gallery", label: "Gallery" },
  { to: "/#process", label: "Process" },
  { to: "/contact", label: "Contact" },
];

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      {/* Top bar */}
      <div className="border-b border-background/10">
        <div className="container-full py-12 md:py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <Link to="/" className="flex items-center gap-3">
                <span className="inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white">
                  <img src={logoAsset} alt="Bartey Decor" className="h-full w-full object-cover" />
                </span>
                <span className="font-serif text-3xl md:text-4xl tracking-tight text-background">
                  Bartey Decor
                </span>
              </Link>
              <p className="mt-3 text-sm text-background/50 leading-relaxed max-w-xs">
                {CONTACT.tagline}. Premium custom furniture and interior décor for homes and businesses across Ghana.
              </p>
            </div>

            <div className="max-w-sm w-full">
              <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-gold mb-3">
                Start Your Project
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center justify-between w-full h-12 px-5 text-sm font-medium bg-gold text-charcoal hover:bg-gold/90 transition-colors group"
              >
                <span className="tracking-[0.1em] uppercase text-xs">Request a Quote</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container-full py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-gold mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {services.slice(0, 10).map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/products#${service.slug}`}
                    className="text-sm text-background/60 hover:text-background transition-colors duration-300"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-gold mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-background/60 hover:text-background transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-gold mb-5">
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-background/60">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{CONTACT.location}</span>
              </li>
              {CONTACT.phones.map((p) => (
                <li key={p.tel} className="flex items-center gap-2">
                  <Phone className="w-4 h-4 flex-shrink-0 text-background/40" />
                  <a href={`tel:${p.tel}`} className="text-background/60 hover:text-background transition-colors">
                    {p.label}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0 text-background/40" />
                <a href={`mailto:${CONTACT.email}`} className="text-background/60 hover:text-background transition-colors">
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-gold mb-5">
              Follow
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-background/60 hover:text-background transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  {CONTACT.instagramHandle}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-background/60 hover:text-background transition-colors"
                >
                  WhatsApp Us
                </a>
              </li>
              <li className="pt-3">
                <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-gold mb-1">Hours</p>
                <p className="text-sm text-background/50">{CONTACT.hours}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="container-full py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-background/30">
            © {new Date().getFullYear()} Bartey Decor. All rights reserved. A registered Ghanaian company.
          </p>
          <div className="flex gap-8">
            <span className="text-xs text-background/30">Founded by {CONTACT.founder}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
