import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieCard from "./MovieCard";
import type { Movie } from "@/data/movies";

type Props = {
  title: string;
  movieList: Movie[];
};

const CategoryRow = ({ title, movieList }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = dir === "left" ? -600 : 600;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="relative py-4">
      <h3 className="font-display text-xl tracking-wide text-foreground mb-3 px-4 md:px-8">
        {title}
      </h3>
      <div className="group relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-0 bottom-0 z-10 w-10 flex items-center justify-center bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft className="h-6 w-6 text-foreground" />
        </button>
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide px-4 md:px-8"
        >
          {movieList.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-0 bottom-0 z-10 w-10 flex items-center justify-center bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight className="h-6 w-6 text-foreground" />
        </button>
      </div>
    </section>
  );
};

export default CategoryRow;
