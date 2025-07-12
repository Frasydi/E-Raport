import { useState, useRef, useEffect } from "react";

const CardProfil = ({
  data = {},
  titik_tiga = true,
  hover,
  click,
  onEditClick,
  onDeleteClick
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
      className={`w-56 h-80 bg-white rounded-3xl shadow-md hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col items-center justify-between border border-gray-100 relative ${hover}`}
      onClick={click}
    >
      {/* Foto profil */}
      <img
        src={data.foto || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToJ6a52Oy7t7jv32UTZWKkQeyY2OItcmChLA&s"}
        alt={data.peserta_didik.nama_lengkap || "Profil"}
        className="w-24 h-24 object-cover rounded-full border-4 border-white shadow mb-2"
      />

      {/* Titik 3 */}
      {titik_tiga && (
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
              className="w-5 h-5 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <circle cx="3" cy="10" r="1.2" />
              <circle cx="10" cy="10" r="1.2" />
              <circle cx="17" cy="10" r="1.2" />
            </svg>
          </button>

          {open && (
            <div className="mt-2 w-36 bg-white rounded-xl shadow-lg border border-gray-100 py-1 text-sm text-gray-700 font-normal absolute right-0 transition-all duration-200">
              <button
                onClick={onEditClick}
                className="block w-full text-left px-4 py-2 hover:bg-gray-50"
              >
                ✏️ Edit
              </button>
              <button
                onClick={onDeleteClick}
                className="block w-full text-left px-4 py-2 hover:bg-gray-50"
              >
                👁️ Lihat Profil
              </button>
            </div>
          )}
        </div>
      )}

      {/* Info */}
      <div className="text-center ">
        <h3 className="text-gray-800 font-semibold text-base">
          {data.peserta_didik.nama_lengkap || "Nama Siswa"}
        </h3>
        <p className="text-gray-500 text-xs mt-1">{data.peserta_didik.nis || "NIS belum diisi"}</p>
      </div>

      <div className="w-full mt-3">
        <div className="flex text-xs text-gray-600 font-medium gap-2 bg-gray-50 rounded-xl px-3 py-2 shadow-inner">
          <p className="w-1/2 py-1 rounded-full bg-white border border-gray-200 text-center">
            {data.tahun_ajaran.tahun_ajaran || "-"}
          </p>
          <p className="w-1/2 py-1 rounded-full  bg-white border border-gray-200 text-center">
            {data.guru.nama_kelas.replace(/([a-z])([A-Z])/g, "$1 $2") || "-"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardProfil;
