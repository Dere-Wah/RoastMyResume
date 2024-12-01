import React, { useState, useEffect } from "react";
import Typewriter from './Typewriter';
import PdfUploadBar from "./PdfUploadBar";



const Onboarding = ({setText}) => {

    const [progress, setProgress] = useState(0);

    const textDuration = 100;

    useEffect(() => {
        // Display the title after 1 second
        const timeout1 = setTimeout(() => setProgress(1), 1500);
        const timeout2 = setTimeout(() => setProgress(2), 7000);
        const timeout3 = setTimeout(() => setProgress(3), 10000);
    
        // Cleanup timeouts on component unmount
        return () => {
          clearTimeout(timeout1);
          clearTimeout(timeout2);
          clearTimeout(timeout3);
        };
      }, []);

      return (
        <div className="flex flex-col text-lg">
            <Typewriter text="Welcome." background={false}/>
            {progress >= 1 && 
                <Typewriter text="You think you deserve ***that*** job?" background={false}/>
            }

            {progress >= 2 &&
                <div className="text-3xl">
                    <Typewriter text="Let's find out." background={false}/>
                </div>
            }

            {progress >= 3 &&
                <PdfUploadBar setText={(arg) => {
                    setText(arg);
                    setProgress(4);
                }}/>
            }


            {progress >= 4 && 
                <Typewriter text="Reading your Resume..." background={false}/>
            }
        </div>
      )

}



export default Onboarding;