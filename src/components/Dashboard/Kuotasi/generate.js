import { useParams } from "react-router-dom";
import { useEffect,  useState } from "react";
import useInterceptorRefreshToken from "../../hooks/useInterceptorRefreshToken";
import { Document, Page, View, Text, StyleSheet, PDFViewer} from '@react-pdf/renderer';
import { currencyToWord } from "../../function/currencyToWord";
import axios from "axios";
import getMonth from "date-fns/getMonth";
import { getNameMonth } from "../../function/getNameMonth";
import { getDate, getYear } from "date-fns";
import { getRomawiMonth } from "../../function/getRomawiMonth";
import Header from "../Main/header";
import { Sidebar } from "../Main/sidebar";
import {Table, TR, TH, TD} from '@ag-media/react-pdf-table';

const Styles = StyleSheet.create({
    page: {
        width: 21 * 28.35,
        height: 29.7 * 28.35,
        padding: "3cm"
    }, 
    section: {
        marginTop: 28.35
    },
    bank: {
        marginLeft: 37.35
    },
    sectionHeader: {
        marginBottom: 14.35
    },  
    container: {
        flexDirection: "row"
    },
    row: {
        flexDirection: "row",
    },
    textCompanySignatureContainer: {
        flex: 1
    },  
    signatureRow: {
        flexDirection: "row",
        marginTop: 100,
    },
    signatureTextContainer: {
        width: 120, // Adjust the width as needed
    },
    column: {
        marginRight: 20,
        flex: 1,
    },
    textBold: {
        fontFamily: 'Times-Bold',
        fontSize: 12,
    },
    textCompanySignature: {
        fontFamily: 'Times-Bold',
        fontSize: 12, 
        textTransform: 'uppercase'
    },
    textUnderline: {
        fontFamily: 'Times-Bold',
        fontSize: 12,
        textDecoration: "underline",
        textTransform: "uppercase",
    },
    text: {
        fontFamily: 'Times-Roman', // Use 'Times-Roman' directly
        fontSize: 12,
        textAlign: 'justify'
    },
    textPerjanjian: {
        fontFamily: 'Times-Roman',
        fontSize: 12,
        textAlign: 'justify',
        marginBottom: 14.35,
    },
    textAfterListRomawi: {
        fontFamily: 'Times-Roman',
        fontSize: 12,
        textAlign: 'justify',
        marginTop: 14.35
    },
    textAfterNumbering: {
        fontFamily: 'Times-Bold', // Use 'Times-Roman' directly
        fontSize: 12,
        marginLeft: 13.35,
        textAlign: 'justify'
    },
    textAfterNumbering2: {
        fontFamily: 'Times-Bold', // Use 'Times-Roman' directly
        fontSize: 12,
        marginLeft: 5.35,
        textAlign: 'justify'
    },
    textAfterNumbering3: {
        fontFamily: 'Times-Roman', // Use 'Times-Roman' directly
        fontSize: 12,
        marginLeft: 10.35,
        textAlign: 'justify'
    },
    textJabatan: {
        fontFamily: 'Times-Bold', // Use 'Times-Roman' directly
        fontSize: 12,
        marginLeft: 21.35,
    },
    textAfterRomawi: {
        fontFamily: 'Times-Roman',
        fontSize: 12,
        marginTop: 13.35,
        marginLeft: 20.35,
        textAlign: 'justify',
    },
    dataTextAfterRomawi: {
        fontFamily: 'Times-Bold',
        fontSize: 12,
        marginLeft: 28.35
    },
    textAfterJabatan: {
        fontFamily: 'Times-Bold',
        fontSize: 12,
        marginLeft: 17.35
    },
    header: {
        fontFamily: 'Times-Bold',
        fontSize: 12,
        textAlign: "center",
        textDecoration: "underline",
    }, 
    header2: {
        fontFamily: 'Times-BoldItalic',
        fontSize: 12,
        textAlign: "center",
        fontWeight: 700,
        marginBottom: 28.35
    },
    header3: {
        fontFamily: 'Times-BoldItalic',
        fontSize: 8,
        textAlign: "right",
        marginBottom: 28.35
    },
    subheader: {
        fontFamily: 'Times-Bold',
        fontSize: 12,
        textAlign: "center",
    },
    listTypeRomawi: {
        fontFamily: 'Times-Bold', // Use 'Times-Roman' directly
        fontSize: 12,
    },
    listTypeNumber: {
        fontFamily: 'Times-Roman',
        fontSize: 12
    },
    listTypeAlphabet: {
        fontFamily: 'Times-Roman',
        fontSize: 12,
        marginLeft: 18.35
    },
    table: {
        marginTop: 28.35,
        marginBottom: 28.35,
        border: "1px solid"
    },
    textTable: {
        fontFamily: 'Times-Roman',
        fontSize: 12,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 2,
    }
});

function CreateDocument({kuotasi, nomorKuotasi, alamat, jabatan, perusahaan, nomorAlat, nomorSeri, noStok, warna, namaProyek, tanggalAwalSewa, tanggalPerjanjian}) {
    return (
    <Document>
        {kuotasi.map((data, index) => (
        <Page size="A4" key={index} wrap style={Styles.page}>
            <View>
                <Text style={Styles.header3}>{perusahaan}&nbsp;{namaProyek} - PSI - SEWA&nbsp;{data.nama}</Text>
            </View>
            <View>
                <Text style={Styles.header}>PERJANJIAN SEWA MENYEWA MESIN LAS</Text>
                <Text style={Styles.header2}>No. {nomorKuotasi}/{perusahaan}/{namaProyek}/{getRomawiMonth(getMonth(new Date(tanggalAwalSewa)))}/{getYear(new Date(tanggalAwalSewa))}</Text>
            </View>
            <View>
                <Text style={Styles.textPerjanjian}>Pada tanggal <Text style={Styles.textBold}>{tanggalPerjanjian}</Text>, yang bertandatangan di bawah ini:</Text>
                <View style={Styles.container}>
                    <Text style={Styles.listTypeRomawi}>I.</Text><Text style={Styles.textAfterNumbering}>Nama</Text><Text style={Styles.dataTextAfterRomawi}>: {data.namaLengkap}</Text>
                </View>
                <View style={Styles.container}>
                    <Text style={Styles.textJabatan}>Jabatan</Text><Text style={Styles.textAfterJabatan}>: {jabatan}</Text>
                </View>
                <Text style={Styles.textAfterRomawi}>Dalam hal ini sesuai dengan kapasitas dan wewenangnya bertindak untuk dan atas nama
                    &nbsp;<Text>{data.namaPerusahaan}</Text> berkedudukan di&nbsp;{alamat}, yang selanjutnya
                    dalam perjanjian ini disebut sebagai <Text>Pihak Pertama (Penyewa).</Text></Text>
                <View style={[Styles.container, {marginTop: 14.35}]}>
                    <Text style={Styles.listTypeRomawi}>II.</Text><Text style={Styles.textAfterNumbering2}> Nama</Text><Text style={Styles.dataTextAfterRomawi}>: Agus Arintoko</Text>
                </View>
                <View style={Styles.container}>
                    <Text style={Styles.textJabatan}>Jabatan</Text><Text style={Styles.textAfterJabatan}>: General Manager</Text>
                </View>
                <Text style={Styles.textAfterRomawi}>Dalam hal ini sesuai dengan kapasitas dan wewenangnya bertindak untuk dan atas
                    nama <Text>PT. PROCUREMENT SERVICES INTERNATIONAL</Text> berkedudukan di Jl. Raya Hankam No. 85, RT. 008 RW. 05,
                    &nbsp;Kel. Jatimurni, Kec Pondok Melati, Bekasi, Jawa Barat 17431, dalam hal ini bertindak sebagai
                    &nbsp;Pemilik {data.nama} yang selanjutnya disebut sebagai <Text>Pihak Kedua (Pemilik).</Text></Text>
                <Text style={Styles.textAfterListRomawi}>Kedua belah pihak telah sepakat untuk mengadakan perjanjian sewa menyewa {data.nama} dengan ketentuan sebagai berikut:</Text>    
            </View>
            <View style={Styles.section}>
                <View style={Styles.sectionHeader}>
                    <Text style={Styles.subheader}>Pasal 1</Text>
                    <Text style={Styles.subheader}>OBYEK SEWA-MENYEWA</Text>
                </View>
                <Text style={Styles.text}><Text style={Styles.textBold}>Pihak Pertama</Text> dan <Text styles={Styles.textBold}>Pihak Kedua</Text> setuju atas menyewa berupa 1 (satu) unit <Text style={Styles.textBold}>{data.nama}</Text> dengan spesifikasi
                    &nbsp;sebagai berikut:</Text>
                <View>
                    <Table style={Styles.table} weightings={[0.05,0.15,0.15,0.15,0.2,0.2,0.15]}>
                        <TH>
                            <TD style={[Styles.textTable, {width: '10%'}]}>NO</TD>
                            <TD style={Styles.textTable}>JENIS</TD>
                            <TD style={Styles.textTable}>MERK</TD>
                            <TD style={Styles.textTable}>NO.ALAT</TD>
                            <TD style={Styles.textTable}>NO.SERI</TD>
                            <TD style={Styles.textTable}>NO.STOK</TD>
                            <TD style={Styles.textTable}>WARNA</TD>
                        </TH>
                        <TR key={index+1} >
                            <TD style={Styles.textTable}>{index+1}</TD>
                            <TD style={Styles.textTable}>{data.nama}</TD>
                            <TD style={Styles.textTable}>{data.merk}</TD>
                            <TD style={Styles.textTable}>{nomorAlat}</TD>
                            <TD style={Styles.textTable}>{nomorSeri}</TD>
                            <TD style={Styles.textTable}>{noStok}</TD>
                            <TD style={Styles.textTable}>{warna}</TD>
                        </TR>
                    </Table>
                </View>
            </View>
            <View style={Styles.section} break>
                <View>
                    <Text style={Styles.header3}>{perusahaan}&nbsp;{namaProyek} - PSI - SEWA&nbsp;{data.nama}</Text>
                </View>
                <View style={Styles.sectionHeader}>
                    <Text style={Styles.subheader}>Pasal 2</Text>
                    <Text style={Styles.subheader}>MASA SEWA</Text>
                </View>
                <View style={Styles.container}>
                    <Text style={Styles.listTypeNumber}>1.</Text><Text style={Styles.textAfterNumbering3}>Masa sewa adalah minimum 1 (satu bulan) terhitung sejak tanggal <Text style={Styles.textBold}>{tanggalPerjanjian}</Text> dan selanjutnya diperpanjang otomatis sampai dengan {data.nama} dikembalikan oleh Pihak Pertama kepada Pihak Kedua.</Text>
                </View>
                <View style={Styles.container}>
                    <Text style={Styles.listTypeNumber}>2.</Text><Text style={Styles.textAfterNumbering3}>Masa sewa dianggap efektif sejak {data.nama} dikirim sampai {data.nama} dikembalikan kepada Pihak Kedua.</Text>
                </View>
            </View>
            <View style={Styles.section}>
                <View style={Styles.sectionHeader}>    
                    <Text style={Styles.subheader}>Pasal 3</Text>
                    <Text style={Styles.subheader}>HARGA SEWA</Text>
                </View>
                <View style={Styles.container}> 
                    <Text style={Styles.listTypeNumber}>1.</Text><Text style={Styles.textAfterNumbering3}>Harga sewa yang telah disepakati oleh kedua belah pihak adalah sebesar <Text style={Styles.textBold}>Rp {data.hargaTotal.toLocaleString("id-ID")},- ({currencyToWord(data.hargaTotal)}) per unit per bulan.</Text></Text>
                </View>
                <View style={Styles.container}>
                    <Text style={Styles.listTypeNumber}>2.</Text><Text style={Styles.textAfterNumbering3}>Biaya Mobilisasi dan Demobilisasi {data.nama} ditanggung oleh Pihak Pertama.</Text>
                </View>
                <View style={Styles.container}>
                    <Text style={Styles.listTypeNumber}>3.</Text><Text style={Styles.textAfterNumbering3}>Jadwal pembayaran disepakati oleh kedua belah pihak adalah 30 hari setelah dokumen lengkap dan Invoice diterima oleh Pihak Pertama.</Text>
                </View>
                <View style={Styles.container}>
                    <Text style={Styles.listTypeNumber}>4.</Text><Text style={Styles.textAfterNumbering3}>Pajak penghasilan Pasal 23 sebesar 2% ditanggung oleh Pihak Kedua.</Text>
                </View>
                <View style={Styles.container}>
                    <Text style={Styles.listTypeNumber}>5.</Text><Text style={Styles.textAfterNumbering3}>Pembayaran akan ditransfer melalui</Text>
                </View>
                <View style={Styles.bank}>
                    <Text style={Styles.text}>BANK         &nbsp;: VIRTUAL ACCOUNT</Text>
                    <Text style={Styles.text}>A/C BANK  : MIDTRANS PAYMENT GATEWAY</Text>
                    <Text style={Styles.text}>A/C NAMA : PT. PROCUREMENT SERVICES INTERNATIONAL</Text>
                </View>
            </View>
            <View style={Styles.section}>
                <View style={Styles.sectionHeader}>    
                    <Text style={Styles.subheader}>Pasal 4</Text>
                    <Text style={Styles.subheader}>KEWAJIBAN PIHAK PERTAMA</Text>
                </View>
                <Text style={Styles.text}>Selama Masa Sewa, Pihak Pertama wajib melaksanakan hal-hal tersebut di bawah ini :</Text>
                <View style={Styles.container}>
                    <Text style={Styles.listTypeNumber}>1.</Text><Text style={Styles.textAfterNumbering3}>Pihak Pertama menggunakan {data.nama} untuk keperluan di lokasi proyek {data.alamatProyek}.</Text>
                </View>
                <View style={Styles.container}>
                    <Text style={Styles.listTypeNumber}>2.</Text><Text style={Styles.textAfterNumbering3}>Pihak Pertama wajib membayar Harga Sewa sesuai Pasal 3 perjanjian ini.</Text>
                </View>
                <View style={Styles.container}>
                    <Text style={Styles.listTypeNumber}>3.</Text><Text style={Styles.textAfterNumbering3}>Pihak Pertama wajib memberitahukan kepada Pihak Kedua bila terjadi hal-hal sebagai berikut:</Text>
                </View>
                <View style={Styles.container}>
                    <Text style={Styles.listTypeAlphabet}>a.</Text><Text style={Styles.textAfterNumbering3}>Bila Pihak Pertama hendak memindahkan {data.nama} ke lokasi lain.</Text>
                </View>
                <View style={Styles.container}>
                    <Text style={Styles.listTypeAlphabet}>b.</Text><Text style={Styles.textAfterNumbering3}>Bila terjadi kehilangan, pencurian, penipuan, atau klaim dari pihak ketiga berkenaan dengan {data.nama}</Text>
                </View>
                <View style={Styles.container}>
                    <Text style={Styles.listTypeAlphabet}>c.</Text><Text style={Styles.textAfterNumbering3}>Bila ada suatu perubahan dalam tujuan utama penggunaan {data.nama}</Text>
                </View>
                <View style={Styles.container}>
                    <Text style={Styles.listTypeNumber}>4.</Text><Text style={Styles.textAfterNumbering3}>Pihak Pertama tidak akan mengalihkan atau menyewakan {data.nama} kepada pihak ketiga atau memberikan hak dalam hal ini menjadikan <Text style={Styles.textBold}>{data.nama}</Text> sebagai agunan kepada pihak lain.</Text>
                </View>
                <View break>
                    <Text style={Styles.header3}>{perusahaan}&nbsp;{namaProyek} - PSI - SEWA&nbsp;{data.nama}</Text>
                </View>
                <View style={Styles.container}>
                    <Text style={Styles.listTypeNumber}>5.</Text><Text style={Styles.textAfterNumbering3}>Pihak Pertama tidak akan melakukan perubahan apapun terhadap bentuk semula dari {data.nama}, menambah atau meniadakan perlengkapan sesuai yang dinyatakan pada Berita Acara Serah Terima.</Text>
                </View>
            </View>
            <View style={Styles.section}>
                <View style={Styles.sectionHeader}>   
                    <Text style={Styles.subheader}>Pasal 5</Text>
                    <Text style={Styles.subheader}>TANGGUNG JAWAB DAN KEWAJIBAN PIHAK KEDUA</Text>
                </View>
                <Text style={Styles.text}>Selama masa sewa, Pihak Kedua wajib melaksanakan hal-hal tersebut di bawah ini: </Text>
                <View style={Styles.container}>
                    <Text style={Styles.listTypeNumber}>1.</Text><Text style={Styles.textAfterNumbering3}>Pihak Kedua berkewajiban untuk menyerahkan {data.nama} dalam kondisi baik serta sesuai dengan persyaratan yang ditentukan oleh Pihak Pertama beserta semua alat kelengkapannya.</Text>
                </View>
                <View style={Styles.container}>
                    <Text style={Styles.listTypeNumber}>2.</Text><Text style={Styles.textAfterNumbering3}>Pihak Kedua bertanggung jawab atas pelaksanaan perawatan dan perbaikan {data.nama} untuk memastikan keberlangsungan masa sewa serta menanggung seluruh biaya yang timbul.</Text>
                </View>
                <View style={Styles.container}>
                    <Text style={Styles.listTypeNumber}>3.</Text><Text style={Styles.textAfterNumbering3}>Pihak Kedua bertanggung jawab atas {data.nama} pengganti dalam hal Pihak Kedua memiliki masalah hukum atas {data.nama} yang disewakan.</Text>
                </View>
                <View style={Styles.container}>
                    <Text style={Styles.listTypeNumber}>4.</Text><Text style={Styles.textAfterNumbering3}>Pihak Kedua bertanggung jawab atas {data.nama} pengganti bila {data.nama} yang disewakan tidak bisa beroperasi karena rusak ataupun sebab lain selama 12 (dua belas) jam atau
                            lebih tanpa biaya tambahan. Dalam hal ini, {data.nama} pengganti harus setipe/sekelas dengan {data.nama} yang disewa dan dalam keadaan baik sesuai standar.</Text>
                </View>
            </View>
            <View style={Styles.section}>
                <View style={Styles.sectionHeader}>    
                    <Text style={Styles.subheader}>Pasal 6</Text>
                    <Text style={Styles.subheader}>TANGGUNG JAWAB DAN KEWAJIBAN PIHAK KEDUA</Text>
                </View>
                <Text style={Styles.text}>Pihak Pertama berhak untuk secara sepihak memutuskan Perjanjian sebelum waktunya, apabila Pihak Kedua dianggap gagal memenuhi kewajibannya dalam perjanjian ini dan tidak melakukan perbaikan yang diminta oleh Pihak Pertama dalam waktu (7 hari).</Text>
            </View>
            <View style={Styles.section}>
                <View style={Styles.sectionHeader}>    
                    <Text style={Styles.subheader}>Pasal 7</Text>
                    <Text style={Styles.subheader}>KEADAAN KAHAR</Text>
                </View>
                <View style={Styles.container}>
                    <Text style={Styles.listTypeNumber}>1.</Text><Text style={Styles.textAfterNumbering3}>Kedua belah pihak tidak bertanggung jawab terhadap kerugian yang disebabkan oleh pelanggaran dari perjanjian ini yang diakibatkan oleh "Force Majeur"
                            (keadaan kahar adalah peristiwa yang terjadi diluar kekuasaan manusia, termasuk tetapi tidak terbatas pada bencana alam,
                            huru hara, peperangan, gempa bumi, kebakaran, banjir, ledakan dan bencana alam).</Text>    
                </View>
                <View style={Styles.container}>
                    <Text style={Styles.listTypeNumber}>2.</Text><Text style={Styles.textAfterNumbering3}>Apabila perjanjian ini tidak dapat dilaksanakan sebagai akibat dari timbulnya satu atau lebih Force Majeure, maka pihak 
                            dalam perjanjian ini yang pelaksanaan kewajibannya terhambat karena peristiwa Force Majeure wajib memberitahukan pihak lainnya secara tertulis 
                            dalam jangka waktu 48 (empat puluh delapan) jam sejak terjadinya kejadian dimaksud tentang adannya peristiwa tersebut, dengan membuktikan bahwa hambatan dimaksud adalah akibat dari Force Majeure.</Text>    
                </View>
                <View break>
                    <Text style={Styles.header3}>{perusahaan}&nbsp;{namaProyek} - PSI - SEWA&nbsp;{data.nama}</Text>
                </View>
                <View style={Styles.container}>
                    <Text style={Styles.listTypeNumber}>3.</Text><Text style={Styles.textAfterNumbering3}>Selanjutnya apabila Force Majeure telah selesai, pihak dalam perjanjian ini yang pelaksanaan kewajibannya
                            terhambat tersebut juga wajib memberitahukan pihak lainnya secara tertulis dalam jangka waktu 1 (satu) hari sejak selesainya kejadian
                            Force Majeure dimaksud, dan selanjutnya para pihak melanjutkan kembali pelaksanaan perjanjian ini.</Text>    
                </View>
            </View>
            <View style={Styles.section}>
                <View style={Styles.sectionHeader}>
                    <Text style={Styles.subheader}>Pasal 8</Text>
                    <Text style={Styles.subheader}>PENYELESAIAN PERSELISIHAN</Text>     
                </View>
                <Text style={Styles.text}>Apabila terjadi perselisihan mengenai perjanjian ini antara para pihak, kedua belah pihak bersepakat untuk menyelesaikan perselisihan secara musyawarah untuk mencapai mufakat, apabila perselisihan tersebut tidak dapat diselesaikan secara musyawarah
                dan mufakat maka para pihak sepakat untuk memilih dan menyelesaikan perselisihan di Pengadilan Negeri setempat.</Text>
            </View>
            <View style={Styles.section}>
                <View style={Styles.sectionHeader}>    
                    <Text style={Styles.subheader}>Pasal 9</Text>
                    <Text style={Styles.subheader}>LAIN-LAIN</Text>
                </View>
                <Text style={Styles.text}>Hal-hal yang tidak atau belum diatur dalam perjanjian ini diputuskan oleh para pihak secara musyawarah dan mufakat dan akan dibuatkan dalam addendum atau amandemen
                tersendiri yang ditandatangani oleh para pihak, yang merupaka nsatu kesatuan dan bagian yang tidak terpisahkan dari perjanjian ini.</Text>
            </View>
            <View style={Styles.section}>
                <Text style={Styles.text}>Demikianlah Perjanjian Sewa Menyewa Mesin Las ini dibuat, ditandatangani, oleh para wakil yang sah dan dilaksanakan
                para pihak dan dibuat dalam rangkap 2 (dua), bermeterai cukup dan masing-masing mempunyai kekuatan hukum yang sama. </Text>
            </View>
            <View style={Styles.section}>
                <View style={Styles.row}>
                    <View style={Styles.column}>
                        <Text style={Styles.textBold}>Pihak Pertama</Text>
                        <View style={Styles.textCompanySignatureContainer}>
                            <Text style={Styles.textCompanySignature}>{data.namaPerusahaan.replace(/\([^)]*\)/, '').trim()}</Text>
                        </View>
                        <View style={Styles.signatureRow}>
                            <View style={Styles.signatureTextContainer}>
                                <Text style={Styles.textUnderline}>{data.namaLengkap}</Text>    
                                <Text style={Styles.textBold}>{jabatan}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={Styles.column}>
                        <Text style={Styles.textBold}>Pihak Kedua</Text>
                        <View style={Styles.textCompanySignatureContainer}>
                            <Text style={Styles.textCompanySignature}>PT PROCUREMENT SERVICES INTERNATIONAL</Text>
                        </View>
                        <View style={Styles.signatureRow}>
                            <View style={Styles.signatureTextContainer}>
                                <Text style={Styles.textUnderline}>AGUS ARINTOKO</Text>
                                <Text style={Styles.textBold}>General Manager</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Page>
        ))}
    </Document>
    )
}

export function Generate() {
    const {nomorKuotasi} = useParams();
    const axiosPrivate = useInterceptorRefreshToken();
    const [kuotasi, setKuotasi] = useState([]);
    const [username, setUsername] = useState("");
    const [alamat, setAlamat] = useState("");
    const [jabatan, setJabatan] = useState("");
    const [perusahaan, setPerusahaan] = useState("");
    const [nomorSeri, setNomorSeri] = useState("");
    const [nomorAlat, setNomorAlat] = useState("");
    const [noStok, setNoStok] = useState("");
    const [warna, setWarna] = useState("");
    const [namaProyek, setNamaProyek] = useState("");
    const [tanggalAwalSewa, setTanggalAwalSewa] = useState("");
    const [tanggalPerjanjian, setTanggalPerjanjian] = useState("");

    useEffect(() => {
        axiosPrivate.get(
            "http://localhost:3001/api/kuotasi/search/" + nomorKuotasi
        )
        .then((res) => {
            const extractedText = res.data.data[0].namaProyek.match(/\((.*?)\)/);
            const textInsideBrackets = extractedText ? extractedText[1] : "";
            setKuotasi(res.data.data);
            setUsername(res.data.data[0].username);
            setNomorSeri(res.data.data[0].nomorSeri);
            setNamaProyek(textInsideBrackets);
            setTanggalAwalSewa(res.data.data[0].tanggalAwalSewa);
        })
        .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        axiosPrivate
            .get("http://localhost:3001/api/user/profile/" + username)
            .then((res) => {
                    const extractedText = res.data.data[0].perusahaan.match(/\((.*?)\)/);
                    const textInsideBrackets = extractedText ? extractedText[1] : "";
                    setAlamat(res.data.data[0].alamat);
                    setJabatan(res.data.data[0].jabatan);
                    setPerusahaan(textInsideBrackets);
                })
            .catch((err) => console.log(err))
    }, [username])

    useEffect(() => {
        axios
            .get("http://localhost:3001/api/equipment/search/nomorseri/" + nomorSeri, {
                auth: {
                    username: process.env.REACT_APP_BASIC_AUTH_USERNAME,
                    password: process.env.REACT_APP_BASIC_AUTH_PASSWORD
                }
            })
            .then((res) => (
                setNomorAlat(res.data.data[0].nomorAlat), 
                setNoStok(res.data.data[0].noStok), 
                setWarna(res.data.data[0].warna)
                ))
            .catch((err) => console.log(err))   
    }, [nomorSeri])

    useEffect(() => {
        //Setting Tanggal Perjanjian
        const Bulan = getMonth(new Date(tanggalAwalSewa));
        const Tahun = getYear(new Date(tanggalAwalSewa));
        const Tanggal = getDate(new Date(tanggalAwalSewa));
        let result = '';
        result = Tanggal + ' ' + getNameMonth(Bulan) + ' ' + Tahun;
        setTanggalPerjanjian(result);
    }, [tanggalAwalSewa])

    return (
        <div className="container-fluid g-0">
            <div className="row">
                <div className="col-auto sidebar">
                    <Sidebar/>
                </div>
                <div className="col">
                    <Header/>
                    <div className="container-fluid g-0 p-3">
                        <PDFViewer width="100%" height="1080px">
                            <CreateDocument 
                                kuotasi={kuotasi} 
                                nomorKuotasi={nomorKuotasi} 
                                alamat={alamat} 
                                jabatan={jabatan} 
                                perusahaan={perusahaan} 
                                nomorAlat={nomorAlat} 
                                nomorSeri={nomorSeri} 
                                noStok={noStok} 
                                warna={warna} 
                                namaProyek= {namaProyek} 
                                tanggalAwalSewa={tanggalAwalSewa} 
                                tanggalPerjanjian={tanggalPerjanjian} />
                        </PDFViewer>
                    </div>
                </div>
            </div>
        </div>
    )
}