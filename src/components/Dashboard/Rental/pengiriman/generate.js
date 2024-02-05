import { Document, Page, View, Text, StyleSheet, PDFViewer, Image } from "@react-pdf/renderer";
import Header from "../../Main/header";
import { Sidebar } from "../../Main/sidebar";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import {Table, TR, TH, TD} from '@ag-media/react-pdf-table';
import { formatTanggalIntoWord } from "../../../function/formatTanggalIntoWord";
import { getRomawiMonth } from "../../../function/getRomawiMonth";
import { getMonth, getYear } from "date-fns";

const Styles = StyleSheet.create({
    page: {
        width: 21 * 28.35,
        height: 29.7 * 28.35,
        padding: "0.20in",
    },
    row: {
        flexDirection: "row"
    },
    row2: {
        flexDirection: "column"
    },
    column: {
        flex: 1
    },
    font: {
        fontFamily: 'Times-Roman',
        fontSize: 12,
    },
    tableHeader: {
        fontFamily: 'Times-Bold',
        fontSize: 10
    },
    header: {
        fontFamily: 'Times-Bold',
        fontSize: 14,
    },
    header2: {
        fontFamily: 'Times-Bold',
        fontSize: 12
    },
    header3: {
        fontFamily: 'Times-Roman',
        fontSize: 9,
    },
    font2: {
        fontFamily: 'Times-Roman',
        fontSize: 10,
    },
    font3: {
        fontFamily: 'Times-Roman',
        fontSize: 7,
        margin: 3
    },
    font5: {
        fontFamily: 'Times-Roman',
        fontSize: 7,
        marginRight: 10
    },
    font4: {
        fontFamily: 'Times-Bold',
        fontSize: 12
    },
    borderTTD: {
        borderTop: "1px solid black",
        width: "100%"
    },
    box: {
        borderTop: "1px solid black",
        borderRight: "1px solid black",
        width: "90%"
    },
    box2: {
        borderLeft: "1px solid black",
        borderBottom: "1px solid black",
        width: "30%",
        paddingLeft: 3
    }, 
    box3: {
        borderLeft: "1px solid black",
        borderBottom: "1px solid black",
        width: "70%",
        paddingLeft: 3
    },
    box4: {
        borderTop: "1px solid black",
        borderBottom: "1px solid black",
        width: "100%",
    },
    box5: {
        borderTop: "1px solid black",
        borderBottom: "1px solid black",
        borderLeft: "1px solid black",
        borderRight: "1px solid black",
        width: 20,
        height: 10
    },
    box6: {
        borderTop: "1px solid black",
    },
    box7: {
        borderTop: "1px solid black",
        borderBottom: "1px solid black",
        borderLeft: "1px solid black",
        borderRight: "1px solid black",
        width: 200
    },
    image: {
    }
})

function CreateSuratPengiriman({formData}) {
    function CreateRow() {
        const rows = [];
        for (let i = 0; i <= 18; i++) {
            rows.push (    
                <TR>
                    <TD weighting={0.1}><Text> </Text></TD>
                    <TD weighting={0.3}><Text> </Text></TD>
                    <TD weighting={0.15}><Text> </Text></TD>
                    <TD weighting={0.10}><Text> </Text></TD>
                    <TD weighting={0.10}><Text> </Text></TD>
                    <TD weighting={0.25}><Text> </Text></TD>
                </TR>
            )
        }

        return rows;
    }
    return (
        <Document>
            <Page size="A4" style={Styles.page}>
                <View style={[{border: "1px solid black"}]}>
                    <Table>
                        <TR> 
                            <TD weighting={0.2} style={[{height: 65}]}>
                                <Image src="/logopsi.jpg" style={Styles.image}></Image>
                            </TD>
                            <TD weighting={0.6} style={[{justifyContent: "center", height: 65}]}>
                                <View style={[Styles.row2]}>
                                    <View style={[{marginBottom: 8, marginLeft: 35}]}>
                                        <Text style={Styles.header2}>PT. PROCUREMENT SERVICES INTERNATIONAL</Text>
                                    </View>
                                    <View style={[Styles.box6, {width: 338}]}>
                                        <Text style={[Styles.header, {marginLeft: 65, marginTop: 8}]}>SURAT PENGIRIMAN BARANG</Text>
                                    </View>
                                </View>
                            </TD>
                            <TD weighting={0.2} style={[{height: 65}]}>
                                <View style={Styles.row2}>
                                    <View style={[{padding: 3}]}>
                                        <Text style={Styles.font2}>Kode Dok. &nbsp;&nbsp;: 5.05.005</Text>   
                                    </View>
                                    <View style={[Styles.box6, {padding: 3, width: 112}]}>
                                        <Text style={Styles.font2}>Revisi No &nbsp;&nbsp;&nbsp;: 0</Text>   
                                    </View>
                                    <View style={[Styles.box6, {padding: 3}]}>
                                        <Text style={Styles.font2}>Tgl. Revisi &nbsp;: </Text>   
                                    </View>
                                    <View style={[Styles.box6, {padding: 3}]}>
                                        <Text style={Styles.font2}>Halaman &nbsp;&nbsp;&nbsp;&nbsp;: ..../....</Text>   
                                    </View>
                                </View>
                            </TD>
                        </TR>
                    </Table>
                    <View style={Styles.row}>
                        <View style={Styles.column}>
                            <View style={[Styles.row2, {padding: 3}]}>
                                <Text style={Styles.font5}>Head Office/Workshop: Jl.Raya Hankam No. 85, RT.008, RW.05 kel. Jatimurni, Kec. Pondok Melati, Bekasi-Jawa Barat 17431</Text>
                                <Text style={Styles.font5}>Branch Office: Jl.Mawar No.24 RT.001/RW.05 Balik alam, Duri, Mandau, Bengkalis-Riau 28884</Text>
                                <Text style={Styles.font5}>Phone:( 021 ) 8452171; 2285 3594 Fax : (021) 2285 3374; E-Mail : Psi@Procurin.com</Text>
                            </View>
                        </View>
                        <View style={[Styles.column, {alignItems: "flex-end"}]}>
                            <View style={Styles.row2}>
                                <View style={[Styles.row, {marginLeft: 115}]}>
                                    <View style={[Styles.box2, {padding: 1}]}>
                                        <Text style={Styles.header3}>NO. SURAT</Text>
                                    </View>
                                    <View style={[Styles.box3, {width: 112}]}>
                                        <Text style={Styles.header3}>..../PSI-JPA/005/{getRomawiMonth(getMonth(new Date(formData.tanggalWithoutFormat)))}/{getYear(new Date(formData.tanggalWithoutFormat))}</Text>
                                    </View>
                                </View>
                                <View style={[Styles.row, {marginLeft: 115}]}>
                                    <View style={[Styles.box2, {padding: 1}]}>
                                        <Text style={Styles.header3}>TANGGAL</Text>
                                    </View>
                                    <View style={[Styles.box3, {width: 112}]}>
                                        <Text style={Styles.header3}>{formData.tanggal}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={[Styles.row, {marginTop: "0.25in"}]}>
                        <View style={Styles.column}>
                            <Text style={[Styles.font4]}>KEPADA YTH:</Text>
                            <View style={[Styles.box, {padding: 3}]}>
                                <Text style={Styles.font4}>{formData.perusahaan? formData.perusahaan.replace(/\([^)]*\)/, '').trim()  : formData.namaLengkap}</Text>
                                <Text style={Styles.font4}>{formData.proyek.replace(/\([^)]*\)/, '').trim() }</Text>
                                <Text style={[Styles.font4, {marginBottom: "0.18in"}]}>{formData.perusahaan? formData.namaLengkap : ''}</Text>
                            </View>
                        </View>
                        <View style={Styles.column}>
                            <View style={Styles.row}>
                                <Text style={Styles.font2}>PENGIRIMAN&nbsp;&nbsp;&nbsp;:&nbsp;</Text><View style={Styles.box5}><Text> </Text></View><Text style={Styles.font2}> SENDIRI </Text><View style={Styles.box5}><Text> </Text></View><Text style={Styles.font2}> EXPEDISI </Text><View style={Styles.box5}><Text> </Text></View><Text style={Styles.font2}> LAINNYA*</Text>
                            </View>
                            <View style={Styles.row}>
                                <Text style={Styles.font2}>PERUSAHAAN&nbsp;</Text><Text style={[Styles.font2,{marginLeft: 1}]}>:&nbsp;</Text><View style={Styles.box7}><Text style={Styles.font2}>PT. PSI</Text></View>
                            </View>
                        </View>
                    </View>
                    <Table>
                        <TH>
                            <TD style={[{justifyContent: "center"}]} weighting={0.1}>
                                <Text style={Styles.tableHeader}>NO</Text>
                            </TD>
                            <TD style={[{justifyContent: "center"}]} weighting={0.3}>
                                <Text style={Styles.tableHeader}>MERK DAN URAIAN/TYPE</Text>
                            </TD>
                            <TD style={[{justifyContent: "center"}]} weighting={0.15}>
                                <Text style={Styles.tableHeader}>NO. Stock</Text>
                            </TD>
                            <TD style={[{justifyContent: "center"}]} weighting={0.10}>
                                <Text style={Styles.tableHeader}>JUMLAH</Text>
                            </TD>
                            <TD style={[{justifyContent: "center"}]} weighting={0.10}>
                                <Text style={Styles.tableHeader}>KONDISI</Text>
                            </TD>
                            <TD style={[{justifyContent: "center"}]} weighting={0.25}>
                                <Text style={Styles.tableHeader}>KETERANGAN</Text>
                            </TD>
                        </TH>
                        <TR>
                            <TD weighting={0.1}></TD>
                            <TD weighting={0.3}></TD>
                            <TD weighting={0.15}></TD>
                            <TD weighting={0.10}></TD>
                            <TD weighting={0.10}></TD>
                            <TD weighting={0.25}>
                                <Text style={[Styles.font, {margin: 2}]}>Beserta:</Text>
                            </TD>
                        </TR>
                        <TR>
                            <TD weighting={0.1} style={[{justifyContent: "center"}]}><Text style={[Styles.font, {margin: 2}]}>1</Text></TD>
                            <TD weighting={0.3} style={[{justifyContent: "flex-start"}]}><Text style={[Styles.font, {margin: 2}]}>{formData.namaAlat}</Text></TD>
                            <TD weighting={0.15} style={[{justifyContent: "center"}]}><Text style={[Styles.font, {margin: 2}]}>{formData.noStock}</Text></TD>
                            <TD weighting={0.10} style={[{justifyContent: "center"}]}><Text style={[Styles.font, {margin: 2}]}>{formData.jumlah} Unit</Text></TD>
                            <TD weighting={0.10} style={[{justifyContent: "center"}]}><Text style={[Styles.font, {margin: 2}]}>{formData.kondisi}</Text></TD>
                            <TD weighting={0.25} style={[{justifyContent: "flex-start"}]}><Text style={[Styles.font, {margin: 2}]}>{formData.keterangan}</Text></TD>
                        </TR>
                        {
                            CreateRow()
                        }
                        <TR>
                            <TD style={Styles.row2} weighting={0.25}>
                                <Text style={[Styles.font, {marginTop: 28.35 * 0.4826}]}>PENGIRIM</Text>
                                <Text style={[Styles.font, Styles.borderTTD, {marginTop: 28.35 * 3.1082, padding: 3}]}>TGL : {formData.tanggal}</Text>
                            </TD>
                            <TD style={Styles.row2} weighting={0.25}>
                                <Text style={[Styles.font, {marginTop: 28.35 * 0.4826}]}>PENERIMA</Text>
                                <Text style={[Styles.font, Styles.borderTTD, {marginTop: 28.35 * 3.1082, padding: 3}]}>TGL :</Text>
                            </TD>
                            <TD style={[Styles.row2, {alignItems: "flex-start"}]} weighting={0.5}>
                                <Text style={[Styles.font, {marginTop: 28.35 * 0.4826, marginLeft: 28.35 * 0.127}]}>Catatan :</Text>
                                <Text style={[Styles.font, {marginLeft: 28.35 * 0.127}]}>Dikirim dengan Menggunakan</Text>
                                <View style={Styles.row}><Text style={[Styles.font, {marginLeft: 28.35 * 0.127}]}>Mobil</Text><Text style={[Styles.font, {marginLeft: 1}]}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </Text><Text style={Styles.font}>{formData.mobil}</Text></View>
                                <View style={Styles.row}><Text style={[Styles.font, {marginLeft: 28.35 * 0.127}]}>No. Polisi</Text><Text style={Styles.font}>&nbsp;: </Text><Text style={Styles.font}>{formData.noPol}</Text></View>
                                <View style={Styles.row}><Text style={[Styles.font, {marginLeft: 28.35 * 0.127}]}>Driver</Text><Text style={[Styles.font, {marginLeft: 2}]}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </Text><Text style={Styles.font}>{formData.driver}</Text></View>
                            </TD>
                        </TR>
                    </Table>
                </View>
            </Page>
        </Document>
    )
}

export function Generate() {
    const location = useLocation();
    const data = location.state;

    const [formData] = useState({
        perusahaan: data.data.perusahaan,
        proyek: data.data.proyek,
        namaLengkap: data.data.namaLengkap,
        tanggal: formatTanggalIntoWord(data.data.tanggal),
        tanggalWithoutFormat: (data.data.tanggal),
        namaAlat: data.data.namaAlat,
        noStock: data.data.noStock,
        jumlah: data.data.jumlah,
        kondisi: data.data.kondisi,
        keterangan: data.data.keterangan,
        mobil: data.data.mobil,
        noPol: data.data.noPol,
        driver: data.data.driver,
    })
    return (
        <div className="container-fluid g-0">
            <div className="row">
                <div className="col-auto sidebar">
                    <Sidebar/>
                </div>
                <div className="col">
                    <Header/>
                    <PDFViewer width="100%" height="1080px">
                        <CreateSuratPengiriman formData={formData}/>
                    </PDFViewer>
                </div>
            </div>
        </div>
    )
}