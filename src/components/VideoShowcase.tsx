import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { SafeImage } from "@/components/SafeImage";

import warmLivingRoom from "@/assets/warm-living-room.jpeg";
import tvConsoleMarble from "@/assets/tv-console-marble.jfif";
import officeReception from "@/assets/office-reception.jfif";

const videos = [
  {
    id: "penthouse",
    title: "East Legon Penthouse",
    description: "Full fit-out — living, dining and dressing rooms.",
    poster: warmLivingRoom,
  },
  {
    id: "tv-wall",
    title: "Marble TV Wall Install",
    description: "Slab-marble backdrop with warm slat cladding.",
    poster: tvConsoleMarble,
  },
  {
    id: "reception",
    title: "Boutique Reception Fit-out",
    description: "Commercial reception & waiting area in Cantonments.",
    poster: officeReception,
  },
];

export const VideoShowcase = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const openVideo = videos.find((v) => v.id === openId);

  return (
    <section className="py-24 md:py-32 bg-linen">
      <div className="container-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between gap-6 mb-12 flex-wrap"
        >
          <div>
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-3">
              Project Films
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground">
              Behind the <span className="italic">Build</span>
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-md">
            Short project films from our recent installations across Accra.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {videos.map((video, i) => (
            <motion.button
              key={video.id}
              type="button"
              onClick={() => setOpenId(video.id)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative aspect-[4/5] overflow-hidden text-left"
            >
              <SafeImage
                src={video.poster}
                alt={video.title}
                fallbackLabel={video.title}
                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                containerClassName="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/30 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="inline-flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-gold text-charcoal shadow-lg transition-transform duration-500 group-hover:scale-110">
                  <Play className="w-5 h-5 md:w-6 md:h-6 ml-1" fill="currentColor" />
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-1.5">Project Film</p>
                <h3 className="font-serif text-2xl leading-tight mb-1">{video.title}</h3>
                <p className="text-sm text-white/75">{video.description}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <Dialog open={!!openId} onOpenChange={(o) => !o && setOpenId(null)}>
        <DialogContent className="max-w-2xl bg-background">
          <DialogTitle className="font-serif text-2xl">
            {openVideo?.title}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {openVideo?.description}
          </DialogDescription>
          <div className="aspect-video bg-charcoal flex items-center justify-center text-white/70 text-sm mt-4">
            Project film coming soon.
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Want to see this project in person? Contact us to arrange a visit.
          </p>
        </DialogContent>
      </Dialog>
    </section>
  );
};
