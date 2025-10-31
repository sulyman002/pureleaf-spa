import React, { useState } from "react";
import background_image from "../assets/background-img.jpg";
import { useForm } from "react-hook-form";

const Register = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
      throw new Error();
    } catch (error) {
      setError("root", {
        message:
          " Email is already in use. Please use a different email address.",
      });
    }
  };

  const [loginState, setLoginState] = useState("Sign In");

  const toggleLoginState = () => {
    setLoginState((prev) => (prev === "Sign In" ? "Sign Up" : "Sign In"));
  };
  return (
    <div
      style={{ backgroundImage: `url(${background_image})` }}
      className="w-full min-h-screen bg-cover flex items-center justify-center"
    >
      <div className="w-full md:w-[480px] mx-6 md:mx-0 rounded-xl px-10 bg-white py-16 shadow backdrop-blur-sm flex items-center justify-center flex-col ">
        <form
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
                {isSubmitting ? loginState === "Sign In" ? "Signing In..." : "Creating Account..." : loginState === "Sign In" ? "Sign In" : "Create Account"}
                {/* {loginState === "Sign In" ? "Sign In" : "Create Account"}
              {isSubmitting ? "Creating account..." : "Create Account"} */}
            </button>
            {errors.root && (
              <span className="text-red-500 text-[14px]">
                {errors.root.message}
              </span>
            )}
            {/* login via google */}
            <button className="flex items-center justify-center gap-3 rounded-lg border border-gray-300 py-2.5  px-4  ">
              google button
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
