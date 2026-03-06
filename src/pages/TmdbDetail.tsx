import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Play, Share2, ArrowLeft, Star } from "lucide-react";
import { motion } from "framer-motion";
import { fetchMovieDetails, fetchTVDetails, getImageUrl } from "@/services/tmdb";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import CommentSection from "@/components/CommentSection";

const TmdbDetail = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [server, setServer] = useState<"vidsrc" | "2embed" | "vidlink">("vidsrc");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = type === "tv"
          ? await fetchTVDetails(Number(id))
          : await fetchMovieDetails(Number(id));
        setDetail(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [type, id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center pt-32">
          <p className="text-muted-foreground font-body">Loading...</p>
        </div>
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center pt-32">
          <p className="text-foreground font-body">Not found</p>
        </div>
      </div>
    );
  }

  const title = detail.title || detail.name;
  const year = (detail.release_date || detail.first_air_date || "").slice(0, 4);
  const runtime = detail.runtime ? `${Math.floor(detail.runtime / 60)}h ${detail.runtime % 60}m` : detail.episode_run_time?.[0] ? `${detail.episode_run_time[0]}m/ep` : "";
  const genres = detail.genres?.map((g: any) => g.name) || [];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="relative">
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <img
            src={getImageUrl(detail.backdrop_path || detail.poster_path, "original")}
            alt={title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        <div className="container mx-auto px-4 md:px-8 -mt-32 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 font-body text-sm transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>

            <h1 className="font-display text-4xl md:text-6xl text-foreground tracking-wide">{title?.toUpperCase()}</h1>

            <div className="flex items-center gap-3 mt-3 font-body text-sm text-muted-foreground">
              <span className="flex items-center gap-1 text-accent font-semibold">
                <Star className="h-4 w-4 fill-accent text-accent" />
                {detail.vote_average?.toFixed(1)}
              </span>
              <span>{year}</span>
              {runtime && <span>{runtime}</span>}
              {detail.number_of_seasons && <span>{detail.number_of_seasons} Season{detail.number_of_seasons > 1 ? "s" : ""}</span>}
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {genres.map((g: string) => (
                <span key={g} className="rounded-full bg-primary/20 px-3 py-1 font-body text-xs text-primary">{g}</span>
              ))}
            </div>

            <p className="mt-6 font-body text-muted-foreground leading-relaxed max-w-2xl">{detail.overview}</p>

            {detail.credits?.cast?.length > 0 && (
              <div className="mt-4">
                <p className="font-body text-sm text-foreground font-semibold mb-1">Cast</p>
                <p className="font-body text-sm text-muted-foreground">
                  {detail.credits.cast.slice(0, 6).map((c: any) => c.name).join(", ")}
                </p>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <Button onClick={() => setPlaying(!playing)} className="gap-2">
                <Play className="h-4 w-4" /> {playing ? "Stop" : "Watch Now"}
              </Button>
              <Button variant="outline" onClick={handleShare} className="gap-2">
                <Share2 className="h-4 w-4" /> Share
              </Button>
            </div>

            {playing && (() => {
              const imdbId = detail.imdb_id || detail.external_ids?.imdb_id;
              const tmdbId = detail.id;
              const servers = {
                vidsrc: type === "tv"
                  ? `https://vidsrc.xyz/embed/tv/${imdbId}`
                  : `https://vidsrc.xyz/embed/movie/${imdbId}`,
                "2embed": type === "tv"
                  ? `https://www.2embed.cc/embedtv/${imdbId}`
                  : `https://www.2embed.cc/embed/${imdbId}`,
                vidlink: type === "tv"
                  ? `https://vidlink.pro/tv/${tmdbId}`
                  : `https://vidlink.pro/movie/${tmdbId}`,
              };

              return imdbId || server === "vidlink" ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8">
                  <div className="flex gap-2 mb-3">
                    {(["vidsrc", "2embed", "vidlink"] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => setServer(s)}
                        className={`px-4 py-1.5 rounded-md font-body text-xs font-semibold transition-colors ${
                          server === s
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                        }`}
                      >
                        {s === "vidsrc" ? "VidSrc" : s === "2embed" ? "2Embed" : "VidLink"}
                      </button>
                    ))}
                  </div>
                  <iframe
                    key={server}
                    src={servers[server]}
                    className="w-full aspect-video rounded-lg border border-border"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation allow-popups-to-escape-sandbox"
                    allowFullScreen
                    allow="autoplay; encrypted-media; fullscreen"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              ) : (
                <div className="mt-8 aspect-video rounded-lg bg-card border border-border flex items-center justify-center">
                  <p className="text-muted-foreground font-body">Stream unavailable for this title</p>
                </div>
              );
            })()}
          </motion.div>

          <div className="max-w-4xl mt-12 pb-12">
            <CommentSection movieId={Number(id)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TmdbDetail;
