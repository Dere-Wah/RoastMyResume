import React, { useState } from "react";


const PdfUploadBar = (fileName, setter) => {

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setter(file.name);
    } else {
      alert("Please upload a valid PDF file.");
      event.target.value = null; // Reset the input value
    }
  };

  const handleBarClick = () => {
    document.getElementById("pdfInput").click();
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "2px dashed #ccc",
          padding: "20px",
          cursor: "pointer",
          backgroundColor: "#f9f9f9",
        }}
        onClick={handleBarClick}
      >
        {fileName ? `Selected File: ${fileName}` : "Click to upload a PDF file"}
      </div>
      <input
        type="file"
        id="pdfInput"
        style={{ display: "none" }}
        accept="application/pdf"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default PdfUploadBar;
