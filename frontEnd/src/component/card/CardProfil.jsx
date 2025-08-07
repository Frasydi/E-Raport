import { useState, useRef, useEffect } from "react";

const getBackgroundColor = (name) => {
    const colors = [
        "bg-indigo-500", // More professional blue
        "bg-emerald-500", // Softer green
        "bg-amber-500", // Warm orange
        "bg-purple-500", // Deep purple
        "bg-cyan-500", // Fresh cyan
        "bg-fuchsia-500", // Vibrant pink
        "bg-sky-500", // Light blue
        "bg-rose-500", // Soft red
        "bg-violet-500", // Light purple
        "bg-teal-500", // Muted teal
    ];
    if (!name) return colors[0];
    const charCode = name.charCodeAt(0);
    const index = charCode % colors.length;
    return colors[index];
};

const CardProfil = ({
    data = {},
    titik_tiga = true,
    hover,
    click,
    onEditClick,
    onDeleteClick,
    onNilaiClick,
    onSaranClick,
    mode = "default",
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
        <div
            className={`group relative w-56 h-80 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-transform duration-300 p-4 flex flex-col items-center justify-between border border-gray-300 transform hover:-translate-y-1 hover:scale-[1.02] ${hover}`}
            onClick={(e) => {
                e.stopPropagation();
                click?.(data);
            }}
        >
            {/* Avatar */}
            {data.foto ? (
                <img
                    src={data.foto}
                    alt={data.peserta_didik.nama_lengkap || "Profil"}
                    className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-md mb-3"
                />
            ) : (
                <div
                    className={`w-24 h-24 rounded-full text-white flex items-center justify-center text-2xl font-bold border-4 border-white shadow-md mb-3 ${getBackgroundColor(
                        data.peserta_didik.nama_lengkap
                    )}`}
                >
                    {(data.peserta_didik.nama_lengkap || "U")
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .substring(0, 2)
                        .toUpperCase()}
                </div>
            )}

            {/* Titik 3 hanya di mode default */}
            {mode === "default" && titik_tiga && (
                <div className="absolute top-4 right-4" ref={menuRef}>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpen(!open);
                        }}
                        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="Open menu"
                    >
                        <svg
                            className="w-5 h-5 text-gray-500 hover:text-gray-700"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <circle cx="3" cy="10" r="1.2" />
                            <circle cx="10" cy="10" r="1.2" />
                            <circle cx="17" cy="10" r="1.2" />
                        </svg>
                    </button>

                    {open && (
                        <div className="mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 text-sm text-gray-700 font-medium absolute right-0 transition-all duration-200 z-50">
                            <button
                                onClick={onEditClick}
                                className=" w-full text-left px-4 py-2 hover:bg-indigo-50 text-indigo-600 flex items-center gap-2"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                    />
                                </svg>
                                Edit
                            </button>
                            <button
                                onClick={onDeleteClick}
                                className="w-full text-left px-4 py-2 hover:bg-indigo-50 text-indigo-600 flex items-center gap-2"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                </svg>
                                Lihat Profil
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Overlay dan Tombol Nilai di mode penilaian */}
            {mode === "penilaian" && (
                <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 pointer-events-none group-hover:pointer-events-auto">
                    <div className="flex flex-col gap-5 w-10/12">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onNilaiClick?.(data);
                            }}
                            className="flex justify-center px-6 py-2.5 rounded-xl bg-white text-indigo-600 font-semibold shadow-md transform scale-95 group-hover:scale-100 transition-all duration-300 ease-out hover:bg-indigo-50 hover:shadow-lg hover:text-indigo-700 active:scale-95 items-center gap-2"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                            </svg>
                            Nilai
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onSaranClick?.(data);
                            }}
                            className="justify-center px-6 py-2.5 rounded-xl bg-white  text-indigo-600 font-semibold shadow-md transform scale-95 group-hover:scale-100 transition-all duration-300 ease-out hover:bg-indigo-50 hover:shadow-lg hover:text-indigo-700 active:scale-95 flex items-center gap-2"
                        >
                            <p className=" flex">Saran & Masukan</p>
                        </button>
                    </div>
                </div>
            )}

            {/* Info */}
            <div className="text-center z-0 w-full">
                <h3 className="text-gray-800 font-semibold text-lg mb-1">
                    {data.peserta_didik.nama_lengkap || "Nama Siswa"}
                </h3>
                <p className="text-gray-500 text-sm">
                    {data.peserta_didik.nis || "NIS belum diisi"}
                </p>
            </div>

            <div className="w-full mt-3 z-0">
                <div className="flex text-xs text-gray-700 font-medium gap-2 bg-gray-100 rounded-lg px-3 py-2">
                    <p className="w-1/2 py-1.5 rounded-lg bg-white border border-gray-200 text-center shadow-sm">
                        {data.tahun_ajaran.tahun_ajaran || "-"}
                    </p>
                    <p className="w-1/2 py-1.5 rounded-lg bg-white border border-gray-200 text-center shadow-sm">
                        {data.guru?.nama_kelas?.replace(
                            /([a-z])([A-Z])/g,
                            "$1 $2"
                        ) || "-"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CardProfil;
