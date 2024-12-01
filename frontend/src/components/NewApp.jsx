import React, { useState } from "react";

import CVRoast from "../classes/CVRoast.jsx";
import Onboarding from "./Onboarding.jsx";
import DisplayResume from "./DisplayResume.jsx";

const NewApp = () => {

    const [resume, setResume] = useState(null);
    
    const roastApi = new CVRoast();


    const onPdfUploaded = async (text) => {
        const result = await roastApi.evaluateCV(text);
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