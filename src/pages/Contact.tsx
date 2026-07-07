import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, MapPin, Mail, Instagram, MessageCircle, ArrowRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CONTACT } from "@/lib/contact";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import warmLivingRoom from "@/assets/warm-living-room.jpg.asset.json";

const services = [
  "Custom Wardrobes",
  "TV Consoles",
  "Living Room Furniture",
  "Home Styling",
  "Bedroom",
  "Commercial Furniture",
  "Full Interior Fit-out",
  "Not sure yet",
];

const Contact = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    location: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    toast({
      title: "Request received",
      description: "Thank you — our team will reach out within one working day.",
    });
    setForm({ name: "", email: "", phone: "", service: "", location: "", message: "" });
    setSubmitting(false);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[45vh] md:h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img src={warmLivingRoom.url} alt="Bartey Decor styled interior" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/30 to-charcoal/20" />
        </div>
        <div className="relative container-full h-full flex flex-col justify-end pb-12 md:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-white/60 mb-3">
              Contact
            </p>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-3 leading-[0.95]">
              Let's Design
              <br />
              <span className="italic">Your Space</span>
            </h1>
            <p className="text-white/70 max-w-lg">
              Request a quote, book a consultation or just say hello. We reply within one working day.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-full">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Contact info */}
            <motion.aside
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5"
            >
              <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-3">
                Get in Touch
              </p>
              <h2 className="font-serif text-3xl md:text-4xl mb-8">Reach the Studio</h2>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-1">Location</p>
                    <p className="text-foreground">{CONTACT.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-1">Call Us</p>
                    <ul className="space-y-1">
                      {CONTACT.phones.map((p) => (
                        <li key={p.tel}>
                          <a href={`tel:${p.tel}`} className="text-foreground hover:text-primary transition-colors">
                            {p.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-1">Email</p>
                    <a href={`mailto:${CONTACT.email}`} className="text-foreground hover:text-primary transition-colors">
                      {CONTACT.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-1">Instagram</p>
                    <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                      {CONTACT.instagramHandle}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Button
                  asChild
                  className="rounded-none py-6 text-xs tracking-[0.15em] uppercase bg-[#25D366] hover:brightness-110 text-white flex-1"
                >
                  <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-none py-6 text-xs tracking-[0.15em] uppercase flex-1"
                >
                  <a href={`tel:${CONTACT.phones[0].tel}`}>
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </a>
                </Button>
              </div>

              {/* Map */}
              <div className="aspect-[4/3] overflow-hidden border border-border">
                <iframe
                  title="Bartey Decor location — Madina, Accra"
                  src="https://www.google.com/maps?q=Madina,%20Accra,%20Ghana&output=embed"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full border-0"
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Studio hours: {CONTACT.hours}
              </p>
            </motion.aside>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-7"
            >
              <div className="bg-linen p-8 md:p-12">
                <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-3">Project Brief</p>
                <h2 className="font-serif text-3xl md:text-4xl mb-8">Request a Quote</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground mb-2">Full Name *</label>
                      <Input name="name" value={form.name} onChange={handleChange} required className="rounded-none h-12 bg-background" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground mb-2">Phone *</label>
                      <Input name="phone" type="tel" value={form.phone} onChange={handleChange} required className="rounded-none h-12 bg-background" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground mb-2">Email *</label>
                      <Input name="email" type="email" value={form.email} onChange={handleChange} required className="rounded-none h-12 bg-background" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground mb-2">Location</label>
                      <Input name="location" value={form.location} onChange={handleChange} placeholder="e.g. East Legon, Accra" className="rounded-none h-12 bg-background" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground mb-2">Service Interested In</label>
                    <Select value={form.service} onValueChange={(v) => setForm((p) => ({ ...p, service: v }))}>
                      <SelectTrigger className="rounded-none h-12 bg-background">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground mb-2">Tell us about your project *</label>
                    <Textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      placeholder="Room, dimensions, style, timeline — anything helps."
                      className="rounded-none min-h-[140px] bg-background"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={submitting}
                    className="w-full rounded-none py-6 text-sm tracking-[0.15em] uppercase btn-premium"
                  >
                    {submitting ? "Sending..." : (
                      <>
                        Send Request
                        <ArrowRight className="ml-3 w-4 h-4" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Prefer a chat? <Link to="/products" className="underline hover:text-foreground">Browse our portfolio</Link> or WhatsApp us above.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
