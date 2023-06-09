import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/api";


const initialState = {
  initialIngredient: null,
  applyIngredients: [],
}

const ConstructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    constructorThunk(state, { payload }) {
      state.initialIngredient = payload.data;
    },
    moveIngredientThunk(state, { payload }) {
      let res = [];
      const { start, end } = payload;

      if (start === end) {
        return state.applyIngredients
      } else if (start > end) {
        res = [
            ...state.applyIngredients.slice(0, end),
            state.applyIngredients[start],
            ...state.applyIngredients.slice(end, start),
            ...state.applyIngredients.slice(start + 1),
        ];
      } else {
        res = [
            ...state.applyIngredients.slice(0, start),
            ...state.applyIngredients.slice(start + 1, end + 1),
            state.applyIngredients[start],
            ...state.applyIngredients.slice(end + 1)
        ]
      }
      state.applyIngredients = res;
    },
    deleteIngredientThunk(state, {payload}) {
      state.applyIngredients = state.applyIngredients.filter((_, index) => index !== payload.index)
    },
    applyIngredientsThunk(state, {payload}) {
      state.applyIngredients = [...state.applyIngredients, payload.data]
    },
    popupCurrentValue(state, {payload}) {
      if (payload.id) {
        state.popup.open = true;
        state.popup.id = payload.id
        return 
      }
      state.popup.open = false;
      state.popup.id = null;
    }
  }
})

export default ConstructorSlice.reducer;
export const {constructorThunk, moveIngredientThunk, deleteIngredientThunk, applyIngredientsThunk, popupCurrentValue} = ConstructorSlice.actions
