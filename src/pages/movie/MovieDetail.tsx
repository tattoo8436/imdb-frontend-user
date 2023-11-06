import React, { useState } from "react";
import { IMovie } from "../../utils/type";
import dayjs from "dayjs";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Image, Input, Row } from "antd";
import { BASE_URL_API } from "../../utils";
import YouTube from "react-youtube";
import { Link } from "react-router-dom";
import { Controller, UseFormReturn } from "react-hook-form";
import { movieApi } from "../../apis/movieApi";
import numeral from "numeral";

interface IProps {
  movie: IMovie | null;
  userScore: number;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  hookForm: UseFormReturn<
    {
      account: {
        username: any;
        password: any;
      };
      movieId: number;
      comment: string;
    },
    any,
    undefined
  >;
  setIsRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}

const MovieDetail = (props: IProps) => {
  const { movie, userScore, setOpenModal, hookForm, setIsRefetch } = props;

  const [loading, setLoading] = useState(false);

  const onSubmit = async (value: any) => {
    setLoading(true);
    const payload = {
      accountAdmin: {
        username: value.account.username,
        password: value.account.password,
      },
      content: value.comment,
      movieId: value.movieId,
    };
    console.log(payload);
    try {
      const { data } = await movieApi.comment(payload);
      console.log(data);
      setIsRefetch((pre) => !pre);
      setLoading(false);
      hookForm.reset();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

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
                  {movie?.score?.toFixed(1)}/10
                </div>
                <div className="rating-imdb__value__content__number-vote">
                  {numeral(movie?.numberVote).format("0,")}
                </div>
              </div>
            </div>
          </div>

          <div className="rating-user">
            <div className="rating-user__label">Đánh giá của bạn</div>
            {userScore !== null ? (
              <div
                className="rating-user__value"
                onClick={() => setOpenModal(true)}
              >
                <StarFilled className="rating-user__value__icon" />
                {userScore}/10
              </div>
            ) : (
              <Button
                className="rating-user__input"
                onClick={() => setOpenModal(true)}
                icon={<StarOutlined />}
              >
                Đánh giá
              </Button>
            )}
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
            videoId={movie?.trailer ? movie?.trailer?.split("?v=")?.at(1) : ""}
            opts={{
              height: "300",
            }}
          />
        </div>

        <div className="movie-detail__content__genre">
          {movie?.listMovieGenres?.map((i) => (
            <div className="movie-detail__content__genre__item" key={i.id}>
              {i.genre.name}
            </div>
          ))}
        </div>

        <div className="movie-detail__content__description">
          {movie?.description}
        </div>

        <div className="movie-detail__content__director">
          <div className="movie-detail__content__director__label">
            Đạo diễn:{" "}
          </div>

          <div className="movie-detail__content__director__value">
            {movie?.listMovieDirectors?.map((i) => (
              <Link
                to={`/director?directorId=${i.director.id}`}
                key={i.id}
                className="movie-detail__content__director__value__item"
              >
                {i.director.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="divider"></div>
      </div>

      <div className="movie-detail__footer">
        <Row gutter={[24, 12]}>
          <Col xs={24} md={12}>
            <div className="movie-detail__footer__actor">
              <div className="movie-detail__footer__actor__title">
                Diễn viên
              </div>

              <div className="movie-detail__footer__actor__content">
                <Row>
                  {movie?.listMovieActors?.map((i) => (
                    <Col key={i.id} span={12} className="item-actor">
                      <Avatar
                        className="item-actor__image"
                        src={`${BASE_URL_API}/image/${i.actor.image}`}
                      />

                      <div className="item-actor__text">
                        <Link
                          className="item-actor__text__name"
                          to={`/actor?actorId=${i.actor.id}`}
                        >
                          {i.actor.name}
                        </Link>
                        <div className="item-actor__text__name-in-movie">
                          {i.nameInMovie}
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
          </Col>

          <Col xs={24} md={12}>
            <div className="movie-detail__footer__comment">
              <div className="movie-detail__footer__comment__title">
                Bình luận
              </div>

              <div className="movie-detail__footer__comment__input">
                <form
                  onSubmit={hookForm.handleSubmit(onSubmit)}
                  className="form"
                >
                  <div className="form__input">
                    <Controller
                      name="comment"
                      control={hookForm.control}
                      rules={{
                        validate: {
                          required: (v) =>
                            v !== "" || "Vui lòng nhập bình luận",
                        },
                      }}
                      render={({ field }) => (
                        <Input {...field} placeholder="Nhập bình luận" />
                      )}
                    />
                    {hookForm.formState.errors.comment && (
                      <p className="error-msg">
                        {hookForm.formState.errors.comment.message}
                      </p>
                    )}
                  </div>

                  <Button
                    className="movie-detail__footer__comment__input__btn"
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                  >
                    Bình luận
                  </Button>
                </form>
              </div>

              <div className="movie-detail__footer__comment__content">
                {movie?.listComments?.map((i) => (
                  <div key={i.id} className="item-comment">
                    <div className="item-comment__header">
                      <div className="item-comment__header__name">
                        {i.account.username}
                      </div>

                      <div className="item-comment__header__date">
                        {dayjs(i.date).format("DD/MM/YYYY")}
                      </div>
                    </div>

                    <div className="item-comment__content">{i.content}</div>
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default MovieDetail;
