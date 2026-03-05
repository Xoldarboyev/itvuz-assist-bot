import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import TmdbMovieGrid from "@/components/TmdbMovieGrid";
import Footer from "@/components/Footer";
import {
  fetchPopularMovies,
  fetchTrendingMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  fetchPopularTVShows,
  searchMovies,
  type TmdbMovie,
} from "@/services/tmdb";

const Index = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  const [popular, setPopular] = useState<TmdbMovie[]>([]);
  const [trending, setTrending] = useState<TmdbMovie[]>([]);
  const [topRated, setTopRated] = useState<TmdbMovie[]>([]);
  const [upcoming, setUpcoming] = useState<TmdbMovie[]>([]);
  const [tvShows, setTvShows] = useState<TmdbMovie[]>([]);
  const [searchResults, setSearchResults] = useState<TmdbMovie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        if (searchQuery) {
          const res = await searchMovies(searchQuery);
          setSearchResults(res.results.filter((r: any) => r.media_type === "movie" || r.media_type === "tv"));
        } else if (category === "series") {
          const res = await fetchPopularTVShows();
          setSearchResults(res.results);
        } else {
          const [pop, trend, top, up, tv] = await Promise.all([
            fetchPopularMovies(),
            fetchTrendingMovies(),
            fetchTopRatedMovies(),
            fetchUpcomingMovies(),
            fetchPopularTVShows(),
          ]);
          setPopular(pop.results);
          setTrending(trend.results);
          setTopRated(top.results);
          setUpcoming(up.results);
          setTvShows(tv.results);
        }
      } catch (e) {
        console.error("Failed to fetch movies:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [searchQuery]);

  const showSearch = !!searchQuery || !!category;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {!showSearch && <HeroBanner />}
      <div className={`${showSearch ? "pt-24" : "-mt-16"} relative z-10 pb-8`}>
        {showSearch ? (
          <TmdbMovieGrid
            title={searchQuery ? `Results for "${searchQuery}"` : category === "series" ? "📺 TV Shows" : category === "movies" ? "🎬 Movies" : "🆕 New & Popular"}
            movies={searchQuery ? searchResults : category === "series" ? searchResults : popular}
            loading={loading}
          />
        ) : (
          <>
            <TmdbMovieGrid title="🔥 Trending This Week" movies={trending} loading={loading} />
            <TmdbMovieGrid title="⭐ Popular Movies" movies={popular} loading={loading} />
            <TmdbMovieGrid title="📺 TV Shows" movies={tvShows} loading={loading} />
            <TmdbMovieGrid title="🏆 Top Rated" movies={topRated} loading={loading} />
            <TmdbMovieGrid title="🎬 Upcoming" movies={upcoming} loading={loading} />
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Index;
