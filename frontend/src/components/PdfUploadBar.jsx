import React, { useEffect, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import Typewriter from "./Typewriter";
import CustomButtom from "./CustomButton";

const FILE_LIMIT = 5000;

const PdfUploadBar = ({setText}) => {

  const [valid, setValid] = useState(null);
  const [errorMessage, setErrorMessage] = useState("You should not be able to see this.")


  const extractTextFromPdf = async (file) => {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`;

    const fileReader = new FileReader();

    fileReader.onload = async (e) => {
      const typedArray = new Uint8Array(e.target.result);
      let pdf = null;
      try{
        pdf = await pdfjsLib.getDocument(typedArray).promise;
      }catch{
        setValid(false);
        setErrorMessage("This PDF is weird, I could not open it. Are you trying to kill me???");
        return;
      }
      let extractedText = "";

      // Loop through all the pages
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();

        // Combine text items into a single string
        const pageText = content.items.map((item) => item.str).join(" ");
        extractedText += `Page ${i}:\n${pageText}\n\n`;
      }
      if(extractedText.length > FILE_LIMIT){
        setValid(false);
        setErrorMessage("Woahh, slow down there! How is your CV that long? Upload a shorter file.")
        return;
      }
      setText(extractedText); // Update the parent state with extracted text
    };

    fileReader.readAsArrayBuffer(file);
  };

  const handleFileChange = (event) => {
    setErrorMessage("")
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
        try{
          extractTextFromPdf(file);
          setValid(true);
        }
        catch{
          setValid(false);
          event.target.value = null;
          setErrorMessage("This PDF is weird, I could not open it. Are you trying to kill me???")
        }

    } else {
      setValid(false);
      event.target.value = null; // Reset the input value
      setErrorMessage("You had 1 (ONE) task, to upload a .pdf file. And you failed it.")
    }
  };

  const handleBarClick = () => {
    if (valid != true){
      document.getElementById("pdfInput").click();
    }
  };

  return (
    <div className="flex flex-col">
      <CustomButtom execute={handleBarClick} text={"Upload your CV"}></CustomButtom>
      <input
        type="file"
        id="pdfInput"
        style={{ display: "none" }}
        accept="application/pdf"
        onChange={handleFileChange}
      />
      {valid == false && 
        <Typewriter text={errorMessage} background={false} />
      }
    </div>
  );
};

export default PdfUploadBar;
