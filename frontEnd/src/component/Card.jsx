const Card = (props)=> {
    const {children, bg} = props
    return (
        <div className={`w-64 h-32 drop-shadow-2xl m-5 ${bg} rounded-2xl flex flex-col justify-center items-center text-white gap-2`}>
            {children}
        </div>
    )
}

export default Card;