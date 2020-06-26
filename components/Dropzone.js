import React, { useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import axiosClient from "../config/axios";
import AppContext from "../context/app/appContext";

const Dropzone = () => {
  const { showAlert, uploadFile, createLink, loading } = useContext(AppContext);

  const onDropRejected = () => {
    showAlert(
      "Could not open, limit is 1MB get free account for up to 10MB for registered users"
    );
  };

  const onDropAccepted = useCallback(async (acceptedFiles) => {
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);
    uploadFile(formData, acceptedFiles[0].path);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
  } = useDropzone({ onDropAccepted, onDropRejected, maxSize: 1024 * 1024 });

  const getMBfromBytes = (bytes) => {
    return (bytes / Math.pow(1024, 2)).toFixed(2);
  };

  const files = acceptedFiles.map((file) => (
    <li
      key={file.lastModified}
      className="bg-white flex-1 p-3 mb-4 shadow-lg rounded"
    >
      <p className="font-bold text-xl">{file.path}</p>
      <p className="text-sm text-gray-900">{getMBfromBytes(file.size)} MB</p>
    </li>
  ));


  return (
    <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4">
      {acceptedFiles.length > 0 ? (
        <div className="mt-10 w-full">
          <h4 className="text-2xl font-bold text-center mb-4">Files</h4>
          <ul>{files}</ul>
          {loading ? (
            <p className="my-10 text-center text-gray-600">Uploading file</p>
          ) : (
            <button
              type="button"
              className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
              onClick={() => createLink()}
            >
              Create Link
            </button>
          )}
        </div>

      ) : (
        <div {...getRootProps({ className: "dropzone w-full py-32" })}>
          <input {...getInputProps()} className="h2-100" />
          {isDragActive ? (
            <p className="text-2xl text-center text-gray-600">Drop the file</p>
          ) : (
            <div className="text-center">
              <p className="text-2xl text-center text-gray-600">
                Select a file and drop it here
              </p>
              <button
                className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
                type="button"
              >
                Select file to upload
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropzone;
