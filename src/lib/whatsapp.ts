import { CONTACT } from "./contact";

export interface QuoteFormValues {
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  budget?: string;
  location?: string;
  message?: string;
  notes?: string;
}

/**
 * Build a nicely formatted WhatsApp message for a quote request and
 * return a wa.me link ready to open.
 */
export const buildWhatsAppQuoteUrl = (values: QuoteFormValues): string => {
  const lines: string[] = [
    "Hello Bartey Decor, I'd like to request a quote.",
    "",
    `• Name: ${values.name}`,
    `• Phone: ${values.phone}`,
  ];
  if (values.email) lines.push(`• Email: ${values.email}`);
  if (values.service) lines.push(`• Service: ${values.service}`);
  if (values.location) lines.push(`• Location: ${values.location}`);
  if (values.budget) lines.push(`• Budget: ${values.budget}`);
  lines.push("", "Project details:", values.message);
  if (values.notes) {
    lines.push("", "Additional notes:", values.notes);
  }
  lines.push("", "Sent from barteydecor.com");

  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${CONTACT.whatsapp.replace(/[^0-9]/g, "")}?text=${text}`;
};
