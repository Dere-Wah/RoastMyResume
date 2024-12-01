import Typewriter from "./Typewriter";
import TypewriterList from "./TypewriterList";



const DisplayResume = ({resume}) => {
    if(!resume.valid){
        return(
            <Typewriter text={resume.invalid_roast} />
        )
    }else{
        return(
            <TypewriterList resume={resume.result} interval={2500}/>
        )
    }
}



export default DisplayResume;