import { ChevronDown, CircleCheck, RotateCw, Trash2, X } from "lucide-react";
import React, { useState } from "react";
import useAppContext from "../context/useAppContext";
import { useFilledData, useCreateData } from "../services/pureLeafRequest";
import { Listbox } from "@headlessui/react";
import { descriptions } from "../data/data";
import { toast } from "sonner";

const CreateMenu = () => {
  const { data: cardData } = useFilledData();
  const { mutate: createData } = useCreateData();
  const [description, setDescription] = useState(descriptions[0]);
  const fileInputId = React.useId();
  const [fieldData, setFieldData] = useState({
    name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFieldData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // console.log(fieldData);

  // const data = cardData || [];

  // console.log(data);

  const {
    setCreateNew,
    uploadProgress,
    uploadFile,
    uploadStatus,
    handleFileUpload,
    setUploadFile,
    setUploadProgress,
  } = useAppContext();

  console.log(uploadFile);
  

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (!fieldData?.name.trim() || !uploadFile) {
      toast.error("Please fill in all required fields.");
      return;
    }

    formData.append("name", fieldData.name);
    formData.append("category", description);

    if (uploadFile) {
      formData.append("file", uploadFile);
    }

    createData(formData, {
      onSuccess: () => {
        toast.success("Menu created successfully!");
        setCreateNew(false);
        setFieldData({
          name: "",
        });
        setDescription(descriptions[0]);
        setUploadProgress(0);
        setUploadFile(null);
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message || "Something went wrong.");
      },
    });
  };

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
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-8.5 pt-6 pb-8  "
        >
          <div className="flex flex-col gap-3 w-full ">
            <label htmlFor="menuName" className="text-base text-[#101828] ">
              Menu Name
            </label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={fieldData?.name}
              placeholder="Enter menu name"
              className="py-3 px-3.5 outline-none text-gray-900 border-[0.6px] border-[#C8C8C8] rounded-lg placeholder-gray-500 "
            />
          </div>

          <div className="relative w-full">
            <Listbox
              value={description}
              onChange={(value) => {
                setDescription(value);
                setFieldData((prev) => ({
                  ...prev,
                  category: value,
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
                    <span>{uploadFile?.name}</span>
                    <br />
                    <span className="text-gray-500 font-400">
                      {Math.round(uploadFile?.size / 1024)} KB
                    </span>
                  </div>
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
                  {/* here */}
                  <input
                    type="file"
                    name="file"
                    id={fileInputId}
                    className="hidden"
                    accept="application/pdf"
                    onChange={handleFileUpload}
                  />

                  {/* Custom upload button */}
                  <label
                    htmlFor={fileInputId}
                    className="cursor-pointer flex items-center gap-1 font-500 text-[#5C2E1B] text-sm "
                  >
                    <RotateCw size={16} />
                    <span>Replace image</span>
                  </label>
                  {/* here */}
                </div>
              </div>

              {/* trash */}
              <div className="">
                {uploadProgress === 100 ? (
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

          <div className="flex items-center w-full gap-3">
            <button
              onClick={() => {
                setCreateNew(false);
                setUploadFile("");
              }}
              className="w-full text-base font-semibold text-[#404652] flex items-center justify-center rounded-lg py-3 px-7 border border-[#E2E8F0] bg-gray-50 "
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full text-base font-semibold text-white flex items-center justify-center rounded-lg py-3 px-7 bg-[#5C2E1B]"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMenu;
