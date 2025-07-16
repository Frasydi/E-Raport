import { useState, useMemo } from "react";

const usePagination = (data = [], itemsPerPage = 10) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = useMemo(() => {
        return Math.ceil(data.length / itemsPerPage);
    }, [data.length, itemsPerPage]);

    const currentData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return data.slice(startIndex, startIndex + itemsPerPage);
    }, [currentPage, data, itemsPerPage]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const resetPagination = () => {
        setCurrentPage(1);
    };

    return {
        currentPage,
        totalPages,
        currentData,
        handlePageChange,
        resetPagination,
        startIndex: (currentPage - 1) * itemsPerPage,
    };
};

export default usePagination;
