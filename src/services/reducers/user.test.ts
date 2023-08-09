import reducer, {
  userState,
  setAuthChecked,
  setResetUserError,
  setUser,
  setUserRequest,
} from "./userReducer";
import {
  onLogin,
  onLogout,
  onRegister,
  onReset,
  onResetPassword,
  onUpdateUser,
} from "../actions/actions";
import { payload, user } from "../../utils/test-constants";

describe("user reducer test", () => {
  it("should handle setAuthChecked", () => {
    expect(reducer(userState, setAuthChecked(true))).toEqual({
      ...userState,
      isAuthChecked: true,
    });
  });
  it("should handle setUser", () => {
    const action = setUser(payload);

    expect(reducer(userState, action)).toEqual({
      ...userState,
      userData: {
        name: payload.user.name,
        email: payload.user.email,
      },
    });
  });
  it("should handle setUserRequest", () => {
    expect(reducer(userState, setUserRequest(true))).toEqual({
      ...userState,
      userRequest: true,
    });
  });
  it("should handle setResetUserError", () => {
    expect(reducer(userState, setResetUserError)).toEqual({
      ...userState,
      userError: null,
    });
  });
});

describe("user test onRegister in extra-reducers", () => {
  it("should handle onRegister is pending", () => {
    const action = { type: onRegister.pending.type };

    expect(reducer(userState, action)).toEqual({
      ...userState,
      registerRequest: true,
    });
  });
  it("should handle onRegister is fulfilled", () => {
    const action = {
      type: onRegister.fulfilled.type,
      payload: {
        success: true,
        user,
      },
      userError: null,
      registerRequest: false,
    };
    expect(reducer(userState, action)).toEqual({
      ...userState,
      userError: null,
      registerRequest: false,
      userData: {
        name: user.name,
        email: user.email,
      },
    });
  });
  it("should handle onRegister is rejected", () => {
    const action = {
      type: onRegister.rejected.type,
      payload: {
        success: false,
        message: "error",
      },
      registerRequest: false,
    };
    expect(reducer(userState, action)).toEqual({
      ...userState,
      registerError: {
        success: false,
        message: "error",
      },
      registerRequest: false,
    });
  });
});

describe("user test onLogin in extra-reducers", () => {
  it("should handle onLogin is pending", () => {
    const action = { type: onLogin.pending.type };

    expect(reducer(userState, action)).toEqual({
      ...userState,
      loginRequest: true,
    });
  });
  it("should handle onLogin is fulfilled", () => {
    const action = {
      type: onLogin.fulfilled.type,
      payload: {
        success: true,
        user,
      },
      userError: null,
      loginRequest: false,
    };
    expect(reducer(userState, action)).toEqual({
      ...userState,
      userError: null,
      loginRequest: false,
      userData: {
        name: user.name,
        email: user.email,
      },
    });
  });
  it("should handle onLogin is rejected", () => {
    const action = {
      type: onLogin.rejected.type,
      payload: {
        success: false,
        message: "error",
      },
      loginRequest: false,
    };
    expect(reducer(userState, action)).toEqual({
      ...userState,
      loginError: {
        success: false,
        message: "error",
      },
      loginRequest: false,
    });
  });
});

describe("user test onLogout in extra-reducers", () => {
  it("should handle onLogout is pending", () => {
    const action = { type: onLogout.pending.type };

    expect(reducer(userState, action)).toEqual({
      ...userState,
      logoutRequest: true,
    });
  });
  it("should handle onLogout is fulfilled", () => {
    const action = { type: onLogout.fulfilled.type };
    expect(reducer(userState, action)).toEqual({
      ...userState,
      userUpdated: false,
      logoutRequest: false,
      userData: {
        name: "",
        email: "",
      },
    });
  });
  it("should handle onLogout is rejected", () => {
    const action = {
      type: onLogout.rejected.type,
      payload: {
        success: false,
        message: "error",
      },
      logoutRequest: false,
    };
    expect(reducer(userState, action)).toEqual({
      ...userState,
      logoutError: {
        success: false,
        message: "error",
      },
      logoutRequest: false,
    });
  });
});

describe("user test onReset in extra-reducers", () => {
  it("should handle onReset is pending", () => {
    const action = { type: onReset.pending.type };

    expect(reducer(userState, action)).toEqual({
      ...userState,
      resetRequest: true,
    });
  });
  it("should handle onReset is fulfilled", () => {
    const action = {
      type: onReset.fulfilled.type,
      payload: {
        success: true,
      },
      resetRequest: false,
    };
    expect(reducer(userState, action)).toEqual({
      ...userState,
      resetRequest: false,
      resetRequestConfirmed: true,
    });
  });
  it("should handle onReset is rejected", () => {
    const action = {
      type: onReset.rejected.type,
      payload: {
        success: false,
        message: "error",
      },
      resetRequest: false,
    };
    expect(reducer(userState, action)).toEqual({
      ...userState,
      resetRequestError: {
        success: false,
        message: "error",
      },
      resetRequest: false,
    });
  });
});

describe("user test onResetPassword in extra-reducers", () => {
  it("should handle onResetPassword is pending", () => {
    const action = { type: onResetPassword.pending.type };

    expect(reducer(userState, action)).toEqual({
      ...userState,
      changePasswordRequest: true,
    });
  });
  it("should handle onResetPassword is fulfilled", () => {
    const action = {
      type: onResetPassword.fulfilled.type,
      payload: {
        success: true,
      },
      changePasswordRequest: false,
    };
    expect(reducer(userState, action)).toEqual({
      ...userState,
      changePasswordConfirmed: true,
      changePasswordRequest: false,
    });
  });
  it("should handle onResetPassword is rejected", () => {
    const action = {
      type: onResetPassword.rejected.type,
      payload: {
        success: false,
        message: "error",
      },
      changePasswordRequest: false,
    };
    expect(reducer(userState, action)).toEqual({
      ...userState,
      changePasswordError: {
        success: false,
        message: "error",
      },
      changePasswordRequest: false,
    });
  });
});

describe("user test onUpdateUser in extra-reducers", () => {
  it("should handle onUpdateUser is pending", () => {
    const action = { type: onUpdateUser.pending.type };

    expect(reducer(userState, action)).toEqual({
      ...userState,
      updateRequest: true,
    });
  });
  it("should handle onUpdateUser is fulfilled", () => {
    const action = {
      type: onUpdateUser.fulfilled.type,
      payload: {
        success: true,
        user,
      },
      userUpdated: true,
      updateRequest: false,
    };
    expect(reducer(userState, action)).toEqual({
      ...userState,
      userUpdated: true,
      updateRequest: false,
      userData: {
        name: user.name,
        email: user.email,
      },
    });
  });
  it("should handle onUpdateUser is rejected", () => {
    const action = {
      type: onUpdateUser.rejected.type,
      payload: {
        success: false,
        message: "error",
      },
      updateRequest: false,
    };
    expect(reducer(userState, action)).toEqual({
      ...userState,
      userError: {
        success: false,
        message: "error",
      },
      updateRequest: false,
    });
  });
});
