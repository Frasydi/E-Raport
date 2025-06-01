import { useState, useRef, useEffect } from "react";

const CardProfil = ({
    titik_tiga = true,
    hover, 
    click
}) => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={`w-52 h-80 bg-gradient-to-br from-white to-gray-100 rounded-3xl shadow-xl p-3 flex flex-col items-center justify-between border border-gray-200 relative z-10 hover:bg-none hover:bg-white ${hover}`} onClick={click}>
            {/* Turunkan image dengan margin top */}
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToJ6a52Oy7t7jv32UTZWKkQeyY2OItcmChLA&s"
                alt="Arif Sucinto"
                className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-md mt-2"
            />

            {/* Titik 3 kecil kanan atas */}
            {titik_tiga && (
                <div className="absolute top-3 right-3" ref={menuRef}>
                    <button
                        onClick={() => setOpen(!open)}
                        className="p-1 rounded-full hover:bg-gray-200 focus:outline-none"
                        aria-label="Open menu"
                    >
                        {/* Titik 3 kecil */}
                        <svg
                            className="w-4 h-4 text-gray-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <circle cx="3" cy="10" r="1.2" />
                            <circle cx="10" cy="10" r="1.2" />
                            <circle cx="17" cy="10" r="1.2" />
                        </svg>
                    </button>

                    {open && (
                        <div className="mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 text-sm text-gray-700 font-medium z-10 absolute right-0">
                            <button
                                onClick={() => alert("Edit clicked")}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => alert("Lihat Profil clicked")}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Lihat Profil
                            </button>
                        </div>
                    )}
                </div>
            )}

            <div className="text-center mt-2">
                <h3 className="text-gray-800 font-bold text-base">
                    ARIF SUCINTO
                </h3>
                <p className="text-gray-500 text-sm mt-1">Siswa Berprestasi</p>
            </div>

            <div className="w-full px-2 mt-2">
                <div className="flex justify-between text-xs text-gray-700 font-medium bg-white rounded-xl px-3 py-2 shadow-inner">
                    <span className="bg-gray-100 rounded-lg px-2 py-1">
                        Laki-laki
                    </span>
                    <span className="bg-gray-100 rounded-lg px-2 py-1">
                        Kelas A
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CardProfil;
