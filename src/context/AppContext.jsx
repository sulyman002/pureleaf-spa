// import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "sonner";
// import QRCode from "qrcode";
import QRCodeStyling from "qr-code-styling";
import logoImg from "../assets/logoImg.png";
import tRex from "../assets/t-dog-removebg-preview.png";

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [createNew, setCreateNew] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [loginDetails, setLoginDetails] = useState(null);

  // Generic single upload (old one)
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("idle");

  const [data, setData] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [preview, setPreview] = useState(false);
  const [openQr, setOpenQr] = useState(false);
  const [qr, setQr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openQrUpdate, setOpenQrUpdate] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [expanded, setExpanded] = useState([]);

  // TOGGLE EXPAND
  const toggleExpand = (menu) => {
    setExpanded((prev) =>
      prev.includes(menu)
        ? prev.filter((item) => item !== menu)
        : [...prev, menu]
    );
  };

  //  MENU UPLOAD STATES 

  const [spaStatus, setSpaStatus] = useState("idle");
  const [spaProgress, setSpaProgress] = useState(0);

  const [foodStatus, setFoodStatus] = useState("idle");
  const [foodProgress, setFoodProgress] = useState(0);

  const [drinkStatus, setDrinkStatus] = useState("idle");
  const [drinkProgress, setDrinkProgress] = useState(0);

  // SHARED UPLOAD SIMULATOR

  const simulateUpload = async (file, setStatus, setProgress) => {
    if (!file) return;
    setStatus("uploading");
    setProgress(0);

  
    for (let i = 0; i <= 100; i += 5) {
      await new Promise((r) => setTimeout(r, 150));
      setProgress(i);
    }

    setStatus("completed");
  };

  // INDIVIDUAL MENU UPLOADER
  const uploadSpaToServer = async (file) => {
    await simulateUpload(file, setSpaStatus, setSpaProgress);
  };

  const uploadFoodToServer = async (file) => {
    await simulateUpload(file, setFoodStatus, setFoodProgress);
  };

  const uploadDrinkToServer = async (file) => {
    await simulateUpload(file, setDrinkStatus, setDrinkProgress);
  };


  const uploadToServer = async (file) => {
    await simulateUpload(file, setUploadStatus, setUploadProgress);
  };

  // MODAL OPENERS
  const handleOpenQr = () => {
    setOpenQr((prev) => !prev);
  };

  const handleOpenQrUpdate = () => {
    setOpenQrUpdate((prev) => !prev);
  };

  const handleToggleDeleteModal = () => {
    setOpenDeleteModal((prev) => !prev);
  };

  const handleOpenEdit = () => {
    setEdit(!edit);
  };
  const handleOpenPreview = () => {
    setPreview(!preview)
  }

  //  FILE INPUT HANDLERS (if used elsewhere) 

  const handleFoodFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    uploadFoodToServer(file);
  };

  const handleDrinkFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    uploadDrinkToServer(file);
  };

  const handleSpaFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    uploadSpaToServer(file);
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

  // - QR-CODE LOGIC 

  const convertToQrCode = async (qrData, size = 20) => {
    setLoading(true);
    setQr(null);

    const imageUrl = qrData?.imageUrl || qrData;
    if (!imageUrl) {
      toast.error("Invalid QR data");
      setLoading(false);
      return;
    }

    // Fake delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const qrCode = new QRCodeStyling({
        width: size,
        height: size,
        data: imageUrl,
        dotsOptions: { color: "#000", type: "rounded" },
        cornersSquareOptions: { type: "extra-rounded" },
        cornersDotOptions: { type: "dot" },
        image: tRex,
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 2,
          imageSize: 0.3,
        },
      });

      setQr(qrCode);
    } catch (error) {
      console.log("Error generating QR:", error);
      toast.error("Error generating QR");
    }

    setLoading(false);
  };

  const handleCopy = async (qrData) => {
    const imageUrl = qrData?.imageUrl || qrData;
    try {
      await navigator.clipboard.writeText(imageUrl);
      console.log("Copied!");
    } catch (err) {
      console.log("Failed to copy", err);
    }
  };

  //  STORE 

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

    handleOpenPreview,
    preview,

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

    logoImg,

    toggleExpand,
    setExpanded,
    expanded,

    // menu upload stuff for CreateMenu/MenuUpload
    spaStatus,
    setSpaStatus,
    spaProgress,
    setSpaProgress,
    uploadSpaToServer,

    foodStatus,
    setFoodStatus,
    foodProgress,
    setFoodProgress,
    uploadFoodToServer,

    drinkStatus,
    setDrinkStatus,
    drinkProgress,
    setDrinkProgress,
    uploadDrinkToServer,

    // legacy handlers (if you still use them elsewhere)
    handleSpaFile,
    handleDrinkFile,
    handleFoodFile,
  };

  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
};
