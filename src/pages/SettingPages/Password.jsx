import { useForm } from "react-hook-form";
import useAuth from "../../context/useAuth";

const Password = () => {
  const { changePassword } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const newPassword = watch("newPassword");

  const onSubmit = async (data) => {
    await changePassword({
      Credentials: {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      },
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 pb-4">
        <p className=" font-500 text-lg text-gray-900 ">Password</p>
        <p className=" font-400 text-sm text-gray-500 ">
          Please enter your current password to change your password.
        </p>
      </div>
      <hr className="border border-gray-200" />
      <div className="px-4 space-y-5">
        <div className="flex flex-col gap-5">
          <div className="flex md:flex-row flex-col gap-2 md:gap-8 border-b border-gray-200 pb-4 ">
            <label
              htmlFor="currentPassword"
              className="w-[280px]  text-sm font-500 text-gray-700 "
            >
              Current password
            </label>
            <input
              type="password"
              id="currentPassword"
              {...register("currentPassword", {
                required: "Password is required. ",
              })}
              className={`md:w-lg w-full text-gray-900 rounded-lg py-2.5 px-3.5 border ${
                errors.currentPassword ? "border-red-500" : "border-gray-300"
              } shadow outline-none `}
            />
          </div>

          <div className="flex md:flex-row flex-col gap-2 md:gap-8 border-b border-gray-200">
            <label
              htmlFor="newPassword"
              className="w-[280px] text-sm font-500 text-gray-700 "
            >
              New password
            </label>
            <div className=" flex flex-col  gap-1.5 w-full md:w-lg mb-3   ">
              <input
                type="password"
                id="newPassword"
                {...register("newPassword", {
                  required: "Password is required. ",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters. ",
                  },
                })}
                className={`md:w-lg w-full text-gray-900 rounded-lg py-2.5 px-3.5 border ${
                  errors.newPassword ? "border-red-500" : "border-gray-300"
                } shadow outline-none `}
              />
              {errors.newPassword && (
                <span className="text-red-500 text-[14px]">
                  {errors.newPassword.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex md:flex-row flex-col gap-2 md:gap-8 border-b border-gray-200 pb-4">
            <label className="w-[280px] text-sm font-500 text-gray-700 ">
              Confirm new Password
            </label>
            <div className=" flex flex-col  gap-1.5 w-full md:w-lg mb-3   ">
              <input
                type="password"
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "Password is required. ",
                  validate: (value) => {
                    return value === newPassword || "password do not match";
                  }
                })}
                className={`md:w-lg w-full text-gray-900 rounded-lg py-2.5 px-3.5 border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } shadow outline-none `}
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-[14px]">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex w-full justify-end">
          <div className="flex items-center gap-3 mt-4">
            <button
              type="button"
              className=" text-base font-semibold text-[#404652] flex items-center justify-center rounded-lg py-3.5 px-7 border border-[#E2E8F0] bg-gray-50 "
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`  text-base font-semibold text-white flex items-center justify-center rounded-lg py-3.5 px-7  ${isSubmitting ? "cursor-not-allowed bg-[#5C2E1B]/50" : "cursor-pointer bg-[#5C2E1B]"}`}
            >
              {isSubmitting ? "Updating..." : "Update password"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Password;
