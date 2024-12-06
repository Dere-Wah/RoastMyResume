import { useState } from "react";





const Suggestion = ({text}) => {


    const [shown, setShown] = useState(false);


    return(
        <div className="">
            {shown ==  false &&
            <div className="hover:cursor-pointer animate-fadeInUp bg-gradient-to-br from-purple-400 to-purple-800 rounded-md border-purple-400 border-2 text-white px-2 font-extrabold font-mono"
            onClick={() => setShown(true)}>
                Show Suggestion
            </div>
            }

            {shown ==  true &&
            <div className="flex flex-col animate-fadeInUp">
                <div className="border-purple-400 border-2 hover:cursor-pointer bg-purple-200 rounded-t-md w-fit px-4 pb-1 -mb-1 font-extrabold font-mono text-purple-900"
                    onClick={() => setShown(false)}>Suggestion</div>
                <div className="bg-gradient-to-br from-purple-400 to-purple-800 rounded-md border-purple-400 border-2 text-white px-2 font-extrabold font-mono"
                >
                    {text}
                </div>
            </div>
            }
        </div>
    )


}



export default Suggestion;