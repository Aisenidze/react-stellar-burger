import { createSlice } from "@reduxjs/toolkit";

export const ModalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    modalType: null
  },
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.modalType = action.payload.modalType;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.modalType = null;
    }
  }
});

export const { openModal, closeModal } = ModalSlice.actions;

export default ModalSlice.reducer;