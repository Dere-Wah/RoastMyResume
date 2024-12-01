import React, { useState } from "react";
import TypewriterList from "./TypewriterList.jsx";
import PdfUploadBar from "./PdfUploadBar.jsx";
import Button from "./Button.jsx"
import TextSwitcher from "./TextSwitcher.jsx";
import CVRoast from "../classes/CVRoast.jsx";
import Typewriter from "./Typewriter.jsx";
import Onboarding from "./Onboarding.jsx";

const NewApp = () => {

    const [resumeText, setResumeText] = useState(null);

    const [fileName, setFileName] = useState(null);
    const [isGenerated, setIsGenerated] = useState(false)
    const [isRoastReady, setIsRoastReady] = useState(false)
    const [currentRoast, setCurrentRoast] = useState(null);
    const[currentCv, setCurrentCv] = useState(null);
    const roastApi = new CVRoast();
    const [currentInputText, setcurrentInputText] = useState(null);


    const setStartGeneration = async () => {
        console.log("generating...")
        setIsGenerated(true);
        setIsRoastReady(false);

        let result = await roastApi.splitResponse(currentInputText)
        setCurrentCv(result);
        let roast = await roastApi.getChatGPTResponse(result)
        setCurrentRoast(roast);
        setIsRoastReady(true);
    }


    if (isGenerated == false){
        return(
            <Onboarding setText={setResumeText}/>
        )
    }


    if (fileName == null){
        return(
            <div className="flex flex-col justify-between h-full bg-gray-50">
                {isRoastReady && isGenerated && 
                    <TypewriterList current_cv={currentCv} current_roast={currentRoast} interval={4000} client:load />
                }

                {isGenerated && !isRoastReady &&
                    <div className="h-full bg-white flex flex-col justify-center rounded-md">
                        <TextSwitcher texts={["Looking at your ugly face...", "Asking for an ambulance...", "Burning your CV..."]} interval={5000}/>
                    </div>
                }
                

                {!isGenerated &&
                    <div className="h-full bg-white flex flex-col justify-center rounded-md">
                        <div className="w-full text-center text-black/40 text-4xl">Waiting for a Resume...</div>
                    </div>
                }
                <div className="px-24 py-4 flex flex-col items-center">
                    {currentInputText != null && !isGenerated &&
                    <Button text="Generate" execute={async () => {
                        await setStartGeneration()}
                        } />
                    }
                    {!isGenerated && 
                        <input type="text"
                        placeholder="Your CV Here"
                        onChange={(e) => setcurrentInputText(e.target.value)}
                        value={currentInputText == null ? "" : currentInputText}
                        className="bg-black-600 w-full rounded-md border-2 px-3 font-bold" />
                    }
                </div>
            </div>
        )
    }




    
}





export default NewApp;