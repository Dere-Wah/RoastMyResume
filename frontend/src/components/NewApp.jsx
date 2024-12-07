import React, { useState } from "react";

import CVRoast from "../classes/CVRoast.jsx";
import Onboarding from "./Onboarding.jsx";
import DisplayResume from "./DisplayResume.jsx";
import Typewriter from "./Typewriter.jsx";

const NewApp = () => {

    const [resume, setResume] = useState(null);
    
    const roastApi = new CVRoast();


    const onPdfUploaded = async (text) => {
        const result = await roastApi.evaluateCV(text);
        setResume(result);
    }

    if (resume == null){
        return(
            <div className="m-12">
                <Onboarding setText={onPdfUploaded}/>
            </div>
        )
    }

    if (resume){
        return(
            <div className="w-full h-full flex flex-col items-center gap-4 py-4">
                <a className="text-3xl lg:text-4xl hover:shadow-xl transition-all duration-500 ease-in-out rounded-md p-4" href=".">
                    <Typewriter text="&#8592;RoastMyResume" background={false}/>
                </a>
                <DisplayResume resume={resume} />
            </div>
        )
    }



    
}





export default NewApp;