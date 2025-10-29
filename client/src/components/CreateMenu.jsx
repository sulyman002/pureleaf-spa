import { X } from "lucide-react";
import React from "react";
import useAppContext from "../context/useAppContext";

const CreateMenu = () => {
  const { setCreateNew } = useAppContext();
  return (
    <div className="fixed flex items-center justify-center z-99 inset-0 bg-[#34405499]/60 backdrop-blur-[2px]">
      <div className="bg-white w-[644px] rounded-xl flex flex-col gap-2 px-6  py-8">
        <div className="flex items-center justify-between py-6 border-b border-gray-200">
          <p className="font-600 font-semibold text-2xl text-gray-900 ">
            Create New Menu
          </p>
          <div onClick={() => setCreateNew(false)} className="cursor-pointer ">
            <X />
          </div>
        </div>
        <form className="flex flex-col gap-8.5 pt-6 pb-8  ">
          <div className="flex flex-col gap-3 w-full ">
            <label htmlFor="menuName" className="text-base text-[#101828] ">
              Menu Name
            </label>
            <input
              type="text"
              placeholder="Enter menu name"
              className="py-3 px-3.5 outline-none text-gray-900 border-[0.6px] border-[#C8C8C8] rounded-lg placeholder-gray-500 "
            />
          </div>

          <div className="flex flex-col gap-3 w-full ">
            <label htmlFor="menuName" className="text-base text-[#101828] ">
              Location
            </label>
            <input
              type="text"
              placeholder="Enter location"
              className="py-3 px-3.5 outline-none text-gray-900 border-[0.6px] border-[#C8C8C8] rounded-lg placeholder-gray-500 "
            />
          </div>

          <div className="flex flex-col gap-3 w-full ">
            <label htmlFor="menuName" className="text-base text-[#101828] ">
              Upload Menu
            </label>
            <div className="rounded-lg  border border-[#AD968C] p-4 "></div>
          </div>
        </form>

        <div className="flex items-center w-full gap-3">
          <button className="w-full text-base font-semibold text-[#404652] flex items-center justify-center rounded-lg py-3 px-7 border border-[#E2E8F0] bg-gray-50 ">
            Cancel
          </button>
            <button className="w-full text-base font-semibold text-white flex items-center justify-center rounded-lg py-3 px-7 bg-[#5C2E1B]">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateMenu;
