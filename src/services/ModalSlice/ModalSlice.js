import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/api";
import { _checkResponse } from "../../utils/checkresponse";

const openModal = createAsyncThunk(
  'modal/openModal',
  async (params) => {
    const { modalType, modalContent } = params;

    if (modalType === 'ingredient') {
      return params
    }

    if (!modalContent) return null;

    
      const response = await fetch(`${baseUrl}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ingredients: modalContent.map((el) => el._id)
        })
      })
  
      const data = await _checkResponse(response);
  
      if (data.success) {
        return {...params, modalContent: data}
      }
  }
)
export const ModalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    modalType: null, // "constructor" | "ingredient"
    modalContent: null,
  },
  reducers: {
    // openModal: (state, action) => {
    //    (action.payload)
    //   state.isOpen = true;
    //   state.modalType = action.payload.modalType;
    //   state.modalContent = action.payload.modalContent;
    // },
    closeModal: (state) => {
      state.isOpen = false;
      state.modalType = null;
      state.modalContent = null;
    }
  },
  extraReducers: {
    [openModal.fulfilled]: (state, action ) => {
      state.isOpen = true;
      state.modalType = action.payload.modalType;
      state.modalContent = action.payload.modalContent;
    },
    [openModal.rejected]: (state, action) => {
      state.error = action.payload;
    },
}
});

export {
  openModal,
};

export const { closeModal } = ModalSlice.actions;

export default ModalSlice.reducer;