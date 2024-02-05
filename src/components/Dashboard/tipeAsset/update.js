import { useEffect, useState } from "react";
import useInterceptorRefreshToken from "../../hooks/useInterceptorRefreshToken";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Sidebar } from "../Main/sidebar";
import Header from "../Main/header";
import { handleErrMsg } from "../../function/handleErrMsg";

export function Update() {
    const {tipeAsset} = useParams();
    const axiosPrivate = useInterceptorRefreshToken();
    const [keterangan, setKeterangan] = useState("");
    const Navigate = useNavigate();
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        setErrMsg('');
    }, [keterangan])

    useEffect(() => {
        axios
            .get("http://localhost:3001/api/tipeasset/search/" + tipeAsset, {
                auth: {
                    username: process.env.REACT_APP_BASIC_AUTH_USERNAME,
                    password: process.env.REACT_APP_BASIC_AUTH_PASSWORD
                }
            })
            .then((res) => (setKeterangan(res.data.data[0].keterangan))) 
            .catch((err) => console.log(err))
    }, [tipeAsset])

    function handleUpdate(event) {
        event.preventDefault();
        axiosPrivate
            .patch("http://localhost:3001/api/tipeasset/update/" + tipeAsset, {
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
                        <h5 style={{fontWeight: 700, textAlign: "center"}}>Formulir Mengubah Data Tipe Asset</h5>
                        <form onSubmit={handleUpdate}>
                            <div className="card mt-3 p-3">
                                {handleErrMsg(errMsg)}
                                <label className="form-label">Tipe Asset</label>
                                <input className="form-control" type="text" value={tipeAsset} readOnly></input>
                                <label className="form-label">Keterangan</label>
                                <input className="form-control" type="text" value={keterangan} onChange={(event) => setKeterangan(event.target.value)}></input>
                            </div>
                            <button className="btn btn-success mt-3"><i class="fa-solid fa-pen-to-square update"></i>&emsp;Update</button>
                        </form>
                    </div>
                </div>
            </div>
            
        </div>
    )
}