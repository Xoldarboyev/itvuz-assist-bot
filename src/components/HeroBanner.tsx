import { Play, Info } from "lucide-react";
import { motion } from "framer-motion";
import heroBanner from "@/assets/hero-banner.jpg";

const HeroBanner = () => {
  return (
    <section className="relative h-[85vh] w-full overflow-hidden">
      <img
        src={heroBanner}
        alt="Featured movie banner"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Gradient overlays */}
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-48" style={{ background: "var(--gradient-fade-bottom)" }} />

      <div className="relative z-10 flex h-full items-end pb-24 md:pb-32">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <span className="mb-3 inline-block rounded-sm bg-primary/90 px-3 py-1 font-body text-xs font-semibold uppercase tracking-widest text-primary-foreground">
              Featured
            </span>
            <h2 className="font-display text-5xl leading-none tracking-wide text-foreground md:text-7xl lg:text-8xl">
              SILK ROAD LEGACY
            </h2>
            <p className="mt-4 max-w-lg font-body text-sm leading-relaxed text-muted-foreground md:text-base">
              A breathtaking journey through the mountains and steppes of Central Asia.
              Experience the untold stories of the ancient Silk Road.
            </p>
            <div className="mt-6 flex gap-3">
              <button className="flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-body text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/80">
                <Play className="h-5 w-5" /> Watch Now
              </button>
              <button className="flex items-center gap-2 rounded-md bg-secondary px-6 py-3 font-body text-sm font-semibold text-secondary-foreground transition-all hover:bg-secondary/80">
                <Info className="h-5 w-5" /> More Info
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
