import { VideoCameraOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { accountApi } from "../../apis/accountApi";
import { IAccountLogin } from "../../utils/type";
import { ContextLocation } from "../../App";

const Login = () => {
  const hookForm = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onChange",
  });
  const navigate = useNavigate();
  const contextLocation: any = useContext(ContextLocation);

  const [loading, setLoading] = useState(false);

  const onSubmit = async (value: IAccountLogin) => {
    setLoading(true);
    try {
      const { data } = await accountApi.login(value);
      console.log(data);
      setLoading(false);
      localStorage.setItem("account", JSON.stringify(data));
      navigate(contextLocation.preLocation);
      window.location.reload();
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      toast.error(error.response?.data, { autoClose: 3000 });
    }
  };

  console.log(contextLocation.preLocation);

  return (
    <div className="login">
      <div className="login__content card">
        <div className="login__content__header">
          <VideoCameraOutlined className="login__content__header__icon" />
          <div className="login__content__header__text">The Movie Database</div>
        </div>

        <form className="form" onSubmit={hookForm.handleSubmit(onSubmit)}>
          <div className="form__item">
            <div className="form__item__label">Tên đăng nhập</div>

            <Controller
              name="username"
              control={hookForm.control}
              rules={{
                validate: {
                  required: (v) =>
                    v.trim().length > 0 || "Tên đăng nhập là bắt buộc",
                },
              }}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  placeholder="Tên đăng nhập"
                  className="form__item__input"
                  status={fieldState.error !== undefined ? "error" : ""}
                />
              )}
            />
            {hookForm.formState.errors.username && (
              <p className="error-msg">
                {hookForm.formState.errors.username.message}
              </p>
            )}
          </div>

          <div className="form__item">
            <div className="form__item__label">Mật khẩu</div>

            <Controller
              name="password"
              control={hookForm.control}
              rules={{
                validate: {
                  required: (v) =>
                    v.trim().length > 0 || "Mật khẩu là bắt buộc",
                },
              }}
              render={({ field, fieldState }) => (
                <Input.Password
                  {...field}
                  placeholder="Mật khẩu"
                  className="form__item__input"
                  status={fieldState.error !== undefined ? "error" : ""}
                />
              )}
            />
            {hookForm.formState.errors.password && (
              <p className="error-msg">
                {hookForm.formState.errors.password.message}
              </p>
            )}
          </div>

          <div className="form__btn">
            <Button type="primary" htmlType="submit" loading={loading}>
              Đăng nhập
            </Button>
          </div>
        </form>

        <div className="login__content__footer">
          <span className="login__content__footer__text">
            Chưa có tài khoản?{" "}
          </span>

          <Link to="/register">Đăng ký ngay</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
