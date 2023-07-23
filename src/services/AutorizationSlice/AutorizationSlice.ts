import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/api";
import { setCookie, getCookie, CookiesDelete } from "../../utils/cookie";

interface SendAutorizationDataParams {
  email: string;
  password: string;
}
export const SendAutorizationData = createAsyncThunk(
'autorization/senddata',
async (params: SendAutorizationDataParams) => {
  console.log(params)
  const response = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'Application/json',
    },
    body: JSON.stringify({
      email: params.email,
      password: params.password
    })
  })
  const data = await response.json();
  console.log(data)
    if (data.success) {
      const {refreshToken, accessToken} = data;
      sessionStorage.setItem('login', JSON.stringify(true));
      setCookie('access', accessToken.split('Bearer ')[1]);
      setCookie('refresh', refreshToken);
      return data
    } 
    throw new Error("Ошибка" + data.status);
}
)
export const LogoutUserThunk = createAsyncThunk(
  'autorization/logout',
  async(params) => {
    const response = await fetch(`${baseUrl}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify({
        token: getCookie('refresh')
    })
  })
  const data = await response.json();
  console.log(data)
   console.log(data.success)
  if(data.success){
    sessionStorage.removeItem('login');
    CookiesDelete()
    return data
  }
  throw new Error("Ошибка" + data.status);
  });

const AutorizationSlice = createSlice({
  name: 'autorization',
  initialState: {
    success: false,
    error: '',
    user: {
      name: null,
      email: null,
    },
    login: null,
    logout: false,
  },
  reducers: {

  },
  extraReducers: {
    [SendAutorizationData.fulfilled.type]: (state, action ) => {
      state.success = action.payload.success;
      state.user = action.payload.user;
    },
    [SendAutorizationData.rejected.type]: (state, action) => {
      state.error = action.payload;
       console.log(action.payload)
    },
    [LogoutUserThunk.fulfilled.type]: (state, action ) => {
      state.success = action.payload.success;
      state.user = action.payload.user;
      state.logout = action.payload.success
    },
    [LogoutUserThunk.rejected.type]: (state, action) => {
      state.error = action.payload;
    },

}
})

export default AutorizationSlice.reducer;
