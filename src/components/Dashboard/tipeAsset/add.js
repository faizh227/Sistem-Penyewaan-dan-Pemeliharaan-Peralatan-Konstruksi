import Header from "../Main/header";
import { Sidebar } from "../Main/sidebar";
import { useEffect, useState } from "react";
import useInterceptorRefreshToken from "../../hooks/useInterceptorRefreshToken";
import { useNavigate } from "react-router-dom";
import { handleErrMsg } from "../../function/handleErrMsg";

export function Add() {
    const axiosPrivate = useInterceptorRefreshToken();
    const [keterangan, setKeterangan] = useState("");
    const Navigate = useNavigate();
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        setErrMsg('');
    }, [keterangan])

    function handleSubmit(event) {
        event.preventDefault();
        axiosPrivate
            .post("http://localhost:3001/api/tipeasset/add", {
                keterangan
            })
            .then((res) => Navigate("/dashboard/kategori/main"))
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
        <div className="container-fluid g-0">
            <div className="row">
                <div className="col-auto sidebar">
                    <Sidebar/>
                </div>
                <div className="col">
                    <Header/>
                    <div className="container-fluid g-0 p-3">
                        <h5 style={{fontWeight: 700, textAlign: "center"}}>Formulir Tambah Tipe Asset</h5>
                        <form onSubmit={handleSubmit}>
                            <div className="card mt-3 p-3">
                                {handleErrMsg(errMsg)}
                                <label className="form-label">Keterangan</label>
                                <input className="form-control" type="text" value={keterangan} onChange={(event) => setKeterangan(event.target.value)}></input>
                            </div>
                            <button className="btn btn-success mt-3"><i class="fa-solid fa-plus"></i>&emsp;Tambah</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}