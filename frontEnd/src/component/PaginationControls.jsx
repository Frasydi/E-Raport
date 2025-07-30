// components/PaginationControls.jsx
const PaginationControls = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    const renderPageNumbers = () => {
        if (totalPages <= 1) return null;

        const pageNumbers = [];
        const maxVisible = 5;

        // Always show first page
        pageNumbers.push(
            <button
                key={1}
                onClick={() => onPageChange(1)}
                className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                    1 === currentPage
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
            >
                1
            </button>
        );

        // Show ellipsis if current page is far from start
        if (currentPage > 3) {
            pageNumbers.push(
                <span key="start-ellipsis" className="px-2 py-2 text-gray-400">
                    ...
                </span>
            );
        }

        // Show current page and adjacent pages
        const startPage = Math.max(2, currentPage - 1);
        const endPage = Math.min(totalPages - 1, currentPage + 1);

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                        i === currentPage
                            ? "bg-blue-600 text-white shadow-sm"
                            : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                >
                    {i}
                </button>
            );
        }

        // Show ellipsis if current page is far from end
        if (currentPage < totalPages - 2) {
            pageNumbers.push(
                <span key="end-ellipsis" className="px-2 py-2 text-gray-400">
                    ...
                </span>
            );
        }

        // Always show last page if there's more than 1 page
        if (totalPages > 1) {
            pageNumbers.push(
                <button
                    key={totalPages}
                    onClick={() => onPageChange(totalPages)}
                    className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                        totalPages === currentPage
                            ? "bg-blue-600 text-white shadow-sm"
                            : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                >
                    {totalPages}
                </button>
            );
        }

        return pageNumbers;
    };

    return (
        <div className="flex items-center justify-center space-x-1 mt-5 mb-5">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3.5 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-gray-600 flex items-center gap-1"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
            </button>

            {renderPageNumbers()}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
                className="px-3.5 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-gray-600 flex items-center gap-1"
            >
                Next
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
};

export default PaginationControls;