import React, { useEffect, useState } from "react";
import { CloudUpload, File, Trash2, CircleCheck } from "lucide-react";
import axios from "axios";

const MenuUpload = ({
  label,
  fieldName,
  file,
  progress,
  status,
  setValue,
  setProgress,
  setStatus,
  onUpload,
  accept = "application/pdf, image/svg+xml, image/png, image/jpg, image/jpeg, image/gif",
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file) => {
    if (!file) return;

    setProgress(0);
    setStatus("uploading");

    setValue(fieldName, file, { shouldDirty: true, shouldValidate: true });

    onUpload?.(file);
  };

  const handleInputChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    handleFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (!file) return;

    handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleRemove = () => {
    setProgress(0);
    setStatus("idle");
    setValue(fieldName, null, { shouldDirty: true, shouldValidate: true });
    // Optional: if you support aborting uploads, call abort here.
  };

  useEffect(() => {
    if (typeof file === "string") {
      axios
        .head(file)
        .then((response) => {
          const oldFileSize = Number(response.headers["content-length"]);
          const oldFileName = file.oldFile.split("/").pop();

          setGrabOld({
            name: oldFileName,
            size: oldFileSize,
          });

          console.log("File name:", oldFileName);
          console.log("File size in bytes:", oldFileSize);
        })
        .catch((err) => console.error(err));
    }
  }, [file]);

  const displayFile =
    typeof file === "string"
      ? {
          name: "File",
          size: null,
          url: file,
        }
      : file || null;

  const fileSizeKb =
    displayFile && typeof displayFile.size === "number"
      ? Math.round(displayFile.size / 1024)
      : null;

  return (
    <div className="flex flex-col gap-3 w-full">
      {label && <label className="text-base text-[#101828]">{label}</label>}

      {displayFile ? (
        <div className="rounded-lg border border-[#AD968C] p-4 flex justify-between w-full">
          <div className="flex gap-4 w-full">
            <div className="w-8 h-8 rounded-full border-4 border-[#FFF7F5] bg-[#FFF2EB] flex items-center justify-center">
              <File size={16} className="text-[#5C2E1B]" />
            </div>

            <div className="flex flex-col w-full gap-1">
              <div className="text-gray-700 text-sm font-500">
                <span>{displayFile?.name}</span>
                <br />
                {fileSizeKb !== null && (
                  <span className="text-gray-500 font-400">
                    {fileSizeKb} KB
                  </span>
                )}
              </div>

              {/* Progress */}
              <div className="flex items-center gap-3 py-1">
                <div className="w-full h-2 bg-[#F9F5FF] rounded-full overflow-hidden">
                  <div
                    className="h-2 rounded-full bg-[#5C2E1B] transition-all"
                    style={{ width: `${progress ?? 0}%` }}
                  />
                </div>
                <p className="text-sm font-500 text-gray-700">
                  {progress ?? 0}%
                </p>
              </div>
            </div>

            <div>
              <Trash2
                size={20}
                className="cursor-pointer text-gray-500 hover:text-red-500 transition"
                onClick={handleRemove}
              />
            </div>
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`flex items-center justify-center py-6 px-6 gap-3 shadow border w-full rounded-lg transition
            ${
              isDragging
                ? "border-[#5C2E1B] bg-[#FFF7F5]"
                : "border-gray-200 bg-white"
            }`}
        >
          <div className="h-10 w-10 rounded-full border-[6px] border-gray-50 bg-[#F2F4F7] flex items-center justify-center">
            <CloudUpload size={20} className="text-gray-600" />
          </div>
          <div className="flex flex-col gap-1 text-xs text-center text-gray-500">
            <div>
              <input
                type="file"
                id={fieldName}
                className="hidden"
                accept={accept}
                onChange={handleInputChange}
              />
              <label htmlFor={fieldName} className="text-sm">
                <b className="text-[#5C2E1B] font-500 cursor-pointer">Click</b>
              </label>
              <span> or drag and drop</span>
            </div>

            <p>PDF, SVG, PNG or JPG (max. 800x400px)</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuUpload;
