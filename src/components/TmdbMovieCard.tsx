import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getImageUrl, type TmdbMovie } from "@/services/tmdb";

const TmdbMovieCard = ({ movie }: { movie: TmdbMovie }) => {
  const navigate = useNavigate();
  const title = movie.title || movie.name || "Untitled";
  const year = (movie.release_date || movie.first_air_date || "").slice(0, 4);
  const mediaType = movie.media_type || (movie.first_air_date ? "tv" : "movie");
  return (
    <motion.div
      className="relative cursor-pointer group"
      whileHover={{ scale: 1.05, zIndex: 20 }}
      transition={{ duration: 0.2 }}
      onClick={() => navigate(`/tmdb/${mediaType}/${movie.id}`)}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
        <img
          src={getImageUrl(movie.poster_path, "w342")}
          alt={movie.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "var(--gradient-card)" }}
        />

        <div className="absolute top-2 right-2 flex items-center gap-1 rounded bg-background/80 px-1.5 py-0.5 backdrop-blur-sm">
          <Star className="h-3 w-3 fill-accent text-accent" />
          <span className="font-body text-xs font-semibold text-foreground">
            {movie.vote_average.toFixed(1)}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <p className="font-body text-sm font-semibold text-foreground line-clamp-2">
            {title}
          </p>
          <p className="font-body text-[10px] text-muted-foreground mt-0.5">
            {year}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TmdbMovieCard;
