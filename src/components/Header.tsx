import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Search, X, ChevronRight, ArrowRight } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CartIcon } from "@/components/CartIcon";
import { services } from "@/data/services";
import logoAsset from "@/assets/brand/logo.jpeg";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

// Featured, jump-to-anchor destinations that are not services
const homeAnchors = [
  { id: "featured-mirror", label: "Luxury Decorative Mirror", type: "Featured" as const, href: "/#featured-mirror", description: "Signature product — GH₵ 3,500" },
  { id: "gallery", label: "Premium Gallery", type: "Section" as const, href: "/#gallery", description: "Editorial project imagery" },
  { id: "process", label: "Our Process", type: "Section" as const, href: "/#process", description: "From consultation to delivery" },
  { id: "portfolio", label: "Sliding Portfolio", type: "Section" as const, href: "/#portfolio", description: "Recent installations" },
];

const primaryNav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Services" },
  { to: "/#gallery", label: "Gallery" },
  { to: "/#process", label: "Process" },
  { to: "/contact", label: "Contact" },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  const solid = scrolled || !isHomePage;
  const headerTextClass = solid
    ? "text-foreground hover:text-primary"
    : "text-white/85 hover:text-white";
  const headerBorderClass = solid ? "border-border/70" : "border-white/10";
  const headerBackgroundClass = solid
    ? "bg-background/85 backdrop-blur-md shadow-sm"
    : "bg-transparent backdrop-blur-sm";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!searchOpen) setSearchQuery("");
  }, [searchOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
        setMobileMenuOpen(false);
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // After navigation to /services#slug (or /#anchor), scroll to the hash target.
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [location.pathname, location.hash]);

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];

    const serviceResults = services
      .filter((service) => {
        const haystack = [service.name, service.shortDescription, service.description, service.category]
          .join(" ")
          .toLowerCase();
        return haystack.includes(query);
      })
      .slice(0, 8)
      .map((service) => ({
        id: `svc-${service.id}`,
        type: "Service" as const,
        label: service.name,
        description: service.shortDescription,
        href: `/products#${service.slug}`,
      }));

    const anchorResults = homeAnchors
      .filter((a) => a.label.toLowerCase().includes(query) || a.description.toLowerCase().includes(query))
      .map((a) => ({ id: a.id, type: a.type, label: a.label, description: a.description, href: a.href }));

    return [...anchorResults, ...serviceResults];
  }, [searchQuery]);

  const handleSearchSelect = (href: string) => {
    setSearchOpen(false);
    setSearchQuery("");
    // Use navigate so react-router picks up hash changes on the current page.
    navigate(href);
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-500 border-b",
          headerBackgroundClass,
          headerBorderClass
        )}
      >
        <nav className="container-full">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo — clean circular treatment, no thick border */}
            <Link to="/" className="flex items-center gap-3 group" aria-label="Bartey Decor — home">
              <span className="relative inline-flex h-11 w-11 md:h-14 md:w-14 items-center justify-center overflow-hidden rounded-full bg-white shadow-[0_2px_16px_-4px_rgba(0,0,0,0.15)]">
                <img
                  src={logoAsset}
                  alt="Bartey Decor"
                  className="h-full w-full object-cover"
                />
              </span>
              <span className="hidden sm:flex flex-col leading-tight">
                <span className={cn("font-serif text-xl md:text-2xl tracking-tight transition-colors duration-300", headerTextClass)}>
                  Bartey Decor
                </span>
                <span className={cn("text-[10px] tracking-[0.25em] uppercase", solid ? "text-muted-foreground" : "text-white/70")}>
                  Designing Spaces • Creating Experiences
                </span>
              </span>
            </Link>

            {/* Primary nav */}
            <div className="hidden lg:flex items-center gap-7">
              {primaryNav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn("text-xs font-medium tracking-[0.15em] uppercase transition-colors duration-300 link-underline", headerTextClass)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className={cn("relative rounded-full p-2 transition-colors duration-300 hover:bg-accent/40", solid ? "text-foreground" : "text-white/90")}
                aria-label="Search services and products"
                onClick={() => setSearchOpen((open) => !open)}
              >
                <Search className="h-5 w-5" />
              </button>

              <CartIcon />

              <Button
                asChild
                size="sm"
                className={cn(
                  "hidden md:inline-flex rounded-none h-10 px-5 text-[11px] tracking-[0.18em] uppercase btn-premium",
                  solid ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-gold text-charcoal hover:bg-gold/90"
                )}
              >
                <Link to="/contact">
                  Request a Quote
                  <ArrowRight className="ml-2 w-3.5 h-3.5" />
                </Link>
              </Button>

              <button
                type="button"
                className={cn("rounded-full p-2 transition-colors duration-300 hover:bg-accent/40 lg:hidden", solid ? "text-foreground" : "text-white/90")}
                onClick={() => setMobileMenuOpen((v) => !v)}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {mobileMenuOpen ? (
                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <X className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Menu className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                className="lg:hidden overflow-hidden border-t border-border/70 bg-background"
              >
                <div className="max-h-[75vh] overflow-y-auto py-6">
                  <div className="space-y-1">
                    {primaryNav.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="block rounded-md px-2 py-2.5 text-sm font-medium tracking-wide transition-colors hover:bg-accent"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 border-t border-border/70 pt-4">
                    <p className="px-2 mb-2 text-[10px] font-semibold tracking-[0.25em] uppercase text-muted-foreground">
                      Services
                    </p>
                    <div className="space-y-1">
                      {services.map((service) => (
                        <Link
                          key={service.id}
                          to={`/products#${service.slug}`}
                          className="block rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {service.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <Button
                    asChild
                    className="mt-6 w-full rounded-none h-12 text-xs tracking-[0.2em] uppercase"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link to="/contact">Request a Quote</Link>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Real product search */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-charcoal/60 backdrop-blur-md"
            onClick={() => setSearchOpen(false)}
          >
            <div
              className="mx-auto flex min-h-screen max-w-3xl items-start justify-center px-4 py-20 sm:px-6 lg:px-8"
              onClick={(event) => event.stopPropagation()}
            >
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="w-full rounded-2xl border border-border/70 bg-background/95 p-4 shadow-2xl sm:p-6"
              >
                <div className="flex items-center gap-3 rounded-full border border-border bg-background px-4 py-3 shadow-sm">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <input
                    autoFocus
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search a product — e.g. Kitchen, Mirror, Curtains…"
                    className="w-full border-none bg-transparent text-sm outline-none"
                  />
                  <kbd className="hidden sm:inline-flex items-center rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">ESC</kbd>
                </div>

                <div className="mt-4 max-h-[55vh] space-y-2 overflow-y-auto">
                  {searchQuery.trim() === "" ? (
                    <div className="rounded-lg border border-dashed border-border/70 px-4 py-6 text-sm text-muted-foreground">
                      <p className="mb-3">Quick jumps:</p>
                      <div className="flex flex-wrap gap-2">
                        {["Kitchen Unit", "Mirror", "Sofa", "Curtains", "Wardrobe", "Dining"].map((q) => (
                          <button
                            key={q}
                            type="button"
                            onClick={() => setSearchQuery(q)}
                            className="rounded-full border border-border px-3 py-1 text-xs uppercase tracking-widest text-foreground hover:bg-accent"
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : searchResults.length === 0 ? (
                    <p className="rounded-lg border border-dashed border-border/70 px-4 py-6 text-sm text-muted-foreground">
                      No results for "{searchQuery}". Try "kitchen", "mirror", "sofa"…
                    </p>
                  ) : (
                    searchResults.map((result) => (
                      <button
                        key={result.id}
                        type="button"
                        onClick={() => handleSearchSelect(result.href)}
                        className="flex w-full items-start justify-between rounded-xl border border-border/70 bg-background/70 px-4 py-3 text-left transition-colors hover:bg-accent"
                      >
                        <div>
                          <p className="text-sm font-medium">{result.label}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{result.description}</p>
                        </div>
                        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                          {result.type}
                        </span>
                      </button>
                    ))
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
