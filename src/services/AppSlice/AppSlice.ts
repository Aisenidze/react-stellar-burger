import { createSlice,createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { baseUrl } from '../../utils/api';
import { _checkResponse } from '../../utils/checkresponse';

export interface IngredientData {
  buns: {
    data: BunsData[],
  } | null;
  isLoading?: boolean;
  error?: string;
}

export interface BunsData {
  calories: number,
  carbohydrates: number,
  fat: number,
  image: string,
  image_large: string,
  image_mobile: string,
  name: string,
  price: number,
  proteins: number,
  type: string,
  __v: number,
  _id: string,
  id?: string,
}

const initialState: IngredientData = {
  buns: null,
  isLoading: true,
  error: '',
};

const bunsThunk = createAsyncThunk(
  'buns/getBurger',
  async () => {
      const response = await fetch(`${baseUrl}/ingredients`);
      const data = await _checkResponse(response);
      return data;
  }   
);

const AppSlice = createSlice ({
  name: 'buns',
  initialState,
  reducers: {},
  extraReducers: {
    [bunsThunk.pending.type]: (state) => {
      state.isLoading = true;
    },
    [bunsThunk.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = '';
      state.buns = action.payload;
    },
    [bunsThunk.rejected.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  },
})

export {
  bunsThunk,
};

export default AppSlice.reducer;