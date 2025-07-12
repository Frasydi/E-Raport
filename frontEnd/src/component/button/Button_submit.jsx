const ButtonSubmit = ({ type = 'button', bg, hover, children, disabled = false, onClick }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`${bg} ${hover} p-2 rounded-md font-bold text-white cursor-pointer`}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default ButtonSubmit;
