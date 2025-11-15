import { CircleCheck, File, RotateCw, Trash2, X } from "lucide-react";
import React, { useState } from "react";
import { Listbox } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import useAppContext from "../context/useAppContext";
import { useUpdateData } from "../services/pureLeafRequest";
import { descriptions } from "../data/data";
import { toast } from "sonner";
import { useEffect } from "react";
import axios from "axios";

const Edit = () => {
  const {
    handleOpenEdit,
    data: editData,
    uploadFile,
    uploadProgress,
    uploadStatus,
    handleFileUpload,
    setUploadFile,
    setUploadProgress,
    setFieldData,
    setUploadStatus,
  } = useAppContext();
  const [description, setDescription] = useState(descriptions[0]);
  const { mutate: updateData } = useUpdateData();
  const [formData, setFormData] = useState({
    ...editData,
    oldFile: editData?.imageUrl,
    newFile: null,
  });
  const [grabOld, setGrabOld] = useState();
  const fileInputId = React.useId();
  // console.log("old", formData?.oldFile);
  console.log(editData);
  
  // console.log("new", formData?.newFile);
  useEffect(() => {
    console.log("uploadFile changed:", uploadFile);
  }, [uploadFile]);

  useEffect(() => {
    if (formData?.oldFile) {
      axios
        .head(formData.oldFile)
        .then((response) => {
          const oldFileSize = response.headers["content-length"];
          const oldFileName = formData.oldFile.split("/").pop();

          const oldFileData = {
            name: oldFileName,
            size: oldFileSize,
          };

          setGrabOld(oldFileData);

          console.log("File name:", oldFileName);
          console.log("File size in bytes:", oldFileSize);
        })
        .catch((err) => console.error(err));

      setUploadProgress(100);
      setUploadStatus("completed");
    }
  }, [formData?.oldFile, setUploadProgress, setUploadStatus]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedFormData = new FormData();

    if (!formData?.name || !description) {
      toast.error("Please fill in all required fields.");
      return;
    }

    updatedFormData.append("name", formData?.name);
    if(formData?.newFile) {
      updatedFormData.append("file", formData?.newFile)
    }

    updateData({
      id: editData?.id,
      payload: updatedFormData,
    });
  };

  return (
    <div className="fixed flex items-center justify-center z-999 inset-0 bg-[#34405499]/60 backdrop-blur-[2px]">
      <div className="bg-white w-[644px] rounded-xl flex flex-col gap-2   py-8">
        <div className="border-b border-gray-200">
          <div className="flex items-center px-5 justify-between py-6 border-b border-gray-200">
            <p className="font-600 font-semibold text-2xl text-gray-900 ">
              Edit 'Breakfast'
            </p>
            <div onClick={handleOpenEdit} className="cursor-pointer ">
              <X />
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-8.5 pt-6 pb-8 px-5 "
        >
          <div className="flex flex-col gap-3 w-full ">
            <label htmlFor="menuName" className="text-base text-[#101828] ">
              Menu Name
            </label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={formData?.name}
              placeholder="Enter menu name"
              className="py-3 px-3.5 outline-none text-gray-900 border-[0.6px] border-[#C8C8C8] rounded-lg placeholder-gray-500 "
            />
          </div>

          <div className="flex flex-col gap-3 w-full ">
            <label htmlFor="menuName" className="text-base text-[#101828] ">
              Location
            </label>

            <div className="relative w-full">
              <Listbox
                value={description}
                onChange={(value) => {
                  setDescription(value);
                  setFieldData((prev) => ({
                    ...prev,
                    location: value,
                  }));
                }}
              >
                <Listbox.Button className=" w-full flex border-[0.6px] border-[#C8C8C8] items-center justify-between text-gray-900 rounded-lg py-3 px-3.5">
                  <p className="text-gray-500 text-base font-400 ">
                    {description}
                  </p>
                  <div className="">
                    <ChevronDown size={20} className=" text-gray-500" />
                  </div>
                </Listbox.Button>

                <Listbox.Options className="absolute h-50 overflow-y-auto left-0 top-full mt-2 w-full  bg-white border-gray-200 rounded-lg z-50 shadow">
                  {descriptions.map((item, index) => (
                    <Listbox.Option
                      key={index}
                      value={item}
                      className="hover:bg-gray-100 rounded-lg cursor-pointer"
                    >
                      <div className=" flex gap-2 rounded-lg py-2.5 px-3.5">
                        <p className="text-gray-500 text-base font-400 ">
                          {item}
                        </p>
                      </div>
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full ">
            <label htmlFor="menuName" className="text-base text-[#101828] ">
              Type
            </label>
            <select
              name="type"
              onChange={handleChange}
              value={formData?.type}
              id=""
              className="py-3 px-3.5 outline-none border-[0.6px] border-[#C8C8C8] rounded-lg"
            >
              <option value="" defaultValue="Select location">
                Food
              </option>
              <option value="Rice">Rice</option>
              <option value="Spaghetti">Spaghetti </option>
              <option value="Chicken & Chips">Chicken & Chips</option>
            </select>
          </div>

          {/* Upload layout */}
          <div className="flex flex-col gap-3 w-full ">
            <label htmlFor="menuName" className="text-base text-[#101828] ">
              Upload Menu
            </label>
            <div className="rounded-lg  border border-[#AD968C] p-4 flex w-full  ">
              <div className="flex gap-4 w-full ">
                {/* image */}
                <div className="w-8 h-8 rounded-full border-4 border-[#FFF7F5] bg-[#FFF2EB] flex items-center justify-center">
                  <File size={16} className="text-[#5C2E1B]" />
                </div>
                {/* another content */}
                <div className="flex gap-1 flex-col w-full">
                  {/* name and size */}
                  {formData.newFile ? (
                    <div className="text-gray-700 text-sm font-500">
                      <span>{formData.newFile.name}</span>
                      <br />
                      <span className="text-gray-500 font-400">
                        {Math.round(formData.newFile?.size / 1024)} KB
                      </span>
                    </div>
                  ) : (
                    <div className="text-gray-700 text-sm font-500">
                      <span>{grabOld?.name}</span>
                      <br />
                      <span className="text-gray-500 font-400">
                        {Math.round(grabOld?.size / 1024)} KB
                      </span>
                    </div>
                  )}

                  {/* tracker line and change image icon */}
                  <div className="w-full flex items-center gap-3 py-1">
                    <div className="h-2 rounded-full w-full bg-[#F9F5FF] ">
                      <div
                        className="h-2 rounded-full bg-[#5C2E1B] transition-all"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm font-500 text-gray-700">
                      {uploadProgress}%
                    </p>
                  </div>

                  {/* Hidden input */}
                  <input
                    type="file"
                    name="file"
                    id={fileInputId}
                    className="hidden"
                    accept="application/pdf"
                    onChange={(e) => {
                      handleFileUpload(e);
                      const file = e.target.files?.[0];
                      if (file) {
                        setFormData((prev) => ({
                          ...prev,
                          newFile: file, // ← IMPORTANT
                        }));
                      }
                    }}
                  />

                  {/* Custom upload button */}
                  <label
                    htmlFor={fileInputId}
                    className="cursor-pointer flex items-center gap-1 font-500 text-[#5C2E1B] text-sm "
                  >
                    <RotateCw size={16} />
                    <span>Replace image</span>
                  </label>
                </div>
              </div>

              {/* trash */}
              <div className="">
                {uploadStatus === "completed" ? (
                  <CircleCheck size={16} className="text-[#5C2E1B] " />
                ) : (
                  <Trash2
                    size={20}
                    className="cursor-pointer text-gray-500 hover:text-red-500 transition"
                  />
                )}
              </div>
            </div>
          </div>
          {/* Upload layout ends here */}
          <div className="flex items-center w-full gap-3">
            <button
              onClick={handleOpenEdit}
              className="cursor-pointer w-full text-base font-semibold text-[#404652] flex items-center justify-center rounded-lg py-3 px-7 border border-[#E2E8F0] bg-gray-50 "
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cursor-pointer w-full text-base font-semibold text-white flex items-center justify-center rounded-lg py-3 px-7 bg-[#5C2E1B]"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
