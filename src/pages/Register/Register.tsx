import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useLocation } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { FC } from "react";
import { useAppSelector } from "../../services/types";
import { IUseLocation } from "../../types";
import Loading from "../Loading/Loading";
import styles from "./Register.module.css";

export const Register: FC = () => {
  const isAuthChecked = useAppSelector((store) => store.user.isAuthChecked);
  const registerRequest = useAppSelector((store) => store.user.registerRequest);
  const user = useAppSelector((store) => store.user.userData.name);
  const { state } = useLocation<IUseLocation>();

  const userData = {
    name: "",
    email: "",
    password: "",
    token: "",
  };

  const { values, handleChange, handleRegister } = useForm(userData);

  if (registerRequest) {
    return <Loading />;
  }

  if (isAuthChecked && user) {
    return <Redirect to={state?.from || "/"} />;
  }

  return (
    <div className={`${styles.register} `}>
      <form
        name="register"
        action="#"
        onSubmit={handleRegister}
        className={`${styles.form}`}
      >
        <h3 className={`mb-6 text text_type_main-medium ${styles.text}`}>
          Регистрация
        </h3>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={handleChange}
          value={values.name}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass={`mb-6`}
        />
        <EmailInput
          extraClass={`mb-6`}
          onChange={handleChange}
          value={values.email}
          name={"email"}
          isIcon={false}
        />
        <PasswordInput
          extraClass={`mb-6`}
          onChange={handleChange}
          value={values.password || ''}
          name={"password"}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          extraClass={`mb-20`}
        >
          Зарегистрироваться
        </Button>

        <p
          className={`mb-4 text text_color_inactive text_type_main-default ${styles.text}`}
        >
          Уже зарегистрированы? &nbsp;
          <span>
            <Link
              to="/login"
              className={`text text_type_main-default ${styles.link}`}
            >
              Войти
            </Link>
          </span>
        </p>
      </form>
    </div>
  );
};
