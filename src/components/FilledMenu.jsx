import { Listbox } from "@headlessui/react";
import {
  ChevronDown,
  CloudUpload,
  Eye,
  File,
  SquarePen,
  Trash2,
  Utensils,
} from "lucide-react";
import React, { useEffect, useState, useMemo } from "react";
import { filter } from "../data/data";
import { useFilledData } from "../services/pureLeafRequest";
import Delete from "../components/Delete.jsx";
import useAppContext from "../context/useAppContext";
import Edit from "../components/Edit.jsx";
import CreateMenu from "./CreateMenu.jsx";
import axios from "axios";
import Qr from "../components/Qr.jsx";

const FilledMenu = () => {
  const [filterBy, setFilterBy] = useState(filter[0]);
  const [fileSizes, setFileSizes] = useState({});
  const [cols, setCols] = useState(5);
  const {
    setData,
    openDeleteModal,
    handleToggleDeleteModal,
    handleOpenEdit,
    handleFileUpload,
    edit,
    setCreateNew,
    createNew,
    handleOpenQr,
    openQr,
    convertToQrCode,
    filterValue,
    setUploadFile,
    uploadFile,

  } = useAppContext();

  const { data: cardData } = useFilledData();
  const pureLeafData = useMemo(
    () => cardData.data.data || [],
    [cardData.data.data]
  );
  console.log(cardData);

  const filterByCategory =
    filterBy === "All"
      ? pureLeafData
      : pureLeafData.filter((item) => item.category === filterBy);

      const filterData = filterByCategory.filter((item) => item?.name.toLowerCase().includes(filterValue.toLowerCase()));

  // useEffect(() => {
  //   const updateCols = () => {
  //     if (window.innerWidth < 640) setCols(1);
  //     else if (window.innerWidth < 760) setCols(2);
  //     else if (window.innerWidth < 1024) setCols(3);
  //     else setCols(4);
  //   };
  //   updateCols();

  //   window.addEventListener("resize", updateCols);

  //   return () => window.removeEventListener("resize", updateCols);
  // }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleOnDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;

    const syntheticEvent = { target: { files: [file] } };
    console.log(syntheticEvent);
    handleFileUpload(syntheticEvent);
    setCreateNew(true);
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const fileType = (type) => {
    if (!type) return "";
    return type.split(".").pop().toUpperCase();
  };

  const fileInputId = React.useId();

  useEffect(() => {
    const fetchSizes = async () => {
      const sizes = {};

      for (const item of pureLeafData) {
        try {
          const response = await axios.head(item.imageUrl);
          const size = response.headers["content-length"];
          sizes[item._id] = size
            ? (size / (1024 * 1024)).toFixed(2) + " MB"
            : "Unknown";
        } catch {
          sizes[item._id] = "Unknown";
        }
      }

      setFileSizes(sizes);
    };

    if (pureLeafData.length > 0) fetchSizes();
  }, [pureLeafData]);

  return (
    <div className="flex flex-col gap-8 py-5 ">
      {/* upload section */}
      <div
        onDrop={handleOnDrop}
        onDragOver={handleDragOver}
        className="relative flex flex-col items-center mx-4 border-dotted md:mx-8 rounded-lg justify-center py-10 gap-3 shadow-xs border border-gray-400 "
      >
        <div className="h-10 w-10 rounded-full border-[6px] border-gray-100 bg-gray-200 flex items-center justify-center">
          <CloudUpload size={20} className="text-gray-600" />
        </div>
        <div className="flex flex-col gap-1 text-sm text-center text-gray-500">
          {/* click to upload */}
          <div>
            {/* Hidden input */}
            <input
              type="file"
              id={fileInputId}
              className="hidden"
              accept="application/pdf"
              onChange={(e) => {
                handleFileUpload(e);
                setCreateNew(true);
              }}
            />

            {/* Custom upload button */}
            <label htmlFor={fileInputId} className="text-sm">
              <b className="text-[#5C2E1B] font-500 cursor-pointer">
                Click to upload{" "}
              </b>
            </label>

            <span>or drag and drop a new menu</span>
          </div>
          {/* click to upload */}

          <p>
            Upload your PDF or image menus and they’ll be instantly available
            via QR codes. Max size: 10MB
          </p>
        </div>

        <div className="absolute bottom-1/4 right-1/7 w-12 h-12 rounded-md flex items-center justify-center bg-white shadow-md hover:shadow-2xl transition-all duration-300 cursor-grab ">
          <File className="w-4 h-5 text-gray-400 font-500 font-bold" />
        </div>
        {createNew && <CreateMenu />}
      </div>
      {/* my menu */}
      <div className="flex items-center justify-between px-4 md:px-8">
        {/* my menu */}
        <div className="flex items-center gap-4">
          <p className="font-600 font-semibold text-2xl text-gray-900 ">
            My Menu
          </p>
          <div className="w-7 h-6.5 rounded-md border border-[#CEBFBA] bg-[#F3ECE9] text-xs font-medium font-500 text-[#5C2E1B] flex items-center justify-center ">
            {filterData.length}
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
      <div className="px-4 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-10 gap-x-5 ">
        {/* Data dynamic render here */}
        {filterData.map((data, index) => (
          <React.Fragment key={index}>
            <div className=" p-4.5  flex flex-col gap-3.5 rounded-xl bg-[#FBFAF9] border border-gray-200 shadow-md hover:shadow-2xl transition-all duration-300 mb-10 ">
              <div className="flex flex-col gap-3 w-full ">
                <div className="flex items-center justify-between ">
                  <div className="h-6 w-6 rounded-md border border-[#5C2E1B] p-1 flex items-center justify-center ">
                    <Utensils size={16} />
                  </div>
                  <div
                    onClick={() => {
                      handleToggleDeleteModal();
                      setData(data);
                    }}
                    className="cursor-pointer"
                  >
                    <Trash2
                      size={16}
                      className="text-[#667085] font-semibold"
                    />
                  </div>
                </div>
                {/* Movie night */}
                <div className="flex flex-col gap-2">
                  <p className="font-600 font-semibold text-sm text-gray-900 ">
                    {data.name}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-gray-500 font-400 ">
                    <span>{fileType(data.imageUrl)}</span>
                    <div className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-gray-500"></span>
                      <span className="">{formatDate(data.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-gray-500"></span>

                      <span>{fileSizes[data._id] || "Loading..."}</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* buttons */}
              <div className="w-full flex items-center gap-2">
                <div className="cursor-pointer py-2 px-3.5 gap-1 rounded-lg border border-[#E2E8F0] flex items-center justify-center text-[#404652] ">
                  <Eye size={16} />
                  <span className="text-sm font-400 ">View</span>
                </div>

                <div
                  onClick={() => {
                    handleOpenEdit();
                    setData(data);
                  }}
                  className="cursor-pointer py-2 px-3.5 gap-1 rounded-lg border border-[#E2E8F0] flex items-center justify-center text-[#404652] "
                >
                  <SquarePen size={16} />
                  <span className="text-sm font-400 ">Edit </span>
                </div>

                <div
                  onClick={() => {
                    handleOpenQr();
                    convertToQrCode(data?.imageUrl);
                    setData(data);
                  }}
                  className="cursor-pointer py-2 px-3.5 gap-1 rounded-lg text-white bg-[#5C2E1B] flex items-center justify-center "
                >
                  QR
                </div>
              </div>
            </div>

            {/* {(index + 1) % cols === 0 && (
              <div className={`col-span-${cols}`}>
                <hr className="my-4 border-gray-300" />
              </div>
            )} */}
          </React.Fragment>
        ))}
      </div>

      {/* Modal Rendering component here */}
      {openDeleteModal && <Delete />}
      {edit && <Edit />}
      {/* its modal here */}
      {openQr && <Qr />}
    </div>
  );
};

export default FilledMenu;
