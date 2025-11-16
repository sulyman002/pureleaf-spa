import React from "react";
import background_image from "../assets/background-img.jpg";
import { useForm } from "react-hook-form";
import useAuth from "../context/useAuth";
import { toast } from "sonner";

const ResetPassword = () => {
  const { resetPassword } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const token = new URLSearchParams(window.location.search).get("token");
  const onSubmit = async (data) => {
    const { newPassword, confirmPassword } = data;

    if (newPassword !== confirmPassword) {
      toast.error("password do not match");
      return null;
    }
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await resetPassword(token, newPassword);
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
              Create New Password
            </h3>
            {/* fills */}
            <div className="flex flex-col gap-6 w-full">
              <div className="flex flex-col gap-2 ">
                <label htmlFor="newPassword">New Password</label>
                <input
                  {...register("newPassword", {
                    required: "This field is required. ",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters. ",
                    },
                  })}
                  type="password"
                  placeholder="Enter your new password"
                  className={`placeholder-gray-500 rounded-lg text-[16px] py-2.5 px-3.5 outline-none border ${
                    errors.newPassword ? "border-red-500" : "border-gray-300"
                  } `}
                />
                {errors.newPassword && (
                  <span className="text-red-500 text-[14px]">
                    {errors.newPassword.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 ">
                <label htmlFor="confirmPassword">Password</label>
                <input
                  {...register("confirmPassword", {
                    required: "Password is required. ",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters. ",
                    },
                  })}
                  type="password"
                  placeholder="confirm your password"
                  className={`placeholder-gray-500 rounded-lg text-[16px] py-2.5 px-3.5 outline-none border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } `}
                />
                {/* will later change dynamically */}
                {errors.confirmPassword && (
                  <span className="text-red-500 text-[14px]">
                    {errors.confirmPassword.message}
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

export default ResetPassword;
