import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { Phone, MapPin, Mail, Instagram, MessageCircle, ArrowRight } from "lucide-react";
import { z } from "zod";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CONTACT } from "@/lib/contact";
import { services } from "@/data/services";
import { buildWhatsAppQuoteUrl } from "@/lib/whatsapp";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import warmLivingRoom from "@/assets/warm-living-room.jpeg";

const budgetOptions = [
  "Under GH₵ 5,000",
  "GH₵ 5,000 – 15,000",
  "GH₵ 15,000 – 40,000",
  "GH₵ 40,000 – 100,000",
  "Over GH₵ 100,000",
  "Not sure yet",
];

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z.string().trim().min(6, "Please enter a valid phone number").max(24),
  email: z.string().trim().email("Invalid email").max(120).optional().or(z.literal("")),
  service: z.string().max(120).optional().or(z.literal("")),
  location: z.string().max(120).optional().or(z.literal("")),
  budget: z.string().max(60).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Please tell us a little about your project").max(2000),
  notes: z.string().max(500).optional().or(z.literal("")),
});

const Contact = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get("service") ?? "";

  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: preselectedService,
    location: "",
    budget: "",
    message: "",
    notes: "",
  });

  useEffect(() => {
    if (preselectedService) {
      setForm((p) => ({ ...p, service: preselectedService }));
    }
  }, [preselectedService]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const first = parsed.error.errors[0];
      toast({
        title: "Please check the form",
        description: first?.message ?? "Some fields need attention.",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    const url = buildWhatsAppQuoteUrl(parsed.data);
    // Small delay so users see the submit state before the tab opens
    await new Promise((r) => setTimeout(r, 400));
    window.open(url, "_blank", "noopener,noreferrer");
    toast({
      title: "Opening WhatsApp",
      description: "Your quote request is ready to send — just tap Send in WhatsApp.",
    });
    setSubmitting(false);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[45vh] md:h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img src={warmLivingRoom} alt="Bartey Decor styled interior" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/30 to-charcoal/20" />
        </div>
        <div className="relative container-full h-full flex flex-col justify-end pb-12 md:pb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-gold mb-3">
              Contact
            </p>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-3 leading-[0.95]">
              Let's Design
              <br />
              <span className="italic">Your Space</span>
            </h1>
            <p className="text-white/70 max-w-lg">
              Send a quote request and we'll open a ready-to-send WhatsApp message with your details. Fast, direct, no waiting on email.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-full">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
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
                <ContactRow icon={<MapPin className="w-4 h-4" />} label="Location" value={CONTACT.location} />
                <ContactRow
                  icon={<Phone className="w-4 h-4" />}
                  label="Call Us"
                  value={
                    <a href={`tel:${CONTACT.phones[0].tel}`} className="text-foreground hover:text-primary transition-colors">
                      {CONTACT.phones[0].label}
                    </a>
                  }
                />
                <ContactRow
                  icon={<Mail className="w-4 h-4" />}
                  label="Email"
                  value={
                    <a href={`mailto:${CONTACT.email}`} className="text-foreground hover:text-primary transition-colors">
                      {CONTACT.email}
                    </a>
                  }
                />
                <ContactRow
                  icon={<Instagram className="w-4 h-4" />}
                  label="Instagram"
                  value={
                    <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                      {CONTACT.instagramHandle}
                    </a>
                  }
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Button asChild className="rounded-none py-6 text-xs tracking-[0.15em] uppercase bg-[#25D366] hover:brightness-110 text-white flex-1">
                  <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </a>
                </Button>
                <Button asChild variant="outline" className="rounded-none py-6 text-xs tracking-[0.15em] uppercase flex-1">
                  <a href={`tel:${CONTACT.phones[0].tel}`}>
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </a>
                </Button>
              </div>

              <div className="aspect-[4/3] overflow-hidden border border-border">
                <iframe
                  title="Bartey Decor location — Adenta, Accra"
                  src="https://www.google.com/maps?q=Adenta,%20Accra,%20Ghana&output=embed"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full border-0"
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Studio hours: {CONTACT.hours}</p>
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
                <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-3">
                  Project Brief
                </p>
                <h2 className="font-serif text-3xl md:text-4xl mb-3">Request a Quote</h2>
                <p className="text-sm text-muted-foreground mb-8">
                  Fill this in and we'll open a formatted WhatsApp message with your details ready to send to us.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Full Name *">
                      <Input name="name" value={form.name} onChange={handleChange} required className="rounded-none h-12 bg-background" />
                    </Field>
                    <Field label="Phone *">
                      <Input name="phone" type="tel" value={form.phone} onChange={handleChange} required className="rounded-none h-12 bg-background" />
                    </Field>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Email (optional)">
                      <Input name="email" type="email" value={form.email} onChange={handleChange} className="rounded-none h-12 bg-background" />
                    </Field>
                    <Field label="Location">
                      <Input name="location" value={form.location} onChange={handleChange} placeholder="e.g. Adenta, Accra" className="rounded-none h-12 bg-background" />
                    </Field>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Service Interested In">
                      <Select value={form.service} onValueChange={(v) => setForm((p) => ({ ...p, service: v }))}>
                        <SelectTrigger className="rounded-none h-12 bg-background">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((s) => (
                            <SelectItem key={s.id} value={s.name}>{s.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Budget (optional)">
                      <Select value={form.budget} onValueChange={(v) => setForm((p) => ({ ...p, budget: v }))}>
                        <SelectTrigger className="rounded-none h-12 bg-background">
                          <SelectValue placeholder="Select a budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          {budgetOptions.map((b) => (
                            <SelectItem key={b} value={b}>{b}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>

                  <Field label="Tell us about your project *">
                    <Textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      placeholder="Room, dimensions, style, timeline — anything helps."
                      className="rounded-none min-h-[140px] bg-background"
                    />
                  </Field>

                  <Field label="Additional notes (optional)">
                    <Textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      placeholder="Preferred call time, references, links…"
                      className="rounded-none min-h-[80px] bg-background"
                    />
                  </Field>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={submitting}
                    className="w-full rounded-none py-6 text-sm tracking-[0.15em] uppercase bg-[#25D366] hover:brightness-110 text-white"
                  >
                    {submitting ? "Opening WhatsApp…" : (
                      <>
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Send via WhatsApp
                        <ArrowRight className="ml-3 w-4 h-4" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Prefer to browse first? <Link to="/products" className="underline hover:text-foreground">See our services</Link>.
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

const ContactRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) => (
  <div className="flex items-start gap-4">
    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
      {icon}
    </div>
    <div>
      <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-1">{label}</p>
      <div className="text-foreground">{value}</div>
    </div>
  </div>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="block text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground mb-2">{label}</label>
    {children}
  </div>
);

export default Contact;
