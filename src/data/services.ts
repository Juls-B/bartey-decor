// ============================================================
// Bartey Decor — Services Catalogue
// ------------------------------------------------------------
// All service galleries reference images under /public/assets/services/
// using the exact filenames documented in the brief. Drop the real
// images into that folder later — the site will automatically pick
// them up. Missing images fall back to /placeholder.svg (see SafeImage).
// ============================================================

export type ServiceCategoryId =
  | "living"
  | "bedroom"
  | "kitchen"
  | "walls"
  | "outdoor";

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
}

export const serviceCategories: ServiceCategory[] = [
  { id: "living", name: "Living & Entertainment", tagline: "Sofas, TV units, tables and entryways" },
  { id: "bedroom", name: "Bedroom & Storage", tagline: "Wardrobes, dressers and bed frames" },
  { id: "kitchen", name: "Kitchen", tagline: "Fully fitted, bespoke kitchen units" },
  { id: "walls", name: "Walls & Detailing", tagline: "Moulding and premium wall cladding" },
  { id: "outdoor", name: "Outdoor", tagline: "Conversation sets and outdoor lounging" },
];

// ============================================================
// Wardrobes Gallery
// ============================================================
const wardrobeImages = [
  "/assets/services/wardrobe_01.jpg",
  "/assets/services/wardrobe_02.jpg",
  "/assets/services/wardrobe_03.jpg",
  "/assets/services/wardrobe_04.jpg",
  "/assets/services/wardrobe_05.jpg",
];

// ============================================================
// Dressers Gallery
// ============================================================
const dresserImages = [
  "/assets/services/dresser_01.jpg",
  "/assets/services/dresser_02.jpg",
  "/assets/services/dresser_03.jpg",
  "/assets/services/dresser_04.jpg",
];

// ============================================================
// Sofas Gallery
// ============================================================
const sofaImages = [
  "/assets/services/sofa_01.jpg",
  "/assets/services/sofa_02.jpg",
  "/assets/services/sofa_03.jpg",
  "/assets/services/sofa_04.jpg",
];

// ============================================================
// Wall Moulding Gallery
// ============================================================
const wallMouldingImages = [
  "/assets/services/wall_moulding_01.jpg",
  "/assets/services/wall_moulding_02.jpg",
  "/assets/services/wall_moulding_03.jpg",
];

// ============================================================
// TV Units / Entertainment / Media Units Gallery
// ============================================================
const tvUnitImages = [
  "/assets/services/tv_unit_01.jpg",
  "/assets/services/tv_unit_02.jpg",
  "/assets/services/tv_unit_03.jpg",
  "/assets/services/tv_unit_04.jpg",
  "/assets/services/tv_unit_05.jpg",
];

// ============================================================
// Entryway Designs Gallery
// ============================================================
const entrywayImages = [
  "/assets/services/entryway_01.jpg",
  "/assets/services/entryway_02.jpg",
  "/assets/services/entryway_03.jpg",
];

// ============================================================
// Console Tables Gallery
// ============================================================
const consoleTableImages = [
  "/assets/services/console_table_01.jpg",
  "/assets/services/console_table_02.jpg",
  "/assets/services/console_table_03.jpg",
];

// ============================================================
// Center Tables Gallery
// ============================================================
const centerTableImages = [
  "/assets/services/center_table_01.jpg",
  "/assets/services/center_table_02.jpg",
  "/assets/services/center_table_03.jpg",
];

// ============================================================
// Chest of Drawers Gallery
// ============================================================
const chestDrawersImages = [
  "/assets/services/chest_drawers_01.jpg",
  "/assets/services/chest_drawers_02.jpg",
  "/assets/services/chest_drawers_03.jpg",
];

// ============================================================
// Bed Frames Gallery
// ============================================================
const bedFrameImages = [
  "/assets/services/bed_frame_01.jpg",
  "/assets/services/bed_frame_02.jpg",
  "/assets/services/bed_frame_03.jpg",
  "/assets/services/bed_frame_04.jpg",
];

// ============================================================
// Mirrors Gallery
// ============================================================
const mirrorImages = [
  "/assets/services/mirror_01.jpg",
  "/assets/services/mirror_02.jpg",
  "/assets/services/mirror_03.jpg",
];

// ============================================================
// Kitchen Units Gallery
// ============================================================
const kitchenUnitImages = [
  "/assets/services/kitchen_unit_01.jpg",
  "/assets/services/kitchen_unit_02.jpg",
  "/assets/services/kitchen_unit_03.jpg",
  "/assets/services/kitchen_unit_04.jpg",
  "/assets/services/kitchen_unit_05.jpg",
];

// ============================================================
// Wall Cladding Gallery
// ============================================================
const wallCladdingImages = [
  "/assets/services/wall_cladding_01.jpg",
  "/assets/services/wall_cladding_02.jpg",
  "/assets/services/wall_cladding_03.jpg",
];

// ============================================================
// Outdoor Conversation Sets Gallery
// ============================================================
const outdoorSetImages = [
  "/assets/services/outdoor_set_01.jpg",
  "/assets/services/outdoor_set_02.jpg",
  "/assets/services/outdoor_set_03.jpg",
  "/assets/services/outdoor_set_04.jpg",
];

export const services: Service[] = [
  {
    id: "wardrobes",
    slug: "wardrobes",
    name: "Custom Wardrobes & Walk-in Closets",
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
    id: "sofas",
    slug: "sofas",
    name: "Sofas",
    category: "living",
    shortDescription: "Hand-built modular and classic sofas in premium linen, wool and velvet.",
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
    id: "tv-units",
    slug: "tv-units",
    name: "TV Units, Entertainment & Media Units",
    category: "living",
    shortDescription: "Floating TV units, feature TV walls and integrated media storage.",
    description:
      "Statement TV walls in marble, slats or lacquer with concealed cable management, floating storage and warm LED wash. Built and installed to your exact wall dimensions.",
    materials: "Porcelain slab, walnut veneer, matte lacquer, warm LED",
    gallery: tvUnitImages,
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
    slug: "chest-of-drawers",
    name: "Chest of Drawers",
    category: "bedroom",
    shortDescription: "Refined chests of drawers with soft-close drawers and warm finishes.",
    description:
      "Bedroom and dressing-room chests of drawers built with dovetail joinery, soft-close runners and a finish that ties into the rest of your room.",
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
      "Custom mirrors in warm timber, brushed metal and lacquer frames. Perfect for dressing rooms, entryways, salons and hospitality spaces.",
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
    id: "outdoor-sets",
    slug: "outdoor-sets",
    name: "Outdoor Conversation Sets",
    category: "outdoor",
    shortDescription: "Weather-considered lounge chairs and conversation sets for terraces.",
    description:
      "Outdoor lounge chairs, sofas and low tables built for terraces, gardens and rooftop lounges — upholstered in outdoor-grade fabrics on hardwood frames.",
    gallery: outdoorSetImages,
  },
];

export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((service) => service.slug === slug);

export const getServicesByCategory = (categoryId: ServiceCategoryId): Service[] =>
  services.filter((service) => service.category === categoryId);
