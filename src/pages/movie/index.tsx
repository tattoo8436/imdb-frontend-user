import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useSearchParams } from "react-router-dom";
import { IMovie } from "../../utils/type";
import { movieApi } from "../../apis/movieApi";
import MovieDetail from "./MovieDetail";

const Movie = () => {
  const [searchParams] = useSearchParams();
  const movieId = searchParams.get("movieId");

  const [movie, setMovie] = useState<IMovie | null>(null);

  useEffect(() => {
    fetchMovie();
  }, []);

  const fetchMovie = async () => {
    try {
      const { data } = await movieApi.getMovieById({ id: movieId });
      console.log(data);
      setMovie(data);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="movie">
      <Header />

      <div className="movie__content">
        <MovieDetail movie={movie} />
      </div>

      <Footer />
    </div>
  );
};

export default Movie;
