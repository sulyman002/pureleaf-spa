import React, { useRef, useState } from "react";
import { X } from "lucide-react";
import useAppContext from "../context/useAppContext";
import { Listbox } from "@headlessui/react";
import { resolution } from "../data/data";
import { ChevronDown } from "lucide-react";
import qr_bg from "../assets/qr_bg.jpg";
// import transparent from "../assets/transparent.png";
// import bar_code from "../assets/bar_code.png";
import { toast } from "sonner";
import * as htmlToImage from "html-to-image";

const QrUpdate = () => {
  // const qrUpdateRef = useRef(null);
  const exportRef = useRef(null);

  const {
    handleCopy,
    handleOpenQrUpdate,
    data: qrData,
    qr,
    logoImg,
  } = useAppContext();
  const [select, setSelect] = useState(resolution[0]);
  const [option, setOption] = useState("background");
  const [qrBg, setQrBg] = useState(null);
  const link = qrData?.imageUrl;

  const handleOptionChange = (event) => {
    setOption(event.target.value);
  };



  const downloadQr = async () => {
    if (!qr) return toast.error("QR code not ready yet!");

    try {
      

      setTimeout(async () => {
        const node = exportRef.current;
        if (!node) return;

        const dataUrl = await htmlToImage.toPng(node, { cacheBust: true });

        const link = document.createElement("a");
        link.download = `${qrData?.name || "qrCode"}.png`;
        link.href = dataUrl;
        link.click();
      }, 300);
    } catch (error) {
      console.log("Download failed:", error);
      toast.error("Failed to download QR");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-[#34405499]/60 backdrop-blur-[2px] flex items-start md:items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full md:w-[800px] overflow-x-hidden max-h-[90vh] overflow-y-auto flex flex-col gap-2 py-8 ">
        <div className="border-b border-gray-200">
          <div className="flex items-center px-5 justify-between py-6 border-b border-gray-200">
            <p className="font-600 font-semibold text-2xl text-gray-900 ">
              Edit '{qrData?.name}'
            </p>
            <div
              onClick={() => handleOpenQrUpdate()}
              className="cursor-pointer "
            >
              <X />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8 py-6 px-5">
          <div className="flex flex-col gap-8 w-full md:w-1/3">
            <div className="flex gap-3 flex-col">
              <p className="font-600 font-semibold text-base ">Options</p>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="option"
                  value="background"
                  onChange={handleOptionChange}
                  checked={option === "background"}
                  className="accent-[#5C2E1B]"
                />
                <p className="font-400 text-base text-[#101828]">
                  With image background{" "}
                  <label
                    htmlFor="changeImage"
                    className="underline cursor-pointer"
                  >
                    (change image)
                  </label>
                  <input
                    type="file"
                    id="changeImage"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      setQrBg(file ? URL.createObjectURL(file) : null);
                    }}
                  />
                </p>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="option"
                  value="transparent"
                  checked={option === "transparent"}
                  onChange={handleOptionChange}
                  className="accent-[#5C2E1B]"
                />
                <p className="font-400 text-base text-[#101828]">Transparent</p>
              </div>
              <div className="flex items-center gap-3 ">
                <p className="text-gray-900 font-semibold text-base ">
                  Resolution
                </p>
                <Listbox value={select} onChange={setSelect}>
                  <div className="relative">
                    <Listbox.Button className="flex items-center gap-3 py-2.5 px-3.5 outline-none border-[0.6px] border-[#C8C8C8] rounded-lg">
                      <div className="text-base text-gray-900 flex items-center gap-4">
                        <p>{select.value}</p>
                        <p className="text-gray-500">{select.action}</p>
                      </div>
                      <ChevronDown size={20} />
                    </Listbox.Button>

                    <Listbox.Options className="absolute left-0 top-full mt-2 w-full  bg-white border-gray-200 rounded-lg z-50 shadow">
                      {resolution.map((item, index) => (
                        <Listbox.Option
                          key={index}
                          value={item}
                          className="hover:bg-gray-100 rounded-lg cursor-pointer"
                        >
                          <div className="text-base text-gray-900 py-2.5 px-4 flex items-center gap-2">
                            <p>{item.value}</p>
                            <p className="text-gray-500">{item.action}</p>
                          </div>
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </Listbox>
              </div>
            </div>
            {/* button */}
            <div className=" flex flex-col gap-8">
              <div className="flex items-center flex-col w-full gap-3">
                <button
                  onClick={() => {
                    const numericSize = parseInt(select.value);
                    downloadQr(numericSize);
                  }}
                  className="cursor-pointer w-full text-base font-semibold text-white flex items-center justify-center rounded-lg py-2.5 px-4.5 bg-[#5C2E1B] shadow-xs"
                >
                  Download PNG
                </button>
                <button
                  onClick={() => {
                    handleCopy(link);
                    toast.success("link copied.");
                  }}
                  className="cursor-pointer w-full text-base font-semibold text-[#404652] flex items-center justify-center rounded-lg py-2.5 px-4.5 border border-[#F0ECEB] shadow-xs bg-[#F0ECEB] "
                >
                  Copy Link
                </button>
              </div>

              <p className="font-400 text-sm text-gray-500 ">
                <b>Tip:</b> Use Image for marketing/print materials; choose
                Transparent for overlays or when printing onto light
                backgrounds.
              </p>
            </div>
          </div>

          <div
            ref={exportRef}
            style={{
              backgroundImage: `url(${
                option === "background" ? qrBg || qr_bg : ""
              })`,
            }}
            className="flex-1 flex-col h-full w-full bg-cover flex items-center justify-center py-8 px-0 md:px-8 backdrop-blur-lg rounded-md"
          >
            {/* logo should be here */}
            <div className="">
              <img src={logoImg} alt="logo-image" className="w-45" />
            </div>
            <p
              className={`font-600 font-semibold text-lg md:text-2xl ${
                option === "transparent" ? "text-gray-900" : "text-white"
              } `}
            >
              Scan for {qrData?.name}
            </p>
            <div className="mt-4">
              <div className="h-90">
                {/* {loading && <p>Generating QR Code...</p>} */}
                {qr && (
                  <div className="flex items-center justify-center w-100 h-90 p-1 mt-5 rounded-lg">
                    <img
                      src={qr}
                      alt="Generated QR Code"
                      style={{
                        width: "100%",
                        maxWidth: "250px",
                        height: "auto",
                      }}
                    />
                    {/* <div
                      ref={qrUpdateRef}
                      className="flex items-center justify-center w-full"
                    ></div> */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrUpdate;
