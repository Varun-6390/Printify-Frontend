import React, { useState, useCallback, useEffect } from "react";
import { PDFDocument } from "pdf-lib";


const OrderPage = () => {
  const userId = localStorage.getItem("id");

  const [file, setFile] = useState(null);
  const [pageCount, setPageCount] = useState(1);

  const [settings, setSettings] = useState(null); // Admin pricing

  const [printOptions, setPrintOptions] = useState({
    color: "bw",
    sides: "single",
    copies: 1,
  });

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  // ===============================
  // FETCH PRICING FROM BACKEND
  // ===============================
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/settings`)
      .then((res) => res.json())
      .then((data) => setSettings(data));
  }, []);

  // ===============================
  // REAL-TIME COST CALCULATION
  // ===============================
  const calculateCost = () => {
    if (!settings || !file) return "0.00";

    let pricePerPage = 0;

    if (printOptions.color === "bw") {
      pricePerPage =
        printOptions.sides === "single"
          ? settings.bwSingle
          : settings.bwDouble;
    } else {
      pricePerPage =
        printOptions.sides === "single"
          ? settings.colorSingle
          : settings.colorDouble;
    }

    return (pricePerPage * pageCount * printOptions.copies).toFixed(2);
  };

  // ===============================
  // HANDLE FILE UPLOAD + PDF PAGE COUNT
  // ===============================
  const handleFileChange = async (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);

    if (!uploadedFile) return;

    if (uploadedFile.type === "application/pdf") {
      const arrayBuffer = await uploadedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      setPageCount(pdfDoc.getPageCount());
    } else {
      setPageCount(1);
    }
  };


  // ===============================
  // DRAG & DROP
  // ===============================
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(async (e) => {
    e.preventDefault();
    setIsDragOver(false);

    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);

    if (droppedFile && droppedFile.type === "application/pdf") {
      const buffer = await droppedFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
      setPageCount(pdf.numPages);
    } else {
      setPageCount(1);
    }
  }, []);

  // ===============================
  // PRINT OPTIONS
  // ===============================
  const handleOptionChange = (e) => {
    const { name, value } = e.target;
    setPrintOptions((prev) => ({
      ...prev,
      [name]: name === "copies" ? Math.max(1, parseInt(value, 10)) : value,
    }));
  };

  // ===============================
  // SUBMIT ORDER
  // ===============================
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a file first.");
      return;
    }

    setIsPlacingOrder(true);

    const formData = new FormData();
    formData.append("document", file);
    formData.append(
      "options",
      JSON.stringify({
        ...printOptions,
        pageCount,
        price: calculateCost(),
      })
    );
    formData.append("userId", userId);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/order`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Server error");

      const result = await response.json();
      alert(`Order placed! Order ID: ${result.order._id}`);
      window.location.href = "/UserDashboard/OrderStatus";
    } catch (error) {
      alert("Error placing your order.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  // ===============================
  // UI
  // ===============================
  return (
    <div className="relative min-h-screen text-white p-4 sm:p-6 lg:p-8">

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,180,0.15),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent,rgba(0,0,0,0.88))]"></div>

      <div className="relative z-10">
        <h1 className="text-3xl sm:text-4xl font-light mb-6 sm:mb-10 tracking-wide">
          Create <span className="text-teal-300">New Print Order</span>
        </h1>

        <form
          onSubmit={handleFormSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10"
        >
          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-8 sm:space-y-10">

            {/* UPLOAD FILE */}
            <div>
              <h2 className="text-xl sm:text-2xl font-light mb-4">1. Upload Document</h2>

              <div
                className={`border-2 border-dashed rounded-xl p-6 sm:p-10 text-center cursor-pointer backdrop-blur-xl transition
                ${isDragOver
                    ? "border-teal-400 bg-white/10"
                    : "border-white/20 bg-white/5 hover:border-teal-400"
                  }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById("file-upload").click()}
              >
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg"
                  onChange={handleFileChange}
                />

                {file ? (
                  <div className="text-white break-all">
                    <p className="font-medium text-teal-300">File Selected</p>
                    <p className="mt-2 text-lg">{file.name}</p>
                    <p className="text-sm text-gray-300">Pages: {pageCount}</p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                        setPageCount(1);
                      }}
                      className="text-red-400 hover:text-red-300 text-sm mt-3"
                    >
                      Remove File
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="text-lg sm:text-xl text-gray-300">Drag & drop your file</p>
                    <p className="text-sm text-gray-400 mt-1">or click to upload</p>
                  </div>
                )}
              </div>
            </div>

            {/* PRINT OPTIONS */}
            <div>
              <h2 className="text-xl sm:text-2xl font-light mb-4">2. Print Options</h2>

              <div className="p-6 sm:p-8 rounded-xl bg-white/10 border border-white/20 backdrop-blur-xl space-y-6">
                {/* Copies */}
                <div className="flex justify-between">
                  <span>Copies</span>
                  <input
                    type="number"
                    name="copies"
                    min="1"
                    value={printOptions.copies}
                    onChange={(e) =>
                      setPrintOptions((prev) => ({
                        ...prev,
                        copies: Math.max(1, Number(e.target.value)),
                      }))
                    }
                    className="w-20 bg-white/10 border border-white/20 p-2 rounded text-center"
                  />
                </div>

                {/* Color */}
                <div className="flex justify-between">
                  <span>Color</span>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="color"
                        value="bw"
                        checked={printOptions.color === "bw"}
                        onChange={handleOptionChange}
                      />
                      B&W
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="color"
                        value="color"
                        checked={printOptions.color === "color"}
                        onChange={handleOptionChange}
                      />
                      Color
                    </label>
                  </div>
                </div>

                {/* Sides */}
                <div className="flex justify-between">
                  <span>Sides</span>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="sides"
                        value="single"
                        checked={printOptions.sides === "single"}
                        onChange={handleOptionChange}
                      />
                      Single
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="sides"
                        value="double"
                        checked={printOptions.sides === "double"}
                        onChange={handleOptionChange}
                      />
                      Double
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div>
            <div className="sticky top-10 p-6 sm:p-8 rounded-xl bg-white/10 border border-white/20 backdrop-blur-xl shadow-xl">

              <h3 className="text-xl sm:text-2xl font-light mb-4">3. Summary</h3>

              <div className="text-gray-300 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Pages:</span>
                  <span className="text-white">{pageCount}</span>
                </div>

                <div className="flex justify-between">
                  <span>Copies:</span>
                  <span className="text-white font-medium">
                    {printOptions.copies}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Color:</span>
                  <span className="text-white">
                    {printOptions.color === "bw" ? "B&W" : "Color"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Sides:</span>
                  <span className="text-white">{printOptions.sides}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/20 flex justify-between text-xl">
                <span>Total:</span>
                <span className="text-teal-300 font-semibold">
                  ₹{calculateCost()}
                </span>
              </div>

              <button
                type="submit"
                disabled={!file || isPlacingOrder}
                className="w-full mt-6 py-3 rounded-lg bg-teal-400 text-black font-semibold hover:bg-teal-300 disabled:bg-gray-500"
              >
                {isPlacingOrder ? "Placing Order..." : "Place Order"}
              </button>

            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default OrderPage;
