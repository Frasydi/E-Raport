const Container = ({children, className="mt-10"}) => {
    return (
            <div className={`${className} drop-shadow-xl rounded-xl bg-[#ffffff] p-5 text-sm relative`}>
                {children}
            </div>
    );
};

export default Container;
