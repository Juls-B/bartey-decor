# Bartey Decor — Luxury Redesign Plan

Preserve the current structure, navigation, animations, and responsiveness. Layer in a richer, more editorial luxury feel plus the functional fixes you called out.

---

## 1. Brand & Identity

- **New logo**: upload via `lovable-assets`, replace in Header, Footer, favicon.
- **Logo treatment**: remove thick border; render inside a clean circular container (no heavy ring).
- **Location**: replace every "Madina" with "Adenta, Accra, Ghana" (contact lib, footer, contact page, About).
- **Phones**: keep only `+233 55 506 9388`. Remove the other two.
- **Instagram handle**: `@bartey.decor`.
- **Tagline**: "Designing Spaces • Creating Experiences".
- **Color palette** (in `index.css` + `tailwind.config.ts`):
  - Deep Emerald `#0F3B33`
  - Rich Teal `#116466`
  - Warm Gold `#C9A24A`
  - Soft Cream `#F6F1E7`
  - White `#FFFFFF`
  - Charcoal ink for text

---

## 2. Navigation

Keep sticky nav. Items: Home, About, Services, Gallery, Process, Contact. CTA button "Request a Quote". Transparent over hero, solid on scroll (already behaves this way — polish styling to match new palette).

### Search fix
Rebuild the search into a real product/service finder:
- Command-style dropdown listing all services + featured products as user types.
- Selecting a result navigates to `/services#<slug>` (or `/#featured-mirror` for the mirror) and smooth-scrolls to that anchor.
- No more redirect to generic Services page.

---

## 3. Homepage

Same section order; each section elevated.

1. **Hero** — full-bleed cinematic image, soft parallax, gradient overlay, floating gold accent shapes, animated headline "Luxury Furniture Crafted For Beautiful Living", subcopy, two CTAs (Explore Our Collection, Request a Quote).
2. **Featured Product — Luxury Decorative Mirror** (GH₵ 3,500). Split layout: large image left, editorial copy + CTA right, gold price tag, uses uploaded mirror image once provided (placeholder from existing mirror gallery until then).
3. **Services preview** — elegant cards linking into `/services#slug`.
4. **Premium Gallery** — masonry / editorial mix, hover zoom, lightbox modal, lazy loaded.
5. **Sliding Portfolio** — CSS marquee, pause on hover, large image cards.
6. **Inspiration Carousel** — second slower marquee row (Living, Bedroom, Kitchen, Wardrobes, Curtains, Dining, Commercial).
7. **Video Showcase** — thumbnail cards with play icon; click opens a lightweight modal saying "Project video coming soon". No `<video>` streaming.
8. **Business Statistics** — animated counters + CSS circular progress (Projects Completed, Satisfied Clients, Furniture Installed, Commercial Projects, Residential Projects, Years of Experience).
9. **Testimonials** — carousel with stars, large quote marks, avatar placeholders.
10. **Behind the Craft** — worker images in an editorial grid.
11. **Process Timeline** — Consultation → Design → Approval → Production → Installation → Final Delivery.
12. **CTA band** → Contact.

---

## 4. Services

Expand `src/data/services.ts` to include all requested items (add missing: Curtains, Dining Sets, Throw Pillows, Home Styling, split Entertainment/Media Units from TV Units, add Chester Drawers alias).

- Services page renders each service as its own anchored section (`id={slug}`), so every product gets a deep-link like `/services#curtains`.
- Category filter tabs stay.
- Each section: gallery (hover zoom + lightbox), description, CTA "Request this piece" → prefilled contact form.

---

## 5. Contact — WhatsApp Flow

Form fields: Name, Phone, Email (optional), Service (select from services list), Project Details, Budget (optional), Notes.

On submit, build a formatted message:

```
Hello Bartey Decor, I'd like to request a quote.

Name: ...
Phone: ...
Email: ...
Service: ...
Project details: ...
Budget: ...
Notes: ...
```

Open `https://wa.me/233555069388?text=<encoded>` in a new tab. Show a toast confirming redirect. Zod validation client-side.

Contact page also shows: Adenta address, single phone, Instagram, hours, and an embedded map iframe (Google Maps for Adenta).

---

## 6. Footer

Logo (new circular), tagline, nav, services quick links, contact block (Adenta + single phone + Instagram), copyright. Palette refreshed.

---

## 7. New / Modified files

**New**
- `src/components/SearchCommand.tsx` — real product/service search
- `src/components/Marquee.tsx` — CSS sliding row (used by Portfolio + Inspiration)
- `src/components/Lightbox.tsx` — simple image lightbox
- `src/components/StatsSection.tsx` — animated counters + circular progress
- `src/components/TestimonialsCarousel.tsx`
- `src/components/VideoShowcase.tsx`
- `src/components/ProcessTimeline.tsx`
- `src/components/FeaturedMirror.tsx`
- `src/lib/whatsapp.ts` — message builder + link opener
- `src/assets/brand/logo-new.png.asset.json` — uploaded logo pointer

**Modified**
- `src/index.css`, `tailwind.config.ts` — new palette tokens + marquee keyframes
- `src/components/Header.tsx` — new logo, circular treatment, wired search
- `src/components/Footer.tsx` — new details, palette, single phone, Adenta
- `src/pages/Index.tsx` — new section composition
- `src/pages/Products.tsx` (Services) — anchored sections per service
- `src/pages/Contact.tsx` — WhatsApp submission
- `src/pages/About.tsx` — refreshed founder + values
- `src/data/services.ts` — new services (Curtains, Dining Sets, Throw Pillows, Home Styling, etc.)
- `src/lib/contact.ts` — Adenta, single phone, new IG handle
- `index.html` — favicon, meta

---

## 8. Performance guardrails

- No new heavy libs. Only current stack (React, Tailwind, Framer Motion already present, shadcn).
- Marquees, counters, progress rings: CSS + minimal JS.
- All images `loading="lazy" decoding="async"`, via `SafeImage`.
- Lightbox is a plain dialog, not a library.
- Video section is thumbnails + modal only.

---

## 9. Assumptions / notes

- Uploaded images in this message (kitchen, boucle bed, green sofa, dining sets, pillows) will be uploaded to `lovable-assets` and slotted into the corresponding service galleries (Kitchen Units, Bed Frames, Sofas, Dining Sets, Throw Pillows).
- New Bartey Decor logo file: I'll use the **existing** `src/assets/brand/logo.png.asset.json` as the current logo. If you have a newer file, drop it in and I'll swap the pointer — otherwise I'll continue with the current logo but apply the circular no-border treatment now.
- Any service without provided photos keeps the `SafeImage` fallback so the layout doesn't break; I'll leave `TODO:` comments where real photos should replace placeholders.
- If any single subsection can't fit in one pass, I'll ship what I can and leave `TODO:` markers rather than break the site.
