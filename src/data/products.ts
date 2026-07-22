import wardrobeFitted from "@/assets/wardrobe-fitted.jfif";
import tvConsoleModern from "@/assets/tv-console-modern.jpeg";
import tvConsoleMarble from "@/assets/tv-console-marble.jfif";
import warmLivingRoom from "@/assets/warm-living-room.jpeg";
import greenSofa from "@/assets/green-sofa.jfif";
import yellowLounge from "@/assets/yellow-lounge.jfif";
import armchairBoucle from "@/assets/armchair-boucle.jfif";
import greyAccentChair from "@/assets/grey-accent-chair.jfif";
import officeReception from "@/assets/office-reception.png";

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  heroImage?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  collection: string;
  price: number;
  description: string;
  longDescription: string;
  materials: string;
  dimensions?: string;
  images: string[];
  featured?: boolean;
  new?: boolean;
}

// Service categories double as portfolio collections
export const collections: Collection[] = [
  {
    id: "wardrobes",
    name: "Custom Wardrobes",
    slug: "wardrobes",
    description: "Modern fitted wardrobes tailored to your space",
    image: wardrobeFitted,
    heroImage: wardrobeFitted,
  },
  {
    id: "tv-consoles",
    name: "TV Consoles",
    slug: "tv-consoles",
    description: "Floating TV units and sculptural media walls",
    image: tvConsoleMarble,
    heroImage: tvConsoleMarble,
  },
  {
    id: "living-room",
    name: "Living Room Furniture",
    slug: "living-room",
    description: "Modular sofas, centre tables and storage that anchor a home",
    image: warmLivingRoom,
    heroImage: warmLivingRoom,
  },
  {
    id: "home-styling",
    name: "Home Styling",
    slug: "home-styling",
    description: "Accent chairs, décor and shelving that finish a room",
    image: armchairBoucle,
    heroImage: armchairBoucle,
  },
  {
    id: "bedroom",
    name: "Bedroom",
    slug: "bedroom",
    description: "Beds, dressers and dressing spaces built for calm",
    image: wardrobeFitted,
    heroImage: wardrobeFitted,
  },
  {
    id: "commercial",
    name: "Commercial Furniture",
    slug: "commercial",
    description: "Offices, receptions, waiting areas and salons",
    image: officeReception,
    heroImage: officeReception,
  },
];

export const products: Product[] = [
  // Custom Wardrobes
  {
    id: "atelier-wardrobe",
    name: "Atelier Fitted Wardrobe",
    slug: "atelier-fitted-wardrobe",
    collection: "wardrobes",
    price: 28500,
    description: "Floor-to-ceiling fitted wardrobe with warm timber inserts",
    longDescription:
      "The Atelier is a fully fitted wardrobe designed and built to the exact dimensions of your room. Soft-close doors in matte champagne pair with warm walnut open shelving and integrated LED lighting. Every internal layout — hanging, drawers, shoe racks — is drawn to your wardrobe habits and installed by our own team.",
    materials: "MDF carcass with matte lacquer finish, walnut veneer, brushed brass handles",
    dimensions: "Made-to-measure — indicative 320cm W × 260cm H × 60cm D",
    images: [wardrobeFitted, wardrobeFitted],
    featured: true,
  },
  {
    id: "signature-walk-in",
    name: "Signature Walk-in Closet",
    slug: "signature-walk-in-closet",
    collection: "wardrobes",
    price: 42000,
    description: "Bespoke walk-in wardrobe with island and lighting",
    longDescription:
      "A signature walk-in closet designed around your daily routine. Open hanging, glass-front drawers, jewellery inserts and a central island — all finished in warm oak with brushed hardware. Delivered and installed at your doorstep by our craftsmen.",
    materials: "Solid oak veneer, tempered glass, brushed nickel hardware",
    dimensions: "Made-to-measure — from 6 m² floor area",
    images: [wardrobeFitted, warmLivingRoom],
    new: true,
  },

  // TV Consoles
  {
    id: "marble-tv-console",
    name: "Marbella TV Wall",
    slug: "marbella-tv-wall",
    collection: "tv-consoles",
    price: 24500,
    description: "Full TV wall in marble and warm timber with integrated shelving",
    longDescription:
      "The Marbella pairs a slab-marble backdrop with warm timber slats and floating storage. Recessed lighting highlights display niches for your art and objects, while cable management is fully concealed. Built and installed to your wall dimensions.",
    materials: "Porcelain marble slab, walnut veneer slats, floating oak base",
    dimensions: "Made-to-measure — indicative 380cm W × 260cm H",
    images: [tvConsoleMarble, tvConsoleModern],
    featured: true,
  },
  {
    id: "floating-tv-unit",
    name: "Loft Floating TV Unit",
    slug: "loft-floating-tv-unit",
    collection: "tv-consoles",
    price: 12800,
    description: "Wall-mounted TV unit with concealed storage and LED wash",
    longDescription:
      "A clean floating console in warm walnut with matte-black push-to-open storage. Backlit with a soft warm LED wash to make the room feel calm in the evening. Ideal for modern apartments and open-plan living rooms.",
    materials: "Walnut veneer, matte-black lacquer, warm LED strip",
    dimensions: "Made-to-measure — indicative 240cm W × 45cm H × 40cm D",
    images: [tvConsoleModern, tvConsoleMarble],
    new: true,
  },

  // Living Room
  {
    id: "modular-sofa",
    name: "Olio Modular Sofa",
    slug: "olio-modular-sofa",
    collection: "living-room",
    price: 18500,
    description: "Three-seater modular sofa in premium linen weave",
    longDescription:
      "The Olio is a hand-built modular sofa with a solid hardwood frame and high-resilience foam wrapped in a soft linen weave. Configure it as a three-seater, corner or L-shape — reupholstery and colour selection available.",
    materials: "Kiln-dried hardwood frame, HR foam, premium linen upholstery",
    dimensions: "Indicative 230cm W × 92cm D × 85cm H",
    images: [greenSofa, warmLivingRoom],
    featured: true,
  },
  {
    id: "warm-living-set",
    name: "Hearth Living Suite",
    slug: "hearth-living-suite",
    collection: "living-room",
    price: 32000,
    description: "Complete living suite: sofa, ottoman, side table and styling",
    longDescription:
      "A full living-room build — modular sofa, upholstered ottoman, oak side table and considered styling in warm neutrals. We deliver, install and style the entire room so it feels finished on day one.",
    materials: "Hardwood, linen, oak, natural fibres",
    dimensions: "Full-room package",
    images: [warmLivingRoom, greenSofa],
  },

  // Home Styling
  {
    id: "boucle-armchair",
    name: "Boucle Accent Armchair",
    slug: "boucle-accent-armchair",
    collection: "home-styling",
    price: 5800,
    description: "Curved bouclé armchair on tapered black legs",
    longDescription:
      "A sculptural accent chair upholstered in ivory bouclé, hand-built on a solid hardwood frame with slim tapered legs. A quiet statement piece for reading corners, bedrooms and hotel suites.",
    materials: "Hardwood frame, ivory bouclé, matte-black solid legs",
    dimensions: "78cm W × 82cm D × 75cm H",
    images: [armchairBoucle, greyAccentChair],
    new: true,
  },
  {
    id: "contour-lounge-chair",
    name: "Contour Lounge Chair",
    slug: "contour-lounge-chair",
    collection: "home-styling",
    price: 6400,
    description: "Mid-century wingback lounge chair in soft grey wool",
    longDescription:
      "A refined take on the mid-century lounge chair — contoured back, button detail and warm oak legs. Upholstered in your choice of premium wool or bouclé.",
    materials: "Hardwood frame, wool upholstery, solid oak legs",
    dimensions: "80cm W × 85cm D × 95cm H",
    images: [greyAccentChair, armchairBoucle],
  },

  // Bedroom
  {
    id: "linen-headboard-bed",
    name: "Linen Panel Bed",
    slug: "linen-panel-bed",
    collection: "bedroom",
    price: 14500,
    description: "Upholstered king bed with tall linen headboard",
    longDescription:
      "A calm, generous king bed with a tall upholstered headboard in stonewashed linen. Solid hardwood frame, slatted base for airflow, delivered and assembled in-room.",
    materials: "Hardwood frame, stonewashed linen, oak slats",
    dimensions: "King — 190cm W × 200cm L × 130cm H (headboard)",
    images: [warmLivingRoom, wardrobeFitted],
  },

  // Commercial
  {
    id: "reception-desk",
    name: "Signature Reception Desk",
    slug: "signature-reception-desk",
    collection: "commercial",
    price: 22000,
    description: "Branded reception desk with backlit slat wall",
    longDescription:
      "A statement reception build with a two-tone counter, integrated cable management, brand-lit logo wall in warm timber slats and concealed staff storage. Designed for offices, salons and hospitality receptions.",
    materials: "MDF with matte lacquer, oak slats, warm LED backlight",
    dimensions: "Made-to-measure — indicative 280cm W × 110cm H",
    images: [officeReception, tvConsoleMarble],
    featured: true,
  },
  {
    id: "salon-lounge-set",
    name: "Waiting Lounge Set",
    slug: "waiting-lounge-set",
    collection: "commercial",
    price: 28500,
    description: "Custom waiting-area sofas and accent chairs",
    longDescription:
      "A complete waiting-area package — two sofas, tub chairs, a shared centre piece and coordinated cushions. Ideal for salons, clinics and boutique offices where first impressions matter.",
    materials: "Hardwood frames, velvet upholstery, brushed metal detailing",
    dimensions: "Full-area package",
    images: [yellowLounge, officeReception],
    new: true,
  },
];

export const getProductsByCollection = (collectionSlug: string): Product[] => {
  return products.filter((product) => product.collection === collectionSlug);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter((product) => product.featured);
};

export const getNewProducts = (): Product[] => {
  return products.filter((product) => product.new);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((product) => product.slug === slug);
};

export const getCollectionBySlug = (slug: string): Collection | undefined => {
  return collections.find((collection) => collection.slug === slug);
};

export const getRelatedProducts = (productId: string, limit = 4): Product[] => {
  const product = products.find((p) => p.id === productId);
  if (!product) return [];

  return products
    .filter((p) => p.collection === product.collection && p.id !== productId)
    .slice(0, limit);
};

/** Formats a price in Ghana Cedi (₵). */
export const formatPrice = (amount: number): string =>
  `₵${amount.toLocaleString("en-GH")}`;
