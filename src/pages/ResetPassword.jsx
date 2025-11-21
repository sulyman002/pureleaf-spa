import React from "react";
import background_image from "../assets/background-img.jpg";
import { useForm } from "react-hook-form";
import useAuth from "../context/useAuth";
import useAppContext from "../context/useAppContext";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { logoImg } = useAppContext();
  const { resetPassword } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
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
                      Password reset
                    </h3>

                    <p className=" text-center font-400 text-base text-gray-500">
                      Your password has been successfully reset. Click below to
                      log in.
                    </p>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full cursor-pointer border border-[#5c2e1b] py-2.5 px-[18px] rounded-lg text-[18px] font-500 leading-6 text-white cursor-point bg-[#5c2e1b] hover:text-white transition-all duration-300"
                >
                  Continue
                </button>
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
                      Set new password
                    </h3>

                    <p className=" text-center font-400 text-base text-gray-500">
                      Your new password must be different to previously used
                      passwords.
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

                  <div className="flex flex-col gap-6 w-full">
                    <div className="flex flex-col gap-2 ">
                      <label htmlFor="newPassword">Password</label>
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
                          errors.newPassword
                            ? "border-red-500"
                            : "border-gray-300"
                        } `}
                      />
                      {errors.newPassword && (
                        <span className="text-red-500 text-[14px]">
                          {errors.newPassword.message}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 ">
                      <label htmlFor="confirmPassword">Confirm Password</label>
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

                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className={` w-full cursor-pointer border border-[#5c2e1b] py-2.5 px-[18px] rounded-lg text-[18px] font-500 leading-6 text-white cursor-point ${
                      isSubmitting
                        ? "bg-[#5c2e1b] opacity-50 cursor-not-allowed"
                        : " bg-[#5c2e1b] hover:text-white transition-all duration-300  "
                    } `}
                  >
                    {isSubmitting ? "Processing..." : "Reset password"}
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
          <div
            onClick={() => navigate("/")}
            className="cursor-pointer w-full flex items-center justify-center gap-2 text-gray-500"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-500 font-medium">Back to log in</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
