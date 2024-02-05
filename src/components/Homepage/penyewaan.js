import Header from "./header";
import Footer from "./footer";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './penyewaan.css';
import axios from "axios";
import useAuth from "../hooks/useAuth";
import useInterceptorRefreshToken from "../hooks/useInterceptorRefreshToken";
import { handleErrMsg } from "../function/handleErrMsg";

export default function Penyewaan() {
    const { no } = useParams();
    const [nama, setNama] = useState("");
    const [merk, setMerk] = useState("");
    const [nomorSeri, setNomorSeri] = useState("");
    const [jumlah, setJumlah] = useState();
    const {auth} = useAuth();
    const [username, setUsername] = useState("");
    const [namaLengkap, setNamaLengkap] = useState("");
    const [namaPerusahaan, setNamaPerusahaan] = useState("");
    const [keterangan, setKeterangan] = useState("");
    const [email, setEmail] = useState("");
    const [noTelepon, setNoTelepon] = useState("");
    const [tanggalAwalSewa, setTanggalAwalSewa] = useState();
    const [tanggalBerakhirSewa, setTanggalBerakhirSewa] = useState();
    const [alamatProyek, setAlamatProyek] = useState("");
    const [namaProyek, setNamaProyek] = useState("");
    const [image, setImage] = useState(null);
    const axiosPrivate = useInterceptorRefreshToken();
    const [errMsg, setErrMsg] = useState('');

    //Navigation to Page Home
    const Navigate = useNavigate();

    useEffect(() => {
        setUsername(auth.username);
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [namaLengkap, namaPerusahaan, email, noTelepon, tanggalAwalSewa, tanggalBerakhirSewa, alamatProyek, namaProyek])

    useEffect(() => {
        axios
        .get("http://localhost:3001/api/equipment/search/" + no, {
            auth: {
                username: process.env.REACT_APP_BASIC_AUTH_USERNAME,
                password: process.env.REACT_APP_BASIC_AUTH_PASSWORD
            }
        })
        .then(
            (response) => (
            setNama(response.data.data[0].nama),
            setMerk(response.data.data[0].merk),
            setNomorSeri(response.data.data[0].nomorSeri),
            setJumlah(response.data.data[0].jumlah),
            setImage(response.data.data[0].image),
            setKeterangan(response.data.data[0].keterangan)
            )
        )
        .catch((error) => console.log(error));
    }, [no]);

    useEffect(() => {
        axiosPrivate
            .get("http://localhost:3001/api/user/profile/" + username)
            .then((res) => (console.log(res.data.data),
                setNamaLengkap(res.data.data[0].nama),
                setNamaPerusahaan(res.data.data[0].perusahaan),
                setEmail(res.data.data[0].email),
                setNoTelepon(res.data.data[0].noTelepon)
            ))
            .catch((err) => console.log(err))
    }, [username])

    function handleSubmitForm(event) {
        event.preventDefault();
        axiosPrivate
            .post("http://localhost:3001/api/kuotasi/add", {
                nama,
                merk,
                nomorSeri,
                jumlah,
                username,
                namaLengkap,
                namaPerusahaan,
                email,
                noTelepon,
                tanggalAwalSewa,
                tanggalBerakhirSewa,
                namaProyek,
                alamatProyek,
            })
            .then((res) => (
                Navigate("/")
            ))
            .catch((err) => {
                switch (err.response.data.status) {
                    case 400:
                        switch (err.response.data.message) {
                            case "Input kosong":
                                setErrMsg('Input kolom tidak boleh dikosongkan');
                                break;
                            case "Format tidak sesuai":
                                setErrMsg('Masukkan detil kontak dan detil penyewaan dengan sesuai format ketentuan');
                                break;
                            default:
                                break;
                        }
                        break;
                    default:
                        break;
                }
            });
    }

    const handleNamaLengkapOnchange = (event) => {
        setNamaLengkap(event.target.value);
    }

    const handleNamaPerusahaanOnchange = (event) => {
        setNamaPerusahaan(event.target.value);
    }

    const handleEmailOnchange = (event) => {
        setEmail(event.target.value);
    }

    const handleNoTeleponOnchange = (event) => {
        setNoTelepon(event.target.value);
    }

    const handleTanggalAwalSewaOnChange = (event) => {
        setTanggalAwalSewa(event.target.value);
    } 

    const handleTanggalBerakhirSewaOnchange = (event) => {
        setTanggalBerakhirSewa(event.target.value);
    }

    const handleAlamatProyek = (event) => {
        setAlamatProyek(event.target.value);
    }

    const handleNamaProyek = (event) => {
        setNamaProyek(event.target.value);
    }

    return (
        <div className="container-fluid g-0">
            <div className="row">
                <div className="col">
                    <Header />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="container-fluid content g-0 d-flex justify-content-center mb-5">
                        <div>
                            <h5 className="h5-formulir-penyewaan text-center mb-3 mt-3">FORMULIR PERMINTAAN KUOTASI</h5>
                            <div className="card card-formulir-penyewaan p-4">
                                <form onSubmit={handleSubmitForm}>
                                    <div className="row">
                                        <div className="col">
                                            <div className="card card-image-penyewaan">
                                                <img src={image} className="image-product-penyewaan" alt="equipment-preview-image"></img>                                                
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="card card-info-product-penyewaan">
                                                <h5 className="h6-info-product-penyewaan">{nama}</h5>
                                                <p className="p-info-product-penyewaan">Merk : {merk}</p>
                                                <p className="p-info-product-penyewaan">Nomor Seri : {nomorSeri}</p>
                                                <p className="p-info-product-penyewaan">Keterangan : {keterangan}</p>
                                                <p className="p-info-product-penyewaan">Jumlah : {jumlah}</p>
                                            </div>
                                        </div>
                                    </div>       
                                    {handleErrMsg(errMsg)}
                                    <div className="card card-formulir-detail-penyewaan mt-5 p-3">
                                        <input type="hidden" id="equipment-nama" className="form-control" value={nama} readOnly></input>
                                        <input type="hidden" id="equipment-nama" className="form-control" value={merk} readOnly></input>
                                        <input type="hidden" id="equipment-nomorSeri" className="form-control" value={nomorSeri} readOnly></input>
                                        <input type="hidden" id="equipment-jumlah" className="form-control" value={jumlah} readOnly></input>
                                        <div className="row mt-3 mb-3">
                                            <div className="col">
                                                <h6 className="h6-formulir-penyewaan">Detail Contact</h6>
                                                <label className="form-label" htmlFor="namaLengkap">Nama lengkap: </label>
                                                <input type="text" id="namaLengkap" className="form-control" value={namaLengkap} onChange={handleNamaLengkapOnchange}></input>
                                                <label className="form-label" htmlFor="namaPerusahaan">Nama Perusahaan: </label>
                                                <input type="text" id="namaPerusahaan" className="form-control" value={namaPerusahaan} onChange={handleNamaPerusahaanOnchange}></input>
                                                <label className="form-label" htmlFor="email">Email: </label>
                                                <input type="email" id="email" className="form-control" value={email} onChange={handleEmailOnchange}></input>
                                                <label className="form-label" htmlFor="nomorTelepon">No.Hp: </label>
                                                <input type="tel" id="nomorTelepon" className="form-control" value={noTelepon} onChange={handleNoTeleponOnchange}></input>
                                            </div>
                                        </div>
                                        <div className="row mt-3 mb-3">
                                            <div className="col">
                                                <h6 className="h6-formulir-penyewaan">Detail Penyewaan</h6>
                                                <label className="form-label" htmlFor="tanggalAwalSewa">Tanggal Awal Sewa: </label>
                                                <input type="date" id="tanggalAwalSewa" className="form-control" value={tanggalAwalSewa} onChange={handleTanggalAwalSewaOnChange}></input>
                                                <label htmlFor="tanggalBerakhirSewa" className="form-label">Tanggal Berakhir Sewa: </label>
                                                <input type="date" id="tanggalBerakhirSewa" className="form-control" value={tanggalBerakhirSewa} onChange={handleTanggalBerakhirSewaOnchange}></input>
                                                <label htmlFor="alamat" className="form-label">Alamat Proyek: </label>
                                                <input type="text" id="alamat" className="form-control" value={alamatProyek} onChange={handleAlamatProyek}></input>
                                                <label htmlFor="namaProyek">Nama Proyek:</label>
                                                <input type="text" id="namaProyek" className="form-control" value={namaProyek} onChange={handleNamaProyek}></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-3 mb-3">
                                        <div className="col mt-3 d-flex justify-content-center align-item-center">
                                            <button className="btn btn-sewa-penyewaan">Sewa</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Footer />
                </div>
            </div>
        </div>
    )
}