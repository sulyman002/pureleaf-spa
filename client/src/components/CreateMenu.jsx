import { CircleCheck, RotateCw, Trash2, X } from "lucide-react";
import React from "react";
import useAppContext from "../context/useAppContext";
import axios from "axios";

const CreateMenu = () => {
  const { setCreateNew, uploadFile, uploadProgress, uploadStatus } =
    useAppContext();

  const formData = new FormData();

  formData.append("file", uploadFile);

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
            <div className="rounded-lg  border border-[#AD968C] p-4 flex w-full  ">
              <div className="flex gap-4 w-full ">
                {/* image */}
                <div className=""></div>
                {/* another content */}
                <div className="flex gap-1 flex-col w-full">
                  {/* name and size */}
                  <div className="text-gray-700 text-sm font-500">
                    <span>
                      {uploadFile.name}
                    </span>
                    <br />
                    <span className="text-gray-500 font-400">
                      {Math.round(uploadFile.size / 1024)} KB
                    </span>
                  </div>
                  {/* tracker line and change image icon */}
                  <div className="w-full flex items-center gap-3 py-1">
                    <div className="h-2 rounded-full w-full bg-[#F9F5FF] ">
                      <div className="h-2 rounded-full bg-[#5C2E1B] transition-all"
                      style={{width: `${uploadProgress}%`}}></div>
                    </div>
                    <p className="text-sm font-500 text-gray-700">{uploadProgress}%</p>
                  </div>
                  <div className="cursor-pointer flex items-center gap-1 font-500 text-[#5C2E1B] text-sm ">
                    <RotateCw size={16} className="" />
                    <span>Replace image</span>
                  </div>
                </div>
              </div>

              {/* trash */}
              <div className="">
                 
               {uploadProgress === 100 ? <CircleCheck size={16} className="text-[#5C2E1B] " /> : <Trash2 size={20} className="cursor-pointer text-gray-500 hover:text-red-500 transition" />}
              </div>
            </div>
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
