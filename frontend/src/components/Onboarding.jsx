import React, { useState, useEffect } from "react";
import Typewriter from './Typewriter';
import PdfUploadBar from "./PdfUploadBar";
import TextSwitcher from "./TextSwitcher";


const loading = ["Analyzing your resume...", 
    "Searching for excuses to hire you...", 
    "Consulting with a psychic...", 
    "Polishing the rejection stamp...", 
    "Pretending to be impressed...", 
    "Looking for hidden talents... still looking...", 
    "Cross-referencing with the FBI watchlist...", 
    "Scanning for buzzwords: synergy detected...", 
    "Phoning your mom for clarification...", 
    "Bribing HR to take a second look....", 
    "Tallying the number of times you wrote 'team player'...", 
    "Regretting we opened this file...", 
    "Counting the number of typos...", 
    "Judging your font choice harshly...", 
    "Adding 'expert procrastinator' to skills section...", 
    "Filing this under 'better luck next time'...", 
    "Assessing damage to recruiter’s eyes...", 
    "Translating your jargon into English...", 
    "Checking if LinkedIn can save you...", 
    "Reading between the lines... it's not good..."]

const Onboarding = ({setText}) => {

    const [progress, setProgress] = useState(0);

    const textDuration = 100;

    useEffect(() => {
        // Display the title after 1 second
        const timeout1 = setTimeout(() => setProgress(1), 0.1500);
        const timeout2 = setTimeout(() => setProgress(2), 0.7000);
        const timeout3 = setTimeout(() => setProgress(3), 0.10000);
    
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

            {progress >= 0 &&
                <div className="transition-all duration-1000 my-4"
                style={{opacity: `${progress == 3 && "100%" || progress != 3 && "0%"}`, transform: `scale(1, ${progress == 4 && "0" || progress != 4 && "1"})`}}>
                    <PdfUploadBar setText={(arg) => {
                        setText(arg);
                        setProgress(4);
                    }}/>
                </div>
            }


            {progress >= 4 && 
                <TextSwitcher texts={loading} interval={1500} typing_speed={150}/>
            }
        </div>
      )

}



export default Onboarding;