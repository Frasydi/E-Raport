const Container = ({children}) => {
    return (
            <div className={`mt-10 drop-shadow-xl rounded-xl bg-[#ffffff] p-5 text-sm relative`}>
                {children}
            </div>
    );
};

export default Container;
