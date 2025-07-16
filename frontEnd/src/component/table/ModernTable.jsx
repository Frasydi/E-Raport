// components/ModernTable.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPen,
    faTrash,
    faSort,
    faSortUp,
    faSortDown,
} from "@fortawesome/free-solid-svg-icons";

const ModernTable = ({
    data,
    columns,
    emptyData,
    onEdit,
    onDelete,
    startIndex,
    onSort,
    sortConfig,
}) => {
    return (
        <div className="overflow-x-auto h-96 bg-white shadow-xl rounded-2xl border border-gray-200">
            {emptyData ? (
                <div className="h-full flex justify-center items-center">
                    <h1 className="text-xl text-gray-500 font-semibold">
                        {emptyData}
                    </h1>
                </div>
            ) : (
                <table className="min-w-full text-sm text-gray-700">
                    <thead className="sticky top-0 bg-sky-800 text-white rounded-t-2xl">
                        <tr>
                            <th className="px-6 py-4 text-left font-semibold tracking-wide">
                                No
                            </th>
                            {columns.map((col) => (
                                <th
                                    key={col.header}
                                    className={`px-6 py-4 text-left font-semibold tracking-wide ${
                                        col.sortable
                                            ? "cursor-pointer select-none"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        col.sortable &&
                                        onSort &&
                                        onSort(col.accessor)
                                    }
                                >
                                    <div className="flex items-center gap-1">
                                        {col.header}
                                        {col.sortable && (
                                            <>
                                                {sortConfig?.key ===
                                                col.accessor ? (
                                                    sortConfig.direction ===
                                                    "asc" ? (
                                                        <FontAwesomeIcon
                                                            icon={faSortUp}
                                                            className="w-3 h-3"
                                                        />
                                                    ) : (
                                                        <FontAwesomeIcon
                                                            icon={faSortDown}
                                                            className="w-3 h-3"
                                                        />
                                                    )
                                                ) : (
                                                    <FontAwesomeIcon
                                                        icon={faSort}
                                                        className="w-3 h-3 opacity-60"
                                                    />
                                                )}
                                            </>
                                        )}
                                    </div>
                                </th>
                            ))}
                            <th className="px-6 py-4 text-center font-semibold tracking-wide">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr
                                key={item.id}
                                className={`border-b border-gray-200 ${
                                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                } hover:bg-blue-50 hover:shadow-sm transition duration-200`}
                            >
                                <td className="px-6 py-4">
                                    {startIndex + index + 1}
                                </td>
                                {columns.map((col) => (
                                    <td
                                        key={col.header}
                                        className="px-6 py-4 font-medium"
                                    >
                                        {item[col.accessor]}
                                    </td>
                                ))}
                                <td className="px-6 py-4">
                                    <div className="flex gap-2 justify-center">
                                        <button
                                            onClick={() => onEdit(item)}
                                            className="inline-flex items-center gap-2 px-4 py-1.5 text-xs rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                                        >
                                            <FontAwesomeIcon icon={faPen} />
                                            <span>Edit</span>
                                        </button>
                                        <button
                                            onClick={() => onDelete(item)}
                                            className="inline-flex items-center gap-2 px-4 py-1.5 text-xs rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                            <span>Hapus</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ModernTable;
