import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/api";

export const SendRegistrationData = createAsyncThunk(
'registration/sendData',
async (params) => {
  const response = await fetch(`${baseUrl}/auth/register`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: params.email,
      password: params.password,
      name: params.name
    })
  });

  const data = await response.json();

  if (data.success) return data;

  throw new Error("Ошибка " + data.message);
})

const RegistrationSlice = createSlice({
  name: 'registration',
  initialState: {
    success: false,
    user: {},
    error: '',
  },
  reducers: {},
  extraReducers: {
    [SendRegistrationData.fulfilled]: (state, { payload }) => {
      state.success = payload.success;
      state.user = payload.user;
    },
    [SendRegistrationData.rejected]: (state, { error }) => {
      state.error = error.message;
      if (error.message === 'Ошибка User already exists') {
        console.log(12);
        state.success = true;
      }
    },
  }
})

export default RegistrationSlice.reducer;
