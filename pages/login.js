import React, { useContext} from 'react';
import Layout from '../components/Layout';
import { useFormik } from "formik";
import * as Yup from "yup";
import authContext from '../context/auth/authContext';
import Alert from '../components/Alert';
import {useRouter} from 'next/router';

const Login = () => {

  const {message, logIn, authenticated} = useContext(authContext);

  const router = useRouter();

    const formik = useFormik({
        initialValues: {
          email: "",
          password: "",
        },
        validationSchema: Yup.object({
          email: Yup.string()
            .email("Email is not valid")
            .required("Email is required"),
          password: Yup.string()
            .required("Password cannot be empty")
        }),
        onSubmit: (values) => {
          logIn(values);
        },
      });

    if (authenticated) router.push('/');

    return (
        <Layout>
        <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
          <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">
            Log In
          </h2>
          {message && <Alert />}
          <div className="flex justify-center mt-5">
            <div className="max-w-lg w-full">
              <form
                className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                onSubmit={formik.handleSubmit}
              >  
                <div className="mb-4">
                  <label
                    className="block text-black text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow:outline"
                    id="email"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.touched.email && formik.errors.email ? (
                  <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.email}</p>
                  </div>
                ) : null}
  
                <div className="mb-4">
                  <label
                    className="block text-black text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow:outline"
                    id="password"
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.password}</p>
                  </div>
                ) : null}
  
                <input
                  type="submit"
                  value="Log In"
                  className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
                />
              </form>
            </div>
          </div>
        </div>
      </Layout>
    )
}

export default Login;