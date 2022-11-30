import { fetcher } from "utils/api";
import Watchlist from "models/Watchlist";
import History from "models/History";
import dbConnect from "utils/dbConnect";

const getRecommendedMovieUrl = (id) =>
  `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.TMDB_API_KEY}`;

const getSimilarMovieUrl = (id) =>
  `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`;

export default async function handler(req, res) {
  await dbConnect();

  const watchlist = await Watchlist.find({}, "id title");
  const history = await History.find({}, "id title");

  const recommendationsMovies = [...watchlist];
  recommendationsMovies.push(...history);

  const randomMovie =
    recommendationsMovies[
      Math.floor(Math.random() * recommendationsMovies.length)
    ];
  const recommendedMovie = await fetcher(
    getRecommendedMovieUrl(randomMovie.id)
  );
  const similarMovie = await fetcher(getSimilarMovieUrl(randomMovie.id));

  res.status(200).json({ recommendedMovie, similarMovie, randomMovie });
}
