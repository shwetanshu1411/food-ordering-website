import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateFood = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState("");
  const [fileError, setFileError] = useState("");
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!videoFile) {
      setVideoURL("");
      return;
    }
    const url = URL.createObjectURL(videoFile);
    setVideoURL(url);
    return () => URL.revokeObjectURL(url);
  }, [videoFile]);

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setVideoFile(null);
      setFileError("");
      return;
    }
    if (!file.type.startsWith("video/")) {
      setFileError("Please select a valid video file.");
      return;
    }
    setFileError("");
    setVideoFile(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer?.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("video/")) {
      setFileError("Please drop a valid video file.");
      return;
    }
    setFileError("");
    setVideoFile(file);
  };

  const onDragOver = (e) => e.preventDefault();
  const openFileDialog = () => fileInputRef.current?.click();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("mama", videoFile);

    const response = await axios.post("http://localhost:3000/api/food", formData, {
      withCredentials: true,
    });

    console.log(response.data);
    navigate("/");
  };

  const isDisabled = useMemo(() => !name.trim() || !videoFile, [name, videoFile]);

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-50 py-10 px-4">
      <div className="w-full max-w-lg bg-white shadow-md rounded-2xl p-6 sm:p-8">
        <header className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            Create Food
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Upload a short video, give it a name, and add a description.
          </p>
        </header>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* File Upload */}
          <div className="space-y-2">
            <label htmlFor="foodVideo" className="block text-sm font-medium text-gray-700">
              Food Video
            </label>
            <input
              id="foodVideo"
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={onFileChange}
              className="hidden"
            />

            <div
              className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 transition bg-gray-50"
              role="button"
              tabIndex={0}
              onClick={openFileDialog}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openFileDialog();
                }
              }}
              onDrop={onDrop}
              onDragOver={onDragOver}
            >
              <div className="flex flex-col items-center space-y-3">
                <svg
                  className="w-10 h-10 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 16V4m0 0l4 4m-4-4L8 8m-6 8h20"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-gray-600 font-medium">
                  <strong>Tap to upload</strong> or drag & drop
                </p>
                <p className="text-gray-400 text-sm">MP4, WebM, MOV • Up to ~100MB</p>
              </div>
            </div>

            {fileError && <p className="text-red-500 text-sm">{fileError}</p>}

            {videoFile && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-100 px-4 py-3 rounded-lg border border-gray-300">
                <div className="flex flex-col text-sm text-gray-700">
                  <span className="font-medium">{videoFile.name}</span>
                  <span className="text-gray-500">
                    {(videoFile.size / 1024 / 1024).toFixed(1)} MB
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={openFileDialog}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Change
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setVideoFile(null);
                      setFileError("");
                    }}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Video Preview */}
          {videoURL && (
            <div className="w-full mt-3">
              <video
                src={videoURL}
                controls
                playsInline
                preload="metadata"
                className="w-full rounded-lg shadow-sm object-cover max-h-[400px]"
              />
            </div>
          )}

          {/* Name */}
          <div className="space-y-2">
            <label htmlFor="foodName" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="foodName"
              type="text"
              placeholder="e.g., Spicy Paneer Wrap"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-800"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="foodDesc" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="foodDesc"
              rows={4}
              placeholder="Write a short description: ingredients, taste, spice level, etc."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-800 resize-none"
            />
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isDisabled}
              className={`w-full py-2.5 rounded-lg font-semibold text-white transition 
                ${
                  isDisabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              Save Food
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFood;
