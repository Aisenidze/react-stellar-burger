import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/api";

const initialState = {
  initialIngredient: null,
  applyIngredients: [],
  applyOrder: null,
  popup: {
    open: false,
    id: null,
  },
  error: '',
}

const applyOrderThunk = createAsyncThunk(
  'constructor/applyOrder',
  async (params) => {
    const { items } = params;

    if (!items) return null;

    
      const response = await fetch(`${baseUrl}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ingredients: items.map((el) => el._id)
        })
      })
  
      const data = await response.json();
  
      if (data.success) {
        return data
      }
  }
)

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
      console.log(payload)
      if (payload.id) {
        state.popup.open = true;
        state.popup.id = payload.id
        return 
      }
      state.popup.open = false;
      state.popup.id = null;
    }
  },
  extraReducers: {
      [applyOrderThunk.fulfilled]: (state, { payload }) => {
        state.error = '';
        state.applyOrder = payload;
        state.applyIngredients = [];
      },
      [applyOrderThunk.rejected]: (state, action) => {
        state.error = action.payload;
      },
  }
})

export {
  applyOrderThunk,
};


export default ConstructorSlice.reducer;
export const {constructorThunk, moveIngredientThunk, deleteIngredientThunk, applyIngredientsThunk, popupCurrentValue} = ConstructorSlice.actions
