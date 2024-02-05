import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Header from "../Main/header";
import { Sidebar } from "../Main/sidebar";
import useInterceptorRefreshToken from "../../hooks/useInterceptorRefreshToken";
import { handleErrMsg } from "../../function/handleErrMsg";

export function Update() {
    const {no} = useParams();
    const [tanggal, setTanggal] = useState("");
    const [pemohon, setPemohon] = useState("");
    const [bagian, setBagian] = useState("");
    const [item, setItem] = useState("");
    const [nomorSeri, setNomorSeri] = useState("");
    const [lainLain, setLainLain] = useState("");
    const [file, setFile] = useState("");
    const axiosPrivate = useInterceptorRefreshToken();
    const Navigate = useNavigate();
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        setErrMsg('');
    }, [tanggal, pemohon, bagian, item, nomorSeri, lainLain])

    useEffect(() => {
        axiosPrivate
            .get("http://localhost:3001/api/maintenance/detail/" + no)
            .then((res) => (
                setTanggal(res.data.data[0].tanggal),
                setPemohon(res.data.data[0].pemohon),
                setBagian(res.data.data[0].bagian),
                setItem(res.data.data[0].item),
                setNomorSeri(res.data.data[0].nomorSeri),
                setLainLain(res.data.data[0].lainLain),
                setFile(res.data.data[0].file)
            ))
            .catch((err) => {console.log(err)})
    }, [])

    function handleUpdate(event) {
        event.preventDefault();
        axiosPrivate
            .patch("http://localhost:3001/api/maintenance/update/" + no, {
                tanggal,
                pemohon,
                bagian,
                item,
                nomorSeri,
                lainLain,
                file,
            }, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then((res) => {
                Navigate("/dashboard/maintenance/main");
            })
            .catch((err) => {
                switch (err.response.data.status) {
                    case 400:
                        switch (err.response.data.message) {
                            case "Input kosong":
                                setErrMsg('Kolom masukkan data tidak boleh dikosongkan');
                                break;
                            case "Format tidak sesuai":
                                setErrMsg('Masukkan data sesuai dengan format ketentuan');
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
    <div className="container-fluid">
    <div className="row">
        <div className="col-auto sidebar">
            <Sidebar />
        </div>
        <div className="col">
            <Header></Header>
            <div className="container-fluid g-0 p-3">
                <h5 style={{textAlign: "center", fontWeight: 700, marginBottom: 30}}>Formulir Update Pemeliharaan Peralatan & Mesin</h5>
                <form onSubmit={handleUpdate} encType="multipart/form-data">
                    <div className="card p-3">
                        {handleErrMsg(errMsg)}
                        <label className="form-label" htmlFor="tanggal">Tanggal : </label>
                        <input type="date" className="form-control" id="tanggal" onChange={(event) => setTanggal(event.target.value)}></input>
                        <label className="form-label" htmlFor="pemohon">Pemohon : </label>
                        <input type="text" className="form-control" id="pemohon" value={pemohon} onChange={(event) => setPemohon(event.target.value)}></input>
                        <label className="form-label" htmlFor="bagian">Bagian : </label>
                        <input type="text" className="form-control" id="bagian" value={bagian} onChange={(event) => setBagian(event.target.value)}></input>
                        <label className="form-label" htmlFor="item">Item : </label>
                        <select className="form-control" id="item" name="item" value={item} onChange={(event) => setItem(event.target.value)}>
                            <option value="">Pilih item...</option>
                            <option value="BANGUNAN">BANGUNAN</option>
                            <option value="RUANG/FUNGSI">RUANG/FUNGSI</option>
                            <option value="KENDARAAN">KENDARAAN</option>
                            <option value="ALAT/MESIN">ALAT/MESIN</option>
                            <option value="PERLENGKAPAN">PERLENGKAPAN</option>
                            <option value="LAIN-LAIN">LAIN-LAIN</option>
                        </select>
                        <label className="form-label" htmlFor="nomorSeri">Nomor Seri : </label>
                        <input type="text" className="form-control" id="nomorSeri" value={nomorSeri} onChange={(event) => setNomorSeri(event.target.value)}></input>
                        <label className="form-label" htmlFor="lainLain">Lain Lain : </label>
                        <input type="text" className="form-control" id="lainLain" value={lainLain} onChange={(event) => setLainLain(event.target.value)}></input>
                        <label className="form-label" htmlFor="file">Form File : </label>
                        <input type="file" name="file" className="form-control" id="formFile" onChange={(event) => setFile(event.target.files[0])}></input>
                    </div>
                    <button className="btn btn-danger mt-3"><i class="fa-solid fa-pen-to-square update"></i>&emsp;Ubah</button>
                </form>
            </div>
        </div>
      </div>
    </div>
    )
}