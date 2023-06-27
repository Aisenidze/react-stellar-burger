import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import { baseUrl } from '../../utils/api';
import { _checkResponse } from '../../utils/checkresponse';

const initialState = {
  buns: [],
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

const countThunk = createAsyncThunk(
  'buns/count',
  async (params) => {
    const { data } = params;

    return data;
  }
)

const AppSlice = createSlice ({
  name: 'buns',
  initialState,
  reducers: {},
  extraReducers: {
    [bunsThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [bunsThunk.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.error = '';
      state.buns = payload;
    },
    [bunsThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [countThunk.fulfilled]: (state, { payload }) => {
      state.buns = [{
        calories: 420,
        carbohydrates: 53,
        fat: 24,
        image: "https://code.s3.yandex.net/react/code/bun-02.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        name: "Краторная булка N-200i",
        price: 1255,
        proteins: 80,
        type: "bun",
        __v: 0,
        _id: "643d69a5c3f7b9001cfa093c"
      }]
    }
  },
})

export {bunsThunk, countThunk};

export default AppSlice.reducer;