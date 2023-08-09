import { useState } from "react";
import {
  onLogin,
  onRegister,
  onReset,
  onResetPassword,
  onUpdateUser,
} from "../services/actions/actions";

import { TUser, useAppDispatch, useAppSelector } from "../services/types";
import { TEventTarget } from "./types";

export const useForm = (inputValues: TUser) => {
  const { userData } = useAppSelector((store) => store.user);
  const [values, setValues] = useState(inputValues);
  const [isFormEdited, setIsFormEdited] = useState(false);
  const dispatch = useAppDispatch();

  const handleChange = (event: TEventTarget) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
    setIsFormEdited(true);
  };

  const handleResetForm = () => {
    setValues({
      name: userData.name,
      email: userData.email,
      password: "",
      token: "",
    });
    setIsFormEdited(false);
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!values.email || values.password!.length < 6) {
      return;
    }
    dispatch(onLogin(values));
    setValues({
      name: "",
      email: "",
      password: "",
      token: "",
    });
  };

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(onRegister(values));
    setValues({
      name: "",
      email: "",
      password: "",
      token: "",
    });
  };

  const handleReset = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(onReset(values));
  };

  const handleResetPassword = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(onResetPassword(values));
  };

  const handleUpdateUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values.name) {
      dispatch(onUpdateUser(values));
      setValues({
        name: "",
        email: "",
        password: "",
        token: "",
      });
      setIsFormEdited(false);
    }
  };

  return {
    values,
    handleChange,
    isFormEdited,
    setIsFormEdited,
    handleResetForm,
    handleLogin,
    handleRegister,
    handleReset,
    handleResetPassword,
    handleUpdateUser,
  };
};
