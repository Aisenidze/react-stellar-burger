import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  initialIngredient: null,
  applyIngredients: [],
  applyOrder: null,
}

const constructorThunk = createAsyncThunk(
  'constructor/getIngredients',
   (params) => {
    const { data, edit } = params;
    if (edit) {
      return data
    }
    if (data) {
      return data.find((ingr) => ingr.type === 'bun');
    }

    return;
  }
)

const applyIngredientsThunk = createAsyncThunk(
  'constructor/applyIngredients',
  (params) => {
    const { data } = params;
    return data
  }
)

const deleteIngredientThunk = createAsyncThunk(
  'constructor/deleteIngredient',
  (params) => {
    const { index } = params;
    return index; 
  }
)

const applyOrderThunk = createAsyncThunk(
  'constructor/applyOrder',
  async (params) => {
    const { items } = params;

    if (!items) return null;
    try {
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
    } catch(e) {
      console.log(e)
    } 

  }
)

const ConstructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(constructorThunk.fulfilled, (state, { payload }) => {
        state.initialIngredient = payload;
      })
      .addCase(applyIngredientsThunk.fulfilled, (state, { payload }) => {
        state.applyIngredients = [...state.applyIngredients, payload]
      })
      .addCase(deleteIngredientThunk.fulfilled, (state, { payload }) => {
        state.applyIngredients = state.applyIngredients.filter((_, index) => index !== payload)
      })
      .addCase(applyOrderThunk.fulfilled, (state, { payload }) => {
        state.applyOrder = payload;
        state.applyIngredients = [];
      })
  }
})

export {
  constructorThunk,
  applyIngredientsThunk,
  deleteIngredientThunk,
  applyOrderThunk,
};

export default ConstructorSlice.reducer;
