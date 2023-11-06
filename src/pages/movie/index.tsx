import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useSearchParams } from "react-router-dom";
import { IMovie } from "../../utils/type";
import { movieApi } from "../../apis/movieApi";
import MovieDetail from "./MovieDetail";
import ModalRating from "./ModalRating";
import { useForm } from "react-hook-form";
import { getCurrentAccount } from "../../utils";

const Movie = () => {
  const [searchParams] = useSearchParams();
  const movieId = searchParams.get("movieId");
  const currentAccount = getCurrentAccount();
  const hookFormRating = useForm({
    mode: "onChange",
    defaultValues: {
      account: {
        username: currentAccount?.username,
        password: currentAccount?.password,
      },
      movieId: Number(movieId),
      score: 0,
    },
  });
  const hookFormComment = useForm({
    mode: "onChange",
    defaultValues: {
      account: {
        username: currentAccount?.username,
        password: currentAccount?.password,
      },
      movieId: Number(movieId),
      comment: "",
    },
  });

  const [movie, setMovie] = useState<IMovie | null>(null);
  const [comment, setComment] = useState("");
  const [openModalRating, setOpenModalRating] = useState(false);
  const [isRefetch, setIsRefetch] = useState(false);

  useEffect(() => {
    fetchMovie();
    fetchRatingMovie();
  }, [isRefetch]);

  useEffect(() => {
    window.scrollTo(0, 0);
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

  const fetchRatingMovie = async () => {
    try {
      const { data } = await movieApi.getRatingMovieByAccount({
        accountAdmin: {
          username: currentAccount.username,
          password: currentAccount.password,
        },
        movieId: Number(movieId),
      });
      console.log(data);
      hookFormRating.setValue("score", data.score ?? null);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="movie">
      <Header />

      <div className="movie__content">
        <MovieDetail
          movie={movie}
          userScore={hookFormRating.getValues("score")}
          setOpenModal={setOpenModalRating}
          hookForm={hookFormComment}
          setIsRefetch={setIsRefetch}
        />
      </div>

      <Footer />

      <ModalRating
        openModal={openModalRating}
        setOpenModal={setOpenModalRating}
        hookForm={hookFormRating}
        setIsRefetch={setIsRefetch}
      />
    </div>
  );
};

export default Movie;
