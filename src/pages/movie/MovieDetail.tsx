import React from "react";
import { IMovie } from "../../utils/type";
import dayjs from "dayjs";
import { StarFilled } from "@ant-design/icons";
import { Image } from "antd";
import { BASE_URL_API } from "../../utils";
import YouTube from "react-youtube";

interface IProps {
  movie: IMovie | null;
}

const MovieDetail = (props: IProps) => {
  const { movie } = props;

  return (
    <div className="movie-detail">
      <div className="movie-detail__header">
        <div className="movie-detail__header__left">
          <div className="movie-detail__header__left__name">{movie?.name}</div>

          <div className="movie-detail__header__left__year">
            {movie?.releaseDate ? dayjs(movie.releaseDate).format("YYYY") : ""}{" "}
            | {movie?.duration} phút
          </div>
        </div>

        <div className="movie-detail__header__right">
          <div className="rating-imdb">
            <div className="rating-imdb__label">Đánh giá của IMDB</div>
            <div className="rating-imdb__value">
              <StarFilled className="rating-imdb__value__icon" />

              <div className="rating-imdb__value__content">
                <div className="rating-imdb__value__content__score">
                  {movie?.score}/10
                </div>
                <div className="rating-imdb__value__content__number-vote">
                  {movie?.numberVote}
                </div>
              </div>
            </div>
          </div>

          <div className="rating-user">
            <div className="rating-user__label">Đánh giá của bạn</div>
          </div>
        </div>
      </div>

      <div className="movie-detail__content">
        <div className="movie-detail__content__asset">
          <Image
            className="movie-detail__content__asset__image"
            src={`${BASE_URL_API}/image/${movie?.image}`}
            alt="Ảnh"
          />

          <YouTube
            className="movie-detail__content__asset__trailer"
            videoId={movie?.trailer?.split("?v=")?.at(1)}
            opts={{
              height: "300",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
