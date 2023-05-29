import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
  buns: [],
  isLoading: true,
  error: '',
};

const bunsThunk = createAsyncThunk(
  'buns/getBurger',
  async (count, {rejectWithValue}) => {
    try{
      const response = await fetch("https://norma.nomoreparties.space/api/ingredients");
      const data = await response.json();
      // console.log('count', count);
      // if (count) {
      //   return data.data.map((el) => ({
      //     ...el,
      //     count: count.filter((apply) => apply.__id === el.__id)
      //   }))
      // }
      return data;
    }
    catch(error){
      return rejectWithValue(error.response.data);
    }
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
      console.log(2);
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
        // if (state.buns) {
          // console.log(1);
          // const asd = state.buns.map((el) => {
          //   return {
          //     ...el,
          //     __v: payload.filter((apply) => apply.__id === el.__id)
          //   }
          // })
          // console.log('asd', asd);
    
          // state.buns = state.buns.map((el) => {
          //   return {
          //     ...el,
          //     __v: payload.filter((apply) => apply.__id === el.__id)
          //   }
          // })
        // }
      // console.log(state.buns);
      // console.log(payload);
      // // state.buns = state.buns.map((el) => el.__id === payload.__id ? {...el, el_: el.__v += 1} : el)
      // console.log(initialState);
      // if (initialState.buns) {
      //   state.buns = state.buns.map((el) => {
      //     return {
      //       ...el,
      //       __v: payload.filter((apply) => apply.__id === el.__id)
      //     }
      //   })
      // }
      // state.buns = []
    }
  },
})

export {bunsThunk, countThunk};

export default AppSlice.reducer;