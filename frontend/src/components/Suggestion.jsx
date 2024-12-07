import { useState } from "react";

const Suggestion = ({ text }) => {
    const [shown, setShown] = useState(false);

    return (
        <div className="relative w-fit">
                <div
                    className=" hover:cursor-pointer animate-fadeInUp bg-gradient-to-br from-purple-400 to-purple-800 rounded-md border-purple-400 border-2 text-white px-2 py-2 font-extrabold font-mono"
                    onClick={() => setShown(!shown)}
                >
                    {shown == true ? "Hide" : "Show"} Suggestion
                    {shown && 
                        <div
                        className="animate-suggestion rounded-md bg-slate-50 text-black border-purple-400 border-2 px-4 py-2 font-medium font-mono"
                        >
                            {text}
                        </div>
                    }
                </div>
        </div>
    );
}

export default Suggestion;
