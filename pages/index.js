import React, { useContext, useEffect } from "react";
import Layout from "../components/Layout";
import authContext from "../context/auth/authContext";
import Link from "next/link";
import Dropzone from '../components/Dropzone';

const Index = () => {
  const { authUser } = useContext(authContext);

  useEffect(() => {
    authUser();
  }, []);

  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
          <Dropzone />

          <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">

         
          <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">
            Share your files the simple way
          </h2>
          <p className="text-lg leading-loose">
            <span className="text-red-500 font-bold">React-Send</span> allows
            you to share files the simple way ever possible! Just drag your
            files and we'll do the rest for you!
          </p>
          <Link href="/newaccount">
            <a className="text-red-500 font-bold text-lg hover:text-red-700">
              Create an account for extra features
            </a>
          </Link>
        </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
