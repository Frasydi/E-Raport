import ModalPenilaian from "./ModalPenilaian";
import ProfilPenilaian from "./ProfilPenilaian";
import StepProgress from "../StepProgres";

const subKategori = [
    "asdasdasd",
    "Anak Mampu Menikmati Berbagai Alunan Lagu Dan Suara",
    "234234234",
];

const Nilai = () => {
    return (
        <ModalPenilaian>
            <ProfilPenilaian />
            <div className="w-11/12 h-20 bg-neutral-300 rounded-lg shadow-md mb-3 mt-6 mx-auto flex flex-col items-center justify-center py-2">
                <p className="text-md text-slate-800 font-semibold">Kategori</p>
                <label htmlFor="Seni" className="text-slate-800">
                    Seni
                </label>
            </div>

            <div className="w-11/12 max-w-5xl mx-auto p-6 bg-slate-50 rounded-2xl shadow-md">
                <div className="flex justify-between gap-4 mb-6">
                    <div className="flex-1 p-4 bg-white text-center text-sm font-medium text-slate-800 rounded-lg shadow-sm">
                        Anak mampu menikmati berbagai alunan lagu dan suara
                    </div>
                    <div className="flex-1 p-4 bg-white text-center text-sm font-medium text-slate-800 rounded-lg shadow-sm">
                        Tertarik Dengan Kegiatan Seni
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[...Array(2)].map((_, i) => (
                        <div
                            key={i}
                            className="bg-white p-5 rounded-xl shadow space-y-4 border border-slate-200"
                        >
                            <form action="#" className="space-y-4 text-sm">
                                {subKategori.map((i, idx) => (
                                    <div key={idx} className="flex flex-col">
                                        <label className="mb-1 font-medium text-slate-700">
                                            {i}
                                        </label>
                                        <select
                                            name="anak"
                                            id={`select-${i}-${idx}`}
                                            className="p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                        >
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                            <option value="C">C</option>
                                        </select>
                                    </div>
                                ))}
                                <div className="flex gap-3 pt-2">
                                    <input
                                        type="submit"
                                        value="Simpan"
                                        className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 cursor-pointer"
                                    />
                                    <input
                                        type="reset"
                                        value="Reset"
                                        className="bg-slate-200 text-slate-800 px-4 py-2 rounded-md hover:bg-slate-300 cursor-pointer"
                                    />
                                </div>
                            </form>
                        </div>
                    ))}
                </div>
            </div>

            <StepProgress currentStep={2} />
        </ModalPenilaian>
    );
};

export default Nilai;
