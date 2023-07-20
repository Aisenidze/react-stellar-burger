import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/api";
import { _checkResponse } from "../../utils/checkresponse";
import { refreshToken } from "../../utils/request";
import { getCookie } from "../../utils/cookie";

export const getUserInfoThunk = createAsyncThunk(
  'user/getUserInfoThunk',
  async(params) => {
    const url = `${baseUrl}/auth/user`;
    const response = await fetch(url, {
      headers: {
        authorization: 'Bearer ' + getCookie('access'),
        'Content-Type': 'application/json'
      }
    }
    )
    const data = await _checkResponse(response);
  
    if(data.success) {
      return data
    } else {
      refreshToken()
    }
  });

export const patchUserInfoThunk = createAsyncThunk(
 'user/patchUserInfoThunk',
  async(email, name, password) => {
  const url = `${baseUrl}/auth/user`;
  const response = await fetch(url, {
      method: 'PATCH',
      headers: {
          authorization: 'Bearer ' + getCookie('access'),
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          email,
          name,
          password
      })
  })
  const data = await response.json();
  if(data.success) {
    return data
  } else {
    refreshToken();
  }
});

 const UserSlice = createSlice({
  name: 'user',
  initialState: {
    success: false,
    user: {
        email: '',
        name: ''
    }
    },
  reducers: {},
  extraReducers: {
    [getUserInfoThunk.fulfilled]: (state, action) => {
      state.success = action.payload.success;
      state.user = action.payload.user;
    },
    [getUserInfoThunk.rejected]: (state, action) => {
      state.error = action.payload;
    }
  }
});

export default UserSlice.reducer;