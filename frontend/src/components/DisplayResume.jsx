import Typewriter from "./Typewriter";
import TypewriterList from "./TypewriterList";



const DisplayResume = ({resume}) => {
    if(!resume.valid){
        return(
            <Typewriter text={resume.invalid_roast} />
        )
    }else{
        return(
            <div className="w-full h-[100%] bg-slate-100 overflow-hidden overflow-x-clip overflow-y-scroll no-scrollbar mb-12 mx-24">
                <TypewriterList resume={resume.result} interval={2500}/>
            </div>
        )
    }
}



export default DisplayResume;