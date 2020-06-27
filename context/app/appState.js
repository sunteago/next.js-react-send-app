import React, { useReducer } from "react";
import AppContext from "./appContext";
import appReducer from "./appReducer";
import axiosClient from "../../config/axios";
import {
  SHOW_ALERT,
  UPLOADING_FILE_INIT,
  UPLOAD_FILE_ERROR,
  UPLOAD_FILE_SUCCEED,
  CLEAN_ALERT,
  GENERATE_LINK_SUCCEED,
  CLEAN_STATE,
  ADD_PASSWORD,
  ADD_DOWNLOAD_NUMBER
} from "../../types";

const initialState = {
  fileMessage: "",
  name: "",
  filename: "",
  loading: null,
  downloads: 1,
  password: "",
  url: "",
  author: null,
};

const AppState = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  //Show alert

  const showAlert = (msg) => {
    dispatch({
      type: SHOW_ALERT,
      payload: msg,
    });
    setTimeout(() => {
      dispatch({ type: CLEAN_ALERT });
    }, 3000);
  };

  const uploadFile = async (formData, filename) => {
    dispatch({ type: UPLOADING_FILE_INIT });

    try {
      const result = await axiosClient.post("/api/files", formData);

      dispatch({
        type: UPLOAD_FILE_SUCCEED,
        payload: {
          name: result.data.file,
          filename: filename,
        },
      });
    } catch (err) {
      dispatch({
        type: UPLOAD_FILE_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  const createLink = async () => {
    const data = {
      name: state.name,
      filename: state.filename,
      downloads: state.downloads,
      password: state.password,
      author: state.author,
    };

    try {
      const response = await axiosClient.post("/api/links", data);
      dispatch({
        type: GENERATE_LINK_SUCCEED,
        payload: response.data.msg,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const cleanState = () => {
    dispatch({ type: CLEAN_STATE });
  };

  const addPassword = password => {
    dispatch({
      type: ADD_PASSWORD,
      payload: password
    })    
  };

  const addDownloadNumber = downloads => {
    dispatch({
      type: ADD_DOWNLOAD_NUMBER,
      payload: parseInt(downloads)
    })
  };

  return (
    <AppContext.Provider
      value={{
        fileMessage: state.fileMessage,
        name: state.name,
        filename: state.filename,
        loading: state.loading,
        downloads: state.downloads,
        password: state.password,
        author: state.password,
        url: state.url,
        showAlert,
        uploadFile,
        createLink,
        cleanState,
        addPassword,
        addDownloadNumber
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
