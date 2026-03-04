import movie1 from "@/assets/movie-1.jpg";
import movie2 from "@/assets/movie-2.jpg";
import movie3 from "@/assets/movie-3.jpg";
import movie4 from "@/assets/movie-4.jpg";
import movie5 from "@/assets/movie-5.jpg";
import movie6 from "@/assets/movie-6.jpg";
import movie7 from "@/assets/movie-7.jpg";
import movie8 from "@/assets/movie-8.jpg";

export type Movie = {
  id: number;
  title: string;
  year: number;
  rating: number;
  genre: string[];
  image: string;
  duration: string;
  description: string;
  ageRating: string;
};

export const movies: Movie[] = [
  {
    id: 1,
    title: "Shadows of the City",
    year: 2024,
    rating: 8.2,
    genre: ["Thriller", "Detective"],
    image: movie1,
    duration: "2h 15m",
    description: "A detective unravels a web of corruption in the neon-lit streets of a sprawling metropolis.",
    ageRating: "18+",
  },
  {
    id: 2,
    title: "Beyond the Stars",
    year: 2025,
    rating: 9.0,
    genre: ["Sci-Fi", "Adventure"],
    image: movie2,
    duration: "2h 42m",
    description: "Humanity's last explorer ventures to the edge of known space to find a new home.",
    ageRating: "12+",
  },
  {
    id: 3,
    title: "Sunset Promise",
    year: 2024,
    rating: 7.8,
    genre: ["Romance", "Drama"],
    image: movie3,
    duration: "1h 58m",
    description: "Two souls find each other on a rooftop overlooking the city, changing everything.",
    ageRating: "16+",
  },
  {
    id: 4,
    title: "The Last Warrior",
    year: 2025,
    rating: 8.5,
    genre: ["Action", "History"],
    image: movie4,
    duration: "2h 30m",
    description: "An ancient warrior rises to defend his people against an unstoppable empire.",
    ageRating: "16+",
  },
  {
    id: 5,
    title: "Whispers in the Dark",
    year: 2024,
    rating: 7.4,
    genre: ["Horror", "Mystery"],
    image: movie5,
    duration: "1h 45m",
    description: "Strange lights in the forest lead a group of friends into a nightmare they can't escape.",
    ageRating: "18+",
  },
  {
    id: 6,
    title: "The Enchanted Kingdom",
    year: 2025,
    rating: 8.8,
    genre: ["Animation", "Fantasy"],
    image: movie6,
    duration: "1h 52m",
    description: "A young girl discovers a magical world hidden above the clouds.",
    ageRating: "6+",
  },
  {
    id: 7,
    title: "Kitchen Chaos",
    year: 2024,
    rating: 7.6,
    genre: ["Comedy"],
    image: movie7,
    duration: "1h 38m",
    description: "Two brothers attempt to save their family restaurant with hilariously disastrous results.",
    ageRating: "12+",
  },
  {
    id: 8,
    title: "Silk Road Legacy",
    year: 2025,
    rating: 9.1,
    genre: ["Documentary", "History"],
    image: movie8,
    duration: "2h 10m",
    description: "A breathtaking journey through the mountains and steppes of Central Asia.",
    ageRating: "6+",
  },
];

export const categories = [
  { name: "Trending Now", movies: [0, 1, 2, 3, 4, 5, 6, 7] },
  { name: "New Releases", movies: [7, 5, 1, 3, 0, 6, 2, 4] },
  { name: "Action & Adventure", movies: [3, 1, 0, 4, 7, 2, 5, 6] },
  { name: "Comedy & Family", movies: [6, 5, 2, 7, 0, 1, 3, 4] },
];
