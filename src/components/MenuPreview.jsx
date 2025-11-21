import React, { useState } from "react";
import useAppContext from "../context/useAppContext";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const MenuPreview = () => {
  const { data: previewData, handleOpenPreview } = useAppContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log(previewData);
  const menuFile = [
    {
      label: "Food Menu",
      url: previewData?.foodMenuFile,
    },
    {
      label: "Drink Menu",
      url: previewData?.drinkMenuFile,
    },
    {
      label: "Spa Menu",
      url: previewData?.spaMenuFile,
    },
  ];

  const handlePrevMenu = () => {
    setCurrentIndex((prev) => (prev - 1 + menuFile.length) % menuFile.length);
  };
  const handleNextMenu = () => {
    setCurrentIndex((prev) => (prev + 1) % menuFile.length);
  };

  const isPdf = (url) => url?.toLowerCase().endsWith(".pdf");

  return (
    <div className="fixed flex items-center justify-center z-50 inset-0 bg-[#34405499]/60 backdrop-blur-[2px]">
      <div className="bg-white mx-8 w-[644px] rounded-xl flex flex-col gap-2 ">
        <div className="flex items-center justify-between px-6 py-6 border-b-3 border-gray-100 ">
          <h2 className="text-[24px] font-medium text-gray-900 ">
            Preview: {previewData?.name}
          </h2>

          <div className="flex items-center gap-3.5">
            <a
              href={menuFile[currentIndex]?.url}
              target="_blank"
              className="font-600 font-semibold text-base text-gray-500"
            >
              Open in new tab
            </a>
            <button onClick={handleOpenPreview} className=" cursor-pointer">
              <X size={20} />
            </button>
          </div>
        </div>
        <div className="  relative">
          <div className="w-full overflow-y-auto h-150 scrollbar-thin scrollbar-thumb-red-400 scrollbar-track-gray-50 rounded-b-2xl">
            {isPdf(menuFile[currentIndex]?.url) ? (
              <isframe
                src={menuFile[currentIndex]?.url}
                className="w-full h-full"
              />
            ) : (
              <img
                src={menuFile[currentIndex]?.url}
                className="mx-auto max-w-full"
              />
            )}
          </div>
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-7 ">
            <button
              onClick={handlePrevMenu}
              className="cursor-pointer hover:scale-[0.9] shadow-md transition-all duration-300 w-12 h-12 rounded-full border-8 border-[#F9FAFBCC] bg-[#E0EAFCCC] flex items-center justify-center "
            >
              <ChevronLeft size={24} className="text-gray-500 " />
            </button>
            <p className="font-600 font-semibold text-shadow text-2xl text-white">
              {menuFile[currentIndex]?.label}
            </p>
            <button
              onClick={handleNextMenu}
              className="cursor-pointer hover:scale-[0.9] shadow-md transition-all duration-300 w-12 h-12 rounded-full border-8 border-[#F9FAFBCC] bg-[#E0EAFCCC] flex items-center justify-center "
            >
              <ChevronRight size={24} className="text-gray-500 " />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPreview;
