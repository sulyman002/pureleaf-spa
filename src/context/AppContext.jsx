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
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("idle");
  const [data, setData] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [edit, setEdit] = useState(false);
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

const [spaStatus, setSpaStatus] = useState("idle");
const [spaProgress, setSpaProgress] = useState(0);

  const uploadSpaToServer = async (file) => {
    if (!file) return;
    setSpaStatus("uploading");

    for (let i = 0; i <= 100; i += 5) {
      await new Promise((r) => setTimeout(r, 150));
      setSpaProgress(i);
    }

    setSpaStatus("completed");
  };

const [foodStatus, setFoodStatus] = useState("idle");
const [foodProgress, setFoodProgress] = useState(0);

const uploadFoodToServer = async (file) => {
    if (!file) return;
    setFoodStatus("uploading");

    for (let i = 0; i <= 100; i += 5) {
      await new Promise((r) => setTimeout(r, 150));
      setFoodProgress(i);
    }

    setFoodStatus("completed");
  };

const [drinkStatus, setDrinkStatus] = useState("idle");
const [drinkProgress, setDrinkProgress] = useState(0);

const uploadDrinkToServer = async (file) => {
    if (!file) return;
    setDrinkStatus("uploading");

    for (let i = 0; i <= 100; i += 5) {
      await new Promise((r) => setTimeout(r, 150));
      setDrinkProgress(i);
    }

    setDrinkStatus("completed");
  };

  // UPLOAD TO SERVER
  const uploadToServer = async (file) => {
    if (!file) return;
    setUploadStatus("uploading");

    for (let i = 0; i <= 100; i += 5) {
      await new Promise((r) => setTimeout(r, 150));
      setUploadProgress(i);
    }

    setUploadStatus("completed");
  };

  // MODAL OPENERS
  const handleOpenQr = () => {
    setOpenQr(!openQr);
  };
  const handleOpenQrUpdate = () => {
    setOpenQrUpdate((prev) => !prev);
  };
  const handleToggleDeleteModal = () => {
    setOpenDeleteModal((prev) => !prev);
  };

  const handleOpenEdit = () => {
    setEdit((prev) => !prev);
  };

  // HANDLE FILEUPLOAD
  const handleFoodFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    uploadFoodToServer(file)
   
  };

  const handleDrinkFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;


    uploadDrinkToServer(file)
  };

  const handleSpaFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
 
    uploadSpaToServer(file)
  };

  // const handleFileUpload = (e) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   const isPDF = file.type === "application/pdf";

  //   if (isPDF) {
  //     setUploadFile(file);
  //     uploadToServer(file);
  //   } else {
  //     toast.error("Please upload a valid PDF file.");
  //   }
  // };

  // QR-CODE LOGIC
  const convertToQrCode = async (qrData) => {
    setLoading(true);
    setQr(null);

    const imageUrl = qrData?.imageUrl || qrData;
    if (!imageUrl) {
      toast.error("Invalid QR data");
      setLoading(false);
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      const qrCode = new QRCodeStyling({
        width: 400,
        height: 300,
        data: imageUrl,
        dotsOptions: { color: "#000", type: "rounded" },
        cornersSquareOptions: { type: "extra-rounded" },
        cornersDotOptions: { type: "dot" },
        image: tRex,
        imageOptions: { crossOrigin: "anonymous", margin: 2, imageSize: 0.22 },
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
    logoImg,
    toggleExpand,
    setExpanded,
    expanded,
    // newly added
    handleSpaFile,
    handleDrinkFile,
    handleFoodFile
  };

  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
};
