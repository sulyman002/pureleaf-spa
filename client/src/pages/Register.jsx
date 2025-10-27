import React from "react";
import background_image from "../assets/background-img.jpg";
import { useForm } from "react-hook-form";

const Register = () => {

    const { register, handleSubmit, setFocus, setError } = useForm();
  return (
    <div
      style={{ backgroundImage: `url(${background_image})` }}
      className="w-full min-h-screen bg-cover flex items-center justify-center"
    >
        <div className="w-full md:w-[480px] mx-6 md:mx-0 rounded-xl px-10 bg-white py-16 shadow backdrop-blur-sm flex items-center justify-center flex-col ">
            <form className="w-full flex flex-col gap-5" >
                {/* company logo */}
               <div className="flex items-center justify-center">
                 <img src="#" alt="pureleaf-spa-logo" />
               </div>
                <h3 className="text-center font-600 font-semi text-[30px] gray-900 ">
                    Sign Up
                </h3>
                {/* fills */}
                <div className="flex flex-col gap-6 w-full">
                    <div className="flex flex-col gap-2 ">
                        <label htmlFor="name">
                            Name
                        </label>
                        <input type="text" {...register("name", { required: true, maxLength: 50 })} placeholder="Enter your name" className="placeholder-gray-500 rounded-lg text-[16px] py-2.5 px-3.5 border border-gray-300 " />
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
                <div className="flex flex-col w-full gap-4 mt-6">
                    <button type="submit" className="bg-[#5c2e1b] border border-[#5c2e1b] py-2.5 px-[18px] rounded-lg text-[18px] font-500 leading-6 text-white ">
                        Create account
                    </button>
                    {/* login via google */}
                    <button className="flex items-center justify-center gap-3 rounded-lg border border-gray-300 py-2.5  px-4  ">
                        google button
                    </button>
                </div>

            </form>
            <p className="tet-[14px] font-400 text-gray-500 mt-10 ">Already have an account? <span className="text-[#5C2E1B]"> Log in </span> </p>
        </div>
    </div>
  );
};

export default Register;
