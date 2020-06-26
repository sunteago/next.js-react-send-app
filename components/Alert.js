import React, { useContext } from "react";
import authContext from "../context/auth/authContext";
import appContext from "../context/app/appContext";

const Alert = () => {
  const { message } = useContext(authContext);
  const { fileMessage } = useContext(appContext);

  return (
    <div 
        className="bg-red-500 py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto"
    >
        {message || fileMessage}
        </div>
  );
};

export default Alert;
