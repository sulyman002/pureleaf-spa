// import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "sonner";
// import QRCode from "qrcode";
import QRCodeStyling from "qr-code-styling";
import logoImg from "../assets/logoImg.png"
import tRex from "../assets/t-dog-removebg-preview.png";

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [createNew, setCreateNew] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [loginDetails, setLoginDetails] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("idle");
  const [data, setData] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [openQr, setOpenQr] = useState(false);
  const [qr, setQr] = useState("");
  const [loading, setLoading] = useState(false);
  const [openQrUpdate, setOpenQrUpdate] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [inputValue, setInputValue] = useState("");


  const uploadToServer = async (file) => {
    if (!file) return;
    setUploadStatus("uploading");

    for (let i = 0; i <= 100; i += 5) {
      await new Promise((r) => setTimeout(r, 150));
      setUploadProgress(i);
    }

    setUploadStatus("completed");
  };



  const handleOpenQr = () => {
    setOpenQr(!openQr);
  };

  const handleOpenQrUpdate = () => {
    setOpenQrUpdate((prev) => !prev);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isPDF = file.type === "application/pdf";

    if (isPDF) {
      setUploadFile(file);
      uploadToServer(file);
    } else {
      toast.error("Please upload a valid PDF file.");
    }

  };



  const handleToggleDeleteModal = () => {
    setOpenDeleteModal((prev) => !prev);
  };

  const handleOpenEdit = () => {
    setEdit((prev) => !prev);
  };

const convertToQrCode = async (qrData) => {
  if (!qrData) {
    toast.error("Invalid QR data");
    return null;
  }

  setLoading(true);
  setQr(null);

  try {
    const qrCode = new QRCodeStyling({
      width: 1200,
      height: 1500,
      data: qrData?.imageUrl || qrData,
      dotsOptions: { color: "#000", type: "rounded" },
      cornersSquareOptions: { type: "extra-rounded" },
      cornersDotOptions: { type: "dot" },
      image: tRex, 
      imageOptions: { crossOrigin: "anonymous", margin: 2, imageSize: 0.22 },
    });

    // Off-screen canvas
    const canvas = document.createElement("canvas");
    await qrCode._render(canvas);

    // Small delay to ensure proper rendering
    await new Promise((resolve) => setTimeout(resolve, 50));

    // Convert canvas to blob
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
    if (!blob) throw new Error("Failed to generate QR blob");

    const url = URL.createObjectURL(blob);
    setQr(url); // update context state for global access
    return url;  // also return for immediate use in component if needed
  } catch (err) {
    console.error("QR generation error:", err);
    toast.error("Error generating QR");
    return null;
  } finally {
    setLoading(false);
  }
};



  // const convertToQrCode = async (qrData) => {
  //   setLoading(true);
  //   setQr(null);

  //   const imageUrl = qrData?.imageUrl || qrData;
  //   if (!imageUrl) {
  //     toast.error("Invalid QR data");
  //     setLoading(false);
  //     return;
  //   }

  //   try {
  //     const qrCode = new QRCodeStyling({
  //       width: 1200,
  //       height: 1500,
  //       data: imageUrl,
  //       dotsOptions: { color: "#000", type: "rounded" },
  //       cornersSquareOptions: { type: "extra-rounded" },
  //       cornersDotOptions: { type: "dot" },
  //       image: "/t-rex.png",
  //       imageOptions: { crossOrigin: "anonymous", margin: 2, imageSize: 0.22 },
  //     });

  //     // Create an off-screen canvas
  //     const canvas = document.createElement("canvas");
  //     await qrCode._render(canvas); // PRIVATE API but stable in v1+

  //     const blob = await new Promise((resolve) =>
  //       canvas.toBlob(resolve, "image/png")
  //     );

  //     const url = URL.createObjectURL(blob);
  //     setQr(url);
  //   } catch (error) {
  //     console.log("Error generating QR:", error);
  //     toast.error("Error generating QR");
  //   }

  //   setLoading(false);
  // };

  const handleCopy = async (qrData) => {
    const imageUrl = qrData?.imageUrl || qrData;
    try {
      await navigator.clipboard.writeText(imageUrl);
      console.log("Copied!");
    } catch (err) {
      console.log("Failed to copy", err);
    }
  };

  const store = {
    createNew,
    setCreateNew,
    userDetails,
    setUserDetails,
    loginDetails,
    setLoginDetails,
    setUploadFile,
    uploadFile,
    uploadToServer,
    setUploadStatus,
    uploadStatus,
    setUploadProgress,
    uploadProgress,
    handleFileUpload,
    setData,
    data,
    setOpenDeleteModal,
    openDeleteModal,
    handleToggleDeleteModal,
    handleOpenEdit,
    edit,
    handleOpenQr,
    openQr,
    setQr,
    setLoading,
    qr,
    loading,
    convertToQrCode,
    handleOpenQrUpdate,
    openQrUpdate,
    handleCopy,
    setFilterValue,
    filterValue,
    inputValue,
    setInputValue,
    logoImg
  };

  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
};
