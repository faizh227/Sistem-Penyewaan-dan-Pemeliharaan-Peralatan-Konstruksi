import { Document, Page, View, Image, Text, StyleSheet, PDFViewer } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Sidebar } from "../../Main/sidebar";
import Header from "../../Main/header";
import {Table, TR, TH, TD} from '@ag-media/react-pdf-table';
import useInterceptorRefreshToken from "../../../hooks/useInterceptorRefreshToken";
import {formatTanggalIntoWord} from "../../../function/formatTanggalIntoWord";
import axios from "axios";
import {formatTanggalDDMMYY} from "../../../function/formatTanggalDDMMYY";

const Styles = StyleSheet.create({
    page: {
        width: 21 * 28.35,
        height: 29.7 * 28.35,
        padding: "3cm"
    },
    row: {
        flexDirection: "row"
    },
    column: {
        flex: 1
    },
    image: {
        width: 47.25,
        height: 47.25
    },
    header: {
        fontSize: 14,
        textAlign: "center",
        textTransform: "uppercase"
    },
    font: {
        fontSize: 12,
    }, 
    table: {
        width: 15.4178 * 28.35,
        marginTop: 0.381 * 28.35
    },
    inputField: {
        borderBottom: "1px solid black",
    }
})

function CreateRow(tipeAsset) {
    switch (tipeAsset) {
        case 1:
            const Description1 = ["WELDING MACHINE", "KABEL LAS 15 MTR + CONECTOR (+)", "KABEL LAS 10 MTR + CONECTOR (-)", "BATTERY", 
            "TUTUP TANKI", "STARTER", "AMPER FUEL", "SKID AND RODA", "GFCI/MCB", "EXTENTION POWER", "GROUNDING CABLE + BESI GROUNDING",
            "HOUR METER", "BESI SIKU KE CASIS", "HANDLE POWER", "TERMINAL CABLE +/-", "COK GERINDA", "SAFETY BATTERY"];
            const Rows1 = [];
            for (let i = 0; i < Description1.length; i++) {
                Rows1.push(
                    <TR key={i}>
                        <TD style={{justifyContent: "center"}}><Text style={Styles.font}>{i+1}</Text></TD>
                        <TD><Text style={Styles.font}>{Description1[i]}</Text></TD>
                        <TD></TD>
                        <TD></TD>
                        <TD></TD>
                        <TD></TD>
                        <TD></TD>
                    </TR>
                ) 
            }
            return Rows1;
            break;
        case 6:
            const Description2 = ["Kaca Spion Samping Kanan", "Kaca Spion Samping Kiri", "Wiper Blade Depan Belakang", "Safety Belt", "Lampu Atas Kanan Depan", 
            "Lampu Atas Kiri Depan", "Lampu Belakang Kanan Atas", "Lampu Belakang Kiri Atas", "Lampu Kanan Depan Bawah Depan", "Lampu Kiri Bawah Depan", 
            "Backet/Kuku Belakang", "Backet/Kuku Depan", "Lampu Rotari", "AC System", "Lampu Kabin", "Lampu Rem", "Lampu Sign", "Kotak P3K/Isinya", "Racun Api 6 Kg",
            "Alarm Mundur", "Safety Cone", "Kipas Angin"];
            const Rows2 = [];
            for (let i = 0; i < Description2.length; i++) {
                Rows2.push(
                    <TR key={i}>
                        <TD style={{justifyContent: "center"}}><Text style={[Styles.font, {textAlign: "center"}]}>{i+1}</Text></TD>
                        <TD><Text style={Styles.font}>{Description2[i]}</Text></TD>
                        <TD></TD>
                        <TD></TD>
                        <TD></TD>
                        <TD></TD>
                        <TD></TD>
                    </TR>
                ) 
            }
            return Rows2;
            break;
        default:
            break;
    }
}

function CreateInputField(props) {
    switch (props.tipeAsset) {
        case 1:
            return (
            <View style={Styles.row}>
                <View style={Styles.column}>
                    <View style={Styles.row}><Text style={Styles.font}>MERK/TYPE</Text><Text style={[Styles.font, {marginLeft: 24.35}]}>:</Text><View style={[Styles.inputField, Styles.font, {marginLeft: 4.35, width: 105}]}><Text>{props.merk}</Text></View></View>
                    <View style={Styles.row}><Text style={Styles.font}>ID NOMOR</Text><Text style={[Styles.font, {marginLeft: 32.35}]}>:</Text><View style={[Styles.inputField, Styles.font, {marginLeft: 4.35, width: 105}]}><Text>{props.nomorAlat}</Text></View></View>
                    <View style={Styles.row}><Text style={Styles.font}>WARNA</Text><Text style={[Styles.font, {marginLeft: 49.35}]}>:</Text><View style={[Styles.inputField, Styles.font, {marginLeft: 4.35, width: 105}]}><Text>{props.warna}</Text></View></View>
                    <View style={Styles.row}><Text style={Styles.font}>TGL KONTRAK</Text><Text style={[Styles.font, {marginLeft: 9.35}]}>:</Text><View style={[Styles.inputField, Styles.font, {marginLeft: 4.35, width: 105}]}><Text>{props.tanggalAwalSewa}</Text></View></View>
                </View>
                <View style={Styles.column}>
                    <View style={Styles.row}><Text style={Styles.font}>TAHUN PEMBUATAN</Text><Text style={[Styles.font, {marginLeft: 29.35}]}>:</Text><View style={[Styles.inputField, Styles.font, {marginLeft: 4.35, width: 105}]}><Text></Text></View></View>
                    <View style={Styles.row}><Text style={Styles.font}>NOMOR ENGINE</Text><Text style={[Styles.font, {marginLeft: 44.35}]}>:</Text><View style={[Styles.inputField, Styles.font, {marginLeft: 4.35, width: 105}]}><Text>{props.nomorSeri}</Text></View></View>
                    <View style={Styles.row}><Text style={Styles.font}>HAURS METER IN</Text><Text style={[Styles.font, {marginLeft: 39.35}]}>:</Text><View style={[Styles.inputField, Styles.font, {marginLeft: 4.35, width: 105}]}><Text></Text></View></View>
                    <View style={Styles.row}><Text style={Styles.font}>HAURS METER OUT</Text><Text style={[Styles.font, {marginLeft: 28.35}]}>:</Text><View style={[Styles.inputField, Styles.font, {marginLeft: 4.35, width: 105}]}><Text></Text></View></View>
                </View>
            </View>
            )
            break;
        case 6: 
            return(
                <View style={Styles.row}>
                    <View style={Styles.column}>
                        <View style={Styles.row}><Text style={Styles.font}>MERK/BUATAN</Text><Text style={[Styles.font, {marginLeft: 5.35}]}>:</Text><Text style={[Styles.inputField, Styles.font, {marginLeft: 4.35, width: 105}]}>{props.merk}</Text></View>
                        <View style={Styles.row}><Text style={Styles.font}>JENIS</Text><Text style={[Styles.font, {marginLeft: 54.55}]}>:</Text><Text></Text></View>
                        <View style={Styles.row}><Text style={Styles.font}>NO.SERIE</Text><Text style={[Styles.font, {marginLeft: 58.35}]}>:</Text><Text style={[Styles.font, Styles.inputField, {marginLeft: 4.35, width: "100%"}]}>{props.nomorSeri}</Text></View>
                        <View style={Styles.row}><Text style={Styles.font}>KONTRAK TGL</Text><Text style={[Styles.font, {marginLeft: 5.05}]}>:</Text><Text style={[Styles.font, Styles.inputField, {marginLeft: 4.35, width: 105}]}>{props.tanggalAwalSewa}</Text></View>
                    </View>
                    <View style={[Styles.column, {marginLeft: 20}]}>
                        <View style={Styles.row}><Text style={Styles.font}>TAHUN PEMBUATAN</Text><Text style={[Styles.font, {marginLeft: 5}]}>:</Text><Text></Text></View>
                        <View style={Styles.row}><Text style={Styles.font}>PSI NO</Text><Text style={[Styles.font, {marginLeft: 78.55}]}>:</Text><Text></Text></View>
                        <View style={Styles.row}><Text style={Styles.font}>HOURS METER OUT</Text><Text style={[Styles.font, {marginLeft: 2.05}]}>:</Text><Text></Text></View>
                        <View style={Styles.row}><Text style={Styles.font}>HOURS METER IN</Text><Text style={[Styles.font, {marginLeft: 15}]}>:</Text><Text></Text></View>
                        <View style={Styles.row}><Text style={Styles.font}>SILO DISNAKER</Text><Text style={[Styles.font, {marginLeft: 27}]}>:</Text><Text></Text></View>
                    </View>
                </View>
            )
            break;
        default:
            break;
    }
}

function CreateTable(tipeAsset) {
    return (
        <Table style={Styles.table} weightings={[0.05,0.30,0.1,0.1,0.1,0.1,0.25]}>
            <TH>
                <TD style={{justifyContent: "center"}}>
                    <Text style={[Styles.font]}>NO</Text>
                </TD>
                <TD style={{justifyContent: "center"}}>
                    <Text style={[Styles.font]}>DESCRIPTION</Text>
                </TD>
                <TD style={{justifyContent: "center"}}>
                    <Text style={[Styles.font]}>QTY</Text>
                </TD>
                <TD style={{justifyContent: "center"}}>
                    <Text style={[Styles.font]}>IN</Text>
                </TD>
                <TD style={{justifyContent: "center"}}>
                    <Text style={[Styles.font]}>QTY</Text>
                </TD>
                <TD style={{justifyContent: "center"}}>
                    <Text style={[Styles.font]}>OUT</Text>
                </TD>
                <TD style={{justifyContent: "center"}}>
                    <Text style={[Styles.font]}>REMARKS</Text>
                </TD>
            </TH>
            {CreateRow(tipeAsset)}
        </Table>
    )
}

function CreateDocument({data, tipeAsset, namaAlat, merk, warna, nomorAlat, nomorSeri, tanggalAwalSewa, tanggalBerakhirSewa}) {
    const props = {
        tipeAsset: tipeAsset,
        nomorSeri: nomorSeri,
        nomorAlat: nomorAlat,
        merk: merk,
        warna: warna,
        tanggalAwalSewa: tanggalAwalSewa,
    }
    console.log(props);
    return (
        <Document>
            <Page size="A4" style={Styles.page}>
                <View style={Styles.row}>
                    <View style={[Styles.column, {marginBottom: 28.35 * 0.558, flexGrow: 1}]}>
                        <Image src="/logopsi.jpg" style={Styles.image}></Image>
                    </View>
                    <View style={[Styles.column, {marginBottom: 28.35 * 0.558, flexGrow: 6
                    }]}>
                        <Text style={Styles.header}>SERAH TERIMA {namaAlat}</Text>
                        <Text style={Styles.header}>{data.namaPerusahaan? data.namaPerusahaan.replace(/\([^)]*\)/, '').trim() : data.namaLengkap}</Text>
                        <Text style={Styles.header}>{data.alamat}</Text>
                    </View>
                </View>
                {CreateInputField(props)}
                {CreateTable(tipeAsset)}
                <View style={[Styles.row,{marginLeft: 28.35 * 0.736, marginTop: 3}]}><Text style={Styles.font}>NOTE</Text><Text style={[Styles.font, {marginLeft: 9.35}]}>:</Text></View>
                <View style={[Styles.row, {marginTop: 28.35 * 1.0668, marginLeft: 28.35 * 0.736}]}>
                    <View style={Styles.column}>
                        <Text style={Styles.font}>ISSUED DATE : {tanggalBerakhirSewa}</Text>
                        <View style={[Styles.inputField, {width: 105, marginTop: 28.35 * 1.7192}]}></View>
                        <Text style={[Styles.font]}>ISSUED BY PT PSI</Text>
                        <View style={[Styles.inputField, {marginTop: 28.35 * 1.2192}]}><Text style={[Styles.font, {textTransform: "uppercase"}]}>{data.namaPerusahaan? data.namaPerusahaan.replace(/\([^)]*\)/, '').trim() : data.namaLengkap}</Text></View>
                        <Text style={Styles.font}>RECEIVED BY</Text>
                    </View>
                    <View style={[Styles.column, {marginLeft: 28.35 * 2.7}]}>
                        <Text style={Styles.font}>TURN DATE :</Text>
                        <View style={[Styles.inputField, {marginTop: 28.35 * 1.2192}]}><Text style={[Styles.font, {textTransform: "uppercase"}]}>{data.namaPerusahaan? data.namaPerusahaan.replace(/\([^)]*\)/, '').trim() : data.namaLengkap}</Text></View>
                        <Text style={[Styles.font]}>ISSUED BY</Text>
                        <View style={[Styles.inputField, {width: 125, marginTop: 28.35 * 1.7192}]}></View>
                        <Text style={Styles.font}>RECEIVED BY PT PSI</Text>
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export function Generate() {
    const {order_id} = useParams();
    const axiosPrivate = useInterceptorRefreshToken();
    const [data, setData] = useState({
        order_id: order_id,
        namaLengkap: '',
        namaPerusahaan: '',
        alamat: '',
    });
    const [nomorKuotasi, setNomorKuotasi] = useState("");
    const [nomorSeri, setNomorSeri] = useState("");
    const [username, setUsername] = useState("");
    const [tipeAsset, setTipeAsset] = useState(0);
    const [namaAlat, setNamaAlat] = useState("");
    const [merk, setMerk] = useState("");
    const [warna, setWarna] = useState("");
    const [nomorAlat, setNomorAlat] = useState("");
    const [tanggalAwalSewa, setTanggalAwalSewa] = useState("");
    const [tanggalBerakhirSewa, setTanggalBerakhirSewa] = useState("");

    useEffect(() => {
        axiosPrivate
            .get("http://localhost:3001/api/penyewaan/detail/order_id/" + order_id)
            .then((res) => (console.log(res),
                setNomorKuotasi(res.data.data[0].nomorKuotasi),
                setNomorSeri(res.data.data[0].nomorSeri),
                setUsername(res.data.data[0].username),
                setTanggalAwalSewa(formatTanggalIntoWord(res.data.data[0].tanggalAwalSewa)),
                setTanggalBerakhirSewa(formatTanggalDDMMYY(res.data.data[0].tanggalBerakhirSewa))
            ))
            .catch((err) => console.log(err))
    }, [order_id])

    useEffect(() => {
        axiosPrivate
            .get("http://localhost:3001/api/kuotasi/search/" + nomorKuotasi)
            .then((res) => (
                console.log(res)
            ))
            .catch((err) => console.log(err))
    }, [nomorKuotasi])

    useEffect(() => {
        axios
            .get("http://localhost:3001/api/equipment/search/nomorseri/" + nomorSeri, {
                auth: {
                    username: process.env.REACT_APP_BASIC_AUTH_USERNAME,
                    password: process.env.REACT_APP_BASIC_AUTH_PASSWORD
                }
            })
            .then((res) => (
                console.log(res),
                setTipeAsset(res.data.data[0].tipeAsset),
                setNamaAlat(res.data.data[0].nama),
                setMerk(res.data.data[0].merk),
                setWarna(res.data.data[0].warna),
                setNomorAlat(res.data.data[0].nomorAlat)
            ))
            .catch((err) => console.log(err))
    }, [nomorSeri])

    useEffect(() => {
        axiosPrivate
            .get("http://localhost:3001/api/user/profile/" + username)
            .then((res) => (console.log(res),
                setData({
                    namaLengkap: res.data.data[0].nama,
                    namaPerusahaan: res.data.data[0].perusahaan,
                    alamat: res.data.data[0].alamat
                })
            ))
            .catch((err) => console.log(err))
    }, [username])

    return (
        <div className="container-fluid g-0">
            <div className="row">
                <div className="col-auto sidebar">
                    <Sidebar/>
                </div>
                <div className="col">
                    <Header/>
                    <PDFViewer width="100%" height="1080px">
                        <CreateDocument data={data} tipeAsset={tipeAsset} namaAlat={namaAlat} merk={merk} warna={warna} nomorAlat={nomorAlat} nomorSeri={nomorSeri} tanggalAwalSewa={tanggalAwalSewa} tanggalBerakhirSewa={tanggalBerakhirSewa}/>
                    </PDFViewer>
                </div>
            </div>
        </div>
    )
}