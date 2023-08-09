import reducer, {
  dataState,
  getCardData,
  toggleIngredientsTab,
  setWebsocketOpen,
  setWebsocketClose,
  setWebsocketConnection,
  setWebsocketOffline,
  setWebsocketConnectionError,
  setWebsocketGetOrders,
} from "./dataReducer";
import { getAllIngredients, onFetchOrder } from "../actions/actions";
import { item, orders, data } from "../../utils/test-constants";

describe("constructor reducer test", () => {
  it("should handle getCardData if bun", () => {
    const action = getCardData(item);

    expect(reducer(dataState, action)).toEqual({
      ...dataState,
      ingredientDetails: {
        ingredient: item,
      },
    });
  });
  it("should handle toggleIngredientsTab if bun", () => {
    const action = toggleIngredientsTab("bun");

    expect(reducer(dataState, action)).toEqual({
      ...dataState,
      ingredientsCurrentTab: "bun",
    });
  });
  it("should handle setWebsocketOpen if bun", () => {
    const action = setWebsocketOpen(true);

    expect(reducer(dataState, action)).toEqual({
      ...dataState,
      wsOpen: true,
      wsError: null,
    });
  });
  it("should handle setWebsocketClose if bun", () => {
    expect(reducer(dataState, setWebsocketClose)).toEqual({
      ...dataState,
      wsOpen: false,
      wsUrl: "",
      wsError: null,
      orders: null,
    });
  });
  it("should handle setWebsocketConnection if bun", () => {
    const action = setWebsocketConnection(
      "wss://norma.nomoreparties.space/orders/all"
    );

    expect(reducer(dataState, action)).toEqual({
      ...dataState,
      wsConnectionStatus: true,
      wsUrl: "wss://norma.nomoreparties.space/orders/all",
    });
  });
  it("should handle setWebsocketOffline if bun", () => {
    expect(reducer(dataState, setWebsocketOffline)).toEqual({
      ...dataState,
      wsConnectionStatus: false,
    });
  });
  it("should handle setWebsocketConnectionError if bun", () => {
    const action = setWebsocketConnectionError("error");

    expect(reducer(dataState, action)).toEqual({
      ...dataState,
      wsError: "error",
    });
  });
  it("should handle setWebsocketGetOrders if bun", () => {
    const action = setWebsocketGetOrders(orders);

    expect(reducer(dataState, action)).toEqual({
      ...dataState,
      orders,
    });
  });
});

describe("user test getAllIngredients in extra-reducers", () => {
  it("should handle getAllIngredients is pending", () => {
    const action = { type: getAllIngredients.pending.type };

    expect(reducer(dataState, action)).toEqual({
      ...dataState,
      ingredientsRequest: true,
    });
  });
  it("should handle getAllIngredients is fulfilled", () => {
    const action = {
      type: getAllIngredients.fulfilled.type,
      payload: {
        success: true,
        data,
      },
      ingredientsRequest: false,
    };
    expect(reducer(dataState, action)).toEqual({
      ...dataState,
      ingredients: data,
      ingredientsRequest: false,
      success: true,
    });
  });
  it("should handle getAllIngredients is rejected", () => {
    const action = {
      type: getAllIngredients.rejected.type,
      payload: {
        message: "error",
        success: false,
      },
      success: false,
      ingredients: [],
      ingredientsRequest: false,
    };
    expect(reducer(dataState, action)).toEqual({
      ...dataState,
      success: false,
      ingredients: [],
      errorMessage: {
        message: "error",
        success: false,
      },
      ingredientsRequest: false,
    });
  });
});

describe("user test onFetchOrder in extra-reducers", () => {
  it("should handle onFetchOrder is pending", () => {
    const action = { type: onFetchOrder.pending.type };

    expect(reducer(dataState, action)).toEqual({
      ...dataState,
      fetchRequest: true,
    });
  });
  it("should handle onFetchOrder is fulfilled", () => {
    const action = {
      type: onFetchOrder.fulfilled.type,
      payload: {
        ...orders,
      },
    };

    expect(reducer(dataState, action)).toEqual({
      ...dataState,
      orders,
      fetchRequest: false,
      fetchError: null,
    });
  });
  it("should handle onFetchOrder is rejected", () => {
    const action = {
      type: onFetchOrder.rejected.type,
      payload: {
        message: "error",
        success: false,
      },
    };

    expect(reducer(dataState, action)).toEqual({
      ...dataState,
      fetchError: {
        message: "error",
        success: false,
      },
      fetchRequest: false,
    });
  });
});
