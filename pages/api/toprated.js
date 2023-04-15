import { fetcher } from "utils/api";

const getMovieUrl = () =>
  `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&sort_by=vote_average.desc&vote_count.gte=10000`;

export default async function handler(req, res) {
  const results = await fetcher(getMovieUrl());

  res.status(200).json(results);
}
