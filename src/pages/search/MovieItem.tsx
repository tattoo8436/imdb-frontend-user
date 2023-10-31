import React from "react";
import { IMovie } from "../../utils/type";
import { Image } from "antd";
import dayjs from "dayjs";
import { BASE_URL_API } from "../../utils";
import { StarFilled } from "@ant-design/icons";

interface IProps {
  movie: IMovie;
  navigate: any;
}

const MovieItem = (props: IProps) => {
  const { movie, navigate } = props;

  return (
    <div
      className="movie-item card"
      onClick={() => navigate(`/movie?movieId=${movie.id}`)}
    >
      <Image
        className="movie-item__image"
        src={`${BASE_URL_API}/image/${movie.image}`}
        alt="Ảnh"
      />

      <div className="movie-item__detail">
        <div className="movie-item__detail__name">
          {movie.name}{" "}
          {movie.releaseDate
            ? `(${dayjs(movie.releaseDate).format("YYYY")})`
            : ""}
        </div>

        <div className="movie-item__detail__duration">
          {movie.duration} phút |{" "}
          {movie.listMovieGenres?.map((i) => i.genre?.name).join(", ")}
        </div>

        <div className="movie-item__detail__score">
          <StarFilled />
          {movie.score}
        </div>

        <div className="movie-item__detail__description">
          {movie.description}
        </div>

        <div className="movie-item__detail__number-vote">
          Số lượt đánh giá: {movie.numberVote}
        </div>
      </div>
    </div>
  );
};

export default MovieItem;
