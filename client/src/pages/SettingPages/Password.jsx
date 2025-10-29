const Password = () => {
  return (
    <form className="flex flex-col gap-6">
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
            <p className="w-[280px]  text-sm font-500 text-gray-700 ">
              Current password
            </p>
            <input
              type="password"
              className="md:w-lg w-full text-gray-900 rounded-lg py-2.5 px-3.5 border border-gray-300 shadow outline-none "
            />
          </div>

          <div className="flex md:flex-row flex-col gap-2 md:gap-8 border-b border-gray-200">
            <p className="w-[280px] text-sm font-500 text-gray-700 ">
              Confirm new password
            </p>
            <div className=" flex flex-col  gap-1.5 w-full md:w-lg mb-3   ">
              <input
                type="password"
                className="w-full  outline-0 text-gray-900 rounded-lg py-2.5 px-3.5 border border-gray-300 shadow"
              />
              <p className="font-400 text-sm text-gray-500 ">Your new password must be more than 8 characters.</p>
            </div>
          </div>

          <div className="flex md:flex-row flex-col gap-2 md:gap-8 border-b border-gray-200 pb-4">
            <p className="w-[280px] text-sm font-500 text-gray-700 ">
              New Password
            </p>
            <input
              type="password"
              className="md:w-lg w-full text-gray-900 rounded-lg py-2.5 px-3.5 border border-gray-300 shadow outline-none "
            />
          </div>
          
          
        </div>

        <div className="flex w-full justify-end">
          <div className="flex items-center gap-3 mt-4">
            <button className=" text-base font-semibold text-[#404652] flex items-center justify-center rounded-lg py-3.5 px-7 border border-[#E2E8F0] bg-gray-50 ">
              Cancel
            </button>
            <button className=" text-base font-semibold text-white flex items-center justify-center rounded-lg py-3.5 px-7 bg-[#5C2E1B]">
              Update password
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Password;
