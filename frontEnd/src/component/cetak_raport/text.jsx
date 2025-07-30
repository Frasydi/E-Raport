const CetakNilai = () => {
    return (
        <div className="w-[21cm] h-[29.7cm] bg-white shadow-md mx-auto pt-[1.5cm] pb-[3cm] pl-[3cm] pr-[2cm] font-noto text-[11pt]">
            <div className="bg-white h-full w-full relative tracking-wide">
                <div className="text-center mb-3 border-b-4 border-double  flex gap-40 pl-1 pb-1">
                    <div>
                        <img
                            src="/images/logoPaud.png"
                            alt="logo paud"
                            className="w-22 h-auto object-contain"
                        />
                    </div>
                    <div>
                        <h1 className="text-xs">
                            YAYASAN PENDIDIKAN AL-IKHLAS
                        </h1>
                        <h2 className="font-bold text-xs mt-1">
                            TK AL-IKHLAS BALLA
                        </h2>
                        <p className="text-[11px]">
                            Desa Balla, Kecamatan Bajo ...
                        </p>
                        <p className="text-[11px]">
                            Jln.G latimojong HP. 08123123
                        </p>
                        <p className="text-[11px]">
                            Email: tkAlIkhlasBalla.com
                        </p>
                    </div>
                </div>
                <div className="flex flex-col ">
                    <div className="text-xs self-center font-semibold tracking-wide flex flex-col items-center">
                        <p>PERKEMBANGAN ANAK DIDIK</p>
                        <p>SEMESTER I (SATU) TAHUN PELAJARAN 2021/2022</p>
                    </div>
                    <div className="mt-3.5 text-[11px] flex flex-col gap-1.5">
                        <div className="flex">
                            <p className="w-35">NAMA PESERTA DIDIK</p>
                            <p>: Dzul Fikri Yunus</p>
                        </div>
                        <div className="flex">
                            <p className="w-35">NIS</p>
                            <p>: 34123123</p>
                        </div>
                        <div className="flex">
                            <p className="w-35">NIS</p>
                            <p>: 45234234</p>
                        </div>
                        <div className="flex">
                            <p className="w-35">KELOMPOK</p>
                            <p>: A</p>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto text-[11px] mt-4">
                    <table className="border-2 min-w-full border-slate-700 table-fixed">
                        <thead>
                            <tr className="bg-red-100">
                                <th rowSpan={2} className="border-2 border-slate-700 w-[6%] px-2 py-1 ">No</th>
                                <th rowSpan={2} colSpan={3} className="border-2 border-slate-700 w-[65%] px-2 py-1">ASPEK PERKEMBANGAN</th>
                                <th colSpan={3} className="border-2 border-slate-700 px-2 py-1">HASIL PENILAIAN</th>
                            </tr>
                            <tr className="bg-red-100">
                                <th className="border-2 border-slate-700 px-2 py-1">BAIK</th>
                                <th className="border-2 border-slate-700 px-2 py-1 ">CUKUP</th>
                                <th className="border-2 border-slate-700 px-2 py-1">PERLU DILATIH</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr className="font-bold">
                                <td className="border-2 border-slate-700 text-center">I</td>
                                <td className="px-2 py-1 border-2 border-slate-700" colSpan={3}>NILAI NILAI AGAMA DAN MORAL</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className="px-2 py-1 border-2 border-slate-700 w-[5%] text-center">1</td>
                                <td className="px-2 py-1 border-2 border-slate-700" colSpan={2}> Mengetahui Agama yang dianutnya </td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className="px-2 py-1 border-2 border-slate-700 w-[5%] text-center">1</td>
                                <td className="px-2 py-1 border-2 border-slate-700" colSpan={2}> Mengetahui Agama yang dianutnya </td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className="px-2 py-1 border-2 border-slate-700 w-[5%] text-center">1</td>
                                <td className="px-2 py-1 border-2 border-slate-700" colSpan={2}> Mengetahui Agama yang dianutnya </td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className="px-2 py-1 border-2 border-slate-700 w-[5%] text-center">1</td>
                                <td className="px-2 py-1 border-2 border-slate-700" colSpan={2}> Mengetahui Agama yang dianutnya </td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className="px-2 py-1 border-2 border-slate-700 w-[5%] text-center">1</td>
                                <td className="px-2 py-1 border-2 border-slate-700" colSpan={2}> Mengetahui Agama yang dianutnya </td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className="border-2 border-slate-700"></td>
                                <td className="px-2 py-1 border-2 border-slate-700 h-[26px]" colSpan={2}></td>
                                <td className="text-center border-2 border-slate-700"></td>
                                <td className="text-center border-2 border-slate-700"></td>
                                <td className="text-center border-2 border-slate-700"></td>
                            </tr>
                            <tr className="font-bold">
                                <td className="border-2 border-slate-700 text-center">II</td>
                                <td className="px-2 py-1 border-2 border-slate-700" colSpan={3}>FISIK MOTORIK</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className="px-2 py-1 border-2 border-slate-700 w-[5%] text-center">1</td>
                                <td className="px-2 py-1 border-2 border-slate-700" colSpan={2}> Motorik Kasar </td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className="border-2 border-slate-700"></td>
                                <td className="px-2 py-1 border-2 border-slate-700">-</td>
                                <td className="px-2 py-1 border-2 border-slate-700">Menirukan gerekan bitanagas asdasd fdasd,asd asdasdweq afsasd, sdas</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className="border-2 border-slate-700"></td>
                                <td className="px-2 py-1 border-2 border-slate-700">-</td>
                                <td className="px-2 py-1 border-2 border-slate-700">Menirukan gerekan bitanagas</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className="border-2 border-slate-700"></td>
                                <td className="px-2 py-1 border-2 border-slate-700">-</td>
                                <td className="px-2 py-1 border-2 border-slate-700">Menirukan gerekan bitanagas</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className="border-2 border-slate-700"></td>
                                <td className="px-2 py-1 border-2 border-slate-700">-</td>
                                <td className="px-2 py-1 border-2 border-slate-700">Menirukan gerekan bitanagas</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className="border-2 border-slate-700"></td>
                                <td className="px-2 py-1 border-2 border-slate-700">-</td>
                                <td className="px-2 py-1 border-2 border-slate-700">Menirukan gerekan bitanagas</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className="border-2 border-slate-700"></td>
                                <td className="px-2 py-1 border-2 border-slate-700">-</td>
                                <td className="px-2 py-1 border-2 border-slate-700">Menirukan gerekan bitanagas</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className="border-2 border-slate-700"></td>
                                <td className="px-2 py-1 border-2 border-slate-700">-</td>
                                <td className="px-2 py-1 border-2 border-slate-700">Menirukan gerekan bitanagas</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className="border-2 border-slate-700"></td>
                                <td className="px-2 py-1 border-2 border-slate-700">-</td>
                                <td className="px-2 py-1 border-2 border-slate-700">Menirukan gerekan bitanagas</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                            </tr>
                                <tr>
                                    <td></td>
                                    <td className="border-2 border-slate-700"></td>
                                    <td className="px-2 py-1 border-2 border-slate-700 h-[26px]"></td>
                                    <td className="px-2 py-1 border-2 border-slate-700"></td>
                                    <td className="text-center border-2 border-slate-700"></td>
                                    <td className="text-center border-2 border-slate-700"></td>
                                    <td className="text-center border-2 border-slate-700"></td>
                                </tr>
                            <tr>
                                <td></td>
                                <td className="px-2 py-1 border-2 border-slate-700 w-[5%] text-center">2</td>
                                <td className="px-2 py-1 border-2 border-slate-700" colSpan={2}> Motorik Halus </td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className="border-2 border-slate-700"></td>
                                <td className="px-2 py-1 border-2 border-slate-700">-</td>
                                <td className="px-2 py-1 border-2 border-slate-700">Menirukan gerekan bitanagas</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className="border-2 border-slate-700"></td>
                                <td className="px-2 py-1 border-2 border-slate-700">-</td>
                                <td className="px-2 py-1 border-2 border-slate-700">Menirukan gerekan bitanagas</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className="border-2 border-slate-700"></td>
                                <td className="px-2 py-1 border-2 border-slate-700">-</td>
                                <td className="px-2 py-1 border-2 border-slate-700">Menirukan gerekan bitanagas</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className="border-2 border-slate-700"></td>
                                <td className="px-2 py-1 border-2 border-slate-700">-</td>
                                <td className="px-2 py-1 border-2 border-slate-700">Menirukan gerekan bitanagas</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                                <td className="text-center border-2 border-slate-700">✓</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CetakNilai;