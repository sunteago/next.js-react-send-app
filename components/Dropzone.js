import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axiosClient from "../config/axios";

const Dropzone = () => {

  const onDrop = useCallback(() => {
  });

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({onDrop});

  return (
    <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4">
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
    </div>
  );
};

export default Dropzone;
