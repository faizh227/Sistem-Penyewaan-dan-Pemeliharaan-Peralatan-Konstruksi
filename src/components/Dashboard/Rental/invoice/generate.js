import { useParams } from "react-router-dom";
import { useEffect,  useState } from "react";
import { Document, Page, View, Text, StyleSheet, PDFViewer} from '@react-pdf/renderer';
import useInterceptorRefreshToken from "../../../hooks/useInterceptorRefreshToken";
import { Sidebar } from "../../Main/sidebar";
import Header from "../../Main/header";
import getMonth from "date-fns/getMonth";
import { getNameMonth } from "../../../function/getNameMonth";
import { differenceInDays, getDate, getYear } from "date-fns";
import { getRomawiMonth } from "../../../function/getRomawiMonth";
import {Table, TR, TH, TD} from '@ag-media/react-pdf-table';
import axios from "axios";

const Styles = StyleSheet.create({
    page: {
        width: 21 * 28.35,
        height: 29.7 * 28.35,
        paddingLeft: "0.50in",
        paddingRight: "0.10in",
        paddingTop: "1.47in",
        paddingBottom: "1in"
    },
    row: {
        flexDirection: "row",
    },
    row2: {
        flexDirection: "column"
    },
    column: {
        flex: 1,
    },
    column2: {
        flex: 1
    },
    box1: {
        borderTop: "1px solid black",
        borderLeft: "1px solid black",
        width: "1.8in",
        paddingTop: "0.13in"
    },  
    box2: {
        width: "0.7in"
    },
    box3: {
        borderTop: "1px solid black",
        borderRight: "1px solid black",
        width: "1.2in"
    },
    box4: {
        width: "1.8in"
    },
    box5: {
        width: "0.7in"
    },
    box6: {
        width: "1.2in"
    },
    box7: {
        borderLeft: "1px solid black",
        borderBottom: "1px solid black",
        width: "1.8in",
        paddingTop: "0.31in",
    },
    box8: {
        width: "0.7in"
    }, 
    box9: {
        borderBottom: "1px solid black",
        borderRight: "1px solid black",
        width: "1.2in"
    },
    header1: {
        fontFamily: 'Times-Bold',
        fontSize: 14,
    },
    header2: {
        fontFamily: 'Times-Bold',
        fontSize: 13,
    },
    header3: {
        fontFamily: 'Times-Bold',
        fontSize: 12,
    },
    textForm: {
        fontFamily: 'Times-Roman',
        fontSize: 10,
    },
    tableHeader: {
        fontFamily: 'Times-Bold',
        textDecoration: 'underline',
        fontSize: 12,
        padding: 1,
    },
    tableHeader2: {
        fontFamily: 'Times-Bold',
        fontSize: 12,
    },
    text: {
        fontFamily: 'Times-Roman',
        fontSize: 12
    },
    signatureCompany: {
        fontFamily: 'Times-Bold',
        fontSize: 11
    },
    signatureName: {
        fontFamily: 'Times-Bold',
        textDecoration: 'underline',
        fontSize: 12,
    },
    signatureJob: {
        fontFamily: 'Times-Roman',
        fontSize: 11
    }
})

function CreateInvoice({penyewaan, invoiceDate, tanggalAwalSewa, hargaVAT, valueAddTax, namaLengkap, namaPerusahaan, namaSingkatPerusahaan, alamat, namaAlat, nomorAlat, merk, nomorKuotasi, tanggalKuotasi}) {
    return (
        <Document>
            {penyewaan.map((data, index) => (
                <Page size="A4" wrap style={Styles.page}>
                    <View>
                        <View style={Styles.row}>
                            <View style={Styles.column}> 
                                <View style={Styles.row}>
                                    <View style={[Styles.column, Styles.box1]}>
                                    </View>
                                    <View style={[Styles.column, Styles.box2]}>
                                    </View>
                                    <View style={[Styles.column, Styles.box3]}>
                                    </View>
                                </View>
                                <View style={Styles.row}>
                                    <View style={Styles.column}>
                                        <View style={[Styles.box4]}>
                                            <Text style={Styles.text}>
                                            To :
                                            </Text>
                                            <Text style={[Styles.text, {marginTop: "0.15in"}]}>
                                            {
                                            namaPerusahaan ? namaPerusahaan.replace(/\([^)]*\)/, '').trim() : namaLengkap
                                            }
                                            </Text>
                                            <Text style={[Styles.text, {marginTop: "0.2in"}]}>
                                                {alamat}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={[Styles.column, Styles.box5]}>
                                    </View>
                                    <View style={[Styles.column, Styles.box6]}>
                                    </View>
                                </View>
                                <View style={Styles.row}>
                                    <View style={[Styles.column, Styles.box7]}>    
                                    </View>
                                    <View style={[Styles.column, Styles.box8]}>
                                    </View>
                                    <View style={[Styles.column, Styles.box9]}>
                                    </View>
                                </View>
                            </View>
                            <View style={[Styles.column, {marginLeft: "0.25in"}]}>
                                <View style={Styles.row}>
                                    <View style={Styles.column}>
                                        <View style={[Styles.row2]}>
                                            <Text style={Styles.tableHeader}>INVOICE NUMBER</Text> 
                                            <Text style={Styles.text}>No Tagihan</Text>
                                        </View>
                                        <View style={[Styles.row2, {marginTop: "0.15in"}]}>
                                            <Text style={Styles.tableHeader}>INVOICE DATE</Text>   
                                            <Text style={Styles.text}>Tanggal Tagihan</Text>
                                        </View>
                                        <View style={[Styles.row2, {marginTop: "0.15in"}]}>
                                            <Text style={Styles.tableHeader}>PURCHASE ORDER NUMBER</Text>
                                            <Text style={Styles.text}>No. Pesananan Pembelian</Text>
                                        </View>
                                        <View style={[Styles.row2, {marginTop: "0.15in"}]}>
                                            <Text style={Styles.tableHeader}>TERM OF LEASE</Text>
                                            <Text style={Styles.text}>Jangka Waktu Sewa</Text>
                                        </View>
                                    </View>
                                    <View style={[Styles.column]}>
                                        <View style={[Styles.row, {alignItems: "center"}]}>
                                            <View style={[Styles.column]}>
                                                <Text style={[Styles.text, {marginTop: 9}]}>:&nbsp;&nbsp;{getYear(new Date(data.tanggalBerakhirSewa))%100}.{data.noPenyewaan}-1203-PSI-{getRomawiMonth(getMonth(new Date(data.tanggalBerakhirSewa)))}-C</Text>
                                            </View>
                                        </View>
                                        <View style={[Styles.row, {alignItems: "center"}]}>
                                            <View style={Styles.column}>
                                                <Text style={[Styles.text, {marginTop: 26}]}>:&nbsp;&nbsp;{invoiceDate}</Text>               
                                            </View>
                                        </View>
                                        <View style={[Styles.row, {alignItems: "center"}]}>
                                            <View style={Styles.column}>
                                                <Text style={[Styles.text, {marginTop: 36}]}>:&nbsp;&nbsp;{nomorKuotasi}/{namaSingkatPerusahaan}-PO/{getRomawiMonth(getMonth(new Date(tanggalKuotasi)))}/{getYear(new Date(tanggalKuotasi))}</Text> 
                                            </View>
                                        </View>
                                        <View style={[Styles.row, {alignItems: "center"}]}>
                                            <View style={Styles.column}>
                                                <Text style={[Styles.text, {marginTop: 33}]}>:&nbsp;&nbsp;{differenceInDays(new Date(data.tanggalBerakhirSewa), new Date(data.tanggalAwalSewa))} Days</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Table style={[{marginTop: "0.15in"}]}>
                            <TH>
                                <TD style={[Styles.row2, {justifyContent: "center", textAlign: "center"}]} weighting={0.1}>
                                    <Text style={Styles.tableHeader}>ITEM</Text>
                                    <Text style={Styles.tableHeader2}>NO.</Text>
                                </TD>
                                <TD style={[Styles.row2, {justifyContent: "center", textAlign: "center"}]} weighting={0.1}>
                                    <Text style={Styles.tableHeader}>QTY</Text>
                                    <Text style={Styles.tableHeader2}>BANYAK</Text>
                                </TD>
                                <TD style={[Styles.row2, {justifyContent: "center", textAlign: "center"}]} weighting={0.55}>
                                    <Text style={Styles.tableHeader}>DESCRIPTION</Text>
                                    <Text style={Styles.tableHeader2}>URAIAN</Text>
                                </TD>
                                <TD style={[Styles.row2, {justifyContent: "center", textAlign: "center"}]} weighting={0.2}>
                                    <Text style={Styles.tableHeader}>UNIT PRICE</Text>
                                    <Text style={Styles.tableHeader2}>HARGA SATUAN</Text>
                                </TD>
                                <TD style={[Styles.row2, {justifyContent: "center", textAlign: "center"}]} weighting={0.2}>
                                    <Text style={Styles.tableHeader}>TOTAL</Text>
                                    <Text style={Styles.tableHeader2}>JUMLAH</Text>
                                </TD>
                            </TH>
                            <TR>
                                <TD style={[{justifyContent: "center"}]} weighting={0.1}>
                                    <Text style={Styles.text}>{index+1}</Text>
                                </TD>
                                <TD weighting={0.1}>
                                    <View style={Styles.row}><Text style={[Styles.text, {marginLeft: 3}]}>{data.jumlah}</Text><Text style={[Styles.text, {marginLeft: 12}]}>Unit</Text></View>
                                </TD>
                                <TD weighting={0.55} style={[Styles.row2, {alignItems: "flex-start"}]}>
                                    <Text style={[Styles.text, {marginTop: "0.35in", marginLeft: 3}]}>Rental {namaAlat} {merk} - {nomorAlat}</Text>
                                    <Text style={[Styles.text, {marginLeft: 3}]}>Periode : {tanggalAwalSewa} - {invoiceDate}</Text>
                                    <Text style={[Styles.header3, {marginLeft: 3, marginBottom: "0.35in", textDecoration: "underline"}]}>Pemotongan :</Text>
                                </TD>
                                <TD weighting={0.2}>
                                    <Text style={[Styles.text, {marginLeft: 3}]}>Rp</Text><Text style={[Styles.text]}>  {data.hargaPerUnit.toLocaleString("id-ID")}</Text>
                                </TD>
                                <TD weighting={0.2}>
                                    <View style={Styles.row}>
                                        <Text style={[Styles.text, {marginLeft: 3}]}>Rp</Text><Text style={[Styles.text]}>  {data.hargaTotal.toLocaleString("id-ID")}</Text>
                                    </View>
                                </TD>
                            </TR>
                            <TR>
                                <TD weighting={0.754} style={[{justifyContent: "center", textDecoration: "underline"}]}><Text style={Styles.header3}>Please transfer to our account :</Text></TD>
                                <TD weighting={0.2} style={[{justifyContent: "center"}]}><Text style={[Styles.header3, {padding: 6}]}>SUB TOTAL</Text></TD>
                                <TD weighting={0.2}><View style={Styles.row}><Text style={[Styles.header3, {marginLeft: 3}]}>Rp</Text><Text style={[Styles.header3, {justifyContent: "flex-end"}]}> {data.hargaTotal.toLocaleString("id-ID")}</Text></View></TD>
                            </TR>
                            <TR>
                                <TD weighting={0.754} style={[{justifyContent: "center"}]}><View style={Styles.row}><Text style={Styles.header3}>On Behalf</Text><Text style={Styles.header3}> PT. PROCUREMENT SERVICES INTERNATIONAL</Text></View></TD>
                                <TD weighting={0.2} style={[{justifyContent: "center", alignItems:"center", textAlign: "center"}]}><Text style={[Styles.header3, {padding: 6}]}>UANG MUKA/TERMIN</Text></TD>
                                <TD weighting={0.2}><Text style={[Styles.header3, {marginLeft: 3}]}>Rp</Text><Text style={[Styles.header3]}>&emsp;-</Text></TD>
                            </TR>
                            <TR>
                                <TD weighting={0.3765} style={[{justifyContent: "center", alignItems:"center", textAlign: "center"}]}><Text style={[Styles.header1, {padding: 6}]}>BANK RAKYAT INDONESIA (BRI) KCP
                                JAKARTA, CIPULIR (IDR)</Text></TD> 
                                <TD weighting={0.3765} style={[{justifyContent: "center"}]}><Text style={[Styles.header1, {padding: 6}]}>0447.01.000566.30.5</Text></TD>
                                <TD weighting={0.2} style={[{justifyContent: "center"}]}><Text style={[Styles.header3, {padding: 6}]}>V.A.T 11%</Text></TD>
                                <TD weighting={0.2} style={Styles.row}><Text style={[Styles.header3, {marginLeft: 3}]}>Rp</Text><View><Text style={[Styles.header3]}>   {hargaVAT.toLocaleString("id-ID")}</Text></View></TD>
                            </TR>   
                            <TR>
                                <TD weighting={0.3765} style={[{justifyContent: "center", alignItems:"center", textAlign: "center"}]}><Text style={[Styles.header1, {padding: 6}]}>BANK MANDIRI KCP BEKASI, UJUNG
                                ASPAL (IDR)</Text></TD>
                                <TD weighting={0.3765} style={[{justifyContent: "center"}]}><Text style={[Styles.header1, {padding: 6}]}>167.00.0221545.6</Text></TD>
                                <TD weighting={0.2} style={[{justifyContent: "center"}]}><Text style={[Styles.header3, {padding: 6}]}>TOTAL</Text></TD>
                                <TD weighting={0.2} style={Styles.row}><Text style={[Styles.header3, {marginLeft: 3}]}>Rp</Text><Text style={[Styles.header3]}> {valueAddTax.toLocaleString("id-ID")}</Text></TD>
                            </TR>
                        </Table>
                    </View>
                    <View style={Styles.row}>
                        <View style={[Styles.column, {marginTop: "1.15in"}]}>
                            <View style={Styles.row}><Text style={Styles.textForm}>- Lembar 1 : Customer</Text></View>
                            <View style={Styles.row}><Text style={Styles.textForm}>- Lembar 2 : ACF</Text></View>
                            <View style={Styles.row}><Text style={Styles.textForm}>- Lembar 3 : Customer</Text></View>
                            <View style={[{marginTop: 28.35 * 0.127}]}><Text style={Styles.textForm}>Form: 5.10.010</Text></View>
                        </View>
                        <View style={Styles.column}>
                            <Text style={[Styles.signatureCompany, {marginTop: 28.35 * 0.6096, textAlign: "center"}]}>PT. PROCUREMENT SERVICES INTERNATIONAL</Text>
                            <View style={[{marginTop: "1.05in", textAlign: "center"}]}>
                                <Text style={[Styles.signatureName]}>AGUS ARINTOKO</Text>
                                <Text style={[Styles.signatureJob]}>General Manager</Text>
                            </View>
                        </View>
                    </View>
                </Page>
            ))}
        </Document>
    )
}

export function Generate() {
    const {order_id} = useParams();
    const axiosPrivate = useInterceptorRefreshToken();
    const [nomorKuotasi, setNomorKuotasi] = useState("");
    const [penyewaan, setPenyewaaan] = useState([]);
    const [nomorSeri, setNomorSeri] = useState("");
    const [username, setUsername] = useState("");
    const [hargaTotal, setHargaTotal] = useState(0);
    const [tanggalAwalSewa, setTanggalAwalSewa] = useState("");
    const [formattedTanggalAwalSewa, setFormattedTanggalAwalSewa] = useState("");
    const [tanggalBerakhirSewa, setTanggalBerakhirSewa] = useState("");
    const [tanggalInvoice, setTanggalInvoice] = useState("");
    const [tanggalKuotasi, setTanggalKuotasi] = useState("");
    const [namaLengkap, setNamaLengkap] = useState("");
    const [namaPerusahaan, setNamaPerusahaan] = useState("");
    const [namaSingkatPerusahaan, setNamaSingkatPerusahaan] = useState("");
    const [namaAlat, setNamaAlat] = useState("");
    const [nomorAlat, setNomorAlat] = useState("");
    const [merk, setMerk] = useState("");
    const [alamat, setAlamat] = useState("");
    const [hargaVAT, setHargaVAT] = useState(0);
    const [valueAddTax, setValueAddTax] = useState(0);

    useEffect(() => {
        axiosPrivate
            .get("http://localhost:3001/api/penyewaan/detail/order_id/" + order_id)
            .then((res) => (console.log(res), 
                setNomorKuotasi(res.data.data[0].nomorKuotasi), 
                setTanggalBerakhirSewa(res.data.data[0].tanggalBerakhirSewa),
                setTanggalAwalSewa(res.data.data[0].tanggalAwalSewa),
                setHargaTotal(res.data.data[0].hargaTotal),
                setUsername(res.data.data[0].username),
                setNomorSeri(res.data.data[0].nomorSeri),
                setPenyewaaan(res.data.data)
            ))
            .catch((err) => console.log(err))
    }, [order_id])

    useEffect(() => {
        axiosPrivate
            .get("http://localhost:3001/api/kuotasi/search/" + nomorKuotasi)
            .then((res) => (
                setTanggalKuotasi(res.data.data[0].tanggalKuotasi)
            ))
            .catch((err) => console.log(err))
    }, [nomorKuotasi])

    useEffect(() => {
        //Setting Invoice Date
        const Bulan = getMonth(new Date(tanggalBerakhirSewa));
        const Tahun = getYear(new Date(tanggalBerakhirSewa));
        const Tanggal = getDate(new Date(tanggalBerakhirSewa));
        let result = '';
        result = Tanggal + ' ' + getNameMonth(Bulan) + ' ' + Tahun;
        setTanggalInvoice(result);

        //Setting Date Format
        const Bulan2 = getMonth(new Date(tanggalAwalSewa));
        const Tahun2 = getYear(new Date(tanggalAwalSewa));
        const Tanggal2 = getDate(new Date(tanggalAwalSewa));
        let result2 = '';
        result2 = Tanggal2 + ' ' + getNameMonth(Bulan2) + ' ' + Tahun2;
        setFormattedTanggalAwalSewa(result2);

        let sum = (11 * hargaTotal) / 100;
        let addVAT = hargaTotal + sum;
        setHargaVAT(sum);
        setValueAddTax(addVAT);
    }, [tanggalBerakhirSewa, tanggalAwalSewa, hargaTotal])

    useEffect(() => {
        axiosPrivate
            .get("http://localhost:3001/api/user/profile/" + username)
            .then((res) => {
                setNamaLengkap(res.data.data[0].nama);
                setNamaPerusahaan(res.data.data[0].perusahaan);
                const extractedText = res.data.data[0].perusahaan.match(/\((.*?)\)/);
                const textInsideBrackets = extractedText ? extractedText[1] : "";
                setNamaSingkatPerusahaan(textInsideBrackets);
                setAlamat(res.data.data[0].alamat);
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
                setNamaAlat(res.data.data[0].nama),
                setMerk(res.data.data[0].merk),
                setNomorAlat(res.data.data[0].nomorAlat)
            ))
            .catch((err) => console.log(err))
    }, [nomorSeri])
    
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
                            <CreateInvoice
                                penyewaan={penyewaan}
                                invoiceDate={tanggalInvoice}
                                tanggalAwalSewa={formattedTanggalAwalSewa}
                                hargaVAT={Math.floor(hargaVAT)}
                                valueAddTax={Math.floor(valueAddTax)}
                                namaLengkap={namaLengkap}
                                namaPerusahaan={namaPerusahaan}
                                namaSingkatPerusahaan={namaSingkatPerusahaan}
                                alamat={alamat}
                                namaAlat={namaAlat}
                                merk={merk}
                                nomorAlat={nomorAlat}
                                nomorKuotasi={nomorKuotasi}
                                tanggalKuotasi={tanggalKuotasi}
                            />
                        </PDFViewer>
                    </div>
                </div>
            </div>
        </div>
    )
}