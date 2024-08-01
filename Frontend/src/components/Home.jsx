import React from "react";
import { FaFileWord } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
export default function Home() {
  const [selectedfile, Setselectedfile] = useState(null);
  const [convert, SetConvert] = useState("");
  const [downloadError, SetDownloadError] = useState("");
  const handleFileChange = (e) => {
    //  console.log(e.target.files[0]);
    Setselectedfile(e.target.files[0]);
    //  console.log("selected file:"+selectedfile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedfile) {
      SetConvert("Please select a file");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedfile);
    try {
      const response = await axios.post(
        "https://word-to-pdf-app-64vp.vercel.app/convertFile",
        formData,
        {
          responseType: "blob",
        }
      );
      // console.log("response :" + response, data);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      // console.log("url :" + url);
      const link = document.createElement("a");
      // console.log("link 1 document.createElement('a');:" + link);
      link.href = url;
      // console.log("link 2 link.href = url; :" + link);
      link.setAttribute(
        "download",
        selectedfile.name.replace(/\.[^/.]+$/, "") + ".pdf"
      );
      // console.log("link 3 setAttribute :" + link);
      document.body.appendChild(link);
      // console.log("link body.appendChild(link); :" + link);
      link.click();
      link.parentNode.removeChild(link);
      SetDownloadError("");
      SetConvert("File converted successfully");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        SetDownloadError(
          "Error downloading file:" + error.message.data.message
        );
      } else {
        SetConvert("");
      }
    }
  };

  return (
    <>
      <div className="max-w-screen-2xl mx-auto container px-8 md:px-40 py-3">
        <div className="flex justify-center h-screen items-center">
          <div className="border-2 border-dashed px-3 py-2 mx:px-12 md:py-10 border-indigo-500 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-center mb-5">
              Convert WORD to PDF Online
            </h1>
            <p className="text-sm text-center mb-5">
              Easily convert word documents to pdf online without having to use
              any software
            </p>

            <div className="flex flex-col items-center space-y-4">
              <input
                type="file"
                className="hidden"
                id="FileInput"
                onChange={handleFileChange}
              />
              <label
                htmlFor="FileInput"
                className="w-full flex itmes-center justify-center px-4 py-6  hover:text-white bg-gray-100 text-gray-700 rounded-lg shadow-lg cursor-pointer border-blue-700 hover:bg-blue-500 duration-300"
              >
                {" "}
                <FaFileWord size={34} />
                <span className="text-3xl mr-2">
                  {selectedfile ? selectedfile.name : "Choose File"}
                </span>
              </label>
              <button
                onClick={handleSubmit}
                disabled={!selectedfile}
                className=" disabled:pointer-events-none disabled:bg-slate-500 bg-blue-500 px-3 py-2 rounded-lg text-white hover:bg-blue-700 duration-300 cursor-pointer font-bold"
              >
                Convert File
              </button>
              {convert && (
                <div className="text-center text-green-500 font-bold">
                  {convert}
                </div>
              )}
              {downloadError && (
                <div className="text-center text-red-500 font-bold">
                  {downloadError}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
