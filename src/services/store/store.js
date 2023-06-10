import { configureStore } from "@reduxjs/toolkit";

import AppSlice from "../AppSlice/AppSlice";
import ConstructorSlice from "../ConstructorSlice/ConstructorSlice";
import ModalSlice from "../ModalSlice/ModalSlice";

const store = configureStore ({
  reducer: {
    buns: AppSlice,
    cons: ConstructorSlice,
    modal: ModalSlice,
  },
});

export default store;
