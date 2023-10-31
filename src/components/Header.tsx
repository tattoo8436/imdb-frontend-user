import {
  DownOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import React, { useContext } from "react";
import { Button, Dropdown, MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { getCurrentAccount } from "../utils";
import { ContextLocation } from "../App";

const Header = () => {
  const isLogin: boolean = localStorage.getItem("account") !== null;
  const account = getCurrentAccount();
  const navigate = useNavigate();
  const location = useLocation();
  const contextLocation: any = useContext(ContextLocation);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <div onClick={handleLogout}>Đăng xuất</div>,
    },
  ];

  return (
    <div className="header">
      <div className="header__left">
        <VideoCameraOutlined
          className="header__left__item logo"
          onClick={() => navigate("/")}
        />

        <div className="header__left__item">Phim lẻ</div>

        <div className="header__left__item">Phim bộ</div>
      </div>

      <div className="header__right">
        {isLogin ? (
          <Dropdown menu={{ items }}>
            <div className="header__right__btn">
              <UserOutlined className="header__right__btn__avatar" />
              <span>{account?.username}</span>
            </div>
          </Dropdown>
        ) : (
          <>
            <div
              className="header__right__btn"
              onClick={() => {
                contextLocation.setPreLocation(
                  location.pathname + location.search
                );
                navigate("/login");
              }}
            >
              Đăng nhập
            </div>
            <div
              className="header__right__btn"
              onClick={() => navigate("/register")}
            >
              Đăng ký
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
