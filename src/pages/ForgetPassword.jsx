import React, { useState } from "react";
import background_image from "../assets/background-img.jpg";
import { useForm } from "react-hook-form";
import useAuth from "../context/useAuth";
import useAppContext from "../context/useAppContext";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";


const ForgetPassword = () => {
  const [submittedEmail, setSubmittedEmail] = useState("");
  const navigate = useNavigate();
  const { logoImg } = useAppContext();
  const { forgotPassword } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();



  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const { email } = data;

      if (email.includes("@")) {
        const success = await forgotPassword(email);
        if (success) {
          setSubmittedEmail(data.email)
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
        <div className="w-full md:w-[480px] mx-6 md:mx-0 rounded-xl px-10 bg-white py-16 shadow backdrop-blur-sm flex items-center justify-center flex-col gap-8 ">
          <div className="w-full">
            {isSubmitSuccessful ? (
              <div className="flex flex-col w-full gap-6">
                <div className="flex flex-col w-full gap-2">
                  <div className="flex items-center justify-center">
                    <img
                      src={logoImg}
                      alt="pureleaf-spa-logo"
                      className="w-45"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-center font-600 font-semibold text-[30px] text-gray-900  ">
                      Check your email
                    </h3>

                    <p className=" text-center font-400 text-base text-gray-500">
                      We sent a password reset link to <span className="font-500 font-medium">{submittedEmail}</span>.
                    </p>
                  </div>
                </div>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full cursor-pointer border border-[#5c2e1b] py-2.5 px-[18px] rounded-lg text-[18px] font-500 leading-6 text-white cursor-point bg-[#5c2e1b] hover:text-white transition-all duration-300"
                >
                  Open email app
                </button>
                <div className="flex items-center gap-1 w-full justify-center mt-3">
                  <p className=" font-400 text-sm text-gray-500 ">Didn’t receive the email?</p>
                  <p className="cursor-pointer font-500 text-sm font-medium text-[#5C2E1B] ">Click to resend</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col w-full gap-6">
                <div className="flex flex-col w-full gap-2">
                  <div className="flex items-center justify-center">
                    <img
                      src={logoImg}
                      alt="pureleaf-spa-logo"
                      className="w-45"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-center font-600 font-semibold text-[30px] text-gray-900  ">
                      Forgot password?
                    </h3>

                    <p className=" text-center font-400 text-base text-gray-500">
                      No worries, we'll send you reset instructions.
                    </p>
                  </div>
                </div>

                <form
                  noValidate
                  onSubmit={handleSubmit(onSubmit)}
                  className="w-full flex flex-col gap-6"
                >
                  {/* company logo */}

                  {/* fills */}

                  <div className="flex flex-col gap-2 ">
                    <label
                      className="font-500 text-sm text-gray-700"
                      htmlFor="email"
                    >
                      Email
                    </label>
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

                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className={` w-full cursor-pointer border border-[#5c2e1b] py-2.5 px-[18px] rounded-lg text-[18px] font-500 leading-6 text-white cursor-point ${
                      isSubmitting
                        ? "bg-[#5c2e1b] opacity-50 cursor-not-allowed"
                        : " bg-[#5c2e1b] hover:text-white transition-all duration-300  "
                    } `}
                  >
                    {isSubmitting ? "Sending..." : "Reset password"}
                  </button>
                  {errors.root && (
                    <span className="text-red-500 text-[14px]">
                      {errors.root.message}
                    </span>
                  )}
                </form>
              </div>
            )}
          </div>
          <div onClick={() => navigate(-1)} className="cursor-pointer w-full flex items-center justify-center gap-2 text-gray-500">
            <ArrowLeft size={20} />
            <span className="text-sm font-500 font-medium">Back to log in</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
