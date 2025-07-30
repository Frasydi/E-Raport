import {
    Page,
    Text,
    View,
    Document,
    Image,
    StyleSheet,
    Font,
} from "@react-pdf/renderer";

Font.register({
    family: "Noto Sans",
    fonts: [
        {
            src: "/fonts/NotoSans-Regular.ttf",
            fontWeight: "normal",
        },
        {
            src: "/fonts/NotoSans-Bold.ttf",
            fontWeight: "bold",
        },
        {
            src: "/fonts/NotoSans-SemiBold.ttf",
            fontWeight: 600,
        },
    ],
});

Font.register({
    family: "Noto Symbols",
    src: "/fonts/NotoSansSymbols2-Regular.ttf",
});
// Styles
const styles = StyleSheet.create({
    page: {
        paddingTop: 43, // 1.5cm
        paddingBottom: 85, // 3cm
        paddingLeft: 85, // 3cm
        paddingRight: 57, // 2cm
        fontSize: 11,
        fontFamily: "Noto Sans",
        backgroundColor: "#ffffff",
    },
    wrapper: {
        backgroundColor: "#ffffff",
        width: "100%",
        letterSpacing: 0.05 * 16,
    },
    header: {
        flexDirection: "row", // flex
        justifyContent: "space-between", // mirip gap besar
        paddingLeft: 4, // pl-1 (1 = 0.25rem = 4px)
        paddingBottom: 4, // pb-1
        marginBottom: 12, // mb-3 (3 * 4px)
        borderBottomWidth: 2, // border-b-4
        borderBottomColor: "#000",
        borderStyle: "double", // border-double
        textAlign: "center", // text-center
    },
    logo: {
        width: 60, // setara w-22 (kurang lebih 5.5rem → ±60px)
        height: 60,
        objectFit: "contain",
        marginRight: 20, // supaya ada jarak dengan teks
    },
    headerText: {
        flex: 1,
        textAlign: "center",
    },
    yayasan: {
        fontSize: 10,
    },
    sekolah: {
        fontSize: 10,
        fontWeight: "bold",
        marginTop: 4, // mt-1 (4px)
    },
    alamat: {
        fontSize: 9, // text-[11px] mendekati 9pt di PDF
    },
    content: {
        flexDirection: "column",
    },
    titleContainer: {
        fontSize: 10, // text-xs
        alignSelf: "center",
        fontWeight: "semibold",
        letterSpacing: 0.5, // tracking-wide
        alignItems: "center",
        textAlign: "center",
        marginBottom: 10,
    },
    titleText: {
        fontSize: 10,
    },
    infoContainer: {
        fontSize: 9,
        flexDirection: "column",
        gap: 4, // gap-1.5 → ±6px
    },
    infoRow: {
        flexDirection: "row",
        marginBottom: 3,
    },
    label: {
        width: 100,
    },
    tableContainer: {
        fontSize: 8.5, // text-[11px]
        marginTop: 16, // mt-4 (16px)
        width: "100%",
    },
    row: { flexDirection: "row" },
});


const getValuesFromNilai = (nilai) => [
  nilai === "B", // Baik
  nilai === "C", // Cukup
  nilai === "P", // Perlu bimbingan
];
const KategoriRow = ({ index, title }) => (
  <View style={[styles.row, {borderBottom:1, fontWeight:600, borderRight:1, borderLeft:1}]} wrap={false}>
    {/* Kolom Index */}
    <View style={{ width: "7%", justifyContent: "center", alignItems: "center", borderRight: 1 }}>
      <Text>{index}</Text>
    </View>

    {/* Kolom Judul */}
    <View style={{ width: "63%", justifyContent: "center", padding: 2, borderRight: 1 }}>
      <Text>{title}</Text>
    </View>

    {/* Kolom Kosong untuk nilai */}
    <View style={{ width: "30%", flexDirection: "row", alignItems: "center", justifyContent: 'space-between' }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", height: "100%", borderRight: 1 }} />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", height: "100%", borderRight: 1 }} />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} />
    </View>
  </View>
);

const FirstIndikatorRow = ({ no, text, values = [] }) => (
  <View style={[styles.row, { fontWeight: "normal", borderBottom:1, borderRight:1, borderLeft:1}]} wrap={false}>
    {/* Kolom kosong untuk index kategori */}
    <View style={{ width: "7%", justifyContent: "center", alignItems: "center", padding: 2, borderRight: 1 }} />

    {/* Kolom Indikator */}
    <View style={{ width: "63%", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", borderRight: 1 }}>
      <View style={{ height: "100%", justifyContent: "center", alignItems: "center", flex: 1, borderRight: 1 }}>
        <Text>{no}</Text>
      </View>
      <View style={{ height: "100%", flex: 19, justifyContent: "center", marginLeft:2, padding: 3 }}>
        <Text style={{marginRight:5}}>{text}</Text>
      </View>
    </View>

    {/* Kolom nilai ceklist */}
    <View style={{ width: "30%", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
      {values.map((val, index) => (
        <View key={index} style={{ flex: 1, justifyContent: "center", alignItems: "center", height: "100%", borderRight: index < values.length - 1 ? 1 : 0 }}>
          <Text style={{ fontFamily: "Noto Symbols" }}>{val ? "✓" : ""}</Text>
        </View>
      ))}
    </View>
  </View>
);

const SubKategoriRow = ({ no, text}) => (
     <View style={[styles.row, {fontWeight: "normal", borderBottom:1, borderRight:1, borderLeft:1}]} wrap={false}>
        <View style={{ width: "7%",  justifyContent:"center", alignItems:"center", borderRight:1}}>
        </View>
        <View style={{width:"63%", flexDirection:"row",justifyContent:"flex-start", alignItems:"center", borderRight:1}}>
            <View style={{height:"100%", justifyContent:"center", alignItems:"center", flex:1, borderRight:1}}>
                <Text>{no}</Text>
            </View>
            <View style={{height:"100%", flex:19, justifyContent:"center", marginLeft:2, padding:1}}>
                <Text>{text}</Text>
            </View>
        </View>
        <View style={{width: "30%", flexDirection:"row", alignItems:"center", justifyContent:'space-between'}}>
            <View style={{ flex:1,  justifyContent:"center", alignItems:"center", height:"100%",borderRight:1}}>
            </View>
            <View style={{ flex:1,  justifyContent:"center", alignItems:"center", height: "100%", borderRight:1}}>
            </View>
            <View style={{ flex:1,  justifyContent:"center", alignItems:"center", height: 20}}>
            </View>
        </View>
    </View>
);

const SecondIndikator = ({text, values = []}) => (
    <View style={[styles.row, {fontWeight: "normal", borderBottom:1,borderRight:1, borderLeft:1}]} wrap={false}>
        <View style={{ width: "7%",  justifyContent:"center", alignItems:"center", padding:2, borderRight:1}}>
        </View>
        <View style={{width:"63%", flexDirection:"row",justifyContent:"flex-start", alignItems:"center", borderRight:1}}>
            <View style={{height:"100%", justifyContent:"center", alignItems:"center", flex:1, borderRight:1}}>
                <Text></Text>
            </View>
            <View style={{height:"100%", flex:19, flexDirection:"row"}}>
                    <View style={{height:"100%", flex:19, flexDirection:"row"}}>
                <View style={{height:"100%", justifyContent:"center", alignItems:"center", flex:1, borderRight:0.7}}>
                    <Text>-</Text>
                </View>
                <View style={{height:"100%", flex:19, justifyContent:"center", marginLeft:2, padding:3}}>
                    <Text style={{marginRight:5}}>{text}</Text>
                </View>
            </View>
            </View>
        </View>
        <View style={{ width: "30%", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            {values.map((val, index) => (
                <View key={index} style={{ flex: 1, justifyContent: "center", alignItems: "center", height: "100%", borderRight: index < values.length - 1 ? 1 : 0 }}>
                <Text style={{ fontFamily: "Noto Symbols" }}>{val ? "✓" : ""}</Text>
                </View>
            ))}
        </View>
    </View>
)

const RenderAllKategori = ({ data }) => (
  <View>
    {data.map((kategori, kategoriIndex) => {
      const isAgamaMoral =
        kategori.nama_kategori.toUpperCase() === "NILAI NILAI AGAMA DAN MORAL" ||
        kategoriIndex === 0;

      return (
        <View key={kategori.id_kategori}>
          <KategoriRow index={kategoriIndex + 1} title={kategori.nama_kategori} />

          {isAgamaMoral ? (
            // Langsung indikator tanpa SubKategoriRow
            kategori.subKategori[0]?.indikator.map((indikator, indikatorIndex) => (
              <FirstIndikatorRow
                key={indikatorIndex}
                no={indikatorIndex + 1}
                text={indikator.indikator}
                values={getValuesFromNilai(indikator.nilai)}
              />
            ))
          ) : (
            // Default: tampilkan sub kategori + indikator
            kategori.subKategori.map((sub, subIndex) => (
              <View key={subIndex}>
                <SubKategoriRow no={subIndex + 1} text={sub.nama_sub_kategori} />
                {sub.indikator.map((indikator, indikatorIndex) => (
                  <SecondIndikator
                    key={indikatorIndex}
                    text={indikator.indikator}
                    values={getValuesFromNilai(indikator.nilai)}
                  />
                ))}
              </View>
            ))
          )}
        </View>
      );
    })}
  </View>
);


const CetakNilaiPDF = ({kategori, pesertaDidik}) => {
    return (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.wrapper}>
                {/* header */}
                <View style={styles.header}>
                    <Image style={styles.logo} src="/images/logoPaud.png" />
                    <View style={styles.headerText}>
                        <Text style={styles.yayasan}>
                            YAYASAN PENDIDIKAN AL-IKHLAS
                        </Text>
                        <Text style={styles.sekolah}>TK AL-IKHLAS BALLA</Text>
                        <Text style={styles.alamat}>
                            Desa Balla, Kecamatan Bajo ...
                        </Text>
                        <Text style={styles.alamat}>
                            Jln.G latimojong HP. 08123123
                        </Text>
                        <Text style={styles.alamat}>
                            Email: tkAlIkhlasBalla.com
                        </Text>
                    </View>
                </View>

                {/* informasi peserta didik */}
                <View style={styles.content}>
                    {/* Judul */}
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>
                            PERKEMBANGAN ANAK DIDIK
                        </Text>
                        <Text style={styles.titleText}>
                            SEMESTER I (SATU) TAHUN PELAJARAN 2021/2022
                        </Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>NAMA PESERTA DIDIK</Text>
                            <Text>: {pesertaDidik?.nama_lengkap}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>NIS</Text>
                            <Text>: {pesertaDidik?.nis}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>NISN</Text>
                            <Text>: {pesertaDidik?.nisn}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>KELOMPOK</Text>
                            <Text>: {pesertaDidik?.nama_kelas ? pesertaDidik.nama_kelas.replace(/^Kelompok\s*/i, ""): ""}</Text>
                        </View>
                    </View>
                </View>
                {/* end informasi */}

                {/* table penilaian */}
                <View style={styles.tableContainer}>
                        {/* TABLE HEAD */}
                        <View style={{fontWeight:600, borderBottom:1, borderTop:1, borderRight:1, borderLeft:1}} fixed>
                            <View style={[styles.row, { backgroundColor: "#fee2e2"}]}>
                                <View style={{ width: "7%",  justifyContent:"center", alignItems:"center", height: 40, borderRight:1}}>
                                    <Text>NO</Text>
                                </View>
                                <View style={{ width: "63%",  justifyContent:"center", alignItems:"center", height: 40, borderRight:1 }}>
                                    <Text>ASPEK PERKEMBANGAN</Text>
                                </View>
                                <View style={{width: "30%", height:40, alignItems:"center", justifyContent:'space-between'}}>
                                    <View style={{borderBottom:1, width:"100%", flex:1, textAlign:"center", justifyContent:"center"}}>
                                        <Text>HASIL PENILAIAN</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: "row",
                                        width: "100%",
                                        flex: 2,
                                    }}>
                                        <View style={{borderRight: 1, justifyContent: "center", alignItems: "center", flex: 1}}>
                                            <Text>BAIK</Text>
                                        </View>
                                        <View style={{borderRight: 1, justifyContent: "center", alignItems: "center", flex: 1}}>
                                            <Text>CUKUP</Text>
                                        </View>
                                        <View style={{justifyContent: "center", alignItems: "center", flex: 1}}>
                                            <Text style={{ textAlign: "center"}}>PERLU{`\n`}DILATIH</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* table body */}
                        <RenderAllKategori data={kategori} />
                </View>
            </View>
        </Page>
    </Document>
)
};

export default CetakNilaiPDF;
