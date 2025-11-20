import {
  ChevronDown,
  CircleCheck,
  CloudUpload,
  Minus,
  Plus,
  RotateCw,
  Trash2,
  X,
  File,
  ChevronRight,
} from "lucide-react";
import React from "react";
import useAppContext from "../context/useAppContext";
import { useCreateData } from "../services/pureLeafRequest";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const CreateMenu = () => {
  // const [submitting, setSubmitting] = useState(false);
  const { mutate: createData } = useCreateData();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm();

  const {
    setCreateNew,
    toggleExpand,
    expanded,
    handleSpaFile,
    handleDrinkFile,
    handleFoodFile,
    uploadDrinkToServer,
    uploadFoodToServer,
    uploadSpaToServer,
  } = useAppContext();

  const onDragOver = (e) => {
    e.preventDefault();
  };
  const onDragLeave = (e) => {
    e.preventDefault();
  };

  const handleDropSpa = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (!file) return;
    setValue("spaMenuFile", file);
    uploadSpaToServer(file);
  };

  const handleDropFood = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (!file) return;
    setValue("foodMenuFile", file);
    uploadFoodToServer(file);
  };

  const handleDropDrink = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (!file) return;
    setValue("drinkMenuFile", file);
    uploadDrinkToServer(file);
  };

  const foodMenuFile = watch("foodMenuFile");
  const drinkMenuFile = watch("drinkMenuFile");
  const spaMenuFile = watch("spaMenuFile");

  const onSubmit = (data) => {
    const fd = new FormData();
    fd.append("name", data.name || "");
    fd.append("category", data.category || "");
    fd.append("type", data.type || "");
    fd.append("description", data.description || "");

    if (data.foodMenuFile?.[0]) {
      fd.append("foodMenuFile", data.foodMenuFile[0]);
    }
    if (data.drinkMenuFile?.[0]) {
      fd.append("drinkMenuFile", data.drinkMenuFile[0]);
    }
    if (data.spaMenuFile?.[0]) {
      fd.append("spaMenuFile", data.spaMenuFile[0]);
    }

    createData(fd, {
      onSuccess: () => {
        toast.success("Menu created");
        setCreateNew(false);
      },
      onError: (error) => {
        toast.error("Failed to create menu");
        console.error(error);
      },
    });
  };

  return (
    <div className="fixed flex items-center justify-center z-99 inset-0 bg-[#34405499]/60 backdrop-blur-[2px]">
      <div className="bg-white mx-8 w-[644px] rounded-xl flex flex-col gap-2 px-6 py-6">
        <div className="border-b border-gray-200 px-5">
          <div className=" mb-4 ">
            <div className="flex items-center justify-between py-6">
              <p className="font-semibold text-2xl text-gray-900">
                Create New Menu
              </p>
              <div
                onClick={() => setCreateNew(false)}
                className="cursor-pointer"
              >
                <X size={24} className="text-[#202020]" />
              </div>
            </div>
            <p className="text-base font-400 text-gray-600">
              Upload single or multiple_menus. We'll generate a single QR code
              that directs customers accordingly.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-8 pt-6 pb-8 px-5 "
        >
          {/* Menu Name */}
          <div className="flex flex-col gap-8 overflow-y-auto h-100  scrollbar-thin scrollbar-right scrollbar-thumb-red-400 scrollbar-track-gray-50 scrollbar-thumb-inset text-gray-100">
            <div className="flex flex-col gap-3 w-full ">
              <label htmlFor="menuName" className="text-base text-[#101828] ">
                Menu Name
              </label>
              <input
                type="text"
                {...register("menuName", {
                  required: true,
                  minLength: 3,
                  maxLength: 15,
                })}
                placeholder="Enter menu name"
                className="py-3 px-3.5 outline-none text-gray-900 border-[0.6px] border-[#C8C8C8] rounded-lg placeholder-gray-500 "
              />
            </div>

            {/* Restaurant  */}
            <div className="flex flex-col gap-6 pb-5 border-b-3 border-gray-100">
              <div className="flex items-center gap-6">
                <p className="text-[#101828] text-base font-medium font-500 flex-1">
                  Restaurant Menus
                </p>

                <div
                  onClick={() => toggleExpand("restaurant")}
                  className="cursor-pointer"
                >
                  {expanded.includes("restaurant") ? (
                    <Minus size={24} className="text-gray-900" />
                  ) : (
                    <Plus size={24} className="text-gray-900" />
                  )}
                </div>
              </div>
              {expanded.includes("restaurant") && (
                <div className="flex items-center justify-center gap-6">
                  <div className="flex flex-col gap-3 w-full">
                    <label className="text-base text-[#101828]">
                      Food Menu
                    </label>

                    {/* Display this when file exist */}
                    {foodMenuFile ? (
                      <div className="rounded-lg border border-[#AD968C] p-4 flex  justify-between w-full">
                        <div className="flex gap-4 w-full">
                          <div className="w-8 h-8 rounded-full border-4 border-[#FFF7F5] bg-[#FFF2EB] flex items-center justify-center">
                            <File size={16} className="text-[#5C2E1B]" />
                          </div>

                          <div className="flex flex-col w-full gap-1">
                            <div className="text-gray-700 text-sm font-500">
                              <p className="">Name</p>
                              <p className="">120KB</p>
                              {/* <span>{formData.newFile?.name || grabOld?.name}</span>
                          <br />
                          <span className="text-gray-500 font-400">
                            {formData.newFile
                              ? Math.round(formData.newFile.size / 1024)
                              : grabOld
                              ? Math.round(grabOld.size / 1024)
                              : 0}{" "}
                            KB
                          </span> */}
                            </div>

                            {/* Progress */}
                            <div className="flex items-center gap-3 py-1">
                              <div className="w-full h-2 bg-[#F9F5FF] rounded-full">
                                {/* <div
                                className="h-2 rounded-full bg-[#5C2E1B] transition-all"
                                style={{ width: `${uploadProgress}%` }}
                              /> */}
                              </div>
                              <p className="text-sm font-500 text-gray-700">
                                {/* {uploadProgress}% */}
                                100%
                              </p>
                            </div>
                          </div>

                          <div>
                            {uploadStatus === "completed" ? (
                              <CircleCheck
                                size={16}
                                className="text-[#5C2E1B]"
                              />
                            ) : (
                              <Trash2
                                size={20}
                                className="cursor-pointer text-gray-500 hover:text-red-500 transition"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onDrop={handleDropFood}
                        className="flex items-center justify-center  py-6 px-6 gap-3 shadow border border-gray-200  w-full rounded-lg"
                      >
                        <div className="h-10 w-10 rounded-full border-[6px] border-gray-50 bg-[#F2F4F7] flex items-center justify-center">
                          <CloudUpload size={20} className="text-gray-600" />
                        </div>
                        <div className="flex flex-col gap-1 text-xs text-center text-gray-500">
                          <div>
                            <input
                              type="file"
                              id="foodMenuFile"
                              className="hidden"
                              {...register("foodMenuFile")}
                              onChange={(e) => {
                                handleFoodFile(e);
                              }}
                              accept="image/svg+xml, image/png, image/jpg, image/jpeg, image/gif"
                            />
                            <label htmlFor="foodMenuFile" className="text-sm">
                              <b className="text-[#5C2E1B] font-500 cursor-pointer">
                                Click
                              </b>
                            </label>
                            <span> or drag and drop</span>
                          </div>

                          <p>PDF, SVG, PNG or JPG (max. 800x400px)</p>
                        </div>
                      </div>
                    )}

                    {/* <div>
                      {uploadStatus === "completed" ? (
                        <CircleCheck size={16} className="text-[#5C2E1B]" />
                      ) : (
                        <Trash2
                          size={20}
                          className="cursor-pointer text-gray-500 hover:text-red-500 transition"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              newFile: null,
                            }));
                            setUploadProgress(0);
                            setUploadStatus("idle");
                          }}
                        />
                      )}
                    </div> */}
                  </div>
                  {/* Second Component here */}
                  <div className="flex flex-col gap-3 w-full">
                    <label className="text-base text-[#101828]">
                      Drink Menu
                    </label>

                    {/* Display this when file exist */}
                    {drinkMenuFile ? (
                      <div className="rounded-lg border border-[#AD968C] p-4 flex  justify-between w-full">
                        <div className="flex gap-4 w-full">
                          <div className="w-8 h-8 rounded-full border-4 border-[#FFF7F5] bg-[#FFF2EB] flex items-center justify-center">
                            <File size={16} className="text-[#5C2E1B]" />
                          </div>

                          <div className="flex flex-col w-full gap-1">
                            <div className="text-gray-700 text-sm font-500">
                              <p className="">Name</p>
                              <p className="">120KB</p>
                              {/* <span>{formData.newFile?.name || grabOld?.name}</span>
                          <br />
                          <span className="text-gray-500 font-400">
                            {formData.newFile
                              ? Math.round(formData.newFile.size / 1024)
                              : grabOld
                              ? Math.round(grabOld.size / 1024)
                              : 0}{" "}
                            KB
                          </span> */}
                            </div>

                            {/* Progress */}
                            <div className="flex items-center gap-3 py-1">
                              <div className="w-full h-2 bg-[#F9F5FF] rounded-full">
                                {/* <div
                                className="h-2 rounded-full bg-[#5C2E1B] transition-all"
                                style={{ width: `${uploadProgress}%` }}
                              /> */}
                              </div>
                              <p className="text-sm font-500 text-gray-700">
                                {/* {uploadProgress}% */}
                                100%
                              </p>
                            </div>
                          </div>

                          <div>
                            {uploadStatus === "completed" ? (
                              <CircleCheck
                                size={16}
                                className="text-[#5C2E1B]"
                              />
                            ) : (
                              <Trash2
                                size={20}
                                className="cursor-pointer text-gray-500 hover:text-red-500 transition"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onDrop={handleDropDrink}
                        className="flex items-center justify-center  py-6 px-6 gap-3 shadow border border-gray-200  w-full rounded-lg"
                      >
                        <div className="h-10 w-10 rounded-full border-[6px] border-gray-50 bg-[#F2F4F7] flex items-center justify-center">
                          <CloudUpload size={20} className="text-gray-600" />
                        </div>
                        <div className="flex flex-col gap-1 text-xs text-center text-gray-500">
                          <div>
                            <input
                              type="file"
                              id="drinkMenuFile"
                              className="hidden"
                              {...register("drinkMenuFile")}
                              onChange={(e) => {
                                handleDrinkFile(e);
                              }}
                              accept="image/svg+xml, image/png, image/jpg, image/jpeg, image/gif"
                            />
                            <label htmlFor="drinkMenuFile" className="text-sm">
                              <b className="text-[#5C2E1B] font-500 cursor-pointer">
                                Click
                              </b>
                            </label>
                            <span> or drag and drop</span>
                          </div>

                          <p>PDF, SVG, PNG or JPG (max. 800x400px)</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Spa Menu  */}
            <div className="flex flex-col gap-6 pb-5 border-b-3 border-gray-100">
              <div className="flex items-center gap-6">
                <p className="text-[#101828] text-base font-medium font-500 flex-1">
                  Spa Menu
                </p>

                <div
                  onClick={() => toggleExpand("spa")}
                  className="cursor-pointer"
                >
                  {expanded.includes("spa") ? (
                    <Minus size={24} className="text-gray-900" />
                  ) : (
                    <Plus size={24} className="text-gray-900" />
                  )}
                </div>
              </div>
              {expanded.includes("spa") && (
                <div className="flex items-center justify-center gap-6">
                  <div className="flex flex-col gap-3 w-full">
                    {/* Display this when file exist */}
                    {spaMenuFile ? (
                      <div className="rounded-lg border border-[#AD968C] p-4 flex  justify-between w-full">
                        <div className="flex gap-4 w-full">
                          <div className="w-8 h-8 rounded-full border-4 border-[#FFF7F5] bg-[#FFF2EB] flex items-center justify-center">
                            <File size={16} className="text-[#5C2E1B]" />
                          </div>

                          <div className="flex flex-col w-full gap-1">
                            <div className="text-gray-700 text-sm font-500">
                              <p className="">Name</p>
                              <p className="">120KB</p>
                              {/* <span>{formData.newFile?.name || grabOld?.name}</span>
                          <br />
                          <span className="text-gray-500 font-400">
                            {formData.newFile
                              ? Math.round(formData.newFile.size / 1024)
                              : grabOld
                              ? Math.round(grabOld.size / 1024)
                              : 0}{" "}
                            KB
                          </span> */}
                            </div>

                            {/* Progress */}
                            <div className="flex items-center gap-3 py-1">
                              <div className="w-full h-2 bg-[#F9F5FF] rounded-full">
                                {/* <div
                                className="h-2 rounded-full bg-[#5C2E1B] transition-all"
                                style={{ width: `${uploadProgress}%` }}
                              /> */}
                              </div>
                              <p className="text-sm font-500 text-gray-700">
                                {/* {uploadProgress}% */}
                                100%
                              </p>
                            </div>
                          </div>

                          <div>
                            {uploadStatus === "completed" ? (
                              <CircleCheck
                                size={16}
                                className="text-[#5C2E1B]"
                              />
                            ) : (
                              <Trash2
                                size={20}
                                className="cursor-pointer text-gray-500 hover:text-red-500 transition"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onDrop={handleDropSpa}
                        className="flex items-center justify-center  py-6 px-6 gap-3 shadow border border-gray-200  w-full rounded-lg"
                      >
                        <div className="h-10 w-10 rounded-full border-[6px] border-gray-50 bg-[#F2F4F7] flex items-center justify-center">
                          <CloudUpload size={20} className="text-gray-600" />
                        </div>
                        <div className="flex flex-col gap-1 text-xs text-center text-gray-500 w-full flex-1">
                          <div>
                            <input
                              type="file"
                              id="spaMenuFile"
                              {...register("spaMenuFile")}
                              onChange={(e) => {
                                handleSpaFile(e);
                              }}
                              className="hidden"
                              accept="image/svg+xml, image/png, image/jpg, image/jpeg, image/gif"
                            />
                            <label htmlFor="spaMenuFile" className="text-sm">
                              <b className="text-[#5C2E1B] font-500 cursor-pointer">
                                Click
                              </b>
                            </label>
                            <span> or drag and drop</span>
                          </div>

                          <p>PDF, SVG, PNG or JPG (max. 800x400px)</p>
                        </div>
                      </div>
                    )}

                    {/* <div>
                      {uploadStatus === "completed" ? (
                        <CircleCheck size={16} className="text-[#5C2E1B]" />
                      ) : (
                        <Trash2
                          size={20}
                          className="cursor-pointer text-gray-500 hover:text-red-500 transition"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              newFile: null,
                            }));
                            setUploadProgress(0);
                            setUploadStatus("idle");
                          }}
                        />
                      )}
                    </div> */}
                  </div>
                </div>
              )}
            </div>

            {/* Review Link */}
            <div className="flex flex-col gap-6 pb-5 border-b-3 border-gray-100">
              <div className="flex items-center gap-6">
                <p className="text-[#101828] text-base font-medium font-500 flex-1">
                  Review Link
                </p>

                <div
                  onClick={() => toggleExpand("review")}
                  className="cursor-pointer"
                >
                  {expanded.includes("review") ? (
                    <Minus size={24} className="text-gray-900" />
                  ) : (
                    <Plus size={24} className="text-gray-900" />
                  )}
                </div>
              </div>
              {expanded.includes("review") && (
                <div className="w-full flex flex-col gap-3">
                  <input
                    type="text"
                    name="review"
                    minLength={3}
                    maxLength={15}
                    placeholder="Add a link to receive feedback from your customers"
                    className="py-3 px-3.5  mb-5 outline-none text-gray-900 border-[0.6px] border-[#C8C8C8] rounded-lg placeholder-gray-500"
                  />
                  <div className="flex items-center gap-1 text-xs text-[#5C2E1B] cursor-pointer ">
                    <span>Create your survey in Incite360</span>
                    <ChevronRight size={16} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center w-full gap-3">
            <button
              type="button"
              onClick={() => {
                setCreateNew(false);
              }}
              className="w-full text-base font-semibold text-[#404652] flex items-center justify-center rounded-lg py-3 px-7 border border-[#E2E8F0] bg-gray-50 "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full text-base font-semibold text-white flex items-center justify-center rounded-lg py-3 px-7 bg-[#5C2E1B] ${
                isSubmitting
                  ? "cursor-not-allowed bg-[#5C2E1B]/50"
                  : "bg-[#5C2E1B]"
              }`}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMenu;
