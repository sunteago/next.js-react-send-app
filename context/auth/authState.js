import React, { useReducer } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";

import {
  AUTH_USER,
  REGISTER_SUCCEED,
  REGISTER_ERROR,
  CLEAN_ALERT,
  LOGIN_ERROR,
  LOGIN_SUCCEED,
  LOGOUT,
} from "../../types";

import axiosClient from "../../config/axios";
import tokenAuth from "../../config/tokenAuth";

const initialState = {
  token:
    typeof window !== "undefined" ? localStorage.getItem("rs_token") : null,
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

  const logIn = async (loginData) => {
    try {
      const response = await axiosClient.post("/api/auth", loginData);

      dispatch({
        type: LOGIN_SUCCEED,
        payload: response.data.token,
      });
    } catch (err) {
      dispatch({  
        type: LOGIN_ERROR,
        payload: err.response.data.msg,
      });
    }

    setTimeout(() => {
      dispatch({ type: CLEAN_ALERT });
    }, 3000);
  };

  const authUser = async () => {
    const token = localStorage.getItem("rs_token");
    if (token) {
      tokenAuth(token);
    }

    try {
      const response = await axiosClient.get("/api/auth");
      if (response.data.user) {
        dispatch({
          type: AUTH_USER,
          payload: response.data.user,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const logOut = () => {
    dispatch({ type: LOGOUT });
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
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
