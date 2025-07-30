// SampulPDF.jsx
import {
    Page,
    Text,
    View,
    Document,
    Image,
    StyleSheet,
    Font,
} from "@react-pdf/renderer";


const styles = StyleSheet.create({
    page: {
        width: "21cm",
        height: "29.7cm",
        paddingTop: "2cm",
        paddingBottom: "3cm",
        paddingLeft: "3cm",
        paddingRight: "2.5cm",
        fontSize: 11,
        fontFamily: "Times-Roman",
        backgroundColor: "#ffffff",
    },
    borderContainer: {
        flex: 1,
        borderWidth: 4,
        borderColor: "#93c5fd", // warna solid
        borderStyle: "solid",
        paddingVertical: 20,
        paddingHorizontal: 25,
    },
    header: {
        alignItems: "center",
        marginBottom: 20,
        gap: 4,
    },
    h1: {
        fontSize: 40,
        fontWeight: "bold",
        letterSpacing: 1,
    },
    h3: {
        fontSize: 18,
        fontWeight: "semibold",
        letterSpacing: 1,
    },
    schoolName: {
        fontSize: 22,
        color: "#2563EB",
        opacity: 0.9,
        letterSpacing: 1,
    },
    infoSection: {
        marginTop: 20,
        marginLeft: 10,
        gap: 4,
    },
    infoRow: {
        flexDirection: "row",
        marginBottom: 2,
    },
    label: {
        width: 80,
    },
    valueRow: {
        flexDirection: "row",
        gap: 2,
    },
    logoContainer: {
        marginTop: 40,
        marginBottom: 40,
        alignItems: "center",
    },
    logo: {
        width: 160,
        height: "auto",
    },
    studentInfo: {
        alignItems: "center",
        gap: 4,
    },
    studentName: {
        fontSize: 14,
        fontWeight: "semibold",
        color: "#2563EB",
        opacity: 0.9,
    },
    footer: {
        marginTop: 70,
        alignItems: "center",
    },
    footerText: {
        fontSize: 18,
        fontWeight: "bold",
        letterSpacing: 1,
    },
});

const PrevSampul = ({namaLengkap, nomorInduk, profilSekolah}) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.borderContainer}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.h1}>LAPORAN</Text>
                    <Text style={styles.h3}>PERKEMBANGAN ANAK DIDIK</Text>
                    <Text style={styles.h3}>TAMAN KANAK-KANAK (TK)</Text>
                    <Text style={styles.schoolName}>AL-IKHLAS BALLA</Text>
                </View>

                {/* School Info */}
                <View style={styles.infoSection}>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>NSS</Text>
                        <View style={styles.valueRow}>
                            <Text>:</Text>
                            <Text>{profilSekolah.NSS}</Text>
                        </View>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>NPSN</Text>
                        <View style={styles.valueRow}>
                            <Text>:</Text>
                            <Text>{profilSekolah.NPSN}</Text>
                        </View>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Alamat</Text>
                        <View style={styles.valueRow}>
                            <Text>:</Text>
                            <Text>Jl {profilSekolah.jalan} desa {profilSekolah.desa} Kec. {profilSekolah.kecamatan} </Text>
                        </View>
                    </View>
                </View>

                {/* Logo */}
                <View style={styles.logoContainer}>
                    <Image src="/images/logoPaud.png" style={styles.logo} />
                </View>

                {/* Student Info */}
                <View style={styles.studentInfo}>
                    <Text>Nama Anak Didik</Text>
                    <Text style={styles.studentName}>
                        {namaLengkap}
                    </Text>
                    <View style={{ flexDirection: "row", gap: 2 }}>
                        <Text>Nomor Induk</Text>
                        <Text>:</Text>
                        <Text>{nomorInduk}</Text>
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        PENDIDIKAN ANAK USIA DINI (PAUD)
                    </Text>
                    <Text style={styles.footerText}>KABUPATEN LUWU</Text>
                </View>
            </View>
        </Page>
    </Document>
);

export default PrevSampul;
