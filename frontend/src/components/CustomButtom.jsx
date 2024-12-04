




const CustomButtom = ({execute}) => {



    return(
        <div onClick={execute}
        className="text-2xl font-mono bg-black text-white rounded-md w-fit px-4 shadow-md hover:cursor-pointer hover:shadow-sm transition-all duration-1000">
            <slot />
        </div>
    )
}




export default CustomButtom;