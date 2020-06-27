import {
  SHOW_ALERT,
  UPLOAD_FILE_ERROR,
  UPLOAD_FILE_SUCCEED,
  CLEAN_ALERT,
  UPLOADING_FILE_INIT,
  GENERATE_LINK_SUCCEED,
  CLEAN_STATE,
  ADD_PASSWORD,
  ADD_DOWNLOAD_NUMBER,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case UPLOAD_FILE_SUCCEED:
      return {
        ...state,
        name: action.payload.name,
        filename: action.payload.filename,
        loading: null,
      };
    case UPLOAD_FILE_ERROR:
      return { ...state, fileMessage: action.payload, loading: null };
    case UPLOADING_FILE_INIT:
      return {
        ...state,
        loading: true,
      };
    case GENERATE_LINK_SUCCEED:
      return { ...state, url: action.payload };
    case SHOW_ALERT:
      return { ...state, fileMessage: action.payload };
    case CLEAN_ALERT:
      return { ...state, fileMessage: null };
    case CLEAN_STATE:
      return {
        ...state,
        fileMessage: "",
        name: "",
        filename: "",
        loading: null,
        downloads: 1,
        password: "",
        url: "",
        author: null,
      };
    case ADD_PASSWORD:
      return {
        ...state,
        password: action.payload,
      };
    case ADD_DOWNLOAD_NUMBER:
      return { ...state, downloads: action.payload };
    default:
      return state;
  }
};
