import reducer, {
  modalState,
  closeAllModals,
  openIngredient,
  setOpenOrderModal,
} from "./modalReducer";

describe("modal reducer test", () => {
  it("should handle closeAllModals", () => {
    expect(reducer(modalState, closeAllModals)).toEqual({
      ...modalState,
      ingredientDetails: {
        isOpened: false
      },
      orderDetails: {
        isOpened: false
      }
    });
  });
  it("should handle openIngredient", () => {
    expect(reducer(modalState, openIngredient)).toEqual({
      ...modalState,
      ingredientDetails: {
        isOpened: true
      },
    });
  });
  it("should handle setOpenOrderModal", () => {
    expect(reducer(modalState, setOpenOrderModal)).toEqual({
      ...modalState,
      orderDetails: {
        isOpened: true
      }
    });
  });
});