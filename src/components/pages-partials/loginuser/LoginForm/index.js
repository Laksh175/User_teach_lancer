import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import { connect } from "react-redux";
import { userLogin } from "../../../../store/action/user/AddData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../../../validation";

const LoginForm = ({ dispatch, res }) => {

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState } = useForm(formOptions);

  const { errors } = formState;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const onSubmit = async () => {
    dispatch(userLogin(data));
  };

  useEffect(() => {
    const data = res.data ? res.data.data : [];

    if (data) {
      if (data.code == 200) {
        toast.success(data.message, { position: "top-center" });

        setTimeout(() => {
          window.location = "/sales-academy";
        }, 1000);
      }

      if (data.code == 401) {
        toast.warning(data.message, { position: "top-center" });
      }
    }
  }, [res]);

  return (
    <div className="min-h-screen h-full flex items-center justify-center bg-gradient-to-r from-[#202040] to-[#3DC0DF]">

      <ToastContainer />

      <div className="w-full max-w-md bg-white shadow-2xl rounded-xl p-8">

        {/* Logo / Title */}

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#202040]">
            Welcome Back
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Login to your Teachlancer account
          </p>
        </div>

        {/* FORM */}

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>

          {/* EMAIL */}

          <div>
            <label className="text-sm font-semibold text-gray-600">
              Email
            </label>

            <input
              type="text"
              placeholder="Enter your email"
              {...register("email")}
              name="email"
              value={data.email}
              onChange={handleChange}
              autoComplete="off"
              className={`w-full mt-2 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#3DC0DF]
              ${errors.email ? "border-red-500" : "border-gray-300"}`}
            />

            <p className="text-red-500 text-xs mt-1">
              {errors.email?.message}
            </p>
          </div>

          {/* PASSWORD */}

          <div>
            <label className="text-sm font-semibold text-gray-600">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              name="password"
              value={data.password}
              onChange={handleChange}
              autoComplete="off"
              className={`w-full mt-2 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#3DC0DF]
              ${errors.password ? "border-red-500" : "border-gray-300"}`}
            />

            <p className="text-red-500 text-xs mt-1">
              {errors.password?.message}
            </p>
          </div>

          {/* FORGET PASSWORD */}

          <div className="flex justify-end">

            <NextLink
              href="/forget-password"
              className="text-sm text-[#3DC0DF] hover:underline"
            >
              Forgot Password?
            </NextLink>

          </div>

          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="w-full bg-[#202040] text-white p-3 rounded-lg font-semibold hover:bg-[#3DC0DF] hover:text-[#202040] transition"
          >
            Login
          </button>

        </form>

        {/* SIGNUP */}

        <div className="text-center mt-6 text-sm">

          <span className="text-gray-500">
            New to Teachlancer?
          </span>

          <NextLink
            href="/student-signup"
            className="ml-2 text-[#3DC0DF] font-semibold hover:underline"
          >
            Create Account
          </NextLink>

        </div>

      </div>

    </div>
  );
};

const mapStateToProps = (state) => ({
  res: state.userLogin,
});

export default connect(mapStateToProps)(LoginForm);