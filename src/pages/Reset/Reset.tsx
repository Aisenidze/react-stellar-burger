import { FC } from "react";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useLocation } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useAppSelector } from "../../services/types";
import { IUseLocation } from "../../types";
import Loading from "../Loading/Loading";
import styles from "./Reset.module.css";

export const Reset: FC = () => {
  const isAuthChecked = useAppSelector((store) => store.user.isAuthChecked);
  const resetRequest = useAppSelector((store) => store.user.resetRequest);
  const user = useAppSelector((store) => store.user.userData.name);
  const store = useAppSelector((store) => store);
  const { state } = useLocation<IUseLocation>();

  const userData = {
    name: "",
    email: "",
    password: "",
    token: "",
  };

  const { values, handleChange, handleReset } = useForm(userData);

  if (store.user.resetRequestConfirmed) {
    return <Redirect to={{ pathname: "/reset-password" }} />;
  }

  if (isAuthChecked && user) {
    return <Redirect to={state?.from || "/"} />;
  }

  if (resetRequest) {
    return <Loading />;
  }

  return (
    <div className={`${styles.reset} `}>
      <form
        name="register"
        action="#"
        onSubmit={handleReset}
        className={`${styles.form}`}
      >
        <h3 className={`mb-6 text text_type_main-medium ${styles.text}`}>
          Сброс пароля
        </h3>
        <EmailInput
          extraClass={`mb-6`}
          onChange={handleChange}
          value={values.email}
          name={"email"}
          isIcon={false}
          required
        />
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          extraClass={`mb-20`}
        >
          Восстановить
        </Button>

        <p
          className={`mb-4 text text_color_inactive text_type_main-default ${styles.text}`}
        >
          Вспомнили пароль? &nbsp;
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
