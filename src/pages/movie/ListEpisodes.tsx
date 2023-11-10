import { Tabs, TabsProps } from "antd";
import React, { useEffect, useState } from "react";
import { IEpisode, IMovie } from "../../utils/type";
import { useNavigate } from "react-router-dom";
import { BASE_URL_API } from "../../utils";
import dayjs from "dayjs";
import { StarFilled } from "@ant-design/icons";
import numeral from "numeral";

interface IProps {
  movie: IMovie | null;
}

const ListEpisodes = (props: IProps) => {
  const { movie } = props;
  const navigate = useNavigate();

  const [listEpisodes, setListEpisodes] = useState<IEpisode[]>([]);

  useEffect(() => {
    handleChangeSeason(1);
  }, []);

  const handleChangeSeason = (season: number) => {
    setListEpisodes(
      movie?.listEpisodes?.filter((i) => i.season === season) ?? []
    );
  };

  const items: any = () => {
    const arr: TabsProps["items"] = [];
    if (movie) {
      for (let i = 0; i < movie?.numberSeason; i++) {
        arr.push({
          key: String(i + 1),
          label: `Mùa ${i + 1}`,
          children: (
            <div>
              {listEpisodes?.map((i) => (
                <div
                  key={i.id}
                  className="episode-item"
                  onClick={() =>
                    navigate(`/episode?episodeId=${i.id}&movieId=${movie?.id}`)
                  }
                >
                  <img
                    className="episode-item__image"
                    src={`${BASE_URL_API}/image/${i.image}`}
                    alt="Ảnh"
                  />

                  <div className="episode-item__detail">
                    <div className="episode-item__detail__name">
                      {`S${i.season}E${i.ep}. ${i.name}`}
                    </div>

                    <div className="episode-item__detail__score">
                      <StarFilled />
                      {i.numberVote > 0 ? i.score?.toFixed(1) : ""}/10
                    </div>

                    <div className="episode-item__detail__description">
                      {i.description}
                    </div>

                    <div className="episode-item__detail__number-vote">
                      Số lượt đánh giá: {numeral(i.numberVote).format("0,")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ),
        });
      }
    }
    console.log(arr);

    return arr;
  };

  return (
    <div className="list-episodes">
      <Tabs
        items={items()}
        defaultActiveKey="1"
        onChange={(e) => handleChangeSeason(Number(e))}
      />
    </div>
  );
};

export default ListEpisodes;
