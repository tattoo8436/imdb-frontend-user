import { SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import React from "react";

interface IProps {
  navigate: any;
}
const ContentHeader = (props: IProps) => {
  const { navigate } = props;

  return (
    <div className="content-header card">
      <div className="content-header__title">Chào mừng!</div>

      <div className="content-header__description">
        Rất nhiều bộ phim, chương trình truyền hình để khám phá.
      </div>

      <Button
        className="content-header__search"
        type="primary"
        onClick={() => navigate("/search")}
      >
        Khám phá ngay
      </Button>
    </div>
  );
};

export default ContentHeader;
