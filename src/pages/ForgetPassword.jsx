import React from "react";
import background_image from "../assets/background-img.jpg";
import { useForm } from "react-hook-form";
import useAuth from "../context/useAuth";

const ForgetPassword = () => {
  const { forgotPassword } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const { email } = data;

      if (email.includes("@")) {
        const success = await forgotPassword(email);
        if (success) {
          reset({ email: "" });
        }
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      setError("root", {
        message: "Something went wrong. Please try again.",
      });
    }
  };
  return (
    <div
      style={{ backgroundImage: `url(${background_image})` }}
      className="w-full min-h-screen bg-cover flex items-center justify-center"
    >
      <div className="bg-black/50 inset-0 w-full h-screen flex  items-center justify-center">
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
              Reset Password
            </h3>
            {/* fills */}
            <div className="flex flex-col gap-6 w-full">
              <p className=" text-center">
                We will send a reset password link to your registered mail
              </p>
              <div className="flex flex-col gap-2 ">
                <label htmlFor="email">Email</label>
                <input
                  {...register("email", {
                    required: "Enter a valid email address. ",
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
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
              {errors.root && (
                <span className="text-red-500 text-[14px]">
                  {errors.root.message}
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
