import {
  AUTH_USER,
  REGISTER_SUCCEED,
  REGISTER_ERROR,
  CLEAN_ALERT,
  LOGIN_ERROR,
  LOGIN_SUCCEED,
  LOGOUT,
} from "../../types";
import { useContext } from "react";

export default (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCEED:
    case REGISTER_ERROR:
    case LOGIN_ERROR:
      return { ...state, message: action.payload };
    case LOGIN_SUCCEED:
      localStorage.setItem("rs_token", action.payload);
      return {
        ...state,
        token: action.payload,
        authenticated: true,
      };
    case AUTH_USER:
      return { ...state, user: action.payload, authenticated: true };
    case CLEAN_ALERT:
      return { ...state, message: null };
    case LOGOUT:
      localStorage.removeItem('rs_token');
      return { ...useContext, user: null, token: null, authenticated: null };
    default:
      return state;
  }
};
