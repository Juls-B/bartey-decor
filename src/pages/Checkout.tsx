import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, AlertCircle } from "lucide-react";
import { Layout } from "@/components/Layout";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { formatPrice } from "@/data/products";
import { CONTACT } from "@/lib/contact";

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { items, getSubtotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    region: "",
    notes: "",
  });

  const subtotal = getSubtotal();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container-narrow py-28 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-serif text-4xl mb-4">Nothing to Quote</h1>
            <p className="text-muted-foreground mb-8">
              Your selection is empty. Browse the portfolio and add pieces before requesting a quote.
            </p>
            <Button asChild size="lg" className="rounded-none px-10 py-6 text-sm tracking-[0.15em] uppercase btn-premium">
              <Link to="/products">
                Browse Portfolio
                <ArrowRight className="ml-3 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </Layout>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast({
      title: "Quote Request Submitted",
      description: "Thank you! Our team will contact you within one working day.",
    });
    clearCart();
    setIsSubmitting(false);
    navigate("/");
  };

  return (
    <Layout>
      <div className="container-full py-6 border-b border-border">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Link to="/cart" className="hover:text-foreground transition-colors">Your Selection</Link>
          <span className="text-border">/</span>
          <span className="text-foreground">Request Quote</span>
        </div>
      </div>

      <div className="bg-primary/5 border-b border-primary/10">
        <div className="container-full py-4">
          <div className="flex items-start gap-3 text-sm">
            <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <p>
              <span className="font-medium">All Bartey Decor projects are custom-built.</span>{" "}
              <span className="text-muted-foreground">
                Submit your selection and details below — we'll contact you with a firm quote, timeline and design plan within one working day.
              </span>
            </p>
          </div>
        </div>
      </div>

      <section className="py-10 md:py-16">
        <div className="container-full">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-4xl md:text-5xl mb-12"
          >
            Request Your Quote
          </motion.h1>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-7"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <h2 className="font-serif text-xl mb-6">Your Details</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground mb-2">First Name *</label>
                      <Input name="firstName" value={formData.firstName} onChange={handleInputChange} required className="rounded-none h-12" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground mb-2">Last Name *</label>
                      <Input name="lastName" value={formData.lastName} onChange={handleInputChange} required className="rounded-none h-12" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground mb-2">Email *</label>
                      <Input name="email" type="email" value={formData.email} onChange={handleInputChange} required className="rounded-none h-12" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground mb-2">Phone *</label>
                      <Input name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required className="rounded-none h-12" />
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="font-serif text-xl mb-6">Delivery & Installation Address</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground mb-2">Street Address *</label>
                      <Input name="address" value={formData.address} onChange={handleInputChange} required className="rounded-none h-12" />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground mb-2">City / Area *</label>
                        <Input name="city" value={formData.city} onChange={handleInputChange} required placeholder="e.g. East Legon, Accra" className="rounded-none h-12" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground mb-2">Region *</label>
                        <Input name="region" value={formData.region} onChange={handleInputChange} required placeholder="e.g. Greater Accra" className="rounded-none h-12" />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="font-serif text-xl mb-6">Project Notes</h2>
                  <Textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Dimensions, finishes, timeline, style preferences — anything helps."
                    className="rounded-none min-h-[140px]"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full rounded-none py-6 text-sm tracking-[0.15em] uppercase btn-premium"
                >
                  {isSubmitting ? "Submitting..." : (
                    <>
                      Submit Quote Request
                      <ArrowRight className="ml-3 w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="bg-linen p-8 lg:sticky lg:top-28">
                <h2 className="font-serif text-2xl mb-6">Your Selection</h2>

                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4">
                      <div className="w-16 h-20 bg-muted/30 overflow-hidden">
                        <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium line-clamp-1">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Qty: {item.quantity}</p>
                        <p className="text-sm mt-1">
                          From {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Estimated total</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Final pricing (including delivery, installation and any customisation) is confirmed in your quote.
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-muted-foreground/60 mb-3">Prefer to talk?</p>
                  <a href={`tel:${CONTACT.phones[0].tel}`} className="text-sm text-foreground underline">
                    {CONTACT.phones[0].label}
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">or WhatsApp us anytime.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Checkout;
