import { CircleCheck, File, RotateCw, Trash2, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Listbox } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import useAppContext from "../context/useAppContext";
import { useUpdateData } from "../services/pureLeafRequest";
import { descriptions } from "../data/data";
import { toast } from "sonner";
import axios from "axios";

const Edit = () => {
  const {
    handleOpenEdit,
    data: editData,
    uploadProgress,
    uploadStatus,
    handleFileUpload,
    setUploadProgress,
    setUploadStatus,
  } = useAppContext();

  const [description, setDescription] = useState(descriptions[0]);
  const { mutate: updateData } = useUpdateData();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    ...editData,
    oldFile: editData?.imageUrl || null,
    newFile: null,
  });
  const [grabOld, setGrabOld] = useState(null);
  const fileInputId = React.useId();

  if (!editData) return null; 

  
  useEffect(() => {
    if (formData?.oldFile) {
      axios
        .head(formData.oldFile)
        .then((response) => {
          const oldFileSize = Number(response.headers["content-length"]);
          const oldFileName = formData.oldFile.split("/").pop();

          setGrabOld({
            name: oldFileName,
            size: oldFileSize,
          });

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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData?.name || !description || !formData.type) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);

    const updatedFormData = new FormData();
    updatedFormData.append("name", formData.name);
    updatedFormData.append("description", description);
    updatedFormData.append("type", formData.type);
    if (formData.newFile) updatedFormData.append("file", formData.newFile);

    updateData(
      { id: editData.id, payload: updatedFormData },
      {
        onSuccess: () => {
          toast.success("Menu updated successfully!");
          handleOpenEdit();
        },
        onError: (err) => {
          console.error(err);
          toast.error("Failed to update menu. Try again.");
        },
        onSettled: () => setSubmitting(false),
      }
    );
  };

  return (
    <div className="fixed flex items-center justify-center z-50 inset-0 bg-[#34405499]/60 backdrop-blur-[2px]">
      <div className="bg-white w-[644px] rounded-xl flex flex-col gap-2 py-8">
        <div className="border-b border-gray-200">
          <div className="flex items-center px-5 justify-between py-6 border-b border-gray-200">
            <p className="font-semibold text-2xl text-gray-900">
              Edit '{formData?.name}'
            </p>
            <div onClick={handleOpenEdit} className="cursor-pointer">
              <X />
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-8 pt-6 pb-8 px-5"
        >
          {/* Menu Name */}
          <div className="flex flex-col gap-3 w-full">
            <label className="text-base text-[#101828]">Menu Name</label>
            <input
              type="text"
              name="name"
              value={formData?.name}
              onChange={handleChange}
              placeholder="Enter menu name"
              className="py-3 px-3.5 outline-none text-gray-900 border-[0.6px] border-[#C8C8C8] rounded-lg placeholder-gray-500"
            />
          </div>

          {/* Location / Description */}
          <div className="flex flex-col gap-3 w-full">
            <label className="text-base text-[#101828]">Location</label>
            <div className="relative w-full">
              <Listbox value={description} onChange={setDescription}>
                <Listbox.Button className="w-full flex border-[0.6px] border-[#C8C8C8] items-center justify-between text-gray-900 rounded-lg py-3 px-3.5">
                  <span className="text-gray-700">{description}</span>
                  <ChevronDown size={20} className="text-gray-500" />
                </Listbox.Button>
                <Listbox.Options className="absolute left-0 top-full mt-2 w-full bg-white border-gray-200 rounded-lg shadow z-50 max-h-52 overflow-y-auto">
                  {descriptions.map((item, index) => (
                    <Listbox.Option
                      key={index}
                      value={item}
                      className="hover:bg-gray-100 cursor-pointer rounded-lg"
                    >
                      <div className="flex py-2.5 px-3.5">{item}</div>
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
            </div>
          </div>

          {/* Type */}
          <div className="flex flex-col gap-3 w-full">
            <label className="text-base text-[#101828]">Type</label>
            <select
              name="type"
              value={formData?.type}
              onChange={handleChange}
              className="py-3 px-3.5 outline-none border-[0.6px] border-[#C8C8C8] rounded-lg"
            >
              <option value="">Select type</option>
              <option value="Rice">Rice</option>
              <option value="Spaghetti">Spaghetti</option>
              <option value="Chicken & Chips">Chicken & Chips</option>
            </select>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <label className="text-base text-[#101828]">Upload Menu</label>
            <div className="rounded-lg border border-[#AD968C] p-4 flex items-center justify-between w-full">
              <div className="flex gap-4 w-full">
                <div className="w-8 h-8 rounded-full border-4 border-[#FFF7F5] bg-[#FFF2EB] flex items-center justify-center">
                  <File size={16} className="text-[#5C2E1B]" />
                </div>

                <div className="flex flex-col w-full gap-1">
                  <div className="text-gray-700 text-sm font-500">
                    <span>{formData.newFile?.name || grabOld?.name}</span>
                    <br />
                    <span className="text-gray-500 font-400">
                      {formData.newFile
                        ? Math.round(formData.newFile.size / 1024)
                        : grabOld
                        ? Math.round(grabOld.size / 1024)
                        : 0}{" "}
                      KB
                    </span>
                  </div>

                  {/* Progress */}
                  <div className="flex items-center gap-3 py-1">
                    <div className="w-full h-2 bg-[#F9F5FF] rounded-full">
                      <div
                        className="h-2 rounded-full bg-[#5C2E1B] transition-all"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <p className="text-sm font-500 text-gray-700">
                      {uploadProgress}%
                    </p>
                  </div>

                  <input
                    type="file"
                    id={fileInputId}
                    className="hidden"
                    accept="application/pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleFileUpload(e);
                        setFormData((prev) => ({ ...prev, newFile: file }));
                        setUploadProgress(0);
                        setUploadStatus("uploading");
                      }
                    }}
                  />

                  <label
                    htmlFor={fileInputId}
                    className="cursor-pointer flex items-center gap-1 text-[#5C2E1B] font-500 text-sm"
                  >
                    <RotateCw size={16} />
                    Replace image
                  </label>
                </div>
              </div>

              <div>
                {uploadStatus === "completed" ? (
                  <CircleCheck size={16} className="text-[#5C2E1B]" />
                ) : (
                  <Trash2
                    size={20}
                    className="cursor-pointer text-gray-500 hover:text-red-500 transition"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, newFile: null }));
                      setUploadProgress(0);
                      setUploadStatus("idle");
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-3 w-full">
            <button
              type="button"
              onClick={handleOpenEdit}
              className="w-full py-3 px-7 border border-[#E2E8F0] bg-gray-50 rounded-lg text-base font-semibold text-[#404652]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className={`w-full py-3 px-7 rounded-lg text-base font-semibold text-white flex items-center justify-center ${
                submitting
                  ? "bg-[#5C2E1B]/50 cursor-not-allowed"
                  : "bg-[#5C2E1B]"
              }`}
            >
              {submitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
