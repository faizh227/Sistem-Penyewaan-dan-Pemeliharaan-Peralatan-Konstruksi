import { useEffect, useState } from "react";
import useInterceptorRefreshToken from "../hooks/useInterceptorRefreshToken";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import "./profile.css";
import {handleErrMsg} from "../function/handleErrMsg";

export function Profile() {
    const {username} = useParams();
    const [alamat, setAlamat] = useState("");
    const [jabatan, setJabatan] = useState("");
    const [nama, setNama] = useState("");
    const [telepon, setTelepon] = useState("");
    const [perusahaan, setPerusahaan] = useState("");
    const axiosPrivate = useInterceptorRefreshToken();
    const Navigate = useNavigate();
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        axiosPrivate
            .get("http://localhost:3001/api/user/profile/" + username)
            .then((res) => (
                setNama(res.data.data[0].nama),
                setAlamat(res.data.data[0].alamat),
                setJabatan(res.data.data[0].jabatan),
                setTelepon(res.data.data[0].noTelepon),
                setPerusahaan(res.data.data[0].perusahaan)
            ))
            .catch((err) => console.log(err))
    }, [username])

    function handleUpdateProfile(event) {
        event.preventDefault();
        axiosPrivate
            .patch("http://localhost:3001/api/user/profile/update/" + username, {
                nama,
                telepon,
                alamat,
                perusahaan,
                jabatan,
            })
            .then((res) => (Navigate("/")))
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
        <div className="container-fluid g-0 ">
            <div className="row">
                <div className="col">
                    <Header/>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    <div className="container-fluid content g-0 p-3 d-flex justify-content-center">
                        {
                        <form onSubmit={handleUpdateProfile}>
                            <div className="card card-profile p-3">
                                <h5 className="text-center mb-3"><b>Profile</b></h5>
                                {handleErrMsg(errMsg)}
                                <label className="form-label mt-3">Nama Lengkap: </label>
                                <input className="form-control" type="text" value={nama} onChange={(event) => setNama(event.target.value)}></input>
                                <label className="form-label mt-3">Telepon: </label>
                                <input className="form-control" type="text" value={telepon} onChange={(event) => setTelepon(event.target.value)}></input>
                                <label className="form-label mt-3">Alamat: </label>
                                <input className="form-control" type="text" value={alamat} onChange={(event) => setAlamat(event.target.value)}></input>
                                <label className="form-label mt-3">Nama Perusahaan: </label>
                                <input className="form-control" type="text" value={perusahaan} onChange={(event) => setPerusahaan(event.target.value)}></input>
                                <label className="form-label mt-3">Jabatan: </label>
                                <input className="form-control" type="text" value={jabatan} onChange={(event) => setJabatan(event.target.value)}></input>
                                <button className="btn btn-danger mt-4 mb-3 btn-profile"><i class="fa-solid fa-pen-to-square update"></i>&emsp;Ubah</button>
                            </div>
                        </form>
                        }
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Footer/>
                </div>
            </div>
        </div>
    )
}