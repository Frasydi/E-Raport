import LayoutMenu from "../containers/layout";
import Container from "../containers/container";
import Select from "../component/input/Select";
import Search from "../component/input/Search";
import CardProfil from "../component/card/cardProfil";
//import { useState } from "react";
import { Link, Outlet } from "react-router";

const Penilaian = () => {
    const dataOptions = ["2025/2026", "2024/2027", "2022/2023"];
    //const [ppenModal, setOpenModal] = useState(false);
    return (
        <LayoutMenu>
            <Outlet />
            <div className="w-5/6 mt-5">
                <div className="w-96 flex gap-5 items-center justify-between text-sm pl-5 drop-shadow-xl rounded-2xl bg-[#ffffff] p-5">
                    <label htmlFor="tahun_ajaran">Tahun Ajaran</label>
                    <Select
                        id={"tahun_ajaran"}
                        name={"tahun_ajaran"}
                        options={[...dataOptions]}
                    ></Select>
                </div>
                <Container>
                    <div className="flex text-sm items-center gap-1.5">
                        <Search
                            htmlFor={"cari peserta didik"}
                            placeholder={"cari peserta didik"}
                            label={false}
                        ></Search>
                    </div>
                    <div className="mt-7 flex items-center mb-4 ">
                        <p className="text-sm text-gray-700 ml-1">
                            note: cari peserta didik lalu klik buat menilai
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-[61px] ">
                        <Link
                            to={{
                                pathname: `/menu/penilaian/kategori-penilaian`,
                            }}
                        >
                            <CardProfil
                                titik_tiga={false}
                                hover={"hover:brightness-75"}
                            ></CardProfil>
                        </Link>
                    </div>
                </Container>
            </div>
        </LayoutMenu>
    );
};

export default Penilaian;
