"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import LoadingReveal from "./components/LoadingReveal";

const tabs = ["File Upload", "Scan URL"];

const allowedExtensions = [
  ".jpg",
  ".jpeg",
  ".png",
  ".bmp",
  ".gif",
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("File Upload");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [urlValue, setUrlValue] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const validateExtension = (value: string) => {
    const lower = value.toLowerCase();

    return allowedExtensions.some((ext) =>
      lower.endsWith(ext)
    );
  };

  const handleFileUpload = async () => {
    setMessage("");

    if (!selectedFile) {
      setMessage("Please select a file.");
      return;
    }

    if (!validateExtension(selectedFile.name)) {
      setMessage(
        "Invalid file type. Supported: .jpg, .jpeg, .png, .bmp, .gif"
      );
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch(
        "https://localhost:7022/api/imageanalysis/analyse",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();

      console.log(data);

      setMessage("Image uploaded successfully.");
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleUrlScan = async () => {
    setMessage("");

    if (!urlValue) {
      setMessage("Please enter a URL.");
      return;
    }

    if (!validateExtension(urlValue)) {
      setMessage(
        "Invalid image URL. Supported: .jpg, .jpeg, .png, .bmp, .gif"
      );
      return;
    }

    try {
      setLoading(true);

      const visionRequestQuery = {
        Url: urlValue
      }
      const response = await fetch(
        "https://localhost:7022/api/imageanalysis/analyse",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(visionRequestQuery)
        }
      );

      if (!response.ok) {
        throw new Error("Scan failed");
      }

      const data = await response.json();

      console.log(data);

      setMessage("URL scanned successfully.");
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoadingReveal>
      <main className="relative min-h-screen overflow-hidden bg-[#020817] text-white">
        {/* Background Glow */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="absolute left-[30%] top-[20%] h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-3xl" />
        </div>

        <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h1 className="bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-100 bg-clip-text text-5xl font-black text-transparent md:text-7xl">
              Welcome to Ardent Vision
            </h1>

            <p className="mt-6 text-lg text-blue-100/70">
              AI powered image analysis platform
            </p>
          </motion.div>

          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.2,
            }}
            className="mt-14 w-full max-w-2xl rounded-3xl border border-cyan-500/10 bg-white/5 p-8 shadow-2xl backdrop-blur-2xl"
          >
            {/* Smooth Tabs */}
            <div className="relative flex rounded-2xl bg-white/5 p-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setMessage("");
                  }}
                  className="relative z-10 flex-1 py-3 text-sm font-semibold text-white"
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600"
                      transition={{
                        type: "spring",
                        duration: 0.5,
                      }}
                    />
                  )}

                  <span className="relative z-20">
                    {tab}
                  </span>
                </button>
              ))}
            </div>

            {/* File Upload */}
            {activeTab === "File Upload" && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8"
              >
                <label className="mb-3 block text-sm text-cyan-100/70">
                  Upload an image
                </label>

                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.bmp,.gif"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setSelectedFile(e.target.files[0]);
                    }
                  }}
                  className="w-full rounded-2xl border border-cyan-500/20 bg-white/5 px-4 py-4 text-white file:mr-4 file:rounded-xl file:border-0 file:bg-blue-500 file:px-4 file:py-2 file:text-white"
                />

                <button
                  onClick={handleFileUpload}
                  disabled={loading}
                  className="mt-6 w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4 font-semibold transition-all hover:scale-[1.02]"
                >
                  {loading ? "Uploading..." : "Analyse Image"}
                </button>
              </motion.div>
            )}

            {/* URL Scan */}
            {activeTab === "Scan URL" && (
              <motion.div
                key="url"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8"
              >
                <label className="mb-3 block text-sm text-cyan-100/70">
                  Enter image URL
                </label>

                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  value={urlValue}
                  onChange={(e) =>
                    setUrlValue(e.target.value)
                  }
                  className="w-full rounded-2xl border border-cyan-500/20 bg-white/5 px-4 py-4 text-white outline-none placeholder:text-white/30"
                />

                <button
                  onClick={handleUrlScan}
                  disabled={loading}
                  className="mt-6 w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4 font-semibold transition-all hover:scale-[1.02]"
                >
                  {loading ? "Scanning..." : "Scan URL"}
                </button>
              </motion.div>
            )}

            {/* Validation / Status */}
            {message && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 rounded-2xl border border-cyan-500/10 bg-blue-500/10 p-4 text-sm text-cyan-100"
              >
                {message}
              </motion.div>
            )}

            {/* Supported Extensions */}
            <div className="mt-8 text-center text-xs text-cyan-100/40">
              Supported formats:
              {" "}
              .jpg, .jpeg, .png, .bmp, .gif
            </div>
          </motion.div>
        </section>
      </main>
    </LoadingReveal>
  );
}