import { useState, useEffect } from "react";
import { Play, Info } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { fetchTrendingMovies, getImageUrl, type TmdbMovie } from "@/services/tmdb";
import { useLanguage } from "@/hooks/useLanguage";

const HeroBanner = () => {
  const [movie, setMovie] = useState<TmdbMovie | null>(null);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    fetchTrendingMovies().then((res) => {
      const top = res.results.filter((m) => m.backdrop_path);
      if (top.length) setMovie(top[Math.floor(Math.random() * Math.min(5, top.length))]);
    });
  }, []);

  if (!movie) return <div className="h-[85vh] bg-background" />;

  const title = movie.title || movie.name || "";
  const mediaType = movie.media_type || (movie.first_air_date ? "tv" : "movie");

  return (
    <section className="relative h-[85vh] w-full overflow-hidden">
      <img src={getImageUrl(movie.backdrop_path, "original")} alt={title} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-48" style={{ background: "var(--gradient-fade-bottom)" }} />

      <div className="relative z-10 flex h-full items-end pb-24 md:pb-32">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="max-w-2xl">
            <span className="mb-3 inline-block rounded-sm bg-primary/90 px-3 py-1 font-body text-xs font-semibold uppercase tracking-widest text-primary-foreground">
              {t.trendingNow}
            </span>
            <h2 className="font-display text-5xl leading-none tracking-wide text-foreground md:text-7xl lg:text-8xl">
              {title.toUpperCase()}
            </h2>
            <p className="mt-4 max-w-lg font-body text-sm leading-relaxed text-muted-foreground md:text-base line-clamp-3">
              {movie.overview}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="font-body text-sm text-accent font-semibold">★ {movie.vote_average?.toFixed(1)}</span>
              <span className="font-body text-sm text-muted-foreground">{(movie.release_date || movie.first_air_date || "").slice(0, 4)}</span>
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={() => navigate(`/tmdb/${mediaType}/${movie.id}`)} className="flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-body text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/80">
                <Play className="h-5 w-5" /> {t.watchNow}
              </button>
              <button onClick={() => navigate(`/tmdb/${mediaType}/${movie.id}`)} className="flex items-center gap-2 rounded-md bg-secondary px-6 py-3 font-body text-sm font-semibold text-secondary-foreground transition-all hover:bg-secondary/80">
                <Info className="h-5 w-5" /> {t.moreInfo}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
