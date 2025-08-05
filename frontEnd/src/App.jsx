import "./css/App.css";
import { Routes, Route } from "react-router";
import ProtectedRoute from "./component/protectedRoute";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PesertaDidik from "./pages/PesertaDidik";
import GuruKelas from "./pages/GuruKelas";
import Penilaian from "./pages/Penilaian";
import CetakRaport from "./pages/CetakRaport";
import TahunAjaran from "./pages/TahunAjaran";
import KategoriPenilaian from "./component/penilaian/KategoriPenilaian";
import SubKategoriPenilaian from "./component/penilaian/SubKategoriPenilaian";
import Nilai from "./component/penilaian/Nilai";
import OfflineIndicator from "./component/OfflineIndicator";

import { useClearLocalStorageOnClose } from "./hooks/useClearLocalStorageOnClose";

function App() {
    useClearLocalStorageOnClose(["token"]);
    return (
        <>
            <OfflineIndicator />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />}></Route>
                <Route
                    path="/peserta-didik"
                    element={<PesertaDidik />}
                ></Route>
                <Route
                    path="/tahun-ajaran"
                    element={<TahunAjaran />}
                ></Route>
                <Route path="/guru-kelas" element={<GuruKelas />}></Route>
                <Route path="/penilaian" element={<Penilaian />}>
                    <Route
                        path=":id_rekap_nilai"
                        element={<KategoriPenilaian />}
                    ></Route>
                    <Route
                        path=":id_rekap_nilai/:id_kategori"
                        element={<SubKategoriPenilaian />}
                    ></Route>
                    <Route
                        path=":id_rekap_nilai/:id_kategori/:id_sub_kategori"
                        element={<Nilai />}
                    ></Route>
                </Route>
                <Route
                    path="/cetak-raport"
                    element={<CetakRaport />}
                ></Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
