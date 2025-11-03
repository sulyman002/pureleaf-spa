import React from "react";
import { tips } from "../data/data";
import emptyState from "../assets/emptyState.png";
import useAppContext from "../context/useAppContext";
import { useState } from "react";
import { Plus } from "lucide-react";
import CreateMenu from "./CreateMenu";


// import QrUpdate from "../components/QrUpdate";

const EmptyMenu = () => {
  const [open, setOpen] = useState(false);
  const { setCreateNew, createNew,  uploadFile, handleFileUpload } =
    useAppContext();
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleCreateNew = () => {
    setCreateNew(!createNew);
  };


  return (
    <div className="flex items-center justify-center gap-3 flex-col">
      <div className="">
        <img src={emptyState} alt="empty-state" />
      </div>
      <div className="flex items-center justify-center flex-col text-center gap-1">
        <p className="text-base font-semibold text-gray-900">No Menus Yet</p>
        <p className="font-400 text-gray-500 text-xs ">
          Upload your PDF or image menus and they'll be instantly available via
          QR codes. Max size: 10MB
        </p>
      </div>
      <div className="flex items-center gap-3 mt-12">
        <div className="flex flex-col items-start gap-2">
          {/* Hidden input */}
          <input
            type="file"
            id="file"
            className="hidden"
            accept="application/pdf"
            onChange={handleFileUpload}
          />

          {/* Custom upload button */}
          <label
            htmlFor="file"
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-lg text-white text-base font-semibold bg-[#5C2E1B] cursor-pointer hover:bg-[#4a2414] transition"
          >
            <Plus size={20} />
            Upload my first menu
          </label>
        </div>
        {/* display create menu */}

        {uploadFile && <CreateMenu />}

        <div className="relative group inline-block">
          <button
            onClick={handleOpen}
            className="text-base font-semibold text-[#404652] py-3.5 px-7 rounded-lg gap-2.5 border border-[#E2E8F0] bg-gray-50"
          >
            Tips
          </button>

          <div
            className={`absolute rounded-lg top-full left-0 min-w-[400px] mt-2 py-6 px-5  border border-gray-200 shadow hidden group-hover:flex ${
              open ? "flex" : "hidden"
            }`}
          >
            <ul className="list-disc space-y-5 px-4 gap-2.5 ">
              {tips.map((tip, index) => (
                <li key={index}>
                  <b>{tip.heading}:</b> {tip.desc}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyMenu;
