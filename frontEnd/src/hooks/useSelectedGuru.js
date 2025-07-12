import { useShallow } from "zustand/react/shallow";
import { useGuruStore } from "../stores/guruStore";
import { useEffect } from "react";

export const useSelectedGuru = () => {
    const { dataGuru, fetchDataGuru } = useGuruStore(
        useShallow((state) => ({
            dataGuru: state.data,
            fetchDataGuru: state.fetchGuruKelas,
        }))
    );

    useEffect(() => {
        if (!dataGuru || dataGuru.length === 0) {
            fetchDataGuru();
        }
    }, [dataGuru]);

    const guruOptions =
        dataGuru?.map((item) => ({
            label: `${item.nama_guru} (${item.nama_kelas.split(" ")[1]})`,
            value: item.id_guru,
        })) || [];

    return [guruOptions];
};
