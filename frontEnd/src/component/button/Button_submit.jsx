const ButtonSubmit = ({type, bg, hover, children})=> {
    return (
        <button type={type} className={`${bg} ${hover} p-2 rounded-md font-bold text-white cursor-pointer`}>
            {children}
        </button>
    )
}

export default ButtonSubmit