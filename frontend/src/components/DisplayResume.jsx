import Typewriter from "./Typewriter";




const DisplayResume = ({resume}) => {
    if(!resume.valid){
        return(
            <Typewriter text={resume.invalid_roast} />
        )
    }else{
        
    }
}



export default DisplayResume;