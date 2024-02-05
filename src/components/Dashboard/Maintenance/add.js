import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../Main/header";
import { Sidebar } from "../Main/sidebar";
import useInterceptorRefreshToken from "../../hooks/useInterceptorRefreshToken";
import axios from "axios";
import { handleErrMsg } from "../../function/handleErrMsg";

export function Add() {
    const [tanggal, setTanggal] = useState("");
    const [pemohon, setPemohon] = useState("");
    const [bagian, setBagian] = useState("");
    const [item, setItem] = useState("");
    const [nomorSeri, setNomorSeri] = useState("");
    const [lainLain, setLainLain] = useState("");
    const [equipment, setEquipment] = useState([]);
    const axiosPrivate = useInterceptorRefreshToken();
    const Navigate = useNavigate();
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        setErrMsg('');
    }, [tanggal, pemohon, bagian, item, nomorSeri, lainLain])

    useEffect(() => {
        axios
            .get("http://localhost:3001/api/equipment/list" , {
                    auth: {
                        username: process.env.REACT_APP_BASIC_AUTH_USERNAME,
                        password: process.env.REACT_APP_BASIC_AUTH_PASSWORD
                    }
                })
            .then((res) =>  (console.log(res.data.data),setEquipment(res.data.data)))
            .catch((err) => console.log(err));  
    }, [])
    
    function handleSubmit(event) {
        event.preventDefault();
        axiosPrivate
            .post("http://localhost:3001/api/maintenance/add", {
                tanggal,
                pemohon,
                bagian,
                item,
                nomorSeri,
                lainLain,
            })
            .then((res) => {
                Navigate("/dashboard/maintenance/main");
            })
            .catch((err) => {
                switch (err.response.data.status) {
                    case 400:
                        switch (err.response.data.message) {
                            case "Input kosong":
                                setErrMsg("Kolom masukkan data tidak boleh dikosongkan");
                                break;
                            case "Format tidak sesuai":
                                setErrMsg("Masukkan data sesuai dengan format ketentuan");
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
              <h5 style={{textAlign: "center", fontWeight: 700, marginBottom: 30}}>Formulir Tambah Pemeliharaan Peralatan & Mesin Baru</h5>
              <form onSubmit={handleSubmit}>
                  <div className="card p-3">
                    {handleErrMsg(errMsg)}
                    <label className="form-label" htmlFor="tanggal">Tanggal : </label>
                    <input type="date" className="form-control" id="tanggal" onChange={(event) => setTanggal(event.target.value)}></input>
                    <label className="form-label" htmlFor="pemohon">Pemohon : </label>
                    <input type="text" className="form-control" id="pemohon" onChange={(event) => setPemohon(event.target.value)}></input>
                    <label className="form-label" htmlFor="bagian">Bagian : </label>
                    <input type="text" className="form-control" id="bagian" onChange={(event) => setBagian(event.target.value)}></input>
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
                    <label className="form-label" htmlFor="nomorSeri">Peralatan : </label>
                    <select className="form-control" id="nomorSeri" name="nomorSeri" value={nomorSeri} onChange={(event) => setNomorSeri(event.target.value)}>
                        <option value="">Pilih peralatan...</option>
                        {
                            equipment.map((data) => (
                                <option value={data.nomorSeri}>{data.nama} - {data.nomorSeri}</option>
                            ))
                        }
                    </select>
                    <label className="form-label" htmlFor="lainLain">Lain Lain : </label>
                    <input type="text" className="form-control" id="lainLain" onChange={(event) => setLainLain(event.target.value)}></input>
                  </div>
                  <button className="btn btn-danger mt-3"><i class="fa-solid fa-plus"></i>&emsp;Tambah</button>
              </form>
              </div>
          </div>
      </div>
    </div>
    )
}