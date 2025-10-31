import React, { useState } from "react";
import background_image from "../assets/background-img.jpg";
import { useForm } from "react-hook-form";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import useAppContext from "../context/useAppContext";
import { useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth.js";

const Register = () => {
  const navigate = useNavigate();

  const { userDetails, setUserDetails } = useAppContext();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const { login, signUp } = useAuth();
 

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
      setUserDetails(data);
      if (loginState === "Sign In") {
        login(data.email, data.password);
      } else {
        signUp(data.name, data.email, data.password);
      }
      navigate("/admin/dashboard");

      throw new Error();
    } catch (error) {
      console.error(error);
      setError("root", {
        message:
          " Email is already in use. Please use a different email address.",
      });
    }
  };

  const [loginState, setLoginState] = useState("Sign In");

  const toggleLoginState = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setLoginState((prev) => (prev === "Sign In" ? "Sign Up" : "Sign In"));
  };

  const registerWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const res = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        }
      );

      const { name, email } = res.data;

      if (loginState === "Sign In") {
        login(email, "google_oauth");
      } else {
        signUp(email, name, "google_oauth");
      }
      navigate("/admin/dashboard");
      console.log(res.data);
    },
    onError: () => console.log("Google Sign In Failed"),
  });

  console.log(userDetails);
  

  return (
    <div
      style={{ backgroundImage: `url(${background_image})` }}
      className="w-full min-h-screen bg-cover flex items-center justify-center"
    >
      <div className="w-full md:w-[480px] mx-6 md:mx-0 rounded-xl px-10 bg-white py-16 shadow backdrop-blur-sm flex items-center justify-center flex-col ">
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-5"
        >
          {/* company logo */}
          <div className="flex items-center justify-center">
            <img src="#" alt="pureleaf-spa-logo" />
          </div>
          <h3 className="text-center font-600 font-semi text-[30px] gray-900 ">
            {loginState === "Sign Up" ? "Sign Up" : "Welcome Back!"}
          </h3>
          {/* fills */}
          <div className="flex flex-col gap-6 w-full">
            {loginState === "Sign Up" && (
              <div className="flex flex-col gap-2 ">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  {...register("name", { required: true, maxLength: 50 })}
                  placeholder="Enter your name"
                  className={`placeholder-gray-500 rounded-lg text-[16px] py-2.5 px-3.5 outline-none border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } `}
                />
                {errors.name && (
                  <span className="text-red-500 text-[14px]">
                    This field is required
                  </span>
                )}
              </div>
            )}
            <div className="flex flex-col gap-2 ">
              <label htmlFor="email">Email</label>
              <input
                {...register("email", {
                  required: "Email is required. ",
                  validate: (value) => {
                    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    return (
                      pattern.test(value) ||
                      "Please enter a valid email address. "
                    );
                  },
                })}
                type="email"
                placeholder="Enter your email"
                className={`placeholder-gray-500 rounded-lg text-[16px] py-2.5 px-3.5 outline-none border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } `}
              />
              {errors.email && (
                <span className="text-red-500 text-[14px]">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 ">
              <label htmlFor="password">Password</label>
              <input
                {...register("password", {
                  required: "Password is required. ",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters. ",
                  },
                })}
                type="password"
                placeholder="Enter your password"
                className={`placeholder-gray-500 rounded-lg text-[16px] py-2.5 px-3.5 outline-none border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } `}
              />
              {/* will later change dynamically */}
              {errors.password && (
                <span className="text-red-500 text-[14px]">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col w-full gap-4 mt-6">
            <button
              disabled={isSubmitting}
              type="submit"
              className={` border border-[#5c2e1b] py-2.5 px-[18px] rounded-lg text-[18px] font-500 leading-6 text-white cursor-point ${
                isSubmitting
                  ? "bg-[#5c2e1b] opacity-50 cursor-not-allowed"
                  : " bg-[#5c2e1b] hover:text-white transition-all duration-300  "
              } `}
            >
              {isSubmitting
                ? loginState === "Sign In"
                  ? "Signing In..."
                  : "Creating Account..."
                : loginState === "Sign In"
                ? "Sign In"
                : "Create Account"}
            </button>
            {errors.root && (
              <span className="text-red-500 text-[14px]">
                {errors.root.message}
              </span>
            )}
            {/* login via google */}
            <button
              onClick={(event) => {
                event.preventDefault();
                registerWithGoogle();
              }}
              className="flex items-center cursor-pointer justify-center gap-3 rounded-lg border border-gray-300 py-2.5  px-4  "
            >
              <FcGoogle size={24} />

              <span>
                {loginState === "Sign In"
                  ? "Sign In with Google"
                  : "Sign Up with Google"}
              </span>
            </button>
          </div>
        </form>
        <p className="tet-[14px] font-400 text-gray-500 mt-10 ">
          {loginState === "Sign In"
            ? "Don't have an account?"
            : "Already have an account?"}
          <span
            onClick={toggleLoginState}
            className="text-[#5C2E1B] cursor-pointer"
          >
            {loginState === "Sign In" ? " Sign Up" : " Sign In"}
          </span>{" "}
        </p>
      </div>
    </div>
  );
};

export default Register;
