import { useParams } from "react-router-dom"
import Header from "../Main/header"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../Main/sidebar";
import useInterceptorRefreshToken from "../../hooks/useInterceptorRefreshToken";
import differenceInDays from "date-fns/differenceInDays";
import { handleErrMsg } from "../../function/handleErrMsg";

export function Form() {
    const {nomorKuotasi} = useParams();
    const [nama, setNama] = useState("");
    const [merk, setMerk] = useState("");
    const [nomorSeri, setNomorSeri] = useState("");
    const [jumlah, setJumlah] = useState();
    const [username, setUsername] = useState("");
    const [namaLengkap, setNamaLengkap] = useState("");
    const [namaPerusahaan, setNamaPerusahaan] = useState("");
    const [email, setEmail] = useState("");
    const [noTelepon, setNoTelepon] = useState("");
    const [tanggalAwalSewa, setTanggalAwalSewa] = useState();
    const [tanggalBerakhirSewa, setTanggalBerakhirSewa] = useState();
    const [namaProyek, setNamaProyek] = useState("");
    const [alamatProyek, setAlamatProyek] = useState("");
    const [hargaPerUnit, setHargaPerUnit] = useState(0);
    const [hargaTotal, setHargaTotal] = useState(0);
    const axiosPrivate = useInterceptorRefreshToken();
    const [errMsg, setErrMsg] = useState("");
    const Navigate = useNavigate();

    useEffect(() => {
        axiosPrivate
            .get("http://localhost:3001/api/kuotasi/search/" + nomorKuotasi)
            .then((response) => (
                setNama(response.data.data[0].nama),
                setMerk(response.data.data[0].merk),
                setNomorSeri(response.data.data[0].nomorSeri),
                setJumlah(response.data.data[0].jumlah),
                setUsername(response.data.data[0].username),
                setNamaLengkap(response.data.data[0].namaLengkap),
                setNamaPerusahaan(response.data.data[0].namaPerusahaan),
                setEmail(response.data.data[0].email),
                setNoTelepon(response.data.data[0].noTelepon),
                setTanggalAwalSewa(new Date(response.data.data[0].tanggalAwalSewa)),
                setTanggalBerakhirSewa(new Date(response.data.data[0].tanggalBerakhirSewa)),
                setNamaProyek(response.data.data[0].namaProyek),
                setAlamatProyek(response.data.data[0].alamatProyek),
                setHargaPerUnit(response.data.data[0].hargaPerUnit),
                setHargaTotal(response.data.data[0].hargaTotal)
            ))
            .catch((error) => console.log(error))
    }, []);

    useEffect(() => {
        const countDays = differenceInDays(new Date(tanggalBerakhirSewa),new Date(tanggalAwalSewa));
        const hargaPerUnitDays = hargaPerUnit/30;
        const tempHargaTotal = hargaPerUnitDays * countDays;
        setHargaTotal(Math.floor(tempHargaTotal));
    }, [tanggalAwalSewa, tanggalBerakhirSewa, hargaPerUnit])

    function handleUpdate(event) {
        event.preventDefault();
        axiosPrivate
            .patch("http://localhost:3001/api/kuotasi/update/" + nomorKuotasi, {
                hargaPerUnit,
                hargaTotal,
                nomorKuotasi,
                nomorSeri,
                username,
                tanggalAwalSewa,
                tanggalBerakhirSewa,
                namaProyek,
                alamatProyek,
                jumlah,
                email,
                nama,
                merk,
                namaLengkap,
                namaPerusahaan,
            })
            .then((response) => (Navigate("/kuotasi"), console.log(response)))
            .catch((err) => {
                switch (err.response.data.status) {
                    case 400:
                        switch (err.response.data.message) {
                            case "Input kosong":
                                setErrMsg("Kolom input harga tidak boleh dikosongkan");
                                break;
                            case "Format tidak sesuai":
                                setErrMsg("Kolom input harga tidak sesuai dengan format ketentuan");
                                break;
                            default:
                                break;
                        }
                        break;
                    default:
                        break;
                }
            })
    }

    return (
    <div className="container-fluid g-0">
        <div className="row">
            <div className="col-auto sidebar">
            <Sidebar />
            </div>
            <div className="col">
                <Header></Header>
                <div className="container-fluid g-0 p-3">
                    <h5 className="text-center mb-4"><b>Formulir Penawaran Harga</b></h5>
                    <form onSubmit={handleUpdate} className="d-flex justify-content-center">
                        <div className="card p-3 mt-3" style={{width: "97%"}}>
                            {handleErrMsg(errMsg)}
                            <h6 style={{fontWeight: 700, marginTop: 21, marginBottom: 21}}>Detail Equipment</h6>
                            <label className="form-label" htmlFor="nama">Nama : </label>
                            <input type="text" className="form-control" id="nama" value={nama} readOnly></input>
                            <label className="form-label" htmlFor="merk">Merk : </label>
                            <input type="text" className="form-control" id="merk" value={merk} readOnly></input>
                            <label className="form-label" htmlFor="nomorSeri">Nomor Seri : </label>
                            <input type="text" className="form-control" id="nomorSeri" value={nomorSeri} readOnly></input>
                            <label className="form-label" htmlFor="jumlah">Jumlah : </label>
                            <input type="text" className="form-control" id="jumlah" value={jumlah} readOnly></input>
                            <h6 style={{fontWeight: 700, marginTop: 21, marginBottom: 21}}>Detail Contact</h6>
                            <label className="form-label" htmlFor="namaLengkap">Nama Lengkap : </label>
                            <input type="text" className="form-control" id="namaLengkap" value={namaLengkap} readOnly></input>
                            <label className="form-label" htmlFor="namaPerusahaan">Nama Perusahaan : </label>
                            <input type="text" className="form-control" id="namaPerusahaan" value={namaPerusahaan} readOnly></input>
                            <label className="form-label" htmlFor="email">Email : </label>
                            <input type="text" className="form-control" id="email" value={email} readOnly></input>
                            <label className="form-label" htmlFor="noTelepon">No Telepon : </label>
                            <input type="text" className="form-control" id="noTelepon" value={noTelepon} readOnly></input>
                            <h6 style={{fontWeight: 700, marginTop: 21, marginBottom: 21}}>Detail Penyewaan</h6>
                            <label className="form-label" htmlFor="tanggalAwalSewa">Tanggal Awal Sewa : </label>
                            <input type="text" className="form-control" id="tanggalAwalSewa" value={tanggalAwalSewa} readOnly></input>
                            <label className="form-label" htmlFor="tanggalBerakhirSewa">Tanggal Berakhir Sewa : </label>
                            <input type="text" className="form-control" id="tanggalBerakhirSewa" value={tanggalBerakhirSewa} readOnly></input>
                            <label className="form-label" htmlFor="alamatProyek">Alamat Proyek : </label>
                            <input type="text" className="form-control" id="alamatProyek" value={alamatProyek} readOnly></input>
                            <label className="form-label" htmlFor="namaProyek">Nama Proyek : </label>
                            <input type="text" className="form-control" id="namaProyek" value={namaProyek} readOnly></input>
                            <h6 style={{marginTop: 21, marginBottom: 21}}><b>Detail Penawaran Harga</b></h6>
                            <label className="form-label" htmlFor="hargaPerUnit">Harga Per Unit : </label>
                            <input type="text" className="form-control" id="hargaPerUnit" value={hargaPerUnit} onChange={(event) => setHargaPerUnit(event.target.value)}></input>
                            <label className="form-label" htmlFor="hargaTotal">Harga Total : </label>
                            <input type="text" className="form-control" id="hargaTotal" value={hargaTotal} onChange={(event) => setHargaTotal(event.target.value)}></input>
                            <div className="d-flex justify-content-center">
                                <button className="btn btn-success mt-3" style={{width: 200}}>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}