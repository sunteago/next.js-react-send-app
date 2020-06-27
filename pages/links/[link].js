import React, { useState, useContext } from "react";
import Layout from "../../components/Layout";
import axiosClient from "../../config/axios";
import AppContext from '../../context/app/appContext';
import Alert from "../../components/Alert";

export async function getServerSideProps({ params }) {
  const { link } = params;

  const result = await axiosClient.get(`/api/links/${link}`);

  return {
    props: {
      link: result.data,
    },
  };
}

export async function getServerSidePaths() {
  const links = await axiosClient.get("/api/links");

  return {
    paths: links.data.links.map((link) => ({
      params: { link: link.url },
    })),
    fallback: false,
  };
}

export default ({ link }) => {
  console.log(link);
  const { showAlert, fileMessage } = useContext(AppContext);

  const [hasPassword, setHasPassword] = useState(link.password);
  const [password, setPassword] = useState("");
  const [downloadLink, setDownloadLink] = useState(link);

  const validatePassword = async (e) => {
    e.preventDefault();

    try {
      const result = await axiosClient.post(`/api/links/${link.link}`, {password});
      setHasPassword(result.data.password);
      console.log(result);
      setDownloadLink(result.data);
    } catch (err) {
      showAlert(err.response.data.msg);
    }
  };

  return (
    <Layout>

      {hasPassword ? (
        <>
          <p className="text-center">
            This download link is protected via password:
          </p>
          <p className="text-center">{downloadLink.filename}</p>
          {fileMessage && <Alert />}
          <div className="flex justify-center mt-5">
            <div className="max-w-lg w-full">
              <form
                className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                onSubmit={validatePassword}
              >
                <div className="mb-4">
                  <label
                    className="block text-black text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow:outline"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Validate Password"
                  className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
                />
              </form>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-4xl text-center text-gray-700">
            Download this file:
          </h1>
          <p className="text-center">{downloadLink.filename}</p>

          <div className="flex items-center justify-center mt-10">
            <a
              href={`${process.env.backendURL}/api/files/${downloadLink.file}`}
              className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer"
            >
              Download
            </a>
          </div>
        </>
      )}
    </Layout>
  );
};
