import { useState } from "react";
import { Play, Bookmark, BookmarkCheck, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Movie } from "@/data/movies";

const MovieCard = ({ movie }: { movie: Movie }) => {
  const [hovered, setHovered] = useState(false);
  const [inWatchlist, setInWatchlist] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const toggleWatchlist = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      toast.error("Please login to add to watchlist");
      return;
    }
    if (inWatchlist) {
      await supabase.from("watchlist").delete().eq("user_id", user.id).eq("movie_id", movie.id);
      setInWatchlist(false);
      toast.success("Removed from watchlist");
    } else {
      await supabase.from("watchlist").insert({ user_id: user.id, movie_id: movie.id });
      setInWatchlist(true);
      toast.success("Added to watchlist");
    }
  };

  return (
    <motion.div
      className="relative flex-shrink-0 w-[160px] md:w-[200px] cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.05, zIndex: 20 }}
      transition={{ duration: 0.2 }}
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
        <img
          src={movie.image}
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
          <span className="font-body text-xs font-semibold text-foreground">{movie.rating}</span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <p className="font-body text-xs font-semibold text-foreground line-clamp-1">{movie.title}</p>
          <p className="font-body text-[10px] text-muted-foreground mt-0.5">
            {movie.year} · {movie.duration} · {movie.ageRating}
          </p>
          <div className="flex gap-2 mt-2">
            <button className="flex items-center justify-center h-7 w-7 rounded-full bg-primary text-primary-foreground hover:bg-primary/80 transition-colors">
              <Play className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={toggleWatchlist}
              className="flex items-center justify-center h-7 w-7 rounded-full border border-border text-foreground hover:border-foreground transition-colors"
            >
              {inWatchlist ? <BookmarkCheck className="h-3.5 w-3.5 text-accent" /> : <Bookmark className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;
