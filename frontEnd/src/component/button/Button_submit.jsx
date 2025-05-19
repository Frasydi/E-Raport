const ButtonSubmit = ({type, bg, hover, children})=> {
    return (
        <button type={type} className={`${bg} ${hover} w-20 p-1.5 rounded-md font-bold text-white mt-2 cursor-pointer`}>
            {children}
        </button>
    )
}

export default ButtonSubmit