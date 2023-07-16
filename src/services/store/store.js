import { configureStore } from "@reduxjs/toolkit";

import AppSlice from "../AppSlice/AppSlice";
import ConstructorSlice from "../ConstructorSlice/ConstructorSlice";
import ModalSlice from "../ModalSlice/ModalSlice";
import ForgotPasswordSlice from "../ForgotPasswordSlice/ForgotPasswordSlice";
import ResetPasswordSlice from "../ResetPassword/ResetPassword";
import RegistrationSlice from "../RegistrationSlice/RegistrationSlice";
import AutorizationSlice from "../AutorizationSlice/AutorizationSlice";
import UserSlice from "../UserSlice/UserSlice";

const store = configureStore ({
  reducer: {
    buns: AppSlice,
    cons: ConstructorSlice,
    modal: ModalSlice,
    forgotpassword: ForgotPasswordSlice,
    resetpassword: ResetPasswordSlice,
    registration: RegistrationSlice,
    autorization: AutorizationSlice,
    info: UserSlice,
  },
});

export default store;
