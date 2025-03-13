import React, { useState, useEffect } from "react";
import { Upload, FileCheck, AlertTriangle, Eye, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import useApi from "../hooks/useApi";
import userService from "../services/userServices";

function UploadIdProof({ idProofData }) {
  const [idProof, setIdProof] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [disclaimerText, setDisclaimerText] = useState("");
  const [isIdProofMandatory, setIsIdProofMandatory] = useState(false); 


  const {
    // error: userError,
    loading: userUpdateIdProofLoading,
    execute: userIdProofSubmit,
    // reset: userDataReset,
  } = useApi(userService.userUploadIdProof);

  const {
    execute: getIdProofStatus,
  } = useApi(userService.userGetIdProofStatus);

  useEffect(() => {
    const fetchIdProofStatus = async () => {
      try {
        const response = await getIdProofStatus();        
        if (response?.success) {
          setDisclaimerText(response.data.disclaimerNote || "");
          setIsIdProofMandatory(response.data.isIdProofMandatory || false);
        }
      } catch (error) {
        console.error("Error fetching ID proof status:", error);
      }
    };
    fetchIdProofStatus();
  }, [getIdProofStatus]);


  // Set idProof from props when idProofData is provided
  useEffect(() => {
    if (idProofData) {
      setIdProof(idProofData);
      const extension = idProofData.split(".").pop().toLowerCase();
      setFileType(extension);
    }
  }, [idProofData]);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
  
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be under 5MB");
        return;
      }
  
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (!["jpg", "jpeg", "png", "pdf"].includes(fileExtension)) {
        toast.error("Invalid file type. Only JPG, PNG, and PDF are allowed.");
        return;
      }
  
      setFileType(fileExtension);
  
      // Convert file to FormData
      const formData = new FormData();
      formData.append("idProof", file); // Adjust key as per backend expectations
  
      try {
        const response = await userIdProofSubmit(formData);
        if (response?.success) {
          toast.success(response?.message);
  
          // Update UI with uploaded file preview
          if (fileExtension === "pdf") {
            setIdProof(URL.createObjectURL(file));
          } else {
            const reader = new FileReader();
            reader.onloadend = () => {
              setIdProof(reader.result);
            };
            reader.readAsDataURL(file);
          }
          setPreviewOpen(true);
        } else {
          toast.error("Upload failed");
        }
      } catch (error) {
        toast.error(error.message || "An error occurred while uploading");
      }
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Disclaimer Section */}
        {isIdProofMandatory && disclaimerText && (
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-turquoise-400">
                <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-6 h-6 text-turquoise-400 flex-shrink-0 mt-1" />
                    <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Disclaimer
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                        {disclaimerText}
                    </p>
                    </div>
                </div>
            </div>
        )}


        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            ID Verification
          </h3>

          {!idProof ? (
            <div className="border-2 border-dashed border-[#40E0D0] rounded-lg p-8">
              <div className="flex flex-col items-center text-center">
                <Upload className="w-12 h-12 text-[#40E0D0] mb-4" />
                <p className="text-gray-600 mb-4">
                  Upload a clear photo of your government-issued ID (JPG, PNG,
                  or PDF)
                </p>
                <label className="cursor-pointer bg-[#40E0D0] hover:bg-[#3BC9BB] text-white font-medium py-2 px-6 rounded-lg transition-colors">
                  Choose File
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*,application/pdf"
                    onChange={handleFileUpload}
                  />
                </label>
                <p className="text-sm text-gray-500 mt-2">
                  Supported formats: JPG, PNG, PDF (Max: 5MB)
                </p>
              </div>
            </div>
          ) : (
            <div className="border rounded-lg p-6 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileCheck className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700 font-medium">
                    ID Proof Uploaded
                  </span>
                </div>
                <button
                  onClick={() => setPreviewOpen(!previewOpen)}
                  className="flex items-center space-x-2 text-gray-500 hover:text-gray-600 transition-colors"
                >
                  <Eye className="w-5 h-5" />
                  <span>{previewOpen ? "Hide Preview" : "Show Preview"}</span>
                </button>
              </div>

              {/* File Preview */}
              {previewOpen && (
                <div className="mt-4">
                  {fileType === "pdf" ? (
                    <iframe
                      src={idProof}
                      title="PDF Preview"
                      className="w-full h-64 border border-gray-200 rounded-lg"
                    />
                  ) : (
                    <img
                      src={idProof}
                      alt="ID Preview"
                      className="max-w-full h-auto rounded-lg border border-gray-200"
                    />
                  )}
                </div>
              )}

              <div className="mt-4 flex justify-end">
              {
                userUpdateIdProofLoading ? (
                  <div className="inline-flex items-center px-4 py-2 border border-[#40E0D0] text-[#40E0D0] rounded-lg font-medium">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Uploading...
                  </div>
                ):
                <label className="inline-flex items-center px-4 py-2 border border-turquoise-500 text-turquoise-500 hover:bg-turquoise-500 hover:text-white rounded-lg cursor-pointer transition-all duration-200 ease-in-out font-medium shadow-sm hover:shadow-md group">
                  <Upload className="w-4 h-4 mr-2 transform group-hover:scale-110 transition-transform" />
                  Upload New
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*,application/pdf"
                    onChange={handleFileUpload}
                  />
                </label>
              }
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UploadIdProof;
