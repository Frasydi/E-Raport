// hooks/useSortableData.js
import { useState, useMemo } from "react";

const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = useState(config);

    const sortedItems = useMemo(() => {
        if (!items) return [];

        const sortableItems = [...items];
        if (sortConfig !== null) {
            const { key, direction } = sortConfig;
            sortableItems.sort((a, b) => {
                if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
                if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
                return 0;
            });
        }
        return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key) => {
        let direction = "asc";
        if (sortConfig?.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const getSortDirection = (key) => {
        if (!sortConfig || sortConfig.key !== key) return null;
        return sortConfig.direction;
    };

    return { items: sortedItems, requestSort, getSortDirection };
};

export default useSortableData;
