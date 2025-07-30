import ModernPDFViewer from "./PdfViewer";
import CetakNilaiPDF from "./CetaNilai";

const TestDoang = () => {
    return (
        <ModernPDFViewer style={{ width: "100%", height: "100vh" }}>
            <CetakNilaiPDF />
        </ModernPDFViewer>
    );
};

export default TestDoang;
