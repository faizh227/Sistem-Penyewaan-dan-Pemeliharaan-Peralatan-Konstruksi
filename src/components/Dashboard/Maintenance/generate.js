import { useParams } from "react-router-dom";
import Header from "../Main/header";
import { Sidebar } from "../Main/sidebar";
import { useEffect } from "react";
import useInterceptorRefreshToken from "../../hooks/useInterceptorRefreshToken";
import { useState } from "react";
import { Document, PDFViewer, Page, Text, Image, View, StyleSheet} from "@react-pdf/renderer";
import {Table, TR, TH, TD} from '@ag-media/react-pdf-table';
import { formatTanggalIntoWord } from '../../function/formatTanggalIntoWord'
import axios from "axios";

const Styles = StyleSheet.create({
    page: {
        paddingLeft: "0.4in",
        paddingTop: "0.94in",
        paddingBottom: "0.94in",
        paddingRight: "0.24in",
    },
    view: {
        border: "2px solid black"
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
    header1: {
        fontFamily: "Times-Bold",
        fontSize: 18
    },
    header2: {
        fontFamily: "Times-Bold",
        fontSize: 16
    },
    text: {
        fontFamily: 'Times-Roman',
        fontSize: 12,
    },
    borderTop: {
        borderTop: "1px solid black",
        width: 310
    }, 
    tableHeader: {
        fontFamily: "Times-Bold",
        fontSize: 12,
        textTransform: "uppercase"
    },
    checkbox: {
        border: "2px solid black",
        width: 15,
        height: 15,
        marginRight: 5
    },
    inputField: {
        border: "2px solid black",
        height: 20,
        width: 120,
    }
})

function CreateDocument({dataMaintenance, dataKerusakan, totalKerusakan, merk, nama}) {
    return (
        <Document>
            <Page size="A4" style={Styles.page}>
                <View style={Styles.view}>
                    <Table>
                        <TR>
                            <TD weighting={0.12} style={[{height: 63, padding: 5}]}>
                                <Image src="/logopsi.jpg" style={Styles.image}></Image>
                            </TD>
                            <TD weighting={0.58}>
                                <View style={Styles.row2}>
                                    <View style={[{justifyContent: "center", textAlign: "center", alignItems: "center", marginBottom: 5}]}>
                                        <Text style={Styles.header2}>FORMULIR MK3L</Text>
                                    </View>
                                    <View style={[Styles.borderTop, {justifyContent: "center", textAlign: "center", alignItems: "center"}]}>
                                        <Text style={[Styles.header1, {marginTop: 5}]}>PERMOHONAN PEMELIHARAAN</Text>
                                    </View>
                                </View>
                            </TD>
                            <TD weighting={0.3}>
                                <View style={Styles.row2}>
                                    <View style={Styles.row}>
                                        <Text style={Styles.text}>Kode Dok.</Text><Text style={[Styles.text, {marginLeft: 20}]}>:</Text><Text style={Styles.text}>&nbsp;5.08.014</Text>
                                    </View>
                                    <View style={Styles.row}>
                                        <Text style={Styles.text}>Revisi</Text><Text style={[Styles.text, {marginLeft: 42}]}>:</Text><Text style={Styles.text}>&nbsp;0</Text>
                                    </View>
                                    <View style={Styles.row}> 
                                        <Text style={Styles.text}>Tgl.Revisi</Text><Text style={[Styles.text, {marginLeft: 22}]}>:</Text><Text style={Styles.text}></Text>
                                    </View>
                                    <View style={Styles.row}>
                                        <Text style={Styles.text}>Halaman</Text><Text style={[Styles.text, {marginLeft: 29}]}>:</Text><Text style={Styles.text}></Text>
                                    </View>
                                </View>
                            </TD>
                        </TR>
                    </Table>
                    {
                        dataMaintenance.map((data, index) => (
                        <View key={index}>
                            <View style={[Styles.row, {marginTop: "0.15in"}]}>
                                <View style={Styles.column}>
                                    <View style={[Styles.row, {alignItems: "center"}]}><Text style={Styles.text}>NO</Text><Text style={[Styles.text, {marginLeft: 53}]}>:&nbsp;</Text><View style={Styles.inputField}><Text style={[Styles.text, {paddingLeft: 1}]}>{data.no}</Text></View></View>
                                </View>
                                <View style={Styles.column}>
                                    <View style={[Styles.row, {alignItems: "center"}]}><Text style={Styles.text}>TANGGAL</Text><Text style={[Styles.text, {marginLeft: 30}]}>:&nbsp;</Text><View style={Styles.inputField}><Text style={[Styles.text, {paddingLeft: 1}]}>{formatTanggalIntoWord(data.tanggal)}</Text></View></View>
                                </View>
                            </View>
                            <View style={[Styles.row, {marginTop: "0.15in"}]}>
                                <View style={Styles.column}>
                                    <View style={[Styles.row, {alignItems: "center"}]}><Text style={Styles.text}>PEMOHON</Text><Text style={[Styles.text, {marginLeft: 10}]}>:&nbsp;</Text><View style={Styles.inputField}><Text style={[Styles.text, {paddingLeft: 1}]}>{data.pemohon}</Text></View></View>
                                </View>
                                <View style={Styles.column}>
                                    <View style={[Styles.row, {alignItems: "center"}]}><Text style={Styles.text}>BAGIAN</Text><Text style={[Styles.text, {marginLeft: 40}]}>:&nbsp;</Text><View style={Styles.inputField}><Text style={[Styles.text, {paddingLeft: 1}]}>{data.bagian}</Text></View></View>
                                </View>
                            </View>
                            <View style={[Styles.row, {marginTop: "0.15in"}]}>
                                <View style={Styles.column}>
                                    <View style={[Styles.row, {alignItems: "center"}]}><Text style={Styles.text}>ITEM</Text><Text style={[Styles.text, {marginLeft: 40}]}>:</Text><View></View></View>
                                </View>
                                <View style={[Styles.column, {flex: 3}]}>
                                    <View style={[Styles.row]}><View style={Styles.checkbox}></View><Text style={Styles.text}>BANGUNAN&nbsp;</Text><View style={[Styles.inputField, {marginLeft: 20}]}></View></View>
                                    <View style={[Styles.row, {marginTop: 10}]}><View style={Styles.checkbox}></View><Text style={Styles.text}>RUANG/FUNGSI&nbsp;</Text><View style={Styles.inputField}></View></View>
                                    <View style={[Styles.row, {marginTop: 10}]}><View style={Styles.checkbox}></View><Text style={Styles.text}>KENDARAAN&nbsp;</Text><View style={[Styles.inputField, {marginLeft: 13}]}></View></View>
                                </View>
                                <View style={[Styles.column, {flex: 3}]}>
                                    <View style={Styles.row}><View style={Styles.checkbox}><Text style={[{fontSize: 10, paddingLeft: 3}]}>v</Text></View><Text style={Styles.text}>ALAT/MESIN&nbsp;</Text><View style={[Styles.inputField, {marginLeft: 20}]}><Text style={Styles.text}>{nama}</Text></View></View>
                                    <View style={[Styles.row, {marginTop: 10}]}><View style={Styles.checkbox}></View><Text style={Styles.text}>PERLENGKAPAN&nbsp;</Text><View style={Styles.inputField}></View></View>
                                    <View style={[Styles.row, {marginTop: 10}]}><View style={Styles.checkbox}></View><Text style={Styles.text}>LAIN-LAIN&nbsp;</Text><View style={[Styles.inputField, {marginLeft: 30}]}></View></View>
                                </View>
                            </View>
                            <View style={[Styles.row, {marginTop: "0.15in", justifyContent: "center", alignItems: "center"}]}>
                                <Text style={Styles.text}>MERK/TIPE</Text><Text style={[Styles.text, {marginLeft: 10}]}>:&nbsp;</Text><View style={[{borderTop: "2px solid black", borderLeft: "2px solid black", borderBottom: "2px solid black", width: "85%", height: 35}]}><Text style={[Styles.text, {paddingLeft: 1}]}>{merk}</Text></View>
                            </View>
                            <View style={[Styles.row, {marginTop: "0.15in", justifyContent: "center", alignItems: "center"}]}>
                                <Text style={Styles.text}>LAIN-LAIN</Text><Text style={[Styles.text, {marginLeft: 10}]}>:&nbsp;</Text><View style={[{borderTop: "2px solid black", borderLeft: "2px solid black", borderBottom: "2px solid black", width: "85%", height: 35}]}><Text style={[Styles.text, {paddingLeft: 1}]}>{data.lainLain}</Text></View>
                            </View>
                        </View>
                        ))
                    }
                    <Table style={[{marginTop: "0.18in"}]} weightings={[0.05, 0.2, 0.2, 0.15, 0.4]}>
                        <TH>
                            <TD style={[{justifyContent: "center"}]}>
                                <Text style={[Styles.tableHeader]}>No</Text>
                            </TD>
                            <TD style={[{justifyContent: "center", padding: 2.5}]}>
                                <Text style={[Styles.tableHeader]}>kerusakan</Text>
                            </TD>
                            <TD style={[{justifyContent: "center", padding: 2.5}]}>
                                <Text style={[Styles.tableHeader, {textAlign: "center"}]}>usulan pemeliharaan</Text>
                            </TD>
                            <TD style={[{justifyContent: "center", padding: 2.5}]}>
                                <Text style={[Styles.tableHeader, {textAlign: 'center'}]}>perkiraan biaya</Text>
                            </TD>
                            <TD style={[{justifyContent: "center", padding: 2.5}]}>
                                <Text style={[Styles.tableHeader]}>keterangan</Text>
                            </TD>
                        </TH>
                        {
                            dataKerusakan.map((data, index) => (
                                <TR key={index}>
                                    <TD style={[{justifyContent: "center"}]}>
                                        <Text style={Styles.text}>{index+1}</Text>
                                    </TD>
                                    <TD style={[{padding: 2.5}]}>
                                        <Text style={Styles.text}>{data.kerusakan}</Text>
                                    </TD>
                                    <TD style={[{padding: 2.5}]}>
                                        <Text style={Styles.text}>{data.usulan}</Text>
                                    </TD>
                                    <TD style={[{padding: 2.5}]}>
                                        <Text style={Styles.text}>Rp.{data.biaya.toLocaleString("id-ID")}</Text>
                                    </TD>
                                    <TD style={[{padding: 2.5}]}>
                                        <Text style={Styles.text}>{data.keterangan}</Text>
                                    </TD>
                                </TR>
                            ))
                        }
                    </Table>
                    {
                        dataMaintenance.map((data, index) => (
                            <View>
                                <View style={Styles.row}><Text style={[Styles.tableHeader, {borderBottom: "1px solid black", borderLeft: "1px solid black", borderRight: "1px solid black", marginLeft: 200.2, padding: 2.5}]}>TOTAL</Text><Text style={[Styles.text, {borderBottom: "1px solid black", borderRight: "1px solid black", padding: 2.5}]}>Rp. {totalKerusakan.toLocaleString("id-ID")}</Text></View>
                                <View style={[Styles.row, {marginTop: "0.05in", borderTop: "1px solid black"}]}>
                                    <View style={[Styles.column, {flex: 2}]}>
                                        <Text style={Styles.text}>PENILAIAN RESIKO K3L</Text>
                                    </View>
                                    <View style={[Styles.column, {borderLeft: "1px solid black"}]}>
                                        <Text style={Styles.text}>DI PERIKSA OLEH :</Text>
                                        <Text style={[Styles.text, {marginTop: "0.35in", textAlign: "center"}]}>SHE</Text>
                                        <Text style={[Styles.text, {borderTop: "1px solid black"}]}>Tgl. : </Text>
                                    </View>
                                </View>
                                <View style={[Styles.row, {borderTop: "2px solid black"}]}>
                                    <View style={[Styles.column]}>
                                        <Text style={Styles.text}>HASIL TINDAKAN PEMERIKSAAN :</Text>
                                    </View>
                                    <View style={[Styles.column, {borderLeft: "1px solid black"}]}>
                                        <Text style={Styles.text}>Di Periksa Oleh : </Text>
                                        <Text style={[Styles.text, {marginTop: "0.35in", textAlign: "center"}]}>{data.pemohon}</Text>
                                        <Text style={[Styles.text, {borderTop: "1px solid black"}]}>Tgl. : {formatTanggalIntoWord(data.tanggal)}</Text>
                                    </View>
                                    <View style={[Styles.column, {borderLeft: "1px solid black"}]}>
                                        <Text style={[Styles.text, {marginTop: "0.535in", textAlign: "center"}]}>HRD</Text>
                                        <Text style={[Styles.text, {borderTop: "1px solid black"}]}>Tgl. : </Text>
                                    </View>
                                </View>
                                <View style={[Styles.row, {borderTop: "2px solid black"}]}>
                                    <View style={[Styles.column, {marginTop: 5, flex: 2}]}>
                                        <View style={Styles.row}><Text style={Styles.text}>STATUS</Text><Text style={[Styles.text, {marginLeft: 10}]}>:&nbsp;</Text><View style={[{border: "1px solid black", width: 15, height: 15}]}></View><Text style={Styles.text}>&nbsp;PEMELIHARAAN TELAH SELESAI</Text></View>
                                        <View style={[Styles.row, {marginTop: 5}]}><Text style={[Styles.text, {marginLeft: 53, paddingBottom: "0.13in"}]}>:&nbsp;</Text><View style={[{border: "1px solid black", width: 15, height: 15}]}></View><Text style={Styles.text}>&nbsp;PERLU TINDAK LANJUT</Text></View>
                                        <Text style={[Styles.text, {borderTop: "1px solid black", paddingBottom: "0.3in"}]}>CATATAN :</Text>
                                    </View>
                                    <View style={[Styles.column, {borderLeft: "1px solid black"}]}>
                                        <Text style={Styles.text}>Disetujui Oleh</Text> 
                                        <Text style={[Styles.text, {marginTop: 50}]}>Manager Bagian</Text>   
                                        <Text style={Styles.text}>Tgl. : </Text>  
                                    </View>
                                </View>
                            </View>
                        ))
                    }
                </View>
            </Page>
        </Document>
    )
}

export function Generate() {
    const {no} = useParams();
    const axiosPrivate = useInterceptorRefreshToken();
    const [dataMaintenance, setDataMaintenance] = useState([]);
    const [dataKerusakan, setDataKerusakan] = useState([]);
    const [nomorSeri, setNomorSeri] = useState("");
    const [merk, setMerk] = useState("");
    const [nama, setNama] = useState("");
    const [sum, setSum] = useState(0);

    useEffect(() => {
        axiosPrivate
            .get("http://localhost:3001/api/maintenance/detail/" + no)
            .then((res) => (setDataMaintenance(res.data.data), setNomorSeri(res.data.data[0].nomorSeri)))
            .catch((err) => console.log(err))
    }, [no])

    useEffect(() => {
        axiosPrivate
            .get("http://localhost:3001/api/maintenance/kerusakan/" + no)
            .then((res) => (setDataKerusakan(res.data.data)))
            .catch((err) => console.log(err))
    }, [no])

    useEffect(() => {
        axios
            .get("http://localhost:3001/api/equipment/search/nomorseri/" + nomorSeri, {
                auth: {
                    username: process.env.REACT_APP_BASIC_AUTH_USERNAME,
                    password: process.env.REACT_APP_BASIC_AUTH_PASSWORD
                }
            })
            .then((res) => (setMerk(res.data.data[0].merk), setNama(res.data.data[0].nama)))
            .catch((err) => console.log(err))
    }, [nomorSeri])

    useEffect(() => {
        let tempSum = 0;

        dataKerusakan.map((data,i) => (
            tempSum = tempSum + data.biaya,
            setSum(tempSum)
        ))
    }, [dataKerusakan])

    return (
        <div className="container-fluid g-0">
            <div className="row">
                <div className="col-auto sidebar">
                    <Sidebar/>
                </div>
                <div className="col">
                    <Header/>
                    <PDFViewer width="100%" height="1080px">
                        <CreateDocument dataMaintenance={dataMaintenance} dataKerusakan={dataKerusakan} totalKerusakan={sum} merk={merk} nama={nama}></CreateDocument>
                    </PDFViewer>
                </div>
            </div>
        </div>
    )
}