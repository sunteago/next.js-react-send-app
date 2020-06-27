import React, { useState, useContext } from "react";
import AppContext from "../context/app/appContext";

const Form = () => {
  const [hasPassword, setHasPassword] = useState(false);

  const { addPassword, addDownloadNumber } = useContext(AppContext);

  return (
    <div className="w-full mt-20">
      <div>
        <label htmlFor="" className="text-lg text-gray-800">
          Delete after
        </label>
        <select 
            className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"
            defaultValue=""
            onChange={(e) => addDownloadNumber(e.target.value)}
        >
          <option value="" disabled>
            -- Select --
          </option>
          <option value="1">1 download</option>
          <option value="5">5 downloads</option>
          <option value="10">10 downloads</option>
          <option value="20">20 downloads</option>
        </select>

        <div className="flex justify-between items-center">
          <label className="text-lg text-gray-800">
            Protect with a password
          </label>
          <input
            type="checkbox"
            onChange={() => setHasPassword((prev) => !prev)}
          />
        </div>
        {hasPassword ? (
          <input
            type="password"
            className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"
            onChange={(e) => addPassword(e.target.value)}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Form;
