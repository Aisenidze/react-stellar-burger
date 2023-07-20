import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/api";

export const RequestForgotPassword = createAsyncThunk(
'forgotpassword/request',
async (email) => {
  const response = await fetch(`${baseUrl}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      email: email
    })
  })
  const data = await response.json();
    return data
}
)

export const ForgotPasswordSlice = createSlice({
  name: 'forgotpassword',
  initialState: {
    success: false,
    error: '',
  },
  reducers: {

  },
  extraReducers: {
    [RequestForgotPassword.fulfilled]: (state, action ) => {
      state.success = action.payload.success;
    },
    [RequestForgotPassword.rejected]: (state, action) => {
      state.error = action.payload.message;
    },
  }
})
export default ForgotPasswordSlice.reducer;