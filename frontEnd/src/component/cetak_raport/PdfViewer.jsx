import { useState, useRef, useEffect } from "react";
import {
    PDFViewer,
    PDFDownloadLink,
    pdf,
    Document,
    Page,
} from "@react-pdf/renderer";

const ModernPDFViewer = ({
    children,
    style = {},
    className = "",
    downloadFileName = "document.pdf",
    showDownload = true,
    showZoom = true,
    showFullscreen = true,
    showPrint = true,
}) => {
    const [scale, setScale] = useState(1.0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [viewerKey, setViewerKey] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const containerRef = useRef(null);
    const iframeRef = useRef(null);

    // Hydration
    useEffect(() => setIsClient(true), []);

    // Fullscreen events
    useEffect(() => {
        const handleFullscreenChange = () =>
            setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () =>
            document.removeEventListener(
                "fullscreenchange",
                handleFullscreenChange
            );
    }, []);

    // Loading overlay
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => setIsLoading(false), 400);
        return () => clearTimeout(timer);
    }, [children]);

    const toggleFullscreen = () => {
        if (!document.fullscreenEnabled) return;
        if (!isFullscreen) {
            containerRef.current
                ?.requestFullscreen?.()
                .catch((err) => console.error("Fullscreen error:", err));
        } else {
            document.exitFullscreen?.();
        }
    };

    const zoomIn = () => setScale((prev) => Math.min(3.0, prev + 0.1));
    const zoomOut = () => setScale((prev) => Math.max(0.5, prev - 0.1));
    const resetZoom = () => setScale(1.0);

    const handlePrint = async () => {
        if (!isClient) return;
        try {
            const blob = await pdf(
                children || (
                    <Document>
                        <Page />
                    </Document>
                )
            ).toBlob();
            const url = URL.createObjectURL(blob);
            const iframe = iframeRef.current;
            iframe.src = url;
            iframe.onload = () => {
                iframe.contentWindow.focus();
                iframe.contentWindow.print();
                setTimeout(() => setViewerKey((prev) => prev + 1), 500);
            };
        } catch (error) {
            console.error("Print error:", error);
        }
    };

    const baseClasses = `relative bg-gray-100 rounded-lg shadow-lg overflow-hidden ${
        isFullscreen ? "fixed inset-0 z-50 bg-white" : ""
    } ${className}`;

    return (
        <div ref={containerRef} className={baseClasses} style={style}>
            {/* Hidden iframe untuk print */}
            <iframe ref={iframeRef} style={{ display: "none" }} />

            {/* Loading overlay */}
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-10">
                    <span className="text-gray-700 font-medium">
                        Loading PDF...
                    </span>
                </div>
            )}

            {/* PDF Viewer */}
            <div className="h-[calc(100%-50px)] overflow-auto flex justify-center p-4 bg-gray-50">
                {isClient && (
                    <PDFViewer
                        key={viewerKey}
                        style={{
                            width: "100%",
                            height: "100%",
                            transform: `scale(${scale})`,
                            transformOrigin: "top center",
                            transition: "transform 0.2s ease",
                        }}
                        showToolbar={false}
                    >
                        {children || (
                            <Document>
                                <Page />
                            </Document>
                        )}
                    </PDFViewer>
                )}
            </div>

            {/* Kontrol bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 flex items-center justify-between">
                {showZoom && (
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={zoomOut}
                            disabled={scale <= 0.5}
                            className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
                            title="Zoom Out"
                        >
                            🔍➖
                        </button>
                        <button
                            onClick={resetZoom}
                            className="text-sm font-medium px-2 py-1 hover:bg-gray-100 rounded-md"
                            title="Reset Zoom"
                        >
                            {Math.round(scale * 100)}%
                        </button>
                        <button
                            onClick={zoomIn}
                            disabled={scale >= 3.0}
                            className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
                            title="Zoom In"
                        >
                            🔍➕
                        </button>
                    </div>
                )}

                <div className="flex items-center space-x-4 ml-auto">
                    {showFullscreen && (
                        <button
                            onClick={toggleFullscreen}
                            className="p-2 rounded-md hover:bg-gray-100"
                            title="Fullscreen"
                        >
                            {isFullscreen ? "✕" : "⛶"}
                        </button>
                    )}
                    {showPrint && (
                        <button
                            onClick={handlePrint}
                            className="p-2 rounded-md hover:bg-gray-100 flex items-center gap-1"
                            title="Print"
                        >
                            🖨 <span className="hidden sm:inline">Print</span>
                        </button>
                    )}
                    {showDownload && isClient && (
                        <PDFDownloadLink
                            document={
                                children || (
                                    <Document>
                                        <Page />
                                    </Document>
                                )
                            }
                            fileName={downloadFileName}
                            className="p-2 rounded-md hover:bg-gray-100 flex items-center gap-1"
                        >
                            ⬇ <span className="hidden sm:inline">Download</span>
                        </PDFDownloadLink>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModernPDFViewer;
