import TmdbMovieCard from "./TmdbMovieCard";
import type { TmdbMovie } from "@/services/tmdb";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  title: string;
  movies: TmdbMovie[];
  loading?: boolean;
};

const TmdbMovieGrid = ({ title, movies, loading }: Props) => {
  return (
    <section className="py-6 px-4 md:px-8">
      {title && (
        <h2 className="font-display text-2xl tracking-wide text-foreground mb-4">
          {title}
        </h2>
      )}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[2/3] rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {movies.map((movie) => (
            <TmdbMovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
};

export default TmdbMovieGrid;
