import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import CategoryRow from "@/components/CategoryRow";
import Footer from "@/components/Footer";
import { movies, categories } from "@/data/movies";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroBanner />
      <div className="-mt-16 relative z-10 space-y-2 pb-8">
        {categories.map((cat) => (
          <CategoryRow
            key={cat.name}
            title={cat.name}
            movieList={cat.movies.map((i) => movies[i])}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Index;
