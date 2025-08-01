import {
    Page,
    Text,
    View,
    Image,
    Document,
    StyleSheet,
} from "@react-pdf/renderer";

// Style
const styles = StyleSheet.create({
    page: {
        width: "21cm",
        height: "29.7cm",
        backgroundColor: "#fff",
        paddingTop: 56,
        paddingBottom: 85,
        paddingLeft: 85,
        paddingRight: 71,
        fontSize: 11,
        fontFamily: "Times-Roman",
    },
    borderBox: {
        borderWidth: 4,
        borderColor: "#93c5fd",
        flex: 1,
        padding: 16,
    },
    title: {
        textAlign: "center",
        fontSize: 14,
        fontWeight: "bold",
        textTransform: "uppercase",
        marginBottom: 30,
    },
    gridRow: {
        flexDirection: "row",
        marginBottom: 8,
    },
    cellNumber: {
        width: 20,
    },
    cellLabel: {
        flex: 1,
        paddingRight: 20,
    },
    cellColon: {
        width: 10,
        textAlign: "center",
    },
    cellValue: {
        flex: 2,
    },
    subLabelContainer: {
        flexDirection: "row",
        flex: 1,
        paddingRight: 20,
    },
    subLetter: {
        marginRight: 8,
    },
    photoSignature: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 40,
        gap: 20,
    },
    photo: {
        width: 79,
        height: 108,
        borderWidth: 1,
        borderColor: "#333",
    },
    signatureBlock: {
        textAlign: "left",
    },
    signatureSpace: {
        marginBottom: 40,
    },
    signatureName: {
        fontWeight: "bold",
        textTransform: "uppercase",
    },
});

// Sub Item Component
const SubGridRow = ({ letter, label, value }) => (
    <View style={styles.gridRow}>
        <Text style={styles.cellNumber}></Text>
        <View style={styles.subLabelContainer}>
            <Text style={styles.subLetter}>{letter}</Text>
            <Text>{label}</Text>
        </View>
        <Text style={styles.cellColon}>:</Text>
        <Text style={styles.cellValue}>{value}</Text>
    </View>
);

function capitalizeWords(str) {
    if (!str) return "";
    return str
        .split(" ")
        .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
}

function capitalizeFirstLetter(str = "") {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const tempatLahir = (pesertaDidik = {}) =>
    `${
        pesertaDidik.tempat_lahir
            ? capitalizeFirstLetter(pesertaDidik.tempat_lahir) + ", "
            : ""
    }${
        pesertaDidik.tanggal_lahir
            ? new Date(pesertaDidik.tanggal_lahir)
                  .toISOString()
                  .slice(0, 10)
                  .split("-")
                  .reverse()
                  .join("-")
            : ""
    }`;

function formatTanggal(tanggal) {
    const bulanIndo = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
    ];

    const parts = tanggal.split("-"); // bisa [12, 02, 2004] atau [2004, 02, 12]

    let hari, bulan, tahun;

    // Deteksi format berdasarkan panjang tahun
    if (parts[0].length === 4) {
        // format: YYYY-MM-DD
        tahun = parts[0];
        bulan = parts[1];
        hari = parts[2];
    } else {
        // format: DD-MM-YYYY
        hari = parts[0];
        bulan = parts[1];
        tahun = parts[2];
    }

    const namaBulan = bulanIndo[parseInt(bulan, 10) - 1];
    return `${hari} ${namaBulan} ${tahun}`;
}

const KeteranganDiriPDF = ({ pesertaDidik, tanggal, desa }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.borderBox}>
                <Text style={styles.title}>KETERANGAN DIRI ANAK DIDIK</Text>

                {/* Data Utama */}
                <View style={styles.gridRow}>
                    <Text style={styles.cellNumber}>1.</Text>
                    <Text style={styles.cellLabel}>Nama Anak Didik</Text>
                    <Text style={styles.cellColon}>:</Text>
                </View>
                <SubGridRow
                    letter="a."
                    label="Nama Lengkap"
                    value={capitalizeWords(pesertaDidik?.nama_lengkap) || ""}
                />
                <SubGridRow
                    letter="b."
                    label="Nama Panggilan"
                    value={capitalizeWords(pesertaDidik?.nama_panggilan) || ""}
                />

                <View style={styles.gridRow}>
                    <Text style={styles.cellNumber}>2.</Text>
                    <Text style={styles.cellLabel}>NIS</Text>
                    <Text style={styles.cellColon}>:</Text>
                    <Text style={styles.cellValue}>
                        {pesertaDidik?.nis || ""}
                    </Text>
                </View>

                <View style={styles.gridRow}>
                    <Text style={styles.cellNumber}>3.</Text>
                    <Text style={styles.cellLabel}>NISN</Text>
                    <Text style={styles.cellColon}>:</Text>
                    <Text style={styles.cellValue}>
                        {pesertaDidik?.nisn || ""}
                    </Text>
                </View>

                <View style={styles.gridRow}>
                    <Text style={styles.cellNumber}>4.</Text>
                    <Text style={styles.cellLabel}>Tempat Tanggal Lahir</Text>
                    <Text style={styles.cellColon}>:</Text>
                    <Text style={styles.cellValue}>
                        {tempatLahir(pesertaDidik) || ""}
                    </Text>
                </View>

                <View style={styles.gridRow}>
                    <Text style={styles.cellNumber}>5.</Text>
                    <Text style={styles.cellLabel}>Jenis Kelamin</Text>
                    <Text style={styles.cellColon}>:</Text>
                    <Text style={styles.cellValue}>
                        {pesertaDidik?.jenis_kelamin === "LakiLaki"
                            ? "Laki-Laki"
                            : pesertaDidik?.jenis_kelamin || ""}
                    </Text>
                </View>

                <View style={styles.gridRow}>
                    <Text style={styles.cellNumber}>6.</Text>
                    <Text style={styles.cellLabel}>Agama</Text>
                    <Text style={styles.cellColon}>:</Text>
                    <Text style={styles.cellValue}>
                        {pesertaDidik?.agama || ""}
                    </Text>
                </View>

                <View style={styles.gridRow}>
                    <Text style={styles.cellNumber}>7.</Text>
                    <Text style={styles.cellLabel}>Anak ke-</Text>
                    <Text style={styles.cellColon}>:</Text>
                    <Text style={styles.cellValue}>
                        {pesertaDidik?.anakKe || ""}
                    </Text>
                </View>

                <View style={styles.gridRow}>
                    <Text style={styles.cellNumber}>8.</Text>
                    <Text style={styles.cellLabel}>Nama Orang Tua/Wali</Text>
                    <Text style={styles.cellColon}>:</Text>
                </View>
                <SubGridRow
                    letter="a."
                    label="Ayah"
                    value={capitalizeWords(pesertaDidik?.nama_ayah) || ""}
                />
                <SubGridRow
                    letter="b."
                    label="Ibu"
                    value={capitalizeWords(pesertaDidik?.nama_ibu) || ""}
                />
                <SubGridRow
                    letter="c."
                    label="Nama Wali"
                    value={capitalizeWords(pesertaDidik.nama_wali) || ""}
                />

                <View style={styles.gridRow}>
                    <Text style={styles.cellNumber}>9.</Text>
                    <Text style={styles.cellLabel}>
                        Pekerjaan Orang Tua/Wali
                    </Text>
                    <Text style={styles.cellColon}>:</Text>
                </View>
                <SubGridRow
                    letter="a."
                    label="Ayah"
                    value={capitalizeWords(pesertaDidik?.pekerjaanAyah) || ""}
                />
                <SubGridRow
                    letter="b."
                    label="Ibu"
                    value={capitalizeWords(pesertaDidik?.pekerjaanIbu) || ""}
                />

                <View style={styles.gridRow}>
                    <Text style={styles.cellNumber}>10.</Text>
                    <Text style={styles.cellLabel}>Alamat Orang Tua/Wali</Text>
                    <Text style={styles.cellColon}>:</Text>
                </View>
                <SubGridRow
                    letter="a."
                    label="Jalan"
                    value={capitalizeWords(pesertaDidik?.jalan) || ""}
                />
                <SubGridRow
                    letter="b."
                    label="Desa/Kelurahan"
                    value={
                        capitalizeWords(pesertaDidik?.desa_atau_kelurahan) || ""
                    }
                />
                <SubGridRow
                    letter="c."
                    label="Kecamatan"
                    value={capitalizeWords(pesertaDidik?.kecamatan) || ""}
                />
                <SubGridRow
                    letter="d."
                    label="Kabupaten"
                    value={capitalizeWords(pesertaDidik?.kabupaten) || ""}
                />
                <SubGridRow
                    letter="e."
                    label="Provinsi"
                    value={capitalizeWords(pesertaDidik?.provinsi) || ""}
                />

                {/* Foto & Tanda Tangan */}
                <View style={styles.photoSignature}>
                    <Image src="#" style={styles.photo} />
                    <View style={styles.signatureBlock}>
                        <Text style={{ marginBottom: 15 }}>
                            {capitalizeWords(desa) || ""},{" "}
                            {formatTanggal(tanggal) || ""}
                        </Text>
                        <Text>Kepala Sekolah</Text>
                        <Text>TK Al-Ikhlas Balla</Text>
                        <Text style={styles.signatureSpace}></Text>
                        <Text style={styles.signatureName}>RAHMI, S.Pd.I</Text>
                    </View>
                </View>
            </View>
        </Page>
    </Document>
);

export default KeteranganDiriPDF;
