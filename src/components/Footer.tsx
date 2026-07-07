import { Link } from "react-router-dom";
import { ArrowRight, Instagram, Phone, MapPin, Mail } from "lucide-react";
import { collections } from "@/data/products";
import { CONTACT } from "@/lib/contact";
import logo from "@/assets/bartey-logo.jpg.asset.json";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      {/* Top bar */}
      <div className="border-b border-background/10">
        <div className="container-full py-12 md:py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <Link to="/" className="flex items-center gap-3">
                <img
                  src={logo.url}
                  alt="Bartey Decor"
                  className="h-12 w-auto object-contain bg-background/95 p-1.5 rounded-sm"
                />
                <span className="font-serif text-3xl md:text-4xl tracking-tight text-background">
                  Bartey Decor
                </span>
              </Link>
              <p className="mt-3 text-sm text-background/50 leading-relaxed max-w-xs">
                {CONTACT.tagline}. Premium custom furniture and interior décor for homes and businesses across Ghana.
              </p>
            </div>

            {/* CTA in footer */}
            <div className="max-w-sm w-full">
              <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-background/40 mb-3">
                Start Your Project
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center justify-between w-full h-12 px-5 text-sm font-medium bg-background text-foreground hover:bg-background/90 transition-colors group"
              >
                <span className="tracking-[0.1em] uppercase text-xs">Request a Quote</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container-full py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Services */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-background/40 mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {collections.map((collection) => (
                <li key={collection.id}>
                  <Link
                    to={`/products?collection=${collection.slug}`}
                    className="text-sm text-background/60 hover:text-background transition-colors duration-300"
                  >
                    {collection.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-background/40 mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm text-background/60 hover:text-background transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/products" className="text-sm text-background/60 hover:text-background transition-colors">Portfolio</Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-background/60 hover:text-background transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-background/60 hover:text-background transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/cart" className="text-sm text-background/60 hover:text-background transition-colors">Your Selection</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-background/40 mb-5">
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

          {/* Follow */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-background/40 mb-5">
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
                <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-background/40 mb-1">Hours</p>
                <p className="text-sm text-background/50">{CONTACT.hours}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
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
