import React, { useReducer } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";

import axiosClient from "../../config/axios";

import {
  AUTH_USER,
  REGISTER_SUCCEED,
  REGISTER_ERROR,
  CLEAN_ALERT,
} from "../../types";

const initialState = {
  token: "",
  authenticated: null,
  user: null,
  message: null,
};

const AuthState = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const createUser = async (signupData) => {
    console.log(signupData);
    try {
      const response = await axiosClient.post("/api/users", signupData);
      dispatch({
        type: REGISTER_SUCCEED,
        payload: response.data.msg,
      });
    } catch (err) {
      dispatch({
        type: REGISTER_ERROR,
        payload: err.response.data.msg,
      });
    }

    setTimeout(() => {
      dispatch({ type: CLEAN_ALERT });
    }, 3000);
  };

  const authUser = (name) => {
    dispatch({
      type: AUTH_USER,
      payload: name,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        authenticated: state.authenticated,
        user: state.user,
        message: state.message,
        authUser,
        createUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
