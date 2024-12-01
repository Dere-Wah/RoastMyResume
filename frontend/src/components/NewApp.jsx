import React, { useState } from "react";
import TypewriterList from "./TypewriterList.jsx";
import PdfUploadBar from "./PdfUploadBar.jsx";
import Button from "./Button.jsx"
import TextSwitcher from "./TextSwitcher.jsx";
import CVRoast from "../classes/CVRoast.jsx";
import Typewriter from "./Typewriter.jsx";
import Onboarding from "./Onboarding.jsx";

const NewApp = () => {

    const [resume, setResume] = useState(null);
    
    const roastApi = new CVRoast();


    const onPdfUploaded = async (text) => {
        result = await roastApi.evaluateCV(text);
        setResume(result);
    }

    if (resume == null){
        return(
            <Onboarding setText={onPdfUploaded}/>
        )
    }

    if (resume){
        return(
            <DisplayResume resume={resume} />
        )
    }



    
}





export default NewApp;