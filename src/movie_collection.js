const movies = [
  {
    id: "1",
    name: "Django Unchained",
    genre: { id: "1", name: "Action" },
    rating: 2.5,
    liked: true,
  },
  {
    id: "2",
    name: "Monet Hiest",
    genre: { id: "2", name: "Drama" },
    rating: 3.8,
  },
  {
    id: "3",
    name: "Tomorrow War",
    genre: { id: "1", name: "Action" },
    rating: 3.5,
  },
  {
    id: "4",
    name: "A Quiet Palce",
    genre: { id: "1", name: "Action" },
    rating: 3.6,
  },
  {
    id: "5",
    name: "The Sucide Squad 2",
    genre: { id: "1", name: "Action" },
    rating: 3.1,
  },
  {
    id: "6",
    name: "SAS Rise of Swan",
    genre: { id: "1", name: "Action" },
    rating: 3.4,
  },
  {
    id: "7",
    name: "The Witcher Drama",
    genre: { id: "1", name: "Action" },
    rating: 3.9,
  },
  {
    id: "8",
    name: "Elite",
    genre: { id: "2", name: "Drama" },
    rating: 3.9,
  },
];

export function getMovies() {
  return movies;
}

export function saveMovie(movie) {
  movies.push(movie);
}
