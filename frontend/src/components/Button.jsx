


const Button = ({text, execute}) => {

    return(
        <div onClick={execute} className="bg-green-400 rounded-md border border-white text-center px-4 hover:cursor-pointer hover:scale-125 transition-all ease-in-out duration-100">
            {text}
        </div>
    )
}

export default Button;