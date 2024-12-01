import React, { useEffect, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import Typewriter from "./Typewriter";


const PdfUploadBar = ({setText}) => {

  const [valid, setValid] = useState(null);


  const extractTextFromPdf = async (file) => {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`;

    const fileReader = new FileReader();

    fileReader.onload = async (e) => {
      const typedArray = new Uint8Array(e.target.result);
      const pdf = await pdfjsLib.getDocument(typedArray).promise;

      let extractedText = "";

      // Loop through all the pages
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();

        // Combine text items into a single string
        const pageText = content.items.map((item) => item.str).join(" ");
        extractedText += `Page ${i}:\n${pageText}\n\n`;
      }
      console.log(extractedText);
      setText(extractedText); // Update the parent state with extracted text
    };

    fileReader.readAsArrayBuffer(file);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
        extractTextFromPdf(file);
        setValid(true);
    } else {
      setValid(false);
      event.target.value = null; // Reset the input value
    }
  };

  const handleBarClick = () => {
    if (valid != true){
      document.getElementById("pdfInput").click();
    }
  };

  return (
    <div className="flex flex-col">
      <div onClick={handleBarClick}
      className="text-2xl font-mono bg-black text-white rounded-md w-fit px-4 shadow-md hover:cursor-pointer hover:shadow-sm transition-all duration-1000">
        Upload Your CV
      </div>
      <input
        type="file"
        id="pdfInput"
        style={{ display: "none" }}
        accept="application/pdf"
        onChange={handleFileChange}
      />
      {valid == false && 
        <Typewriter text="This is not a valid file..." background={false} />
      }
    </div>
  );
};

export default PdfUploadBar;
