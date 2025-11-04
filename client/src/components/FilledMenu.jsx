import { Listbox } from "@headlessui/react";
import {
  ChevronDown,
  CloudUpload,
  Eye,
  SquarePen,
  Trash2,
  Utensils,
} from "lucide-react";
import React, { useState } from "react";
import { filter } from "../data/data";
import { useFilledData } from "../services/pureLeafRequest";

const FilledMenu = () => {
  const { data: cardData } = useFilledData();
  const pureLeafData = cardData || [];

  const [filterBy, setFilterBy] = useState(filter[0]);
  return (
    <div className="flex flex-col gap-6 py-5 ">
      {/* upload section */}
      <div className="flex flex-col items-center justify-center py-4 px-6 gap-3 shadow-xs border border-gray-50 w-full">
        <div className="h-10 w-10 rounded-full border-[6px] border-gray-100 bg-gray-200 flex items-center justify-center">
          <CloudUpload size={20} className="text-gray-600" />
        </div>
        <div className="flex flex-col gap-1 text-sm text-center text-gray-500">
          <p className="text-sm">
            <b className="text-[#5C2E1B] font-500 cursor-pointer">
              Click to upload{" "}
            </b>
            or drag and drop a new menu
          </p>
          <p>
            Upload your PDF or image menus and they’ll be instantly available
            via QR codes. Max size: 10MB
          </p>
        </div>
      </div>
      {/* my menu */}
      <div className="flex items-center justify-between px-4 md:px-8">
        {/* my menu */}
        <div className="flex items-center gap-4">
          <p className="font-600 font-semibold text-2xl text-gray-900 ">
            My Menu
          </p>
          <div className="w-7 h-6.5 rounded-md border border-[#CEBFBA] bg-[#F3ECE9] text-xs font-medium font-500 text-[#5C2E1B] flex items-center justify-center ">
            8
          </div>
        </div>
        {/* filter by */}
        <div className="relative">
          <Listbox value={filterBy} onChange={setFilterBy}>
            <Listbox.Button className="md:w-[221px] w-full flex border-[0.6px] border-[#C8C8C8] items-center justify-between text-gray-900 rounded-lg py-3 px-3.5">
              <p className="text-gray-500 text-base font-400 ">
                Filter by: <b>{filterBy}</b>
              </p>
              <div className="">
                <ChevronDown size={20} className=" text-gray-500" />
              </div>
            </Listbox.Button>

            <Listbox.Options className="absolute left-0 top-full mt-2 w-full  bg-white border-gray-200 rounded-lg z-50 shadow">
              {filter.map((item, index) => (
                <Listbox.Option
                  key={index}
                  value={item}
                  className="hover:bg-gray-100 rounded-lg cursor-pointer"
                >
                  <div className=" flex gap-2 rounded-lg py-2.5 px-3.5">
                    <p className="text-gray-500 text-base font-400 ">
                      Filter by: <b>{item}</b>
                    </p>
                  </div>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>
      </div>

      {/* cards and pagination */}
      <div className="px-4 md:px-8 grid md:grid-cols-2 lg:grid-cols-5 gap-y-8 gap-x-6 ">
        {/* Data dynamic render here */}
        {pureLeafData.map((data, index) => (
          <div key={index} className=" p-4.5  flex flex-col gap-3.5 rounded-xl bg-[#FBFAF9] border border-gray-200 shadow-md hover:shadow-2xl transition-all duration-300 ">
            <div className="flex flex-col gap-3 w-full ">
              <div className="flex items-center justify-between ">
                <div className="h-6 w-6 rounded-md border border-[#5C2E1B] p-1 flex items-center justify-center ">
                  <Utensils size={16} />
                </div>
                <div className="">
                  <Trash2 size={16} className="text-[#667085] font-semibold" />
                </div>
              </div>
              {/* Movie night */}
              <div className="flex flex-col gap-2">
                <p className="font-600 font-semibold text-sm text-gray-900 ">
                  {data.name}
                </p>
                <div className="flex items-center gap-1 text-xs text-gray-500 font-400 ">
                  <span>PDF</span>
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-gray-500"></span>
                    <span className="">OCT 5, 2025</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-gray-500"></span>
                    <span className="">0.4MB</span>
                  </div>
                </div>
              </div>
            </div>
            {/* buttons */}
            <div className="w-full flex items-center gap-2">
              <div className="py-2 px-3.5 gap-1 rounded-lg border border-[#E2E8F0] flex items-center justify-center text-[#404652] ">
                <Eye size={16} />
                <span className="text-sm font-400 ">View</span>
              </div>

              <div className="py-2 px-3.5 gap-1 rounded-lg border border-[#E2E8F0] flex items-center justify-center text-[#404652] ">
                <SquarePen size={16} />
                <span className="text-sm font-400 ">View</span>
              </div>
              <div className="py-2 px-3.5 gap-1 rounded-lg text-white bg-[#5C2E1B] flex items-center justify-center ">
                QR
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilledMenu;
