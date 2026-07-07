import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ChevronLeft, ChevronRight, ArrowRight, ShoppingBag } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { QuantitySelector } from "@/components/QuantitySelector";
import { getProductBySlug, getRelatedProducts, collections, formatPrice } from "@/data/products";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || "");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  const { addItem: addToCart } = useCart();
  const { toast } = useToast();

  if (!product) {
    return (
      <Layout>
        <div className="container-wide py-28 text-center">
          <h1 className="font-serif text-4xl mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The piece you're looking for doesn't exist in our portfolio.
          </p>
          <Button asChild className="rounded-none px-8 text-sm tracking-[0.1em] uppercase">
            <Link to="/products">Browse Portfolio</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const relatedProducts = getRelatedProducts(product.id);
  const collection = collections.find((c) => c.id === product.collection);

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast({ title: "Removed from saved", description: `${product.name} was removed.` });
    } else {
      addToWishlist(product);
      toast({ title: "Saved", description: `${product.name} has been saved.` });
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: "Added to your selection",
      description: `${quantity} × ${product.name} added — proceed to request a quote.`,
    });
    setQuantity(1);
  };

  const nextImage = () =>
    setCurrentImageIndex((p) => (p === product.images.length - 1 ? 0 : p + 1));
  const prevImage = () =>
    setCurrentImageIndex((p) => (p === 0 ? product.images.length - 1 : p - 1));

  return (
    <Layout>
      <div className="container-full py-6 border-b border-border">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Link to="/products" className="hover:text-foreground transition-colors">Portfolio</Link>
          <span className="text-border">/</span>
          {collection && (
            <>
              <Link to={`/products?collection=${collection.slug}`} className="hover:text-foreground transition-colors">
                {collection.name}
              </Link>
              <span className="text-border">/</span>
            </>
          )}
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      <section className="py-10 md:py-16">
        <div className="container-full">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-[4/5] overflow-hidden bg-muted/30 group cursor-zoom-in">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={product.images[currentImageIndex]}
                    alt={product.name}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                  />
                </AnimatePresence>

                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      aria-label="Previous image"
                      className="absolute left-5 top-1/2 -translate-y-1/2 p-3 bg-background/90 backdrop-blur-md hover:bg-background transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      aria-label="Next image"
                      className="absolute right-5 top-1/2 -translate-y-1/2 p-3 bg-background/90 backdrop-blur-md hover:bg-background transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>

                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
                      {product.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          aria-label={`Show image ${index + 1}`}
                          className={cn(
                            "w-8 h-0.5 transition-all duration-500",
                            index === currentImageIndex
                              ? "bg-foreground"
                              : "bg-foreground/20 hover:bg-foreground/40"
                          )}
                        />
                      ))}
                    </div>
                  </>
                )}

                <div className="absolute top-5 left-5 flex flex-col gap-2">
                  {product.new && (
                    <span className="px-3 py-1.5 text-[10px] font-semibold tracking-[0.2em] uppercase bg-foreground text-background">
                      New
                    </span>
                  )}
                </div>
              </div>

              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={cn(
                        "w-24 h-24 overflow-hidden transition-all duration-300",
                        index === currentImageIndex
                          ? "ring-2 ring-foreground ring-offset-2 ring-offset-background"
                          : "opacity-60 hover:opacity-100"
                      )}
                    >
                      <img src={image} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start"
            >
              {collection && (
                <Link
                  to={`/products?collection=${collection.slug}`}
                  className="inline-block text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-5 hover:text-primary/80 transition-colors"
                >
                  {collection.name}
                </Link>
              )}

              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-5 leading-[1.05]">
                {product.name}
              </h1>

              <p className="text-2xl font-serif text-foreground mb-2">
                From {formatPrice(product.price)}
              </p>
              <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-8">
                Custom pricing — final quote after consultation
              </p>

              <div className="w-12 h-px bg-border mb-8" />

              <p className="text-muted-foreground leading-[1.8] mb-10">
                {product.longDescription}
              </p>

              <div className="space-y-5 mb-10 pb-10 border-b border-border">
                <div>
                  <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground block mb-1.5">Materials</span>
                  <span className="text-sm text-foreground">{product.materials}</span>
                </div>
                {product.dimensions && (
                  <div>
                    <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground block mb-1.5">Dimensions</span>
                    <span className="text-sm text-foreground">{product.dimensions}</span>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground block mb-3">Quantity</span>
                <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  className="rounded-none w-full py-6 text-sm tracking-[0.15em] uppercase btn-premium"
                >
                  <ShoppingBag className="w-4 h-4 mr-3" />
                  Add to Selection
                </Button>
                <Button
                  asChild
                  variant="secondary"
                  size="lg"
                  className="rounded-none w-full py-6 text-sm tracking-[0.15em] uppercase"
                >
                  <Link to="/contact">
                    Request a Quote
                    <ArrowRight className="ml-3 w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-none w-full py-6 text-sm tracking-[0.1em] uppercase"
                  onClick={handleWishlistToggle}
                >
                  <Heart className={cn("w-4 h-4 mr-3 transition-all duration-300", inWishlist && "fill-primary text-primary")} />
                  {inWishlist ? "Saved" : "Save for Later"}
                </Button>
              </div>

              <div className="mt-10 pt-8 border-t border-border grid grid-cols-2 gap-6">
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-muted-foreground/60 mb-1">Delivery</p>
                  <p className="text-xs text-muted-foreground">Doorstep delivery across Ghana</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-muted-foreground/60 mb-1">Installation</p>
                  <p className="text-xs text-muted-foreground">Fitted by our own team</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="py-20 md:py-28 bg-linen">
          <div className="container-full">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-3">
                  Related Projects
                </p>
                <h2 className="font-serif text-3xl md:text-4xl text-foreground">
                  More {collection?.name}
                </h2>
              </div>
              <Link
                to={`/products?collection=${collection?.slug}`}
                className="hidden md:flex items-center gap-2 text-sm tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
              {relatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default ProductDetail;
