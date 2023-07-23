import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/api";

export const RequestResetPassword = createAsyncThunk(
'resetpassword/request',
async (params: { password: string, token: string }) => {
  const { password, token } = params;
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
    [RequestResetPassword.fulfilled.type]: (state, action) => {
      state.error = '';
      state.success = action.payload.success;
    },
    [RequestResetPassword.rejected.type]: (state, { error }) => {
      state.error = error.message;
      console.log(error.message);
    },
  }
});

export default ResetPasswordSlice.reducer;
