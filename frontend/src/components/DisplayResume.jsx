import Typewriter from "./Typewriter";
import TypewriterList from "./TypewriterList";



const DisplayResume = ({resume}) => {
    if(!resume.valid){
        return(
            <div className="w-full h-full bg-slate-100 mb-12 px-12">
                <Typewriter text={resume.invalid_roast} />
            </div>
        )
    }else{
        return(
            <div className="w-full  overflow-hidden overflow-x-clip overflow-y-scroll no-scrollbar mb-12 mx-24">
                <TypewriterList resume={resume.result} interval={2500}/>
            </div>
        )
    }
}



export default DisplayResume;