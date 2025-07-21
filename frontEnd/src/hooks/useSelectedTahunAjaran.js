import { useEffect } from "react";
import { useTahunAjaranStore } from "../stores/tahun-ajaran";
import { useShallow } from "zustand/react/shallow";

export const useSelectedTahunAjaran = () => {
    const { tahun_ajaran, fetchData, loading, error } = useTahunAjaranStore(
        useShallow((state) => ({
            tahun_ajaran: state.tahun_ajaran,
            fetchData: state.fetchData,
            loading: state.loading,
            error: state.error,
        }))
    );
    
    useEffect(() => {
        fetchData();
    }, []);

    const tahunAjaranOptions =
        tahun_ajaran?.map((item) => ({
            label: `${item.tahun_ajaran}`,
            value: item.id_tahun_ajaran,
        })) || [];

    return { tahun_ajaran, fetchData, tahunAjaranOptions, loading, error };
};
