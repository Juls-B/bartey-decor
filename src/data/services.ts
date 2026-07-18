// ============================================================
// Bartey Decor — Services Catalogue
// ------------------------------------------------------------
// Every service exposes a stable `slug` used as an anchor id
// on the Services page, so navigating to /services#kitchen-units
// (etc.) scrolls directly to that section.
// ============================================================

import kitchenLuxury from "@/assets/uploaded/kitchen-luxury.jpeg";
import boucleBedSide from "@/assets/uploaded/boucle-bed-side.jpeg";
import boucleBedWide from "@/assets/uploaded/boucle-bed-wide.jpeg";
import greenSofaLuxe from "@/assets/uploaded/green-sofa-luxe.jpeg";
import shagPillows from "@/assets/uploaded/shag-pillows.jfif";
import fringePillows from "@/assets/uploaded/fringe-pillows.jfif";
import linenPillows from "@/assets/uploaded/linen-pillows.jfif";
import diningCream from "@/assets/uploaded/dining-set-cream.jfif";
import diningBrass from "@/assets/uploaded/dining-brass.jfif";
import diningMarble from "@/assets/uploaded/dining-marble.jfif";

export type ServiceCategoryId =
  | "living"
  | "bedroom"
  | "kitchen"
  | "walls"
  | "outdoor"
  | "textiles"
  | "styling";

export interface ServiceCategory {
  id: ServiceCategoryId;
  name: string;
  tagline: string;
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  category: ServiceCategoryId;
  shortDescription: string;
  description: string;
  materials?: string;
  gallery: string[];
  price?: string;
}

export const serviceCategories: ServiceCategory[] = [
  { id: "living", name: "Living & Entertainment", tagline: "Sofas, TV units, tables and entryways" },
  { id: "bedroom", name: "Bedroom & Storage", tagline: "Wardrobes, dressers and bed frames" },
  { id: "kitchen", name: "Kitchen & Dining", tagline: "Fitted kitchens and dining sets" },
  { id: "walls", name: "Walls & Detailing", tagline: "Moulding and premium wall cladding" },
  { id: "textiles", name: "Textiles & Soft Furnishing", tagline: "Curtains, throw pillows and finishing touches" },
  { id: "outdoor", name: "Outdoor", tagline: "Conversation sets and outdoor lounging" },
  { id: "styling", name: "Home Styling", tagline: "Full-room styling and interior curation" },
];

// ------------------------------------------------------------
// Existing folder-based images (fall back to SafeImage tiles
// where the .jfif/.jpg files have not yet been uploaded).
// ------------------------------------------------------------
const serviceAsset = (fileName: string) =>
  new URL(`../assets/services/${fileName}`, import.meta.url).href;

const wardrobeImages = [
  serviceAsset("wardrobe_01.jfif"),
  serviceAsset("wardrobe_02.jfif"),
  serviceAsset("wardrobe_03.jpg"),
  serviceAsset("wardrobe_04.jpg"),
  serviceAsset("wardrobe_05.jpg"),
];

const dresserImages = [
  serviceAsset("dresser_01.jfif"),
  serviceAsset("dresser_02.jfif"),
  serviceAsset("dresser_03.jfif"),
  serviceAsset("dresser_04.jfif"),
];

const sofaImages = [
  greenSofaLuxe,
  serviceAsset("sofa_01.jpeg"),
  serviceAsset("sofa_02.jpeg"),
  serviceAsset("sofa_03.jpeg"),
  serviceAsset("sofa_04.jfif"),
];

const wallMouldingImages = [
  serviceAsset("wall_moulding_01.jfif"),
  serviceAsset("wall_moulding_02.jfif"),
  serviceAsset("wall_moulding_03.jfif"),
];

const tvUnitImages = [
  serviceAsset("tv_unit_01.jfif"),
  serviceAsset("tv_unit_02.jfif"),
  serviceAsset("tv_unit_03.jpg"),
  serviceAsset("tv_unit_04.jpg"),
  serviceAsset("tv_unit_05.jpg"),
];

const entrywayImages = [
  serviceAsset("entryway_01.jfif"),
  serviceAsset("entryway_02.jfif"),
  serviceAsset("entryway_03.jfif"),
];

const consoleTableImages = [
  serviceAsset("console_table_01.jfif"),
  serviceAsset("console_table_02.jfif"),
  serviceAsset("console_table_03.jfif"),
];

const centerTableImages = [
  serviceAsset("center_table_01.jfif"),
  serviceAsset("center_table_02.jfif"),
  serviceAsset("center_table_03.jfif"),
];

const chestDrawersImages = [
  serviceAsset("chest_drawers_01.jfif"),
  serviceAsset("chest_drawers_02.jfif"),
  serviceAsset("chest_drawers_03.jfif"),
];

const bedFrameImages = [
  boucleBedWide,
  boucleBedSide,
  serviceAsset("bed_frame_01.jfif"),
  serviceAsset("bed_frame_02.jfif"),
  serviceAsset("bed_frame_03.jfif"),
  serviceAsset("bed_frame_04.jfif"),
];

const mirrorImages = [
  serviceAsset("mirror_01.jfif"),
  serviceAsset("mirror_02.jfif"),
  serviceAsset("mirror_03.jfif"),
];

const kitchenUnitImages = [
  kitchenLuxury,
  serviceAsset("kitchen_unit_01.jfif"),
  serviceAsset("kitchen_unit_02.jfif"),
  serviceAsset("kitchen_unit_03.jfif"),
  serviceAsset("kitchen_unit_04.jfif"),
  serviceAsset("kitchen_unit_05.jfif"),
];

const wallCladdingImages = [
  serviceAsset("wall_cladding_01.jfif"),
  serviceAsset("wall_cladding_02.jfif"),
  serviceAsset("wall_cladding_03.jfif"),
];

const outdoorSetImages = [
  serviceAsset("outdoor_set_01.jfif"),
  serviceAsset("outdoor_set_02.jfif"),
  serviceAsset("outdoor_set_03.jfif"),
  serviceAsset("outdoor_set_04.jfif"),
];

const diningSetImages = [
  diningMarble,
  diningCream,
  diningBrass,
];

const throwPillowImages = [
  shagPillows,
  fringePillows,
  linenPillows,
];

const curtainImages = [
  serviceAsset("curtains1.jfif"),
  serviceAsset("curtains2.jfif"),
  serviceAsset("curtains3.jfif"),
];

const homeStylingImages = [
  serviceAsset("styling_01.jpg"),
  serviceAsset("styling_02.jpg"),
  serviceAsset("styling_03.jpg"),
];


export const services: Service[] = [
  {
    id: "wardrobes",
    slug: "wardrobes",
    name: "Wardrobes & Walk-in Closets",
    category: "bedroom",
    shortDescription: "Floor-to-ceiling fitted wardrobes and walk-in closets, built to your exact space.",
    description:
      "Fully bespoke wardrobes and walk-in closets, designed around your wardrobe habits and finished in your choice of veneer, lacquer or matte finish. Every internal layout — hanging, drawers, shoe racks, jewellery inserts — is drawn to your brief and installed by our own team.",
    materials: "MDF carcass with matte lacquer, walnut/oak veneer, brushed hardware, integrated LED",
    gallery: wardrobeImages,
  },
  {
    id: "dressers",
    slug: "dressers",
    name: "Dressers",
    category: "bedroom",
    shortDescription: "Elegant dressers and vanities crafted for calm, considered mornings.",
    description:
      "Custom dressers and vanity units with soft-close drawers, integrated mirrors and warm interior lighting. Sized and finished to sit perfectly within your bedroom or dressing room.",
    gallery: dresserImages,
  },
  {
    id: "tv-units",
    slug: "tv-units",
    name: "TV Units",
    category: "living",
    shortDescription: "Floating TV units and feature TV walls with integrated media storage.",
    description:
      "Statement TV walls in marble, slats or lacquer with concealed cable management, floating storage and warm LED wash. Built and installed to your exact wall dimensions.",
    materials: "Porcelain slab, walnut veneer, matte lacquer, warm LED",
    gallery: tvUnitImages,
  },
  {
    id: "sofas",
    slug: "sofa-sets",
    name: "Sofa Sets",
    category: "living",
    shortDescription: "Hand-built modular and classic sofas in premium linen, wool and boucle.",
    description:
      "Kiln-dried hardwood frames, high-resilience foam and expertly stitched upholstery. Configure as three-seaters, corners or L-shapes and pick your fabric — bouclé, linen, wool or velvet.",
    materials: "Hardwood frame, HR foam, premium upholstery",
    gallery: sofaImages,
  },
  {
    id: "wall-moulding",
    slug: "wall-moulding",
    name: "Wall Moulding",
    category: "walls",
    shortDescription: "Classic and contemporary wall moulding for depth, elegance and drama.",
    description:
      "From understated panel moulding to statement feature walls, our carpenters install crisp, symmetrical detailing with painted or lacquered finishes tailored to your room.",
    gallery: wallMouldingImages,
  },
  {
    id: "entryway",
    slug: "entryway",
    name: "Entryway Designs",
    category: "living",
    shortDescription: "First-impression entryways with fitted storage, seating and detailing.",
    description:
      "Considered entryway design — coat storage, bench seating, feature mirrors and lighting — that sets the tone for the rest of your home.",
    gallery: entrywayImages,
  },
  {
    id: "console-tables",
    slug: "console-tables",
    name: "Console Tables",
    category: "living",
    shortDescription: "Sculptural console tables for entryways, hallways and living rooms.",
    description:
      "Slim, statement console tables in solid timber, lacquer and metal — sized to your wall and finished to complement your palette.",
    gallery: consoleTableImages,
  },
  {
    id: "center-tables",
    slug: "center-tables",
    name: "Center Tables",
    category: "living",
    shortDescription: "Coffee and center tables that anchor a living room.",
    description:
      "Round, oval and rectangular center tables in stone, timber and lacquer. Custom sizing and finishing to match your sofa suite.",
    gallery: centerTableImages,
  },
  {
    id: "chest-of-drawers",
    slug: "chester-drawers",
    name: "Chester Drawers",
    category: "bedroom",
    shortDescription: "Refined chester drawers with soft-close runners and warm finishes.",
    description:
      "Bedroom and dressing-room chester drawers built with dovetail joinery, soft-close runners and a finish that ties into the rest of your room.",
    gallery: chestDrawersImages,
  },
  {
    id: "bed-frames",
    slug: "bed-frames",
    name: "Bed Frames",
    category: "bedroom",
    shortDescription: "Upholstered and timber bed frames in king, queen and custom sizes.",
    description:
      "Solid hardwood bed frames with tall upholstered headboards in stonewashed linen, bouclé or wool. Slatted bases for airflow and made to your mattress size.",
    gallery: bedFrameImages,
  },
  {
    id: "mirrors",
    slug: "mirrors",
    name: "Mirrors",
    category: "bedroom",
    shortDescription: "Feature mirrors — arched, floor-standing and framed statement pieces.",
    description:
      "Custom mirrors in warm timber, brushed metal and lacquer frames. Perfect for dressing rooms, entryways, salons and hospitality spaces. Signature piece: the Luxury Decorative Mirror at GH₵ 3,500.",
    price: "From GH₵ 3,500",
    gallery: mirrorImages,
  },
  {
    id: "kitchen-units",
    slug: "kitchen-units",
    name: "Kitchen Units",
    category: "kitchen",
    shortDescription: "Fully fitted bespoke kitchens with premium finishes and hardware.",
    description:
      "End-to-end kitchen design and fabrication — cabinetry, island, pantry, splashback and worktops. Soft-close, integrated appliances and lighting throughout.",
    materials: "MDF carcass, lacquered/veneer fronts, stone worktops, soft-close hardware",
    gallery: kitchenUnitImages,
  },
  {
    id: "dining-sets",
    slug: "dining-sets",
    name: "Dining Sets",
    category: "kitchen",
    shortDescription: "Dining tables and chair sets in marble, timber and upholstered finishes.",
    description:
      "Rectangular, round and extension dining sets seating 4 to 12. Marble, oak and lacquer table tops paired with upholstered dining chairs in your choice of fabric.",
    gallery: diningSetImages,
  },
  {
    id: "wall-cladding",
    slug: "wall-cladding",
    name: "Wall Cladding",
    category: "walls",
    shortDescription: "Timber slat, stone and fluted wall cladding for feature walls.",
    description:
      "Warm timber slat cladding, fluted panels and stone-effect finishes that add depth and texture to living rooms, receptions and bedrooms.",
    gallery: wallCladdingImages,
  },
  {
    id: "curtains",
    slug: "curtains",
    name: "Curtains",
    category: "textiles",
    shortDescription: "Made-to-measure curtains, sheers and blackout drapery.",
    description:
      "Full-height curtains and sheers in premium linen, velvet and woven blends. Motorised tracks, blackout linings and pelmet detailing available.",
    // TODO: replace serviceAsset("curtain_*") placeholders with real curtain photos when available.
    gallery: curtainImages,
  },
  {
    id: "throw-pillows",
    slug: "throw-pillows",
    name: "Throw Pillows",
    category: "textiles",
    shortDescription: "Curated throw pillows in boucle, linen, velvet and mongolian fur.",
    description:
      "A finishing layer for every sofa and bed — texture-rich throw pillows sourced and styled to match your palette. Custom sizing and fabrics on request.",
    gallery: throwPillowImages,
  },
  {
    id: "outdoor-sets",
    slug: "outdoor-sets",
    name: "Outdoor Conversation Sets",
    category: "outdoor",
    shortDescription: "Weather-considered lounge chairs and conversation sets for terraces.",
    description:
      "Outdoor lounge chairs, sofas and low tables built for terraces, gardens and rooftop lounges — upholstered in outdoor-grade fabrics on hardwood frames.",
    gallery: outdoorSetImages,
  },
  {
    id: "home-styling",
    slug: "home-styling",
    name: "Home Styling",
    category: "styling",
    shortDescription: "Full-room styling, art curation and finishing touches.",
    description:
      "We style your finished space — sourcing rugs, art, lighting, planters and accessories — so every room feels curated, layered and complete.",
    // TODO: replace serviceAsset("styling_*") placeholders with real styling photography.
    gallery: homeStylingImages,
  },
];

export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((service) => service.slug === slug);

export const getServicesByCategory = (categoryId: ServiceCategoryId): Service[] =>
  services.filter((service) => service.category === categoryId);
