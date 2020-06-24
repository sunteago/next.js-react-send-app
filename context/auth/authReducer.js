import {
  AUTH_USER,
  REGISTER_SUCCEED,
  REGISTER_ERROR,
  CLEAN_ALERT,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCEED:
    case REGISTER_ERROR:
      return { ...state, message: action.payload };
    case CLEAN_ALERT:
      return { ...state, message: null };
    default:
      return state;
  }
};
