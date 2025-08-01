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

const toRoman = (num) => {
  const romans = [
    ["M", 1000],
    ["CM", 900],
    ["D", 500],
    ["CD", 400],
    ["C", 100],
    ["XC", 90],
    ["L", 50],
    ["XL", 40],
    ["X", 10],
    ["IX", 9],
    ["V", 5],
    ["IV", 4],
    ["I", 1],
  ];
  let result = "";
  for (const [roman, value] of romans) {
    while (num >= value) {
      result += roman;
      num -= value;
    }
  }
  return result;
};

const getValuesFromNilai = (nilai) => [
  nilai === "B", // Baik
  nilai === "C", // Cukup
  nilai === "P", // Perlu bimbingan
];

const KategoriRow = ({ index, title }) => (
  <View style={[styles.row, {borderBottom:1, fontWeight:600, borderRight:1, borderLeft:1, backgroundColor:"#F5F5F5"}]} wrap={false}>
    {/* Kolom Index */}
    <View style={{ width: "7%", justifyContent: "center", alignItems: "center", borderRight: 1 }}>
      <Text>{toRoman(index)}</Text>
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

function formatTanggal(tanggal) {
  const bulanIndo = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
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




const CetakNilaiPDF = ({kategori, tanggal, pesertaDidik, profilSekolah, kesimpulan, guru}) => {
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
                        <Text style={styles.sekolah}>TK {profilSekolah?.nama_sekolah.toUpperCase()}</Text>
                        <Text style={[styles.alamat]}>
                            Desa {profilSekolah?.desa}, Kecamatan {profilSekolah?.kecamatan}, {profilSekolah?.kode_pos}
                        </Text>
                        <Text style={styles.alamat}>
                            Jl. {profilSekolah?.jalan}, HP. {profilSekolah?.nomor_hp}
                        </Text>
                        <Text style={styles.alamat}>
                            Email: {profilSekolah?.email}
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
                            <Text>: {pesertaDidik?.nama_lengkap.toUpperCase()}</Text>
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

                {/* table persen */}
                <View style={styles.tableContainer}>
                    <View style={[styles.row, {borderBottom:1, borderTop:1,fontWeight:600, backgroundColor:"#F5F5F5", borderRight:1, borderLeft:1}]} break>
                        <View style={{ width: "7%", justifyContent: "center", alignItems: "center", borderRight: 1 }}>
                            <Text>VII</Text>
                        </View>
                        <View style={{ width: "63%", justifyContent: "center", padding: 2}}>
                            <Text>KESIMPULAN PERKEMBANGAN ANAK</Text>
                        </View>
                        <View style={{width:"30%", flexDirection:"row"}}>
                              <View style={{ flex: 1, justifyContent: "center", alignItems: "center", height: "100%", borderRight: 1, borderLeft:1 }} 
                              >      
                                <Text>Jumlah Skor</Text>
                              </View>
                               <View style={{ flex: 1, justifyContent: "center", alignItems: "center", height: "100%" }} 
                              >      
                                <Text style={{textAlign:"center"}}>Persentase Pencapaian</Text>
                              </View>
                        </View>
                    </View>

                    {/* TR2*/}
                    <View style={[styles.row, {borderBottom:1,fontWeight:"normal", borderRight:1, borderLeft:1, fontSize:8.5}]}>
                        <View style={{ width: "7%", justifyContent: "center", alignItems: "center", borderRight: 1 }}>
                            <Text></Text>
                        </View>
                        <View style={{ width: "63%", justifyContent: "center", padding: 2}}>
                            <Text>- Tingkat Pencapaian Perkembangan BAIK</Text>
                        </View>
                        <View style={{width:"30%", flexDirection:"row"}}>
                              <View style={{ flex: 1, width:"100",justifyContent: "center", alignItems: "center", height: "100%", borderRight: 1, borderLeft:1 }} 
                              >      
                                <Text>{kesimpulan?.pencapaian_perkembangan_baik}</Text>
                              </View>
                               <View style={{ flex: 1, justifyContent: "center", alignItems: "center", height: "100%" }} 
                              >      
                                <Text>{(() => {
                                    const [a, b] = (kesimpulan?.pencapaian_perkembangan_baik || "0/0").split("/").map(Number);
                                        return b ? ((a / b) * 100).toFixed(2) + "%" : "0%";
                                    })()}
                                </Text>
                              </View>
                        </View>
                    </View>

                    {/* TR3 */}
                    <View style={[styles.row, {borderBottom:1,fontWeight:"normal", borderRight:1, borderLeft:1, fontSize:8.5}]}>
                        <View style={{ width: "7%", justifyContent: "center", alignItems: "center", borderRight: 1 }}>
                            <Text></Text>
                        </View>
                        <View style={{ width: "63%", justifyContent: "center", padding: 2}}>
                            <Text>- Tingkat Pencapaian Perkembangan CUKUP</Text>
                        </View>
                        <View style={{width:"30%", flexDirection:"row"}}>
                              <View style={{ flex: 1, width:"100",justifyContent: "center", alignItems: "center", height: "100%", borderRight: 1, borderLeft:1 }} 
                              >      
                                <Text>{kesimpulan?.pencapaian_perkembangan_buruk}</Text>
                              </View>
                               <View style={{ flex: 1, justifyContent: "center", alignItems: "center", height: "100%" }} 
                              >      
                                <Text>{(() => {
                                        const [a, b] = (kesimpulan?.pencapaian_perkembangan_buruk || "0/0").split("/").map(Number);
                                        return b ? ((a / b) * 100).toFixed(2) + "%" : "0%";
                                    })()}
                                </Text>
                              </View>
                        </View>
                    </View>

                    {/* TR4 */}
                    <View style={[styles.row, {borderBottom:1,fontWeight:"normal", borderRight:1, borderLeft:1, fontSize:8.5}]}>
                        <View style={{ width: "7%", justifyContent: "center", alignItems: "center", borderRight: 1 }}>
                            <Text></Text>
                        </View>
                        <View style={{ width: "63%", justifyContent: "center", padding: 2}}>
                            <Text>- Tingkat Pencapaian Perkembangan PERLU DILATIH</Text>
                        </View>
                        <View style={{width:"30%", flexDirection:"row"}}>
                              <View style={{ flex: 1, width:"100",justifyContent: "center", alignItems: "center", height: "100%", borderRight: 1, borderLeft:1 }} 
                              >      
                                <Text>{kesimpulan?.pencapaian_perkembangan_perlu_dilatih}</Text>
                              </View>
                               <View style={{ flex: 1, justifyContent: "center", alignItems: "center", height: "100%" }} 
                              >      
                                <Text>{(() => {
                                        const [a, b] = (kesimpulan?.pencapaian_perkembangan_perlu_dilatih || "0/0").split("/").map(Number);
                                        return b ? ((a / b) * 100).toFixed(2) + "%" : "0%";
                                    })()}
                                </Text>
                              </View>
                        </View>
                    </View>
                    
                    {/* TR CATATAN DAN REKOMENDASI PENDIDIK */}
                    <View style={[styles.row, {borderBottom:1,fontWeight:600, borderRight:1, borderLeft:1, backgroundColor:"#F5F5F5"}]}>
                        <View style={{ width: "7%", justifyContent: "center", alignItems: "center", borderRight: 1, paddingVertical:2 }}>
                            <Text>VIII</Text>
                        </View>
                        <View style={{ width: "93%", justifyContent: "center", padding: 2}}>
                            <Text>CATATAN DAN REKOMENDASI PENDIDIK</Text>
                        </View>
                    </View>

                    <View style={[styles.row, {fontWeight:"normal",borderRight:1, borderLeft:1, height:"150px", borderBottom:1}]} >
                        <View style={{ width: "7%", justifyContent: "center", alignItems: "center", borderRight: 1 }}>
                            <Text></Text>
                        </View>
                        <View style={{ width: "93%", paddingHorizontal:5, paddingVertical:1, fontSize:8}}>
                            <Text>{kesimpulan?.saran_dan_masukan || ""}</Text>
                        </View>
                    </View>
                    
                    <View style={{marginTop:30, fontSize:8, width:"95%", alignSelf:"center"}}>
                        <View style={{width:"100%",alignItems:"flex-end"}}>
                            <Text></Text>
                            <Text>{profilSekolah?.desa.toUpperCase()}, {formatTanggal(tanggal)}</Text>
                        </View>
                        <View style={{width:"92%", flexDirection:"row", justifyContent:"space-between", alignSelf:"center", marginTop:17}}>
                            <View style={{height:"65px", justifyContent:"space-between"}}>
                                <Text>Orang tua/wali</Text>
                                <View style={{ borderStyle: "dotted", borderTopWidth: 1, borderColor: "black" }}>
                                    <Text></Text>
                                </View>
                            </View>
                            <View style={{height:"65px", justifyContent:"space-between", alignItems:"center"}}>
                                <Text>Guru {guru?.nama_kelas}</Text>
                                <View>
                                    <Text style={{ fontWeight:"bold"}}>{guru?.nama_guru}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{width:"92%", flexDirection:"row", justifyContent:"center", alignSelf:"center", marginTop:20}}>
                            <View style={{height:"65px", justifyContent:"space-between", alignItems:"center"}}>
                                <View>
                                    <Text>Mengetahui,</Text>
                                    <Text>Kepala Sekolah</Text>
                                </View>
                                <View>
                                    <Text style={{textAlign:"center", fontWeight:"bold"}}>Rahmi, S.Pd.I</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View> 
            </View>
        </Page>
    </Document>
)
};

export default CetakNilaiPDF;
