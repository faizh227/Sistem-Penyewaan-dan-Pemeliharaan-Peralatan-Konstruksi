import { Sidebar } from "../../Main/sidebar";
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Header from "../../Main/header"
import useInterceptorRefreshToken from "../../../hooks/useInterceptorRefreshToken";
import { handleErrMsg } from "../../../function/handleErrMsg";

export function Add() {
    const {no} = useParams();
    const [kerusakan, setKerusakan] = useState("");
    const [usulan, setUsulan] = useState("");
    const [biaya, setBiaya] = useState("");
    const [keterangan, setKeterangan] = useState("");
    const axiosPrivate = useInterceptorRefreshToken();
    const Navigate = useNavigate();
    const [errMsg, setErrMsg] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        axiosPrivate
            .post("http://localhost:3001/api/maintenance/kerusakan/add/" + no, {
                kerusakan,
                usulan,
                biaya,
                keterangan
            })
            .then((res) => Navigate(`/dashboard/maintenance/detail/${no}`))
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
                    <Sidebar/>
                </div>
                <div className="col">
                    <Header/>
                    <div className="container-fluid g-0 p-3">
                        <h5 style={{textAlign: "center", fontWeight: 700, marginBottom: 30}}>Formulir Tambah Kerusakan Peralatan & Mesin</h5>
                        <form onSubmit={handleSubmit}>
                            <div className="card p-3">
                                {handleErrMsg(errMsg)}
                                <label className="form-label">Kerusakan</label>
                                <input type="text" className="form-control" value={kerusakan} onChange={(event) => setKerusakan(event.target.value)}></input>
                                <label className="form-label">Usulan Pemeliharaan</label>
                                <input type="text" className="form-control" value={usulan} onChange={(event) => setUsulan(event.target.value)}></input>
                                <label className="form-label">Perkiraan Biaya</label>
                                <input type="text" className="form-control" value={biaya} onChange={(event) => setBiaya(event.target.value)}></input>
                                <label className="form-label">Keterangan</label> 
                                <input type="text" className="form-control" value={keterangan} onChange={(event) => setKeterangan(event.target.value)}></input>
                            </div>
                            <button className="btn btn-danger mt-3"><i class="fa-solid fa-plus"></i>&emsp;Tambah</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}