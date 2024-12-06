




const CustomButtom = ({text, execute}) => {

    return(
        <div onClick={execute}
            className="animate-fadeInUp text-2xl font-mono bg-black text-white rounded-md w-fit px-4 shadow-md hover:cursor-pointer hover:shadow-sm transition-all duration-1000">
            {text}
        </div>
    )
}




export default CustomButtom;