import { configureStore } from "@reduxjs/toolkit";

import AppSlice from "../AppSlice/AppSlice";
import ConstructorSlice from "../ConstructorSlice/ConstructorSlice";

const store = configureStore ({
  reducer: {
    buns: AppSlice,
    cons: ConstructorSlice,
  },
});

export default store;
