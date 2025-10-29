import React from "react";
import bar_code from "../assets/bar_code.png";
import useAppContext from "../context/useAppContext";
import { X } from "lucide-react";

const Qr = () => {
  const { setCreateNew } = useAppContext();
  return (
    <div className="fixed flex items-center justify-center z-99 inset-0 bg-[#34405499]/60 backdrop-blur-[2px]">
      <div className="bg-white px-5 mx-5 md:mx-0 w-[644px] rounded-xl flex flex-col gap-2   py-8">
        <div className="border-b border-gray-200">
          <div className="flex items-center justify-between py-6 border-b border-gray-200">
            <p className="font-600 font-semibold text-2xl text-gray-900 ">
              QR Code for Breakfast Menu
            </p>
            <div
              onClick={() => setCreateNew(false)}
              className="cursor-pointer "
            >
              <X />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-center">
            <img src={bar_code} alt="bar code" />
          </div>
          <p className="text-gray-500 text-sm text-center ">
            menu.clearexample.com/clear-essence/menu-1759184350443
          </p>
        </div>

        <div className="flex items-center w-full gap-3 mt-5">
          <button className="w-full text-base font-semibold text-[#404652] flex items-center justify-center rounded-lg py-2.5 px-4.5 border border-[#E2E8F0] bg-gray-50 ">
            Copy link
          </button>
          <button className="w-full text-base font-semibold text-white flex items-center justify-center rounded-lg py-2.5 px-4.5 bg-[#5C2E1B] border border-[#7F56D9]">
            Download PNG
          </button>
        </div>
      </div>
    </div>
  );
};

export default Qr;
