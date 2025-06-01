const Container = ({children}) => {
    return (
            <div className={`mt-10 drop-shadow-xl rounded-2xl bg-[#ffffff] p-5 text-sm`}>
                {children}
            </div>
    );
};

export default Container;
