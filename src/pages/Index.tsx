import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import CategoryRow from "@/components/CategoryRow";
import Footer from "@/components/Footer";
import { movies, categories } from "@/data/movies";

const Index = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";
  const category = searchParams.get("category") || "";

  const filteredMovies = useMemo(() => {
    let filtered = movies;
    if (searchQuery) {
      filtered = filtered.filter(
        (m) =>
          m.title.toLowerCase().includes(searchQuery) ||
          m.genre.some((g) => g.toLowerCase().includes(searchQuery))
      );
    }
    if (category === "movies") {
      filtered = filtered.filter((m) => !m.genre.includes("Documentary"));
    } else if (category === "series") {
      // placeholder filter
    } else if (category === "new") {
      filtered = filtered.filter((m) => m.year >= 2025);
    }
    return filtered;
  }, [searchQuery, category]);

  const showSearch = searchQuery || category;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {!showSearch && <HeroBanner />}
      <div className={`${showSearch ? "pt-24" : "-mt-16"} relative z-10 space-y-2 pb-8`}>
        {showSearch ? (
          <div className="px-4 md:px-8 container mx-auto">
            <h2 className="font-display text-2xl text-foreground mb-4">
              {searchQuery ? `Results for "${searchQuery}"` : category === "movies" ? "Movies" : category === "series" ? "TV Shows" : "New & Popular"}
            </h2>
            {filteredMovies.length > 0 ? (
              <CategoryRow title="" movieList={filteredMovies} />
            ) : (
              <p className="text-muted-foreground font-body">No results found.</p>
            )}
          </div>
        ) : (
          categories.map((cat) => (
            <CategoryRow
              key={cat.name}
              title={cat.name}
              movieList={cat.movies.map((i) => movies[i])}
            />
          ))
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Index;
