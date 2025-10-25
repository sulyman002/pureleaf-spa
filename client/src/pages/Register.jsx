import React from "react";
import background_image from "../assets/background-img.jpg";

const Register = () => {
  return (
    <div
      style={{ backgroundImage: `url(${background_image})` }}
      className="w-full min-h-screen bg-cover flex items-center justify-center"
    >
        <div className="w-full md:w-[480px] rounded-xl px-8 bg-white py-10 shadow backdrop-blur-sm flex items-center justify-center ">
            <form className="w-full" >
                {/* company logo */}
                <img src="#" alt="pureleaf-spa-logo" />
                <h3 className="text-center font-600 text-[30px] gray-900 ">
                    Sign Up
                </h3>
                {/* fills */}
                <div className="flex flex-col gap-6 w-full">
                    <div className="flex flex-col gap-2 ">
                        <label htmlFor="name">
                            Name
                        </label>
                        <input type="text" placeholder="Enter your name" className="placeholder-gray-500 rounded-lg text-[16px] py-2.5 px-3.5 border border-gray-300 " />
                    </div>
                    <div className="flex flex-col gap-2 ">
                        <label htmlFor="email">
                            Email
                        </label>
                        <input type="email" placeholder="Enter your email" className="placeholder-gray-500 rounded-lg text-[16px] py-2.5 px-3.5 border border-gray-300 " />
                    </div>
                    <div className="flex flex-col gap-2 ">
                        <label htmlFor="password">
                            Password
                        </label>
                        <input type="password" placeholder="Enter your name" className="placeholder-gray-500 rounded-lg text-[16px] py-2.5 px-3.5 border border-gray-300 " />
                        {/* will later change dynamically */}
                        <span className="text-gray-500 text-[14px]">
                            Must be at least 8 characters.
                        </span>
                    </div>
                </div>
                <div className="flex flex-col w-full gap-3">
                    <button type="submit" className="bg-[#5c2e1b] border border-[#5c2e1b] py-[10px] px-[18px] rounded-[8px] text-[18px] font-500 leading-[24px] text-white ">
                        Create account
                    </button>
                </div>

            </form>
        </div>
    </div>
  );
};

export default Register;
