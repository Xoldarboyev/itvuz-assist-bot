import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Play, Share2, ArrowLeft, Bookmark, BookmarkCheck } from "lucide-react";
import { motion } from "framer-motion";
import { movies } from "@/data/movies";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import CommentSection from "@/components/CommentSection";
import Navbar from "@/components/Navbar";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const movie = movies.find((m) => m.id === Number(id));
  const [inWatchlist, setInWatchlist] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!user || !movie) return;
    supabase
      .from("watchlist")
      .select("id")
      .eq("user_id", user.id)
      .eq("movie_id", movie.id)
      .maybeSingle()
      .then(({ data }) => setInWatchlist(!!data));
  }, [user, movie]);

  if (!movie) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground">Movie not found</p>
      </div>
    );
  }

  const toggleWatchlist = async () => {
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

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="relative">
        {/* Hero image */}
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <img src={movie.image} alt={movie.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 md:px-8 -mt-32 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 font-body text-sm transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>

            <h1 className="font-display text-4xl md:text-6xl text-foreground tracking-wide">{movie.title.toUpperCase()}</h1>

            <div className="flex items-center gap-3 mt-3 font-body text-sm text-muted-foreground">
              <span className="text-accent font-semibold">★ {movie.rating}</span>
              <span>{movie.year}</span>
              <span>{movie.duration}</span>
              <span className="rounded bg-secondary px-2 py-0.5 text-xs">{movie.ageRating}</span>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {movie.genre.map((g) => (
                <span key={g} className="rounded-full bg-primary/20 px-3 py-1 font-body text-xs text-primary">{g}</span>
              ))}
            </div>

            <p className="mt-6 font-body text-muted-foreground leading-relaxed max-w-2xl">{movie.description}</p>

            <div className="flex gap-3 mt-6">
              <Button onClick={() => setPlaying(!playing)} className="gap-2">
                <Play className="h-4 w-4" /> {playing ? "Stop" : "Watch Now"}
              </Button>
              <Button variant="outline" onClick={toggleWatchlist} className="gap-2">
                {inWatchlist ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                {inWatchlist ? "In Watchlist" : "Add to Watchlist"}
              </Button>
              <Button variant="outline" onClick={handleShare} className="gap-2">
                <Share2 className="h-4 w-4" /> Share
              </Button>
            </div>

            {playing && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 aspect-video rounded-lg bg-card border border-border flex items-center justify-center">
                <p className="text-muted-foreground font-body">🎬 Streaming player would appear here</p>
              </motion.div>
            )}
          </motion.div>

          {/* Comments */}
          <div className="max-w-4xl mt-12 pb-12">
            <CommentSection movieId={movie.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
