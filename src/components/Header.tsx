import { Link, useLocation } from "react-router-dom";
import { Menu, Search, X, ChevronRight } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CartIcon } from "@/components/CartIcon";
import { services } from "@/data/services";
import { products } from "@/data/products";
import logoAsset from "@/assets/brand/logo.jpeg";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const headerTextClass = scrolled || !isHomePage
    ? "text-foreground hover:text-primary"
    : "text-white/85 hover:text-white";
  const headerBorderClass = scrolled || !isHomePage ? "border-border/70" : "border-white/10";
  const headerBackgroundClass = scrolled || !isHomePage
    ? "bg-background/70 backdrop-blur-md shadow-sm"
    : "bg-transparent backdrop-blur-sm";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!searchOpen) {
      setSearchQuery("");
    }
  }, [searchOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return [];
    }

    const serviceResults = services
      .filter((service) => {
        const haystack = [
          service.name,
          service.shortDescription,
          service.description,
          service.category,
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(query);
      })
      .slice(0, 5)
      .map((service) => ({
        id: service.id,
        type: "Service" as const,
        label: service.name,
        description: service.shortDescription,
        href: `/products?collection=${service.slug}`,
      }));

    const productResults = products
      .filter((product) => {
        const haystack = [product.name, product.description, product.longDescription, product.collection]
          .join(" ")
          .toLowerCase();
        return haystack.includes(query);
      })
      .slice(0, 5)
      .map((product) => ({
        id: product.id,
        type: "Product" as const,
        label: product.name,
        description: product.description,
        href: `/product/${product.slug}`,
      }));

    return [...serviceResults, ...productResults];
  }, [searchQuery]);

  const handleSearchSelect = () => {
    setSearchOpen(false);
    setSearchQuery("");
  };

  const handleMobileToggle = () => {
    setMobileMenuOpen((open) => !open);
    if (mobileMenuOpen) {
      setMobileServicesOpen(false);
    }
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
            <Link to="/" className="flex items-center gap-3 group" aria-label="Bartey Decor — home">
              <img
                src={logoAsset}
                alt="Bartey Decor"
                className={cn(
                  "h-11 md:h-14 w-auto object-contain rounded-full border border-white/80 bg-white/95 p-1 shadow-lg transition-all duration-300",
                  scrolled || !isHomePage ? "ring-1 ring-primary/20" : "ring-0"
                )}
              />
              <span className="hidden sm:flex flex-col leading-tight">
                <span className={cn("font-serif text-xl md:text-2xl tracking-tight transition-colors duration-300", headerTextClass)}>
                  Bartey Decor
                </span>
                <span className={cn("text-[10px] tracking-[0.25em] uppercase", scrolled || !isHomePage ? "text-muted-foreground" : "text-white/70")}>
                  Designing Spaces
                </span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className={cn("bg-transparent text-xs font-medium tracking-[0.15em] uppercase", headerTextClass)}>
                      Services
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-1 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {services.map((service) => (
                          <li key={service.id}>
                            <NavigationMenuLink asChild>
                              <Link
                                to={`/products?collection=${service.slug}`}
                                className="block select-none space-y-1 rounded-sm p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">{service.name}</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {service.shortDescription}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <Link to="/products" className={cn("text-xs font-medium tracking-[0.15em] uppercase transition-colors duration-300 link-underline", headerTextClass)}>
                Portfolio
              </Link>
              <Link to="/about" className={cn("text-xs font-medium tracking-[0.15em] uppercase transition-colors duration-300 link-underline", headerTextClass)}>
                About
              </Link>
              <Link to="/contact" className={cn("text-xs font-medium tracking-[0.15em] uppercase transition-colors duration-300 link-underline", headerTextClass)}>
                Contact
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className={cn(
                  "relative rounded-full p-2 transition-colors duration-300 hover:bg-accent/40",
                  scrolled || !isHomePage ? "text-foreground" : "text-white/90"
                )}
                aria-label="Search services and products"
                onClick={() => setSearchOpen((open) => !open)}
              >
                <Search className="h-5 w-5 transition-transform duration-300 hover:scale-110" />
              </button>

              <CartIcon />

              <button
                type="button"
                className={cn(
                  "rounded-full p-2 transition-colors duration-300 hover:bg-accent/40 md:hidden",
                  scrolled || !isHomePage ? "text-foreground" : "text-white/90"
                )}
                onClick={handleMobileToggle}
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

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                className="md:hidden overflow-hidden border-t border-border/70"
              >
                <div className="max-h-[70vh] overflow-y-auto py-6">
                  <div className="space-y-2">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between rounded-md px-2 py-3 text-left text-sm font-medium transition-colors hover:bg-accent"
                      onClick={() => setMobileServicesOpen((open) => !open)}
                    >
                      <span>Services</span>
                      <ChevronRight className={cn("h-4 w-4 transition-transform duration-300", mobileServicesOpen && "rotate-90")} />
                    </button>

                    <AnimatePresence initial={false}>
                      {mobileServicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-1 border-l border-border/70 ml-3 pl-3 py-2">
                            {services.map((service) => (
                              <Link
                                key={service.id}
                                to={`/products?collection=${service.slug}`}
                                className="block rounded-md px-2 py-2.5 text-sm transition-colors hover:bg-accent"
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  setMobileServicesOpen(false);
                                }}
                              >
                                {service.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="mt-6 space-y-1 border-t border-border/70 pt-6">
                    {[
                      { to: "/products", label: "Portfolio" },
                      { to: "/about", label: "About" },
                      { to: "/contact", label: "Contact" },
                      { to: "/cart", label: "Your Selection" },
                    ].map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        className="block rounded-md px-2 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setMobileServicesOpen(false);
                        }}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/90 backdrop-blur-md"
            onClick={() => setSearchOpen(false)}
          >
            <div className="mx-auto flex min-h-screen max-w-3xl items-start justify-center px-4 py-20 sm:px-6 lg:px-8" onClick={(event) => event.stopPropagation()}>
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
                    placeholder="Search services or products"
                    className="w-full border-none bg-transparent text-sm outline-none"
                  />
                  <button type="button" onClick={() => setSearchOpen(false)} className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-4 max-h-[55vh] space-y-2 overflow-y-auto">
                  {searchQuery.trim() === "" ? (
                    <p className="rounded-lg border border-dashed border-border/70 px-4 py-6 text-sm text-muted-foreground">
                      Search for a service, collection or product to jump straight to it.
                    </p>
                  ) : searchResults.length === 0 ? (
                    <p className="rounded-lg border border-dashed border-border/70 px-4 py-6 text-sm text-muted-foreground">
                      No results found for “{searchQuery}”.
                    </p>
                  ) : (
                    searchResults.map((result) => (
                      <Link
                        key={result.id}
                        to={result.href}
                        onClick={handleSearchSelect}
                        className="flex items-start justify-between rounded-xl border border-border/70 bg-background/70 px-4 py-3 transition-colors hover:bg-accent"
                      >
                        <div>
                          <p className="text-sm font-medium">{result.label}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{result.description}</p>
                        </div>
                        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                          {result.type}
                        </span>
                      </Link>
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
