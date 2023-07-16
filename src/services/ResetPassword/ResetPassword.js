import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/api";

export const RequestResetPassword = createAsyncThunk(
'resetpassword/request',
async ({ password, token }) => {
  const response = await fetch(`${baseUrl}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password,
      token,
    })
  });

  const data = await response.json();
  console.log(data);
  if (data.success) return data;

  throw new Error("Ошибка " + data.message);
})

export const ResetPasswordSlice = createSlice({
  name: 'resetpassword',
  initialState: {
    success: false,
    error: '',
  },
  reducers: {},
  extraReducers: {
    [RequestResetPassword.fulfilled]: (state, action) => {
      state.error = '';
      state.success = action.payload.success;
    },
    [RequestResetPassword.rejected]: (state, { error }) => {
      state.error = error.message;
      console.log(error.message);
    },
  }
});

export default ResetPasswordSlice.reducer;
